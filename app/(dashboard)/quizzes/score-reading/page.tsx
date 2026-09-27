import type { Metadata } from "next";

import { ScoreReadingQuiz } from "@/components/quiz/score-reading-quiz";

export const metadata: Metadata = {
  title: "Leitura de partitura",
};

export default function ScoreReadingPage() {
  return (
    <main>
      <ScoreReadingQuiz />
    </main>
  );
}
