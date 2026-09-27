import { UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

type PlayerAvatarProps = {
  name: string;
  className?: string;
};

/**
 * Avatar placeholder (F6 trará as artes desbloqueáveis).
 */
export function PlayerAvatar({ name, className }: PlayerAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "V";

  return (
    <div
      className={cn(
        "bg-accent text-accent-foreground flex size-16 items-center justify-center rounded-2xl text-2xl font-semibold",
        className,
      )}
      aria-hidden="true"
    >
      {initial || <UserRound className="size-8" />}
    </div>
  );
}
