import { createSecretKey, type KeyObject } from "node:crypto";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/** Duração da sessão em segundos — 7 dias (CA-08). */
export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

export const SESSION_COOKIE_NAME = "musicland_session";

const SESSION_ISSUER = "musicland";
const SESSION_AUDIENCE = "musicland-player";

export type SessionPayload = {
  userId: string;
  email: string;
  displayName: string;
};

type SignedClaims = JWTPayload & SessionPayload;

function getSecretKey(): KeyObject {
  const secret =
    process.env.AUTH_SECRET ?? "musicland-dev-secret-change-in-production-32";
  return createSecretKey(Buffer.from(secret));
}

/**
 * Assina um JWT HS256 com expiração de 7 dias.
 */
export async function createSessionToken(
  payload: SessionPayload,
): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    email: payload.email,
    displayName: payload.displayName,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

/**
 * Verifica o JWT da sessão. Retorna null se inválido ou expirado.
 */
export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      issuer: SESSION_ISSUER,
      audience: SESSION_AUDIENCE,
    });
    const claims = payload as SignedClaims;
    if (!claims.userId || !claims.email || !claims.displayName) {
      return null;
    }
    return {
      userId: claims.userId,
      email: claims.email,
      displayName: claims.displayName,
    };
  } catch {
    return null;
  }
}

/**
 * Calcula a data de expiração da sessão a partir de agora (CA-08).
 */
export function getSessionExpiry(from: Date = new Date()): Date {
  return new Date(from.getTime() + SESSION_TTL_SECONDS * 1000);
}

export function getSessionCookieOptions(): {
  httpOnly: true;
  sameSite: "lax";
  secure: boolean;
  path: "/";
  maxAge: number;
} {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
