"use client";

import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/loading-spinner";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  title: string;
  subtitle: string;
}

export function Navbar({ title, subtitle }: NavbarProps) {
  const router = useRouter();
  const { user, logout, isPending } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-teal-300">TeamPulse</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 lg:min-w-80">
        <div>
          <p className="text-sm font-medium text-white">{user?.name ?? "Guest"}</p>
          <p className="text-sm text-slate-400">{user?.role ?? "Unauthenticated"}</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isPending}
          onClick={handleLogout}
          type="button"
        >
          {isPending ? <LoadingSpinner size="sm" /> : null}
          Sign out
        </button>
      </div>
    </header>
  );
}
