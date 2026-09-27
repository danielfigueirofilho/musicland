import { hashPassword, verifyPassword } from "@/lib/auth/password";

describe("hashPassword / verifyPassword", () => {
  it("não persiste a senha em texto plano", async () => {
    const hash = await hashPassword("segredo123");
    expect(hash).not.toBe("segredo123");
    expect(hash.startsWith("$2")).toBe(true);
  });

  it("valida a senha correta e rejeita a errada", async () => {
    const hash = await hashPassword("segredo123");
    await expect(verifyPassword("segredo123", hash)).resolves.toBe(true);
    await expect(verifyPassword("outra", hash)).resolves.toBe(false);
  });
});
