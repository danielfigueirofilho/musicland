"use client";

import Link from "next/link";

import { LevelBadge } from "@/components/game/level-badge";
import { PlayerAvatar } from "@/components/game/player-avatar";
import { XpProgressBar } from "@/components/game/xp-progress-bar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePlayerStore } from "@/stores/player-store";

export default function ProfilePage() {
  const displayName = usePlayerStore((state) => state.displayName);
  const email = usePlayerStore((state) => state.email);
  const xp = usePlayerStore((state) => state.xp);
  const isGuest = usePlayerStore((state) => state.isGuest);

  return (
    <main className="flex flex-col gap-6">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">Perfil</h1>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <PlayerAvatar name={displayName} />
          <div>
            <CardTitle>{displayName}</CardTitle>
            <CardDescription>
              {isGuest ? "Jogando como visitante" : email}
            </CardDescription>
          </div>
          <LevelBadge xp={xp} />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <XpProgressBar xp={xp} />
          {isGuest ? (
            <Button asChild className="h-11 w-full sm:w-auto">
              <Link href="/register">Criar conta para guardar o progresso</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
              <Link href="/settings">Configurações da conta</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
