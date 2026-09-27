"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Trophy, UserRound } from "lucide-react";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/brand/logo";
import { MuteToggle } from "@/components/game/mute-toggle";
import { PlayerHydration } from "@/components/game/player-hydration";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/stores/player-store";

const NAV = [
  { href: "/home", label: "Início", icon: Home },
  { href: "/quizzes", label: "Quizzes", icon: Trophy },
  { href: "/profile", label: "Perfil", icon: UserRound },
] as const;

type DashboardShellProps = {
  children: ReactNode;
};

/**
 * Shell da área do jogador: nav mobile, mute e sessão.
 */
export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isGuest = usePlayerStore((state) => state.isGuest);
  const displayName = usePlayerStore((state) => state.displayName);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    await usePlayerStore.getState().logoutToGuest();
    router.push("/home");
    router.refresh();
  }

  return (
    <div className="bg-background flex min-h-full flex-1 flex-col pb-20 md:pb-0">
      <PlayerHydration />
      <header className="border-border bg-background/90 sticky top-0 z-30 border-b backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/home" className="rounded-lg focus-visible:ring-ring focus-visible:ring-3">
            <BrandLogo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Área do jogador">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Button
                  key={item.href}
                  asChild
                  variant={active ? "secondary" : "ghost"}
                  className="h-10"
                >
                  <Link href={item.href} aria-current={active ? "page" : undefined}>
                    <Icon />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <MuteToggle />
            {isGuest ? (
              <Button asChild className="h-10">
                <Link href="/login">Entrar</Link>
              </Button>
            ) : (
              <Button type="button" variant="outline" className="h-10" onClick={() => void handleLogout()}>
                Sair
              </Button>
            )}
          </div>
        </div>
        <p className="sr-only">Jogador atual: {displayName}</p>
      </header>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </div>
      <nav
        className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-30 border-t md:hidden"
        aria-label="Navegação inferior"
      >
        <ul className="grid grid-cols-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 py-3 text-xs font-medium",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
