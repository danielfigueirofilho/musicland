"use client";

import { getXpProgress } from "@/lib/gamification/levels";
import { Progress } from "@/components/ui/progress";

type XpProgressBarProps = {
  xp: number;
};

/**
 * Barra de progresso rumo ao próximo nível.
 */
export function XpProgressBar({ xp }: XpProgressBarProps) {
  const progress = getXpProgress(xp);
  const percent = Math.round(progress.progressRatio * 100);
  const label =
    progress.nextThreshold === null
      ? "Nível máximo"
      : `${xp} / ${progress.nextThreshold} XP`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-muted-foreground">Próximo nível</span>
        <span className="font-medium">{label}</span>
      </div>
      <Progress
        value={percent}
        className="h-2"
        aria-label="Progresso de experiência"
      />
    </div>
  );
}
