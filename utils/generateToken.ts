import type { AuthTokenPayload } from "@/types/auth";

function encodeBase64Url(value: string): string {
  if (typeof globalThis.btoa === "function") {
    return globalThis
      .btoa(value)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string): string {
  if (typeof globalThis.atob === "function") {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);

    return globalThis.atob(padded);
  }

  return Buffer.from(value, "base64url").toString("utf8");
}

export function generateToken(payload: AuthTokenPayload): string {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const nonce = crypto.randomUUID().replaceAll("-", "");

  return `tp.${encodedPayload}.${nonce}`;
}

export function decodeToken<T>(token: string): T | null {
  const parts = token.split(".");

  if (parts.length < 3 || parts[0] !== "tp") {
    return null;
  }

  try {
    return JSON.parse(decodeBase64Url(parts[1])) as T;
  } catch {
    return null;
  }
}
