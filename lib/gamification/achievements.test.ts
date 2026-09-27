import { detectNewAchievements } from "@/lib/gamification/achievements";

describe("detectNewAchievements", () => {
  it("desbloqueia Primeiro Acerto no primeiro quiz correto", () => {
    const unlocked = detectNewAchievements({
      totalCorrect: 1,
      consecutiveCorrect: 1,
      level: 1,
      unlockedIds: [],
    });
    expect(unlocked.map((item) => item.id)).toContain("first-hit");
  });

  it("não repete conquista já desbloqueada", () => {
    const unlocked = detectNewAchievements({
      totalCorrect: 2,
      consecutiveCorrect: 2,
      level: 1,
      unlockedIds: ["first-hit"],
    });
    expect(unlocked.map((item) => item.id)).not.toContain("first-hit");
  });
});
