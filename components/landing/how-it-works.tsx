"use client";

import { GraduationCap, PlayCircle, Trophy } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STEPS: ReadonlyArray<{
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    step: "01",
    title: "Joga",
    description:
      "Responda quizzes curtos: reconheça notas na pauta, ritmos e escalas no tempo de um intervalo.",
    icon: PlayCircle,
  },
  {
    step: "02",
    title: "Evolui",
    description:
      "Cada acerto vira XP. Suba de nível, desbloqueie avatares e acompanhe o progresso na hora.",
    icon: Trophy,
  },
  {
    step: "03",
    title: "Aprende",
    description:
      "A teoria entra na prática: leitura, ritmo, escalas, intervalos e harmonia, um desafio de cada vez.",
    icon: GraduationCap,
  },
];

/**
 * Explica o conceito em três passos visuais: Joga → Evolui → Aprende.
 */
export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="como-funciona"
      className="bg-secondary/60 border-border border-y"
      aria-labelledby="como-funciona-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            Em três tempos
          </p>
          <h2
            id="como-funciona-heading"
            className="font-heading text-foreground mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Joga, evolui, aprende
          </h2>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            Um ciclo curto o bastante para a sala de aula e o celular, e
            profundo o bastante para firmar a teoria.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.step}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.08 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <span className="text-primary font-heading text-sm font-semibold">
                      {item.step}
                    </span>
                    <CardTitle className="mt-3 flex items-center gap-2 text-2xl">
                      <Icon className="text-primary size-6" aria-hidden="true" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
