import { EN } from "./EN.js";
import type { TranslationSchema } from "./types.js";

export const de: TranslationSchema = {
  ...EN,
  common: {
    ...EN.common,
    error: "Fehler",
    warning: "Warnung",
    loading: "Wird geladen...",
    done: "Fertig",
    cancel: "Abbrechen",
    confirm: "Best√§tigen",
    back: "Zur√ºck",
    next: "Weiter",
    tool: "Werkzeug",
    running: "l√§uft",
    noTurns: "(noch keine Turns)",
  },
  cli: {
    ...EN.cli,
    description: "DeepSeek-natives Agent-Framework, gebaut f√ºr Cache-Treffer und g√ºnstige Tokens.",
    continue: "Die zuletzt verwendete Chat-Sitzung fortsetzen, ohne die Auswahl anzuzeigen.",
    setup: "Interaktiver Assistent f√ºr API-Schl√ºssel und MCP-Server. Jederzeit erneut ausf√ºhrbar.",
    chat: "Interaktive Ink-TUI mit Live-Cache- und Kostenanzeige.",
    run: "Eine einzelne Aufgabe nicht-interaktiv ausf√ºhren, Ausgabe wird gestreamt.",
    stats: "Nutzungsdashboard anzeigen.",
    doctor: "Gesundheitscheck mit einem Befehl.",
    code: "Code-Editor-Chat ‚Ä?Dateisystem-Werkzeuge mit Wurzel in <dir> (Standard: cwd), Coding-System-Prompt, v4-flash-Baseline.",
    commit: "Commit-Nachricht aus der gestagten Diff entwerfen.",
    sessions: "Gespeicherte Chat-Sitzungen auflisten oder nach Name anzeigen.",
    pruneSessions:
      "Inaktive Sitzungen ab N Tagen l√∂schen (Standard 90). Mit --dry-run zur Vorschau.",
    events: "Kernel-Event-Log-Seite lesbar ausgeben.",
    replay: "Interaktive Ink-TUI zum Durchbl√§ttern eines Transkripts.",
    diff: "Zwei Transkripte in einer geteilten Ink-TUI vergleichen.",
    mcp: "Model-Context-Protocol-Hilfsprogramme ‚Ä?Server entdecken, Setup testen.",
    index: "Lokalen semantischen Suchindex erstellen (oder inkrementell aktualisieren).",
    version: "DeepMiCode-Version ausgeben.",
    update: "Nach einer neueren DeepMiCode-Version suchen und installieren.",
  },
  stats: {
    ...EN.stats,
    usageHint: "F√ºhre `DeepMiCode chat`, `DeepMiCode code` oder `DeepMiCode run <task>` aus ‚Ä?jeden Turn",
    usageDetail: "H√§ngt eine Zeile an das Log an; `DeepMiCode stats` fasst sie zusammen.",
  },
  run: {
    ...EN.run,
    missingApiKey:
      "DEEPSEEK_API_KEY ist nicht gesetzt und stdin ist kein TTY (Nachfrage nicht m√∂glich).\n" +
      "Setze die Umgebungsvariable oder starte einmal interaktiv `DeepMiCode chat`, um einen Schl√ºssel zu speichern.\n",
  },
  sessions: {
    ...EN.sessions,
    emptyHint:
      "Noch keine gespeicherten Sitzungen ‚Ä?starte `DeepMiCode chat` (Sitzungen werden automatisch gespeichert, au√üer mit --no-session).",
    listHeader: "Gespeicherte Sitzungen (~/.deepmicode/sessions/):",
    inspectHint: "Ansehen:       DeepMiCode sessions <name>",
    resumeHint: "Fortsetzen:    DeepMiCode chat --session <name>",
    noSession: 'Keine Sitzung namens "{name}" (oder sie ist leer).',
    lookedAt: "Angesehen: {path}",
    noIdleSessions: "Keine Sitzungen seit >= {days} Tagen inaktiv. Nichts bereinigt.",
    wouldPrune: "W√ºrde {count} Sitzung(en) bereinigen, die >= {days} Tage inaktiv sind:",
    dryRunHint: "Ohne --dry-run erneut ausf√ºhren, um wirklich zu l√∂schen.",
    prunedCount: "{count} Sitzung(en) bereinigt, die >= {days} Tage inaktiv waren:",
    daysInvalid: "--days muss eine positive ganze Zahl sein (erhalten: {days}).",
  },
  ui: {
    ...EN.ui,
    tipShownOnce: "einmal angezeigt",
    modelOverride: "das Standardmodell √ºberschreiben",
    noSession: "Sitzungsspeicherung f√ºr diesen Durchlauf deaktivieren",
    noMouseHint:
      "SGR-Mausverfolgung deaktivieren; stellt die native Auswahl per Ziehen und Rechtsklick wieder her",
    noProxyHint: "HTTPS_PROXY / HTTP_PROXY f√ºr diesen Durchlauf ignorieren; direkt verbinden",
    resumeHint: "die angegebene Sitzung fortsetzen (auch wenn inaktiv)",
    newHint: "Eine neue Sitzung erzwingen (--session / --continue ignorieren)",
    transcriptHint: "Pfad zum Speichern der JSONL-Ausgabe",
    budgetHint: "Sitzungs-USD-Obergrenze ‚Ä?warnt bei 80 %, verweigert den n√§chsten Zug bei 100 %",
    modelIdHint: "DeepSeek-Modell-ID (z. B. deepseek-v4-flash)",
    systemPromptHint: "den Standard-System-Prompt √ºberschreiben",
    effortHint: "Reasoning-Effort ‚Ä?niedrig|mittel|hoch|maximal",
    sessionNameHint: "Sitzungsname (Standard: ‚Äûdefault‚Ä?",
    ephemeralHint: "Sitzungsspeicherung f√ºr diesen Durchlauf deaktivieren",
    mcpSpecHint: "MCP-Server-Spezifikation (wiederholbar)",
    mcpPrefixHint: "Pr√§fix f√ºr MCP-Toolnamen",
    noConfigHint: "Ignoriere bei diesem Durchlauf die Datei ~/.deepmicode/config.json",
    effortHintShort: "Reasoning-Effort ‚Ä?niedrig|mittel|hoch|maximal",
    budgetHintShort: "Sitzungs-USD-Obergrenze",
    transcriptHintShort: "Pfad zum JSONL-Transkript",
    mcpSpecHintShort: "MCP-Server-Spezifikation (wiederholbar)",
    mcpPrefixHintShort: "Pr√§fix f√ºr MCP-Toolnamen",
    dryRunHint: "anzeigen, was installiert w√ºrde, ohne es tats√§chlich zu installieren",
    rebuildHint: "den Index komplett neu erstellen",
    embedModelHint: "Name des Einbettungsmodells",
    projectDirHint: "Projektstammverzeichnis",
    ollamaUrlHint: "Ollama-Server-URL",
    skipPromptsHint: "Best√§tigungsaufforderungen √ºberspringen",
    verboseHint: "Alle Metadaten der Sitzung anzeigen",
    pruneDaysHint:
      "Sitzungen l√∂schen, die seit mindestens dieser Anzahl von Tagen inaktiv sind (Standard: 90)",
    pruneDryRunHint: "Liste auf, was gel√∂scht w√ºrde, ohne etwas zu entfernen",
    eventTypeHint: "Nach Ereignistyp filtern",
    eventSinceHint: "Beginne mit dieser Ereignis-ID",
    eventTailHint: "Nur die letzten N Ereignisse anzeigen",
    jsonHint: "Ausgabe als JSON",
    projectionHint: "Zeige den voraussichtlichen Zustand bei jedem Ereignis an",
    printHint: "Anzeige √ºber stdout statt √ºber die TUI",
    headHint: "Zeige nur die ersten N Ereignisse an",
    tailHint: "Nur die letzten N Ereignisse anzeigen",
    mdReportHint: "Erstelle einen Markdown-Diff-Bericht unter diesem Pfad",
    printHintTable: "Eine Tabelle auf die Standardausgabe ausgeben",
    tuiHint: "√ñffne die interaktive TUI",
    labelAHint: "Bezeichnung f√ºr den linken Bereich",
    labelBHint: "Bezeichnung f√ºr den rechten Bereich",
    mcpListDescription: "Durchsuche das MCP-Register (offiziell ‚Ü?smithery ‚Ü?lokaler Fallback)",
    mcpInspectDescription:
      "die Spezifikationen eines MCP-Servers pr√ºfen (Tools, Ressourcen, Eingabeaufforderungen)",
    mcpSearchDescription:
      "Suche in der MCP-Registrierung nach Servern, die einer Suchanfrage entsprechen",
    mcpInstallDescription:
      "Einen MCP-Server anhand seines Namens installieren (schreibt dessen Spezifikation in deine Konfiguration)",
    mcpBrowseDescription:
      "Interaktiver Marktplatz-Browser ‚Ä?tippe, um zu filtern, dr√ºcke die Eingabetaste, um zu installieren",
    mcpLocalHint: "Nur den mitgelieferten Offline-Katalog anzeigen",
    mcpRefreshHint: "den 24-Stunden-Cache umgehen und neu abrufen",
    mcpLimitHint: "Maximale Anzahl der anzuzeigenden Eintr√§ge",
    mcpPagesHint: "Lade gleich so viele Seiten (Standard: 1)",
    mcpAllHint: "Jede Seite laden (beim ersten Mal etwas langsam)",
    mcpMaxPagesHint:
      "Begrenze die Anzahl der Seiten, die bei der Suche durchsucht werden sollen (Standard: 20)",
    jsonHintCatalog: "Ausgabe als JSON",
    jsonHintReport: "Gib den Inspektionsbericht als JSON aus",
    modelOverrideFlash: "das Modell √ºberschreiben (Standard: deepseek-v4-flash)",
    skipConfirmHint: "Die Best√§tigungsabfrage √ºberspringen",
    yoloHint:
      "Plan-Checkpoints f√ºr diesen Aufruf automatisch genehmigen (entspricht editMode=yolo, ohne die Konfiguration zu √§ndern)",
    welcome:
      "Starte jederzeit `DeepMiCode`, um zu chatten ‚Ä?deine Einstellungen bleiben gespeichert.",
    taglineChat: "DeepSeek-nativer Agent",
    taglineCode: "DeepSeek-nativer Coding-Agent",
    taglineSub: "cache-first ¬∑ flash-first",
    startSessionHint: "Tippe eine Nachricht, um deine Sitzung zu starten",
    inputPlaceholder: "Frag etwas... (tippe / f√ºr Befehle, @ f√ºr Dateien)",
    busy: "Denke nach...",
    thinking: "‚ñ?denke nach...",
    undo: "R√ºckg√§ngig",
    undoHint: "Dr√ºcke innerhalb von 5s zum R√ºckg√§ngig-Machen",
    applied: "angewendet",
    rejected: "abgelehnt",
    noDashboard: "Automatisch gestartetes eingebettetes Web-Dashboard unterdr√ºcken.",
    openDashboardHint:
      "Dashboard-URL sofort im Standard-Browser √∂ffnen, sobald der Server bereit ist. Keine Wirkung bei --no-dashboard.",
    dashboardPortHint:
      "Dashboard auf einen festen Port (1‚Ä?5535) festlegen. Stabil √ºber Neustarts hinweg ‚Ä?erforderlich f√ºr SSH-Tunnel. Standard: ephemeral.",
    dashboardPortInvalid:
      "‚ñ?--dashboard-port={value} wird ignoriert (muss eine ganze Zahl 1‚Ä?5535 sein) ‚Ä?R√ºckfall auf ephemeral",
    dashboardAutoStartFailed:
      "‚ñ?Dashboard-Autostart fehlgeschlagen ({reason}) ‚Ä?/dashboard versuchen oder --no-dashboard zum Unterdr√ºcken",
    systemAppendHint:
      "Anweisungen an den Code-System-Prompt anh√§ngen. Ersetzt NICHT den Standard-Prompt ‚Ä?wird danach eingef√ºgt.",
    systemAppendFileHint:
      "Dateiinhalte an den Code-System-Prompt anh√§ngen. Ersetzt NICHT den Standard-Prompt. UTF-8, relativ zu cwd oder absolut.",
    resumedSession:
      '‚ñ?Sitzung "{name}" fortgesetzt mit {count} vorherigen Nachrichten ¬∑ /new f√ºr frischen Start ¬∑ /sessions zum Verwalten',
    newSession:
      '‚ñ?Sitzung "{name}" (neu) ‚Ä?automatisch gespeichert w√§hrend des Chattens ¬∑ /sessions zum Umbenennen oder L√∂schen',
    ephemeralSession:
      "‚ñ?ephemerer Chat (keine Sitzungspersistenz) ‚Ä?--no-session weglassen zum Aktivieren",
    restoredEdits:
      "‚ñ?{count} ausstehende Edit-Block(s) aus einem unterbrochenen vorherigen Durchlauf wiederhergestellt ‚Ä?/apply zum √úbernehmen oder /discard zum Verwerfen.",
    resumedPlan: "Fortgesetzter Plan ¬∑ {when}{summary}",
  },
  code: {
    ...EN.code,
    workspaceConflict:
      "‚ö?Arbeitsbereich enth√§lt Dateien einer anderen Agent-Plattform ({platforms}). DeepMiCode Code kann sie als Projektinhalt lesen; starte mit --dir <dein-projekt> neu, falls das nicht gew√ºnscht ist.\n",
    systemAppendEmpty: "--system-append ist leer ‚Ä?kein Prompt-Text wird angeh√§ngt\n",
    systemAppendFileReadError:
      'Fehler: kann --system-append-file "{filePath}" nicht lesen: {errorDetails}\n',
  },
  slash: {
    ...EN.slash,
    help: { ...EN.slash.help, description: "Vollst√§ndige Befehlsreferenz anzeigen" },
    status: { ...EN.slash.status, description: "Aktuelles Modell, Flags, Kontext und Sitzung" },
    effort: {
      ...EN.slash.effort,
      argsHint: "<niedrig|mittel|hoch|max>",
      description:
        "Reasoning-Effort-Grenze (low|medium|high|max); high ist der sichere Standard f√ºr vLLM/Azure",
    },
    model: {
      ...EN.slash.model,
      description: "DeepSeek-Modell-ID wechseln",
    },
    models: {
      ...EN.slash.models,
      description: "Verf√ºgbare Modelle von DeepSeek /models abrufen",
    },
    language: {
      description: "Laufzeitsprache wechseln",
      argsHint: "<EN|zh-CN|de>",
      success: "Sprache auf Deutsch umgestellt.",
      unsupported: "Nicht unterst√ºtzter Sprachcode: {code}. Unterst√ºtzt: {supported}.",
    },
    budget: {
      ...EN.slash.budget,
      description:
        "Session-USD-Grenze ‚Ä?warnt bei 80 %, verweigert n√§chsten Turn bei 100 %. Standardm√§√üig aus. /budget allein zeigt Status.",
    },
    mcp: { ...EN.slash.mcp, description: "MCP-Server + Tools dieser Sitzung auflisten" },
    resource: {
      ...EN.slash.resource,
      description:
        "MCP-Ressourcen durchsuchen + lesen (kein Arg ‚Ü?URIs auflisten; <uri> ‚Ü?Inhalt abrufen)",
    },
    prompt: {
      ...EN.slash.prompt,
      argsHint: "[Name]",
      description:
        "MCP-Prompts durchsuchen + abrufen (kein Arg ‚Ü?Namen auflisten; <name> ‚Ü?Prompt rendern)",
    },
    memory: {
      ...EN.slash.memory,
      argsHint: "[Liste|<Name> anzeigen|<Name> vergessen|<Bereich> l√∂schen ‚Ä?Best√§tigen]",
      description: "Pinned Memory anzeigen / verwalten (DEEPMICODE.md + ~/.deepmicode/memory)",
    },
    skill: {
      ...EN.slash.skill,
      description:
        "Benutzer-Skills auflisten / ausf√ºhren (Projekt + benutzerdefiniert + global + builtin)",
    },
    hooks: {
      ...EN.slash.hooks,
      argsHint: "[Neu laden]",
      description:
        "Aktive Hooks auflisten (settings.json unter .deepmicode/) ¬∑ reload liest von Platte neu",
    },
    permissions: {
      ...EN.slash.permissions,
      argsHint:
        "[Liste|<Pr√§fix> hinzuf√ºgen|<Pr√§fix|N> entfernen|L√∂schen (Best√§tigung erforderlich)]",
      description:
        "Shell-Allowlist anzeigen / bearbeiten (builtin schreibgesch√ºtzt ¬∑ pro Projekt: ~/.deepmicode/config.json)",
    },
    dashboard: {
      ...EN.slash.dashboard,
      argsHint: "[Stopp]",
      description: "Eingebettetes Web-Dashboard starten (127.0.0.1, token-gesichert)",
    },
    update: {
      ...EN.slash.update,
      description: "Aktuelle vs. neueste Version anzeigen + Upgrade-Befehl",
    },
    stats: {
      ...EN.slash.stats,
      description:
        "Sitzungs√ºbergreifendes Kosten-Dashboard (heute / Woche / Monat / gesamt ¬∑ Cache-Treffer ¬∑ vs. Claude)",
    },
    cost: {
      ...EN.slash.cost,
      argsHint: "[Text]",
      description:
        "Ohne Text ‚Ü?Ausgaben letzter Turn (Kostenkarte); Mit Text ‚Ü?Kostensch√§tzung f√ºr als n√§chster Senden (worst-case + likely-cache)",
    },
    doctor: {
      ...EN.slash.doctor,
      description: "Gesundheitscheck (API / Config / API-Reichweite / Index / Hooks / Projekt)",
    },
    context: {
      ...EN.slash.context,
      description: "Context-Window-Aufschl√ºsselung (System / Tools / Log / Input)",
    },
    retry: {
      ...EN.slash.retry,
      description: "Letzte Nachricht k√ºrzen & erneut senden (frischer Sample)",
    },
    compact: {
      ...EN.slash.compact,
      argsHint: "[Token]",
      description:
        "√úberdimensionierte Tool-Ergebnisse + Tool-Call-Args im Log k√ºrzen; Grenze in Tokens, Standard 4000",
    },
    cwd: {
      ...EN.slash.cwd,
      argsHint: "[Pfad]",
      description:
        "Workspace-Root mid-Session wechseln ‚Ä?FS-/Shell-/Memory-Tools neu ausrichten, Projekt-Hooks neu laden, @-Mention-Walker aktualisieren",
    },
    stop: {
      ...EN.slash.stop,
      description: "Aktuellen Modell-Turn abbrechen (getippte Alternative zu Esc)",
    },
    feedback: {
      ...EN.slash.feedback,
      description: "GitHub-Issue mit Diagnoseinfo √∂ffnen (in Zwischenablage kopiert)",
    },
    about: { ...EN.slash.about, description: "Projektinfo ‚Ä?Version, Website, Repo, Lizenz" },
    keys: { ...EN.slash.keys, description: "Tastatur + Maus + Kopieren/Einf√ºgen-Referenz" },
    plans: {
      ...EN.slash.plans,
      description: "Aktive + archivierte Pl√§ne dieser Sitzung auflisten, neueste zuerst",
    },
    replay: {
      ...EN.slash.replay,
      description:
        "Archivierten Plan als schreibgesch√ºtzte Time-Travel-Schnappschuss laden (Standard: neuester)",
    },
    sessions: {
      ...EN.slash.sessions,
      description: "Gespeicherte Sitzungen auflisten (aktuelle mit ‚ñ?markiert)",
    },
    title: {
      ...EN.slash.title,
      description: "Modell bitten, diese Sitzung anhand des Gespr√§chs umzubenennen",
    },
    qq: {
      ...EN.slash.qq,
      description:
        "QQ-Kanal verbinden, inspizieren oder trennen (erste Verbindung f√ºhrt durch App-ID / App-Secret-Setup)",
    },
    setup: { ...EN.slash.setup, description: "Erinnert dich daran, `DeepMiCode setup` auszuf√ºhren" },
    semantic: {
      ...EN.slash.semantic,
      description:
        "Semantic-Search-Status anzeigen ‚Ä?Index erstellt? Ollama installiert? Wie aktivieren?",
    },
    clear: {
      ...EN.slash.clear,
      description: "Nur sichtbaren Scrollback leeren (Log/Kontext bleibt)",
    },
    new: {
      ...EN.slash.new,
      description: "Frisches Gespr√§ch beginnen (Kontext + Scrollback l√∂schen)",
    },
    loop: {
      ...EN.slash.loop,
      argsHint: "<5s..6h> <Eingabeaufforderung>  ¬∑  Stopp  ¬∑  (keine Argumente = Status)",
      description:
        "Prompt automatisch alle <intervall> erneut senden, bis du etwas eingibst / Esc / /loop stop",
    },
    init: {
      ...EN.slash.init,
      description:
        "Projekt scannen und eine DEEPMICODE.md-Baseline erstellen (Modell schreibt; mit /apply reviewen). `force` √ºberschreibt vorhandene Datei.",
    },
    apply: {
      ...EN.slash.apply,
      description:
        "Ausstehende Edit-Blocks auf Platte schreiben (kein Arg ‚Ü?alle; `1`, `1,3` oder `1-4` ‚Ü?diese Teilmenge, Rest bleibt ausstehend)",
    },
    discard: {
      ...EN.slash.discard,
      description:
        "Ausstehende Edit-Blocks ohne Schreiben verwerfen (kein Arg ‚Ü?alle; Indizes ‚Ü?diese Teilmenge)",
    },
    walk: {
      ...EN.slash.walk,
      description:
        "Schrittweise durch ausstehende Edits gehen (git-add-p-Stil: y/n pro Block, a = Rest anwenden, A = AUTO umschalten)",
    },
    undo: { ...EN.slash.undo, description: "Letzten angewandten Edit-Batch r√ºckg√§ngig machen" },
    history: {
      ...EN.slash.history,
      description:
        "Jeden Edit-Batch dieser Sitzung auflisten (IDs f√ºr /show, r√ºckg√§ngig-Markierungen)",
    },
    show: {
      ...EN.slash.show,
      description: "Gespeicherte Edit-Diff ausgeben (ID weglassen f√ºr neuesten nicht-r√ºckg√§ngigen)",
    },
    commit: { ...EN.slash.commit, description: "git add -A && git commit -m ..." },
    checkpoint: {
      ...EN.slash.checkpoint,
      argsHint: "[Name|Liste|<ID> l√∂schen]",
      description:
        "Jede Datei, die die Sitzung ber√ºhrt hat, als Schnappschuss sichern (Cursor-artiger interner Speicher, nicht Git). /checkpoint allein listet auf.",
    },
    restore: {
      ...EN.slash.restore,
      description: "Dateien auf einen benannten Checkpoint zur√ºcksetzen (siehe /checkpoint list)",
    },
    plan: {
      ...EN.slash.plan,
      argsHint: "[Ein|Aus]",
      description:
        "Schreibgesch√ºtzten Plan-Modus umschalten (Schreibzugriffe blockiert bis submit_plan + Genehmigung)",
    },
    mode: {
      ...EN.slash.mode,
      argsHint: "[Rezension|Auto|YOLO]",
      description:
        "Edit-Gate: review (Warteschlange) ¬∑ auto (anwenden+r√ºckg√§ngig) ¬∑ yolo (anwenden+auto-shell). Shift+Tab schaltet um.",
    },
    jobs: {
      ...EN.slash.jobs,
      description: "Hintergrund-Jobs auflisten, die mit run_background gestartet wurden",
    },
    kill: {
      ...EN.slash.kill,
      argsHint: "Bezeichner",
      description: "Hintergrund-Job nach ID beenden (SIGTERM ‚Ü?SIGKILL nach Gnadenfrist)",
    },
    logs: {
      ...EN.slash.logs,
      argsHint: "<id> [Zeilen]",
      description: "Ausgabe eines Hintergrund-Jobs anzeigen (Standard letzte 80 Zeilen)",
    },
    btw: {
      ...EN.slash.btw,
      argsHint: "<Frage>",
      description:
        "Kurze Randfrage stellen ‚Ä?wird von Grund auf beantwortet, nie zum Gespr√§chskontext hinzugef√ºgt",
    },
    "search-engine": {
      ...EN.slash["search-engine"],
      description:
        "Web-Search-Backend wechseln ‚Ä?bing (Standard, funktioniert von CN ohne Proxy), searxng (selbst gehostet), metaso (kostenlos 100/Tag), tavily (kostenlos 1000/Monat), perplexity (AI-native) oder exa (AI-native)",
    },
    theme: {
      ...EN.slash.theme,
      argsHint: "[auto|dunkel|hell|mitternachtsblau|tiefblau|hoher Kontrast]",
      description: "Terminal-Theme anzeigen oder speichern. Ohne Argument √∂ffnet die Auswahl.",
    },
    exit: { ...EN.slash.exit, description: "TUI beenden" },
  },
  wizard: {
    ...EN.wizard,
    languageTitle: "Sprache ausw√§hlen",
    languageSubtitle: "Aus der Systemsprache erkannt. Sp√§ter mit /language wechselbar.",
    welcomeTitle: "Willkommen bei DeepMiCode.",
    apiKeyPrompt: "F√ºge deinen DeepSeek-API-Schl√ºssel ein, um loszulegen.",
    apiKeyGetOne: "Erhalte einen unter: https://platform.deepseek.com/api_keys",
    apiKeySavedLocally: "Lokal gespeichert unter {path}",
    apiKeyInputLabel: "Schl√ºssel > ",
    apiKeyPlaceholder: "sk-...",
    apiKeyInvalid:
      "Der Schl√ºssel wirkt zu kurz ‚Ä?f√ºge den vollst√§ndigen Token ein (16+ Zeichen, keine Leerzeichen).",
    apiKeyChecking: "API-Schl√ºssel wird gepr√ºft...",
    apiKeyRejected:
      "DeepSeek hat diesen API-Schl√ºssel abgelehnt. F√ºge einen g√ºltigen Schl√ºssel ein oder brich das Setup mit Esc ab.",
    apiKeyCheckFailed:
      "Konnte diesen API-Schl√ºssel gerade nicht verifizieren ({message}). √úberpr√ºfe deine Netzwerkverbindung oder versuche es erneut.",
    apiKeyPreview: "Vorschau: {redacted}",
    themeTitle: "Theme ausw√§hlen",
    themeSubtitle: "Die Vorschau aktualisiert sich beim Navigieren. Sp√§ter mit /theme √§nderbar.",
    themeSampleHeading: "Beispiel",
    themeFooter: "[‚Üë‚Üì] navigieren ¬∑ [Enter] best√§tigen ¬∑ [Esc] abbrechen",
    themeCaption: {
      ...EN.wizard.themeCaption,
      dark: "K√ºhle dunkle T√∂ne (Standard)",
      light: "Helle klare Ansicht",
      midnight: "Tokyo-Night-Palette",
      "deep-blue": "Tiefblau auf Schwarz",
      "high-contrast": "Barrierefreiheit",
    },
    mcpTitle: "Welche MCP-Server soll DeepMiCode f√ºr dich einrichten?",
    mcpUserArgsHint: "(du wirst {arg} bereitstellen)",
    mcpFooterMulti:
      "[‚Üë‚Üì] navigieren  ¬∑  [Leertaste] umschalten  ¬∑  [Enter] best√§tigen  ¬∑  [Esc] abbrechen  ¬∑  leer = √ºberspringen",
    mcpArgsTitle: "{name} konfigurieren",
    mcpArgsDirMissing: "Verzeichnis {path} existiert nicht.",
    mcpArgsDirCreateHint: "[Y/Enter] erstellen (mkdir -p) ¬∑ [N/Esc] anderen Pfad eingeben",
    mcpArgsDirCreateFailed: "Konnte {path} nicht erstellen: {message}",
    mcpArgsRequiredParam: "Erforderlicher Parameter: ",
    mcpArgsEmpty: "{name} ben√∂tigt einen Wert ‚Ä?leere Zeichenkette erhalten.",
    mcpArgsNotADir: "{path} existiert, ist aber kein Verzeichnis.",
    reviewTitle: "Bereit zum Speichern",
    reviewLabelApiKey: "API-Schl√ºssel",
    reviewLabelLanguage: "Sprache",
    reviewLabelTheme: "Theme",
    reviewLabelMcp: "MCP",
    reviewMcpNone: "(keine)",
    reviewMcpServers: "{count} Server",
    reviewSavesTo: "Speichert nach {path}",
    reviewSaveError: "Konfiguration konnte nicht gespeichert werden: {message}",
    reviewFooter: "[Enter] speichern ¬∑ [Esc] abbrechen",
    savedTitle: "‚ñ?Gespeichert.",
    savedShellHint:
      'Shell-Befehle, die das Modell ausf√ºhren m√∂chte, fragen jedes Mal nach ‚Ä?w√§hle ¬ªimmer erlauben" in der Eingabeaufforderung, um diesen genauen Befehl f√ºr dieses Projekt auf die Whitelist zu setzen. Kein globales Allow-All-Flag (designbedingt).',
    savedFooter: "[Enter] zum Beenden",
    selectFooter: "[‚Üë‚Üì] navigieren ¬∑ [Enter] best√§tigen ¬∑ [Esc] abbrechen",
    stepCounter: "Schritt {step}/{total} ¬∑ ",
    exitHint: "/exit zum Abbrechen",
    themeSampleReasoning: "Denken",
  },
  themePicker: {
    ...EN.themePicker,
    header: "Theme",
    footer: "‚Üë‚Üì ausw√§hlen ¬∑ ‚è?best√§tigen ¬∑ Esc abbrechen",
    currentPref: "Aktuelle Einstellung",
    activeNow: "Jetzt aktiv",
    autoDesc: "DEEPMICODE_THEME oder Standard verwenden",
  },
  planFlow: {
    ...EN.planFlow,
    approveCardTitle: "Plan genehmigen",
    approveCardMetaRight: "wartet",
    openQuestionsBanner:
      "‚ñ?der Plan zeigt offene Fragen oder Risiken ‚Ä?w√§hle {refine}, um konkrete Antworten zu schreiben, bevor das Modell fortf√§hrt.",
    openQuestionsHeader: "Offene Fragen / Risiken",
    truncatedBodyMore: "‚Ä?{n} weitere Zeile oben im Scrollback",
    truncatedBodyMorePlural: "‚Ä?{n} weitere Zeilen oben im Scrollback",
    picker: {
      ...EN.planFlow.picker,
      accept: "akzeptieren",
      acceptHint: "Jetzt ausf√ºhren, in Reihenfolge",
      refine: "verfeinern",
      refineHint: "Dem Agenten mehr Anweisungen geben, neuen Plan entwerfen",
      revise: "√ºberarbeiten",
      reviseHint: "Plan inline bearbeiten vor der Ausf√ºhrung (Schritte √ºberspringen/neu ordnen)",
      reject: "ablehnen",
      rejectHint: "Verwerfen, Agent versucht von Grund auf neu",
    },
    refineFooter: "‚è?senden  ¬∑  Esc zur√ºck zur Auswahl",
    refineQuestionsHeading: "Beantworte diese oder beschreibe die gew√ºnschte √Ñnderung:",
    modes: {
      ...EN.planFlow.modes,
      approve: {
        ...EN.planFlow.modes.approve,
        title: "Genehmigen ‚Ä?letzte Anweisungen?",
        hint: "Beantworte Fragen aus dem Plan, f√ºge Einschr√§nkungen hinzu oder dr√ºcke einfach Enter zur Genehmigung.",
        blankHint: " (Enter ohne Text = ohne Zusatzanweisungen genehmigen.)",
      },
      refine: {
        ...EN.planFlow.modes.refine,
        title: "Verfeinern ‚Ä?was soll das Modell √§ndern?",
        hint: "Beschreibe, was falsch ist oder fehlt, oder beantworte Fragen aus dem Plan.",
        blankHint: " (Enter ohne Text = Modell w√§hlt sichere Standardwerte f√ºr offene Fragen.)",
      },
      reject: {
        ...EN.planFlow.modes.reject,
        title: "Ablehnen ‚Ä?sag dem Modell warum (optional)",
        hint: "Sag dem Modell, was es an deinem Ziel falsch verstanden hat oder was du stattdessen m√∂chtest.",
        blankHint:
          " (Enter ohne Text = ohne Erkl√§rung abbrechen; das Modell fragt, was du m√∂chtest.)",
      },
      "checkpoint-revise": {
        ...EN.planFlow.modes["checkpoint-revise"],
        title: "√úberarbeiten ‚Ä?was soll sich vor dem n√§chsten Schritt √§ndern?",
        hint: "Umfangs√§nderung, Schritte √ºberspringen, alternativer Ansatz ‚Ä?das Modell passt den Restplan an.",
        blankHint: " (Enter ohne Text = mit aktuellem Plan fortfahren.)",
      },
      "choice-custom": {
        ...EN.planFlow.modes["choice-custom"],
        title: "Benutzerdefinierte Antwort ‚Ä?schreibe, was passt",
        hint: "Freitext-Antwort. Das Modell liest sie w√∂rtlich und f√§hrt fort ‚Ä?keine Notwendigkeit, die aufgef√ºhrten Optionen zu treffen.",
        blankHint: " (Enter ohne Text = Modell fragen, was du eigentlich m√∂chtest.)",
      },
    },
    checkpoint: {
      ...EN.planFlow.checkpoint,
      title: "Checkpoint ‚Ä?Schritt erledigt",
      continue: "Fortfahren ‚Ä?n√§chsten Schritt ausf√ºhren",
      continueHint: "Modell f√§hrt mit dem n√§chsten Schritt fort.",
      finish: "Abschlie√üen ‚Ä?zusammenfassen und beenden",
      finishHint:
        "Modell zeichnet den letzten Schritt auf und fasst den abgeschlossenen Plan zusammen.",
      revise: "√úberarbeiten ‚Ä?Feedback vor dem n√§chsten Schritt geben",
      reviseHint: "Bleibe pausiert, tippe Anweisungen; Modell passt den Restplan an.",
      stop: "Anhalten ‚Ä?Plan hier beenden",
      stopHint: "Modell fasst zusammen, was getan wurde, und beendet.",
    },
    stepList: {
      ...EN.planFlow.stepList,
      counter: "{total} Schritte",
      counterSingular: "{total} Schritt",
      counterDone: "{done}/{total} erledigt ({pct}%) ¬∑ {total} Schritte",
      counterDoneSingular: "{done}/{total} erledigt ({pct}%) ¬∑ {total} Schritt",
    },
    noPlanSummary: "Noch kein Plan-Body √ºbermittelt.",
    detailCollapsedHint: "Strg+P erweitert die vollst√§ndigen Plan-Details.",
    detailExpandedHint: "Strg+P klappt Details ein.",
    detailHeader: "Plan-Details",
    detailWindow: "Zeige Zeilen {start}-{end} von {total}",
    detailScrollHint: "Bild‚Ü?Bild‚Ü?scrollt Details ¬∑ Pos1/Ende springt",
    reviseTitle: "Plan √ºberarbeiten",
    reviseSteps: "{count} Schritte",
    reviseFooter:
      "‚Üë‚Üì fokussieren  ¬∑  Leertaste √ºberspringen umschalten  ¬∑  k/j verschieben  ¬∑  ‚è?akzeptieren  ¬∑  Esc abbrechen",
    riskMed: " mittel",
    riskHigh: " hoch",
    completeMsg: "‚ñ?Plan abgeschlossen ‚Ä?alle {total} Schritt(e) erledigt ¬∑ archiviert",
  },
  app: {
    ...EN.app,
    dashboardStopped: "‚ñ?Dashboard gestoppt.",
    notedScopeProject: "Projekt",
    notedScopeGlobal: "global",
    commandFailed: "! Befehl fehlgeschlagen",
    btwFailed: "/btw fehlgeschlagen",
    walkCancelledRemaining: "‚ñ?Walk abgebrochen ‚Ä?{count} Block(s) noch ausstehend.",
    walkCancelled: "‚ñ?Walk abgebrochen.",
    editModeYolo:
      "‚ñ?Edit-Modus: YOLO ‚Ä?Edits UND Shell-Befehle auto-ausf√ºhren. /undo macht Edits immer noch r√ºckg√§ngig. Vorsicht.",
    editModeAuto:
      "‚ñ?Edit-Modus: AUTO ‚Ä?Edits werden sofort angewandt; dr√ºcke u innerhalb von 5s zum R√ºckg√§ngigmachen (Leertaste pausiert den Timer). Shell-Befehle fragen weiterhin.",
    editModeReview: "‚ñ?Edit-Modus: review ‚Ä?Edits warten auf /apply (oder y) / /discard (oder n)",
    rejectedEdit: "‚ñ?Edit abgelehnt: {path}{context}",
    autoApprovingRest: "‚ñ?Restliche Edits f√ºr diesen Turn werden automatisch genehmigt",
    flippedAutoSession: "‚ñ?F√ºr den Rest der Sitzung auf AUTO umgeschaltet (gespeichert)",
    flippedAutoWalk:
      "‚ñ?Auf AUTO umgeschaltet ‚Ä?zuk√ºnftige Edits werden sofort angewandt. Walk beendet.",
    notedMemory: "‚ñ?vermerkt ({scope}) ‚Ä?{verb} {path}",
    notedVerbCreated: "erstellt",
    notedVerbAppended: "Angeh√§ngt an",
    memoryWriteFailed: "# Speicherschreibfehler",
    verboseOn: "‚ñ?Ausf√ºhrlicher Modus an ‚Ä?vollst√§ndiges Reasoning + Tool-Ausgabe",
    verboseOff: "‚ñ?Ausf√ºhrlicher Modus aus ‚Ä?head/tail-K√ºrzung wiederhergestellt",
    steerInjected: "‚ñ?Steuerung in Warteschlange ‚Ä?wird nach dem aktuellen Schritt hinzugef√ºgt",
    steerCommandRejected: "‚ñ?Befehle sind deaktiviert, w√§hrend ein Turn gesteuert wird",
    btwUsage: "‚ñ?/btw <Frage> ‚Ä?eine Randfrage stellen, ohne den Gespr√§chskontext zu verschmutzen.",
    btwHeader: "‚â?btw",
    restoreCodeOnly: "‚ñ?/restore ist nur im Code-Modus verf√ºgbar",
    hookUserPromptSubmit: "UserPromptSubmit-Hook",
    hookStop: "Stop-Hook",
    atMentions: "‚ñ?@mentions: {parts}",
    atUrl: "‚ñ?@url: {parts}",
    atUrlFailed: "@url Erweiterung fehlgeschlagen",
    sessionTitleNoSession: "‚ñ?Keine persistierte Sitzung aktiv, also nichts umzubenennen.",
    sessionTitleNoContent: "‚ñ?Noch nicht genug Gespr√§chsinhalt, um diese Sitzung zu benennen.",
    sessionTitleNoTitle: "‚ñ?Das Modell hat keinen brauchbaren Sitzungstitel zur√ºckgegeben.",
    sessionTitleUpdated: '‚ñ?Sitzungstitel aktualisiert: "{title}"',
    sessionTitleRenameFailed: '‚ñ?Sitzung konnte nicht f√ºr Titel "{title}" umbenannt werden.',
    sessionTitleRenamed: '‚ñ?Sitzung umbenannt in "{name}" ‚Ä?{title}',
    sessionTitleAutoRenamed: '‚ñ?Automatisch benannte Sitzung "{name}" ‚Ä?{title}',
    workspaceSwitched: "‚ñ?Arbeitsbereich gewechselt zu {root}",
    semanticRepointed: "‚ñ?Semantic-Search umgeleitet nach {root}",
    semanticDisabledForRoot: "‚ñ?Semantic-Search deaktiviert (kein kompatibler Index in {root})",
    semanticRebootstrapFailed: "‚ñ?Semantic-Search-Neustart fehlgeschlagen: {reason}",
    denied: "‚ñ?verweigert: {cmd}{context}",
    alwaysAllowed: '‚ñ?"{prefix}" f√ºr {dir} dauerhaft erlaubt',
    runningCommand: "‚ñ?f√ºhre aus: {cmd}",
    startingBackground: "‚ñ?starte (Hintergrund): {cmd}",
    checkpointSaved:
      "‚õ?Checkpoint gespeichert ¬∑ {id} ¬∑ {count} Datei(en) ¬∑ /restore {id} zum Zur√ºcksetzen",
    continuingAfter: "‚ñ?fortgesetzt nach {label}{counter}",
    planStoppedAt: "‚ñ?Plan angehalten bei {label}{counter}",
    revisingAfter: "‚ñ?√ºberarbeite nach {label} ‚Ä?{feedback}",
    historyScrollHint: " ‚Ü?lese Verlauf ¬∑ Ende / Bild‚Ü?zur√ºck zum Ende ¬∑ ‚Ü?eine Zeile vor",
    editHistoryTitle: "Edit-Verlauf (√§lteste zuerst):",
    editHistoryNoCodeMode: "Nicht im Code-Modus",
    editHistoryNoEdits: "Noch keine Edits in dieser Sitzung aufgezeichnet",
    editHistoryNoShowId:
      "Verwendung: /show [id] [pfad]   (ID weglassen f√ºr neueste; Pfad aus der Datei-Zusammenfassung)",
    editHistoryIdNotFound: "Kein Edit #{id} ‚Ä?/history ausf√ºhren f√ºr g√ºltige IDs",
    editHistoryLookupFailed: "Unerwartet: History-Lookup fehlgeschlagen",
    editHistoryBatchNoFile: 'Batch #{id} enth√§lt kein "{path}" ‚Ä?Dateien in diesem Batch: {files}',
    editHistoryNoEdits2: "Keine Edits in dieser Sitzung aufgezeichnet ‚Ä?/history ist leer",
    editHistoryStatusApplied: "angewandt",
    editHistoryStatusPartial: "TEILWEISE",
    editHistoryStatusUndone: "R√úCKG√ÑNGIG",
    editHistoryHelpShow:
      "/show <id>            ‚Ü?Zusammenfassung pro Datei    ¬∑    /show <id> <pfad>  ‚Ü?vollst√§ndige Diff einer Datei",
    editHistoryHelpUndo:
      "/undo                 ‚Ü?neueste nicht-r√ºckg√§ngige   ¬∑    /undo <id> [pfad]  ‚Ü?gezielten Batch oder Datei r√ºckg√§ngig machen",
    editHistoryAlreadyReverted:
      "(bereits r√ºckg√§ngig gemacht ‚Ä?/history zeigt den batch-level Status)",
    editHistoryRevertFile: "/undo {id} {path}  ‚Ü?nur diese Datei r√ºckg√§ngig machen",
    mcpFailed: "MCP {name} fehlgeschlagen",
    mcpWarn: "MCP {name} Warnung",
    unknownTheme: "Unbekanntes Theme: {name}\nVerf√ºgbar: {choices}",
    themeSaved: "Theme gespeichert: {name}\nAktiv beim n√§chsten Start: {active}",
    noPendingEdits:
      "Nichts ausstehend ‚Ä?das Modell hat seit dem letzten /apply oder /discard keine Edits vorgeschlagen.",
    noMatchedApply:
      "‚ñ?Keine Edits mit diesen Indizes gefunden ‚Ä?nichts angewandt. Verwende /apply ohne Argumente, um alle zu √ºbernehmen.",
    noPendingDiscard: "Nichts ausstehend zum Verwerfen.",
    noMatchedDiscard: "‚ñ?Keine Edits mit diesen Indizes gefunden ‚Ä?nichts verworfen.",
    blocksStillPending:
      "‚ñ?{count} Edit-Block(s) noch ausstehend ‚Ä?/apply oder /discard zum Bereinigen.",
    nothingWritten: ". Nichts auf Platte geschrieben.",
    discardedCount: "‚ñ?{count} ausstehende Edit-Block(s) verworfen",
    noEventsFor: 'Keine Ereignisse f√ºr Sitzung "{name}"',
    lookedAtFile: "Angesehen: {path}",
    sidecarHint:
      "(Sitzungen erstellen den Sidecar automatisch beim ersten Turn ‚Ä?wurde diese Sitzung bereits ausgef√ºhrt?)",
  },
  hooks: {
    ...EN.hooks,
    head: "Hook {tag} `{cmd}` {decision}{truncTag}",
    headWithDetail: "Hook {tag} `{cmd}` {decision}{truncTag}: {detail}",
    truncated: " (Ausgabe bei 256 KB gek√ºrzt)",
    decisionBlock: "blockieren",
    decisionWarn: "warnen",
    decisionTimeout: "Timeout",
    decisionError: "Fehler",
  },
  summary: {
    ...EN.summary,
    status: "Zusammenfassung der gesammelten Informationen...",
    hallucinatedFallback:
      "(Modell hat gef√§lschte Tool-Call-Markup statt einer Prosa-Zusammenfassung ausgegeben ‚Ä?versuche /retry mit einer engeren Frage, oder /think zur Inspektion von R1s Reasoning)",
    failedAfterReason:
      "{label} und der Fallback-Summary-Aufruf sind fehlgeschlagen: {message}. F√ºhre /clear aus und versuche es mit einer engeren Frage, oder erh√∂he --max-tool-iters.",
  },
  loop: {
    ...EN.loop,
    budgetExhausted:
      "Sitzungsbudget ersch√∂pft ‚Ä?${spent} ausgegeben ‚â?Grenze ${cap}. Erh√∂he die Grenze mit /budget <usd>, schalte sie mit /budget off aus oder beende die Sitzung.",
    budget80Pct:
      "‚ñ?Budget zu 80 % verbraucht ‚Ä?${spent} von ${cap}. Der n√§chste oder √ºbern√§chste Turn erreicht wahrscheinlich die Grenze.",
    proArmed:
      "‚á?/pro aktiviert ‚Ä?dieser Turn l√§uft auf deepseek-v4-pro (einmalig ¬∑ deaktiviert nach dem Turn)",
    toolUploadStatus: "Tool-Ergebnis hochgeladen ‚Ä?Modell denkt vor der n√§chsten Antwort...",
    turnStartFoldStatus: "Turn-Start: Kontext n√§hert sich Grenze, komprimiere Verlauf...",
    turnStartFolded:
      "Turn-Start: Anfrage ~{estimate}/{ctxMax} Tokens ({pct}%) ‚Ä?{beforeMessages} Nachrichten ‚Ü?{afterMessages} komprimiert. Sende.",
    harvestStatus: "Planstatus wird aus dem Reasoning extrahiert...",
    repeatToolCallWarning:
      "Wiederholten Tool-Aufruf erkannt ‚Ä?lasse das Modell das Problem sehen und es mit einem anderen Ansatz erneut versuchen.",
    stormStuck:
      "Festgefahrene Wiederholungsschleife gestoppt ‚Ä?das Modell rief dasselbe Tool mit identischen Argumenten auf, selbst nach einem Selbstkorrektur-Hinweis. Versuche /retry, umformulieren oder schlie√üe den zugrunde liegenden Blocker aus.",
    stormSuppressed:
      "{count} wiederholte Tool-Aufrufe unterdr√ºckt ‚Ä?gleicher Name + Argumente 3+ Mal gesendet.",
    compactingHistoryStatus: "Komprimiere Verlauf{aggressiveTag}...",
    aggressiveTag: " (aggressiv)",
    foldedHistory:
      "Kontext {before}/{ctxMax} ({pct}%) ‚Ä?{beforeMessages} Nachrichten ‚Ü?{afterMessages} gefaltet (Zusammenfassung {summaryChars} Zeichen). Fahre fort.",
    aggressivelyFoldedHistory:
      "Kontext {before}/{ctxMax} ({pct}%) ‚Ä?{beforeMessages} Nachrichten ‚Ü?{afterMessages} aggressiv gefaltet (Zusammenfassung {summaryChars} Zeichen). Fahre fort.",
    forcingSummary:
      "Kontext {before}/{ctxMax} ({pct}%) ‚Ä?erzwinge Zusammenfassung aus dem Gesammelten. F√ºhre /compact, /clear oder /new aus, um zur√ºckzusetzen.",
  },
  errors: {
    ...EN.errors,
    contextOverflow:
      "Context-√úberlauf (DeepSeek 400): Sitzungsverlauf ist {requested}, √ºber dem Prompt-Limit des Modells (V4: 1M Tokens; legacy chat/reasoner: 131k). Meist ist ein einzelnes Tool-Ergebnis zu gro√ü geworden. DeepMiCode begrenzt neue Tool-Ergebnisse auf 8k Tokens und heilt √ºberdimensionierte Verl√§ufe automatisch beim Sitzungsladen ‚Ä?ein Neustart behebt es oft. Falls es weiterhin √ºberl√§uft, f√ºhre /new f√ºr einen frischen Start aus oder √∂ffne /sessions und dr√ºcke [d], um diese Sitzung zu l√∂schen.",
    contextOverflowTooMany: "Zu viele Tokens",
    auth401:
      "Authentifizierung fehlgeschlagen (DeepSeek 401): {inner}. Dein API-Schl√ºssel wird abgewiesen. Behebe mit `DeepMiCode setup` oder `export DEEPSEEK_API_KEY=sk-...`. Erhalte einen unter https://platform.deepseek.com/api_keys.",
    balance402:
      "Kontoguthaben aufgebraucht (DeepSeek 402): {inner}. Lade auf unter https://platform.deepseek.com/top_up ‚Ä?der Panel-Header zeigt dein Guthaben, sobald es nicht Null ist.",
    badparam422: "Ung√ºltiger Parameter (DeepSeek 422): {inner}",
    badrequest400: "Fehlerhafte Anfrage (DeepSeek 400): {inner}",
    concurrency429:
      "DeepSeek-Gleichzeitigkeitslimit erreicht (429): {inner}. Das Konto hat zu viele gleichzeitige Anfragen (Grenze: 500 f√ºr v4-pro, 2500 f√ºr v4-flash, summiert √ºber alle API-Schl√ºssel des Kontos). Meist l√§uft ein weiterer DeepMiCode-Prozess mit demselben Schl√ºssel oder ein paralleler Subagent-Fan-out hat √ºberzogen. Warte einige Sekunden und wiederhole, reduziere die Parallelit√§t oder beantrage eine h√∂here Grenze unter https://platform.deepseek.com.",
    deepseek5xxHead:
      "DeepSeek-Dienst nicht verf√ºgbar ({status}) ‚Ä?dies ist ein DeepSeek-seitiges Problem, nicht DeepMiCode. Bereits 4√ó mit Backoff wiederholt.",
    deepseek5xxReachable:
      " DeepSeek's Haupt-API hat auf unseren Health-Check geantwortet, aber /chat/completions schl√§gt fehl ‚Ä?partieller Ausfall auf ihrer Seite.",
    deepseek5xxUnreachable:
      " DeepSeek-API ist von deinem Netzwerk aus nicht erreichbar ‚Ä?k√∂nnte ein gr√∂√üerer DS-Ausfall oder ein lokales Netzwerkproblem sein.",
    deepseek5xxActionNetwork:
      " Versuche: (1) Netzwerk pr√ºfen, (2) 30s warten und wiederholen, (3) Statusseite: https://status.deepseek.com.",
    deepseek5xxActionRetry:
      " Versuche: (1) 30s warten und wiederholen, (2) /model zum Modellwechsel, (3) Statusseite: https://status.deepseek.com.",
    upstream5xxHead:
      "Upstream-Dienst nicht verf√ºgbar ({status}) bei {host} ‚Ä?der konfigurierte API-Endpunkt hat einen Serverfehler zur√ºckgegeben, kein DeepMiCode-Fehler. Bereits 4√ó mit Backoff wiederholt.",
    upstream5xxActionRetry:
      " Versuche: (1) Pr√ºfen, ob der lokale/Proxy-Modell-Server l√§uft, (2) warten und wiederholen, (3) /model zum Modellwechsel.",
    innerNoMessage: "(keine Nachricht)",
    reasonAborted:
      "[vom Benutzer abgebrochen (Esc) ‚Ä?fasse zusammen, was ich bisher gefunden habe]",
    reasonContextGuard:
      "[Context-Budget wird knapp ‚Ä?fasse zusammen, bevor der n√§chste Aufruf √ºberl√§uft]",
    reasonStuck:
      "[festgefahren bei wiederholtem Tool-Aufruf ‚Ä?erkl√§re, was versucht wurde und was den Fortschritt blockiert]",
    labelAborted: "Vom Benutzer abgebrochen",
    labelContextGuard: "Context-Guard ausgel√∂st (Prompt > 80 % des Fensters)",
    labelStuck: "Festgefahren (wiederholter Tool-Aufruf durch Storm-Breaker unterdr√ºckt)",
  },
  handlers: {
    ...EN.handlers,
    basic: {
      ...EN.handlers.basic,
      newInfo:
        "‚ñ?neues Gespr√§ch ‚Ä?{count} Nachricht(en) aus dem Kontext entfernt. Gleiche Sitzung, frische Grundlage.",
      newInfoArchived:
        '‚ñ?neues Gespr√§ch ‚Ä?{count} Nachricht(en) aus dem Kontext entfernt. Vorheriges Transkript als "{archived}" archiviert (sichtbar unter Sitzungen).',
      newInfoSystemReloaded:
        " ¬∑ DEEPMICODE.md / Projekt-Memory neu geladen (n√§chster Turn zahlt einen Cache-Fehler)",
      helpTitle: "Befehle:",
      helpShellTitle: "Shell-K√ºrzel:",
      helpShell: "  !<befehl>                 <befehl> im Sandbox-Root ausf√ºhren; Ausgabe kommt",
      helpShellDetail:
        "                             in die Konversation, sodass das Modell sie im n√§chsten Turn sieht.",
      helpShellConsent:
        "                             Kein Allowlist-Gate ‚Ä?vom Benutzer getippt = explizite Zustimmung.",
      helpShellExample: "                             Beispiel: !git status   !ls src/   !npm test",
      helpShellGateTitle: "Vom Modell aufgerufene Shell-Befehle (pro Aufruf Genehmigung):",
      helpShellGate:
        "  ‚Üë‚Üì + ‚è?                  jeder Aufruf zeigt eine Eingabeaufforderung mit \u00bbEinmal erlauben\u00ab / \u00bbImmer erlauben\u00ab",
      helpShellGateDetail:
        "                             / \u00bbAblehnen\u00ab. W\u00e4hle \u00bbImmer erlauben\u00ab, um diesen genauen",
      helpShellGatePolicy:
        "                             Befehlspr√§fix f√ºr dieses Projekt auf die Whitelist zu setzen. Kein globales Allow-All-Flag.",
      helpMemoryTitle: "Kurzzeit-Memory:",
      helpMemoryPin:
        "  #<notiz>                  <notiz> an <projekt>/DEEPMICODE.md anh√§ngen (commitierbar).",
      helpMemoryPinEx:
        "                             Beispiel: #findByEmail muss case-insensitive sein",
      helpMemoryGlobal:
        "  #g <notiz>                <notiz> an ~/.deepmicode/DEEPMICODE.md anh√§ngen (global, niemals committed).",
      helpMemoryGlobalEx:
        "                             Beispiel: #g immer pnpm, nicht npm verwenden",
      helpMemoryPinBoth:
        "                             Beide werden in jedes zuk√ºnftige Sitzungs-Pr√§fix eingef√ºgt. Schneller als /memory.",
      helpMemoryEscape:
        "                             Verwende `\\#text`, um ein literales `#text` an das Modell zu senden.",
      helpFileTitle: "Dateiverweise (Code-Modus):",
      helpFile:
        "  @pfad/zu/datei            Dateiinhalt unter [Referenzierte Dateien] beim Senden einf√ºgen.",
      helpFilePicker:
        "                             Tippe `@`, um die Auswahl zu √∂ffnen (‚Üë‚Üì navigieren, Tab/Enter ausw√§hlen).",
      helpUrlTitle: "URL-Verweise:",
      helpUrl:
        "  @https://example.com     URL abrufen, HTML entfernen, unter [Referenzierte URLs] einf√ºgen.",
      helpUrlCache:
        "                             Gleiche URL zweimal in einer Sitzung wird nur einmal abgerufen (In-Mem-Cache).",
      helpUrlPunct:
        "                             Abschluss-Satzzeichen (./,/)) werden automatisch entfernt.",
      helpSessionsTitle: "Sitzungen (standardm√§√üig aktiviert, hei√üen 'default'):",
      helpSessionCustom:
        "  DeepMiCode chat --session <name>   eine andere benannte Sitzung verwenden",
      helpSessionNone: "  DeepMiCode chat --no-session       Persistenz f√ºr diesen Lauf deaktivieren",
      retryNone: "Nichts zu wiederholen ‚Ä?keine vorherige Benutzernachricht im Log dieser Sitzung.",
      retryInfo: '‚ñ?wiederhole: "{preview}"',
      loopTuiOnly: "/loop ist nur in der interaktiven TUI verf√ºgbar (nicht in run/replay).",
      loopStopped: "‚ñ?Loop gestoppt.",
      loopNoActive: "Kein aktiver Loop zum Stoppen.",
      loopNoActiveHint:
        "Kein aktiver Loop. Starte einen mit `/loop <intervall> <prompt>` (z.B. /loop 30s npm test).\nWird abgebrochen bei: /loop stop ¬∑ Esc ¬∑ /clear /new ¬∑ jeder benutzereingegebene Prompt.",
      loopStarted:
        '‚ñ?Loop gestartet ‚Ä?¬ª{prompt}" wird alle {duration} erneut gesendet. Tippe etwas (oder /loop stop) zum Abbrechen.',
      keysNeedsTui: "/keys ben√∂tigt einen TUI-Kontext (postKeys angeschlossen).",
      aboutHeader: "DeepMiCode v{version} ‚Ä?ein Cache-First-DeepSeek-Coding-Agent",
      aboutWebsiteLabel: "Webseite",
      aboutRepoLabel: "GitHub ",
      aboutLicenseLabel: "Lizenz",
      unknownCommand: "Unbekannter Befehl: /{cmd} ‚Ä?meintest du {list}?",
      unknownCommandShort: "Unbekannter Befehl: /{cmd}  (siehe /help)",
    },
    sessions: {
      ...EN.handlers.sessions,
      titleUnavailable: "/title ist nur in einer aktiven persistierten TUI-Sitzung verf√ºgbar.",
      titleStarted: "‚ñ?benenne Sitzung...",
      titleFailed: "‚ñ?Sitzungstitel fehlgeschlagen: {reason}",
    },
    qq: {
      ...EN.handlers.qq,
      unavailable: "/qq ist in dieser Sitzung nicht verf√ºgbar.",
      connecting: "QQ: verbinde...",
      connectFailed: "QQ-Verbindung fehlgeschlagen: {reason}",
      disconnecting: "QQ: trenne...",
      disconnectFailed: "QQ-Trennung fehlgeschlagen: {reason}",
      usage: "Verwendung: /qq connect [appId appSecret [sandbox]] | /qq status | /qq disconnect",
      promptAppId:
        "QQ-Setup: gib deine QQ-Open-Platform-App-ID ein, dann Enter. Tippe /cancel zum Abbrechen.",
      promptAppSecret:
        "QQ-Setup: gib dein QQ-Open-Platform-App-Secret ein, dann Enter. Tippe /cancel zum Abbrechen.",
      setupWaitingAppId: "Warte auf App-ID",
      setupWaitingAppSecret: "Warte auf App-Secret",
      setupCancelled: "QQ-Setup abgebrochen.",
      credentialsRequired: "QQ-App-ID und App-Secret sind erforderlich.",
      connected:
        "QQ im {mode}-Modus verbunden. Es wird bei zuk√ºnftigen Starts automatisch gestartet.",
      alreadyConnected: "QQ ist bereits im {mode}-Modus verbunden. Autostart ist aktiviert.",
      disconnected: "QQ getrennt. Autostart ist deaktiviert.",
      status:
        "QQ: {connected}, Autostart {enabled}, Anmeldedaten {configured}, App-ID {appId}, {sandbox}, Zugriff {access}, aktueller Modus {mode}.",
      statusSetup: "QQ: Setup l√§uft ‚Ä?{step}",
      stateConnected: "verbunden",
      stateDisconnected: "getrennt",
      stateEnabled: "aktiviert",
      stateDisabled: "deaktiviert",
      stateConfigured: "konfiguriert",
      stateNotConfigured: "Nicht konfiguriert",
      sandbox: "Sandbox",
      production: "Produktion",
      none: "keine",
      modeChat: "Chat",
      modeCode: "Code",
      accessOwner: "Besitzer {owner}",
      accessOwnerWithAllowlist: "Besitzer {owner}, Allowlist {count}",
      accessAllowlist: "Allowlist {count}",
      accessRuntime: "Erstabsender (nur zur Laufzeit, {owner})",
      accessOpen: "Offen (ungebunden)",
      lockAlreadyRunning:
        "QQ-Kanal l√§uft bereits in Prozess {pid}. Stoppe diesen Prozess, bevor du einen weiteren QQ-Kanal startest.",
      unauthorizedMessage:
        "QQ hat Nachricht von nicht autorisierter OpenID {openid} ignoriert. Aktueller Zugriff: {access}.",
      runtimeBound:
        "QQ hat diesen Lauf vor√ºbergehend an den Erstabsender {openid} gebunden. Setze `qq.ownerOpenId` in der Konfiguration, um den Zugriff dauerhaft zu machen.",
      missingAppId: "QQ-App-ID erforderlich. F√ºhre `/qq connect` zum Konfigurieren aus.",
      missingAppSecret: "QQ-App-Secret erforderlich. F√ºhre `/qq connect` zum Konfigurieren aus.",
      authFailed:
        "QQ-Bot-Authentifizierung fehlgeschlagen ‚Ä?√ºberpr√ºfe deine App-ID und dein App-Secret.",
      readyTimeout:
        "QQ-Bot hat READY nicht innerhalb von 15s erhalten ‚Ä?√ºberpr√ºfe deine App-ID und dein App-Secret.",
    },
    admin: {
      ...EN.handlers.admin,
      doctorNeedsTui: "/doctor ben√∂tigt einen TUI-Kontext (postDoctor angeschlossen).",
      doctorRunning: "‚ö?Doctor ‚Ä?f√ºhre Gesundheitschecks aus...",
      hooksReloadUnavailable:
        "/hooks reload ist in diesem Kontext nicht verf√ºgbar (kein Reload-Callback angeschlossen).",
      hooksReloaded: "‚ñ?Hooks neu geladen ¬∑ {count} aktiv",
      hooksUsage:
        "Verwendung: /hooks            aktive Hooks auflisten\n       /hooks reload     settings.json-Dateien neu lesen",
      hooksNone: "Keine Hooks konfiguriert.",
      hooksDropHint:
        "Lege eine settings.json mit einem `hooks`-Schl√ºssel in einem der folgenden Pfade ab:",
      hooksProject: "  ¬∑ {path} (Projekt)",
      hooksProjectFallback: "  ¬∑ <projekt>/.deepmicode/settings.json (Projekt)",
      hooksGlobal: "  ¬∑ {path} (global)",
      hooksEvents: "Ereignisse: PreToolUse, PostToolUse, UserPromptSubmit, Stop",
      hooksExitCodes: "Exit 0 = bestanden ¬∑ Exit 2 = blockieren (Pre*) ¬∑ andere = warnen",
      hooksLoaded: "‚ñ?{count} Hook(s) geladen",
      hooksSources: "Quellen: Projekt={project} ¬∑ global={global}",
      updateCurrent: "Aktuell: DeepMiCode {version}",
      updateLatestPending:
        "Neueste:  (noch nicht aufgel√∂st ‚Ä?Hintergrundpr√ºfung l√§uft oder offline)",
      updateRetryHint:
        "hat einen frischen Registry-Abruf ausgel√∂st ‚Ä?versuche `/update` in ein paar Sekunden erneut,",
      updateRetryHint2:
        "oder f√ºhre `DeepMiCode update` in einem anderen Terminal aus, um es synchron zu erzwingen.",
      updateLatest: "Neueste:  DeepMiCode {version}",
      updateUpToDate: "Du bist auf dem neuesten Stand. Nichts zu tun.",
      updateNpxHint:
        "Du verwendest npx ‚Ä?der n√§chste `npx DeepMiCode ...`-Start l√§dt automatisch die neueste Version.",
      updateNpxForce: "Um fr√ºher zu aktualisieren: `npm cache clean --force`.",
      updateUpgradeHint: "Zum Aktualisieren beende diese Sitzung und f√ºhre aus:",
      updateUpgradeCmd1: "  DeepMiCode update           (interaktiv, --dry-run wird unterst√ºtzt)",
      updateUpgradeCmd2: "  {command}   (direkt)",
      updateInSessionDisabled:
        "Die Installation innerhalb einer Sitzung ist bewusst deaktiviert ‚Ä?der Installationsprozess w√ºrde",
      updateInSessionDisabled2:
        "die Darstellung dieser TUI beeintr√§chtigen und Windows kann die laufende Bin√§rdatei sperren.",
      statsNoData: "Noch keine Nutzungsdaten.",
      statsEveryTurn:
        "Jeder hier ausgef√ºhrte Turn h√§ngt einen Datensatz an ‚Ä?die Turns dieser Sitzung",
      statsWillAppear: "Werden im Dashboard angezeigt, sobald du eine Nachricht sendest.",
    },
    edits: {
      ...EN.handlers.edits,
      undoCodeOnly:
        "/undo ist nur innerhalb von `DeepMiCode code` verf√ºgbar ‚Ä?der Chat-Modus wendet keine Edits an.",
      historyCodeOnly: "/history ist nur innerhalb von `DeepMiCode code` verf√ºgbar.",
      showCodeOnly: "/show ist nur innerhalb von `DeepMiCode code` verf√ºgbar.",
      applyCodeOnly:
        "/apply ist nur innerhalb von `DeepMiCode code` verf√ºgbar (hier gibt es nichts anzuwenden).",
      discardCodeOnly: "/discard ist nur innerhalb von `DeepMiCode code` verf√ºgbar.",
      planCodeOnly:
        "/plan ist nur innerhalb von `DeepMiCode code` verf√ºgbar ‚Ä?der Chat-Modus blockiert keine Tool-Schreibzugriffe.",
      planOn:
        "‚ñ?Plan-Modus EIN ‚Ä?Schreibwerkzeuge sind blockiert; das Modell MUSS `submit_plan` aufrufen, bevor etwas ausgef√ºhrt wird. (Das Modell kann auch eigenst√§ndig submit_plan f√ºr gro√üe Aufgaben aufrufen, selbst wenn der Plan-Modus aus ist ‚Ä?dieser Schalter ist die strengere, explizite Einschr√§nkung.) Tippe /plan off zum Verlassen.",
      planOff:
        "‚ñ?Plan-Modus AUS ‚Ä?Schreibwerkzeuge sind wieder aktiv. Modelle k√∂nnen weiterhin eigenst√§ndig Pl√§ne f√ºr gro√üe Aufgaben vorschlagen.",
      modeCodeOnly: "/mode ist nur innerhalb von `DeepMiCode code` verf√ºgbar.",
      modeUsage: "Verwendung: /mode <review|auto|yolo>   (Shift+Tab schaltet auch um)",
      modeYolo:
        "‚ñ?Edit-Modus: YOLO ‚Ä?Edits UND Shell-Befehle auto-ausf√ºhren ohne Nachfrage. /undo macht Edits immer noch r√ºckg√§ngig. Vorsicht.",
      modeAuto:
        "‚ñ?Edit-Modus: AUTO ‚Ä?Edits werden sofort angewandt; dr√ºcke u innerhalb von 5s zum R√ºckg√§ngigmachen, oder /undo sp√§ter. Shell-Befehle fragen weiterhin.",
      modeReview: "‚ñ?Edit-Modus: review ‚Ä?Edits warten auf /apply (oder y) / /discard (oder n)",
      commitCodeOnly:
        "/commit ist nur innerhalb von `DeepMiCode code` verf√ºgbar (ben√∂tigt ein Git-Repo als Wurzel).",
      commitUsage:
        'Verwendung: /commit "deine Commit-Nachricht"  ‚Ä?f√ºhrt `git add -A && git commit -m "‚Ä?` in {root} aus',
      walkCodeOnly: "/walk ist nur innerhalb von `DeepMiCode code` verf√ºgbar.",
      checkpointCodeOnly:
        "/checkpoint ist nur innerhalb von `DeepMiCode code` verf√ºgbar ‚Ä?der Chat-Modus wendet keine Edits an.",
      checkpointNone:
        "Noch keine Checkpoints ‚Ä?`/checkpoint <name>` sichert jede Datei, die die Sitzung ber√ºhrt hat. Sp√§ter mit `/restore <name>` wiederherstellbar.",
      checkpointHeader: "‚ó?Checkpoints ¬∑ {count} gespeichert",
      checkpointRestoreHint:
        "  /restore <name|id> ¬∑ /checkpoint forget <id> ¬∑ /checkpoint <name> zum Hinzuf√ºgen",
      checkpointForgetUsage: "Verwendung: /checkpoint forget <id|name>",
      checkpointNoMatch: '‚ñ?kein Checkpoint gefunden f√ºr "{name}" ‚Ä?siehe /checkpoint list',
      checkpointDeleted: "‚ñ?Checkpoint {id} gel√∂scht ({name})",
      checkpointDeleteFailed: "‚ñ?Konnte {id} nicht l√∂schen (bereits entfernt?)",
      checkpointSaveUsage:
        "Verwendung: /checkpoint <name>   (oder /checkpoint list zum Anzeigen vorhandener)",
      checkpointSavedEmpty:
        '‚ñ?Checkpoint "{name}" gespeichert ({id}) ‚Ä?aber es wurden noch keine Dateien ber√ºhrt, daher ist es eine leere Basislinie. Nach diesem Punkt vorgenommene Edits k√∂nnen r√ºckg√§ngig gemacht werden.',
      checkpointSaved:
        '‚ñ?Checkpoint "{name}" gespeichert ({id}) ‚Ä?{files} Datei(en), {size} KB. Wiederherstellen: /restore {name}',
      restoreCodeOnly: "/restore ist nur innerhalb von `DeepMiCode code` verf√ºgbar.",
      restoreUsage: "Verwendung: /restore <name|id>   (siehe /checkpoint list f√ºr IDs)",
      restoreNoMatch: '‚ñ?kein Checkpoint gefunden f√ºr "{target}" ‚Ä?versuche /checkpoint list',
      restoreInfo: '‚ñ?"{name}" ({id}) wiederhergestellt von {when}',
      restoreWrote: "  ¬∑ {count} Datei(en) zur√ºckgeschrieben",
      restoreRemoved: "  ¬∑ {count} Datei(en) entfernt (existierten zum Checkpoint-Zeitpunkt nicht)",
      restoreSkipped: "  ‚ú?{count} Datei(en) √ºbersprungen:",
      cwdCodeOnly: "/cwd ist nur innerhalb von `DeepMiCode code` verf√ºgbar.",
      cwdUsage:
        "Verwendung: /cwd <pfad>   (aktuelles Root: {current}). Richtet Dateisystem-/Shell-/Memory-Tools auf <pfad> neu aus.",
      cwdUsageNoCurrent: "Verwendung: /cwd <pfad>   richtet den Workspace-Root auf <pfad> neu aus.",
    },
    model: {
      ...EN.handlers.model,
      modelHint:
        "Versuche deepseek-v4-flash oder deepseek-v4-pro ‚Ä?f√ºhre /models aus, um die Live-Liste abzurufen",
      modelUsage: "Verwendung: /model <id>   ({hint})",
      modelNotInCatalog:
        "Modell ‚Ü?{id}   (‚ö?nicht im abgerufenen Katalog: {list}. Falls das falsch ist, wird der n√§chste Aufruf 400 geben ‚Ä?f√ºhre /models zum Aktualisieren aus.)",
      modelSet: "Modell ‚Ü?{id}",
      effortStatus: "Effort ‚Ü?{current}   (Auswahl: {list})",
      effortUsage:
        "Verwendung: /effort <{list}>   (high ist der sichere Standard; max ist eine DeepSeek-Erweiterung)",
      effortUsageNoMax: "Verwendung: /effort <{list}>",
      effortSet: "Effort ‚Ü?{effort}",
      budgetNoCap:
        "Kein Sitzungsbudget festgelegt ‚Ä?DeepMiCode wird weiterlaufen, bis du es stoppst. Setze eines mit: /budget <usd>   (z.B. /budget 5)",
      budgetStatus:
        "Budget: ${spent} von ${cap} ({pct}%) ¬∑ /budget off zum Entfernen, /budget <usd> zum √Ñndern",
      budgetOff: "Budget ‚Ü?aus (keine Grenze)",
      budgetUsage:
        'Verwendung: /budget <usd>   (erhalten: "{arg}" ‚Ä?muss eine positive Zahl sein, z.B. /budget 5 oder /budget 12.50)',
      budgetExhausted:
        "‚ñ?Budget ‚Ü?${cap} aber bereits ${spent} ausgegeben. Der n√§chste Turn wird verweigert ‚Ä?erh√∂he die Grenze, um fortzufahren, oder beende die Sitzung.",
      budgetSet:
        "Budget ‚Ü?${cap}  (bisher: ${spent} ¬∑ warnt bei 80 %, verweigert n√§chsten Turn bei 100 % ¬∑ /budget off zum Entfernen)",
    },
    permissions: {
      ...EN.handlers.permissions,
      mutateCodeOnly:
        "/permissions add / remove / clear sind nur innerhalb von `DeepMiCode code` verf√ºgbar ‚Ä?sie bearbeiten die projektbezogene Allowlist (`~/.deepmicode/config.json` projects[<root>].shellAllowed).",
      addUsage:
        'Verwendung: /permissions add <pr√§fix>   (mehrere Tokens OK: /permissions add "git push origin")',
      addAlready: "‚ñ?bereits erlaubt: {prefix}",
      addBuiltin:
        "‚ñ?`{prefix}` ist bereits in der Builtin-Allowlist ‚Ä?kein projektspezifischer Eintrag n√∂tig. (Builtin-Eintr√§ge sind immer aktiv.)",
      addInfo:
        "‚ñ?hinzugef√ºgt: {prefix}\n  ‚Ü?n√§chste `{prefix}`-Ausf√ºhrung erfolgt ohne Nachfrage in diesem Projekt.",
      removeUsage:
        "Verwendung: /permissions remove <pr√§fix-oder-index>   (z.B. /permissions remove 3, oder /permissions remove npm)",
      removeEmpty: "‚ñ?keine Projekt-Allowlist-Eintr√§ge zum Entfernen.",
      removeIndexOob: "‚ñ?Index au√üerhalb des Bereichs: {idx} (Projektliste hat {count} Eintr√§ge)",
      removeNothing: "‚ñ?nichts zu entfernen.",
      removeBuiltin:
        "‚ñ?`{prefix}` ist in der Builtin-Allowlist (schreibgesch√ºtzt). Builtin-Eintr√§ge k√∂nnen zur Laufzeit nicht entfernt werden ‚Ä?sie sind in die Bin√§rdatei eingebrannt.",
      removeInfo: "‚ñ?entfernt: {prefix}",
      removeNotFound:
        "‚ñ?kein solcher Projekt-Eintrag: {prefix}   (versuche /permissions list, um zu sehen, was gespeichert ist)",
      clearAlready: "‚ñ?Projekt-Allowlist ist bereits leer.",
      clearConfirm:
        "Es werden {count} Projekt-Allowlist-Eintr√§g(e) f√ºr {root} gel√∂scht. F√ºhre den Befehl mit dem Wort 'confirm' erneut aus: /permissions clear confirm",
      clearedNone: "‚ñ?Projekt-Allowlist war bereits leer ‚Ä?nichts ge√§ndert.",
      cleared: "‚ñ?{count} Projekt-Allowlist-Eintr√§g(e) gel√∂scht.",
      usage:
        'Verwendung: /permissions [list]                   aktuellen Status anzeigen\n       /permissions add <pr√§fix>            speichern (z.B. "npm run build")\n       /permissions remove <pr√§fix-oder-N>    Eintrag entfernen\n       /permissions clear confirm           alle Projekteintr√§ge l√∂schen',
      modeYolo:
        "‚ñ?Edit-Modus: YOLO  ‚Ä?jeder Shell-Befehl l√§uft automatisch, Allowlist wird umgangen. /mode review zum Reaktivieren der Nachfragen.",
      modeAuto:
        "‚ñ?Edit-Modus: auto  ‚Ä?Edits auto-anwenden, Shell weiterhin durch Allowlist gesch√ºtzt (oder ShellConfirm-Nachfrage bei nicht-allowlisteten).",
      modeReview:
        "‚ñ?Edit-Modus: review ‚Ä?sowohl Edits als auch nicht-allowlistete Shell-Befehle fragen vor der Ausf√ºhrung.",
      projectHeader: "Projekt-Allowlist ({count}) ‚Ä?{root}",
      projectNone1:
        '  (keine ‚Ä?w√§hle ¬ªimmer erlauben" in einer ShellConfirm-Eingabeaufforderung, um einen hinzuzuf√ºgen,',
      projectNone2: "   oder `/permissions add <pr√§fix>` direkt.)",
      projectNoRoot:
        "Projekt-Allowlist ‚Ä?(kein Projekt-Root; Chat-Modus zeigt nur Builtin-Eintr√§ge)",
      builtinHeader: "Builtin-Allowlist ({count}) ‚Ä?schreibgesch√ºtzt, fest eincompiliert",
      subcommands:
        "Unterbefehle: /permissions add <pr√§fix> ¬∑ /permissions remove <pr√§fix-oder-N> ¬∑ /permissions clear confirm",
    },
    dashboard: {
      ...EN.handlers.dashboard,
      notAvailable:
        "/dashboard ist in diesem Kontext nicht verf√ºgbar (kein startDashboard-Callback angeschlossen).",
      stopNoCallback: "/dashboard stop: kein Stop-Callback angeschlossen.",
      notRunning: "‚ñ?Dashboard l√§uft nicht.",
      stopping: "‚ñ?Dashboard wird gestoppt...",
      alreadyRunning: "‚ñ?Dashboard l√§uft bereits:",
      alreadyRunningHint:
        "√ñffne es in einem beliebigen Browser. Tippe `/dashboard stop` zum Herunterfahren.",
      ready: "‚ñ?Dashboard bereit:",
      readyHint: "127.0.0.1 only ¬∑ token-gesichert. Tippe `/dashboard stop` zum Herunterfahren.",
      failed: "‚ñ?Dashboard konnte nicht gestartet werden: {reason}",
      starting: "‚ñ?starte Dashboard-Server...",
      copied: "‚ñ?Dashboard-URL in Zwischenablage kopiert: {url}",
      tokenResetting: "‚ñ?rotiere Dashboard-Token ‚Ä?starte Server neu...",
      tokenReset: "‚ñ?Dashboard-Token rotiert. Neue URL:",
    },
    observability: {
      ...EN.handlers.observability,
      contextInfo:
        "Kontext: ~{total} von {max} ({pct}%) ¬∑ System {sys} ¬∑ Tools {tools} ¬∑ Log {log}",
      compactStarting: "‚ñ?falte √§ltere Turns in eine Zusammenfassung...",
      compactNoop:
        "‚ñ?nichts zu falten ‚Ä?Log bereits klein oder aktuelle Turns allein √ºberschreiten das Budget.",
      compactDone:
        "‚ñ?{before} Nachrichten ‚Ü?{after} gefaltet (Zusammenfassung {chars} Zeichen). Fahre fort.",
      compactFailed: "‚ñ?Falten fehlgeschlagen: {reason}",
      costNoTurn:
        "Noch kein Turn ‚Ä?`/cost` zeigt die Token- und Kostenaufschl√ºsselung des letzten Turns.",
      costNeedsTui: "/cost ben√∂tigt einen TUI-Kontext (postUsage angeschlossen).",
      costNoPricing:
        '‚ñ?/cost: keine Preistabelle f√ºr Modell "{model}". F√ºge eine in telemetry/stats.ts hinzu.',
      costEstimate:
        "‚ñ?/cost Sch√§tzung ¬∑ {model} ¬∑ {prompt} Prompt-Tokens (sys {sys} + tools {tools} + log {log} + msg {msg})",
      costWorstCase:
        "  schlimmster Fall (vollst√§ndiger Fehlschlag): {input} Eingabe + ~{output} Ausgabe ({avg} √ò) ‚â?{total}",
      costLikely:
        "  wahrscheinlich ({pct}% Session-Cache-Treffer): {input} Eingabe + ~{output} Ausgabe ‚â?{total}",
      costLikelyCold:
        "  wahrscheinlich: entspricht worst case bis der Cache gef√ºllt ist (noch keine abgeschlossenen Turns)",
      statusModel: "  Modell   {model}",
      statusFlags: "  Flags   stream={stream} ¬∑ effort={effort}",
      statusCtx: "  Kontext     {bar} {used}/{max} ({pct}%)",
      statusCtxNone: "  Kontext     noch keine Turns",
      statusCost: "  Kosten    ${cost} ¬∑ Cache {bar} {pct}% ¬∑ Turns {turns}",
      statusCostCold: "  Kosten    ${cost} ¬∑ Turns {turns} (Cache w√§rmt sich auf)",
      statusBudget: "  Budget  ${spent} / ${cap} ({pct}%){tag}",
      statusSession: '  Sitzung "{name}" ¬∑ {count} Nachrichten im Log (fortgesetzt {resumed})',
      statusSessionEphemeral: "  Sitzung (ephemer ‚Ä?keine Persistenz)",
      statusWorkspace:
        "  Arbeitsbereich {path} ¬∑ beim Start festgelegt (mit --dir <pfad> neu starten zum Wechseln)",
      statusMcp: "  MCP     {servers} Server, {tools} Tools im Register",
      statusEdits: "  Edits   {count} ausstehend (/apply zum √úbernehmen, /discard zum Verwerfen)",
      statusPlan: "  Plan    EIN ‚Ä?Schreibzugriffe blockiert (submit_plan + Genehmigung)",
      statusLifecycle: "  Lebenszyklus {mode}/{state} ¬∑ {progress}{evidence}",
      lifecycleNoPlan: "Kein Plan",
      lifecycleEvidencePending: "Nachweis ausstehend",
      lifecycleRejected: "Lebenszyklus: {tool} blockiert in {state} ‚Ä?n√§chster: {next}",
      lifecycleEvidenceRejected:
        "Lebenszyklus: Schritt {stepId} ben√∂tigt Nachweis ‚Ä?n√§chster: {next}",
      lifecycleRepeatedRejected:
        "Lebenszyklus: wiederholte {tool}-Ablehnung ‚Ä?wiederhole nicht identische Argumente",
      statusModeYolo:
        "  Modus    YOLO ‚Ä?Edits + Shell auto-ausf√ºhren ohne Nachfrage (/undo macht immer noch r√ºckg√§ngig ¬∑ Shift+Tab zum Umschalten)",
      statusModeAuto:
        "  Modus    AUTO ‚Ä?Edits werden sofort angewandt (u zum R√ºckg√§ngigmachen innerhalb von 5s ¬∑ Shift+Tab zum Umschalten)",
      statusModeReview:
        "  Modus    review ‚Ä?Edits warten auf /apply oder y (Shift+Tab zum Umschalten)",
      statusDash: "  Dash    {url} (im Browser √∂ffnen ¬∑ /dashboard stop)",
    },
    plans: {
      ...EN.handlers.plans,
      noSession:
        "Keine Sitzung angeh√§ngt ‚Ä?`/plans` ist pro Sitzung. F√ºhre `DeepMiCode code` in einem Projekt aus, um eine Sitzung zu erhalten.",
      activePlan:
        "‚ñ?aktiver Plan{label} ‚Ä?{done}/{total} Schritt(e) erledigt ¬∑ zuletzt bearbeitet {when}",
      activeNone: "‚ñ?aktiver Plan: (keiner)",
      noArchives:
        "Noch keine archivierten Pl√§ne f√ºr diese Sitzung ‚Ä?sie werden automatisch archiviert, wenn alle Schritte erledigt sind",
      archivedHeader: "Archiviert ({count}):",
      evidencePending:
        "  ! Nachweis ausstehend ‚Ä?aktueller Schritt ben√∂tigt Verifikation/Diff/Checkpoint/manuellen Nachweis",
      evidenceLine: "  Nachweis {stepId}: {summary}",
      archivedEvidenceLine: "    Nachweis: {summary}",
      replayNoSession:
        "Keine Sitzung angeh√§ngt ‚Ä?`/replay` ist pro Sitzung. F√ºhre `DeepMiCode code` in einem Projekt aus, um eine Sitzung zu erhalten.",
      replayNoArchives:
        "Noch keine archivierten Pl√§ne f√ºr diese Sitzung ‚Ä?`/replay` wird aktiv, sobald ein Plan abgeschlossen ist (auto-archiviert wenn alle Schritte erledigt).",
      replayInvalidIndex:
        "Ung√ºltiger Index ‚Ä?`/replay` akzeptiert 1..{max} (neuester = 1). Verwende `/plans`, um die Liste zu sehen.",
      archivedRow: "  ‚ú?{when}  {total} Schritt(e) ¬∑ {completion}  {label}",
      completionComplete: "abgeschlossen",
      stopAborted:
        "‚ñ?Plan gestoppt ‚Ä?Modell abgebrochen; tippe eine Folgenachricht, um fortzufahren oder eine neue Aufgabe zu starten.",
      doneUsage:
        "Verwendung: /plans done <stepId>  ¬∑  /plans done all ‚Ä?manuelle √úberschreibung, wenn das Modell vergessen hat, mark_step_complete aufzurufen",
      doneUnavailable: "/plans done ist nur innerhalb einer aktiven Sitzung verf√ºgbar.",
      doneNoPlan: "Kein aktiver Plan ‚Ä?nichts als erledigt zu markieren.",
      doneNotInPlan:
        "Schritt `{id}` ist nicht im aktiven Plan. F√ºhre /plans aus, um die Schritt-IDs zu sehen.",
      doneAlready: "Schritt `{id}` wurde bereits als erledigt markiert.",
      doneOk: "‚ñ?Schritt `{id}` als erledigt markiert.",
      doneAllNoop: "Jeder Schritt ist bereits erledigt.",
      doneAllOk: "‚ñ?{count} Schritt(e) als erledigt markiert.",
    },
    jobs: {
      ...EN.handlers.jobs,
      codeOnly: "/jobs ist nur innerhalb von `DeepMiCode code` verf√ºgbar.",
      killCodeOnly: "/kill ist nur innerhalb von `DeepMiCode code` verf√ºgbar.",
      logsCodeOnly: "/logs ist nur innerhalb von `DeepMiCode code` verf√ºgbar.",
      empty:
        "‚ó?Jobs ¬∑ 0 laufend ¬∑ 0 gesamt\n  (run_background startet einen ‚Ä?Dev-Server, Watcher, langlebige Skripte)",
      header: "‚ó?Jobs ¬∑ {running} laufend ¬∑ {total} gesamt",
      footer: "  /logs <id> tail ¬∑ /kill <id> SIGTERM ‚Ü?SIGKILL",
      killUsage: "Verwendung: /kill <id>   (siehe /jobs f√ºr IDs)",
      killNotFound: "Job {id}: nicht gefunden",
      killAlreadyExited: "Job {id} bereits beendet ({code})",
      killStopping:
        "‚ñ?stoppe Job {id} (Prozessbaum: SIGTERM ‚Ü?SIGKILL nach 2s Gnadenfrist; Windows: taskkill /T /F)",
      killStatus: "‚ñ?Job {id} {status}",
      killStillAlive: "Nach SIGKILL noch am Leben (!) ‚Ä?melde dies als Fehler",
      logsUsage: "Verwendung: /logs <id> [zeilen]   (Standard letzte 80 Zeilen)",
      logsNotFound: "Job {id}: nicht gefunden",
      logsStatus: "[Job {id} ¬∑ {status}]\n$ {command}",
      logsRunning: "L√§uft ¬∑ PID {pid}",
      logsExited: "Beendet {code}",
      logsFailed: "Fehlgeschlagen ({reason})",
      logsStopped: "gestoppt",
    },
    memory: {
      ...EN.handlers.memory,
      disabled:
        "Memory ist deaktiviert (DEEPMICODE_MEMORY=off in der Umgebung). Entferne die Variable zur Reaktivierung ‚Ä?es werden weder DEEPMICODE.md noch ~/.deepmicode/memory-Inhalte eingef√ºgt.",
      noRoot:
        "Kein Arbeitsverzeichnis in dieser Sitzung ‚Ä?`/memory` ben√∂tigt ein Root, um DEEPMICODE.md aufzul√∂sen. (L√§uft in einer Test-Umgebung?)",
      listEmpty:
        "Noch keine Benutzer-Memories. Das Modell kann `remember` aufrufen, um einen zu speichern, oder du kannst Dateien manuell in ~/.deepmicode/memory/global/ oder dem projektspezifischen Unterverzeichnis erstellen.",
      listHeader: "Benutzer-Memories ({count}):",
      listFooter: "Body anzeigen: /memory show <name>   L√∂schen: /memory forget <name>",
      showUsage: "Verwendung: /memory show <name>  oder  /memory show <scope>/<name>",
      showNotFound: "Kein Memory gefunden: {target}",
      showFailed: "Anzeige fehlgeschlagen: {reason}",
      forgetUsage: "Verwendung: /memory forget <name>  oder  /memory forget <scope>/<name>",
      forgetNotFound: "Kein Memory gefunden: {target}",
      forgetInfo:
        "‚ñ?{scope}/{name} entfernt. N√§chstes /new oder der n√§chste Start wird es nicht mehr sehen.",
      forgetFailed: "Konnte {scope}/{name} nicht entfernen (bereits weg?)",
      forgetError: "Entfernen fehlgeschlagen: {reason}",
      clearUsage: "Verwendung: /memory clear <global|project> confirm",
      clearConfirm:
        "Alle Memories im Bereich {scope} werden gel√∂scht. F√ºhre den Befehl mit dem Wort 'confirm' erneut aus: /memory clear {scope} confirm",
      cleared: "‚ñ?Bereich {scope} geleert ‚Ä?{count} Memory-Datei(en) gel√∂scht.",
      noMemory: "Kein Memory in {root} eingef√ºgt.",
      layers: "Drei Ebenen sind verf√ºgbar:",
      layerProject: "  1. {file} ‚Ä?commitierbares Team-Memory (im Repo).",
      layerGlobal: "  2. ~/.deepmicode/memory/global/ ‚Ä?dein projekt√ºbergreifendes privates Memory.",
      layerProjectHash:
        "  3. ~/.deepmicode/memory/<projekt-hash>/ ‚Ä?privates Memory dieses Projekts.",
      askModel: "Bitte das Modell, etwas zu `remember`, oder bearbeite die Dateien direkt.",
      changesNote:
        "√Ñnderungen werden beim n√§chsten /new oder Start wirksam ‚Ä?der System-Prompt wird einmal pro Sitzung gehasht, um den Prefix-Cache warm zu halten.",
      subcommands:
        "Unterbefehle: /memory list | /memory show <name> | /memory forget <name> | /memory clear <scope> confirm",
      changesNoteShort:
        "√Ñnderungen werden beim n√§chsten /new oder Start wirksam. Unterbefehle: /memory list | show | forget | clear",
    },
    mcp: {
      ...EN.handlers.mcp,
      noServers:
        'Keine MCP-Server angeh√§ngt. F√ºhre `DeepMiCode setup` aus, um welche auszuw√§hlen, oder starte mit --mcp "<spec>". `DeepMiCode mcp list` zeigt den Katalog. Hinweis: vom Modell aufgerufene Shell-Befehle werden pro Aufruf abgefragt (einmal erlauben / immer erlauben / ablehnen) ‚Ä?kein globales Allow-All-Flag.',
      toolsLabel: "  Tools     {count}",
      resourcesHint: "`/resource` zum Durchsuchen+Lesen",
      promptsHint: "`/prompt` zum Durchsuchen+Abrufen",
      awarenessOnly:
        "Der Chat-Modus verbraucht Tools aktuell; Ressourcen+Prompts werden hier zur Information angezeigt.",
      catalogHint:
        "Vollst√§ndiger Katalog: `DeepMiCode mcp list` ¬∑ tiefere Diagnose: `DeepMiCode mcp inspect <spec>`.",
      fallbackServers: "MCP-Server ({count}):",
      fallbackTools: "Tools im Register ({count}):",
      fallbackChange: "Um diesen Satz zu √§ndern, beende und f√ºhre `DeepMiCode setup` aus.",
      usageDisableEnable:
        "Verwendung: /mcp {action} <name>  ¬∑  w√§hle einen in /mcp angezeigten Namen (anonyme Server k√∂nnen nicht nach Namen umgeschaltet werden).",
      usageReconnect:
        "Verwendung: /mcp reconnect <name>  ¬∑  w√§hle einen in /mcp angezeigten Namen.",
      unknownServer: 'Unbekannter MCP-Server "{name}". Bekannt: {list}.',
      noneList: "(keine)",
      reconnectNoTui: "/mcp reconnect ben√∂tigt die interaktive TUI (postInfo nicht angeschlossen).",
      liveTab: "Live",
      marketplaceTab: "Marktplatz",
      tabHint: "Tab zum Umschalten",
    },
    init: {
      ...EN.handlers.init,
      codeOnly:
        "/init funktioniert nur im Code-Modus (es ben√∂tigt Dateisystem-Werkzeuge).\nF√ºhre `DeepMiCode code [pfad]` aus, um eine Sitzung zu starten, die im\nProjekt verwurzelt ist, das du initialisieren m√∂chtest, und f√ºhre dann /init aus.",
      exists: "‚ñ?DEEPMICODE.md existiert bereits unter {path}",
      existsForce: "  /init force   von Grund auf neu generieren (√ºberschreibt)",
      existsEdit: "  Oder bearbeite es von Hand ‚Ä?es ist nur Markdown. Die aktuelle Datei wird",
      existsPinned: "  bei jedem Start unver√§ndert in den System-Prompt eingef√ºgt.",
      info: "‚ñ?/init ‚Ä?Modell scannt das Projekt und synthetisiert DEEPMICODE.md.\n  Das Ergebnis landet als ausstehender Edit; mit /apply oder /walk reviewen.",
    },
    webSearchEngine: {
      ...EN.handlers.webSearchEngine,
      currentEngine: "Aktuelle Websuchmaschine: {engine}",
      endpoint: "SearXNG-Endpunkt: {url}",
      usageHeader: "Verwendung:",
      usageBing:
        "  /search-engine bing              Bing verwenden (Standard, funktioniert von CN ohne Proxy)",
      usageSearxng: "  /search-engine searxng            SearXNG verwenden (Standard-Endpunkt)",
      usageSearxngUrl:
        "  /search-engine searxng <url>      SearXNG mit benutzerdefiniertem Endpunkt",
      usageMetaso:
        "  /search-engine metaso              Metaso-API verwenden (100/Tag kostenlos, konfiguriere eigenen API-Schl√ºssel f√ºr mehr)",
      usageTavily:
        "  /search-engine tavily              Tavily-API verwenden (LLM-freundlich, kostenlos 1000/Monat ‚Ä?setze TAVILY_API_KEY oder tavilyApiKey in der Konfiguration; erhalte einen unter https://tavily.com)",
      usagePerplexity:
        "  /search-engine perplexity          Perplexity AI verwenden (AI-native Antwort + Quellenangaben ‚Ä?setze PERPLEXITY_API_KEY oder perplexityApiKey in der Konfiguration; erhalte einen unter https://perplexity.ai/settings/api)",
      usageExa:
        "  /search-engine exa                 Exa-API verwenden (AI-native Antwort + Quellenangaben, kostenlos 1000/Monat ‚Ä?setze EXA_API_KEY oder exaApiKey in der Konfiguration; registriere dich unter https://exa.ai)",
      usageBrave:
        "  /search-engine brave               Brave Search API nutzen (unabh√§ngiger Index, kostenlos 2000/Monat ‚Ä?setze BRAVE_SEARCH_API_KEY oder braveApiKey in der Konfiguration; Schl√ºssel unter https://brave.com/search/api/)",
      alias: "Alias: /se",
      searxngInfo:
        "SearXNG ist eine selbst gehostete Metasuchmaschine (https://github.com/searxng/searxng).",
      searxngInstall: "Installiere mit:  docker run -d -p 8080:8080 searxng/searxng",
      switched: 'Websuchmaschine auf "{engine}" umgestellt.{note}',
      switchedSearxngNote: " Stelle sicher, dass SearXNG unter {endpoint} l√§uft.",
      switchedMetasoNote:
        " Es gibt ein t√§gliches Kontingent von 100 (konfiguriere einen eigenen API-Schl√ºssel f√ºr h√∂here Grenzen).",
      switchedTavilyNote:
        " Setze TAVILY_API_KEY oder `tavilyApiKey` in der Konfiguration; kostenlos 1000/Monat unter https://tavily.com.",
      switchedPerplexityNote:
        " Setze PERPLEXITY_API_KEY oder `perplexityApiKey` in der Konfiguration; erhalte einen unter https://perplexity.ai/settings/api.",
      switchedExaNote:
        " Setze EXA_API_KEY oder `exaApiKey` in der Konfiguration; registriere dich unter https://exa.ai.",
      switchedBraveNote:
        " Setze BRAVE_SEARCH_API_KEY (oder BRAVE_API_KEY) oder `braveApiKey` in der Konfiguration; 2000 kostenlose Zugriffe pro Monat unter https://brave.com/search/api/.",
      keyNeeded:
        'Kein API-Schl√ºssel f√ºr "{engine}" konfiguriert.\n\n  1. Setze die {envVar}-Umgebungsvariable\n  2. Oder gib ihn inline an:  /search-engine {engine} <dein-schl√ºssel>\n  3. Oder f√ºge "{engine}ApiKey" zu ~/.deepmicode/config.json hinzu\n\nWiederhole dann /search-engine {engine}.',
      keySaved: " API-Schl√ºssel in der Konfiguration gespeichert.",
      confirmed:
        'Websuchmaschine auf "{engine}" gesetzt{detail}. Der n√§chste Assistenten-Turn √ºbernimmt die √Ñnderung.',
      confirmedDetail: " ({endpoint})",
    },
    skill: {
      ...EN.handlers.skill,
      listEmpty: "Keine Skills gefunden. DeepMiCode liest Skills von:",
      listProjectScope:
        "  ¬∑ <projekt>/.deepmicode/skills/<name>/SKILL.md  (oder <name>.md)  ‚Ä?Projekt-Bereich",
      listGlobalScope:
        "  ¬∑ ~/.deepmicode/skills/<name>/SKILL.md  (oder <name>.md)  ‚Ä?globaler Bereich",
      listProjectOnly: "  (Projekt-Bereich ist nur in `DeepMiCode code` aktiv)",
      listFrontmatter: "Die Frontmatter jeder Datei ben√∂tigt mindestens `name` und `description`.",
      listInvoke:
        "F√ºhre einen Skill aus mit `/skill <name> [args]` oder indem du das Modell bittest, `run_skill` aufzurufen.",
      listHeader: "Benutzer-Skills ({count}):",
      listFooter:
        "Anzeigen: /skill show <name>   Ausf√ºhren: /skill <name> [args]   Neu: /skill new <name>",
      listEmptyNewHint:
        "Erstelle einen mit: /skill new <name>  (Projekt-Bereich) ‚Ä?es gibt noch kein entferntes Register; du erstellst Skills direkt.",
      showUsage: "Verwendung: /skill show <name>",
      showNotFound: "Kein Skill gefunden: {name}",
      runNotFound: "Kein Skill gefunden: {name}  (versuche /skill list)",
      runInfo: "‚ñ?f√ºhre Skill aus: {name}{args}",
      newUsage: "Verwendung: /skill new <name> [--global]",
      newCreated:
        "‚ñ?Skill erstellt: {name}\n  {path}\n  bearbeite ihn, dann `/skill {name}` zum Ausf√ºhren",
      newError: "‚ñ?/skill new fehlgeschlagen: {reason}",
      pathsHeader: "Skill-Pfade (Priorit√§tsreihenfolge):",
      pathsPriority:
        "Priorit√§t: Projekt > benutzerdefinierte Pfade in Konfigurationsreihenfolge > global > builtin. √Ñnderungen wirken sich auf den System-Prompt beim n√§chsten /new oder einer neuen Sitzung aus.",
      pathsUsage:
        "Verwendung: /skill paths [list]\n       /skill paths add <pfad>\n       /skill paths remove <pfad|N>",
      pathsAddUsage: "Verwendung: /skill paths add <pfad>",
      pathsRemoveUsage: "Verwendung: /skill paths remove <pfad|N>",
      pathsAdded: "‚ñ?benutzerdefinierten Skill-Pfad hinzugef√ºgt: {path}",
      pathsAlready: "‚ñ?benutzerdefinierter Skill-Pfad bereits konfiguriert: {path}",
      pathsRemoved: "‚ñ?benutzerdefinierten Skill-Pfad entfernt: {path}",
      pathsRemoveNotFound: "‚ñ?kein benutzerdefinierter Skill-Pfad entspricht: {target}",
      pathsRestartHint:
        "Der System-Prompt der aktuellen Sitzung ist unver√§ndert; f√ºhre /new aus oder starte eine neue Sitzung, um das Skills-Register zu aktualisieren.",
    },
  },
  statusBar: {
    ...EN.statusBar,
    turn: "Turn",
    cache: "Cache",
    spent: "ausgegeben",
    left: " √ºbrig",
    slow: "langsam",
    disconnect: "trennen",
    reconnecting: "Verbinde neu‚Ä?,
    approvingIn: "Genehmige in ",
    escToInterrupt: "Esc zum Unterbrechen",
    recordingGlyph: "Aufnahme",
    mb: " MB",
    evt: " Ereignis",
    editsLabel: "Edits:",
    mcpLoading: "MCP",
    ctx: "Kontext",
    shortcutsHint: "Strg+P Tastenk√ºrzel",
  },
  editMode: {
    ...EN.editMode,
    plan: "PLAN-MODUS",
    yolo: "YOLO",
    auto: "AUTO",
    review: "REVIEW",
    writesGated: "   Schreibzugriffe blockiert ¬∑ /plan off zum Verlassen",
    editsShellAuto: "Edits + Shell auto ¬∑ /undo zum R√ºckg√§ngigmachen",
    editsLandNow: "Edits werden sofort angewandt ¬∑ u zum R√ºckg√§ngigmachen",
    queuedApplyDiscard: "{count} in Warteschlange ¬∑ y anwenden ¬∑ n verwerfen",
    editsQueued: "Edits in Warteschlange ¬∑ y anwenden ¬∑ n verwerfen",
    shiftTabFlip: "   {mid} ¬∑ Shift+Tab zum Umschalten",
    queuedDots: "In Warteschlange‚Ä?,
  },
  composer: {
    ...EN.composer,
    placeholder: "Frag etwas  ¬∑  / f√ºr Befehle  ¬∑  @ f√ºr Dateien",
    waitingForResponse: "‚Ä¶warte auf Antwort‚Ä?,
    hintSend: "senden",
    hintNewline: "Neue Zeile",
    hintClear: "leeren",
    hintScroll: "scrollen",
    hintHistory: "Verlauf",
    hintAbort: "abbrechen",
    hintQuit: "beenden",
    abortedHint: "Turn vom Benutzer abgebrochen ¬∑ erneut Esc zum Leeren ¬∑ ‚è?f√ºr eine Folgefrage",
    editorNoRawMode:
      "Externer Editor nicht verf√ºgbar ‚Ä?stdin unterst√ºtzt Raw-Mode-Umschaltung auf diesem Terminal nicht",
    editorFailed: "Externer Editor:",
    editorMissing:
      "Kein $EDITOR / $VISUAL / $GIT_EDITOR gesetzt ‚Ä?exportiere einen (z.B. `export EDITOR=nano`) und versuche es erneut",
    editorExited: "Editor mit Code {code} beendet",
    typeaheadStaged: "‚ñ?{count} Zeile(n) bereitgestellt ¬∑ Esc zur√ºckrufen",
    steerPlaceholder:
      "Tippe, um die aktuelle Aufgabe zu steuern ‚Ä?Befehle sind deaktiviert, solange besch√§ftigt",
    steerHint: "Senden ‚Ä?mid-Turn eingef√ºgt",
    stashNothing: "Nichts zu speichern",
    stashSaved: "Gespeichert",
    stashRecall: "Abgerufen",
  },
  pathConfirm: {
    ...EN.pathConfirm,
    title: "Pfad au√üerhalb des Sandbox",
    subtitleRead: "{tool} m√∂chte eine Datei AUSSERHALB des Projekt-Sandbox lesen",
    subtitleWrite: "{tool} m√∂chte eine Datei AUSSERHALB des Projekt-Sandbox schreiben",
    awaiting: "wartet",
    denyTitle: "Ablehnen ‚Ä?Kontext angeben",
    optional: "optional",
    denyFooter:
      "Kontext eingeben  ¬∑  ‚è?mit Grund absenden  ¬∑  Esc √ºberspringen (ohne Grund ablehnen)",
    pickFooter: "‚Üë‚Üì ausw√§hlen  ¬∑  ‚è?best√§tigen  ¬∑  Tab Kontext hinzuf√ºgen  ¬∑  Esc abbrechen",
    allowOnce: "Einmal erlauben",
    allowOnceDesc: "Diesen Zugriff erlauben; das Verzeichnis f√ºr den Rest dieser Sitzung merken",
    allowAlways: "Immer erlauben",
    allowAlwaysDesc:
      "`{prefix}` f√ºr dieses Projekt merken (gespeichert in ~/.deepmicode/config.json)",
    deny: "ablehnen",
    denyDesc: "Tab dr√ºcken, um dem Modell den Grund mitzuteilen",
    pathLabel: "Pfad",
    sandboxLabel: "Sandbox",
    allowPrefixLabel: "Pr√§fix",
    promptTitleRead: "Pfadzugriff ‚Ä?lesen",
    promptTitleWrite: "Pfadzugriff ‚Ä?schreiben",
    actionAllowRead: "Lesen erlauben",
    actionAllowWrite: "Schreiben erlauben",
    actionAlwaysAllow: "Immer erlauben ‚Ä?{prefix}",
    actionDeny: "Ablehnen",
  },
  shellConfirm: {
    ...EN.shellConfirm,
    title: "Shell-Befehl",
    bgTitle: "Hintergrundprozess",
    subtitle: "Modell m√∂chte einen Shell-Befehl ausf√ºhren",
    bgSubtitle: "Langlebiger Prozess ‚Ä?l√§uft nach Genehmigung weiter, /kill zum Stoppen",
    denyTitle: "Ablehnen ‚Ä?Kontext angeben",
    optional: "optional",
    denyFooter:
      "Kontext eingeben  ¬∑  ‚è?mit Grund absenden  ¬∑  Esc √ºberspringen (ohne Grund ablehnen)",
    awaiting: "wartet",
    pickFooter: "‚Üë‚Üì ausw√§hlen  ¬∑  ‚è?best√§tigen  ¬∑  Tab Kontext hinzuf√ºgen  ¬∑  Esc abbrechen",
    allowOnce: "Einmal erlauben",
    allowOnceDesc: "Diesen Befehl ausf√ºhren, beim n√§chsten Mal erneut fragen",
    allowAlways: "Immer erlauben",
    allowAlwaysDesc: "`{prefix}` f√ºr dieses Projekt merken",
    deny: "ablehnen",
    denyDesc: "Tab dr√ºcken, um dem Modell den Grund mitzuteilen",
    cwdLabel: "CWD",
    timeoutLabel: "Timeout",
    waitLabel: "warten",
    previewMore: "‚Ä?{n} weitere Zeile ausgeblendet ‚Ä?Esc dr√ºcken, Modell bitten, sie aufzuteilen",
    previewMorePlural:
      "‚Ä?{n} weitere Zeilen ausgeblendet ‚Ä?Esc dr√ºcken, Modell bitten, sie aufzuteilen",
    promptTitleRunCommand: "Befehl ausf√ºhren",
    promptTitleRunBackground: "Hintergrundbefehl ausf√ºhren",
    actionRunOnce: "Einmal ausf√ºhren",
    actionAlwaysAllow: "Immer erlauben ‚Ä?{prefix}",
    actionDeny: "Ablehnen",
  },
  editConfirm: {
    ...EN.editConfirm,
    footer:
      "[y/Enter] anwenden  ¬∑  [n] mit Grund ablehnen  ¬∑  [a] Rest anwenden  ¬∑  [A] AUTO umschalten  ¬∑  [‚Üë‚Üì/Leertaste] scrollen  ¬∑  [Esc] abbrechen",
    newTag: "NEU",
    editTag: "BEARBEITET",
    linesCount: "-{removed} +{added} Zeilen",
    viewingRange: "Zeige {start}-{end}/{total}",
    denyFooter: "‚è?absenden  ¬∑  Esc √ºberspringen (ohne Grund ablehnen)",
    oldLabel: "  - alt",
    newLabel: "  + neu",
    sideBySide:
      "   nebeneinander ¬∑ entfernte Zeilen links, hinzugef√ºgte rechts ¬∑ paarweise nach Versatz",
    linesAbove: "  ‚Ü?{count} Zeile dar√ºber  (‚Ü?k oder Bild‚Ü?",
    linesAbovePlural: "  ‚Ü?{count} Zeilen dar√ºber  (‚Ü?k oder Bild‚Ü?",
    linesBelow: "  ‚Ü?{count} Zeile darunter  (‚Ü?j oder Leertaste/Bild‚Ü?",
    linesBelowPlural: "  ‚Ü?{count} Zeilen darunter  (‚Ü?j oder Leertaste/Bild‚Ü?",
  },
  editPicker: {
    ...EN.editPicker,
    title: "Vorherige Nachricht bearbeiten",
    hint: "‚Üë‚Üì ausw√§hlen ¬∑ Enter zum Laden in den Composer ¬∑ Esc abbrechen",
    empty: "Noch keine Benutzer-Turns ‚Ä?nichts zu bearbeiten",
    dismiss: "Esc zum Schlie√üen",
    forked: "‚ñ?bei Turn #{turn} abgezweigt ‚Ä?Puffer enth√§lt den Originaltext",
  },
  sessionPicker: {
    ...EN.sessionPicker,
    header: " ‚ó?DeepMiCode ¬∑ Sitzung ausw√§hlen ",
    title: "Sitzung ausw√§hlen ‚Ä?{workspace}",
    messages: "{count} Nachricht",
    messagesPlural: "{count} Nachrichten",
    turns: "{count} Turns",
    pickerHint:
      "‚Üë‚Üì ausw√§hlen ¬∑ / suchen ¬∑ ‚è?√∂ffnen ¬∑ [n] neu ¬∑ [d] l√∂schen ¬∑ [r] umbenennen ¬∑ Esc beenden",
    empty: "  Noch keine gespeicherten Sitzungen in diesem Arbeitsbereich ‚Ä?dr√ºcke ",
    emptyNew: " um eine neue zu starten",
    renamePrompt: '  "{from}" umbenennen ‚Ü?',
    renameHint: "  ‚è?Umbenennung best√§tigen  ¬∑  Esc abbrechen",
    searchPrompt: "  Sitzungen durchsuchen: /",
    searchHint: "  Tippen zum Filtern  ¬∑  ‚è?Treffer √∂ffnen  ¬∑  Esc zur√ºcksetzen",
    searchEmpty: "  Keine Sitzungen entsprechen dieser Suche",
    emptyHint: "  ‚è?neue Sitzung  ¬∑  Esc beenden",
    justNow: "Gerade eben",
    minAgo: "Vor {count} Min",
    yesterday: "gestern",
    hoursAgo: "Vor {count}h",
    daysAgo: "Vor {count} Tagen",
  },
  workspacePicker: {
    ...EN.workspacePicker,
    header: " ‚ó?DeepMiCode ¬∑ Arbeitsbereich ausw√§hlen ",
    title: "Arbeitsbereich ausw√§hlen ‚Ä?{workspace}",
    sessions: "{count} Sitzung",
    sessionsPlural: "{count} Sitzungen",
    current: "aktuell",
    pickerHint:
      "‚Üë‚Üì ausw√§hlen ¬∑ / suchen ¬∑ ‚è?wechseln + Sitzung ausw√§hlen ¬∑ Esc beenden ¬∑ /cwd <pfad> f√ºgt einen hinzu",
    empty:
      "  Noch keine bekannten Arbeitsbereiche ‚Ä?f√ºhre /cwd <pfad> einmal aus, um einen hinzuzuf√ºgen",
    searchPrompt: "  Arbeitsbereiche durchsuchen: /",
    searchHint: "  Tippen zum Filtern  ¬∑  ‚è?wechseln + Sitzung ausw√§hlen  ¬∑  Esc zur√ºcksetzen",
    searchEmpty: "  Keine Arbeitsbereiche entsprechen dieser Suche",
  },
  modelPicker: {
    ...EN.modelPicker,
    header: " ‚ó?DeepMiCode ¬∑ Einrichtung ausw√§hlen ",
    loading: "  ¬∑  lade Katalog‚Ä?,
    catalogEmpty: "  ¬∑  Katalog leer ‚Ä?verwende bekannte Fallbacks",
    modelsAvailable: "  ¬∑  {count} Modelle verf√ºgbar",
    effortHeader: "    EFFORT  ¬∑  Reasoning-Effort-Grenze",
    modelsHeader: "    MODELLE  ¬∑  DeepSeek-kompatible IDs",
    effortDesc: {
      ...EN.modelPicker.effortDesc,
      low: "Am schnellsten ‚Ä?minimales Reasoning",
      medium: "ausgewogen",
      high: "Standard ‚Ä?sicher f√ºr vLLM / Azure",
      max: "DeepSeek-Erweiterung; von stock OpenAI / vLLM abgelehnt",
    },
    pickerFooter: "  ‚Üë‚Üì ausw√§hlen  ¬∑  ‚è?best√§tigen  ¬∑  [r] aktualisieren  ¬∑  Esc abbrechen",
    currentLabel: "  ¬∑ aktuell",
  },
  slashSuggestions: {
    ...EN.slashSuggestions,
    noMatch: "Kein Slash-Befehl entspricht diesem Pr√§fix",
    backspaceHint: " ‚Ä?R√ºcktaste zum Bearbeiten, oder /help f√ºr die vollst√§ndige Liste",
    commandCount: "{count} Befehl",
    commandCountPlural: "{count} Befehle",
    aboveLabel: "   ‚Ü?{count} dar√ºber",
    belowLabel: "   ‚Ü?{count} darunter",
    advancedHint: "  + {count} erweitert  ¬∑  tippe einen Buchstaben zum Suchen",
    footerHint: "  ‚Üë‚Üì navigieren ¬∑ Tab / ‚è?ausw√§hlen ¬∑ Esc abbrechen",
    groupChat: "CHAT",
    groupSetup: "SETUP",
    groupInfo: "INFO",
    groupSession: "SITZUNG",
    groupExtend: "ERWEITERN",
    groupCode: "CODE",
    groupJobs: "JOBS",
    groupAdvanced: "ERWEITERT",
    groupDetailSetup: "Modell + Kosten",
    groupDetailInfo: "Aktueller Zustand",
    groupDetailChat: "T√§gliche Turn-Operationen",
    groupDetailExtend: "MCP, Memory, Skills",
    groupDetailSession: "Gespeicherte Sitzungen",
    groupDetailCode: "Edits + Pl√§ne (Code-Modus)",
    groupDetailJobs: "Hintergrundprozesse (Code-Modus)",
    groupDetailAdvanced: "Selten oder einmalig",
  },
  atMentions: {
    ...EN.atMentions,
    loading: "lade‚Ä?,
    entrySingular: "{count} Eintrag",
    entryPlural: "{count} Eintr√§ge",
    searching: "suche‚Ä?,
    scanned: "gescannt",
    match: "Treffer",
    matches: "Treffer",
    forFilter: 'f√ºr "{filter}"',
    noMatch: 'Keine Dateien entsprechen "{filter}"',
    emptyDir: "Leeres Verzeichnis",
    scanning: "Durchsuche Verzeichnisbaum‚Ä?,
    footerBrowse: "‚Üë‚Üì navigieren ¬∑ Tab in Ordner eintauchen ¬∑ ‚è?einf√ºgen ¬∑ Esc abbrechen",
    footerBrowseSearch: "‚Üë‚Üì navigieren ¬∑ Tab / ‚è?als @pfad einf√ºgen ¬∑ Esc abbrechen",
    footerInsert: "‚Üë‚Üì navigieren ¬∑ Tab / ‚è?als @pfad einf√ºgen ¬∑ Esc abbrechen",
  },
  statsPanel: {
    ...EN.statsPanel,
    modePlan: "PLAN",
    modeYolo: "yolo",
    modeAuto: "auto",
    modeReview: "review",
    pro: "‚á?pro",
    budget: "  Budget  ",
  },
  welcomeBanner: {
    ...EN.welcomeBanner,
    workspace: "‚ñ?Arbeitsbereich",
    relaunchHint: "  (mit --dir <pfad> neu starten zum Wechseln)",
    dashboard: "‚ñ?Web",
  },
  ctxBreakdown: {
    ...EN.ctxBreakdown,
    title: "‚ñ?Kontext",
    compactHint: "  /compact faltet (automatisch bei 50 %) ¬∑ /new l√∂scht Log",
    topTools: "  Top-Tool-Ergebnisse nach Kosten ({count}):",
    msg: "Nachr",
    turnLabel: "Turn",
  },
  startup: {
    ...EN.startup,
    codeRooted:
      '‚ñ?DeepMiCode code: verwurzelt in {rootDir}, Sitzung "{session}" ¬∑ {tools} native Tool{s}{semantic}',
    ephemeral: "(ephemer)",
    semanticOn: " ¬∑ Semantic-Search an",
  },
  doctorErrors: {
    ...EN.doctorErrors,
    unreadable: "{path} nicht lesbar ‚Ä?{message}",
    cannotList: "Kann nicht auflisten ‚Ä?{message}",
    parseFailed: "settings.json konnte nicht geparst werden ‚Ä?{message}",
    probeFailed: "Test fehlgeschlagen ‚Ä?{message}",
  },
  webErrors: {
    ...EN.webErrors,
    status:
      "web_search {status} ‚Ä?versuche: Das Such-Backend hat einen Fehler zur√ºckgegeben; formuliere die Abfrage um oder wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    rateLimit429:
      "web_search 429 ‚Ä?versuche: 10s warten vor erneuter Abfrage oder Abfrage umformulieren; das Such-Backend hat das Rate-Limit f√ºr diesen Client erreicht",
    forbidden403:
      "web_search 403 ‚Ä?versuche: Das Such-Backend blockiert diesen Client; wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama oder warte und versuche es sp√§ter erneut",
    serverError5xx:
      "web_search {status} ‚Ä?versuche: √ñffne die Such-URL in einem Browser; falls sie l√§dt, ist dies vor√ºbergehend und ein erneuter Versuch in 30s kann helfen",
    bingBlocked:
      "web_search: Bing-Anti-Bot-Seite ‚Ä?Rate-Limit erreicht oder blockiert ‚Ä?versuche: 30s warten und erneut versuchen, oder wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    bingNoResults:
      "web_search: 0 Ergebnisse, aber die Antwort sieht nicht wie eine echte leere Seite aus ({chars} Zeichen, erste 120: {preview}) ‚Ä?versuche: formuliere die Abfrage mit einfacheren Begriffen um oder wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    invalidEndpoint:
      'web_search: ung√ºltiger SearXNG-Endpunkt "{endpoint}" ‚Ä?versuche: setze eine g√ºltige URL mit /search-endpoint http://host:port',
    endpointMustBeHttp:
      "web_search: SearXNG-Endpunkt muss http(s) sein, {protocol} erhalten ‚Ä?versuche: setze eine g√ºltige URL mit /search-endpoint http://host:port",
    cannotReach:
      "web_search: SearXNG-Server unter {endpoint} nicht erreichbar ‚Ä?versuche: SearXNG installieren und starten (https://github.com/searxng/searxng, z.B. `docker run -d -p 8080:8080 searxng/searxng`), oder wechsle zu einer anderen Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    searxngNoResults:
      "web_search: 0 Ergebnisse, aber SearXNG-Antwort sieht nicht wie eine leere Ergebnisseite aus ({chars} Zeichen) ‚Ä?versuche: formuliere die Abfrage mit einfacheren Begriffen um oder wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    metasoMissingKey:
      "web_search: Metaso ben√∂tigt einen API-Schl√ºssel ‚Ä?setze METASO_API_KEY oder konfiguriere einen mit /search-engine metaso <schl√ºssel>. Erhalte einen unter https://metaso.cn/search-api/playground",
    metasoDailyLimit:
      "web_search: Metaso-Tageslimit erreicht ‚Ä?setze METASO_API_KEY oder erhalte einen Schl√ºssel unter https://metaso.cn/search-api/playground",
    metasoUnauthorized:
      "web_search: Metaso-API-Schl√ºssel abgelehnt ‚Ä?√ºberpr√ºfe METASO_API_KEY oder erhalte einen unter https://metaso.cn/search-api/playground",
    metasoRateLimit:
      "web_search: Metaso-Rate-Limit erreicht ‚Ä?warte und versuche es erneut, oder erhalte einen eigenen API-Schl√ºssel unter https://metaso.cn/search-api/playground",
    metasoServerError:
      "web_search: Metaso-Serverfehler ({status}) ‚Ä?versuche es sp√§ter erneut oder wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    metasoParseError:
      "web_search: Metaso hat unparsbare Antwort zur√ºckgegeben (HTTP {status}) ‚Ä?versuche es sp√§ter erneut",
    metasoApiError:
      "web_search: Metaso-API-Fehler (Code {code}: {message}) ‚Ä?versuche es sp√§ter erneut",
    tavilyMissingKey:
      "web_search: Tavily-Backend ben√∂tigt einen API-Schl√ºssel ‚Ä?setze TAVILY_API_KEY-Umgebungsvariable oder `tavilyApiKey` in ~/.deepmicode/config.json; kostenlose 1000/Monat-Registrierung unter https://tavily.com",
    tavilyUnauthorized:
      "web_search: Tavily-API-Schl√ºssel abgelehnt ‚Ä?√ºberpr√ºfe TAVILY_API_KEY oder erhalte einen unter https://tavily.com",
    tavilyRateLimit:
      "web_search: Tavily-Rate-Limit erreicht oder monatliches Kontingent √ºberschritten ‚Ä?warte, wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama oder upgrade deinen Tavily-Plan",
    tavilyServerError:
      "web_search: Tavily-Serverfehler ({status}) ‚Ä?versuche es sp√§ter erneut oder wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    tavilyParseError:
      "web_search: Tavily hat unparsbare Antwort zur√ºckgegeben (HTTP {status}) ‚Ä?versuche es sp√§ter erneut",
    perplexityMissingKey:
      "web_search: Perplexity-Backend ben√∂tigt einen API-Schl√ºssel ‚Ä?setze PERPLEXITY_API_KEY-Umgebungsvariable oder `perplexityApiKey` in ~/.deepmicode/config.json; erhalte einen unter https://perplexity.ai/settings/api",
    perplexityUnauthorized:
      "web_search: Perplexity-API-Schl√ºssel abgelehnt ‚Ä?√ºberpr√ºfe PERPLEXITY_API_KEY oder erhalte einen unter https://perplexity.ai/settings/api",
    perplexityRateLimit:
      "web_search: Perplexity-Rate-Limit erreicht ‚Ä?warte und versuche es erneut, oder wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    perplexityServerError:
      "web_search: Perplexity-Serverfehler ({status}) ‚Ä?versuche es sp√§ter erneut oder wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    perplexityParseError:
      "web_search: Perplexity hat unparsbare Antwort zur√ºckgegeben (HTTP {status}) ‚Ä?versuche es sp√§ter erneut",
    exaMissingKey:
      "web_search: Exa-Backend ben√∂tigt einen API-Schl√ºssel ‚Ä?setze EXA_API_KEY-Umgebungsvariable oder `exaApiKey` in ~/.deepmicode/config.json; kostenlose 1000/Monat-Registrierung unter https://exa.ai",
    exaUnauthorized:
      "web_search: Exa-API-Schl√ºssel abgelehnt ‚Ä?√ºberpr√ºfe EXA_API_KEY oder erhalte einen unter https://exa.ai",
    exaRateLimit:
      "web_search: Exa-API-Rate-Limit erreicht oder monatliches Kontingent √ºberschritten ‚Ä?warte oder upgrade unter https://exa.ai/pricing",
    exaServerError:
      "web_search: Exa-Serverfehler ({status}) ‚Ä?versuche es sp√§ter erneut oder wechsle die Engine mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    exaParseError:
      "web_search: Exa hat unparsbare Antwort zur√ºckgegeben (HTTP {status}) ‚Ä?versuche es sp√§ter erneut",
    braveMissingKey:
      "web_search: F√ºr Brave Search ist ein API-Schl√ºssel erforderlich ‚Ä?setze die Umgebungsvariable BRAVE_SEARCH_API_KEY (oder BRAVE_API_KEY) oder `braveApiKey` in ~/.deepmicode/config.json; kostenlose Anmeldung mit 2000 Einheiten pro Monat unter https://brave.com/search/api/",
    braveUnauthorized:
      "web_search: Brave-Such-API-Schl√ºssel abgelehnt ‚Ä?√ºberpr√ºfe BRAVE_SEARCH_API_KEY oder beantrage einen unter https://brave.com/search/api/",
    braveRateLimit:
      "web_search: Die Brave Search API unterliegt einer Ratenbegrenzung oder das monatliche Kontingent wurde √ºberschritten ‚Ä?warten oder ein Upgrade durchf√ºhren unter https://brave.com/search/api/",
    braveServerError:
      "web_search: Fehler beim Brave-Suchserver ({status}) ‚Ä?sp√§ter erneut versuchen oder die Engine wechseln mit /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave|ollama",
    braveParseError:
      "web_search: Brave Search hat eine nicht auswertbare Antwort zur√ºckgegeben (HTTP {status}) ‚Ä?sp√§ter erneut versuchen",
    fetchStatus:
      "web_fetch {status} f√ºr {url} ‚Ä?versuche: Best√§tige, dass die URL im Browser aufgel√∂st wird; der Status deutet darauf hin, dass der Host eine Fehlerseite zur√ºckgegeben hat",
    fetchRateLimit429:
      "web_fetch 429 f√ºr {url} ‚Ä?versuche: 10s warten vor erneuter Abfrage; der Host ratelimitet diesen Client",
    fetchForbidden403:
      "web_fetch 403 f√ºr {url} ‚Ä?versuche: Der Host blockiert diesen Client; die Seite erfordert m√∂glicherweise eine Anmeldung oder blockiert Bots ‚Ä?verwende stattdessen web_search-Ausz√ºge",
    fetchServerError5xx:
      "web_fetch {status} f√ºr {url} ‚Ä?versuche: √ñffne die URL in einem Browser; falls sie l√§dt, ist dies vor√ºbergehend und ein erneuter Versuch in 30s kann helfen",
    fetchTimeout:
      "web_fetch: Zeit√ºberschreitung nach {ms}ms f√ºr {url} ‚Ä?versuche: eine k√ºrzere URL oder kleinere Inhalte; dies k√∂nnte ein langsames CDN sein, oder einmal erneut versuchen",
    fetchTooLarge:
      "web_fetch abgelehnt: content-length {len} Bytes √ºberschreitet {cap}-Byte-Grenze ({url}) ‚Ä?versuche: eine andere URL mit kleineren Inhalten; diese Seite ist zu gro√ü zum Abrufen",
    fetchBodyTooLarge:
      "web_fetch abgelehnt: Antwortbody √ºberschritt {cap}-Byte-Grenze ({seen} Bytes gesehen) ‚Ä?versuche: eine andere URL mit kleineren Inhalten; diese Seite hat die Gr√∂√üenbeschr√§nkung √ºberschritten",
    fetchInvalidUrl:
      "web_fetch: URL muss mit http:// oder https:// beginnen ‚Ä?versuche: eine absolute http(s)-URL √ºbergeben (die URL ist fehlerhaft oder verwendet ein nicht unterst√ºtztes Schema)",
  },
  choiceConfirm: {
    ...EN.choiceConfirm,
    customLabel: "Eigene Antwort eingeben",
    customDesc:
      "Keine der Optionen passt ‚Ä?gib eine Freitext-Antwort ein. Das Modell liest sie w√∂rtlich.",
    cancelLabel: "Abbrechen ‚Ä?Frage verwerfen",
    cancelDesc: "Modell stoppt und fragt, was du stattdessen m√∂chtest.",
  },
  cardTitles: {
    ...EN.cardTitles,
    usage: "Nutzung",
    context: "Kontext",
    search: "Suche",
    subagent: "Subagent",
    reply: "Antwort",
    reasoning: "Reasoning",
    reasoningAborted: "Reasoning (abgebrochen)",
    reasoningEllipsis: "Reasoning‚Ä?,
    error: "Fehler",
    doctor: "Doctor",
    you: "Du",
    task: "Aufgabe",
  },
  cardLabels: {
    ...EN.cardLabels,
    prompt: "Prompt",
    reason: "Grund",
    output: "Ausgabe",
    cache: "Cache",
    session: "Sitzung",
    balance: "Guthaben",
    turn: "Turn",
    system: "System",
    tools: "Tools",
    log: "Log",
    input: "Eingabe",
    topTools: "Top-Tools",
    logMsgs: "Log-Nachr",
    hitSingular: "{count} Treffer ¬∑ {files} Datei",
    hitsPlural: "{count} Treffer ¬∑ {files} Dateien",
    moreHitSingular: "‚ã?+{count} weiterer Treffer",
    moreHitsPlural: "‚ã?+{count} weitere Treffer",
    earlierLine: "‚ã?{count} ausgeblendete Zeile (Strg+R f√ºr vollst√§ndige Ausgabe)",
    earlierLines: "‚ã?{count} ausgeblendete Zeilen (Strg+R f√ºr vollst√§ndige Ausgabe)",
    hiddenLine: "‚ã?{count} ausgeblendete Zeile",
    hiddenLines: "‚ã?{count} ausgeblendete Zeilen",
    earlierStackLine: "‚ã?{count} fr√ºhere Stack-Zeile ausgeblendet",
    earlierStackLines: "‚ã?{count} fr√ºhere Stack-Zeilen ausgeblendet",
    agent: "Agent ¬∑ {name}",
    response: "Antwort",
    writing: "Schreibe ‚Ä?,
    tok: "Tok",
    pilcrow: "¬∂",
    aborted: "abgebrochen",
    truncatedByEsc: "[durch Esc gek√ºrzt]",
    rejected: "abgelehnt",
    exit: "Exit {code}",
    bytesIn: "{bytes} rein",
    elapsedSec: "{secs}s",
    stackTrace: "Stacktrace",
    retries: "Wiederholungen",
    reasoningLabel: "Reasoning ¬∑ {count} ¬∂",
    runningLabel: "l√§uft",
    workingLabel: "arbeitet",
    defaultFooter: "‚Üë‚Üì ausw√§hlen  ¬∑  ‚è?best√§tigen  ¬∑  Esc abbrechen",
    applyAction: "[a] anwenden",
    skipAction: "[s] √ºberspringen",
    rejectAction: "[r] ablehnen",
    levelOk: "OK",
    levelWarn: "Warn",
    levelFail: "FEHLGESCHLAGEN",
    checksLabel: "Pr√ºfungen",
    passed: "bestanden",
    warnTag: "Warn",
    failTag: "Fehl",
    stepLabel: "Schritt",
    done: "erledigt",
    inProgress: "‚Ü?in Bearbeitung",
    upcoming: "bevorstehend",
    resumed: "fortgesetzt ¬∑ ",
    archive: "‚è?archivieren ¬∑ ",
    more: "‚ã?+{count} weitere",
    categoryUser: "Benutzer",
    categoryFeedback: "Feedback",
    categoryProject: "Projekt",
    categoryReference: "Referenz",
  },
  mcpHealth: {
    ...EN.mcpHealth,
    noData: "Keine Inspektionsdaten",
    healthy: "Gesund ¬∑ {ms}ms",
    slow: "Langsam ¬∑ {ms}ms",
    verySlow: "Sehr langsam ¬∑ {ms}ms",
    slowToast: "‚ö?MCP `{name}` langsam ¬∑ {seconds}s p95 √ºber die letzten {sampleSize} Aufrufe",
    emptyHint:
      "‚Ñ?keine MCP-Server konfiguriert ‚Ä?versuche: `DeepMiCode setup` zur erneuten Auswahl, oder `DeepMiCode mcp install filesystem` ¬∑ Shell-Befehle werden pro Aufruf abgefragt (einmal erlauben / immer erlauben / ablehnen), kein globales Allow-All",
  },
  denyContextInput: {
    ...EN.denyContextInput,
    description:
      "Sag dem Agenten, warum du abgelehnt hast. Der n√§chste Versuch sieht deinen Grund als zus√§tzlichen Kontext.",
  },
  cardStream: {
    ...EN.cardStream,
    scrollAbove: " ‚Ü?{scroll} / {max} Zeile dar√ºber",
    scrollAbovePlural: " ‚Ü?{scroll} / {max} Zeilen dar√ºber",
    scrollMore: " ‚Ä?{remaining} weitere",
    scrollPgUp: " ¬∑ Bild‚Ü?/ Mausrad",
    scrollCopy: " ¬∑ /copy aktiviert Kopiermodus",
  },
  slashArgPicker: {
    ...EN.slashArgPicker,
    noMatch: 'Keine √úbereinstimmung f√ºr "{partial}"',
    keepTyping: " ‚Ä?tippe weiter, oder R√ºcktaste zum Bearbeiten",
    above: "   ‚Ü?{hidden} dar√ºber",
    below: "   ‚Ü?{hidden} darunter",
    footer: "  ‚Üë‚Üì navigieren ¬∑ Tab / ‚è?ausw√§hlen ¬∑ Esc abbrechen",
  },
  mcpMarketplace: {
    ...EN.mcpMarketplace,
    title: "MCP-Marktplatz",
    filter: "Filter: ",
    filterPlaceholder: "(tippen zum Filtern)",
    matchSingular: "{n} Treffer",
    matchPlural: "{n} Treffer",
    loading: "lade‚Ä?,
    noEntries: "Keine Eintr√§ge",
    opening: "√ñffne Registry‚Ä?,
    cached: "¬∑ zwischengespeichert",
    exhausted: "¬∑ ersch√∂pft",
    loadingMore: "Lade mehr‚Ä?,
    allLoaded: "Alle Seiten geladen",
    fetchingDetail: "Hole Smithery-Details‚Ä?,
    noInstallInfo:
      "Keine Installationsinfo f√ºr {name} - versuche `npx -y @smithery/cli install {name}`",
    alreadyInstalled: "Bereits installiert: {spec}",
    installed: "Installiert ‚Ü?{spec}",
    uninstalled: "{name} deinstalliert",
    installFailed: "Installation fehlgeschlagen: {message}",
    notInstalled: "Nicht installiert: {name}",
    bridged: "‚ú?{name} installiert - verbunden",
    bridgeFailed: "‚ñ?{name} installiert - Verbindung fehlgeschlagen: {reason}",
    bridgeReloadFailed:
      "‚ú?{name} installiert - starte `DeepMiCode code` neu zur Verbindung (Neuladen fehlgeschlagen: {message})",
    restartBridge: "‚ú?{name} installiert - starte `DeepMiCode code` neu zur Verbindung",
    needsEnv: "  ¬∑  ben√∂tigt Umgebungsvariable: {env}",
    badgeOfficial: "[off]",
    badgeSmithery: "[smt]",
    badgeLocal: "[loc]",
    footerHint:
      "Filter eingeben ¬∑ ‚Üë‚Üì ausw√§hlen ¬∑ ‚è?installieren/umschalten ¬∑ Bild‚Ü?mehr laden ¬∑ Esc schlie√üen",
    specLine: "Spec: {runtime} {id} ¬∑ {transport}",
    smitheryDetail: "(Smithery-Eintrag ‚Ä?Installationsdetails werden bei Enter abgerufen)",
    statusError: "Fehler: {message}",
  },
  mcpBrowser: {
    ...EN.mcpBrowser,
    title: "‚ó?MCP-Browser",
    empty:
      "Keine MCP-Server angeh√§ngt. F√ºhre `DeepMiCode setup` aus, um welche auszuw√§hlen, oder starte mit --mcp.",
    serverCount: "{count} Server",
    footer: "‚Üë‚Üì ausw√§hlen ¬∑ [r] neu verbinden ¬∑ [d] deaktivieren ¬∑ Esc beenden",
  },
  mcpBrowse: {
    ...EN.mcpBrowse,
    noResources:
      "Keine Ressourcen auf einem verbundenen MCP-Server (oder keine Server verbunden). `/mcp` zeigt den aktuellen Satz.",
    readOne: "Lese einen: `/resource <uri>` ‚Ä?oder verwende Tab in der Auswahl.",
    noPrompts:
      "Keine Prompts auf einem verbundenen MCP-Server (oder keine Server verbunden). `/mcp` zeigt den aktuellen Satz.",
    fetchOne:
      "Rufe einen ab: `/prompt <name>` ‚Ä?Argumente werden noch nicht unterst√ºtzt; Prompts mit erforderlichen Argumenten geben einen Fehler vom Server zur√ºck.",
    noServerForResource: 'Kein Server bietet Ressource "{name}"',
    resourceHint: "`/resource` ohne Argument listet verf√ºgbare Ressourcen.",
    readFailed: "readResource fehlgeschlagen",
    noServerForPrompt: 'Kein Server bietet Prompt "{name}"',
    promptHint: "`/prompt` ohne Argument listet verf√ºgbare Prompts.",
    fetchFailed: "getPrompt fehlgeschlagen",
  },
  mcpLifecycle: {
    ...EN.mcpLifecycle,
    handshake: "Handshake‚Ä?,
    connected: "verbunden",
    failed: "fehlgeschlagen",
    disabled: "deaktiviert",
    reconnect: "Wiederverbinden‚Ä?,
    initDetail: "initialisiere ‚Ü?tools/list ‚Ü?resources/list",
    reconnectDetail: "baue ab ¬∑ neuer Handshake ¬∑ liste Tools",
    disabledDetail: "via /mcp disable {name}",
    failedSetupHint:
      "‚Ü?f√ºhre `DeepMiCode setup` aus, um diesen Eintrag zu entfernen, oder behebe das zugrunde liegende Problem (fehlendes npm-Paket, Netzwerk usw.).",
    failedSetupConfigHint:
      "‚Ü?f√ºhre `DeepMiCode setup` aus, um fehlerhafte Eintr√§ge aus deiner gespeicherten Konfiguration zu entfernen.",
    abortedHint:
      "MCP-Start abgebrochen ‚Ä?{count} Server √ºbersprungen. F√ºhre /mcp aus, um es erneut zu versuchen, sobald du das zugrunde liegende Problem behoben hast.",
    toolsReady: "Tools bereit",
    warnLabel: "Warn",
  },
  checkpointPicker: {
    ...EN.checkpointPicker,
    title: "Checkpoint wiederherstellen ‚Ä?{workspace}",
    header: " ‚ó?DeepMiCode ¬∑ Checkpoint ausw√§hlen ",
    empty: "  Noch keine Checkpoints in diesem Arbeitsbereich - siehe /checkpoint zum Erstellen",
    more: "     ‚Ä?{hidden} weitere",
    footer: "  ‚Üë‚Üì ausw√§hlen  ¬∑  ‚è?wiederherstellen  ¬∑  [d] vergessen  ¬∑  Esc beenden",
    footerEmpty: "  Esc beenden",
  },
  planReviseConfirm: {
    ...EN.planReviseConfirm,
    title: "Plan-√úberarbeitung vorgeschlagen",
    metaRight: "‚àí{removed}  +{added}  ¬∑  {kept} behalten",
    updatedSummary: "Aktualisierte Zusammenfassung: {summary}",
    acceptLabel: "√úberarbeitung annehmen ‚Ä?neue Schrittliste anwenden",
    acceptHint:
      "Ersetzt den Restplan durch die vorgeschlagenen Schritte. Erledigte Schritte bleiben unber√ºhrt.",
    rejectLabel: "Ablehnen ‚Ä?Originalplan behalten",
    rejectHint:
      "Vorschlag verwerfen. Modell f√§hrt mit den urspr√ºnglichen verbleibenden Schritten fort.",
  },
  diffApp: {
    ...EN.diffApp,
    title: "DeepMiCode diff",
    turnLabel: "Turn {turn} ({current}/{total})",
    turnsAligned: "{count} Turns ausgerichtet",
    paneEmpty: "(keine Datens√§tze auf dieser Seite f√ºr diesen Turn)",
    kindMatch: "‚ú?√úbereinstimmung",
    kindDiverge: "‚ò?Abweichung",
    kindOnlyInA: "‚Ü?nur in A",
    kindOnlyInB: "‚Ü?nur in B",
  },
  recordView: {
    ...EN.recordView,
    userPrefix: "Du ¬ª ",
    assistant: "Assistent",
    toolPrefix: "Tool<",
    argsLabel: "  Args: ",
    resultArrow: "  ‚Ü?",
    error: "Fehler ",
    cache: "  ¬∑ Cache ",
    toolCallOnly: "(nur Tool-Call-Antwort)",
    truncateExtra: "(+{extra} Zeichen)",
  },
  replayApp: {
    ...EN.replayApp,
    emptyTranscript: "Leeres Transkript",
    turnProgress: "Turn {current}/{total}",
    noRecords: "Keine Datens√§tze",
    untracked: "(nicht verfolgt)",
    churned: "(umgewandelt √ó{count})",
  },
  builtinSkills: {
    ...EN.builtinSkills,
    explore:
      'Durchsuche die Codebasis in einem isolierten Subagenten ‚Ä?breit angelegte, schreibgesch√ºtzte Untersuchung, die eine destillierte Antwort zur√ºckgibt. Am besten f√ºr: ¬ªFinde alle Stellen, die‚Ä?, ¬ªWie funktioniert X im gesamten Projekt", ¬ªDurchsuche den Code nach Y".',
    research:
      'Recherchiere eine Frage durch Kombination von Websuche + Codelesen in einem isolierten Subagenten. Am besten f√ºr: ¬ªWird X-Feature von Bibliothek Y unterst√ºtzt?", ¬ªWas ist der kanonische Weg, Z zu tun?", ¬ªVergleiche unsere Implementierung mit dem Standard".',
    review:
      "√úberpr√ºfe die ausstehenden √Ñnderungen (aktueller Branch-Diff) in einem isolierten Subagenten ‚Ä?kennzeichnet Korrektheit, Sicherheit, fehlende Tests, versteckte Verhaltens√§nderungen; meldet Befund + pro-Problem datei:zeile. Schreibgesch√ºtzt; das √ºbergeordnete Element entscheidet, was zu tun ist.",
    securityReview:
      "Sicherheitsfokussierte √úberpr√ºfung des aktuellen Branch-Diffs in einem isolierten Subagenten ‚Ä?kennzeichnet Injection/Authz/Secrets/Deserialisierung/Pfad-Traversal/Krypto-Probleme, mit Schweregrad. Schreibgesch√ºtzt. Verwende beim Ausliefern von √Ñnderungen, die Auth, Eingabeanalyse, Datei-E/A oder externe Anfragen betreffen.",
    test: "F√ºhre die Testsuite des Projekts aus, diagnostiziere Fehler, schlage SEARCH/REPLACE-Fixes vor, wiederhole bis gr√ºn (oder stoppe nach 2 Fixversuchen beim gleichen Fehler). Inline ‚Ä?l√§uft in der √ºbergeordneten Schleife, sodass du die Edit-Blocks siehst und /apply verwenden kannst. Erkennt npm/pnpm/yarn/pytest/go/cargo.",
  },
  shortcutsHelp: {
    ...EN.shortcutsHelp,
    title: "Tastenk√ºrzel",
    groupInput: "Eingabe",
    groupNavigation: "Navigation",
    groupSession: "Sitzung",
    groupSystem: "System",
    descEnter: "Nachricht senden",
    descShiftEnter: "Neue Zeile",
    descCtrlEnter: "Neue Zeile",
    descCtrlJ: "Neue Zeile",
    descCtrlU: "Eingabe leeren",
    descCtrlW: "Wort l√∂schen",
    descCtrlP: "Tastenk√ºrzel anzeigen/ausblenden",
    descCtrlX: "Im Editor √∂ffnen",
    descArrows: "Eingabeverlauf",
    descPgUpDown: "Seite scrollen",
    descCtrlL: "Bildschirm leeren",
    descCtrlB: "Seitenleiste umschalten",
    descNewSession: "Neue Sitzung",
    descListSessions: "Sitzungen auflisten",
    descSwitchModel: "Modell wechseln",
    descSwitchEffort: "Reasoning-Effort wechseln",
    descSwitchTheme: "Theme wechseln",
    descCtrlC: "Beenden",
    descEsc: "Stoppen / Abbrechen",
    descCtrlR: "Ausf√ºhrlich umschalten",
    descCtrlO: "Antwort erweitern (nur w√§hrend Streaming)",
    descHelp: "Alle Befehle anzeigen",
    descShiftTab: "Edit-Modus wechseln",
    descAltS: "Eingabe speichern / abrufen",
  },
  mcpCli: {
    ...EN.mcpCli,
    bundledCatalog: "Mitgelieferte MCP-Server (Offline-Katalog):",
    justFetched: "Gerade abgerufen",
    cachedAge: "Zwischengespeichert, {age}",
    moreAvailable: "Mehr verf√ºgbar",
    allLoaded: "Alle geladen",
    morePagesAvailable: "‚ñ?mehr Seiten verf√ºgbar ‚Ä?`DeepMiCode mcp list --pages <n>` oder --all",
    installHint: "Installieren:  DeepMiCode mcp install <name>",
    usageSearch: "Verwendung: DeepMiCode mcp search <abfrage>",
    usageInstall: "Verwendung: DeepMiCode mcp install <name>",
    noMatchesFor: 'Keine Treffer f√ºr "{q}" in {count} geladenen Eintr√§gen ({source})',
    matchCount: '{count} Treffer f√ºr "{q}" in {source}-Registry ({loaded} durchsuchte Eintr√§ge):',
    moreLoaded: "‚Ä?{count} weitere geladen ‚Ä?verwende `DeepMiCode mcp search <abfrage>` zum Filtern",
    moreMatches: "‚Ä?{count} weitere Treffer",
    installed: "Installiert: {spec}",
    noServerFound:
      'Kein MCP-Server namens "{target}" gefunden nach {pages} Seite(n) der {source}-Registry.',
    noServerTryMore: "Versuche: DeepMiCode mcp install {target} --max-pages 100",
    noInstallMeta:
      'Konnte Installationsmetadaten f√ºr "{name}" nicht ableiten ‚Ä?versuche `npx -y @smithery/cli install {name}` direkt.',
    buildSpecFailed: "Kann Installationsspec f√ºr {name} nicht erstellen: {message}",
    alreadyInstalled: "Bereits installiert: {spec}",
  },
};
