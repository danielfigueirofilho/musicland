import { getLevelFromXp } from "@/lib/gamification/levels";

export const XP_CORRECT = 10;
export const XP_INCORRECT = -5;
export const MIN_XP = 0;

/**
 * Aplica o delta de XP de uma resposta de quiz, sem deixar o total negativo.
 * Acerto: +10. Erro: −5 (mínimo 0).
 */
export function applyQuizXp(currentXp: number, isCorrect: boolean): number {
  const delta = isCorrect ? XP_CORRECT : XP_INCORRECT;
  return Math.max(MIN_XP, currentXp + delta);
}

/**
 * Indica se o novo XP cruzou o limiar de um nível acima do XP anterior.
 */
export function didLevelUp(previousXp: number, nextXp: number): boolean {
  return getLevelFromXp(nextXp) > getLevelFromXp(previousXp);
}
