let tonePromise: Promise<typeof import("tone")> | null = null;
let synth: import("tone").Synth | null = null;
let audioUnlocked = false;

async function loadTone(): Promise<typeof import("tone")> {
  if (!tonePromise) {
    tonePromise = import("tone");
  }
  return tonePromise;
}

/**
 * Inicia o contexto de áudio só após gesto do usuário (CA-20).
 */
export async function unlockAudioContext(): Promise<void> {
  const Tone = await loadTone();
  await Tone.start();
  audioUnlocked = true;
}

export function isAudioUnlocked(): boolean {
  return audioUnlocked;
}

/**
 * Toca uma frequência em Hz (A4 = 440 no gerador). Respeita mute.
 */
export async function playFrequency(
  frequencyHz: number,
  options: { muted: boolean; duration?: string },
): Promise<void> {
  if (options.muted) {
    return;
  }

  const Tone = await loadTone();
  if (!audioUnlocked) {
    await Tone.start();
    audioUnlocked = true;
  }

  if (!synth) {
    synth = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.2 },
    }).toDestination();
  }

  const now = Tone.now();
  synth.triggerAttackRelease(frequencyHz, options.duration ?? "8n", now);
}

/**
 * Feedback sonoro curto de acerto (quinta justa) ou erro (segunda menor).
 */
export async function playAnswerFeedback(
  isCorrect: boolean,
  muted: boolean,
): Promise<void> {
  if (muted) {
    return;
  }
  await playFrequency(isCorrect ? 660 : 220, { muted, duration: "16n" });
}
