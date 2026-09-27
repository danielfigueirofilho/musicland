import { getLevelFromXp } from "@/lib/gamification/levels";

type LevelBadgeProps = {
  xp: number;
};

/**
 * Exibe o nível atual derivado do XP (CA-19).
 */
export function LevelBadge({ xp }: LevelBadgeProps) {
  const level = getLevelFromXp(xp);

  return (
    <span className="bg-primary text-primary-foreground inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold">
      Nível {level}
    </span>
  );
}
