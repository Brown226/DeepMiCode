import type { Update } from "@tauri-apps/plugin-updater";
import { create } from "zustand";

type UpdateState = {
  pendingUpdate: Update | null;
  status: "idle" | "installing" | "error";
  progress: { downloaded: number; total: number | null } | null;

  setPendingUpdate: (update: Update | null) => void;
  setStatus: (status: "idle" | "installing" | "error") => void;
  setProgress: (progress: { downloaded: number; total: number | null } | null) => void;
  reset: () => void;
};

export const useUpdateStore = create<UpdateState>((set) => ({
  pendingUpdate: null,
  status: "idle",
  progress: null,

  setPendingUpdate: (pendingUpdate) => set({ pendingUpdate }),
  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
  reset: () => set({ pendingUpdate: null, status: "idle", progress: null }),
}));
