/** Afinação de referência (A4), conforme CA-14. */
export const A4_FREQUENCY_HZ = 440;

/** Número MIDI de A4 (ISO). */
export const A4_MIDI = 69;

export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

/**
 * Converte um número MIDI na frequência em Hz (temperamento igual, A4 = 440 Hz).
 */
export function midiToFrequency(midiNote: number): number {
  return A4_FREQUENCY_HZ * 2 ** ((midiNote - A4_MIDI) / 12);
}

/**
 * Nome da nota cromática a partir do número MIDI (sem oitava).
 */
export function midiToNoteName(midiNote: number): NoteName {
  const index = ((Math.round(midiNote) % 12) + 12) % 12;
  return NOTE_NAMES[index] ?? "C";
}

/**
 * Frequência de uma nota nomeada na oitava científica (C4 = dó central).
 */
export function noteToFrequency(note: NoteName, octave: number): number {
  const noteIndex = NOTE_NAMES.indexOf(note);
  const midi = (octave + 1) * 12 + noteIndex;
  return midiToFrequency(midi);
}
