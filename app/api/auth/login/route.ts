import { NextResponse } from "next/server";

import { verifyPassword } from "@/lib/auth/password";
import {
  createSessionToken,
  getSessionCookieOptions,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/session";
import { validateLoginInput } from "@/lib/auth/validators";
import { findUserByEmail } from "@/lib/db/server";
import { toPublicUser } from "@/lib/db/schema";

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const input = body as { email?: unknown; password?: unknown };
  const email = typeof input.email === "string" ? input.email : "";
  const password = typeof input.password === "string" ? input.password : "";

  const errors = validateLoginInput({ email, password });
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { error: "E-mail ou senha incorretos." },
      { status: 401 },
    );
  }

  const matches = await verifyPassword(password, user.password_hash);
  if (!matches) {
    return NextResponse.json(
      { error: "E-mail ou senha incorretos." },
      { status: 401 },
    );
  }

  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
    displayName: user.name,
  });

  const response = NextResponse.json({ user: toPublicUser(user) });
  response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions());
  return response;
}
