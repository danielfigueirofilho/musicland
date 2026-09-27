import { applyQuizXp, didLevelUp } from "@/lib/gamification/xp";
import { getLevelFromXp } from "@/lib/gamification/levels";
import { detectNewAchievements } from "@/lib/gamification/achievements";

describe("fluxo de resposta (store-like)", () => {
  it("atualiza XP, detecta level-up e conquista", () => {
    let xp = 90;
    const previousXp = xp;
    xp = applyQuizXp(xp, true);
    expect(xp).toBe(100);
    expect(didLevelUp(previousXp, xp)).toBe(true);
    expect(getLevelFromXp(xp)).toBe(2);

    const unlocked = detectNewAchievements({
      totalCorrect: 1,
      consecutiveCorrect: 1,
      level: 2,
      unlockedIds: [],
    });
    expect(unlocked.map((item) => item.id)).toEqual(
      expect.arrayContaining(["first-hit", "level-two"]),
    );
  });
});
