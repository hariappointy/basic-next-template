import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE } from "@/config/constants";
import type { AuthTokenPayload } from "@/types/auth";
import { decodeToken } from "@/utils/generateToken";

function verifyToken(token?: string | null): AuthTokenPayload | null {
  if (!token) {
    return null;
  }

  const payload = decodeToken<AuthTokenPayload>(token);

  if (!payload || payload.exp <= Date.now()) {
    return null;
  }

  return payload;
}

export function handleAuthMiddleware(request: NextRequest): NextResponse {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const session = verifyToken(token);

  if (session) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized.",
      },
      { status: 401 },
    );
  }

  const redirectUrl = new URL("/", request.url);
  redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);

  return NextResponse.redirect(redirectUrl);
}
