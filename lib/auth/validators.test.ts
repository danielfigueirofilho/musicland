import {
  isValidDisplayName,
  isValidEmail,
  isValidPassword,
  MIN_PASSWORD_LENGTH,
  validateLoginInput,
  validateRegisterInput,
} from "@/lib/auth/validators";

describe("isValidEmail", () => {
  it("aceita e-mails simples", () => {
    expect(isValidEmail("aluno@escola.com")).toBe(true);
  });

  it("rejeita valores sem @ ou domínio", () => {
    expect(isValidEmail("aluno")).toBe(false);
    expect(isValidEmail("aluno@")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("isValidPassword", () => {
  it("exige o mínimo de caracteres (CA-07)", () => {
    expect(isValidPassword("12345")).toBe(false);
    expect(isValidPassword("123456")).toBe(true);
    expect(MIN_PASSWORD_LENGTH).toBe(6);
  });
});

describe("validateRegisterInput", () => {
  it("devolve erros de nome, e-mail e senha", () => {
    const errors = validateRegisterInput({
      name: "A",
      email: "invalido",
      password: "123",
    });
    expect(errors.map((error) => error.field)).toEqual([
      "name",
      "email",
      "password",
    ]);
  });

  it("aceita cadastro válido", () => {
    expect(
      validateRegisterInput({
        name: "Ana",
        email: "ana@escola.com",
        password: "segredo",
      }),
    ).toEqual([]);
  });
});

describe("validateLoginInput", () => {
  it("rejeita e-mail inválido", () => {
    const errors = validateLoginInput({ email: "x", password: "123456" });
    expect(errors[0]?.field).toBe("email");
  });
});

describe("isValidDisplayName", () => {
  it("rejeita só espaços", () => {
    expect(isValidDisplayName("   ")).toBe(false);
  });
});
