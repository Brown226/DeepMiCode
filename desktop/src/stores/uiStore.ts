import { create } from "zustand";
import {
  FONT_FAMILY,
  FONT_FAMILY_STACK,
  FONT_SCALE,
  FONT_SCALE_ZOOM,
  type FontFamily,
  type FontScale,
  THEME,
  type Theme,
  type ThemeStyle,
  defaultStyleForTheme,
  isFontFamily,
  isFontScale,
  isTheme,
  isThemeStyle,
  themeForStyle,
} from "../theme";

// ---- Toast ----

export type ToastItem = {
  id: string;
  msg: string;
  yolo?: boolean;
};

// ---- Store ----

type UIState = {
  // Theme
  theme: Theme;
  themeStyle: ThemeStyle;
  fontScale: FontScale;
  fontFamily: FontFamily;
  customFontFamily: string;

  // Currency
  currency: "CNY" | "USD";

  // Sidebar / panel collapse
  sideCollapsed: boolean;
  ctxCollapsed: boolean;

  // Modal state
  settingsOpen: boolean;
  settingsPage: string;
  aboutOpen: boolean;
  jobsOpen: boolean;
  scheduledTasksOpen: boolean;
  workdirOpen: boolean;
  workdirAnchor: { top?: number; bottom?: number; left: number } | undefined;

  // Toast
  toast: ToastItem | null;

  // Splash
  splashOn: boolean;

  // Actions
  setTheme: (theme: Theme) => void;
  setThemeStyle: (style: ThemeStyle) => void;
  toggleTheme: () => void;
  setFontScale: (scale: FontScale) => void;
  setFontFamily: (family: FontFamily) => void;
  setCustomFontFamily: (family: string) => void;
  setCurrency: (currency: "CNY" | "USD") => void;
  toggleCurrency: () => void;
  setSideCollapsed: (collapsed: boolean) => void;
  toggleSide: () => void;
  setCtxCollapsed: (collapsed: boolean) => void;
  toggleCtx: () => void;
  openSettings: (page?: string) => void;
  closeSettings: () => void;
  openAbout: () => void;
  closeAbout: () => void;
  openJobs: () => void;
  closeJobs: () => void;
  openScheduledTasks: () => void;
  closeScheduledTasks: () => void;
  openWorkdir: (anchor?: { top?: number; bottom?: number; left: number }) => void;
  closeWorkdir: () => void;
  showToast: (msg: string, opts?: { yolo?: boolean; duration?: number }) => void;
  hideToast: () => void;
  hideSplash: () => void;
};

