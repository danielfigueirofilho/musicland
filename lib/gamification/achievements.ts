import type { Achievement, AchievementId } from "@/types";

export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: "first-hit",
    title: "Primeiro Acerto",
    description: "Respondeu corretamente um quiz.",
  },
  {
    id: "five-correct",
    title: "Cinco no alvo",
    description: "Somou 5 acertos no total.",
  },
  {
    id: "ten-streak",
    title: "Ouvido afinado",
    description: "Acertou 10 quizzes seguidos.",
  },
  {
    id: "level-two",
    title: "Subiu o tom",
    description: "Alcançou o nível 2.",
  },
  {
    id: "level-three",
    title: "Solista",
    description: "Alcançou o nível 3.",
  },
] as const;

export type ProgressSnapshot = {
  totalCorrect: number;
  consecutiveCorrect: number;
  level: number;
  unlockedIds: readonly AchievementId[];
};

/**
 * Conquistas novas a desbloquear a partir do progresso atual.
 */
export function detectNewAchievements(
  snapshot: ProgressSnapshot,
): Achievement[] {
  const unlocked = new Set(snapshot.unlockedIds);
  const newly: Achievement[] = [];

  const candidates: Array<{ id: AchievementId; condition: boolean }> = [
    { id: "first-hit", condition: snapshot.totalCorrect >= 1 },
    { id: "five-correct", condition: snapshot.totalCorrect >= 5 },
    { id: "ten-streak", condition: snapshot.consecutiveCorrect >= 10 },
    { id: "level-two", condition: snapshot.level >= 2 },
    { id: "level-three", condition: snapshot.level >= 3 },
  ];

  for (const candidate of candidates) {
    if (candidate.condition && !unlocked.has(candidate.id)) {
      const achievement = ACHIEVEMENTS.find((item) => item.id === candidate.id);
      if (achievement) {
        newly.push(achievement);
      }
    }
  }

  return newly;
}

export function getAchievementById(id: AchievementId): Achievement | undefined {
  return ACHIEVEMENTS.find((item) => item.id === id);
}
