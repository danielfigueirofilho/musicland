"use client";

import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";

import {
  CLIENT_SCHEMA_SQL,
  GUEST_USER_ID,
  parseAchievements,
  serializeAchievements,
  type ProgressRecord,
} from "@/lib/db/progress";

const IDB_NAME = "musicland";
const IDB_STORE = "sqlite";
const IDB_KEY = "database";

let sqlPromise: Promise<SqlJsStatic> | null = null;
let dbPromise: Promise<Database> | null = null;

function openIndexedDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(IDB_STORE)) {
        database.createObjectStore(IDB_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readSavedBytes(): Promise<Uint8Array | null> {
  if (typeof indexedDB === "undefined") {
    return null;
  }
  const database = await openIndexedDb();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(IDB_STORE, "readonly");
    const store = tx.objectStore(IDB_STORE);
    const request = store.get(IDB_KEY);
    request.onsuccess = () => {
      const value: unknown = request.result;
      if (value instanceof Uint8Array) {
        resolve(value);
        return;
      }
      if (value instanceof ArrayBuffer) {
        resolve(new Uint8Array(value));
        return;
      }
      resolve(null);
    };
    request.onerror = () => reject(request.error);
  });
}

async function writeSavedBytes(bytes: Uint8Array): Promise<void> {
  if (typeof indexedDB === "undefined") {
    return;
  }
  const database = await openIndexedDb();
  await new Promise<void>((resolve, reject) => {
    const tx = database.transaction(IDB_STORE, "readwrite");
    const store = tx.objectStore(IDB_STORE);
    const request = store.put(bytes, IDB_KEY);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function loadSql(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: (file) => `/${file}`,
    });
  }
  return sqlPromise;
}

/**
 * Abre (ou cria) o SQLite no navegador, persistido em IndexedDB.
 */
export async function getClientDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const SQL = await loadSql();
      const saved = await readSavedBytes();
      const database = saved ? new SQL.Database(saved) : new SQL.Database();
      database.run(CLIENT_SCHEMA_SQL);
      return database;
    })();
  }
  return dbPromise;
}

async function persistClientDb(): Promise<void> {
  const database = await getClientDb();
  await writeSavedBytes(database.export());
}

function readProgressRow(database: Database, userId: string): ProgressRecord | null {
  const statement = database.prepare(
    "SELECT user_id, display_name, xp, avatar_id, total_correct, consecutive_correct, unlocked_achievements FROM player_progress WHERE user_id = ?",
  );
  statement.bind([userId]);
  if (!statement.step()) {
    statement.free();
    return null;
  }
  const row = statement.getAsObject() as {
    user_id: string;
    display_name: string;
    xp: number;
    avatar_id: string;
    total_correct: number;
    consecutive_correct: number;
    unlocked_achievements: string;
  };
  statement.free();
  return {
    userId: row.user_id,
    displayName: row.display_name,
    xp: row.xp,
    avatarId: row.avatar_id,
    totalCorrect: row.total_correct,
    consecutiveCorrect: row.consecutive_correct,
    unlockedAchievements: parseAchievements(row.unlocked_achievements),
  };
}

/**
 * Carrega o progresso de um jogador (visitante ou conta).
 */
export async function loadProgress(userId: string = GUEST_USER_ID): Promise<ProgressRecord | null> {
  const database = await getClientDb();
  return readProgressRow(database, userId);
}

/**
 * Grava o progresso e exporta o banco para o IndexedDB (CA-18).
 */
export async function saveProgress(record: ProgressRecord): Promise<void> {
  const database = await getClientDb();
  database.run(
    `INSERT INTO player_progress (user_id, display_name, xp, avatar_id, total_correct, consecutive_correct, unlocked_achievements)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET
       display_name = excluded.display_name,
       xp = excluded.xp,
       avatar_id = excluded.avatar_id,
       total_correct = excluded.total_correct,
       consecutive_correct = excluded.consecutive_correct,
       unlocked_achievements = excluded.unlocked_achievements`,
    [
      record.userId,
      record.displayName,
      record.xp,
      record.avatarId,
      record.totalCorrect,
      record.consecutiveCorrect,
      serializeAchievements(record.unlockedAchievements),
    ],
  );
  await persistClientDb();
}

export async function loadSetting(key: string): Promise<string | null> {
  const database = await getClientDb();
  const statement = database.prepare("SELECT value FROM settings WHERE key = ?");
  statement.bind([key]);
  if (!statement.step()) {
    statement.free();
    return null;
  }
  const value = statement.getAsObject().value;
  statement.free();
  return typeof value === "string" ? value : null;
}

export async function saveSetting(key: string, value: string): Promise<void> {
  const database = await getClientDb();
  database.run(
    `INSERT INTO settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [key, value],
  );
  await persistClientDb();
}

export function createEmptyProgress(
  userId: string = GUEST_USER_ID,
  displayName = "Visitante",
): ProgressRecord {
  return {
    userId,
    displayName,
    xp: 0,
    avatarId: "default",
    totalCorrect: 0,
    consecutiveCorrect: 0,
    unlockedAchievements: [],
  };
}
