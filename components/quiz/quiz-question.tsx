"use client";

import { useId, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useQuizGate } from "@/hooks/use-quiz-gate";
import type { QuizChoice, ScoreReadingQuestion } from "@/lib/quiz/score-reading/generator";
import { cn } from "@/lib/utils";

type QuizQuestionProps = {
  question: ScoreReadingQuestion;
  staff: ReactNode;
  onAnswer: (isCorrect: boolean) => void;
};

/**
 * Alternativas do quiz com gate de 5s, teclado e feedback visual (CA-10, CA-11, CA-25).
 */
export function QuizQuestion({ question, staff, onAnswer }: QuizQuestionProps) {
  const headingId = useId();
  const { remainingMs, isLocked } = useQuizGate(question.id);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const seconds = Math.ceil(remainingMs / 1000);

  function handleChoice(choice: QuizChoice) {
    if (isLocked || selectedId) {
      return;
    }
    const isCorrect = choice.id === question.correctChoiceId;
    setSelectedId(choice.id);
    onAnswer(isCorrect);
  }

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 id={headingId} className="font-heading text-2xl font-semibold sm:text-3xl">
          {question.prompt}
        </h1>
        <p className="text-muted-foreground text-sm" aria-live="polite">
          {isLocked
            ? `Observe a pauta. Respostas em ${seconds}s.`
            : "Escolha uma alternativa. Use Tab e Enter."}
        </p>
      </div>
      <div className="bg-card text-foreground rounded-2xl border p-4 sm:p-6">{staff}</div>
      <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Alternativas">
        {question.choices.map((choice) => {
          const isSelected = selectedId === choice.id;
          const isCorrectChoice = choice.id === question.correctChoiceId;
          return (
            <Button
              key={choice.id}
              type="button"
              variant="outline"
              className={cn(
                "h-14 justify-start px-4 text-base",
                isSelected && isCorrectChoice && "border-primary bg-primary/15",
                isSelected && !isCorrectChoice && "border-destructive bg-destructive/10",
              )}
              disabled={isLocked}
              aria-pressed={isSelected}
              onClick={() => handleChoice(choice)}
            >
              {choice.label}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
