import { EN } from "./EN.js";
import type { TranslationSchema } from "./types.js";

export const ru: TranslationSchema = {
  ...EN,
  common: {
    ...EN.common,
    error: "Ошибка",
    warning: "Предупреждение",
    loading: "Загрузка...",
    done: "Готово",
    cancel: "Отмена",
    confirm: "Подтвердить",
    back: "Назад",
    next: "Далее",
    tool: "инструмент",
    running: "выполняется",
    noTurns: "(пока нет шагов)",
  },
  cli: {
    ...EN.cli,
    description: "Фреймворк агента на DeepSeek �?создан для кэш-попаданий и дешёвых токенов.",
    continue: "Возобновить последнюю использованную сессию без показа выбора.",
    setup: "Интерактивный мастер �?API-ключ, MCP-серверы. Можно перезапустить в любое время.",
    code: "Редактирование кода �?файловые инструменты с корнем в <dir> (по умолч.: тек. папка), системный промпт для кода, v4-flash.",
    chat: "Интерактивная Ink TUI с панелью кэша и стоимости.",
    run: "Разовое выполнение задачи в неинтерактивном режиме, потоковый вывод.",
    stats: "Показать панель использования.",
    doctor: "Проверка здоровья одной командой.",
    commit: "Составить сообщение коммита из staged-diff.",
    sessions: "Список сохранённых сессий или просмотр одной по имени.",
    pruneSessions:
      "Удалить сессии, неактивные ≥N дней (по умолч. 90). --dry-run для предпросмотра.",
    events: "Красивый вывод журнала событий ядра.",
    replay: "Интерактивная Ink TUI для просмотра транскрипта.",
    diff: "Сравнение двух транскриптов в разделённой Ink TUI.",
    mcp: "Помощники Model Context Protocol �?поиск серверов, проверка настройки.",
    version: "Вывести версию DeepMiCode.",
    update: "Проверить новую версию DeepMiCode и установить.",
    index: "Построить (или инкрементально обновить) локальный семантический поисковый индекс.",
  },
  stats: {
    ...EN.stats,
    usageHint: "запусти `DeepMiCode chat`, `DeepMiCode code` или `DeepMiCode run <task>` �?каждый шаг",
    usageDetail: "добавляет одну строку в лог, а `DeepMiCode stats` сводит всё вместе.",
  },
  run: {
    ...EN.run,
    missingApiKey:
      "DEEPSEEK_API_KEY не задан и stdin не TTY (нельзя запросить).\n" +
      "Установи переменную окружения или запусти `DeepMiCode chat` один раз для сохранения ключа.\n",
  },
  sessions: {
    ...EN.sessions,
    emptyHint:
      "ещё нет сохранённых сессий �?запусти `DeepMiCode chat` (сессии авто-сохраняются, если не указан --no-session).",
    listHeader: "Сохранённые сессии (~/.deepmicode/sessions/):",
    inspectHint: "Просмотр:  DeepMiCode sessions <имя>",
    resumeHint: "Возобновить: DeepMiCode chat --session <имя>",
    noSession: 'нет сессии "{name}" (или она пуста).',
    lookedAt: "просмотрено: {path}",
    noIdleSessions: "нет неактивных сессий ≥{days} дн. Ничего не удалено.",
    wouldPrune: "будет удалено {count} сессий(ия), неактивных ≥{days} дн.:",
    dryRunHint: "запусти снова без --dry-run для реального удаления.",
    prunedCount: "удалено {count} сессий(ия), неактивных ≥{days} дн.:",
    daysInvalid: "--days должно быть положительным целым числом (получено {days}).",
  },
  ui: {
    ...EN.ui,
    tipShownOnce: "показано один раз",
    modelOverride: "переопределить стандартную модель",
    noSession: "отключить сохранение сессии для этого запуска",
    noMouseHint: "отключить SGR-слежение мыши; вернуть нативное выделение и правый клик",
    noProxyHint: "игнорировать HTTPS_PROXY / HTTP_PROXY для этого запуска; напрямую",
    resumeHint: "принудительно возобновить указанную сессию (даже если неактивна)",
    newHint: "принудительно начать новую сессию (игнорировать --session / --continue)",
    transcriptHint: "путь для записи JSONL-транскрипта",
    budgetHint: "лимит сессии в USD �?предупреждение на 80%, отказ на 100%",
    modelIdHint: "ID модели DeepSeek (напр. deepseek-v4-flash)",
    systemPromptHint: "переопределить стандартный системный промпт",
    effortHint: "уровень рассуждений �?низкий|средний|высокий|макс",
    sessionNameHint: "имя сессии (по умолч.: 'default')",
    ephemeralHint: "отключить сохранение сессии для этого запуска",
    mcpSpecHint: "спецификация MCP-сервера (можно повторять)",
    mcpPrefixHint: "добавить этот префикс к именам MCP-инструментов",
    noConfigHint: "игнорировать ~/.deepmicode/config.json для этого запуска",
    effortHintShort: "уровень рассуждений �?низ|сред|выс|макс",
    budgetHintShort: "лимит сессии в USD",
    transcriptHintShort: "путь к JSONL-транскрипту",
    mcpSpecHintShort: "спецификация MCP-сервера (повторяемо)",
    mcpPrefixHintShort: "префикс имён MCP-инструментов",
    dryRunHint: "показать, что будет установлено, без реальной установки",
    rebuildHint: "перестроить индекс с нуля",
    embedModelHint: "имя модели эмбеддингов",
    projectDirHint: "корневая директория проекта",
    ollamaUrlHint: "URL Ollama-сервера",
    skipPromptsHint: "пропустить подтверждения",
    verboseHint: "показать полные метаданные сессии",
    pruneDaysHint: "удалять сессии, неактивные �?N дней (по умолч. 90)",
    pruneDryRunHint: "показать список удаляемого без удаления",
    eventTypeHint: "фильтр по типу события",
    eventSinceHint: "начать с этого ID события",
    eventTailHint: "показать только последние N событий",
    jsonHint: "вывод в JSON",
    projectionHint: "показать предполагаемое состояние на каждом событии",
    printHint: "вывод в stdout вместо TUI",
    headHint: "показать только первые N событий",
    tailHint: "показать только последние N событий",
    mdReportHint: "записать Markdown-отчёт diff по этому пути",
    printHintTable: "вывести таблицу в stdout",
    tuiHint: "открыть интерактивную TUI",
    labelAHint: "метка для левой панели",
    labelBHint: "метка для правой панели",
    mcpListDescription: "обзор MCP-реестра (официальные �?smithery �?локальный запасной)",
    mcpInspectDescription: "проверить спецификацию MCP-сервера (инструменты, ресурсы, промпты)",
    mcpSearchDescription: "поиск MCP-серверов по запросу в реестре",
    mcpInstallDescription: "установить MCP-сервер по имени (записывает спецификацию в конфиг)",
    mcpBrowseDescription:
      "интерактивный обзор маркетплейса �?ввод для фильтра, Enter для установки",
    mcpLocalHint: "показать только встроенный офлайн-каталог",
    mcpRefreshHint: "пропустить 24ч кэш и загрузить заново",
    mcpLimitHint: "макс. записей для показа",
    mcpPagesHint: "загружать так много страниц (по умолч. 1)",
    mcpAllHint: "загрузить все страницы (медленно при первом запуске)",
    mcpMaxPagesHint: "максимум страниц при поиске (по умолч. 20)",
    jsonHintCatalog: "вывод в JSON",
    jsonHintReport: "вывести отчёт проверки в JSON",
    modelOverrideFlash: "переопределить модель (по умолч.: deepseek-v4-flash)",
    skipConfirmHint: "пропустить запрос подтверждения",
    welcome: "Запускай `DeepMiCode` в любое время �?настройки сохраняются.",
    taglineChat: "Нативный агент DeepSeek",
    taglineCode: "Нативный кодинг-агент DeepSeek",
    taglineSub: "кэш-первый · flash-первый",
    startSessionHint: "напиши сообщение для начала сессии",
    inputPlaceholder: "Спроси что угодно... (/ для команд, @ для файлов)",
    busy: "Думаю...",
    thinking: "�?размышляю...",
    undo: "Отменить",
    undoHint: "нажми u в течение 5 сек для отмены",
    applied: "применено",
    rejected: "отклонено",
    noDashboard: "Подавить автозапуск встроенной веб-панели.",
    openDashboardHint:
      "Открыть URL панели в браузере сразу после готовности сервера. Не работает при --no-dashboard.",
    dashboardPortHint:
      "Фиксированный порт для панели (1�?5535). Стабилен между перезапусками �?требуется для SSH-туннелей. По умолч.: эфемерный.",
    dashboardPortInvalid:
      "�?--dashboard-port={value} игнорируется (должен быть целым числом 1�?5535) �?используется эфемерный порт",
    dashboardAutoStartFailed:
      "�?автозапуск панели не удался ({reason}) �?попробуй /dashboard или передай --no-dashboard",
    systemAppendHint:
      "Добавить инструкции к системному промпту кода. НЕ заменяет стандартный промпт �?добавляется после него.",
    systemAppendFileHint:
      "Добавить содержимое файла в системный промпт кода. НЕ заменяет стандартный промпт. UTF-8, относительно cwd или абсолютный путь.",
    resumedSession:
      '�?сессия "{name}" возобновлена с {count} предыдущими сообщениями · /new для новой · /sessions для управления',
    newSession:
      '�?сессия "{name}" (новая) �?авто-сохраняется по мере общения · /sessions для переименования или удаления',
    ephemeralSession:
      "�?эфемерный чат (без сохранения) �?убери --no-session для включения сохранения",
    restoredEdits:
      "�?восстановлено {count} ожидающих правок из прерванного запуска �?/apply для применения или /discard для отмены.",
    resumedPlan: "План возобновлён · {when}{summary}",
  },
  code: {
    ...EN.code,
    workspaceConflict:
      "�?рабочая область содержит файлы другой платформы агента ({platforms}). DeepMiCode Code может прочитать их как содержимое проекта; перезапусти с --dir <твой-проект> если это нежелательно.\n",
    systemAppendEmpty: "--system-append пуст �?текст промпта не будет добавлен\n",
    systemAppendFileReadError:
      'Ошибка: не удалось прочитать --system-append-file "{filePath}": {errorDetails}\n',
  },
  slash: {
    ...EN.slash,
    help: { ...EN.slash.help, description: "показать полную справку по командам" },
    status: { ...EN.slash.status, description: "текущая модель, флаги, контекст, сессия" },
    effort: {
      ...EN.slash.effort,
      description:
        "лимит уровня рассуждений (low|medium|high|max); high �?безопасное значение по умолч. для vLLM/Azure",
    },
    model: { ...EN.slash.model, description: "сменить ID модели DeepSeek" },
    models: { ...EN.slash.models, description: "список доступных моделей от DeepSeek /models" },
    theme: {
      ...EN.slash.theme,
      argsHint: "[auto|dark|light|midnight|deep-blue|high-contrast]",
      description: "показать или сохранить тему терминала. Без аргументов открывает выбор.",
    },
    language: {
      ...EN.slash.language,
      description: "сменить язык интерфейса",
      argsHint: "<EN|zh-CN|de|ru>",
      success: "Язык переключён на русский.",
      unsupported: "Неподдерживаемый код языка: {code}. Доступны: {supported}.",
    },
    budget: {
      ...EN.slash.budget,
      description:
        "лимит сессии в USD �?предупреждение на 80%, отказ на 100%. По умолч. выключен. /budget без аргументов показывает статус.",
    },
    mcp: { ...EN.slash.mcp, description: "список MCP-серверов + инструментов этой сессии" },
    resource: {
      ...EN.slash.resource,
      description:
        "просмотр и чтение MCP-ресурсов (без аргумента �?список URI; <uri> �?содержимое)",
    },
    prompt: {
      ...EN.slash.prompt,
      description:
        "просмотр и получение MCP-промптов (без аргумента �?список имён; <имя> �?рендер промпта)",
    },
    memory: {
      ...EN.slash.memory,
      description: "показать / управлять закреплённой памятью (DEEPMICODE.md + ~/.deepmicode/memory)",
      argsHint: "[list|show <имя>|forget <имя>|clear <область> confirm]",
    },
    skill: {
      ...EN.slash.skill,
      description:
        "список / запуск скиллов пользователя (проектные + кастомные + глобальные + встроенные)",
    },
    hooks: {
      ...EN.slash.hooks,
      description:
        "список активных хуков (settings.json в .deepmicode/) · reload перечитывает с диска",
    },
    permissions: {
      ...EN.slash.permissions,
      description:
        "показать / редактировать белый список команд (встроенные только для чтения · на проект: ~/.deepmicode/config.json)",
    },
    dashboard: {
      ...EN.slash.dashboard,
      description: "запустить встроенную веб-панель (127.0.0.1, доступ по токену)",
    },
    update: {
      ...EN.slash.update,
      description: "показать текущую vs последнюю версию + команду обновления",
    },
    stats: {
      ...EN.slash.stats,
      description:
        "межсессионная панель стоимости (сегодня / неделя / месяц / всё время · кэш-попадания · vs Claude)",
    },
    cost: {
      ...EN.slash.cost,
      description:
        "без аргументов �?траты последнего шага; с текстом �?оценка стоимости отправки (худший случай + вероятный кэш)",
    },
    doctor: {
      ...EN.slash.doctor,
      description: "проверка здоровья (api / config / api-reach / index / hooks / project)",
    },
    context: {
      ...EN.slash.context,
      description: "разбивка окна контекста (system / tools / log / input)",
    },
    retry: {
      ...EN.slash.retry,
      description: "отрезать и переотправить последнее сообщение (новый sample)",
    },
    compact: {
      ...EN.slash.compact,
      description:
        "сжать oversized результаты инструментов + аргументы вызовов в логе; лимит в токенах, по умолч. 4000",
    },
    cwd: {
      ...EN.slash.cwd,
      description:
        "сменить корень рабочей области mid-session �?перенаправляет fs/shell/memory инструменты, перезагружает хуки проекта, обновляет @-упоминания",
    },
    stop: {
      ...EN.slash.stop,
      description: "прервать текущий шаг модели (печатная альтернатива Esc)",
    },
    feedback: {
      ...EN.slash.feedback,
      description: "открыть GitHub issue с диагностической информацией (скопирована в буфер)",
    },
    about: {
      ...EN.slash.about,
      description: "информация о проекте �?версия, сайт, репозиторий, лицензия",
    },
    keys: { ...EN.slash.keys, description: "справочник клавиш + мыши + копирования/вставки" },
    plans: {
      ...EN.slash.plans,
      description: "список активных и архивных планов этой сессии, новейшие первыми",
    },
    replay: {
      ...EN.slash.replay,
      description: "загрузить архивный план как read-only снимок Time Travel (по умолч.: новейший)",
    },
    sessions: {
      ...EN.slash.sessions,
      description: "список сохранённых сессий (текущая отмечена �?",
    },
    title: { ...EN.slash.title, description: "попросить модель переименовать сессию из разговора" },
    qq: {
      ...EN.slash.qq,
      description:
        "подключить, проверить или отключить QQ-канал для этой сессии (первое подключение проводит через App ID / App Secret настройку)",
    },
    setup: { ...EN.slash.setup, description: "напоминает выйти и запустить `DeepMiCode setup`" },
    semantic: {
      ...EN.slash.semantic,
      description: "показать статус semantic_search �?построен? Ollama установлен? как включить",
    },
    clear: {
      ...EN.slash.clear,
      description: "очистить только видимый скроллбек (лог/контекст сохраняется)",
    },
    new: { ...EN.slash.new, description: "начать новый разговор (очистить контекст + скроллбек)" },
    loop: {
      ...EN.slash.loop,
      description:
        "авто-переотправлять <промпт> каждые <интервал> пока ты не напишешь / Esc / /loop stop",
    },
    exit: { ...EN.slash.exit, description: "выйти из TUI" },
    init: {
      ...EN.slash.init,
      description:
        "просканировать проект и синтезировать базовый DEEPMICODE.md (модель пишет; просмотр через /apply). `force` перезаписывает существующий файл.",
    },
    apply: {
      ...EN.slash.apply,
      description:
        "применить ожидающие правки на диск (без аргумента �?все; `1`, `1,3` или `1-4` �?указанные, остальные остаются)",
    },
    discard: {
      ...EN.slash.discard,
      description:
        "отменить ожидающие правки без записи (без аргумента �?все; индексы �?указанные)",
    },
    walk: {
      ...EN.slash.walk,
      description:
        "проходить правки по одной (в стиле git-add-p: y/n на блок, a = применить остальные, A = AUTO)",
    },
    undo: { ...EN.slash.undo, description: "отменить последний применённый пакет правок" },
    history: {
      ...EN.slash.history,
      description: "список всех пакетов правок этой сессии (ID для /show, отметки отмены)",
    },
    show: {
      ...EN.slash.show,
      description: "показать сохранённый diff правки (без ID �?новейшая неотменённая)",
    },
    commit: { ...EN.slash.commit, description: "git add -A && git commit -m ..." },
    checkpoint: {
      ...EN.slash.checkpoint,
      description:
        "сделать снимок каждого файла, которого касалась сессия (внутреннее хранилище, не git). /checkpoint без аргументов �?список.",
    },
    restore: {
      ...EN.slash.restore,
      description: "откатить файлы к именованному checkpoint (см. /checkpoint list)",
    },
    plan: {
      ...EN.slash.plan,
      description:
        "включить/выключить read-only режим плана (запись заблокирована до submit_plan + подтверждения)",
    },
    mode: {
      ...EN.slash.mode,
      description:
        "edit-gate: review (очередь) · auto (применить+отменить) · yolo (применить+авто-shell). Shift+Tab переключает.",
    },
    jobs: {
      ...EN.slash.jobs,
      description: "список фоновых задач, запущенных через run_background",
    },
    kill: {
      ...EN.slash.kill,
      description: "остановить фоновую задачу по ID (SIGTERM �?SIGKILL после паузы)",
    },
    logs: {
      ...EN.slash.logs,
      description: "вывод фоновой задачи (по умолч. последние 80 строк)",
    },
    btw: {
      ...EN.slash.btw,
      description:
        "быстрый побочный вопрос �?отвечается с чистого листа, не добавляется в контекст разговора",
    },
    "search-engine": {
      ...EN.slash["search-engine"],
      description:
        "сменить поисковый движок �?bing (по умолч., работает из РФ без прокси), searxng (самостоятельный хостинг), metaso (100/день бесплатно), tavily (1000/мес бесплатно), perplexity (AI-native), exa (AI-native)",
    },
  },
  wizard: {
    ...EN.wizard,
    languageTitle: "Выберите язык",
    languageSubtitle: "Обнаружен из системной локали. Можно сменить позже через /language.",
    welcomeTitle: "Добро пожаловать в DeepMiCode.",
    apiKeyPrompt: "Вставьте ваш DeepSeek API ключ для начала работы.",
    apiKeyGetOne: "Получить: https://platform.deepseek.com/api_keys",
    apiKeySavedLocally: "Сохранён локально: {path}",
    apiKeyInputLabel: "ключ �?",
    apiKeyPlaceholder: "sk-...",
    apiKeyInvalid: "Ключ слишком короткий �?вставьте полный токен (16+ символов, без пробелов).",
    apiKeyChecking: "Проверка API ключа�?,
    apiKeyRejected:
      "DeepSeek отклонил этот API ключ. Вставьте корректный ключ или нажмите Esc для отмены.",
    apiKeyCheckFailed:
      "Не удалось проверить API ключ ({message}). Проверьте соединение или попробуйте снова.",
    apiKeyPreview: "предпросмотр: {redacted}",
    themeTitle: "Выберите тему",
    themeSubtitle: "Предпросмотр обновляется сразу. Можно сменить позже через /theme.",
    themeSampleHeading: "Образец",
    themeFooter: "[↑↓] навигация · [Enter] подтвердить · [Esc] отмена",
    themeCaption: {
      ...EN.wizard.themeCaption,
      dark: "Тёмные тона (по умолч.)",
      light: "Светлый режим",
      midnight: "Палитра Tokyo Night",
      "deep-blue": "Глубокий синий на чёрном",
      "high-contrast": "Доступность",
    },
    mcpTitle: "Какие MCP-серверы должен подключить DeepMiCode?",
    mcpUserArgsHint: "(вы предоставите {arg})",
    mcpFooterMulti:
      "[↑↓] навигация  ·  [Space] переключить  ·  [Enter] подтвердить  ·  [Esc] отмена  ·  пусто = пропустить",
    mcpArgsTitle: "Настройка {name}",
    mcpArgsDirMissing: "Директория {path} не существует.",
    mcpArgsDirCreateHint: "[Y/Enter] создать (mkdir -p) · [N/Esc] указать другой путь",
    mcpArgsDirCreateFailed: "Не удалось создать {path}: {message}",
    mcpArgsRequiredParam: "Обязательный параметр: ",
    mcpArgsEmpty: "{name} требует значение �?получена пустая строка.",
    mcpArgsNotADir: "{path} существует, но это не директория.",
    reviewTitle: "Готово к сохранению",
    reviewLabelApiKey: "API ключ",
    reviewLabelLanguage: "Язык",
    reviewLabelTheme: "Тема",
    reviewLabelMcp: "MCP",
    reviewMcpNone: "(нет)",
    reviewMcpServers: "{count} сервер(ов)",
    reviewSavesTo: "Сохранить в {path}",
    reviewSaveError: "Не удалось сохранить конфиг: {message}",
    reviewFooter: "[Enter] сохранить · [Esc] отмена",
    savedTitle: "�?Сохранено.",
    savedShellHint:
      "Команды, которые модель хочет запустить, спрашивают каждый раз �?выбери «всегда разрешать» в приглашении, чтобы добавить команду в белый список. Глобального allow-all нет по дизайну.",
    savedFooter: "[Enter] для выхода",
    selectFooter: "[↑↓] навигация · [Enter] подтвердить · [Esc] отмена",
    stepCounter: "Шаг {step}/{total} · ",
    exitHint: "/exit для выхода",
    themeSampleReasoning: "Рассуждение",
  },
  themePicker: {
    ...EN.themePicker,
    header: "Тема",
    footer: "↑↓ выбор · �?подтвердить · esc отмена",
    currentPref: "текущая настройка",
    activeNow: "активно сейчас",
    autoDesc: "использовать DEEPMICODE_THEME или по умолчанию",
  },
  planFlow: {
    ...EN.planFlow,
    approveCardTitle: "Подтвердить план",
    approveCardMetaRight: "ожидание",
    openQuestionsBanner:
      "�?план помечает открытые вопросы или риски �?выбери {refine} чтобы написать конкретные ответы перед тем, как модель продолжит.",
    openQuestionsHeader: "Открытые вопросы / риски",
    truncatedBodyMore: "�?ещё {n} строка выше в скроллбеке",
    truncatedBodyMorePlural: "�?ещё {n} строк(и) выше в скроллбеке",
    picker: {
      ...EN.planFlow.picker,
      accept: "принять",
      acceptHint: "выполнить сейчас, по порядку",
      refine: "уточнить",
      refineHint: "дать агенту больше указаний, составить новый план",
      revise: "пересмотреть",
      reviseHint: "изменить план перед выполнением (пропустить/переупорядочить шаги)",
      reject: "отклонить",
      rejectHint: "отменить, агент попробует заново с нуля",
    },
    refineFooter: "�?отправить  ·  esc назад к выбору",
    refineQuestionsHeading: "Ответьте на вопросы или опишите желаемое изменение:",
    modes: {
      ...EN.planFlow.modes,
      approve: {
        ...EN.planFlow.modes.approve,
        title: "подтверждение �?есть последние указания?",
        hint: "Ответь на вопросы плана, добавь ограничения или просто нажми Enter для утверждения как есть.",
        blankHint: " (Enter без текста = утвердить без доп. инструкций.)",
      },
      refine: {
        ...EN.planFlow.modes.refine,
        title: "уточнение �?что модели изменить?",
        hint: "Опиши, что не так или чего не хватает, или ответь на вопросы плана.",
        blankHint: " (Enter без текста = модель выберет безопасные значения по умолч.)",
      },
      reject: {
        ...EN.planFlow.modes.reject,
        title: "отклонение �?объясни модели почему (необязательно)",
        hint: "Скажи, что модель поняла неправильно, или что ты на самом деле хочешь.",
        blankHint: " (Enter без текста = отмена без объяснения; модель спросит, что ты хочешь.)",
      },
      "checkpoint-revise": {
        ...EN.planFlow.modes["checkpoint-revise"],
        title: "пересмотр �?что изменить перед следующим шагом?",
        hint: "Изменение объёма, пропуск шагов, альтернативный подход �?модель корректирует оставшийся план.",
        blankHint: " (Enter без текста = продолжить с текущим планом.)",
      },
      "choice-custom": {
        ...EN.planFlow.modes["choice-custom"],
        title: "свой ответ �?напиши что угодно",
        hint: "Свободный ответ. Модель читает его дословно и действует �?не обязательно соответствовать предложенным вариантам.",
        blankHint: " (Enter без текста = спросить модель, что ты на самом деле хочешь.)",
      },
    },
    checkpoint: {
      ...EN.planFlow.checkpoint,
      title: "Контрольная точка �?шаг выполнен",
      continue: "Продолжить �?выполнить следующий шаг",
      continueHint: "Модель продолжает со следующим шагом.",
      finish: "Завершить �?подвести итог и закрыть",
      finishHint: "Модель записывает последний шаг и подводит итог плана.",
      revise: "Пересмотреть �?дать обратную связь перед следующим шагом",
      reviseHint: "Оставаться на паузе, написать указания; модель корректирует оставшийся план.",
      stop: "Стоп �?завершить план здесь",
      stopHint: "Модель подводит итог выполненного и завершает.",
    },
    stepList: {
      ...EN.planFlow.stepList,
      counter: "{total} шагов",
      counterSingular: "{total} шаг",
      counterDone: "{done}/{total} выполнено ({pct}%) · {total} шагов",
      counterDoneSingular: "{done}/{total} выполнено ({pct}%) · {total} шаг",
    },
    noPlanSummary: "План ещё не отправлен.",
    detailCollapsedHint: "Ctrl+P разворачивает полные детали плана.",
    detailExpandedHint: "Ctrl+P сворачивает детали.",
    detailHeader: "Детали плана",
    detailWindow: "показаны строки {start}-{end} из {total}",
    detailScrollHint: "PgUp/PgDn прокрутка · Home/End переход",
    reviseTitle: "Пересмотр плана",
    reviseSteps: "{count} шагов",
    reviseFooter:
      "\u2191\u2193 фокус  ·  space переключить пропуск  ·  k/j движение  ·  \u23ce принять  ·  esc отмена",
    riskMed: " сред",
    riskHigh: " выс",
    completeMsg: "\u25b8 план выполнен �?все {total} шаг(ов) сделаны · архивирован",
  },
  webErrors: {
    ...EN.webErrors,
    braveMissingKey:
      "web_search: Для работы Brave Search требуется ключ API �?задайте переменную среды BRAVE_SEARCH_API_KEY (или BRAVE_API_KEY) или параметр `braveApiKey` в файле ~/.deepmicode/config.json; бесплатная регистрация с лимитом 2000 запросов в месяц на сайте https://brave.com/search/api/",
    braveUnauthorized:
      "web_search: Ключ API Brave Search отклонен �?проверьте значение BRAVE_SEARCH_API_KEY или получите новый ключ на сайте https://brave.com/search/api/",
    braveRateLimit:
      "web_search: Превышен лимит запросов или месячная квота для Brave Search API �?подождите или перейдите на платную версию на сайте https://brave.com/search/api/",
    braveServerError:
      "web_search: Ошибка сервера Brave Search ({status}) �?попробуйте позже или выберите другой поисковик с помощью /search-engine bing|searxng|metaso|tavily|perplexity|exa|brave",
    braveParseError:
      "web_search: Brave Search вернул неразборчивый ответ (HTTP {status}) �?попробуйте позже",
  },
  handlers: {
    ...EN.handlers,
    webSearchEngine: {
      ...EN.handlers.webSearchEngine,
      usageBrave:
        "  /search-engine brave               использует Brave Search API (независимый индекс, бесплатно 2000 запросов в месяц �?установите BRAVE_SEARCH_API_KEY или braveApiKey в конфигурации; получить ключ можно на сайте https://brave.com/search/api/)",
      switchedBraveNote:
        " Укажите параметр BRAVE_SEARCH_API_KEY (или BRAVE_API_KEY) или `braveApiKey` в файле конфигурации; 2000 бесплатных запросов в месяц доступны по адресу https://brave.com/search/api/.",
    },
  },
};
