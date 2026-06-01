import type { EngineeringLifecycleSnapshot } from "../../../code/lifecycle.js";
import type { EditMode } from "../../../config.js";
import type { McpServerSummary } from "../../../mcp/summary.js";
import type { JobRegistry } from "../../../tools/jobs.js";
import type { PlanStep } from "../../../tools/plan.js";
import type { CodeUndoOutput } from "../undo-context.js";

export type { McpServerSummary } from "../../../mcp/summary.js";

export interface SlashResult {
  /** Text to display back to the user as a system/info line. */
  info?: string;
  /** Open the SessionPicker modal mid-chat â€?used by `/sessions` slash. */
  openSessionsPicker?: boolean;
  /** Open the WorkspacePicker modal mid-chat â€?bare `/cwd` in code mode. */
  openWorkspacePicker?: boolean;
  /** Open the CheckpointPicker modal â€?bare `/restore` (no name argument). */
  openCheckpointPicker?: boolean;
  /** Open the ModelPicker modal â€?bare `/model` (no id) opens it. */
  openModelPicker?: boolean;
  /** Open the ThemePicker modal â€?bare `/theme` opens it. */
  openThemePicker?: boolean;
  /** Open the unified MCP hub â€?`/mcp` defaults to "live", `/mcp browse` to "marketplace". */
  openMcpHub?: { tab: "live" | "marketplace" };
  /** Open the arg-completer picker for this command (e.g. `/language` â†?language picker). */
  openArgPickerFor?: string;
  /** Exit the app. */
  exit?: boolean;
  /** Clear the visible history. */
  clear?: boolean;
  /** Unknown command â€?display usage hint. */
  unknown?: boolean;
  /** `/retry` re-submit text â€?pushed back through the normal submit flow after log truncation. */
  resubmit?: string;
  /** Structured `/context` payload â€?`info` text can't carry per-segment color for the stacked bar. */
  ctxBreakdown?: {
    systemTokens: number;
    toolsTokens: number;
    logTokens: number;
    inputTokens: number;
    ctxMax: number;
    toolsCount: number;
    logMessages: number;
    topTools: Array<{ name: string; tokens: number; turn: number }>;
  };
  /** `/replay [N]` archived-plan payload â€?display-only, NEVER executed. */
  replayPlan?: {
    summary?: string;
    body?: string;
    steps: PlanStep[];
    completedStepIds: string[];
    completedAt: string;
    relativeTime: string;
    archiveBasename: string;
    /** 1-based index in `/plans` listing â€?surfaced in the header. */
    index: number;
    /** Total archives at the time of the lookup; helps the user navigate. */
    total: number;
  };
}

export type PlanModeToggleSource = "slash";

export interface SlashContext {
  configPath?: string;
  mcpSpecs?: string[];
  codeUndo?: (args: readonly string[]) => CodeUndoOutput;
  codeApply?: (indices?: readonly number[]) => string;
  codeDiscard?: (indices?: readonly number[]) => string;
  codeHistory?: () => string;
  codeShowEdit?: (args: readonly string[]) => string;
  codeRoot?: string;
  getEngineeringLifecycleSnapshot?: () => EngineeringLifecycleSnapshot | null;
  pendingEditCount?: number;
  mcpServers?: McpServerSummary[];
  /** Absent â†?tests context; `/memory` MUST reply "root unknown" rather than silently reading wrong dir. */
  memoryRoot?: string;
  /** Override `~/.deepmicode` lookup root â€?production leaves this absent (defaults to `os.homedir()`); tests inject a tmpdir so they don't read the dev's real global memory. */
  homeDir?: string;
  planMode?: boolean;
  editMode?: EditMode;
  setEditMode?: (mode: EditMode) => void;
  touchedFiles?: () => string[];
  /** stop_job is async; handlers return synchronously and let the registry resolve in the background. */
  jobs?: JobRegistry;
  postInfo?: (text: string) => void;
  /** Push a structured Doctor card with check-by-check status; used by `/doctor`. */
  postDoctor?: (
    checks: ReadonlyArray<{ label: string; level: "ok" | "warn" | "fail"; detail: string }>,
  ) => void;
  /** Push a verbose Usage card (full bars) â€?used by `/cost`; auto-emitted per-turn cards stay compact. */
  postUsage?: (args: {
    turn: number;
    promptTokens: number;
    reasonTokens: number;
    outputTokens: number;
    promptCap: number;
    cacheHit: number;
    cost: number;
    sessionCost: number;
    balance?: number;
    balanceCurrency?: string;
    elapsedMs?: number;
  }) => void;
  /** Push the keyboard + mouse + copy/paste reference TipCard (multi-section). Used by `/keys`. */
  postKeys?: (args: {
    topic: string;
    sections: ReadonlyArray<{
      title?: string;
      rows: ReadonlyArray<{ key: string; text: string }>;
    }>;
    footer?: string;
  }) => void;
  dispatch?: (event: import("../state/events.js").AgentEvent) => void;
  setPlanMode?: (on: boolean, source?: PlanModeToggleSource) => void;
  /** Manual escape valve when the model forgot to call `mark_step_complete` â€?used by `/plans done <id>`. */
  markPlanStepDone?: (stepId: string) => "ok" | "not-in-plan" | "already-done" | "no-plan";
  /** Mark every still-queued step done â€?used by `/plans done all`. Returns the count newly marked. */
  markAllPlanStepsDone?: () => number;

