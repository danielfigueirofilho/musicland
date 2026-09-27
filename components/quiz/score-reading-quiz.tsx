"use client";

import { useState } from "react";

import { TrebleStaffNote } from "@/components/music/treble-staff-note";
import { QuizQuestion } from "@/components/quiz/quiz-question";
import { Button } from "@/components/ui/button";
import { useTonePlayer } from "@/hooks/use-tone-player";
import { generateScoreReadingQuestion } from "@/lib/quiz/score-reading/generator";
import type { ScoreReadingQuestion } from "@/lib/quiz/score-reading/generator";
import { usePlayerStore } from "@/stores/player-store";

/**
 * Sessão de quiz de leitura de partitura em loop.
 */
export function ScoreReadingQuiz() {
  const [question, setQuestion] = useState<ScoreReadingQuestion>(() =>
    generateScoreReadingQuestion(),
  );
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const applyAnswer = usePlayerStore((state) => state.applyAnswer);
  const { playNote, playFeedback } = useTonePlayer();

  function nextQuestion() {
    setFeedback(null);
    setQuestion(generateScoreReadingQuestion());
  }

  async function handleAnswer(isCorrect: boolean) {
    setFeedback(isCorrect ? "correct" : "incorrect");
    await playFeedback(isCorrect);
    await applyAnswer(isCorrect);
  }

  return (
    <div className="flex flex-col gap-6">
      <QuizQuestion
        key={question.id}
        question={question}
        staff={<TrebleStaffNote note={question.note} />}
        onAnswer={(isCorrect) => {
          void handleAnswer(isCorrect);
        }}
      />
      <Button
        type="button"
        variant="secondary"
        className="h-11 w-full sm:w-auto"
        onClick={() => {
          void playNote(question.frequencyHz);
        }}
      >
        Ouvir nota
      </Button>
      {feedback ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-medium" role="status">
            {feedback === "correct" ? "Acertou! +10 XP" : "Quase! −5 XP"}
          </p>
          <Button type="button" className="h-12" onClick={nextQuestion}>
            Próxima nota
          </Button>
        </div>
      ) : null}
    </div>
  );
}
