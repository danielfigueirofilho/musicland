"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { StaffIllustration } from "@/components/music/staff-illustration";
import { Button } from "@/components/ui/button";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

/**
 * Seção hero da landing: proposta de valor + CTA principal.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 27px, color-mix(in oklch, var(--primary) 12%, transparent) 27px, color-mix(in oklch, var(--primary) 12%, transparent) 28px)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
            {APP_NAME} · {APP_TAGLINE}
          </p>
          <h1
            id="hero-heading"
            className="font-heading text-foreground text-4xl leading-[1.15] font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem]"
          >
            Teoria musical que se joga, no celular.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
            Desafios rápidos de partitura, ritmo e escalas — pensados para
            escolas públicas, centros comunitários e projetos sociais de
            Manaus. Sem cadastro na primeira jogada.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild className="h-12 px-6 text-base">
              <Link href="/home">
                Começar a jogar
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-6 text-base">
              <Link href="#como-funciona">Como funciona</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-md lg:max-w-none"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.12 }}
        >
          <StaffIllustration className="h-auto w-full drop-shadow-sm" />
        </motion.div>
      </div>
    </section>
  );
}
