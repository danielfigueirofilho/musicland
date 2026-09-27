import {
  A4_FREQUENCY_HZ,
  midiToFrequency,
  midiToNoteName,
  noteToFrequency,
} from "@/lib/music/notes";

describe("midiToFrequency", () => {
  it("usa A4 = 440 Hz no MIDI 69", () => {
    expect(midiToFrequency(69)).toBe(A4_FREQUENCY_HZ);
  });

  it("dobra a frequência a cada oitava", () => {
    expect(midiToFrequency(81)).toBeCloseTo(880);
  });
});

describe("note helpers", () => {
  it("nomeia A4 a partir do MIDI", () => {
    expect(midiToNoteName(69)).toBe("A");
  });

  it("calcula A4 pelo nome e oitava", () => {
    expect(noteToFrequency("A", 4)).toBeCloseTo(440);
  });
});
