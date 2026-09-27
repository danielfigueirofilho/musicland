import {
  getLevelFromXp,
  getXpProgress,
  LEVEL_THRESHOLDS,
  MAX_LEVEL,
} from "@/lib/gamification/levels";

describe("getLevelFromXp", () => {
  it("retorna nível 1 para XP zero ou negativo", () => {
    expect(getLevelFromXp(0)).toBe(1);
    expect(getLevelFromXp(-20)).toBe(1);
  });

  it("segue exatamente a tabela de limiares", () => {
    expect(getLevelFromXp(99)).toBe(1);
    expect(getLevelFromXp(100)).toBe(2);
    expect(getLevelFromXp(299)).toBe(2);
    expect(getLevelFromXp(300)).toBe(3);
    expect(getLevelFromXp(600)).toBe(4);
    expect(getLevelFromXp(1000)).toBe(5);
    expect(getLevelFromXp(1500)).toBe(6);
    expect(getLevelFromXp(2100)).toBe(7);
    expect(getLevelFromXp(2800)).toBe(8);
    expect(getLevelFromXp(3600)).toBe(9);
    expect(getLevelFromXp(4500)).toBe(10);
    expect(getLevelFromXp(99999)).toBe(MAX_LEVEL);
  });

  it("possui 10 limiares", () => {
    expect(LEVEL_THRESHOLDS).toHaveLength(10);
  });
});

describe("getXpProgress", () => {
  it("calcula a razão rumo ao próximo nível", () => {
    const progress = getXpProgress(50);
    expect(progress.level).toBe(1);
    expect(progress.nextThreshold).toBe(100);
    expect(progress.progressRatio).toBe(0.5);
  });

  it("marca progresso completo no nível máximo", () => {
    const progress = getXpProgress(4500);
    expect(progress.level).toBe(10);
    expect(progress.nextThreshold).toBeNull();
    expect(progress.progressRatio).toBe(1);
  });
});
