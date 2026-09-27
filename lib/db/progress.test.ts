import { mergeProgressXp, parseAchievements, serializeAchievements } from "@/lib/db/progress";

describe("mergeProgressXp", () => {
  it("mantém o maior XP no login", () => {
    expect(mergeProgressXp(40, 10)).toBe(40);
    expect(mergeProgressXp(5, 80)).toBe(80);
  });
});

describe("achievements JSON", () => {
  it("serializa e lê de volta", () => {
    const raw = serializeAchievements(["first-hit"]);
    expect(parseAchievements(raw)).toEqual(["first-hit"]);
  });

  it("tolera JSON inválido", () => {
    expect(parseAchievements("não-é-json")).toEqual([]);
  });
});
