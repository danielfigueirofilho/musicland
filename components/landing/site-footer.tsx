import Link from "next/link";

import { BrandLogo } from "@/components/brand/logo";
import { APP_CITY, APP_NAME, APP_TAGLINE } from "@/lib/constants";

/**
 * Rodapé institucional da landing.
 */
export function SiteFooter() {
  return (
    <footer className="border-border bg-background border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <BrandLogo />
          <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
            {APP_NAME} — {APP_TAGLINE}. Atividade Extensionista II · CST em
            Análise e Desenvolvimento de Sistemas · {APP_CITY}.
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-col gap-2 text-sm">
          <Link className="text-muted-foreground hover:text-foreground" href="#como-funciona">
            Como funciona
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" href="/home">
            Jogar como visitante
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" href="/login">
            Entrar
          </Link>
        </nav>
      </div>
    </footer>
  );
}
