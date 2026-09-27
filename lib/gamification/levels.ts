/**
 * Limiares de XP para os níveis 1 a 10 (CA-19).
 * O índice 0 corresponde ao nível 1 (0 XP).
 */
export const LEVEL_THRESHOLDS = [
  0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500,
] as const;

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 10;

export type LevelProgress = {
  level: number;
  xp: number;
  currentThreshold: number;
  nextThreshold: number | null;
  progressRatio: number;
};

/**
 * Converte XP acumulado no nível atual (1–10).
 * Nível = maior índice cujo limiar é ≤ XP, limitado a {@link MAX_LEVEL}.
 */
export function getLevelFromXp(xp: number): number {
  const safeXp = Math.max(0, xp);
  let level = MIN_LEVEL;

  for (let index = 0; index < LEVEL_THRESHOLDS.length; index += 1) {
    const threshold = LEVEL_THRESHOLDS[index];
    if (threshold !== undefined && safeXp >= threshold) {
      level = index + 1;
    }
  }

  return Math.min(level, MAX_LEVEL);
}

/**
 * Calcula o progresso rumo ao próximo nível, para barras de XP.
 * `progressRatio` fica entre 0 e 1 (nível máximo = 1).
 */
export function getXpProgress(xp: number): LevelProgress {
  const safeXp = Math.max(0, xp);
  const level = getLevelFromXp(safeXp);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold =
    level >= MAX_LEVEL ? null : (LEVEL_THRESHOLDS[level] ?? null);

  if (nextThreshold === null) {
    return {
      level,
      xp: safeXp,
      currentThreshold,
      nextThreshold,
      progressRatio: 1,
    };
  }

  const span = nextThreshold - currentThreshold;
  const progressRatio =
    span <= 0 ? 1 : Math.min(1, Math.max(0, (safeXp - currentThreshold) / span));

  return {
    level,
    xp: safeXp,
    currentThreshold,
    nextThreshold,
    progressRatio,
  };
}
