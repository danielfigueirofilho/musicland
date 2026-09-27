/** @vitest-environment node */
import {
  createSessionToken,
  getSessionExpiry,
  SESSION_TTL_SECONDS,
  verifySessionToken,
} from "@/lib/auth/session";

describe("session TTL", () => {
  it("expira em 7 dias (CA-08)", () => {
    expect(SESSION_TTL_SECONDS).toBe(7 * 24 * 60 * 60);
    const from = new Date("2026-01-01T00:00:00.000Z");
    const expiry = getSessionExpiry(from);
    expect(expiry.toISOString()).toBe("2026-01-08T00:00:00.000Z");
  });
});

describe("createSessionToken / verifySessionToken", () => {
  it("assina e verifica o payload", async () => {
    const token = await createSessionToken({
      userId: "user-1",
      email: "ana@escola.com",
      displayName: "Ana",
    });
    const payload = await verifySessionToken(token);
    expect(payload).toEqual({
      userId: "user-1",
      email: "ana@escola.com",
      displayName: "Ana",
    });
  });

  it("rejeita token inválido", async () => {
    await expect(verifySessionToken("token.lixo")).resolves.toBeNull();
  });
});
