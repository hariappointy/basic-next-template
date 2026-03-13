"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_NAME, SIDEBAR_LINKS } from "@/config/constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="panel-strong hidden w-72 shrink-0 flex-col rounded-r-[2rem] px-5 py-6 lg:flex">
      <Link href="/dashboard" className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.28em] text-teal-300">Workspace</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-white">{APP_NAME}</h1>
        <p className="mt-2 text-sm text-slate-300">
          Monitor productivity, engagement, and team health in one place.
        </p>
      </Link>

      <nav className="mt-8 space-y-2">
        {SIDEBAR_LINKS.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl border px-4 py-3 transition ${
                isActive
                  ? "border-teal-300/40 bg-teal-400/10 text-white"
                  : "border-transparent bg-white/0 text-slate-300 hover:border-white/10 hover:bg-white/5"
              }`}
            >
              <div className="font-medium">{item.label}</div>
              <div className="mt-1 text-sm text-slate-400">{item.caption}</div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4 text-sm text-amber-100">
        3 employees need follow-up this week based on engagement and output changes.
      </div>
    </aside>
  );
}
