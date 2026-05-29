/**
 * MiMo API client — implements the LLMProvider interface for Xiaomi's MiMo models.
 *
 * Key differences from DeepSeek:
 * - No extra_body.thinking needed (reasoning_content returned by default)
 * - Usage uses nested prompt_tokens_details.cached_tokens format
 * - Different default timeout
 * - Different error message format
 */

import { type EventSourceMessage, createParser } from "eventsource-parser";
import { type RetryOptions, fetchWithRetry } from "../retry.js";
import type { ChatMessage, ToolCall, ToolSpec } from "../types.js";
import type {
  ChatRequestOptions,
  ChatResponse,
  LLMProvider,
  ModelList,
  ProviderKind,
  StreamChunk,
  UserBalance,
} from "./types.js";
import { Usage } from "./types.js";

/** Options for creating a MiMo client. */
export interface MimoClientOptions {
  apiKey?: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetch?: typeof fetch;
  rateLimit?: { rpm?: number };
  retry?: RetryOptions;
}

/** Default MiMo API endpoints. */
const MIMO_DEFAULT_ENDPOINTS = {
  international: "https://token-plan-ams.xiaomimimo.com/v1",
  china: "https://token-plan-cn.xiaomimimo.com/v1",
} as const;

/** Default timeout for MiMo (5 minutes — shorter than DeepSeek's 11 minutes). */
const MIMO_DEFAULT_TIMEOUT_MS = 300_000;

/** MiMo API client implementing the LLMProvider interface. */
export class MimoClient implements LLMProvider {
  readonly name = "MiMo";
  readonly kind: ProviderKind = "mimo";
  readonly apiKey: string;
  readonly baseUrl: string;
  readonly timeoutMs: number;
  readonly retry: RetryOptions;
  private readonly _fetch: typeof fetch;
  private readonly minChatIntervalMs: number;
  private nextChatRequestAt = 0;

  constructor(opts: MimoClientOptions = {}) {
    const apiKey = opts.apiKey ?? process.env.MIMO_API_KEY;
    if (!apiKey) {
      throw new Error(
        "MIMO_API_KEY is not set. Put it in .env or pass apiKey to MimoClient.",
      );
    }
    this.apiKey = apiKey;
    let url = opts.baseUrl
      ?? process.env.MIMO_BASE_URL
      ?? MIMO_DEFAULT_ENDPOINTS.international;
    // Trim trailing slashes
    while (url.endsWith("/")) url = url.slice(0, -1);
    this.baseUrl = url;
    this.timeoutMs = opts.timeoutMs ?? MIMO_DEFAULT_TIMEOUT_MS;
    this._fetch = opts.fetch ?? globalThis.fetch.bind(globalThis);
    this.retry = opts.retry ?? {};
    const rpm = opts.rateLimit?.rpm;
    this.minChatIntervalMs = rpm ? Math.ceil(60_000 / rpm) : 0;
  }

