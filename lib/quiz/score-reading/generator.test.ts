import { generateScoreReadingQuestion } from "@/lib/quiz/score-reading/generator";

function sequenceRng(values: number[]): () => number {
  let index = 0;
  return () => {
    const value = values[index % values.length] ?? 0;
    index += 1;
    return value;
  };
}

describe("generateScoreReadingQuestion", () => {
  it("produz 4 alternativas com exatamente um acerto", () => {
    const question = generateScoreReadingQuestion(sequenceRng([0.1, 0.3, 0.5, 0.7, 0.9]));
    expect(question.choices).toHaveLength(4);
    const correct = question.choices.filter(
      (choice) => choice.id === question.correctChoiceId,
    );
    expect(correct).toHaveLength(1);
    expect(question.frequencyHz).toBeGreaterThan(0);
  });

  it("embaralha as alternativas entre tentativas (CA-12)", () => {
    const first = generateScoreReadingQuestion(sequenceRng([0.11, 0.22, 0.33, 0.44, 0.55]));
    const second = generateScoreReadingQuestion(sequenceRng([0.91, 0.12, 0.73, 0.04, 0.65]));
    const firstOrder = first.choices.map((choice) => choice.noteName).join("");
    const secondOrder = second.choices.map((choice) => choice.noteName).join("");
    expect(firstOrder).not.toBe(secondOrder);
  });
});
