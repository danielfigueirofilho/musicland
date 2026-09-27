"use client";

import { usePlayerStore } from "@/stores/player-store";

export default function SettingsPage() {
  const displayName = usePlayerStore((state) => state.displayName);
  const email = usePlayerStore((state) => state.email);

  return (
    <main className="flex max-w-lg flex-col gap-4">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Configurações
      </h1>
      <p className="text-muted-foreground text-base leading-relaxed">
        Esta rota exige login (CA-09). Visitantes são redirecionados para /login.
      </p>
      <dl className="grid gap-2 text-sm">
        <div>
          <dt className="text-muted-foreground">Nome</dt>
          <dd className="font-medium">{displayName}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">E-mail</dt>
          <dd className="font-medium">{email ?? "—"}</dd>
        </div>
      </dl>
    </main>
  );
}
