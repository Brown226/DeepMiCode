import type { DeepSeekClient } from "../client.js";
import type { LLMProvider } from "../providers/types.js";
import { t } from "../i18n/index.js";

export interface DeepSeekProbeResult {
  reachable: boolean;
}

export interface FormatLoopErrorOptions {
  /** baseUrl of the upstream that just failed — picks DS vs generic wording. */
  upstreamHost?: string;
}

export function formatLoopError(
  err: Error,
  probe?: DeepSeekProbeResult,
  opts?: FormatLoopErrorOptions,
): string {
  const msg = err.message ?? "";
  if (msg.includes("maximum context length")) {
    const reqMatch = msg.match(/requested\s+(\d+)\s+tokens/);
    const requested = reqMatch
      ? `${Number(reqMatch[1]).toLocaleString()} tokens`
      : t("errors.contextOverflowTooMany");
    return t("errors.contextOverflow", { requested });
  }

  // Support both DeepSeek and MiMo error formats
  const m = /^(DeepSeek|MiMo) (\d{3}):\s*([\s\S]*)$/.exec(msg);
  if (!m) return msg;
  const provider = m[1] ?? "DeepSeek";
  const status = m[2] ?? "";
  const body = m[3] ?? "";
  const inner = extractErrorMessage(body);

  if (status === "401") return t("errors.auth401", { inner });
  if (status === "402") return t("errors.balance402", { inner });
  if (status === "422") return t("errors.badparam422", { inner });
  if (status === "400") return t("errors.badrequest400", { inner });
  if (status === "429") return t("errors.concurrency429", { inner });
  if (is5xxStatus(status)) return format5xx(status, probe, opts?.upstreamHost);
  return msg;
}

export function is5xxError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const m = /^(DeepSeek|MiMo) (5\d{2}):/.exec(err.message ?? "");
  return m !== null;
}

export function is4xxError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  return /^(DeepSeek|MiMo) (4\d{2}):/.test(err.message ?? "");
}

/** Read structured metadata off thrown errors without resorting to `as any`. */
export function errorMeta(err: unknown): { code?: string; phase?: string } {
  if (!(err instanceof Error)) return {};
  const code = "code" in err && typeof err.code === "string" ? err.code : undefined;
  const phase = "phase" in err && typeof err.phase === "string" ? err.phase : undefined;
  return { code, phase };
}

export async function probeDeepSeekReachable(
  client: DeepSeekClient | LLMProvider,
  timeoutMs = 1500,
): Promise<DeepSeekProbeResult> {
  if (!client.getBalance) return { reachable: true };
  const balance = await client.getBalance({ signal: AbortSignal.timeout(timeoutMs) });
  return { reachable: balance !== null };
}

/** Allow-list — only api.deepseek.com gets DS-specific 5xx wording + balance probe. */
export function isDeepSeekHost(baseUrl: string | undefined | null): boolean {
  if (!baseUrl) return false;
  try {
    const host = new URL(baseUrl).hostname.toLowerCase();
    return host === "api.deepseek.com";
  } catch {
    return false;
  }
}

/** Detect MiMo API endpoints. */
export function isMimoHost(baseUrl: string | undefined | null): boolean {
  if (!baseUrl) return false;
  try {
    const host = new URL(baseUrl).hostname.toLowerCase();
    return host.includes("xiaomimimo.com");
  } catch {
    return false;
  }
}

/** Detect provider from error message or base URL. */
export function detectProviderFromError(msg: string, baseUrl?: string): string {
  if (msg.startsWith("MiMo ")) return "MiMo";
  if (msg.startsWith("DeepSeek ")) return "DeepSeek";
  if (isMimoHost(baseUrl)) return "MiMo";
  return "DeepSeek";
}

function is5xxStatus(status: string): boolean {
  return status === "500" || status === "502" || status === "503" || status === "504";
}

function format5xx(
  status: string,
  probe: DeepSeekProbeResult | undefined,
  upstreamHost: string | undefined,
): string {
  if (upstreamHost !== undefined && !isDeepSeekHost(upstreamHost)) {
    return formatUpstream5xx(status, upstreamHost);
  }
  return formatDeepSeek5xx(status, probe);
}

function formatDeepSeek5xx(status: string, probe?: DeepSeekProbeResult): string {
  const head = t("errors.deepseek5xxHead", { status });
  const probeNote =
    probe === undefined
      ? ""
      : probe.reachable
        ? t("errors.deepseek5xxReachable")
        : t("errors.deepseek5xxUnreachable");
  const action =
    probe?.reachable === false
      ? t("errors.deepseek5xxActionNetwork")
      : t("errors.deepseek5xxActionRetry");
  return `${head}${probeNote}${action}`;
}

function formatUpstream5xx(status: string, baseUrl: string): string {
  let host = baseUrl;
  try {
    host = new URL(baseUrl).host || baseUrl;
  } catch {
    /* keep raw baseUrl */
  }
  const head = t("errors.upstream5xxHead", { status, host });
  const action = t("errors.upstream5xxActionRetry");
  return `${head}${action}`;
}

export function reasonPrefixFor(reason: "aborted" | "context-guard" | "stuck"): string {
  if (reason === "aborted") return t("errors.reasonAborted");
  if (reason === "context-guard") return t("errors.reasonContextGuard");
  return t("errors.reasonStuck");
}

export function errorLabelFor(reason: "aborted" | "context-guard" | "stuck"): string {
  if (reason === "aborted") return t("errors.labelAborted");
  if (reason === "context-guard") return t("errors.labelContextGuard");
  return t("errors.labelStuck");
}

function extractErrorMessage(body: string): string {
  const trimmed = body.trim();
  if (!trimmed) return t("errors.innerNoMessage");
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object") {
      const obj = parsed as { error?: { message?: unknown }; message?: unknown };
      if (obj.error && typeof obj.error.message === "string") return obj.error.message;
      if (typeof obj.message === "string") return obj.message;
    }
  } catch {
    /* not JSON — fall through */
  }
  return trimmed;
}
