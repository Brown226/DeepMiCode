/**
 * Provider abstraction layer — defines the interface that both DeepSeek and MiMo
 * clients implement, allowing the rest of the codebase to be provider-agnostic.
 */

import type { ChatMessage, ToolCall, ToolSpec } from "../types.js";

/** Provider kind — determines which API client to use. */
export type ProviderKind = "deepseek" | "mimo";

/** Options for creating a chat request. */
export interface ChatRequestOptions {
  messages: ChatMessage[];
  model: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  tools?: ToolSpec[];
  toolChoice?: "auto" | "none" | "required" | { type: "function"; function: { name: string } };
  stop?: string[];
  stream?: boolean;
  reasoningEffort?: "low" | "medium" | "high" | "max";
  signal?: AbortSignal;
  /** Provider-specific extra body fields. */
  extraBody?: Record<string, unknown>;
}

/** Usage statistics from the API response. */
export class Usage {
  constructor(
    public promptTokens = 0,
    public completionTokens = 0,
    public totalTokens = 0,
    public promptCacheHitTokens = 0,
    public promptCacheMissTokens = 0,
  ) {}

  get cacheHitRatio(): number {
    const denom = this.promptCacheHitTokens + this.promptCacheMissTokens;
    return denom > 0 ? this.promptCacheHitTokens / denom : 0;
  }

  static hasApiUsage(raw: unknown): raw is Record<string, unknown> {
    if (!raw || typeof raw !== "object") return false;
    const u = raw as Record<string, unknown>;
    return (
      typeof u.prompt_tokens === "number" ||
      typeof u.completion_tokens === "number" ||
      typeof u.total_tokens === "number" ||
      typeof u.prompt_cache_hit_tokens === "number" ||
      typeof u.prompt_cache_miss_tokens === "number" ||
      typeof u.prompt_eval_count === "number" ||
      typeof u.eval_count === "number"
    );
  }

  /** Parse DeepSeek-style usage. */
  static fromDeepSeek(raw: Record<string, unknown> | undefined | null): Usage {
    const u = raw ?? {};
    const promptTokens = (u.prompt_tokens as number) ?? (u.prompt_eval_count as number) ?? 0;
    const completionTokens = (u.completion_tokens as number) ?? (u.eval_count as number) ?? 0;
    const cacheHitTokens = (u.prompt_cache_hit_tokens as number) ?? 0;
    const cacheMissTokens =
      (u.prompt_cache_miss_tokens as number) ?? Math.max(0, promptTokens - cacheHitTokens);
    return new Usage(
      promptTokens,
      completionTokens,
      (u.total_tokens as number) ?? promptTokens + completionTokens,
      cacheHitTokens,
      cacheMissTokens,
    );
  }

  /** Parse MiMo-style usage (nested prompt_tokens_details.cached_tokens). */
  static fromMimo(raw: Record<string, unknown> | undefined | null): Usage {
    const u = raw ?? {};
    const promptTokens = (u.prompt_tokens as number) ?? 0;
    const completionTokens = (u.completion_tokens as number) ?? 0;
    const details = (u.prompt_tokens_details as Record<string, unknown>) ?? {};
    const cachedTokens = (details.cached_tokens as number) ?? 0;
    return new Usage(
      promptTokens,
      completionTokens,
      (u.total_tokens as number) ?? promptTokens + completionTokens,
      cachedTokens,
      Math.max(0, promptTokens - cachedTokens),
    );
  }

  /** Auto-detect provider and parse usage accordingly. */
  static fromApi(raw: Record<string, unknown> | undefined | null, provider?: ProviderKind): Usage {
    if (!raw) return new Usage();
    if (provider === "mimo") return Usage.fromMimo(raw);
    // Check for MiMo-style nested format
    const details = raw.prompt_tokens_details as Record<string, unknown> | undefined;
    if (details && typeof details.cached_tokens === "number") {
      return Usage.fromMimo(raw);
    }
    return Usage.fromDeepSeek(raw);
  }
}

/** Chat response from the API. */
export interface ChatResponse {
  content: string;
  reasoningContent: string | null;
  toolCalls: ToolCall[];
  usage: Usage;
  raw: unknown;
}

/** Streaming chunk from the API. */
export interface StreamChunk {
  contentDelta?: string;
  reasoningDelta?: string;
  toolCallDelta?: { index: number; id?: string; name?: string; argumentsDelta?: string };
  usage?: Usage;
  finishReason?: string;
  raw: unknown;
}

/** Balance information from the API. */
export interface BalanceInfo {
  currency: string;
  total_balance: string;
  granted_balance?: string;
  topped_up_balance?: string;
}

export interface UserBalance {
  is_available: boolean;
  balance_infos: BalanceInfo[];
}

/** Model list from the API. */
export interface ModelList {
  object: "list";
  data: Array<{ id: string; object: string; owned_by: string }>;
}

/** Provider interface — both DeepSeek and MiMo implement this. */
export interface LLMProvider {
  readonly name: string;
  readonly kind: ProviderKind;
  readonly baseUrl: string;
  readonly apiKey: string;

  chat(opts: ChatRequestOptions): Promise<ChatResponse>;
  stream(opts: ChatRequestOptions): AsyncGenerator<StreamChunk, void, unknown>;
  getBalance?(opts?: { signal?: AbortSignal }): Promise<UserBalance | null>;
  listModels?(opts?: { signal?: AbortSignal }): Promise<ModelList | null>;
}
