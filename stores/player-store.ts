"use client";

import { create } from "zustand";

import { detectNewAchievements } from "@/lib/gamification/achievements";
import { getLevelFromXp } from "@/lib/gamification/levels";
import { applyQuizXp, didLevelUp } from "@/lib/gamification/xp";
import {
  createEmptyProgress,
  loadProgress,
  saveProgress,
} from "@/lib/db/client";
import { GUEST_USER_ID, mergeProgressXp } from "@/lib/db/progress";
import type { Achievement, AchievementId, SessionUser } from "@/types";

type PlayerState = {
  userId: string;
  displayName: string;
  email: string | null;
  isGuest: boolean;
  xp: number;
  avatarId: string;
  totalCorrect: number;
  consecutiveCorrect: number;
  unlockedAchievements: AchievementId[];
  hasHydrated: boolean;
  pendingLevelUp: number | null;
  pendingAchievements: Achievement[];
};

type PlayerActions = {
  hydrate: () => Promise<void>;
  applyAnswer: (isCorrect: boolean) => Promise<Achievement[]>;
  loginAsUser: (user: SessionUser) => Promise<void>;
  logoutToGuest: () => Promise<void>;
  clearLevelUp: () => void;
  clearAchievements: () => void;
};

export type PlayerStore = PlayerState & PlayerActions;

const initialState: PlayerState = {
  userId: GUEST_USER_ID,
  displayName: "Visitante",
  email: null,
  isGuest: true,
  xp: 0,
  avatarId: "default",
  totalCorrect: 0,
  consecutiveCorrect: 0,
  unlockedAchievements: [],
  hasHydrated: false,
  pendingLevelUp: null,
  pendingAchievements: [],
};

async function persistFromState(state: PlayerState): Promise<void> {
  await saveProgress({
    userId: state.userId,
    displayName: state.displayName,
    xp: state.xp,
    avatarId: state.avatarId,
    totalCorrect: state.totalCorrect,
    consecutiveCorrect: state.consecutiveCorrect,
    unlockedAchievements: state.unlockedAchievements,
  });
}

async function syncXpToServer(isGuest: boolean, xp: number): Promise<void> {
  if (isGuest) {
    return;
  }
  try {
    await fetch("/api/auth/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ xp }),
    });
  } catch {}
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  ...initialState,
  hydrate: async () => {
    const local = (await loadProgress(GUEST_USER_ID)) ?? createEmptyProgress();
    let sessionUser: SessionUser | null = null;
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const body = (await response.json()) as { user: SessionUser | null };
        sessionUser = body.user;
      }
    } catch {
      sessionUser = null;
    }

    if (!sessionUser) {
      set({
        ...local,
        email: null,
        isGuest: true,
        hasHydrated: true,
        pendingLevelUp: null,
        pendingAchievements: [],
      });
      return;
    }

    const accountLocal =
      (await loadProgress(sessionUser.id)) ??
      createEmptyProgress(sessionUser.id, sessionUser.name);
    const mergedXp = mergeProgressXp(
      Math.max(local.xp, accountLocal.xp),
      sessionUser.xp,
    );
    const merged = {
      userId: sessionUser.id,
      displayName: sessionUser.name,
      email: sessionUser.email,
      isGuest: false,
      xp: mergedXp,
      avatarId: accountLocal.avatarId || sessionUser.avatarId,
      totalCorrect: Math.max(local.totalCorrect, accountLocal.totalCorrect),
      consecutiveCorrect: Math.max(
        local.consecutiveCorrect,
        accountLocal.consecutiveCorrect,
      ),
      unlockedAchievements: Array.from(
        new Set([
          ...local.unlockedAchievements,
          ...accountLocal.unlockedAchievements,
        ]),
      ),
      hasHydrated: true,
      pendingLevelUp: null,
      pendingAchievements: [],
    };
    set(merged);
    await persistFromState(get());
    await syncXpToServer(false, merged.xp);
  },
  applyAnswer: async (isCorrect: boolean) => {
    const previous = get();
    const nextXp = applyQuizXp(previous.xp, isCorrect);
    const totalCorrect = isCorrect
      ? previous.totalCorrect + 1
      : previous.totalCorrect;
    const consecutiveCorrect = isCorrect ? previous.consecutiveCorrect + 1 : 0;
    const level = getLevelFromXp(nextXp);
    const unlocked = detectNewAchievements({
      totalCorrect,
      consecutiveCorrect,
      level,
      unlockedIds: previous.unlockedAchievements,
    });
    const unlockedIds = [
      ...previous.unlockedAchievements,
      ...unlocked.map((item) => item.id),
    ];
    const leveled = didLevelUp(previous.xp, nextXp);

    set({
      xp: nextXp,
      totalCorrect,
      consecutiveCorrect,
      unlockedAchievements: unlockedIds,
      pendingLevelUp: leveled ? level : previous.pendingLevelUp,
      pendingAchievements: unlocked,
    });
    await persistFromState(get());
    await syncXpToServer(get().isGuest, nextXp);
    return unlocked;
  },
  loginAsUser: async (user: SessionUser) => {
    const guest = get();
    const accountLocal =
      (await loadProgress(user.id)) ?? createEmptyProgress(user.id, user.name);
    const mergedXp = mergeProgressXp(
      Math.max(guest.xp, accountLocal.xp),
      user.xp,
    );
    set({
      userId: user.id,
      displayName: user.name,
      email: user.email,
      isGuest: false,
      xp: mergedXp,
      avatarId: user.avatarId,
      totalCorrect: Math.max(guest.totalCorrect, accountLocal.totalCorrect),
      consecutiveCorrect: Math.max(
        guest.consecutiveCorrect,
        accountLocal.consecutiveCorrect,
      ),
      unlockedAchievements: Array.from(
        new Set([
          ...guest.unlockedAchievements,
          ...accountLocal.unlockedAchievements,
        ]),
      ),
      hasHydrated: true,
    });
    await persistFromState(get());
    await syncXpToServer(false, mergedXp);
  },
  logoutToGuest: async () => {
    const guest = (await loadProgress(GUEST_USER_ID)) ?? createEmptyProgress();
    set({
      ...guest,
      email: null,
      isGuest: true,
      hasHydrated: true,
      pendingLevelUp: null,
      pendingAchievements: [],
    });
  },
  clearLevelUp: () => set({ pendingLevelUp: null }),
  clearAchievements: () => set({ pendingAchievements: [] }),
}));

export function selectPlayerLevel(state: PlayerStore): number {
  return getLevelFromXp(state.xp);
}
