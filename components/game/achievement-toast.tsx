"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { usePlayerStore } from "@/stores/player-store";

/**
 * Exibe toast ao desbloquear conquista (CA-17).
 */
export function AchievementToaster() {
  const pending = usePlayerStore((state) => state.pendingAchievements);
  const clear = usePlayerStore((state) => state.clearAchievements);

  useEffect(() => {
    if (pending.length === 0) {
      return;
    }
    for (const achievement of pending) {
      toast.success(achievement.title, {
        description: achievement.description,
      });
    }
    clear();
  }, [pending, clear]);

  return null;
}