let _toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useUIStore = create<UIState>((set, get) => ({
  // Theme
  theme: (() => {
    const v = localStorage.getItem("deepmicode.theme");
    const style = localStorage.getItem("deepmicode.themeStyle");
    if (isThemeStyle(style)) return themeForStyle(style);
    return isTheme(v) ? v : THEME.DARK;
  })(),
  themeStyle: (() => {
    const style = localStorage.getItem("deepmicode.themeStyle");
    if (isThemeStyle(style)) return style;
    const storedTheme = localStorage.getItem("deepmicode.theme");
    return defaultStyleForTheme(isTheme(storedTheme) ? storedTheme : THEME.DARK);
  })(),
  fontScale: (() => {
    const v = localStorage.getItem("deepmicode.fontScale");
    return isFontScale(v) ? v : FONT_SCALE.MEDIUM;
  })(),
  fontFamily: (() => {
    const v = localStorage.getItem("deepmicode.fontFamily");
    return isFontFamily(v) ? v : FONT_FAMILY.SANS;
  })(),
  customFontFamily: localStorage.getItem("deepmicode.customFontFamily") ?? "",

  // Currency
  currency: (() => {
    const v = localStorage.getItem("deepmicode.currency");
    return v === "USD" ? "USD" : "CNY";
  })(),

  // Sidebar / panel
  sideCollapsed: localStorage.getItem("deepmicode.sideCollapsed") === "1",
  ctxCollapsed: localStorage.getItem("deepmicode.ctxCollapsed") === "1",

  // Modal state
  settingsOpen: false,
  settingsPage: "general",
  aboutOpen: false,
  jobsOpen: false,
  scheduledTasksOpen: false,
  workdirOpen: false,
  workdirAnchor: undefined,

  // Toast
  toast: null,

  // Splash
  splashOn: (() => {
    try {
      const key = "deepmicode.splashShown";
      if (sessionStorage.getItem(key)) return false;
      sessionStorage.setItem(key, "1");
      return true;
    } catch {
      return false;
    }
  })(),

  // ---- Actions ----

  setTheme: (theme) => {
    const style = get().themeStyle;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("deepmicode.theme", theme);
    set({ theme });
  },

  setThemeStyle: (style) => {
    document.documentElement.dataset.themeStyle = style;
    localStorage.setItem("deepmicode.themeStyle", style);
    set({ themeStyle: style });
  },

  toggleTheme: () => {
    const { theme } = get();
    const next = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    get().setTheme(next);
  },

  setFontScale: (fontScale) => {
    document.documentElement.style.setProperty("zoom", String(FONT_SCALE_ZOOM[fontScale]));
    localStorage.setItem("deepmicode.fontScale", fontScale);
    set({ fontScale });
  },

  setFontFamily: (fontFamily) => {
    const { customFontFamily } = get();
    const custom = customFontFamily.trim();
    const stack =
      fontFamily === FONT_FAMILY.CUSTOM && custom
        ? custom
        : (FONT_FAMILY_STACK[fontFamily] ?? FONT_FAMILY_STACK.sans);
    document.documentElement.style.setProperty("--font-sans", stack);
    localStorage.setItem("deepmicode.fontFamily", fontFamily);
    set({ fontFamily });
  },

  setCustomFontFamily: (customFontFamily) => {
    const { fontFamily } = get();
    const custom = customFontFamily.trim();
    const stack =
      fontFamily === FONT_FAMILY.CUSTOM && custom
        ? custom
        : (FONT_FAMILY_STACK[fontFamily] ?? FONT_FAMILY_STACK.sans);
    document.documentElement.style.setProperty("--font-sans", stack);
    localStorage.setItem("deepmicode.customFontFamily", customFontFamily);
    set({ customFontFamily });
  },

  setCurrency: (currency) => {
    localStorage.setItem("deepmicode.currency", currency);
    set({ currency });
  },

  toggleCurrency: () => {
    const { currency } = get();
    get().setCurrency(currency === "CNY" ? "USD" : "CNY");
  },

  setSideCollapsed: (sideCollapsed) => {
    localStorage.setItem("deepmicode.sideCollapsed", sideCollapsed ? "1" : "0");
    set({ sideCollapsed });
  },

  toggleSide: () => {
    const { sideCollapsed } = get();
    get().setSideCollapsed(!sideCollapsed);
  },

  setCtxCollapsed: (ctxCollapsed) => {
    localStorage.setItem("deepmicode.ctxCollapsed", ctxCollapsed ? "1" : "0");
    set({ ctxCollapsed });
  },

  toggleCtx: () => {
    const { ctxCollapsed } = get();
    get().setCtxCollapsed(!ctxCollapsed);
  },

  openSettings: (page = "general") => set({ settingsOpen: true, settingsPage: page }),
  closeSettings: () => set({ settingsOpen: false }),

  openAbout: () => set({ aboutOpen: true }),
  closeAbout: () => set({ aboutOpen: false }),

  openJobs: () => set({ jobsOpen: true }),
  closeJobs: () => set({ jobsOpen: false }),

  openScheduledTasks: () => set({ scheduledTasksOpen: true }),
  closeScheduledTasks: () => set({ scheduledTasksOpen: false }),

  openWorkdir: (anchor) => set({ workdirOpen: true, workdirAnchor: anchor }),
  closeWorkdir: () => set({ workdirOpen: false, workdirAnchor: undefined }),

  showToast: (msg, opts) => {
    if (_toastTimer) clearTimeout(_toastTimer);
    set({ toast: { id: `t-${Date.now()}`, msg, yolo: opts?.yolo } });
    _toastTimer = setTimeout(() => {
      set({ toast: null });
      _toastTimer = null;
    }, opts?.duration ?? 1600);
  },

  hideToast: () => {
    if (_toastTimer) {
      clearTimeout(_toastTimer);
      _toastTimer = null;
    }
    set({ toast: null });
  },

  hideSplash: () => set({ splashOn: false }),
}));