  reloadHooks?: () => number;
  /** Switch the workspace root mid-session â€?re-targets filesystem/shell/memory tools, hooks, at-mention walker. Code mode only. `clear` mirrors `/new` (drops in-memory history + UI cards) so the previous workspace's chat doesn't contaminate the new one. */
  switchCwd?: (newPath: string) => { ok: boolean; info: string; clear?: boolean };
  /** Diff config.mcp[] vs live bridges â†?add/close clients accordingly. Wired from chat.tsx mcpRuntime. */
  reloadMcp?: () => Promise<{
    added: string[];
    removed: string[];
    failed: Array<{ spec: string; reason: string }>;
    summaries: McpServerSummary[];
  }>;
  /** `null` â†?still in flight OR offline; consumers can't distinguish, so always offer `refreshLatestVersion`. */
  latestVersion?: string | null;
  refreshLatestVersion?: () => void;
  /** `null` â†?in flight / failed; `[]` â†?API answered empty. `/model <id>` warn-only since list can lag. */
  models?: string[] | null;
  refreshModels?: () => void;
  /** Ask the current model to summarize the active session into a short title and rename it. */
  generateSessionTitle?: () => Promise<string>;
  startLoop?: (intervalMs: number, prompt: string) => void;
  stopLoop?: () => void;
  getLoopStatus?: () => {
    prompt: string;
    intervalMs: number;
    iter: number;
    nextFireMs: number;
  } | null;
  startWalkthrough?: () => string;
  startDashboard?: () => Promise<string>;
  /** Tear the dashboard server down. Mirrors stopLoop's shape; no-op when not running. */
  stopDashboard?: () => Promise<void>;
  /** Snapshot the dashboard's URL when running, null otherwise. */
  getDashboardUrl?: () => string | null;
  qq?: {
    connect: (args: readonly string[]) => Promise<string>;
    disconnect: () => Promise<string>;
    status: () => string;
  };
  /** Current session id â€?included in `/feedback`'s diagnostic block when present. */
  sessionId?: string;
}

export type SlashGroup =
  | "chat"
  | "setup"
  | "info"
  | "session"
  | "extend"
  | "code"
  | "jobs"
  | "advanced";

export interface SlashCommandSpec {
  cmd: string;
  summary: string;
  contextual?: "code";
  /** Visual category in the suggestions palette + /help. `advanced` collapses by default. */
  group: SlashGroup;
  /** If the command takes args, hint text shown after the name. */
  argsHint?: string;
  /** First-arg picker source. `"path"` async-lists the filesystem for directory completion (used by `/cwd`). */
  argCompleter?: "models" | "mcp-resources" | "mcp-prompts" | "skills" | "path" | readonly string[];
  /** Alternate names â€?typing any of these resolves to `cmd` for dispatch / suggestion / arg-context. */
  aliases?: readonly string[];
}

export interface SlashArgContext {
  spec: SlashCommandSpec;
  partial: string;
  partialOffset: number;
  kind: "picker" | "hint";
}
