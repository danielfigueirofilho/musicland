/** Schema SQLite do servidor (contas e progresso vinculado). */
export const SERVER_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  xp INTEGER NOT NULL DEFAULT 0,
  avatar_id TEXT NOT NULL DEFAULT 'default',
  created_at TEXT NOT NULL
);
`;

export type UserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  xp: number;
  avatar_id: string;
  created_at: string;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  xp: number;
  avatarId: string;
};

/**
 * Remove o hash da senha antes de devolver o usuário à API.
 */
export function toPublicUser(row: UserRow): PublicUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    xp: row.xp,
    avatarId: row.avatar_id,
  };
}
