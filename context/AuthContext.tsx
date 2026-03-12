"use client";

import { createContext, startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { apiClient } from "@/lib/apiClient";
import type { LoginPayload, SessionUser } from "@/types/auth";

interface AuthContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isPending: boolean;
  login: (payload: LoginPayload) => Promise<SessionUser>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: SessionUser | null;
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(initialUser);
  const [isPending, setIsPending] = useState(false);

  async function login(payload: LoginPayload): Promise<SessionUser> {
    setIsPending(true);

    try {
      const response = await apiClient.post<{ user: SessionUser }>("/api/auth/login", payload);

      startTransition(() => {
        setUser(response.user);
        router.refresh();
      });

      return response.user;
    } finally {
      setIsPending(false);
    }
  }

  async function logout(): Promise<void> {
    setIsPending(true);

    try {
      await apiClient.post<null>("/api/auth/logout");

      startTransition(() => {
        setUser(null);
        router.refresh();
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
