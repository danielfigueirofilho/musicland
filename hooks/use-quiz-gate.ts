"use client";

import { useEffect, useState } from "react";

export const QUIZ_GATE_MS = 5000;

type UseQuizGateResult = {
  remainingMs: number;
  isLocked: boolean;
};

/**
 * Impede resposta nos primeiros 5 segundos da pergunta (CA-10).
 */
export function useQuizGate(questionKey: string, durationMs = QUIZ_GATE_MS): UseQuizGateResult {
  const [state, setState] = useState({ key: questionKey, remainingMs: durationMs });

  if (state.key !== questionKey) {
    setState({ key: questionKey, remainingMs: durationMs });
  }

  useEffect(() => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const remainingMs = Math.max(0, durationMs - (Date.now() - startedAt));
      setState((current) =>
        current.key === questionKey ? { key: questionKey, remainingMs } : current,
      );
      if (remainingMs <= 0) {
        window.clearInterval(timer);
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, [questionKey, durationMs]);

  return {
    remainingMs: state.remainingMs,
    isLocked: state.remainingMs > 0,
  };
}
