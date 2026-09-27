import { midiToFrequency, noteToFrequency } from "@/lib/music/notes";
import { generateScoreReadingQuestion } from "@/lib/quiz/score-reading/generator";

describe("afinação do quiz (CA-14)", () => {
  it("A4 continua em 440 Hz", () => {
    expect(noteToFrequency("A", 4)).toBe(440);
    expect(midiToFrequency(69)).toBe(440);
  });

  it("a pergunta usa a frequência da nota exibida", () => {
    const question = generateScoreReadingQuestion(() => 0);
    expect(question.frequencyHz).toBe(
      noteToFrequency(question.note.name, question.note.octave),
    );
  });
});
