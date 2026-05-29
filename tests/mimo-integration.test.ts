/**
 * MiMo integration tests — verifies that the provider abstraction layer
 * correctly handles MiMo API responses and usage normalization.
 */

import { describe, expect, it } from "vitest";
import { Usage } from "../src/providers/types.js";
import { isMimoModel, isMimoEndpoint } from "../src/providers/mimo-client.js";
import { detectProvider, resolveMimoBaseUrl, MIMO_ENDPOINTS } from "../src/providers/factory.js";

describe("MiMo Usage Normalization", () => {
  it("should parse MiMo-style nested usage format", () => {
    const raw = {
      prompt_tokens: 1000,
      completion_tokens: 500,
      total_tokens: 1500,
      prompt_tokens_details: {
        cached_tokens: 800,
      },
      completion_tokens_details: {
        reasoning_tokens: 200,
      },
    };

    const usage = Usage.fromMimo(raw);
    expect(usage.promptTokens).toBe(1000);
    expect(usage.completionTokens).toBe(500);
    expect(usage.totalTokens).toBe(1500);
    expect(usage.promptCacheHitTokens).toBe(800);
    expect(usage.promptCacheMissTokens).toBe(200);
    expect(usage.cacheHitRatio).toBeCloseTo(0.8);
  });

  it("should handle missing prompt_tokens_details", () => {
    const raw = {
      prompt_tokens: 1000,
      completion_tokens: 500,
      total_tokens: 1500,
    };

    const usage = Usage.fromMimo(raw);
    expect(usage.promptCacheHitTokens).toBe(0);
    expect(usage.promptCacheMissTokens).toBe(1000);
  });

  it("should auto-detect MiMo format from nested details", () => {
    const raw = {
      prompt_tokens: 1000,
      completion_tokens: 500,
      total_tokens: 1500,
      prompt_tokens_details: {
        cached_tokens: 600,
      },
    };

    const usage = Usage.fromApi(raw);
    expect(usage.promptCacheHitTokens).toBe(600);
    expect(usage.promptCacheMissTokens).toBe(400);
  });

  it("should parse DeepSeek-style flat usage format", () => {
    const raw = {
      prompt_tokens: 1000,
      completion_tokens: 500,
      total_tokens: 1500,
      prompt_cache_hit_tokens: 700,
      prompt_cache_miss_tokens: 300,
    };

    const usage = Usage.fromDeepSeek(raw);
    expect(usage.promptCacheHitTokens).toBe(700);
    expect(usage.promptCacheMissTokens).toBe(300);
    expect(usage.cacheHitRatio).toBeCloseTo(0.7);
  });
});

describe("MiMo Model Detection", () => {
  it("should detect MiMo models", () => {
    expect(isMimoModel("mimo-v2.5-pro")).toBe(true);
    expect(isMimoModel("mimo-v2.5")).toBe(true);
    expect(isMimoModel("mimo-v2-flash")).toBe(true);
    expect(isMimoModel("deepseek-v4-flash")).toBe(false);
    expect(isMimoModel("gpt-4")).toBe(false);
  });

  it("should detect MiMo endpoints", () => {
    expect(isMimoEndpoint("https://token-plan-ams.xiaomimimo.com/v1")).toBe(true);
    expect(isMimoEndpoint("https://token-plan-cn.xiaomimimo.com/v1")).toBe(true);
    expect(isMimoEndpoint("https://api.deepseek.com")).toBe(false);
    expect(isMimoEndpoint(undefined)).toBe(false);
    expect(isMimoEndpoint(null)).toBe(false);
  });
});

describe("Provider Factory", () => {
  it("should detect provider from model name", () => {
    expect(detectProvider("mimo-v2.5-pro")).toBe("mimo");
    expect(detectProvider("mimo-v2.5")).toBe("mimo");
    expect(detectProvider("deepseek-v4-flash")).toBe("deepseek");
    expect(detectProvider("gpt-4")).toBe("deepseek"); // default
  });

  it("should detect provider from base URL", () => {
    expect(detectProvider(undefined, "https://token-plan-ams.xiaomimimo.com/v1")).toBe("mimo");
    expect(detectProvider(undefined, "https://api.deepseek.com")).toBe("deepseek");
  });

  it("should prefer model name over URL", () => {
    // Model name takes priority
    expect(detectProvider("mimo-v2.5-pro", "https://api.deepseek.com")).toBe("mimo");
    expect(detectProvider("deepseek-v4-flash", "https://token-plan-ams.xiaomimimo.com/v1")).toBe("deepseek");
  });

  it("should resolve MiMo base URL", () => {
    // Explicit URL
    expect(resolveMimoBaseUrl("https://custom.mimo.com/v1")).toBe("https://custom.mimo.com/v1");

    // Region-based
    expect(resolveMimoBaseUrl(undefined, "international")).toBe(MIMO_ENDPOINTS.international);
    expect(resolveMimoBaseUrl(undefined, "china")).toBe(MIMO_ENDPOINTS.china);

    // Default
    expect(resolveMimoBaseUrl()).toBe(MIMO_ENDPOINTS.international);
  });
});

