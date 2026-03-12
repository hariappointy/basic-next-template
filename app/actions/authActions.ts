"use server";

import { redirect } from "next/navigation";

import { DEFAULT_REDIRECT } from "@/config/constants";
import { clearAuthCookie, setAuthCookie } from "@/lib/auth";
import { authService } from "@/services/authService";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? DEFAULT_REDIRECT);

  try {
    const result = await authService.login({ email, password });
    await setAuthCookie(result.token, result.expiresAt);
  } catch {
    redirect("/?error=invalid_credentials");
  }

  redirect(redirectTo.startsWith("/") ? redirectTo : DEFAULT_REDIRECT);
}

export async function logoutAction(): Promise<void> {
  await clearAuthCookie();
  redirect("/");
}
