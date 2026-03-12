import { getAuthUserByEmail } from "@/lib/db";
import { logger } from "@/lib/logger";
import { createAuthToken, getUserFromToken } from "@/lib/auth";
import type { LoginPayload, LoginResult, SessionUser } from "@/types/auth";
import { validateEmail } from "@/utils/validateEmail";

class AuthenticationError extends Error {}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResult> {
    const email = payload.email.trim().toLowerCase();

    if (!validateEmail(email) || payload.password.length < 8) {
      throw new AuthenticationError("Invalid credentials.");
    }

    const record = getAuthUserByEmail(email);

    if (!record || record.password !== payload.password) {
      logger.warn("Failed login attempt", { email });
      throw new AuthenticationError("Invalid credentials.");
    }

    const user: SessionUser = {
      id: record.id,
      name: record.name,
      email: record.email,
      role: record.role,
      company: record.company,
    };
    const session = createAuthToken(user);

    logger.info("User authenticated", { userId: user.id });

    return {
      user,
      token: session.token,
      expiresAt: session.expiresAt,
    };
  },

  async getUserFromToken(token?: string | null): Promise<SessionUser | null> {
    return getUserFromToken(token);
  },
};
