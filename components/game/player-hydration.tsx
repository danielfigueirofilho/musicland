"use client";

import { useEffect } from "react";

import { AchievementToaster } from "@/components/game/achievement-toast";
import { LevelUpModal } from "@/components/game/level-up-modal";
import { usePlayerStore } from "@/stores/player-store";
import { useSettingsStore } from "@/stores/settings-store";

/**
 * Hidrata progresso/sessão e dispara feedbacks globais de gamificação.
 */
export function PlayerHydration() {
  const hydrate = usePlayerStore((state) => state.hydrate);
  const pendingLevelUp = usePlayerStore((state) => state.pendingLevelUp);
  const clearLevelUp = usePlayerStore((state) => state.clearLevelUp);
  const hydrateMute = useSettingsStore((state) => state.hydrateMute);

  useEffect(() => {
    hydrateMute();
    void hydrate();
  }, [hydrate, hydrateMute]);

  return (
    <>
      <AchievementToaster />
      {pendingLevelUp !== null ? (
        <LevelUpModal level={pendingLevelUp} onClose={clearLevelUp} />
      ) : null}
    </>
  );
}
