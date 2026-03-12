import { NextResponse } from "next/server";

import { setAuthCookie } from "@/lib/auth";
import { logger } from "@/lib/logger";
import type { ApiResponse } from "@/types/api";
import type { SessionUser } from "@/types/auth";
import { authService } from "@/services/authService";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const result = await authService.login({
      email: body.email ?? "",
      password: body.password ?? "",
    });

    await setAuthCookie(result.token, result.expiresAt);

    return NextResponse.json<ApiResponse<{ user: SessionUser }>>({
      success: true,
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    logger.warn("Login route rejected credentials", {
      reason: error instanceof Error ? error.message : "unknown",
    });

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Invalid credentials.",
      },
      { status: 401 },
    );
  }
}
