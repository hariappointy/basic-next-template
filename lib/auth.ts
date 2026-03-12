import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIE, SESSION_DURATION_MS } from "@/config/constants";
import type { AuthTokenPayload, SessionUser } from "@/types/auth";
import { decodeToken, generateToken } from "@/utils/generateToken";

export function createAuthToken(user: SessionUser): { token: string; expiresAt: number } {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + SESSION_DURATION_MS;
  const token = generateToken({
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    company: user.company,
    iat: issuedAt,
    exp: expiresAt,
    nonce: crypto.randomUUID(),
  });

  return { token, expiresAt };
}

export function verifyAuthToken(token?: string | null): AuthTokenPayload | null {
  if (!token) {
    return null;
  }

  const payload = decodeToken<AuthTokenPayload>(token);

  if (!payload) {
    return null;
  }

  if (payload.exp <= Date.now()) {
    return null;
  }

  return payload;
}

export function getUserFromToken(token?: string | null): SessionUser | null {
  const payload = verifyAuthToken(token);

  if (!payload) {
    return null;
  }

  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    company: payload.company,
  };
}

export async function setAuthCookie(token: string, expiresAt: number): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  return getUserFromToken(cookieStore.get(AUTH_COOKIE)?.value);
}

export async function requireCurrentUser(): Promise<SessionUser> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return currentUser;
}
