import type { ReasoningEffort } from "../../config.js";

const EFFORTS: readonly ReasoningEffort[] = ["low", "medium", "high"];

export function effortChoicesForBaseUrl(
  _baseUrl: string | undefined | null,
): readonly ReasoningEffort[] {
  return EFFORTS;
}

export function effortArgsHintFor(choices: readonly ReasoningEffort[]): string {
  return `<${choices.join("|")}>`;
}
