const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 6;
export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 80;

/**
 * Valida formato básico de e-mail (CA-07).
 */
export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) {
    return false;
  }
  return EMAIL_PATTERN.test(trimmed);
}

/**
 * Senha com no mínimo 6 caracteres (CA-07).
 */
export function isValidPassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}

/**
 * Nome de exibição não vazio, sem espaços só.
 */
export function isValidDisplayName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= MIN_NAME_LENGTH && trimmed.length <= MAX_NAME_LENGTH;
}

export type AuthValidationError = {
  field: "name" | "email" | "password";
  message: string;
};

/**
 * Valida o payload de cadastro e devolve a lista de erros (vazia se ok).
 */
export function validateRegisterInput(input: {
  name: string;
  email: string;
  password: string;
}): AuthValidationError[] {
  const errors: AuthValidationError[] = [];

  if (!isValidDisplayName(input.name)) {
    errors.push({
      field: "name",
      message: `Informe um nome entre ${MIN_NAME_LENGTH} e ${MAX_NAME_LENGTH} caracteres.`,
    });
  }

  if (!isValidEmail(input.email)) {
    errors.push({ field: "email", message: "Informe um e-mail válido." });
  }

  if (!isValidPassword(input.password)) {
    errors.push({
      field: "password",
      message: `A senha precisa ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`,
    });
  }

  return errors;
}

/**
 * Valida o payload de login.
 */
export function validateLoginInput(input: {
  email: string;
  password: string;
}): AuthValidationError[] {
  const errors: AuthValidationError[] = [];

  if (!isValidEmail(input.email)) {
    errors.push({ field: "email", message: "Informe um e-mail válido." });
  }

  if (!isValidPassword(input.password)) {
    errors.push({
      field: "password",
      message: `A senha precisa ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`,
    });
  }

  return errors;
}
