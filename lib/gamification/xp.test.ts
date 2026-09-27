import { applyQuizXp, didLevelUp, MIN_XP } from "@/lib/gamification/xp";

describe("applyQuizXp", () => {
  it("soma 10 XP em acerto", () => {
    expect(applyQuizXp(0, true)).toBe(10);
  });

  it("subtrai 5 XP em erro sem ficar negativo", () => {
    expect(applyQuizXp(3, false)).toBe(MIN_XP);
    expect(applyQuizXp(20, false)).toBe(15);
  });
});

describe("didLevelUp", () => {
  it("detecta a passagem de nível no limiar 100", () => {
    expect(didLevelUp(90, 100)).toBe(true);
    expect(didLevelUp(80, 90)).toBe(false);
  });
});
