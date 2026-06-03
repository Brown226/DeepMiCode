import { create } from "zustand";
import type { StartupFailureState } from "../ui/startup-failure";

type StartupState = {
  failure: StartupFailureState | null;
  retryNonce: number;
  stderrLines: string[];

  setFailure: (failure: StartupFailureState | null) => void;
  retry: () => void;
  appendStderr: (line: string) => void;
  clearStderr: () => void;
};

export const useStartupStore = create<StartupState>((set) => ({
  failure: null,
  retryNonce: 0,
  stderrLines: [],

  setFailure: (failure) => set({ failure }),
  retry: () => set((s) => ({ retryNonce: s.retryNonce + 1, failure: null })),
  appendStderr: (line) => set((s) => ({ stderrLines: [...s.stderrLines, line] })),
  clearStderr: () => set({ stderrLines: [] }),
}));
