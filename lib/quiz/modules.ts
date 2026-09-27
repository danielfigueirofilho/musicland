import type { QuizModule } from "@/types";

/**
 * Catálogo de módulos de quiz. Só leitura de partitura está jogável na FASE 1.
 */
export const QUIZ_MODULES: readonly QuizModule[] = [
  {
    id: "score-reading",
    title: "Leitura de partitura",
    description: "Identifique notas na clave de sol.",
    isAvailable: true,
    href: "/quizzes/score-reading",
  },
  {
    id: "rhythm",
    title: "Ritmo",
    description: "Reconheça padrões rítmicos de ouvido e na escrita.",
    isAvailable: false,
    href: null,
  },
  {
    id: "scales",
    title: "Escalas",
    description: "Maior e menor, com formação e sonoridade.",
    isAvailable: false,
    href: null,
  },
  {
    id: "intervals",
    title: "Intervalos",
    description: "A distância entre duas notas, visual e auditiva.",
    isAvailable: false,
    href: null,
  },
  {
    id: "harmony",
    title: "Harmonia",
    description: "Acordes básicos e como eles se encaixam.",
    isAvailable: false,
    href: null,
  },
] as const;
