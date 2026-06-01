import type { TranslationSchema } from "./types.js";

export const EN: TranslationSchema = {
  common: {
    error: "Error",
    warning: "Warning",
    loading: "Loading...",
    done: "Done",
    cancel: "Cancel",
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    tool: "tool",
    running: "running",
    noTurns: "(no turns yet)",
  },
  cli: {
    description: "DeepMiCode - DeepSeek + Mimo AI coding agent, built for cache hits and cheap tokens.",
    continue: "Resume the most recently used chat session without showing the picker.",
    setup: "Interactive wizard 鈥?API key, MCP servers. Re-run any time to reconfigure.",
    code: "Code-editing chat 鈥?filesystem tools rooted at <dir> (default: cwd), coding system prompt.",
    chat: "Interactive Ink TUI with live cache/cost panel.",
    run: "Run a single task non-interactively, streaming output.",
    stats: "Show usage dashboard.",
    doctor: "One-command health check.",
    commit: "Draft a commit message from the staged diff.",
    sessions: "List saved chat sessions, or inspect one by name.",
    pruneSessions: "Delete saved sessions idle 鈮 days (default 90). Use --dry-run to preview.",
    events: "Pretty-print the kernel event-log sidecar.",
    replay: "Interactive Ink TUI to scrub through a transcript.",
    diff: "Compare two transcripts in a split-pane Ink TUI.",
    mcp: "Model Context Protocol helpers 鈥?discover servers, test your setup.",
    version: "Print DeepMiCode version.",
    update: "Check for a newer DeepMiCode and install it.",
    index: "Build (or incrementally refresh) a local semantic search index.",
  },
  stats: {
    usageHint: "run `deepmicode chat`, `deepmicode code`, or `deepmicode run <task>` 鈥?every turn",
    usageDetail: "appends one line to the log and `deepmicode stats` will roll it up.",
  },
  run: {
    missingApiKey:
      "DEEPSEEK_API_KEY or MIMO_API_KEY is not set and stdin is not a TTY (cannot prompt).\n" +
      "Set the env var, or run `deepmicode chat` once interactively to save a key.\n",
  },
  sessions: {
    emptyHint:
      "no saved sessions yet 鈥?run `deepmicode chat` (sessions are auto-saved unless --no-session).",
    listHeader: "Saved sessions (~/.deepmicode/sessions/):",
    inspectHint: "Inspect:  deepmicode sessions <name>",
    resumeHint: "Resume:   DeepMiCode chat --session <name>",
    noSession: 'no session named "{name}" (or it\u2019s empty).',
    lookedAt: "looked at: {path}",
    noIdleSessions: "no sessions idle \u2265{days} days. Nothing pruned.",
    wouldPrune: "would prune {count} session(s) idle \u2265{days} days:",
    dryRunHint: "re-run without --dry-run to actually delete.",
    prunedCount: "pruned {count} session(s) idle \u2265{days} days:",
    daysInvalid: "--days must be a positive integer (got {days}).",
  },
  ui: {
    welcome: "Run `DeepMiCode` any time to start chatting 鈥?your settings are remembered.",
    taglineChat: "DeepSeek-native agent",
    taglineCode: "DeepSeek-native coding agent",
    taglineSub: "cache-first 路 flash-first",
    startSessionHint: "type a message to start your session",
    inputPlaceholder: "Ask anything... (type / for commands, @ for files)",
    busy: "Thinking...",
    thinking: "鈻?thinking...",
    undo: "Undo",
    undoHint: "press u within 5s to undo",
    applied: "applied",
    rejected: "rejected",
    noDashboard: "Suppress the auto-launched embedded web dashboard.",
    openDashboardHint:
      "Open the dashboard URL in your default browser as soon as the server is ready. No-op when --no-dashboard is set.",
    dashboardPortHint:
      "Pin the dashboard to a fixed port (1鈥?5535). Stable across restarts 鈥?required for SSH tunnels. Default: ephemeral.",
    dashboardPortInvalid:
      "鈻?ignoring --dashboard-port={value} (must be an integer 1鈥?5535) 鈥?falling back to ephemeral",
    dashboardAutoStartFailed:
      "鈻?dashboard auto-start failed ({reason}) 鈥?try /dashboard, or pass --no-dashboard to silence",
    systemAppendHint:
      "Append instructions to the code system prompt. Does NOT replace the default prompt 鈥?adds after it.",
    systemAppendFileHint:
      "Append file contents to the code system prompt. Does NOT replace the default prompt. UTF-8, relative to cwd or absolute.",
    resumedSession:
      '鈻?resumed session "{name}" with {count} prior messages 路 /new to start fresh 路 /sessions to manage',
    newSession: '鈻?session "{name}" (new) 鈥?auto-saved as you chat 路 /sessions to rename or delete',
    ephemeralSession: "鈻?ephemeral chat (no session persistence) 鈥?drop --no-session to enable",
    restoredEdits:
      "鈻?restored {count} pending edit block(s) from an interrupted prior run 鈥?/apply to commit or /discard to drop.",
    resumedPlan: "Resumed plan 路 {when}{summary}",
    tipEditBindings: {
      topic: "edit-gate keybindings",
      sections: [
        {
          rows: [
            { key: "y / n", text: "accept or drop pending edits" },
            {
              key: "Shift+Tab",
              text: "switch review 鈫?AUTO (persisted; AUTO applies instantly)",
            },
            { key: "u", text: "undo the last auto-applied batch (within the 5s banner)" },
          ],
        },
      ],
      footer: "Current mode shown in the bottom status bar 路 /keys for the full reference",
    },
    tipMouseClipboard: {
      topic: "mouse + clipboard",
      sections: [
        {
          rows: [
            { key: "drag", text: "select text 鈥?terminal-native, no modifier needed" },
            {
              key: "right-click",
              text: "your terminal's native menu (paste / copy on Windows Terminal etc.)",
            },
            { key: "wheel", text: "scrolls chat history (works on web/cloud/SSH terminals too)" },
            {
              key: "鈫?/ 鈫?,
              text: "prompt history (or per-line cursor in a multi-line draft) 鈥?Ctrl+P / Ctrl+N alias",
            },
            { key: "PgUp / PgDn", text: "scroll chat history (mouse wheel routes here too)" },
          ],
        },
      ],
      footer: "Run /keys for the full keyboard + mouse reference",
    },
    keysReference: {
      topic: "DeepMiCode keys + mouse reference",
      sections: [
        {
          title: "keyboard",
          rows: [
            { key: "Enter", text: "submit the prompt" },
            { key: "Shift+Enter", text: "insert a newline in the prompt" },
            {
              key: "鈫?/ 鈫?,
              text: "previous / next prompt history 路 cursor up / down in a multi-line draft",
            },
            { key: "Ctrl+P / Ctrl+N", text: "readline alias for 鈫?/ 鈫? },
            { key: "Ctrl+A / Ctrl+E", text: "jump to start / end of the current line" },
            { key: "Ctrl+W", text: "delete the word before the cursor" },
            { key: "Ctrl+U", text: "clear the entire prompt buffer" },
            { key: "Tab", text: "complete @-mention 路 drill folder 路 accept slash command" },
            { key: "Shift+Tab", text: "edit-gate: toggle review 鈫?AUTO mode" },
            { key: "Esc", text: "dismiss picker 路 abort the running model turn" },
            { key: "Ctrl+C", text: "abort the running model turn (NOT copy 鈥?see clipboard)" },
            { key: "PgUp / PgDn", text: "scroll chat history a page at a time" },
            { key: "End", text: "jump chat to the most recent line" },
            {
              key: "Ctrl+R",
              text: "toggle verbose mode 鈥?full reasoning + tool output, no head/tail elision",
            },
          ],
        },
        {
          title: "mouse",
          rows: [
            { key: "wheel", text: "scrolls chat history (works on web/cloud/SSH terminals too)" },
            { key: "drag", text: "selects text natively 鈥?direct copy works, no modifier" },
            { key: "right-click", text: "terminal-native (paste menu on Windows Terminal etc.)" },
          ],
        },
        {
          title: "copy / paste",
          rows: [
            { key: "select text", text: "drag to select 鈥?terminal-native (no modifier needed)" },
            {
              key: "copy",
              text: "Ctrl+Shift+C (Win/Linux) 路 Cmd+C (macOS) 鈥?or auto-copy-on-select if your terminal does it",
            },
            { key: "paste", text: "Ctrl+V or Ctrl+Shift+V (Win/Linux) 路 Cmd+V (macOS)" },
            {
              key: "bracketed paste",
              text: "multi-line pastes stay one block 鈥?no auto-submit on intermediate newlines",
            },
          ],
        },
        {
          title: "edit-gate (code mode)",
          rows: [
            { key: "y / n", text: "accept or drop pending edits in the review modal" },
            { key: "Shift+Tab", text: "toggle review 鈫?AUTO (persisted across sessions)" },
            { key: "u", text: "undo the last auto-applied batch (within the 5s banner)" },
          ],
        },
      ],
      footer:
        "Wheel scrolls chat on most terminals (web/cloud/SSH included) 鈥?SGR mouse tracking is on by default and stays out of the way of native drag-select and right-click. Pass --no-mouse to opt out.",
    },
    tipShownOnce: "shown once",
    modelOverride: "override the default model",
    noSession: "disable session persistence for this run",
    noMouseHint: "disable SGR mouse tracking; restores native drag-select and right-click",
    noProxyHint: "ignore HTTPS_PROXY / HTTP_PROXY for this run; go direct",
    resumeHint: "force-resume the named session (even if idle)",
    newHint: "force a fresh session (ignore --session / --continue)",
    transcriptHint: "path to write the JSONL transcript",
    budgetHint: "session USD cap 鈥?warns at 80%, refuses next turn at 100%",
    modelIdHint: "DeepSeek model id (e.g. deepseek-v4-flash)",
    systemPromptHint: "override the default system prompt",
    effortHint: "reasoning effort 鈥?low|medium|high|max",
    sessionNameHint: "session name (default: 'default')",
    ephemeralHint: "disable session persistence for this run",
    mcpSpecHint: "MCP server spec (repeatable)",
    mcpPrefixHint: "prefix MCP tool names with this string",
    noConfigHint: "ignore ~/.deepmicode/config.json for this run",
    effortHintShort: "reasoning effort 鈥?low|medium|high|max",
    budgetHintShort: "session USD cap",
    transcriptHintShort: "JSONL transcript path",
    mcpSpecHintShort: "MCP server spec (repeatable)",
    mcpPrefixHintShort: "MCP tool name prefix",
    dryRunHint: "show what would be installed without actually installing",
    rebuildHint: "rebuild the index from scratch",
    embedModelHint: "embedding model name",
    projectDirHint: "project root directory",
    ollamaUrlHint: "Ollama server URL",
    skipPromptsHint: "skip confirmation prompts",
    verboseHint: "show full session metadata",
    pruneDaysHint: "delete sessions idle this many days or more (default 90)",
    pruneDryRunHint: "list what would be deleted without removing anything",
    eventTypeHint: "filter by event type",
    eventSinceHint: "start from this event id",
    eventTailHint: "show only the last N events",
    jsonHint: "output as JSON",
    projectionHint: "show projected state at each event",
    printHint: "print to stdout instead of TUI",
    headHint: "show only the first N events",
    tailHint: "show only the last N events",
    mdReportHint: "write a markdown diff report to this path",
    printHintTable: "print a table to stdout",
    tuiHint: "open the interactive TUI",
    labelAHint: "label for the left pane",
    labelBHint: "label for the right pane",
    mcpListDescription: "browse the MCP registry (official 鈫?smithery 鈫?local fallback)",
    mcpInspectDescription: "inspect an MCP server spec (tools, resources, prompts)",
    mcpSearchDescription: "search the MCP registry for servers matching a query",
    mcpInstallDescription: "install an MCP server by name (writes its spec to your config)",
    mcpBrowseDescription: "interactive marketplace browser 鈥?type to filter, enter to install",
    mcpLocalHint: "show only the bundled offline catalog",
    mcpRefreshHint: "bypass the 24h cache and refetch",
    mcpLimitHint: "max entries to show",
    mcpPagesHint: "eagerly load this many pages (default 1)",
    mcpAllHint: "load every page (slow on first run)",
    mcpMaxPagesHint: "cap how many pages to walk while searching (default 20)",
    jsonHintCatalog: "output as JSON",
    jsonHintReport: "output the inspection report as JSON",
    modelOverrideFlash: "override the model (default: deepseek-v4-flash)",
    skipConfirmHint: "skip the confirmation prompt",
    yoloHint:
      "auto-approve plan checkpoints for this invocation (equivalent to editMode=yolo without mutating config)",
  },
  code: {
    workspaceConflict:
      "鈿?workspace contains another agent platform's files ({platforms}). DeepMiCode Code may read them as project content; relaunch with --dir <your-project> if that's not what you want.\n",
    systemAppendEmpty: "--system-append is empty 鈥?no prompt text will be appended\n",
    systemAppendFileReadError:
      'Error: cannot read --system-append-file "{filePath}": {errorDetails}\n',
  },
  slash: {
    help: { description: "show the full command reference" },
    status: { description: "current model, flags, context, session" },
    effort: {
      description:
        "reasoning_effort cap (low|medium|high|max); high is the safe default for vLLM/Azure",
      argsHint: "<low|medium|high|max>",
    },
    model: { description: "switch DeepSeek model id", argsHint: "<id>" },
    models: { description: "list available models fetched from DeepSeek /models" },
    theme: {
      description: "show or persist the terminal theme preference. Bare opens picker.",
      argsHint: "[auto|dark|light|midnight|deep-blue|high-contrast]",
    },
    language: {
      description: "switch the runtime language",
      argsHint: "<EN|zh-CN>",
      success: "Language switched to English.",
      unsupported: "Unsupported language code: {code}. Supported: {supported}.",
    },
    budget: {
      description:
        "session USD cap 鈥?warns at 80%, refuses next turn at 100%. Off by default. /budget alone shows status",
      argsHint: "[usd|off]",
    },
    mcp: { description: "list MCP servers + tools attached to this session" },
    resource: {
      description: "browse + read MCP resources (no arg 鈫?list URIs; <uri> 鈫?fetch contents)",
      argsHint: "[uri]",
    },
    prompt: {
      description: "browse + fetch MCP prompts (no arg 鈫?list names; <name> 鈫?render prompt)",
      argsHint: "[name]",
    },
    memory: {
      description: "show / manage pinned memory (DEEPMICODE.md + ~/.deepmicode/memory)",
      argsHint: "[list|show <name>|forget <name>|clear <scope> confirm]",
    },
    skill: {
      description: "list / run user skills (project + custom + global + builtin)",
      argsHint: "[list|paths|show <name>|<name> [args]]",
    },
    hooks: {
      description: "list active hooks (settings.json under .deepmicode/) 路 reload re-reads from disk",
      argsHint: "[reload]",
    },
    permissions: {
      description:
        "show / edit shell allowlist (builtin read-only 路 per-project: ~/.deepmicode/config.json)",
      argsHint: "[list|add <prefix>|remove <prefix|N>|clear confirm]",
    },
    dashboard: {
      description: "launch the embedded web dashboard (127.0.0.1, token-gated)",
      argsHint: "[stop]",
    },
    update: { description: "show current vs latest version + the shell command to upgrade" },
    stats: {
      description:
        "cross-session cost dashboard (today / week / month / all-time 路 cache hit 路 vs Claude)",
    },
    cost: {
      description:
        "bare 鈫?last turn's spend (Usage card); with text 鈫?estimate cost of sending it next (worst-case + likely-cache)",
      argsHint: "[text]",
    },
    doctor: { description: "health check (api / config / api-reach / index / hooks / project)" },
    context: { description: "show context-window breakdown (system / tools / log / input)" },
    retry: { description: "truncate & resend your last message (fresh sample)" },
    compact: {
      description:
        "narrow oversized tool results + tool-call args in the log; cap at tokens, default 4000",
      argsHint: "[tokens]",
    },
    cwd: {
      description:
        "switch the workspace root mid-session 鈥?re-points fs / shell / memory tools, reloads project hooks, refreshes the at-mention walker",
      argsHint: "[path]",
    },
    stop: { description: "abort the current model turn (typed alternative to Esc)" },
    feedback: { description: "open a GitHub issue with diagnostic info copied to clipboard" },
    about: { description: "project info 鈥?version, website, repo, license" },
    keys: { description: "keyboard + mouse + copy/paste reference" },
    plans: { description: "list this session's active + archived plans, newest first" },
    replay: {
      description: "load an archived plan as a read-only Time Travel snapshot (default: newest)",
      argsHint: "[N]",
    },
    sessions: { description: "list saved sessions (current marked with 鈻?" },
    title: { description: "ask the model to rename this session from the conversation" },
    qq: {
      description:
        "connect, inspect, or disconnect the QQ channel for this session (first connect guides App ID / App Secret setup)",
      argsHint: "[connect [appId appSecret [sandbox]]|status|disconnect]",
    },
    setup: { description: "reminds you to exit and run `DeepMiCode setup`" },
    semantic: {
      description: "show semantic_search status 鈥?built? Ollama installed? how to enable",
    },
    clear: { description: "clear visible scrollback only (log/context kept)" },
    new: { description: "start a fresh conversation (clear context + scrollback)" },
    loop: {
      description:
        "auto-resubmit <prompt> every <interval> until you type something / Esc / /loop stop",
      argsHint: "<5s..6h> <prompt>  路  stop  路  (no args = status)",
    },
    exit: { description: "quit the TUI" },
    init: {
      description:
        "scan the project and synthesize a baseline DEEPMICODE.md (model writes; review with /apply). `force` overwrites an existing file.",
      argsHint: "[force]",
    },
    apply: {
      description:
        "commit pending edit blocks to disk (no arg 鈫?all; `1`, `1,3`, or `1-4` 鈫?that subset, rest stay pending)",
      argsHint: "[N|N,M|N-M]",
    },
    discard: {
      description: "drop pending edit blocks without writing (no arg 鈫?all; indices 鈫?that subset)",
      argsHint: "[N|N,M|N-M]",
    },
    walk: {
      description:
        "step through pending edits one block at a time (git-add-p style: y/n per block, a apply rest, A flip AUTO)",
    },
    undo: { description: "roll back the last applied edit batch" },
    history: { description: "list every edit batch this session (ids for /show, undone markers)" },
    show: {
      description: "dump a stored edit diff (omit id for newest non-undone)",
      argsHint: "[id]",
    },
    commit: { description: "git add -A && git commit -m ...", argsHint: '"msg"' },
    checkpoint: {
      description:
        "snapshot every file the session has touched (Cursor-style internal store, not git). /checkpoint alone lists.",
      argsHint: "[name|list|forget <id>]",
    },
    restore: {
      description: "roll back files to a named checkpoint (see /checkpoint list)",
      argsHint: "<name|id>",
    },
    plan: {
      description: "toggle read-only plan mode (writes bounced until submit_plan + approval)",
      argsHint: "[on|off]",
    },
    mode: {
      description:
        "edit-gate: review (queue) 路 auto (apply+undo) 路 yolo (apply+auto-shell). Shift+Tab cycles.",
      argsHint: "[review|auto|yolo]",
    },
    jobs: { description: "list background jobs started by run_background" },
    kill: {
      description: "stop a background job by id (SIGTERM 鈫?SIGKILL after grace)",
      argsHint: "<id>",
    },
    logs: {
      description: "tail a background job's output (default last 80 lines)",
      argsHint: "<id> [lines]",
    },
    btw: {
      description:
        "ask a quick side question 鈥?answered from a blank slate, never added to the conversation context",
      argsHint: "<question>",
    },
    "search-engine": {
      description:
        "switch web search backend 鈥?bing (default, works from CN without proxy), searxng (self-hosted), metaso (free 100/d), tavily (free 1000/mo), perplexity (AI-native), exa (AI-native), or ollama (Ollama cloud web search)",
      argsHint: "<bing|searxng|metaso|tavily|perplexity|exa|brave|ollama> [<key>]",
    },
  },
  wizard: {
    languageTitle: "Choose your language",
    languageSubtitle: "Detected from your system locale. Switch later via /language.",
    welcomeTitle: "Welcome to DeepMiCode.",
    apiKeyPrompt: "Paste your DeepSeek API key to get started.",
    apiKeyGetOne: "Get one at: https://platform.deepseek.com/api_keys",
    apiKeySavedLocally: "Saved locally to {path}",
    apiKeyInputLabel: "key 鈥?",
    apiKeyInvalid: "Key looks too short 鈥?paste the full token (16+ chars, no spaces).",
    apiKeyChecking: "Checking API key鈥?,
    apiKeyRejected:
      "DeepSeek rejected this API key. Paste a valid key, or press Esc to cancel setup.",
    apiKeyCheckFailed:
      "Could not verify this API key right now ({message}). Check your network or try again.",
    apiKeyPreview: "preview: {redacted}",
    themeTitle: "Choose a theme",
    themeSubtitle: "Preview updates live as you navigate. Change later with /theme.",
    themeSampleHeading: "Sample",
    themeFooter: "[鈫戔啌] navigate 路 [Enter] confirm 路 [Esc] cancel",
    themeCaption: {
      dark: "Cool dark tones (default)",
      light: "Clean light mode",
      midnight: "Tokyo Night palette",
      "deep-blue": "Deep blue on black",
      "high-contrast": "Accessibility",
    },
    reviewLabelTheme: "Theme",
    mcpTitle: "Which MCP servers should DeepMiCode wire up for you?",
    mcpUserArgsHint: "(you'll provide {arg})",
    mcpFooterMulti:
      "[鈫戔啌] navigate  路  [Space] toggle  路  [Enter] confirm  路  [Esc] cancel  路  empty = skip",
    mcpArgsTitle: "Configure {name}",
    mcpArgsDirMissing: "Directory {path} doesn't exist.",
    mcpArgsDirCreateHint: "[Y/Enter] create it (mkdir -p) 路 [N/Esc] enter a different path",
    mcpArgsDirCreateFailed: "Couldn't create {path}: {message}",
    mcpArgsRequiredParam: "Required parameter: ",
    mcpArgsEmpty: "{name} needs a value 鈥?got an empty string.",
    mcpArgsNotADir: "{path} exists but is not a directory.",
    reviewTitle: "Ready to save",
    reviewLabelApiKey: "API key",
    reviewLabelLanguage: "Language",
    reviewLabelMcp: "MCP",
    reviewMcpNone: "(none)",
    reviewMcpServers: "{count} server(s)",
    reviewSavesTo: "Saves to {path}",
    reviewSaveError: "Could not save config: {message}",
    reviewFooter: "[Enter] save 路 [Esc] cancel",
    savedTitle: "鈻?Saved.",
    savedShellHint:
      "Shell commands the model wants to run ask each time 鈥?pick `allow always` on the prompt to whitelist that exact command for this project. No global allow-all flag by design.",
    savedFooter: "[Enter] to exit",
    selectFooter: "[鈫戔啌] navigate 路 [Enter] confirm 路 [Esc] cancel",
    stepCounter: "Step {step}/{total} 路 ",
    exitHint: "/exit to abort",
    apiKeyPlaceholder: "sk-...",
    themeSampleReasoning: "Reasoning",
  },
  themePicker: {
    header: "Theme",
    footer: "鈫戔啌 pick 路 鈴?confirm 路 esc cancel",
    currentPref: "current preference",
    activeNow: "active now",
    autoDesc: "use DEEPMICODE_THEME or default",
  },
  planFlow: {
    approveCardTitle: "Approve plan",
    approveCardMetaRight: "awaiting",
    openQuestionsBanner:
      "鈻?the plan flags open questions or risks 鈥?pick {refine} to write concrete answers before the model moves on.",
    openQuestionsHeader: "Open questions / risks",
    truncatedBodyMore: "鈥?{n} more line above in scrollback",
    truncatedBodyMorePlural: "鈥?{n} more lines above in scrollback",
    picker: {
      accept: "accept",
      acceptHint: "run it now, in order",
      refine: "refine",
      refineHint: "give the agent more guidance, draft a new plan",
      revise: "revise",
      reviseHint: "edit the plan inline before running (skip / reorder steps)",
      reject: "reject",
      rejectHint: "discard, agent will retry from scratch",
    },
    refineFooter: "鈴?send  路  esc return to picker",
    refineQuestionsHeading: "Answer these or describe the change you want:",
    modes: {
      approve: {
        title: "approving 鈥?any last instructions?",
        hint: "Answer questions the plan raised, add constraints, or just press Enter to approve as-is.",
        blankHint: " (Enter with blank = approve without extra instructions.)",
      },
      refine: {
        title: "refining 鈥?what should the model change?",
        hint: "Describe what's wrong or missing, or answer questions the plan raised.",
        blankHint: " (Enter with blank = let the model pick safe defaults for any open questions.)",
      },
      reject: {
        title: "rejecting 鈥?tell the model why (optional)",
        hint: "Say what the model got wrong about your goal, or what you actually want instead.",
        blankHint:
          " (Enter with blank = cancel without explanation; the model will ask what you want.)",
      },
      "checkpoint-revise": {
        title: "revising 鈥?what should change before the next step?",
        hint: "Scope change, skip steps, alternative approach 鈥?the model adjusts the remaining plan.",
        blankHint: " (Enter with blank = continue with the current plan.)",
      },
      "choice-custom": {
        title: "custom answer 鈥?type whatever fits",
        hint: "Free-form reply. The model reads it verbatim and proceeds 鈥?no need to match the listed options.",
        blankHint: " (Enter with blank = ask the model what you actually want.)",
      },
    },
    checkpoint: {
      title: "Checkpoint 鈥?step done",
      continue: "Continue 鈥?run the next step",
      continueHint: "Model resumes with the next step.",
      finish: "Finish 鈥?summarize and close",
      finishHint: "Model records the final step and summarizes the completed plan.",
      revise: "Revise 鈥?give feedback before the next step",
      reviseHint: "Stay paused, type guidance; model adjusts the remaining plan.",
      stop: "Stop 鈥?end the plan here",
      stopHint: "Model summarizes what was done and ends.",
    },
    stepList: {
      counter: "{total} steps",
      counterSingular: "{total} step",
      counterDone: "{done}/{total} done ({pct}%) 路 {total} steps",
      counterDoneSingular: "{done}/{total} done ({pct}%) 路 {total} step",
    },
    noPlanSummary: "No plan body submitted yet.",
    detailCollapsedHint: "Ctrl+P expands full plan details.",
    detailExpandedHint: "Ctrl+P collapses details.",
    detailHeader: "Plan details",
    detailWindow: "showing lines {start}-{end} of {total}",
    detailScrollHint: "PgUp/PgDn scroll details 路 Home/End jump",
    reviseTitle: "Revise plan",
    reviseSteps: "{count} steps",
    reviseFooter:
      "\u2191\u2193 focus  \u00b7  space toggle skip  \u00b7  k/j move  \u00b7  \u23ce accept  \u00b7  esc cancel",
    riskMed: " med",
    riskHigh: " high",
    completeMsg: "\u25b8 plan complete \u2014 all {total} step{s} done \u00b7 archived",
  },
  app: {
    walkCancelledRemaining: "鈻?walk cancelled 鈥?{count} block(s) still pending.",
    walkCancelled: "鈻?walk cancelled.",
    editModeYolo:
      "鈻?edit mode: YOLO 鈥?edits AND shell commands auto-run. /undo still rolls back edits. Use carefully.",
    editModeAuto:
      "鈻?edit mode: AUTO 鈥?edits apply immediately; press u within 5s to undo (space pauses the timer). Shell commands still ask.",
    editModeReview: "鈻?edit mode: review 鈥?edits queue for /apply (or y) / /discard (or n)",
    rejectedEdit: "鈻?rejected edit to {path}{context}",
    autoApprovingRest: "鈻?auto-approving remaining edits for this turn",
    flippedAutoSession: "鈻?flipped to AUTO mode for the rest of the session (persisted)",
    flippedAutoWalk: "鈻?flipped to AUTO mode 鈥?future edits will apply immediately. Walk exited.",
    dashboardStopped: "鈻?dashboard stopped.",
    notedMemory: "鈻?noted ({scope}) 鈥?{verb} {path}",
    notedScopeProject: "project",
    notedScopeGlobal: "global",
    notedVerbCreated: "created",
    notedVerbAppended: "appended to",
    memoryWriteFailed: "# memory write failed",
    verboseOn: "鈻?verbose mode on 鈥?full reasoning + tool output",
    verboseOff: "鈻?verbose mode off 鈥?head/tail elision restored",
    commandFailed: "! command failed",
    steerInjected: "鈻?steering queued 鈥?will be added after the current step",
    steerCommandRejected: "鈻?commands are disabled while steering a busy turn",
    btwUsage: "鈻?/btw <question> 鈥?ask a side question without polluting the conversation context.",
    btwHeader: "鈮?btw",
    btwFailed: "/btw failed",
    restoreCodeOnly: "鈻?/restore is code-mode only",
    hookUserPromptSubmit: "UserPromptSubmit hook",
    hookStop: "Stop hook",
    atMentions: "鈻?@mentions: {parts}",
    atUrl: "鈻?@url: {parts}",
    atUrlFailed: "@url expansion failed",
    sessionTitleNoSession: "鈻?no persisted session is active, so there is nothing to rename.",
    sessionTitleNoContent: "鈻?not enough conversation content to name this session yet.",
    sessionTitleNoTitle: "鈻?the model did not return a usable session title.",
    sessionTitleUpdated: '鈻?session title updated: "{title}"',
    sessionTitleRenameFailed: '鈻?could not rename the session for title "{title}".',
    sessionTitleRenamed: '鈻?session renamed to "{name}" 鈥?{title}',
    sessionTitleAutoRenamed: '鈻?auto-named session "{name}" 鈥?{title}',
    workspaceSwitched: "鈻?workspace switched to {root}",
    semanticRepointed: "鈻?semantic_search re-pointed at {root}",
    semanticDisabledForRoot: "鈻?semantic_search disabled (no compatible index in {root})",
    semanticRebootstrapFailed: "鈻?semantic_search re-bootstrap failed: {reason}",
    denied: "鈻?denied: {cmd}{context}",
    alwaysAllowed: '鈻?always allowed "{prefix}" for {dir}',
    runningCommand: "鈻?running: {cmd}",
    startingBackground: "鈻?starting (background): {cmd}",
    checkpointSaved:
      "鉀?checkpoint saved 路 {id} 路 {count} file{s} 路 /restore {id} to roll back this step",
    continuingAfter: "鈻?continuing after {label}{counter}",
    planStoppedAt: "鈻?plan stopped at {label}{counter}",
    revisingAfter: "鈻?revising after {label} 鈥?{feedback}",
    historyScrollHint: " 鈫?reading history 路 End / PgDn returns to bottom 路 鈫?advances one line",
    editHistoryTitle: "Edit history (oldest first):",
    editHistoryNoCodeMode: "not in code mode",
    editHistoryNoEdits: "no edits recorded this session yet",
    editHistoryNoShowId:
      "usage: /show [id] [path]   (omit id for newest; path from the per-file summary)",
    editHistoryIdNotFound: "no edit #{id} 鈥?run /history to see valid ids",
    editHistoryLookupFailed: "unexpected: history lookup failed",
    editHistoryBatchNoFile: 'batch #{id} doesn\'t include "{path}" 鈥?files in this batch: {files}',
    editHistoryNoEdits2: "no edits recorded this session 鈥?/history is empty",
    editHistoryStatusApplied: "applied",
    editHistoryStatusPartial: "PARTIAL",
    editHistoryStatusUndone: "UNDONE",
    editHistoryHelpShow:
      "/show <id>            \u2192 per-file summary    \u00b7    /show <id> <path>  \u2192 full diff of one file",
    editHistoryHelpUndo:
      "/undo                 \u2192 newest non-undone   \u00b7    /undo <id> [path]  \u2192 target a specific batch or file",
    editHistoryAlreadyReverted: "(already reverted \u2014 /history shows the batch-level status)",
    editHistoryRevertFile: "/undo {id} {path}  \u2192 revert just this file",
    mcpFailed: "MCP {name} failed",
    mcpWarn: "MCP {name} warn",
    unknownTheme: "unknown theme: {name}\navailable: {choices}",
    themeSaved: "theme saved: {name}\nactive on next launch: {active}",
    noPendingEdits:
      "nothing pending \u2014 the model hasn\u2019t proposed edits since the last /apply or /discard.",
    noMatchedApply:
      "\u25b8 no edits matched those indices \u2014 nothing applied. Use /apply with no args to commit them all.",
    noPendingDiscard: "nothing pending to discard.",
    noMatchedDiscard: "\u25b8 no edits matched those indices \u2014 nothing discarded.",
    blocksStillPending:
      "\u25b8 {count} edit block(s) still pending \u2014 /apply or /discard to clear them.",
    nothingWritten: ". Nothing was written to disk.",
    discardedCount: "\u25b8 discarded {count} pending edit block(s)",
    noEventsFor: 'no events for session "{name}"',
    lookedAtFile: "looked at: {path}",
    sidecarHint:
      "(sessions auto-create the sidecar on first turn \u2014 has this session run yet?)",
  },
  hooks: {
    head: "hook {tag} `{cmd}` {decision}{truncTag}",
    headWithDetail: "hook {tag} `{cmd}` {decision}{truncTag}: {detail}",
    truncated: " (output truncated at 256KB)",
    decisionBlock: "block",
    decisionWarn: "warn",
    decisionTimeout: "timeout",
    decisionError: "error",
  },
  summary: {
    status: "summarizing what was gathered鈥?,
    hallucinatedFallback:
      "(model emitted fake tool-call markup instead of a prose summary 鈥?try /retry with a narrower question, or /think to inspect R1's reasoning)",
    failedAfterReason:
      "{label} and the fallback summary call failed: {message}. Run /clear and retry with a narrower question, or raise --max-tool-iters.",
  },
  loop: {
    budgetExhausted:
      "session budget exhausted 鈥?spent ${spent} 鈮?cap ${cap}. Bump the cap with /budget <usd>, clear it with /budget off, or end the session.",
    budget80Pct: "鈻?budget 80% used 鈥?${spent} of ${cap}. Next turn or two likely trips the cap.",
    proArmed: "鈬?/pro armed 鈥?this turn runs on deepseek-v4-pro (one-shot 路 disarms after turn)",
    toolUploadStatus: "tool result uploaded 路 model thinking before next response鈥?,
    turnStartFoldStatus: "turn start: context approaching limit, compacting history鈥?,
    turnStartFolded:
      "turn start: request ~{estimate}/{ctxMax} tokens ({pct}%) 鈥?compacted {beforeMessages} messages 鈫?{afterMessages}. Sending.",
    harvestStatus: "extracting plan state from reasoning鈥?,
    repeatToolCallWarning:
      "Caught a repeated tool call 鈥?let the model see the issue and retry with a different approach.",
    stormStuck:
      "Stopped a stuck retry loop 鈥?the model kept calling the same tool with identical args after a self-correction nudge. Try /retry, rephrase, or rule out the underlying blocker.",
    stormSuppressed: "Suppressed {count} repeated tool call(s) 鈥?same name + args fired 3+ times.",
    compactingHistoryStatus: "compacting history{aggressiveTag}鈥?,
    aggressiveTag: " (aggressive)",
    foldedHistory:
      "context {before}/{ctxMax} ({pct}%) 鈥?folded {beforeMessages} messages 鈫?{afterMessages} (summary {summaryChars} chars). Continuing.",
    aggressivelyFoldedHistory:
      "context {before}/{ctxMax} ({pct}%) 鈥?aggressively folded {beforeMessages} messages 鈫?{afterMessages} (summary {summaryChars} chars). Continuing.",
    forcingSummary:
      "context {before}/{ctxMax} ({pct}%) 鈥?forcing summary from what was gathered. Run /compact, /clear, or /new to reset.",
  },
  errors: {
    contextOverflow:
      "Context overflow (DeepSeek 400): session history is {requested}, past the model's prompt limit (V4: 1M tokens; legacy chat/reasoner: 131k). Usually a single tool result grew too big. DeepMiCode caps new tool results at 8k tokens and auto-heals oversized history on session load 鈥?a restart often clears it. If it still overflows, run /new to start fresh, or open /sessions and press [d] to delete this session.",
    contextOverflowTooMany: "too many tokens",
    auth401:
      "Authentication failed (DeepSeek 401): {inner}. Your API key is rejected. Fix with `DeepMiCode setup` or `export DEEPSEEK_API_KEY=sk-...`. Get one at https://platform.deepseek.com/api_keys.",
    balance402:
      "Out of balance (DeepSeek 402): {inner}. Top up at https://platform.deepseek.com/top_up 鈥?the panel header shows your balance once it's non-zero.",
    badparam422: "Invalid parameter (DeepSeek 422): {inner}",
    badrequest400: "Bad request (DeepSeek 400): {inner}",
    concurrency429:
      "DeepSeek concurrency limit hit (429): {inner}. The account has too many in-flight requests (cap: 500 for v4-pro, 2500 for v4-flash, summed across API keys account-wide). Usually means another DeepMiCode process is sharing the same key, or a parallel subagent fan-out overshot. Wait a few seconds and retry, reduce parallelism, or request a higher cap at https://platform.deepseek.com.",
    deepseek5xxHead:
      "DeepSeek service unavailable ({status}) 鈥?this is a DeepSeek-side problem, not DeepMiCode. Already retried 4脳 with backoff.",
    deepseek5xxReachable:
      " DeepSeek's main API answered our health check, but /chat/completions is failing 鈥?partial outage on their side.",
    deepseek5xxUnreachable:
      " DeepSeek API is unreachable from your network 鈥?could be a wider DS outage or a local network issue.",
    deepseek5xxActionNetwork:
      " Try: (1) check your network, (2) wait 30s and retry, (3) status page: https://status.deepseek.com.",
    deepseek5xxActionRetry:
      " Try: (1) wait 30s and retry, (2) /model to switch model, (3) status page: https://status.deepseek.com.",
    upstream5xxHead:
      "Upstream service unavailable ({status}) at {host} 鈥?the configured API endpoint returned a server error, not a DeepMiCode bug. Already retried 4脳 with backoff.",
    upstream5xxActionRetry:
      " Try: (1) check that the local/proxy model server is up, (2) wait and retry, (3) /model to switch model.",
    innerNoMessage: "(no message)",
    reasonAborted: "[aborted by user (Esc) 鈥?summarizing what I found so far]",
    reasonContextGuard:
      "[context budget running low 鈥?summarizing before the next call would overflow]",
    reasonStuck:
      "[stuck on a repeated tool call 鈥?explaining what was tried and what's blocking progress]",
    labelAborted: "aborted by user",
    labelContextGuard: "context-guard triggered (prompt > 80% of window)",
    labelStuck: "stuck (repeated tool call suppressed by storm-breaker)",
  },
  handlers: {
    basic: {
      newInfo:
        "鈻?new conversation 鈥?dropped {count} message(s) from context. Same session, fresh slate.",
      newInfoArchived:
        '鈻?new conversation 鈥?dropped {count} message(s) from context. Prior transcript archived as "{archived}" (visible under Sessions).',
      newInfoSystemReloaded:
        " 路 DEEPMICODE.md / project memory reloaded (next turn pays one cache miss)",
      helpTitle: "Commands:",
      helpShellTitle: "Shell shortcut:",
      helpShell: "  !<cmd>                   run <cmd> in the sandbox root; output goes into",
      helpShellDetail:
        "                             the conversation so the model sees it next turn.",
      helpShellConsent:
        "                             No allowlist gate 鈥?user-typed = explicit consent.",
      helpShellExample: "                             Example: !git status   !ls src/   !npm test",
      helpShellGateTitle: "Model-invoked shell commands (per-call approval):",
      helpShellGate:
        "  鈫戔啌 + 鈴?                  each call shows a prompt with `allow once` / `allow always`",
      helpShellGateDetail:
        "                             / `deny`. Pick `allow always` to whitelist that exact",
      helpShellGatePolicy:
        "                             command prefix for this project. No global allow-all flag.",
      helpMemoryTitle: "Quick memory:",
      helpMemoryPin:
        "  #<note>                  append <note> to <project>/DEEPMICODE.md (committable).",
      helpMemoryPinEx:
        "                             Example: #findByEmail must be case-insensitive",
      helpMemoryGlobal:
        "  #g <note>                append <note> to ~/.deepmicode/DEEPMICODE.md (global, never committed).",
      helpMemoryGlobalEx: "                             Example: #g always run pnpm not npm",
      helpMemoryPinBoth:
        "                             Both pin into every future session's prefix. Faster than /memory.",
      helpMemoryEscape:
        "                             Use `\\#text` to send a literal `#text` to the model.",
      helpFileTitle: "File references (code mode):",
      helpFile: "  @path/to/file            inline file content under [Referenced files] on send.",
      helpFilePicker:
        "                             Type `@` to open the picker (鈫戔啌 navigate, Tab/Enter pick).",
      helpUrlTitle: "URL references:",
      helpUrl:
        "  @https://example.com     fetch the URL, strip HTML, inline under [Referenced URLs].",
      helpUrlCache:
        "                             Same URL twice in one session fetches once (in-mem cache).",
      helpUrlPunct:
        "                             Trailing sentence punctuation (./,/)) is stripped automatically.",
      helpSessionsTitle: "Sessions (auto-enabled by default, named 'default'):",
      helpSessionCustom: "  DeepMiCode chat --session <name>   use a different named session",
      helpSessionNone: "  DeepMiCode chat --no-session       disable persistence for this run",
      retryNone: "nothing to retry 鈥?no prior user message in this session's log.",
      retryInfo: '鈻?retrying: "{preview}"',
      loopTuiOnly: "/loop is only available in the interactive TUI (not in run/replay).",
      loopStopped: "鈻?loop stopped.",
      loopNoActive: "no active loop to stop.",
      loopNoActiveHint:
        "no active loop. Start one with `/loop <interval> <prompt>` (e.g. /loop 30s npm test).\nCancels on: /loop stop 路 Esc 路 /clear /new 路 any user-typed prompt.",
      loopStarted:
        '鈻?loop started 鈥?re-submitting "{prompt}" every {duration}. Type anything (or /loop stop) to cancel.',
      keysNeedsTui: "/keys needs a TUI context (postKeys wired).",
      aboutHeader: "DeepMiCode v{version} 鈥?a cache-first DeepSeek coding agent",
      aboutWebsiteLabel: "Website",
      aboutRepoLabel: "GitHub ",
      aboutLicenseLabel: "License",
      unknownCommand: "unknown command: /{cmd} 鈥?did you mean {list}?",
      unknownCommandShort: "unknown command: /{cmd}  (try /help)",
    },
    sessions: {
      titleUnavailable: "/title is only available in an active persisted TUI session.",
      titleStarted: "鈻?naming session鈥?,
      titleFailed: "鈻?session title failed: {reason}",
    },
    qq: {
      unavailable: "/qq is not available in this session.",
      connecting: "QQ: connecting鈥?,
      connectFailed: "QQ connect failed: {reason}",
      disconnecting: "QQ: disconnecting鈥?,
      disconnectFailed: "QQ disconnect failed: {reason}",
      usage: "Usage: /qq connect [appId appSecret [sandbox]] | /qq status | /qq disconnect",
      promptAppId:
        "QQ setup: enter your QQ Open Platform App ID, then press Enter. Type /cancel to abort.",
      promptAppSecret:
        "QQ setup: enter your QQ Open Platform App Secret, then press Enter. Type /cancel to abort.",
      setupWaitingAppId: "waiting for App ID",
      setupWaitingAppSecret: "waiting for App Secret",
      setupCancelled: "QQ setup cancelled.",
      credentialsRequired: "QQ App ID and App Secret are required.",
      connected: "QQ connected in {mode} mode. It will auto-start on future launches.",
      alreadyConnected: "QQ is already connected in {mode} mode. Auto-start is enabled.",
      disconnected: "QQ disconnected. Auto-start is disabled.",
      status:
        "QQ: {connected}, auto-start {enabled}, credentials {configured}, appId {appId}, {sandbox}, access {access}, current mode {mode}.",
      statusSetup: "QQ: setup in progress 鈥?{step}",
      stateConnected: "connected",
      stateDisconnected: "disconnected",
      stateEnabled: "enabled",
      stateDisabled: "disabled",
      stateConfigured: "configured",
      stateNotConfigured: "not configured",
      sandbox: "sandbox",
      production: "production",
      none: "none",
      modeChat: "chat",
      modeCode: "code",
      accessOwner: "owner {owner}",
      accessOwnerWithAllowlist: "owner {owner}, allowlist {count}",
      accessAllowlist: "allowlist {count}",
      accessRuntime: "first-sender (runtime only, {owner})",
      accessOpen: "open (unbound)",
      lockAlreadyRunning:
        "QQ channel is already running in process {pid}. Stop that process before starting another QQ channel.",
      unauthorizedMessage:
        "QQ ignored message from unauthorized openid {openid}. Current access: {access}.",
      runtimeBound:
        "QQ temporarily bound this run to first sender {openid}. Set `qq.ownerOpenId` in config to persist access.",
      missingAppId: "QQ App ID is required. Run `/qq connect` to configure.",
      missingAppSecret: "QQ App Secret is required. Run `/qq connect` to configure.",
      authFailed: "QQ bot authentication failed 鈥?check your App ID and App Secret.",
      readyTimeout: "QQ bot did not receive READY within 15s 鈥?check your App ID and App Secret.",
    },
    admin: {
      doctorNeedsTui: "/doctor needs a TUI context (postDoctor wired).",
      doctorRunning: "鈿?Doctor 鈥?running health checks鈥?,
      hooksReloadUnavailable:
        "/hooks reload is not available in this context (no reload callback wired).",
      hooksReloaded: "鈻?reloaded hooks 路 {count} active",
      hooksUsage:
        "usage: /hooks            list active hooks\n       /hooks reload     re-read settings.json files",
      hooksNone: "no hooks configured.",
      hooksDropHint: "drop a settings.json with a `hooks` key into either of:",
      hooksProject: "  路 {path} (project)",
      hooksProjectFallback: "  路 <project>/.deepmicode/settings.json (project)",
      hooksGlobal: "  路 {path} (global)",
      hooksEvents: "events: PreToolUse, PostToolUse, UserPromptSubmit, Stop",
      hooksExitCodes: "exit 0 = pass 路 exit 2 = block (Pre*) 路 other = warn",
      hooksLoaded: "鈻?{count} hook(s) loaded",
      hooksSources: "sources: project={project} 路 global={global}",
      updateCurrent: "current: DeepMiCode {version}",
      updateLatestPending: "latest:  (not yet resolved 鈥?background check in flight or offline)",
      updateRetryHint: "triggered a fresh registry fetch 鈥?retry `/update` in a few seconds,",
      updateRetryHint2: "or run `DeepMiCode update` in another terminal to force it synchronously.",
      updateLatest: "latest:  DeepMiCode {version}",
      updateUpToDate: "you're on the latest. nothing to do.",
      updateNpxHint: "you're running via npx 鈥?the next `npx DeepMiCode ...` launch will auto-fetch.",
      updateNpxForce: "to force a refresh sooner: `npm cache clean --force`.",
      updateUpgradeHint: "to upgrade, exit this session and run:",
      updateUpgradeCmd1:
        "  DeepMiCode update           (interactive, dry-run supported via --dry-run)",
      updateUpgradeCmd2: "  {command}   (direct)",
      updateInSessionDisabled:
        "in-session install is deliberately disabled 鈥?the install spawn would",
      updateInSessionDisabled2:
        "corrupt this TUI's rendering and Windows can lock the running binary.",
      statsNoData: "no usage data yet.",
      statsEveryTurn: "every turn you run here appends one record 鈥?this session's turns",
      statsWillAppear: "will show up in the dashboard once you send a message.",
    },
    edits: {
      undoCodeOnly:
        "/undo is only available inside `DeepMiCode code` 鈥?chat mode doesn't apply edits.",
      historyCodeOnly: "/history is only available inside `DeepMiCode code`.",
      showCodeOnly: "/show is only available inside `DeepMiCode code`.",
      applyCodeOnly: "/apply is only available inside `DeepMiCode code` (nothing to apply here).",
      discardCodeOnly: "/discard is only available inside `DeepMiCode code`.",
      planCodeOnly:
        "/plan is only available inside `DeepMiCode code` 鈥?chat mode doesn't gate tool writes.",
      planOn:
        "鈻?plan mode ON 鈥?write tools are gated; the model MUST call `submit_plan` before anything executes. (The model can also call submit_plan on its own for big tasks even when plan mode is off 鈥?this toggle is the stronger, explicit constraint.) Type /plan off to leave.",
      planOff:
        "鈻?plan mode OFF 鈥?write tools are live again. Model can still propose plans autonomously for large tasks.",
      modeCodeOnly: "/mode is only available inside `DeepMiCode code`.",
      modeUsage: "usage: /mode <review|auto|yolo>   (Shift+Tab also cycles)",
      modeYolo:
        "鈻?edit mode: YOLO 鈥?edits AND shell commands auto-run with no prompt. /undo still rolls back edits. Use carefully.",
      modeAuto:
        "鈻?edit mode: AUTO 鈥?edits apply immediately; press u within 5s to undo, or /undo later. Shell commands still ask.",
      modeReview: "鈻?edit mode: review 鈥?edits queue for /apply (or y) / /discard (or n)",
      commitCodeOnly: "/commit is only available inside `DeepMiCode code` (needs a rooted git repo).",
      commitUsage:
        'usage: /commit "your commit message"  鈥?runs `git add -A && git commit -m "鈥?` in {root}',
      walkCodeOnly: "/walk is only available inside `DeepMiCode code`.",
      checkpointCodeOnly:
        "/checkpoint is only available inside `DeepMiCode code` 鈥?chat mode doesn't apply edits.",
      checkpointNone:
        "no checkpoints yet 鈥?`/checkpoint <name>` snapshots every file the session has touched. Restore later with `/restore <name>`.",
      checkpointHeader: "鈼?checkpoints 路 {count} stored",
      checkpointRestoreHint:
        "  /restore <name|id> 路 /checkpoint forget <id> 路 /checkpoint <name> to add",
      checkpointForgetUsage: "usage: /checkpoint forget <id|name>",
      checkpointNoMatch: '鈻?no checkpoint matching "{name}" 鈥?see /checkpoint list',
      checkpointDeleted: "鈻?deleted checkpoint {id} ({name})",
      checkpointDeleteFailed: "鈻?failed to delete {id} (already gone?)",
      checkpointSaveUsage: "usage: /checkpoint <name>   (or /checkpoint list to see existing)",
      checkpointSavedEmpty:
        '鈻?checkpoint "{name}" saved ({id}) 鈥?but no files have been touched yet, so it\'s an empty baseline. Edits made after this point will be revertable.',
      checkpointSaved:
        '鈻?checkpoint "{name}" saved ({id}) 鈥?{files} file{s}, {size} KB. Restore: /restore {name}',
      restoreCodeOnly: "/restore is only available inside `DeepMiCode code`.",
      restoreUsage: "usage: /restore <name|id>   (see /checkpoint list for ids)",
      restoreNoMatch: '鈻?no checkpoint matching "{target}" 鈥?try /checkpoint list',
      restoreInfo: '鈻?restored "{name}" ({id}) from {when}',
      restoreWrote: "  路 wrote back {count} file{s}",
      restoreRemoved: "  路 removed {count} file{s} (didn't exist at checkpoint time)",
      restoreSkipped: "  鉁?{count} file{s} skipped:",
      cwdCodeOnly: "/cwd is only available inside `DeepMiCode code`.",
      cwdUsage:
        "usage: /cwd <path>   (current root: {current}). Re-points filesystem / shell / memory tools to <path>.",
      cwdUsageNoCurrent: "usage: /cwd <path>   re-points the workspace root to <path>.",
    },
    model: {
      modelHint: "try deepseek-v4-flash or deepseek-v4-pro 鈥?run /models to fetch the live list",
      modelUsage: "usage: /model <id>   ({hint})",
      modelNotInCatalog:
        "model 鈫?{id}   (鈿?not in the fetched catalog: {list}. If this is wrong the next call will 400 鈥?run /models to refresh.)",
      modelSet: "model 鈫?{id}",
      effortStatus: "effort 鈫?{current}   (pick: {list})",
      effortUsage:
        "usage: /effort <{list}>   (high is the safe default; max is a DeepSeek extension)",
      effortUsageNoMax: "usage: /effort <{list}>",
      effortSet: "effort 鈫?{effort}",
      budgetNoCap:
        "no session budget set 鈥?DeepMiCode will keep going until you stop it. Set one with: /budget <usd>   (e.g. /budget 5)",
      budgetStatus:
        "budget: ${spent} of ${cap} ({pct}%) 路 /budget off to clear, /budget <usd> to change",
      budgetOff: "budget 鈫?off (no cap)",
      budgetUsage:
        'usage: /budget <usd>   (got "{arg}" 鈥?must be a positive number, e.g. /budget 5 or /budget 12.50)',
      budgetExhausted:
        "鈻?budget 鈫?${cap} but already spent ${spent}. Next turn will be refused 鈥?bump the cap higher to keep going, or end the session.",
      budgetSet:
        "budget 鈫?${cap}  (so far: ${spent} 路 warns at 80%, refuses next turn at 100% 路 /budget off to clear)",
    },
    permissions: {
      mutateCodeOnly:
        "/permissions add / remove / clear are only available inside `DeepMiCode code` 鈥?they edit the project-scoped allowlist (`~/.deepmicode/config.json` projects[<root>].shellAllowed).",
      addUsage:
        'usage: /permissions add <prefix>   (multi-token OK: /permissions add "git push origin")',
      addAlready: "鈻?already allowed: {prefix}",
      addBuiltin:
        "鈻?`{prefix}` is already in the builtin allowlist 鈥?no per-project entry needed. (Builtin entries are always on.)",
      addInfo:
        "鈻?added: {prefix}\n  鈫?next `{prefix}` invocation runs without prompting in this project.",
      removeUsage:
        "usage: /permissions remove <prefix-or-index>   (e.g. /permissions remove 3, or /permissions remove npm)",
      removeEmpty: "鈻?no project allowlist entries to remove.",
      removeIndexOob: "鈻?index out of range: {idx} (project list has {count} entries)",
      removeNothing: "鈻?nothing to remove.",
      removeBuiltin:
        "鈻?`{prefix}` is in the builtin allowlist (read-only). Builtin entries can't be removed at runtime 鈥?they're baked into the binary.",
      removeInfo: "鈻?removed: {prefix}",
      removeNotFound:
        "鈻?no such project entry: {prefix}   (try /permissions list to see what's stored)",
      clearAlready: "鈻?project allowlist is already empty.",
      clearConfirm:
        "about to drop {count} project allowlist entr{plural} for {root}. Re-run with the word 'confirm' to proceed: /permissions clear confirm",
      clearedNone: "鈻?project allowlist was already empty 鈥?nothing changed.",
      cleared: "鈻?cleared {count} project allowlist entr{plural}.",
      usage:
        'usage: /permissions [list]                   show current state\n       /permissions add <prefix>            persist (e.g. "npm run build")\n       /permissions remove <prefix-or-N>    drop one entry\n       /permissions clear confirm           wipe every project entry',
      modeYolo:
        "鈻?edit mode: YOLO  鈥?every shell command auto-runs, allowlist is bypassed. /mode review to re-enable prompts.",
      modeAuto:
        "鈻?edit mode: auto  鈥?edits auto-apply, shell still gated by allowlist (or ShellConfirm prompt for non-allowlisted).",
      modeReview:
        "鈻?edit mode: review 鈥?both edits and non-allowlisted shell commands ask before running.",
      projectHeader: "Project allowlist ({count}) 鈥?{root}",
      projectNone1: '  (none 鈥?pick "always allow" on a ShellConfirm prompt to add one,',
      projectNone2: "   or `/permissions add <prefix>` directly.)",
      projectNoRoot: "Project allowlist 鈥?(no project root; chat mode shows builtin entries only)",
      builtinHeader: "Builtin allowlist ({count}) 鈥?read-only, baked in",
      subcommands:
        "Subcommands: /permissions add <prefix> 路 /permissions remove <prefix-or-N> 路 /permissions clear confirm",
    },
    dashboard: {
      notAvailable:
        "/dashboard is not available in this context (no startDashboard callback wired).",
      stopNoCallback: "/dashboard stop: no stop callback wired.",
      notRunning: "鈻?dashboard is not running.",
      stopping: "鈻?dashboard stopping鈥?,
      alreadyRunning: "鈻?dashboard is already running:",
      alreadyRunningHint: "Open it in any browser. Type `/dashboard stop` to tear it down.",
      ready: "鈻?dashboard ready:",
      readyHint: "127.0.0.1 only 路 token-gated. Type `/dashboard stop` to shut down.",
      failed: "鈻?dashboard failed to start: {reason}",
      starting: "鈻?starting dashboard server鈥?,
      copied: "鈻?dashboard URL copied to clipboard: {url}",
      tokenResetting: "鈻?rotating dashboard token 鈥?restarting server鈥?,
      tokenReset: "鈻?dashboard token rotated. New URL:",
    },
    observability: {
      contextInfo: "context: ~{total} of {max} ({pct}%) 路 system {sys} 路 tools {tools} 路 log {log}",
      compactStarting: "鈻?folding older turns into a summary鈥?,
      compactNoop: "鈻?nothing to fold 鈥?log already small or recent turns alone exceed the budget.",
      compactDone: "鈻?folded {before} messages 鈫?{after} (summary {chars} chars). Continuing.",
      compactFailed: "鈻?fold failed: {reason}",
      costNoTurn: "no turn yet 鈥?`/cost` shows the most recent turn's token + spend breakdown.",
      costNeedsTui: "/cost needs a TUI context (postUsage wired).",
      costNoPricing:
        '鈻?/cost: no pricing table for model "{model}". Add one to telemetry/stats.ts.',
      costEstimate:
        "鈻?/cost estimate 路 {model} 路 {prompt} prompt tokens (sys {sys} + tools {tools} + log {log} + msg {msg})",
      costWorstCase:
        "  worst case (full miss): {input} input + ~{output} output ({avg} avg) 鈮?{total}",
      costLikely: "  likely ({pct}% session cache hit): {input} input + ~{output} output 鈮?{total}",
      costLikelyCold: "  likely: matches worst case until cache fills (no completed turns yet)",
      statusModel: "  model   {model}",
      statusFlags: "  flags   stream={stream} 路 effort={effort}",
      statusCtx: "  ctx     {bar} {used}/{max} ({pct}%)",
      statusCtxNone: "  ctx     no turns yet",
      statusCost: "  cost    ${cost} 路 cache {bar} {pct}% 路 turns {turns}",
      statusCostCold: "  cost    ${cost} 路 turns {turns} (cache warming up)",
      statusBudget: "  budget  ${spent} / ${cap} ({pct}%){tag}",
      statusSession: '  session "{name}" 路 {count} messages in log (resumed {resumed})',
      statusSessionEphemeral: "  session (ephemeral 鈥?no persistence)",
      statusWorkspace:
        "  workspace {path} 路 pinned at launch (relaunch with --dir <path> to switch)",
      statusMcp: "  mcp     {servers} server(s), {tools} tool(s) in registry",
      statusEdits: "  edits   {count} pending (/apply to commit, /discard to drop)",
      statusPlan: "  plan    ON 鈥?writes gated (submit_plan + approval)",
      statusLifecycle: "  lifecycle {mode}/{state} 路 {progress}{evidence}",
      lifecycleNoPlan: "no plan",
      lifecycleEvidencePending: "evidence pending",
      lifecycleRejected: "lifecycle: {tool} blocked in {state} 鈥?next: {next}",
      lifecycleEvidenceRejected: "lifecycle: step {stepId} needs evidence 鈥?next: {next}",
      lifecycleRepeatedRejected:
        "lifecycle: repeated {tool} rejection 鈥?do not retry identical args",
      statusModeYolo:
        "  mode    YOLO 鈥?edits + shell auto-run with no prompt (/undo still rolls back 路 Shift+Tab to flip)",
      statusModeAuto:
        "  mode    AUTO 鈥?edits apply immediately (u to undo within 5s 路 Shift+Tab to flip)",
      statusModeReview: "  mode    review 鈥?edits queue for /apply or y  (Shift+Tab to flip)",
      statusDash: "  dash    {url} (open in browser 路 /dashboard stop)",
    },
    plans: {
      noSession:
        "no session attached 鈥?`/plans` is per-session. Run `DeepMiCode code` in a project to get a session.",
      activePlan: "鈻?active plan{label} 鈥?{done}/{total} step{s} done 路 last touched {when}",
      activeNone: "鈻?active plan: (none)",
      noArchives:
        "no archived plans yet for this session 鈥?they auto-archive when every step is done",
      archivedHeader: "Archived ({count}):",
      evidencePending:
        "  ! evidence pending 鈥?current step needs verification/diff/checkpoint/manual evidence",
      evidenceLine: "  evidence {stepId}: {summary}",
      archivedEvidenceLine: "    evidence: {summary}",
      replayNoSession:
        "no session attached 鈥?`/replay` is per-session. Run `DeepMiCode code` in a project to get a session.",
      replayNoArchives:
        "no archived plans yet for this session 鈥?`/replay` lights up once a plan completes (auto-archives when every step is done).",
      replayInvalidIndex:
        "invalid index 鈥?`/replay` takes 1..{max} (newest = 1). Use `/plans` to see the list.",
      archivedRow: "  鉁?{when}  {total} step{s} 路 {completion}  {label}",
      completionComplete: "complete",
      stopAborted:
        "鈻?plan stopped 鈥?model aborted; type a follow-up to continue or start a new task.",
      doneUsage:
        "usage: /plans done <stepId>  路  /plans done all 鈥?manual override when the model forgot to call mark_step_complete",
      doneUnavailable: "/plans done is only available inside an active session.",
      doneNoPlan: "no active plan 鈥?nothing to mark done.",
      doneNotInPlan: "step `{id}` is not in the active plan. Run /plans to see the step ids.",
      doneAlready: "step `{id}` was already marked done.",
      doneOk: "鈻?marked step `{id}` done.",
      doneAllNoop: "every step is already done.",
      doneAllOk: "鈻?marked {count} step(s) done.",
    },
    jobs: {
      codeOnly: "/jobs is only available inside `DeepMiCode code`.",
      killCodeOnly: "/kill is only available inside `DeepMiCode code`.",
      logsCodeOnly: "/logs is only available inside `DeepMiCode code`.",
      empty:
        "鈼?jobs 路 0 running 路 0 total\n  (run_background spawns one 鈥?dev servers, watchers, long-running scripts)",
      header: "鈼?jobs 路 {running} running 路 {total} total",
      footer: "  /logs <id> tail 路 /kill <id> SIGTERM 鈫?SIGKILL",
      killUsage: "usage: /kill <id>   (see /jobs for ids)",
      killNotFound: "job {id}: not found",
      killAlreadyExited: "job {id} already exited ({code})",
      killStopping:
        "鈻?stopping job {id} (tree kill: SIGTERM 鈫?SIGKILL after 2s grace; Windows: taskkill /T /F)",
      killStatus: "鈻?job {id} {status}",
      killStillAlive: "still alive after SIGKILL (!) 鈥?report this as a bug",
      logsUsage: "usage: /logs <id> [lines]   (default last 80 lines)",
      logsNotFound: "job {id}: not found",
      logsStatus: "[job {id} 路 {status}]\n$ {command}",
      logsRunning: "running 路 pid {pid}",
      logsExited: "exited {code}",
      logsFailed: "failed ({reason})",
      logsStopped: "stopped",
    },
    memory: {
      disabled:
        "memory is disabled (DEEPMICODE_MEMORY=off in env). Unset the var to re-enable 鈥?no DEEPMICODE.md or ~/.deepmicode/memory content will be pinned in the meantime.",
      noRoot:
        "no working directory on this session 鈥?`/memory` needs a root to resolve DEEPMICODE.md from. (Running in a test harness?)",
      listEmpty:
        "no user memories yet. The model can call `remember` to save one, or you can create files by hand in ~/.deepmicode/memory/global/ or the per-project subdir.",
      listHeader: "User memories ({count}):",
      listFooter: "View body: /memory show <name>   Delete: /memory forget <name>",
      showUsage: "usage: /memory show <name>  or  /memory show <scope>/<name>",
      showNotFound: "no memory found: {target}",
      showFailed: "show failed: {reason}",
      forgetUsage: "usage: /memory forget <name>  or  /memory forget <scope>/<name>",
      forgetNotFound: "no memory found: {target}",
      forgetInfo: "鈻?forgot {scope}/{name}. Next /new or launch won't see it.",
      forgetFailed: "could not forget {scope}/{name} (already gone?)",
      forgetError: "forget failed: {reason}",
      clearUsage: "usage: /memory clear <global|project> confirm",
      clearConfirm:
        "about to delete every memory in scope={scope}. Re-run with the word 'confirm' to proceed: /memory clear {scope} confirm",
      cleared: "鈻?cleared scope={scope} 鈥?deleted {count} memory file(s).",
      noMemory: "no memory pinned in {root}.",
      layers: "Three layers are available:",
      layerProject: "  1. {file} 鈥?committable team memory (in the repo).",
      layerGlobal: "  2. ~/.deepmicode/memory/global/ 鈥?your cross-project private memory.",
      layerProjectHash: "  3. ~/.deepmicode/memory/<project-hash>/ 鈥?this project's private memory.",
      askModel: "Ask the model to `remember` something, or hand-edit files directly.",
      changesNote:
        "Changes take effect on next /new or launch 鈥?the system prompt is hashed once per session to keep the prefix cache warm.",
      subcommands:
        "Subcommands: /memory list | /memory show <name> | /memory forget <name> | /memory clear <scope> confirm",
      changesNoteShort:
        "Changes take effect on next /new or launch. Subcommands: /memory list | show | forget | clear",
    },
    mcp: {
      noServers:
        'no MCP servers attached. Run `DeepMiCode setup` to pick some, or launch with --mcp "<spec>". `DeepMiCode mcp list` shows the catalog. Note: model-invoked shell commands are gated per-call (allow once / allow always / deny) 鈥?no global allow-all flag.',
      toolsLabel: "  tools     {count}",
      resourcesHint: "`/resource` to browse+read",
      promptsHint: "`/prompt` to browse+fetch",
      awarenessOnly:
        "Chat mode consumes tools today; resources+prompts are surfaced here for awareness.",
      catalogHint:
        "Full catalog: `DeepMiCode mcp list` 路 deeper diagnosis: `DeepMiCode mcp inspect <spec>`.",
      fallbackServers: "MCP servers ({count}):",
      fallbackTools: "Tools in registry ({count}):",
      fallbackChange: "To change this set, exit and run `DeepMiCode setup`.",
      usageDisableEnable:
        "usage: /mcp {action} <name>  路  pick a name shown in /mcp (anonymous servers can't be named-toggled).",
      usageReconnect: "usage: /mcp reconnect <name>  路  pick a name shown in /mcp.",
      unknownServer: 'unknown MCP server "{name}". Known: {list}.',
      noneList: "(none)",
      reconnectNoTui: "/mcp reconnect requires the interactive TUI (postInfo not wired).",
      liveTab: "Live",
      marketplaceTab: "Marketplace",
      tabHint: "tab to switch",
    },
    init: {
      codeOnly:
        "/init only works in code mode (it needs filesystem tools).\nRun `DeepMiCode code [path]` to start a session rooted at the\nproject you want to initialize, then run /init.",
      exists: "鈻?DEEPMICODE.md already exists at {path}",
      existsForce: "  /init force   regenerate from scratch (overwrites)",
      existsEdit: "  Or edit it by hand 鈥?it's just markdown. The current file is",
      existsPinned: "  pinned into the system prompt every launch as-is.",
      info: "鈻?/init 鈥?model will scan the project and synthesize DEEPMICODE.md.\n  The result lands as a pending edit; review with /apply or /walk.",
    },
    webSearchEngine: {
      currentEngine: "Current web search engine: {engine}",
      endpoint: "SearXNG endpoint: {url}",
      usageHeader: "Usage:",
      usageBing:
        "  /search-engine bing              use Bing (default, works from CN without proxy)",
      usageSearxng: "  /search-engine searxng            use SearXNG at default endpoint",
      usageSearxngUrl: "  /search-engine searxng <url>      use SearXNG at custom endpoint",
      usageMetaso:
        "  /search-engine metaso              use Metaso API (100/d free, configure your own API key for more)",
      usageTavily:
        "  /search-engine tavily              use Tavily API (LLM-friendly, free 1000/mo 鈥?set TAVILY_API_KEY or tavilyApiKey in config; get one at https://tavily.com)",
      usagePerplexity:
        "  /search-engine perplexity          use Perplexity AI (AI-native answer + citations 鈥?set PERPLEXITY_API_KEY or perplexityApiKey in config; get one at https://perplexity.ai/settings/api)",
      usageExa:
        "  /search-engine exa                 use Exa API (AI-native answer + citations, free 1000/mo 鈥?set EXA_API_KEY or exaApiKey in config; sign up at https://exa.ai)",
      usageOllama:
        "  /search-engine ollama              use Ollama cloud web search 鈥?set OLLAMA_API_KEY or ollamaApiKey in config; get one at https://ollama.com/settings/keys",
      usageBrave:
        "  /search-engine brave               use Brave Search API (independent index, free 2000/mo 鈥?set BRAVE_SEARCH_API_KEY or braveApiKey in config; get one at https://brave.com/search/api/)",
      alias: "Alias: /se",
      searxngInfo:
        "SearXNG is a self-hosted metasearch engine (https://github.com/searxng/searxng).",
      searxngInstall: "Install it with:  docker run -d -p 8080:8080 searxng/searxng",
      switched: 'Switched web search engine to "{engine}".{note}',
      switchedSearxngNote: " Make sure SearXNG is running at {endpoint}.",
      switchedMetasoNote:
        " There is a daily quota of 100 (configure your own API key for higher limits).",
      switchedTavilyNote:
        " Set TAVILY_API_KEY or `tavilyApiKey` in config; free 1000/mo at https://tavily.com.",
      switchedPerplexityNote:
        " Set PERPLEXITY_API_KEY or `perplexityApiKey` in config; get one at https://perplexity.ai/settings/api.",
      switchedExaNote: " Set EXA_API_KEY or `exaApiKey` in config; sign up at https://exa.ai.",
      switchedOllamaNote:
        " Set OLLAMA_API_KEY or `ollamaApiKey` in config; get one at https://ollama.com/settings/keys.",
      switchedBraveNote:
        " Set BRAVE_SEARCH_API_KEY (or BRAVE_API_KEY) or `braveApiKey` in config; free 2000/mo at https://brave.com/search/api/.",
      keyNeeded:
        'No API key configured for "{engine}".\n\n  1. Set the {envVar} environment variable\n  2. Or provide one inline:  /search-engine {engine} <your-key>\n  3. Or add "{engine}ApiKey" to ~/.deepmicode/config.json\n\nThen retry /search-engine {engine}.',
      keySaved: " API key saved to config.",
      confirmed:
        'Web search engine set to "{engine}"{detail}. Next assistant turn will pick up the change.',
      confirmedDetail: " ({endpoint})",
    },
    skill: {
      listEmpty: "no skills found. DeepMiCode reads skills from:",
      listProjectScope:
        "  路 <project>/.deepmicode/skills/<name>/SKILL.md  (or <name>.md)  鈥?project scope",
      listGlobalScope: "  路 ~/.deepmicode/skills/<name>/SKILL.md  (or <name>.md)  鈥?global scope",
      listProjectOnly: "  (project scope is only active in `DeepMiCode code`)",
      listFrontmatter: "Each file's frontmatter needs at least `name` and `description`.",
      listInvoke:
        "Invoke a skill with `/skill <name> [args]` or by asking the model to call `run_skill`.",
      listHeader: "User skills ({count}):",
      listFooter: "View: /skill show <name>   Run: /skill <name> [args]   New: /skill new <name>",
      listEmptyNewHint:
        "Scaffold one with: /skill new <name>  (project scope) 鈥?there's no remote registry yet; you author skills directly.",
      showUsage: "usage: /skill show <name>",
      showNotFound: "no skill found: {name}",
      runNotFound: "no skill found: {name}  (try /skill list)",
      runInfo: "鈻?running skill: {name}{args}",
      newUsage: "usage: /skill new <name> [--global]",
      newCreated: "鈻?created skill: {name}\n  {path}\n  edit it, then `/skill {name}` to invoke",
      newError: "鈻?/skill new failed: {reason}",
      pathsHeader: "Skill paths (priority order):",
      pathsPriority:
        "Priority: project > custom paths in config order > global > builtin. Changes affect the system prompt on next /new or new session.",
      pathsUsage:
        "usage: /skill paths [list]\n       /skill paths add <path>\n       /skill paths remove <path|N>",
      pathsAddUsage: "usage: /skill paths add <path>",
      pathsRemoveUsage: "usage: /skill paths remove <path|N>",
      pathsAdded: "鈻?added custom skills path: {path}",
      pathsAlready: "鈻?custom skills path already configured: {path}",
      pathsRemoved: "鈻?removed custom skills path: {path}",
      pathsRemoveNotFound: "鈻?no custom skills path matches: {target}",
      pathsRestartHint:
        "The current session's system prompt is unchanged; run /new or start a new session to refresh the skills index.",
    },
  },
  statusBar: {
    turn: "turn",
    cache: "cache",
    spent: "spent",
    left: " left",
    slow: "slow",
    disconnect: "disconnect",
    reconnecting: "reconnecting\u2026",
    approvingIn: "approving in ",
    escToInterrupt: "s \u00b7 esc to interrupt",
    recordingGlyph: "\u25CFREC",
    mb: " MB",
    evt: " evt",
    editsLabel: "edits:",
    mcpLoading: "MCP",
    ctx: "ctx",
    shortcutsHint: "Ctrl+P shortcuts",
  },
  editMode: {
    plan: "PLAN MODE",
    yolo: "YOLO",
    auto: "AUTO",
    review: "REVIEW",
    writesGated: "   writes gated \u00b7 /plan off to leave",
    editsShellAuto: "edits + shell auto \u00b7 /undo to roll back",
    editsLandNow: "edits land now \u00b7 u to undo",
    queuedApplyDiscard: "{count} queued \u00b7 y apply \u00b7 n discard",
    editsQueued: "edits queued \u00b7 y apply \u00b7 n discard",
    shiftTabFlip: "   {mid} \u00b7 Shift+Tab to flip",
    queuedDots: "queued\u2026",
  },
  composer: {
    placeholder: "ask anything  \u00b7  slash for commands  \u00b7  at-sign for files",
    waitingForResponse: "\u2026waiting for response\u2026",
    hintSend: "send",
    hintNewline: "newline",
    hintClear: "clear",
    hintScroll: "scroll",
    hintHistory: "history",
    hintAbort: "abort",
    hintQuit: "quit",
    abortedHint: "turn aborted by user \u00b7 esc again to clear \u00b7 \u23ce to ask a follow-up",
    editorNoRawMode:
      "external editor unavailable \u2014 stdin doesn't support raw-mode toggling on this terminal",
    editorFailed: "external editor:",
    editorMissing:
      "no $EDITOR / $VISUAL / $GIT_EDITOR set \u2014 export one (e.g. `export EDITOR=nano`) and retry",
    editorExited: "editor exited with code {code}",
    typeaheadStaged: "\u25b8 {count} line(s) staged \u00b7 esc recall",
    steerPlaceholder: "type to steer the current task 鈥?commands are disabled while busy",
    steerHint: "send 鈥?injected mid-turn",
    stashNothing: "Nothing to stash",
    stashSaved: "Stashed",
    stashRecall: "Recalled",
  },
  pathConfirm: {
    title: "Outside-sandbox path",
    subtitleRead: "{tool} wants to READ a file outside the project sandbox",
    subtitleWrite: "{tool} wants to WRITE a file outside the project sandbox",
    awaiting: "awaiting",
    denyTitle: "Deny \u2014 provide context",
    optional: "optional",
    denyFooter:
      "type context  \u00b7  \u23ce submit with reason  \u00b7  esc skip (deny without reason)",
    pickFooter:
      "\u2191\u2193 pick  \u00b7  \u23ce confirm  \u00b7  Tab add context  \u00b7  esc cancel",
    allowOnce: "allow once",
    allowOnceDesc: "permit this access; remember the directory for the rest of this session",
    allowAlways: "allow always",
    allowAlwaysDesc: "remember `{prefix}` for this project (persisted in ~/.deepmicode/config.json)",
    deny: "deny",
    denyDesc: "press Tab to add context telling the model why",
    pathLabel: "path",
    sandboxLabel: "sandbox",
    allowPrefixLabel: "prefix",
    promptTitleRead: "Access path \u2014 read",
    promptTitleWrite: "Access path \u2014 write",
    actionAllowRead: "Allow read",
    actionAllowWrite: "Allow write",
    actionAlwaysAllow: "Always allow \u2014 {prefix}",
    actionDeny: "Deny",
  },
  shellConfirm: {
    title: "Shell command",
    bgTitle: "Background process",
    subtitle: "model wants to run a shell command",
    bgSubtitle: "long-running process \u2014 keeps running after approval, /kill to stop",
    denyTitle: "Deny \u2014 provide context",
    optional: "optional",
    denyFooter:
      "type context  \u00b7  \u23ce submit with reason  \u00b7  esc skip (deny without reason)",
    awaiting: "awaiting",
    pickFooter:
      "\u2191\u2193 pick  \u00b7  \u23ce confirm  \u00b7  Tab add context  \u00b7  esc cancel",
    allowOnce: "allow once",
    allowOnceDesc: "run this command, ask again next time",
    allowAlways: "allow always",
    allowAlwaysDesc: "remember `{prefix}` for this project",
    deny: "deny",
    denyDesc: "press Tab to add context telling the model why",
    cwdLabel: "cwd",
    timeoutLabel: "timeout",
    waitLabel: "wait",
    previewMore: "鈥?{n} more line hidden 鈥?press esc, ask the model to split it",
    previewMorePlural: "鈥?{n} more lines hidden 鈥?press esc, ask the model to split it",
    promptTitleRunCommand: "Run command",
    promptTitleRunBackground: "Run background command",
    actionRunOnce: "Run once",
    actionAlwaysAllow: "Always allow \u2014 {prefix}",
    actionDeny: "Deny",
  },
  editConfirm: {
    footer:
      "[y/Enter] apply  \u00b7  [n] reject with reason  \u00b7  [a] apply rest  \u00b7  [A] flip AUTO  \u00b7  [\u2191\u2193/Space] scroll  \u00b7  [Esc] abort",
    newTag: "NEW",
    editTag: "EDIT",
    linesCount: "-{removed} +{added} lines",
    viewingRange: "viewing {start}-{end}/{total}",
    denyFooter: "\u23ce submit  \u00b7  esc skip (deny without reason)",
    oldLabel: "  - old",
    newLabel: "  + new",
    sideBySide:
      "   side-by-side \u00b7 removed lines on the left, added on the right \u00b7 paired by offset",
    linesAbove: "  \u2191 {count} line above  (\u2191/k or PgUp)",
    linesAbovePlural: "  \u2191 {count} lines above  (\u2191/k or PgUp)",
    linesBelow: "  \u2193 {count} line below  (\u2193/j or Space/PgDn)",
    linesBelowPlural: "  \u2193 {count} lines below  (\u2193/j or Space/PgDn)",
  },
  editPicker: {
    title: "edit a previous message",
    hint: "鈫戔啌 pick 路 Enter to load into composer 路 Esc to cancel",
    empty: "no user turns yet 鈥?nothing to edit",
    dismiss: "Esc to dismiss",
    forked: "鈻?forked at turn #{turn} 鈥?buffer holds the original text",
  },
  sessionPicker: {
    header: " \u25c8 DeepMiCode \u00b7 pick a session ",
    title: "pick a session \u2014 {workspace}",
    messages: "{count} message",
    messagesPlural: "{count} messages",
    turns: "{count} turns",
    pickerHint:
      "\u2191\u2193 pick \u00b7 / search \u00b7 \u23ce open \u00b7 [n] new \u00b7 [d] delete \u00b7 [r] rename \u00b7 esc quit",
    empty: "  no saved sessions in this workspace yet \u2014 press ",
    emptyNew: " to start a new one",
    renamePrompt: '  rename "{from}" \u2192 ',
    renameHint: "  \u23ce confirm rename  \u00b7  esc cancel",
    searchPrompt: "  search sessions: /",
    searchHint: "  type to filter  \u00b7  \u23ce open match  \u00b7  esc clear",
    searchEmpty: "  no sessions match this search",
    emptyHint: "  \u23ce new session  \u00b7  esc quit",
    justNow: "just now",
    minAgo: "{count} min ago",
    yesterday: "yesterday",
    hoursAgo: "{count}h ago",
    daysAgo: "{count} days ago",
  },
  workspacePicker: {
    header: " 鈼?DeepMiCode 路 pick a workspace ",
    title: "pick a workspace 鈥?{workspace}",
    sessions: "{count} session",
    sessionsPlural: "{count} sessions",
    current: "current",
    pickerHint: "鈫戔啌 pick 路 / search 路 鈴?switch + pick session 路 esc quit 路 /cwd <path> adds one",
    empty: "  no known workspaces yet 鈥?run /cwd <path> once to add one",
    searchPrompt: "  search workspaces: /",
    searchHint: "  type to filter  路  鈴?switch + pick session  路  esc clear",
    searchEmpty: "  no workspaces match this search",
  },
  modelPicker: {
    header: " \u25c8 DeepMiCode \u00b7 pick a setup ",
    loading: "  \u00b7  loading catalog\u2026",
    catalogEmpty: "  \u00b7  catalog empty \u2014 using known fallbacks",
    modelsAvailable: "  \u00b7  {count} models available",
    effortHeader: "    EFFORT  \u00b7  reasoning_effort cap",
    modelsHeader: "    MODELS  \u00b7  DeepSeek-compatible ids",
    effortDesc: {
      low: "fastest \u2014 minimal reasoning",
      medium: "balanced",
      high: "default \u2014 safe for vLLM / Azure",
      max: "DeepSeek extension; rejected by stock OpenAI / vLLM",
    },
    pickerFooter:
      "  \u2191\u2193 pick  \u00b7  \u23ce confirm  \u00b7  [r] refresh  \u00b7  esc cancel",
    currentLabel: "  \u00b7 current",
  },
  slashSuggestions: {
    noMatch: "no slash command matches that prefix",
    backspaceHint: " \u2014 Backspace to edit, or /help for the full list",
    commandCount: "{count} command",
    commandCountPlural: "{count} commands",
    aboveLabel: "   \u2191 {count} above",
    belowLabel: "   \u2193 {count} below",
    advancedHint: "  + {count} advanced  \u00b7  type a letter to search",
    footerHint: "  \u2191\u2193 navigate \u00b7 Tab / \u23ce pick \u00b7 esc cancel",
    groupChat: "CHAT",
    groupSetup: "SETUP",
    groupInfo: "INFO",
    groupSession: "SESSION",
    groupExtend: "EXTEND",
    groupCode: "CODE",
    groupJobs: "JOBS",
    groupAdvanced: "ADVANCED",
    groupDetailSetup: "model + cost",
    groupDetailInfo: "current state",
    groupDetailChat: "daily turn ops",
    groupDetailExtend: "MCP, memory, skills",
    groupDetailSession: "saved sessions",
    groupDetailCode: "edits + plans (code mode)",
    groupDetailJobs: "background processes (code mode)",
    groupDetailAdvanced: "rare or set-and-forget",
  },
  atMentions: {
    loading: "loading\u2026",
    entrySingular: "{count} entry",
    entryPlural: "{count} entries",
    searching: "searching\u2026",
    scanned: "scanned",
    match: "match",
    matches: "matches",
    forFilter: 'for "{filter}"',
    noMatch: 'no files match "{filter}"',
    emptyDir: "empty directory",
    scanning: "scanning the tree\u2026",
    footerBrowse:
      "\u2191\u2193 navigate \u00b7 Tab drill into folder \u00b7 \u23ce insert \u00b7 esc cancel",
    footerBrowseSearch:
      "\u2191\u2193 navigate \u00b7 Tab / \u23ce insert as @path \u00b7 esc cancel",
    footerInsert: "\u2191\u2193 navigate \u00b7 Tab / \u23ce insert as @path \u00b7 esc cancel",
  },
  statsPanel: {
    modePlan: "PLAN",
    modeYolo: "yolo",
    modeAuto: "auto",
    modeReview: "review",
    pro: "\u21e7 pro",
    budget: "  budget  ",
  },
  welcomeBanner: {
    workspace: "\u25b8 workspace",
    relaunchHint: "  (relaunch with --dir <path> to switch)",
    dashboard: "\u25b8 web",
  },
  ctxBreakdown: {
    title: "\u25a3 context",
    compactHint: "  /compact folds (auto at 50%) \u00b7 /new wipes log",
    topTools: "  top tool results by cost ({count}):",
    msg: "msg",
    turnLabel: "turn",
  },
  startup: {
    codeRooted:
      '\u25b8 DeepMiCode code: rooted at {rootDir}, session "{session}" \u00b7 {tools} native tool(s){semantic}',
    ephemeral: "(ephemeral)",
    semanticOn: " \u00b7 semantic_search on",
  },
  doctorErrors: {
    unreadable: "{path} unreadable \u2014 {message}",
    cannotList: "cannot list \u2014 {message}",
    parseFailed: "couldn't parse settings.json \u2014 {message}",
    probeFailed: "probe failed \u2014 {message}",
  },
  webErrors: {
    status:
      "web_search {status} \u2014 try: the search backend returned an error; rephrase the query, or switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    rateLimit429:
      "web_search 429 \u2014 try: wait 10s before retrying, or rephrase the query; the search backend is rate-limiting this client",
    forbidden403:
      "web_search 403 \u2014 try: the search backend is blocking this client; switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave, or wait and retry later",
    serverError5xx:
      "web_search {status} \u2014 try: open the search URL in a browser; if it loads this is transient and a retry in 30s may help",
    bingBlocked:
      "web_search: Bing anti-bot page \u2014 rate-limited or blocked \u2014 try: wait 30s and retry, or switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    bingNoResults:
      "web_search: 0 results but response doesn't look like a real empty page ({chars} chars, first 120: {preview}) \u2014 try: rephrase the query with simpler terms, or switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    invalidEndpoint:
      'web_search: invalid SearXNG endpoint "{endpoint}" \u2014 try: set a valid URL with /search-endpoint http://host:port',
    endpointMustBeHttp:
      "web_search: SearXNG endpoint must be http(s), got {protocol} \u2014 try: set a valid URL with /search-endpoint http://host:port",
    cannotReach:
      "web_search: Cannot reach SearXNG server at {endpoint} \u2014 try: install and start SearXNG (https://github.com/searxng/searxng, e.g. `docker run -d -p 8080:8080 searxng/searxng`), or switch to another engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    searxngNoResults:
      "web_search: 0 results but SearXNG response doesn't look like an empty results page ({chars} chars) \u2014 try: rephrase the query with simpler terms, or switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    metasoMissingKey:
      "web_search: Metaso requires an API key \u2014 set METASO_API_KEY or configure one with /search-engine metaso <key>. Get one at https://metaso.cn/search-api/playground",
    metasoDailyLimit:
      "web_search: Metaso daily search limit reached \u2014 set METASO_API_KEY or get a key at https://metaso.cn/search-api/playground",
    metasoUnauthorized:
      "web_search: Metaso API key rejected \u2014 check METASO_API_KEY or get one at https://metaso.cn/search-api/playground",
    metasoRateLimit:
      "web_search: Metaso rate-limited \u2014 wait and retry, or get your own API key at https://metaso.cn/search-api/playground",
    metasoServerError:
      "web_search: Metaso server error ({status}) \u2014 try again later, or switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    metasoParseError:
      "web_search: Metaso returned unparseable response (HTTP {status}) \u2014 try again later",
    metasoApiError: "web_search: Metaso API error (code {code}: {message}) \u2014 try again later",
    tavilyMissingKey:
      "web_search: Tavily backend requires an API key \u2014 set TAVILY_API_KEY env var or `tavilyApiKey` in ~/.deepmicode/config.json; free 1000/mo signup at https://tavily.com",
    tavilyUnauthorized:
      "web_search: Tavily API key rejected \u2014 check TAVILY_API_KEY or get one at https://tavily.com",
    tavilyRateLimit:
      "web_search: Tavily rate-limited or monthly quota exceeded \u2014 wait, switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave, or upgrade your Tavily plan",
    tavilyServerError:
      "web_search: Tavily server error ({status}) \u2014 try again later, or switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    tavilyParseError:
      "web_search: Tavily returned unparseable response (HTTP {status}) \u2014 try again later",
    perplexityMissingKey:
      "web_search: Perplexity backend requires an API key \u2014 set PERPLEXITY_API_KEY env var or `perplexityApiKey` in ~/.deepmicode/config.json; get one at https://perplexity.ai/settings/api",
    perplexityUnauthorized:
      "web_search: Perplexity API key rejected \u2014 check PERPLEXITY_API_KEY or get one at https://perplexity.ai/settings/api",
    perplexityRateLimit:
      "web_search: Perplexity rate-limited \u2014 wait and retry, or switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    perplexityServerError:
      "web_search: Perplexity server error ({status}) \u2014 try again later, or switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    perplexityParseError:
      "web_search: Perplexity returned unparseable response (HTTP {status}) \u2014 try again later",
    exaMissingKey:
      "web_search: Exa backend requires an API key \u2014 set EXA_API_KEY env var or `exaApiKey` in ~/.deepmicode/config.json; free 1000/mo signup at https://exa.ai",
    exaUnauthorized:
      "web_search: Exa API key rejected \u2014 check EXA_API_KEY or get one at https://exa.ai",
    exaRateLimit:
      "web_search: Exa API rate-limited or monthly quota exceeded \u2014 wait or upgrade at https://exa.ai/pricing",
    exaServerError:
      "web_search: Exa server error ({status}) \u2014 try again later, or switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    exaParseError:
      "web_search: Exa returned unparseable response (HTTP {status}) \u2014 try again later",
    braveMissingKey:
      "web_search: Brave Search requires an API key \u2014 set BRAVE_SEARCH_API_KEY (or BRAVE_API_KEY) env var or `braveApiKey` in ~/.deepmicode/config.json; free 2000/mo signup at https://brave.com/search/api/",
    braveUnauthorized:
      "web_search: Brave Search API key rejected \u2014 check BRAVE_SEARCH_API_KEY or get one at https://brave.com/search/api/",
    braveRateLimit:
      "web_search: Brave Search API rate-limited or monthly quota exceeded \u2014 wait or upgrade at https://brave.com/search/api/",
    braveServerError:
      "web_search: Brave Search server error ({status}) \u2014 try again later, or switch engine with /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    braveParseError:
      "web_search: Brave Search returned unparseable response (HTTP {status}) \u2014 try again later",
    fetchStatus:
      "web_fetch {status} for {url} \u2014 try: confirm the URL resolves in a browser; status suggests the host returned an error page",
    fetchRateLimit429:
      "web_fetch 429 for {url} \u2014 try: wait 10s before retrying; the host is rate-limiting this client",
    fetchForbidden403:
      "web_fetch 403 for {url} \u2014 try: the host is blocking this client; the page may require login or block bots \u2014 use web_search snippets instead",
    fetchServerError5xx:
      "web_fetch {status} for {url} \u2014 try: open the URL in a browser; if it loads this is transient and a retry in 30s may help",
    fetchTimeout:
      "web_fetch: timed out after {ms}ms for {url} \u2014 try: a shorter URL or smaller content; this may be a slow CDN, or retry once",
    fetchTooLarge:
      "web_fetch refused: content-length {len} bytes exceeds {cap}-byte cap ({url}) \u2014 try: a different URL with smaller content; this page is too large to fetch",
    fetchBodyTooLarge:
      "web_fetch refused: response body exceeded {cap}-byte cap ({seen} bytes seen) \u2014 try: a different URL with smaller content; this page streamed past the size cap",
    fetchInvalidUrl:
      "web_fetch: url must start with http:// or https:// \u2014 try: pass an absolute http(s) URL (the URL is malformed or uses an unsupported scheme)",
  },
  choiceConfirm: {
    customLabel: "Let me type my own answer",
    customDesc:
      "None of the above fits \u2014 type a free-form reply. The model reads it verbatim.",
    cancelLabel: "Cancel \u2014 drop the question",
    cancelDesc: "Model stops and asks what you want instead.",
  },
  cardTitles: {
    usage: "usage",
    context: "context",
    search: "search",
    subagent: "subagent",
    reply: "reply",
    reasoning: "reasoning",
    reasoningAborted: "reasoning (aborted)",
    reasoningEllipsis: "reasoning\u2026",
    error: "error",
    doctor: "doctor",
    you: "you",
    task: "task",
  },
  cardLabels: {
    prompt: "prompt",
    reason: "reason",
    output: "output",
    cache: "cache",
    session: "session",
    balance: "balance",
    turn: "turn",
    system: "system",
    tools: "tools",
    log: "log",
    input: "input",
    topTools: "top tools",
    logMsgs: "log msgs",
    hitSingular: "{count} hit \u00b7 {files} file",
    hitsPlural: "{count} hits \u00b7 {files} files",
    moreHitSingular: "\u22ee +{count} more hit",
    moreHitsPlural: "\u22ee +{count} more hits",
    earlierLine: "\u22ee {count} hidden line (Ctrl+R for full output)",
    earlierLines: "\u22ee {count} hidden lines (Ctrl+R for full output)",
    hiddenLine: "\u22ee {count} hidden line",
    hiddenLines: "\u22ee {count} hidden lines",
    earlierStackLine: "\u22ee {count} earlier stack line hidden",
    earlierStackLines: "\u22ee {count} earlier stack lines hidden",
    agent: "agent \u00b7 {name}",
    response: "response",
    writing: "writing \u2026",
    tok: "tok",
    pilcrow: "\u00b6",
    aborted: "aborted",
    truncatedByEsc: "[truncated by esc]",
    rejected: "rejected",
    exit: "exit {code}",
    bytesIn: "{bytes} in",
    elapsedSec: "{secs}s",
    stackTrace: "stack trace",
    retries: "retries",
    reasoningLabel: "reasoning \u00b7 {count} \u00b6",
    runningLabel: "running",
    workingLabel: "working",
    defaultFooter: "\u2191\u2193 pick  \u00b7  \u23ce confirm  \u00b7  esc cancel",
    applyAction: "[a] apply",
    skipAction: "[s] skip",
    rejectAction: "[r] reject",
    levelOk: "OK",
    levelWarn: "warn",
    levelFail: "FAIL",
    checksLabel: "checks",
    passed: "passed",
    warnTag: "warn",
    failTag: "fail",
    stepLabel: "step",
    done: "done",
    inProgress: "\u2190 in progress",
    upcoming: "upcoming",
    resumed: "resumed \u00b7 ",
    archive: "\u23ea archive \u00b7 ",
    more: "\u22ee +{count} more",
    categoryUser: "user",
    categoryFeedback: "feedback",
    categoryProject: "project",
    categoryReference: "reference",
  },
  mcpHealth: {
    noData: "no inspect data",
    healthy: "healthy \u00b7 {ms}ms",
    slow: "slow \u00b7 {ms}ms",
    verySlow: "very slow \u00b7 {ms}ms",
    slowToast: "\u26a0 MCP `{name}` slow \u00b7 {seconds}s p95 over the last {sampleSize} calls",
    emptyHint:
      "\u2139 no MCP servers configured \u2014 try: `DeepMiCode setup` to re-pick, or `DeepMiCode mcp install filesystem` \u00b7 shell commands gate per-call (allow once / allow always / deny), no global allow-all",
  },
  denyContextInput: {
    description:
      "Tell the agent why you denied this. The next attempt will see your reason as additional context.",
  },
  cardStream: {
    scrollAbove: " \u2191 {scroll} / {max} row above",
    scrollAbovePlural: " \u2191 {scroll} / {max} rows above",
    scrollMore: " \u2014 {remaining} more",
    scrollPgUp: " \u00b7 PgUp / wheel",
    scrollCopy: " \u00b7 /copy enters copy mode",
  },
  slashArgPicker: {
    noMatch: 'no match for "{partial}"',
    keepTyping: " \u2014 keep typing, or Backspace to edit",
    above: "   \u2191 {hidden} above",
    below: "   \u2193 {hidden} below",
    footer: "  \u2191\u2193 navigate \u00b7 Tab / \u23ce pick \u00b7 esc cancel",
  },
  mcpMarketplace: {
    title: "MCP marketplace",
    filter: "filter: ",
    filterPlaceholder: "(type to filter)",
    matchSingular: "{n} match",
    matchPlural: "{n} matches",
    loading: "loading\u2026",
    noEntries: "no entries",
    opening: "opening registry\u2026",
    cached: "\u00b7 cached",
    exhausted: "\u00b7 exhausted",
    loadingMore: "loading more\u2026",
    allLoaded: "all pages loaded",
    fetchingDetail: "fetching smithery detail\u2026",
    noInstallInfo: "no install info for {name} - try `npx -y @smithery/cli install {name}`",
    alreadyInstalled: "already installed: {spec}",
    installed: "installed \u2192 {spec}",
    uninstalled: "uninstalled {name}",
    installFailed: "install failed: {message}",
    notInstalled: "not installed: {name}",
    bridged: "\u2713 installed {name} - bridged",
    bridgeFailed: "\u25b2 installed {name} - bridge failed: {reason}",
    bridgeReloadFailed:
      "\u2713 installed {name} - restart `DeepMiCode code` to bridge (reload failed: {message})",
    restartBridge: "\u2713 installed {name} - restart `DeepMiCode code` to bridge",
    needsEnv: "  \u00b7  needs env: {env}",
    badgeOfficial: "[off]",
    badgeSmithery: "[smt]",
    badgeLocal: "[loc]",
    footerHint:
      "type filter \u00b7 \u2191\u2193 pick \u00b7 \u23ce install/toggle \u00b7 PgDn load more \u00b7 esc close",
    specLine: "spec: {runtime} {id} \u00b7 {transport}",
    smitheryDetail: "(smithery listing \u2014 install detail fetched on Enter)",
    statusError: "error: {message}",
  },
  mcpBrowser: {
    title: "\u25c8 MCP browser",
    empty: "No MCP servers attached. Run `DeepMiCode setup` to pick some, or launch with --mcp.",
    serverCount: "{count} server{s}",
    footer: "\u2191\u2193 pick \u00b7 [r] reconnect \u00b7 [d] disable \u00b7 esc quit",
  },
  mcpBrowse: {
    noResources:
      "No resources on any connected MCP server (or no servers connected). `/mcp` shows the current set.",
    readOne: "Read one: `/resource <uri>` \u2014 or use Tab in the picker.",
    noPrompts:
      "No prompts on any connected MCP server (or no servers connected). `/mcp` shows the current set.",
    fetchOne:
      "Fetch one: `/prompt <name>` \u2014 args are not supported yet; prompts with required args will surface an error from the server.",
    noServerForResource: 'no server exposes resource "{name}"',
    resourceHint: "`/resource` with no arg lists what's available.",
    readFailed: "readResource failed",
    noServerForPrompt: 'no server exposes prompt "{name}"',
    promptHint: "`/prompt` with no arg lists what's available.",
    fetchFailed: "getPrompt failed",
  },
  mcpLifecycle: {
    handshake: "handshake\u2026",
    connected: "connected",
    failed: "failed",
    disabled: "disabled",
    reconnect: "reconnect\u2026",
    initDetail: "initialise \u2192 tools/list \u2192 resources/list",
    reconnectDetail: "tearing down \u00b7 re-handshake \u00b7 listing tools",
    disabledDetail: "via /mcp disable {name}",
    failedSetupHint:
      "鈫?run `DeepMiCode setup` to remove this entry, or fix the underlying issue (missing npm package, network, etc.).",
    failedSetupConfigHint:
      "鈫?run `DeepMiCode setup` to remove broken entries from your saved config.",
    abortedHint:
      "MCP startup aborted 鈥?{count} server(s) skipped. Run /mcp to retry once you've fixed the underlying issue.",
    toolsReady: "tools ready",
    warnLabel: "warn",
  },
  checkpointPicker: {
    title: "restore a checkpoint \u2014 {workspace}",
    header: " \u25c8 DeepMiCode \u00b7 pick a checkpoint ",
    empty: "  no checkpoints in this workspace yet - see /checkpoint to make one",
    more: "     \u2026 {hidden} more",
    footer: "  \u2191\u2193 pick  \u00b7  \u23ce restore  \u00b7  [d] forget  \u00b7  esc quit",
    footerEmpty: "  esc quit",
  },
  planReviseConfirm: {
    title: "plan revision proposed",
    metaRight: "\u2212{removed}  +{added}  \u00b7  {kept} kept",
    updatedSummary: "updated summary: {summary}",
    acceptLabel: "Accept revision - apply the new step list",
    acceptHint: "Replaces the remaining plan with the proposed steps. Done steps are untouched.",
    rejectLabel: "Reject - keep the original plan",
    rejectHint: "Drops the proposal. Model continues with the original remaining steps.",
  },
  diffApp: {
    title: "DeepMiCode diff",
    turnLabel: "turn {turn} ({current}/{total})",
    turnsAligned: "{count} turns aligned",
    paneEmpty: "(no records on this side for this turn)",
    kindMatch: "\u2713 match",
    kindDiverge: "\u2605 diverge",
    kindOnlyInA: "\u2190 only in A",
    kindOnlyInB: "\u2192 only in B",
  },
  recordView: {
    userPrefix: "you \u203a ",
    assistant: "assistant",
    toolPrefix: "tool<",
    argsLabel: "  args: ",
    resultArrow: "  \u2192 ",
    error: "error ",
    cache: "  \u00b7 cache ",
    toolCallOnly: "(tool-call response only)",
    truncateExtra: "(+{extra} chars)",
  },
  replayApp: {
    emptyTranscript: "empty transcript",
    turnProgress: "turn {current}/{total}",
    noRecords: "no records",
    untracked: "(untracked)",
    churned: "(churned \u00d7{count})",
  },
  builtinSkills: {
    explore:
      "Explore the codebase in an isolated subagent \u2014 wide-net read-only investigation that returns one distilled answer. Best for: 'find all places that\u2026', 'how does X work across the project', 'survey the code for Y'.",
    research:
      "Research a question by combining web search + code reading in an isolated subagent. Best for: 'is X feature supported by lib Y', 'what\u2019s the canonical way to do Z', 'compare our impl against the spec'.",
    review:
      "Review the pending changes (current branch diff by default) in an isolated subagent \u2014 flags correctness, security, missing tests, hidden behavior changes; reports verdict + per-issue file:line. Read-only; the parent decides what to act on.",
    securityReview:
      "Security-focused review of the current branch diff in an isolated subagent \u2014 flags injection/authz/secrets/deserialization/path-traversal/crypto issues, severity-tagged. Read-only. Use when shipping changes that touch auth, input parsing, file IO, or external requests.",
    test: "Run the project\u2019s test suite, diagnose failures, propose SEARCH/REPLACE fixes, re-run until green (or stop after 2 fix attempts on the same failure). Inlined \u2014 runs in the parent loop so you see the edit blocks and can /apply them. Detects npm/pnpm/yarn/pytest/go/cargo.",
  },
  shortcutsHelp: {
    title: "Shortcuts",
    groupInput: "Input",
    groupNavigation: "Navigation",
    groupSession: "Session",
    groupSystem: "System",
    descEnter: "Send message",
    descShiftEnter: "New line",
    descCtrlEnter: "New line",
    descCtrlJ: "New line",
    descCtrlU: "Clear input",
    descCtrlW: "Delete word",
    descCtrlP: "Show/hide shortcuts",
    descCtrlX: "Open in editor",
    descArrows: "Input history",
    descPgUpDown: "Scroll page",
    descCtrlL: "Clear screen",
    descCtrlB: "Toggle sidebar",
    descNewSession: "New session",
    descListSessions: "List sessions",
    descSwitchModel: "Switch model",
    descSwitchEffort: "Switch reasoning effort",
    descSwitchTheme: "Switch theme",
    descCtrlC: "Quit",
    descEsc: "Stop / Cancel",
    descCtrlR: "Toggle verbose",
    descCtrlO: "Expand reply (streaming only)",
    descHelp: "Show all commands",
    descShiftTab: "Switch edit mode",
    descAltS: "Stash / recall input",
  },
  mcpCli: {
    bundledCatalog: "Bundled MCP servers (offline catalog):",
    justFetched: "just fetched",
    cachedAge: "cached, {age}",
    moreAvailable: "more available",
    allLoaded: "all loaded",
    morePagesAvailable:
      "\u25b8 more pages available \u2014 `DeepMiCode mcp list --pages <n>` or --all",
    installHint: "Install:  DeepMiCode mcp install <name>",
    usageSearch: "usage: DeepMiCode mcp search <query>",
    usageInstall: "usage: DeepMiCode mcp install <name>",
    noMatchesFor: 'No matches for "{q}" across {count} loaded entries ({source})',
    matchCount: '{count} match(es) for "{q}" in {source} registry ({loaded} entries scanned):',
    moreLoaded: "\u2026 {count} more loaded \u2014 use `DeepMiCode mcp search <query>` to filter",
    moreMatches: "\u2026 {count} more matches",
    installed: "Installed: {spec}",
    noServerFound:
      'No MCP server named "{target}" found after walking {pages} page(s) of the {source} registry.',
    noServerTryMore: "Try: DeepMiCode mcp install {target} --max-pages 100",
    noInstallMeta:
      'Could not derive install metadata for "{name}" \u2014 try `npx -y @smithery/cli install {name}` directly.',
    buildSpecFailed: "Cannot build install spec for {name}: {message}",
    alreadyInstalled: "Already installed: {spec}",
  },
};
