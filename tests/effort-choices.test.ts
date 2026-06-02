import { describe, expect, it } from "vitest";
import { effortArgsHintFor, effortChoicesForBaseUrl } from "../src/cli/ui/effort-choices.js";

describe("effortChoicesForBaseUrl", () => {
  it("always returns the standard three values", () => {
    expect(effortChoicesForBaseUrl("https://api.deepseek.com")).toEqual(["low", "medium", "high"]);
    expect(effortChoicesForBaseUrl("http://localhost:8080/v1")).toEqual(["low", "medium", "high"]);
    expect(effortChoicesForBaseUrl("https://api.openai.com/v1")).toEqual(["low", "medium", "high"]);
    expect(effortChoicesForBaseUrl(undefined)).toEqual(["low", "medium", "high"]);
    expect(effortChoicesForBaseUrl(null)).toEqual(["low", "medium", "high"]);
    expect(effortChoicesForBaseUrl("")).toEqual(["low", "medium", "high"]);
  });

  it("formats argsHint with the supplied choices", () => {
    expect(effortArgsHintFor(["low", "medium", "high"])).toBe("<low|medium|high>");
  });
});
