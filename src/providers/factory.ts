/**
 * Provider factory — creates the appropriate LLM provider based on configuration.
 *
 * Supports auto-detection from model name or base URL, with explicit override.
 */

import { DeepSeekClient } from "../client.js";
import type { ProviderKind } from "../config.js";
import { MimoClient, isMimoEndpoint, isMimoModel } from "./mimo-client.js";
import type { LLMProvider } from "./types.js";

/** Configuration for creating a provider. */
export interface ProviderConfig {
  /** Explicit provider kind override. */
  provider?: ProviderKind;
  /** Model name — used for auto-detection if provider is not set. */
  model?: string;
  /** API key — provider-specific. */
  apiKey?: string;
  /** Base URL — used for auto-detection if provider is not set. */
  baseUrl?: string;
  /** Request timeout in milliseconds. */
  timeoutMs?: number;
  /** Custom fetch implementation. */
  fetch?: typeof fetch;
  /** Rate limit configuration. */
  rateLimit?: { rpm?: number };
  /** Retry configuration. */
  retry?: { maxAttempts?: number };
}

/** MiMo API endpoints. */
export const MIMO_ENDPOINTS = {
  international: "https://token-plan-ams.xiaomimimo.com/v1",
  china: "https://token-plan-cn.xiaomimimo.com/v1",
} as const;

/**
 * Detect the provider kind from model name or base URL.
 * Priority: explicit provider > model name > base URL > default (deepseek)
 */
export function detectProvider(model?: string, baseUrl?: string): ProviderKind {
  // Check model name first
  if (model && isMimoModel(model)) return "mimo";
  // Check base URL
  if (isMimoEndpoint(baseUrl)) return "mimo";
  // Default to DeepSeek
  return "deepseek";
}

/**
 * Resolve the MiMo base URL from configuration.
 * Priority: explicit baseUrl > MIMO_BASE_URL env > region preference > international default
 */
export function resolveMimoBaseUrl(
  baseUrl?: string,
  region?: "international" | "china",
): string {
  if (baseUrl) return baseUrl;
  if (process.env.MIMO_BASE_URL) return process.env.MIMO_BASE_URL;
  if (region === "china") return MIMO_ENDPOINTS.china;
  return MIMO_ENDPOINTS.international;
}

/**
 * Create an LLM provider based on configuration.
 * Supports both DeepSeek and MiMo providers.
 */
export function createProvider(cfg: ProviderConfig): LLMProvider {
  const provider = cfg.provider ?? detectProvider(cfg.model, cfg.baseUrl);

  if (provider === "mimo") {
    const baseUrl = resolveMimoBaseUrl(cfg.baseUrl);
    return new MimoClient({
      apiKey: cfg.apiKey,
      baseUrl,
      timeoutMs: cfg.timeoutMs,
      fetch: cfg.fetch,
      rateLimit: cfg.rateLimit,
      retry: cfg.retry,
    });
  }

  // Default: DeepSeek
  return new DeepSeekClient({
    apiKey: cfg.apiKey,
    baseUrl: cfg.baseUrl,
    timeoutMs: cfg.timeoutMs,
    fetch: cfg.fetch,
    rateLimit: cfg.rateLimit,
    retry: cfg.retry,
  });
}

/**
 * Create a provider from environment variables.
 * Checks MIMO_API_KEY first, then DEEPSEEK_API_KEY.
 */
export function createProviderFromEnv(model?: string): LLMProvider {
  const mimoKey = process.env.MIMO_API_KEY;
  const deepseekKey = process.env.DEEPSEEK_API_KEY;

  // If model is explicitly MiMo, use MiMo provider
  if (model && isMimoModel(model)) {
    if (!mimoKey) {
      throw new Error(
        "MIMO_API_KEY is not set. Please set it in .env or environment variables.",
      );
    }
    return createProvider({
      provider: "mimo",
      model,
      apiKey: mimoKey,
      baseUrl: resolveMimoBaseUrl(),
    });
  }

  // If MiMo key is available and no DeepSeek key, use MiMo
  if (mimoKey && !deepseekKey) {
    return createProvider({
      provider: "mimo",
      model: model ?? "mimo-v2.5-pro",
      apiKey: mimoKey,
      baseUrl: resolveMimoBaseUrl(),
    });
  }

  // Default to DeepSeek
  if (!deepseekKey) {
    throw new Error(
      "Neither MIMO_API_KEY nor DEEPSEEK_API_KEY is set. Please set one in .env or environment variables.",
    );
  }
  return createProvider({
    provider: "deepseek",
    model,
    apiKey: deepseekKey,
  });
}
