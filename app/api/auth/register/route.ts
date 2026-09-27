import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/auth/password";
import {
  createSessionToken,
  getSessionCookieOptions,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/session";
import { validateRegisterInput } from "@/lib/auth/validators";
import { findUserByEmail, insertUser } from "@/lib/db/server";
import { toPublicUser } from "@/lib/db/schema";

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const input = body as {
    name?: unknown;
    email?: unknown;
    password?: unknown;
  };

  const name = typeof input.name === "string" ? input.name : "";
  const email = typeof input.email === "string" ? input.email : "";
  const password = typeof input.password === "string" ? input.password : "";

  const errors = validateRegisterInput({ name, email, password });
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const existing = findUserByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "Já existe uma conta com este e-mail." },
      { status: 409 },
    );
  }

  const user = {
    id: randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password_hash: await hashPassword(password),
    xp: 0,
    avatar_id: "default",
    created_at: new Date().toISOString(),
  };

  insertUser(user);

  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
    displayName: user.name,
  });

  const response = NextResponse.json({ user: toPublicUser(user) });
  response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions());
  return response;
}
