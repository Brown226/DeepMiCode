import { invoke } from "@tauri-apps/api/core";
import { create } from "zustand";

export type TabMeta = {
  id: string;
  workspaceDir?: string;
  busy?: boolean;
};

type TabState = {
  tabs: TabMeta[];
  activeTabId: string;

  // Actions
  setTabs: (tabs: TabMeta[]) => void;
  setActiveTabId: (id: string) => void;
  addTab: (tab: TabMeta) => void;
  removeTab: (id: string) => void;
  updateTab: (id: string, patch: Partial<TabMeta>) => void;
  newTab: () => void;
  closeTab: (id: string) => void;
};

export const useTabStore = create<TabState>((set, get) => ({
  tabs: [],
  activeTabId: "",

  setTabs: (tabs) => set({ tabs }),

  setActiveTabId: (activeTabId) => set({ activeTabId }),

  addTab: (tab) =>
    set((s) => ({
      tabs: s.tabs.some((t) => t.id === tab.id) ? s.tabs : [...s.tabs, tab],
    })),

  removeTab: (id) =>
    set((s) => {
      const next = s.tabs.filter((t) => t.id !== id);
      const activeTabId = s.activeTabId === id ? (next[0]?.id ?? "") : s.activeTabId;
      return { tabs: next, activeTabId };
    }),

  updateTab: (id, patch) =>
    set((s) => ({
      tabs: s.tabs.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    })),

  newTab: () => {
    void invoke("rpc_send", {
      line: JSON.stringify({ cmd: "tab_open" }),
    }).catch((err) => console.error("tab_open failed", err));
  },

  closeTab: (id) => {
    void invoke("rpc_send", {
      line: JSON.stringify({ tabId: id, cmd: "tab_close" }),
    }).catch((err) => console.error("tab_close failed", err));
  },
}));
