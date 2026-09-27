import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

import { SERVER_SCHEMA_SQL, type UserRow } from "@/lib/db/schema";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "musicland.db");

let database: DatabaseSync | null = null;

/**
 * Conexão SQLite singleton no servidor (arquivo local em dev).
 * Em produção na Vercel o disco não persiste — use Turso/libSQL.
 */
export function getServerDb(): DatabaseSync {
  if (database) {
    return database;
  }

  mkdirSync(DB_DIR, { recursive: true });
  database = new DatabaseSync(DB_PATH);
  database.exec("PRAGMA journal_mode = WAL;");
  database.exec(SERVER_SCHEMA_SQL);
  return database;
}

/**
 * Busca usuário pelo e-mail (case-insensitive).
 */
export function findUserByEmail(email: string): UserRow | null {
  const db = getServerDb();
  const statement = db.prepare(
    "SELECT id, name, email, password_hash, xp, avatar_id, created_at FROM users WHERE email = ? COLLATE NOCASE",
  );
  const row = statement.get(email.trim()) as UserRow | undefined;
  return row ?? null;
}

/**
 * Busca usuário pelo id.
 */
export function findUserById(id: string): UserRow | null {
  const db = getServerDb();
  const statement = db.prepare(
    "SELECT id, name, email, password_hash, xp, avatar_id, created_at FROM users WHERE id = ?",
  );
  const row = statement.get(id) as UserRow | undefined;
  return row ?? null;
}

/**
 * Insere um novo usuário.
 */
export function insertUser(user: UserRow): void {
  const db = getServerDb();
  const statement = db.prepare(
    "INSERT INTO users (id, name, email, password_hash, xp, avatar_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
  );
  statement.run(
    user.id,
    user.name,
    user.email,
    user.password_hash,
    user.xp,
    user.avatar_id,
    user.created_at,
  );
}

/**
 * Atualiza o XP persistido no servidor (merge após login).
 */
export function updateUserXp(userId: string, xp: number): void {
  const db = getServerDb();
  const statement = db.prepare("UPDATE users SET xp = ? WHERE id = ?");
  statement.run(Math.max(0, xp), userId);
}
