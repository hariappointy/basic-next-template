"use client";

import { useState } from "react";

import { WEEKDAY_LABELS } from "@/config/constants";

interface ProductivityChartProps {
  activity: number[];
  trend: number;
  title?: string;
  description?: string;
}

export function ProductivityChart({
  activity,
  trend,
  title = "Weekly productivity pulse",
  description = "Normalized activity score across the team.",
}: ProductivityChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const maxValue = Math.max(...activity, 100);

  return (
    <section className="panel rounded-3xl p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-300">{description}</p>
        </div>
        <div
          className={`rounded-full px-3 py-1 text-sm ${
            trend >= 0
              ? "bg-emerald-400/10 text-emerald-200"
              : "bg-rose-400/10 text-rose-200"
          }`}
        >
          {trend >= 0 ? "+" : ""}
          {trend} pts vs start of week
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-3">
        {activity.map((value, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={`${WEEKDAY_LABELS[index]}-${value}`}
              className="group flex flex-col items-center gap-3"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              type="button"
            >
              <div className="flex h-56 w-full items-end rounded-[2rem] bg-white/5 p-2">
                <div
                  className={`w-full rounded-[1.4rem] bg-gradient-to-t from-teal-400 to-cyan-200 transition-all duration-300 ${
                    isActive ? "shadow-[0_0_40px_rgba(45,212,191,0.28)]" : ""
                  }`}
                  style={{
                    height: `${Math.max((value / maxValue) * 100, 12)}%`,
                  }}
                />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-white">{value}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {WEEKDAY_LABELS[index]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
