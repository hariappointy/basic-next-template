"use client";

import { useState } from "react";

import { Modal } from "@/components/modal";
import type { Employee } from "@/types/employee";
import { formatDate } from "@/utils/formatDate";

interface EmployeeCardProps {
  employee: Employee;
  compact?: boolean;
}

const toneMap = {
  thriving: "bg-emerald-400",
  steady: "bg-amber-400",
  "needs-attention": "bg-rose-400",
};

export function EmployeeCard({ employee, compact = false }: EmployeeCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="panel rounded-3xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-sm font-semibold text-white">
              {employee.avatarUrl}
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-white">{employee.name}</h3>
              <p className="text-sm text-slate-300">
                {employee.role} · {employee.department}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-200">
            <span className={`status-dot ${toneMap[employee.status]}`} />
            {employee.status.replace("-", " ")}
          </span>
        </div>

        <div className={`mt-5 grid gap-4 ${compact ? "grid-cols-2" : "grid-cols-3"}`}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Productivity</p>
            <p className="mt-2 text-3xl font-semibold text-white">{employee.productivityScore}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Engagement</p>
            <p className="mt-2 text-3xl font-semibold text-white">{employee.engagementScore}</p>
          </div>
          {!compact ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Focus Hours</p>
              <p className="mt-2 text-3xl font-semibold text-white">{employee.focusHours}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
          <div>
            Last active {formatDate(employee.lastActiveAt, { month: "short", day: "numeric" })}
          </div>
          <button
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/5"
            onClick={() => setOpen(true)}
            type="button"
          >
            View goals
          </button>
        </div>
      </article>

      <Modal
        open={open}
        title={`${employee.name} goals`}
        description={`${employee.location} · ${employee.timeZone}`}
        onClose={() => setOpen(false)}
      >
        <div className="space-y-4">
          {employee.goals.map((goal) => (
            <div
              key={goal}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
            >
              {goal}
            </div>
          ))}
          <p className="text-sm text-slate-400">
            Joined {formatDate(employee.joinedAt)} · {employee.tasksCompleted} tasks completed this
            cycle.
          </p>
        </div>
      </Modal>
    </>
  );
}