describe("MiMo Context Windows", () => {
  it("should have correct context window sizes", async () => {
    const { DEEPSEEK_CONTEXT_TOKENS } = await import("../src/telemetry/stats.js");

    expect(DEEPSEEK_CONTEXT_TOKENS["mimo-v2.5-pro"]).toBe(1_000_000);
    expect(DEEPSEEK_CONTEXT_TOKENS["mimo-v2.5"]).toBe(1_000_000);
    expect(DEEPSEEK_CONTEXT_TOKENS["mimo-v2-flash"]).toBe(262_144);
  });
});

describe("MiMo Pricing", () => {
  it("should have pricing for MiMo models", async () => {
    const { DEEPSEEK_PRICING } = await import("../src/telemetry/stats.js");

    expect(DEEPSEEK_PRICING["mimo-v2.5-pro"]).toBeDefined();
    expect(DEEPSEEK_PRICING["mimo-v2.5"]).toBeDefined();
    expect(DEEPSEEK_PRICING["mimo-v2-flash"]).toBeDefined();

    // Verify pricing structure
    const mimoPro = DEEPSEEK_PRICING["mimo-v2.5-pro"];
    expect(mimoPro.inputCacheHit).toBeDefined();
    expect(mimoPro.inputCacheMiss).toBeDefined();
    expect(mimoPro.output).toBeDefined();
  });
});

describe("Thinking Mode Detection", () => {
  it("should detect MiMo models as thinking mode", async () => {
    const { isThinkingModeModel } = await import("../src/loop/thinking.js");

    expect(isThinkingModeModel("mimo-v2.5-pro")).toBe(true);
    expect(isThinkingModeModel("mimo-v2.5")).toBe(true);
    expect(isThinkingModeModel("mimo-v2-flash")).toBe(true);
    expect(isThinkingModeModel("deepseek-v4-flash")).toBe(true);
    expect(isThinkingModeModel("gpt-4")).toBe(false);
  });

  it("should return undefined for MiMo thinking mode (no extra_body needed)", async () => {
    const { thinkingModeForModel } = await import("../src/loop/thinking.js");

    // MiMo: reasoning_content is returned by default, no extra_body needed
    expect(thinkingModeForModel("mimo-v2.5-pro")).toBeUndefined();
    expect(thinkingModeForModel("mimo-v2.5")).toBeUndefined();
    expect(thinkingModeForModel("mimo-v2-flash")).toBeUndefined();

    // DeepSeek: needs extra_body
    expect(thinkingModeForModel("deepseek-v4-flash")).toBe("enabled");
    expect(thinkingModeForModel("deepseek-chat")).toBe("disabled");
  });
});

describe("MiMo Host Detection", () => {
  it("should detect MiMo hosts", async () => {
    const { isMimoHost } = await import("../src/loop/errors.js");

    expect(isMimoHost("https://token-plan-ams.xiaomimimo.com/v1")).toBe(true);
    expect(isMimoHost("https://token-plan-cn.xiaomimimo.com/v1")).toBe(true);
    expect(isMimoHost("https://api.deepseek.com")).toBe(false);
    expect(isMimoHost(undefined)).toBe(false);
    expect(isMimoHost(null)).toBe(false);
  });

  it("should detect provider from error message", async () => {
    const { detectProviderFromError } = await import("../src/loop/errors.js");

    expect(detectProviderFromError("MiMo 401: Unauthorized")).toBe("MiMo");
    expect(detectProviderFromError("DeepSeek 401: Unauthorized")).toBe("DeepSeek");
    expect(detectProviderFromError("Unknown error", "https://token-plan-ams.xiaomimimo.com/v1")).toBe("MiMo");
  });
});
