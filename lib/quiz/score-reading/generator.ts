import { noteToFrequency, type NoteName } from "@/lib/music/notes";
import { shuffle } from "@/lib/quiz/shuffle";

export const TREBLE_NOTE_NAMES: readonly NoteName[] = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
];

export const NOTE_LABEL_PT: Record<NoteName, string> = {
  C: "Dó",
  "C#": "Dó#",
  D: "Ré",
  "D#": "Ré#",
  E: "Mi",
  F: "Fá",
  "F#": "Fá#",
  G: "Sol",
  "G#": "Sol#",
  A: "Lá",
  "A#": "Lá#",
  B: "Si",
};

/**
 * Notas naturais do Dó4 ao Lá5 na clave de sol, com deslocamento na pauta.
 * 0 = primeira linha (Mi4).
 */
export const TREBLE_STAFF_NOTES = [
  { name: "C" as const, octave: 4, staffOffset: -2 },
  { name: "D" as const, octave: 4, staffOffset: -1 },
  { name: "E" as const, octave: 4, staffOffset: 0 },
  { name: "F" as const, octave: 4, staffOffset: 1 },
  { name: "G" as const, octave: 4, staffOffset: 2 },
  { name: "A" as const, octave: 4, staffOffset: 3 },
  { name: "B" as const, octave: 4, staffOffset: 4 },
  { name: "C" as const, octave: 5, staffOffset: 5 },
  { name: "D" as const, octave: 5, staffOffset: 6 },
  { name: "E" as const, octave: 5, staffOffset: 7 },
  { name: "F" as const, octave: 5, staffOffset: 8 },
  { name: "G" as const, octave: 5, staffOffset: 9 },
  { name: "A" as const, octave: 5, staffOffset: 10 },
] as const;

export type StaffNote = (typeof TREBLE_STAFF_NOTES)[number];

export type QuizChoice = {
  id: string;
  label: string;
  noteName: NoteName;
};

export type ScoreReadingQuestion = {
  id: string;
  note: StaffNote;
  frequencyHz: number;
  prompt: string;
  choices: QuizChoice[];
  correctChoiceId: string;
};

function pickIndex(length: number, rng: () => number): number {
  return Math.min(length - 1, Math.max(0, Math.floor(rng() * length)));
}

/**
 * Gera uma pergunta de leitura: uma nota na pauta e 4 alternativas embaralhadas.
 */
export function generateScoreReadingQuestion(
  rng: () => number = Math.random,
): ScoreReadingQuestion {
  const noteIndex = pickIndex(TREBLE_STAFF_NOTES.length, rng);
  const note = TREBLE_STAFF_NOTES[noteIndex] ?? TREBLE_STAFF_NOTES[0]!;

  const distractors = shuffle(
    TREBLE_NOTE_NAMES.filter((name) => name !== note.name),
    rng,
  ).slice(0, 3);

  const rawChoices: QuizChoice[] = [
    {
      id: `correct-${note.name}`,
      label: NOTE_LABEL_PT[note.name],
      noteName: note.name,
    },
    ...distractors.map((name) => ({
      id: `alt-${name}`,
      label: NOTE_LABEL_PT[name],
      noteName: name,
    })),
  ];

  const choices = shuffle(rawChoices, rng);
  const correct = choices.find((choice) => choice.noteName === note.name);

  return {
    id: `${note.name}${note.octave}-${Math.round(rng() * 1_000_000)}`,
    note,
    frequencyHz: noteToFrequency(note.name, note.octave),
    prompt: "Qual é o nome desta nota?",
    choices,
    correctChoiceId: correct?.id ?? rawChoices[0]!.id,
  };
}
