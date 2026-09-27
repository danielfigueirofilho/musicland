import { AudioLines, GanttChart, Music, Piano, Spline } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { QuizModuleId } from "@/types";

const MODULES: ReadonlyArray<{
  id: QuizModuleId;
  title: string;
  description: string;
  status: "available-soon" | "phase-2";
  icon: LucideIcon;
}> = [
  {
    id: "score-reading",
    title: "Leitura de partitura",
    description: "Identifique notas na clave de sol — o primeiro módulo jogável.",
    status: "available-soon",
    icon: Music,
  },
  {
    id: "rhythm",
    title: "Ritmo",
    description: "Reconheça padrões rítmicos de ouvido e na escrita.",
    status: "phase-2",
    icon: AudioLines,
  },
  {
    id: "scales",
    title: "Escalas",
    description: "Maior e menor, com formação e sonoridade.",
    status: "phase-2",
    icon: Piano,
  },
  {
    id: "intervals",
    title: "Intervalos",
    description: "A distância entre duas notas, visual e auditiva.",
    status: "phase-2",
    icon: Spline,
  },
  {
    id: "harmony",
    title: "Harmonia",
    description: "Acordes básicos e como eles se encaixam.",
    status: "phase-2",
    icon: GanttChart,
  },
];

/**
 * Prévia dos módulos de quiz. Apenas leitura de partitura entra na FASE 1 (F4).
 */
export function ModulesTeaser() {
  return (
    <section id="modulos" aria-labelledby="modulos-heading">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            Trilha
          </p>
          <h2
            id="modulos-heading"
            className="font-heading text-foreground mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Cinco módulos, um caminho
          </h2>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            Começamos pela leitura na pauta. Ritmo, escalas, intervalos e
            harmonia entram na expansão.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((item) => {
            const Icon = item.icon;
            const isSoon = item.status === "available-soon";
            return (
              <li key={item.id}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs font-medium">
                        {isSoon ? "Próximo" : "Fase 2"}
                      </span>
                    </div>
                    <CardTitle className="mt-3">{item.title}</CardTitle>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
