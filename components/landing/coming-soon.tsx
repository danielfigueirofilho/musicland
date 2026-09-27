import Link from "next/link";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

type ComingSoonProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

/**
 * Página-ponte para rotas que entram nas próximas funcionalidades da FASE 1.
 */
export function ComingSoon({ title, description, children }: ComingSoonProps) {
  return (
    <div className="bg-background flex min-h-full flex-1 flex-col">
      <header className="border-border border-b">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
          <Link href="/" className="rounded-lg focus-visible:ring-ring focus-visible:ring-3">
            <BrandLogo />
          </Link>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-16 sm:px-6">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-3 text-base leading-relaxed">{description}</p>
        {children}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-11 px-5">
            <Link href="/">Voltar à página inicial</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 px-5">
            <Link href="/home">Continuar como visitante</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
