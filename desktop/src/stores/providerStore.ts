import { create } from "zustand";
import { invoke } from "@tauri-apps/api/core";
import type { ProviderConfig } from "../protocol";

type ProviderState = {
  providers: ProviderConfig[];
  loading: boolean;

  // Actions
  fetchProviders: () => void;
  saveProvider: (provider: ProviderConfig) => void;
  deleteProvider: (id: string) => void;
  setDefaultProvider: (id: string) => void;
  setProviders: (providers: ProviderConfig[]) => void;
};

export const useProviderStore = create<ProviderState>((set) => ({
  providers: [],
  loading: false,

  fetchProviders: () => {
    set({ loading: true });
    invoke("rpc_send", {
      line: JSON.stringify({ cmd: "providers_list" }),
    }).catch((err) => {
      console.error("providers_list failed", err);
      set({ loading: false });
    });
  },

  saveProvider: (provider) => {
    invoke("rpc_send", {
      line: JSON.stringify({ cmd: "providers_save", provider }),
    }).catch((err) => console.error("providers_save failed", err));
  },

  deleteProvider: (id) => {
    invoke("rpc_send", {
      line: JSON.stringify({ cmd: "providers_delete", id }),
    }).catch((err) => console.error("providers_delete failed", err));
  },

  setDefaultProvider: (id) => {
    invoke("rpc_send", {
      line: JSON.stringify({ cmd: "providers_set_default", id }),
    }).catch((err) => console.error("providers_set_default failed", err));
  },

  setProviders: (providers) => set({ providers, loading: false }),
}));
