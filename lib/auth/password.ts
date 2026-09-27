import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Gera o hash bcrypt da senha. Nunca persistir texto plano.
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

/**
 * Compara senha em texto com o hash armazenado.
 */
export async function verifyPassword(
  plainPassword: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, passwordHash);
}
