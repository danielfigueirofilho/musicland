"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#modulos", label: "Módulos" },
  { href: "#impacto", label: "Impacto" },
] as const;

/**
 * Cabeçalho fixo da landing, com menu mobile acessível por teclado.
 */
export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-border/80 bg-background/90 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="rounded-lg focus-visible:ring-ring focus-visible:ring-3">
          <BrandLogo />
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Seções da página inicial"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild className="h-10 px-4">
            <Link href="/home">Começar a jogar</Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isOpen ? (
        <div
          id="menu-mobile"
          className="border-border border-t px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Menu mobile">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground rounded-lg px-2 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="outline" asChild className="h-11">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Entrar
              </Link>
            </Button>
            <Button asChild className="h-11">
              <Link href="/home" onClick={() => setIsOpen(false)}>
                Começar a jogar
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
