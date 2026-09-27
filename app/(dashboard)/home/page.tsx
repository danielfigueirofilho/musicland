"use client";

import { LevelBadge } from "@/components/game/level-badge";
import { ModuleCard } from "@/components/game/module-card";
import { PlayerAvatar } from "@/components/game/player-avatar";
import { XpProgressBar } from "@/components/game/xp-progress-bar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAchievementById } from "@/lib/gamification/achievements";
import { QUIZ_MODULES } from "@/lib/quiz/modules";
import { usePlayerStore } from "@/stores/player-store";

export default function HomePage() {
  const displayName = usePlayerStore((state) => state.displayName);
  const xp = usePlayerStore((state) => state.xp);
  const isGuest = usePlayerStore((state) => state.isGuest);
  const unlocked = usePlayerStore((state) => state.unlockedAchievements);
  const recent = unlocked
    .slice(-3)
    .reverse()
    .map((id) => getAchievementById(id))
    .filter((item) => item !== undefined);

  return (
    <main className="flex flex-col gap-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <PlayerAvatar name={displayName} />
          <div>
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">
              {isGuest ? "Visitante" : "Jogador"}
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">
              Olá, {displayName}
            </h1>
          </div>
        </div>
        <LevelBadge xp={xp} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Experiência</CardTitle>
          <CardDescription>{xp} XP acumulados</CardDescription>
        </CardHeader>
        <CardContent>
          <XpProgressBar xp={xp} />
        </CardContent>
      </Card>

      <section aria-labelledby="conquistas-heading">
        <h2 id="conquistas-heading" className="font-heading text-xl font-semibold">
          Conquistas recentes
        </h2>
        {recent.length === 0 ? (
          <p className="text-muted-foreground mt-2 text-sm">
            Complete um quiz para desbloquear a primeira medalha.
          </p>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {recent.map((item) => (
              <li key={item.id} className="rounded-2xl border px-4 py-3">
                <p className="font-medium">{item.title}</p>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="modulos-heading">
        <h2 id="modulos-heading" className="font-heading text-xl font-semibold">
          Módulos
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {QUIZ_MODULES.map((module) => (
            <li key={module.id}>
              <ModuleCard module={module} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
