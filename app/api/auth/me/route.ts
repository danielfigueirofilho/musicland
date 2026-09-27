import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/current-session";
import { findUserById, updateUserXp } from "@/lib/db/server";
import { toPublicUser } from "@/lib/db/schema";

export async function GET(): Promise<NextResponse> {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }

  const user = findUserById(session.userId);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: toPublicUser(user) });
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const xp = typeof (body as { xp?: unknown }).xp === "number" ? (body as { xp: number }).xp : null;
  if (xp === null || !Number.isFinite(xp) || xp < 0) {
    return NextResponse.json({ error: "XP inválido." }, { status: 400 });
  }

  updateUserXp(session.userId, Math.floor(xp));
  const user = findUserById(session.userId);
  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ user: toPublicUser(user) });
}
