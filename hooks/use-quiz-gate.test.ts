import { act, renderHook } from "@testing-library/react";

import { QUIZ_GATE_MS, useQuizGate } from "@/hooks/use-quiz-gate";

describe("useQuizGate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("trava respostas por 5 segundos (CA-10)", () => {
    const { result } = renderHook(() => useQuizGate("q1"));
    expect(result.current.isLocked).toBe(true);
    expect(QUIZ_GATE_MS).toBe(5000);

    act(() => {
      vi.advanceTimersByTime(4999);
    });
    expect(result.current.isLocked).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2);
    });
    expect(result.current.isLocked).toBe(false);
  });
});
