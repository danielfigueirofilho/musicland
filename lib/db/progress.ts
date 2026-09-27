import type { AchievementId } from "@/types";

export const CLIENT_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS player_progress (
  user_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  xp INTEGER NOT NULL,
  avatar_id TEXT NOT NULL,
  total_correct INTEGER NOT NULL,
  consecutive_correct INTEGER NOT NULL,
  unlocked_achievements TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;

export type ProgressRecord = {
  userId: string;
  displayName: string;
  xp: number;
  avatarId: string;
  totalCorrect: number;
  consecutiveCorrect: number;
  unlockedAchievements: AchievementId[];
};

export const GUEST_USER_ID = "guest";

/**
 * Escolhe o maior XP entre visitante e conta (merge no login).
 */
export function mergeProgressXp(guestXp: number, accountXp: number): number {
  return Math.max(Math.max(0, guestXp), Math.max(0, accountXp));
}

export function serializeAchievements(ids: readonly AchievementId[]): string {
  return JSON.stringify(ids);
}

export function parseAchievements(raw: string): AchievementId[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item): item is AchievementId => typeof item === "string");
  } catch {
    return [];
  }
}
