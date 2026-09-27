import { ModuleCard } from "@/components/game/module-card";
import { QUIZ_MODULES } from "@/lib/quiz/modules";

export default function QuizzesPage() {
  return (
    <main className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-base leading-relaxed">
          Comece pela leitura de partitura. Os outros módulos entram na expansão.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {QUIZ_MODULES.map((module) => (
          <li key={module.id}>
            <ModuleCard module={module} />
          </li>
        ))}
      </ul>
    </main>
  );
}
