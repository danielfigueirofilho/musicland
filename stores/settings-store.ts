"use client";

import { create } from "zustand";

const MUTE_STORAGE_KEY = "musicland-muted";

type SettingsState = {
  isMuted: boolean;
  hasUnlockedAudio: boolean;
};

type SettingsActions = {
  hydrateMute: () => void;
  toggleMute: () => void;
  unlockAudio: () => void;
};

export type SettingsStore = SettingsState & SettingsActions;

function readSessionMute(): boolean {
  if (typeof sessionStorage === "undefined") {
    return false;
  }
  return sessionStorage.getItem(MUTE_STORAGE_KEY) === "1";
}

function writeSessionMute(isMuted: boolean): void {
  if (typeof sessionStorage === "undefined") {
    return;
  }
  sessionStorage.setItem(MUTE_STORAGE_KEY, isMuted ? "1" : "0");
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  isMuted: false,
  hasUnlockedAudio: false,
  hydrateMute: () => set({ isMuted: readSessionMute() }),
  toggleMute: () =>
    set((state) => {
      const isMuted = !state.isMuted;
      writeSessionMute(isMuted);
      return { isMuted };
    }),
  unlockAudio: () => set({ hasUnlockedAudio: true }),
}));
