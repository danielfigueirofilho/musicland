"use client";

import { useCallback } from "react";

import {
  playAnswerFeedback,
  playFrequency,
  unlockAudioContext,
} from "@/lib/music/tone-player";
import { useSettingsStore } from "@/stores/settings-store";

/**
 * Encapsula Tone.js: unlock na primeira interação e respeito ao mute.
 */
export function useTonePlayer() {
  const isMuted = useSettingsStore((state) => state.isMuted);
  const hasUnlockedAudio = useSettingsStore((state) => state.hasUnlockedAudio);
  const unlockAudio = useSettingsStore((state) => state.unlockAudio);

  const ensureUnlocked = useCallback(async () => {
    if (!hasUnlockedAudio) {
      await unlockAudioContext();
      unlockAudio();
    }
  }, [hasUnlockedAudio, unlockAudio]);

  const playNote = useCallback(
    async (frequencyHz: number) => {
      await ensureUnlocked();
      await playFrequency(frequencyHz, { muted: isMuted });
    },
    [ensureUnlocked, isMuted],
  );

  const playFeedback = useCallback(
    async (isCorrect: boolean) => {
      await ensureUnlocked();
      await playAnswerFeedback(isCorrect, isMuted);
    },
    [ensureUnlocked, isMuted],
  );

  return { playNote, playFeedback, isMuted };
}