  private async waitForChatRateLimit(signal?: AbortSignal): Promise<void> {
    if (this.minChatIntervalMs <= 0) return;
    const now = Date.now();
    const waitMs = Math.max(0, this.nextChatRequestAt - now);
    this.nextChatRequestAt = Math.max(now, this.nextChatRequestAt) + this.minChatIntervalMs;
    if (waitMs <= 0) return;
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(resolve, waitMs);
      signal?.addEventListener(
        "abort",
        () => {
          clearTimeout(timer);
          reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
        },
        { once: true },
      );
    });
  }

  /** Build the request payload for MiMo API.
   *  Key difference from DeepSeek: no extra_body.thinking field needed. */
  private buildPayload(opts: ChatRequestOptions, stream: boolean): Record<string, unknown> {
    const payload: Record<string, unknown> = {
      model: opts.model,
      messages: opts.messages,
      stream,
    };
    if (stream) payload.stream_options = { include_usage: true };
    if (opts.tools?.length) payload.tools = opts.tools;
    if (opts.temperature !== undefined) payload.temperature = opts.temperature;
    if (opts.maxTokens !== undefined) payload.max_tokens = opts.maxTokens;
    if (opts.topP !== undefined) payload.top_p = opts.topP;
    if (opts.stop?.length) payload.stop = opts.stop;
    if (opts.toolChoice !== undefined) payload.tool_choice = opts.toolChoice;
    // MiMo: reasoning_content is returned by default, no extra_body needed.
    // We skip the thinking toggle entirely.
    // MiMo does support reasoning_effort, but it's optional.
    if (opts.reasoningEffort) {
      payload.reasoning_effort = opts.reasoningEffort;
    }
    // Merge any extra body fields from the caller
    if (opts.extraBody) {
      Object.assign(payload, opts.extraBody);
    }
    return payload;
  }

  /** Returns null on failure — MiMo may not support this endpoint. */
  async getBalance(opts: { signal?: AbortSignal } = {}): Promise<UserBalance | null> {
    try {
      const resp = await this._fetch(`${this.baseUrl}/user/balance`, {
        method: "GET",
        headers: { Authorization: `Bearer ${this.apiKey}` },
        signal: opts.signal,
      });
      if (!resp.ok) return null;
      const data = (await resp.json()) as UserBalance;
      if (!data || !Array.isArray(data.balance_infos)) return null;
      return data;
    } catch {
      return null;
    }
  }

  /** Returns null on failure — callers fall back to a hardcoded model hint. */
  async listModels(opts: { signal?: AbortSignal } = {}): Promise<ModelList | null> {
    try {
      const resp = await this._fetch(`${this.baseUrl}/models`, {
        method: "GET",
        headers: { Authorization: `Bearer ${this.apiKey}` },
        signal: opts.signal,
      });
      if (!resp.ok) return null;
      const data = (await resp.json()) as ModelList;
      if (!data || !Array.isArray(data.data)) return null;
      return data;
    } catch {
      return null;
    }
  }

  async chat(opts: ChatRequestOptions): Promise<ChatResponse> {
    const ctrl = new AbortController();
    const timer = setTimeout(
      () => ctrl.abort(new Error(`MiMo request timed out after ${this.timeoutMs}ms`)),
      this.timeoutMs,
    );
    const signal = opts.signal ? AbortSignal.any([opts.signal, ctrl.signal]) : ctrl.signal;

    try {
      await this.waitForChatRateLimit(signal);
      const resp = await fetchWithRetry(
        this._fetch,
        `${this.baseUrl}/chat/completions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.buildPayload(opts, false)),
          signal,
        },
        { ...this.retry, signal },
      );
      if (!resp.ok) {
        throw new Error(`MiMo ${resp.status}: ${await resp.text()}`);
      }
      const data: any = await resp.json();
      const choice = data.choices?.[0]?.message ?? {};
      return {
        content: choice.content ?? "",
        reasoningContent: choice.reasoning_content ?? null,
        toolCalls: choice.tool_calls ?? [],
        usage: Usage.fromApi(data.usage ?? data, "mimo"),
        raw: data,
      };
    } finally {
      clearTimeout(timer);
    }
  }

  async *stream(opts: ChatRequestOptions): AsyncGenerator<StreamChunk, void, unknown> {
    const ctrl = new AbortController();
    const timer = setTimeout(
      () => ctrl.abort(new Error(`MiMo stream timed out after ${this.timeoutMs}ms`)),
      this.timeoutMs,
    );
    const signal = opts.signal ? AbortSignal.any([opts.signal, ctrl.signal]) : ctrl.signal;

    let resp: Response;
    try {
      await this.waitForChatRateLimit(signal);
      resp = await fetchWithRetry(
        this._fetch,
        `${this.baseUrl}/chat/completions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify(this.buildPayload(opts, true)),
          signal,
        },
        { ...this.retry, signal },
      );
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
    if (!resp.ok || !resp.body) {
      clearTimeout(timer);
      throw new Error(`MiMo ${resp.status}: ${await resp.text().catch(() => "")}`);
    }

    const queue: StreamChunk[] = [];
    let done = false;
    const parser = createParser({
      onEvent: (ev: EventSourceMessage) => {
        if (!ev.data || ev.data === "[DONE]") {
          done = true;
          return;
        }
        try {
          const json = JSON.parse(ev.data);
          const delta = json.choices?.[0]?.delta ?? {};
          const finishReason = json.choices?.[0]?.finish_reason ?? undefined;
          const chunk: StreamChunk = { raw: json, finishReason };
          if (typeof delta.content === "string" && delta.content.length > 0) {
            chunk.contentDelta = delta.content;
          }
          if (typeof delta.reasoning_content === "string" && delta.reasoning_content.length > 0) {
            chunk.reasoningDelta = delta.reasoning_content;
          }
          if (Array.isArray(delta.tool_calls) && delta.tool_calls.length > 0) {
            const tc = delta.tool_calls[0];
            chunk.toolCallDelta = {
              index: tc.index ?? 0,
              id: tc.id,
              name: tc.function?.name,
              argumentsDelta: tc.function?.arguments,
            };
          }
          const rawUsage = json.usage ?? (Usage.hasApiUsage(json) ? json : undefined);
          if (rawUsage) {
            chunk.usage = Usage.fromApi(rawUsage, "mimo");
          }
          queue.push(chunk);
        } catch {
          /* skip malformed sse frame */
        }
      },
    });

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    try {
      while (true) {
        if (queue.length > 0) {
          yield queue.shift()!;
          continue;
        }
        if (done) break;
        let value: Uint8Array | undefined;
        let streamDone: boolean;
        try {
          ({ value, done: streamDone } = await reader.read());
        } catch (readErr) {
          const cause = readErr instanceof Error ? readErr : new Error(String(readErr));
          const code = "code" in cause && typeof cause.code === "string" ? cause.code : undefined;
          throw Object.assign(new Error(`SSE body read failed: ${cause.message}`), {
            phase: "stream_body_read" as const,
            code,
          });
        }
        if (streamDone) break;
        parser.feed(decoder.decode(value, { stream: true }));
      }
      while (queue.length > 0) yield queue.shift()!;
    } finally {
      clearTimeout(timer);
      reader.releaseLock();
    }
  }
}

/** Detect if a model or base URL indicates MiMo provider. */
export function isMimoModel(model: string): boolean {
  return model.startsWith("mimo-");
}

/** Detect if a base URL points to MiMo API. */
export function isMimoEndpoint(baseUrl: string | undefined | null): boolean {
  if (!baseUrl) return false;
  try {
    const host = new URL(baseUrl).hostname.toLowerCase();
    return host.includes("xiaomimimo.com");
  } catch {
    return false;
  }
}
