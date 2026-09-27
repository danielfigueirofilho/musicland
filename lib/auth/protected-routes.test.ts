import { isProtectedPath } from "@/lib/auth/protected-routes";

describe("isProtectedPath", () => {
  it("protege /settings e subrotas (CA-09)", () => {
    expect(isProtectedPath("/settings")).toBe(true);
    expect(isProtectedPath("/settings/account")).toBe(true);
  });

  it("deixa o fluxo visitante aberto", () => {
    expect(isProtectedPath("/home")).toBe(false);
    expect(isProtectedPath("/quizzes")).toBe(false);
    expect(isProtectedPath("/login")).toBe(false);
  });
});
