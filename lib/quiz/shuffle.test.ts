import { shuffle } from "@/lib/quiz/shuffle";

describe("shuffle", () => {
  it("mantém os mesmos elementos", () => {
    const items = [1, 2, 3, 4];
    const shuffled = shuffle(items, () => 0.2);
    expect(shuffled.sort()).toEqual(items);
  });

  it("muda a ordem quando o RNG não é constante 0", () => {
    let seed = 0.1;
    const rng = () => {
      seed = (seed * 17 + 0.13) % 1;
      return seed;
    };
    const original = ["A", "B", "C", "D"];
    const first = shuffle(original, rng).join("");
    seed = 0.7;
    const second = shuffle(original, rng).join("");
    expect(first).not.toBe(second);
  });
});
