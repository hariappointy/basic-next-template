"use client";

import Link from "next/link";

import { LoadingSpinner } from "@/components/loading-spinner";
import { useEmployees } from "@/hooks/useEmployees";
import type { Employee } from "@/types/employee";
import { formatDate } from "@/utils/formatDate";

interface EmployeeTableProps {
  initialEmployees: Employee[];
  departments: string[];
}

const toneMap = {
  thriving: "text-emerald-300",
  steady: "text-amber-300",
  "needs-attention": "text-rose-300",
};

export function EmployeeTable({ initialEmployees, departments }: EmployeeTableProps) {
  const {
    filteredEmployees,
    query,
    setQuery,
    department,
    setDepartment,
    isLoading,
    error,
    refresh,
  } = useEmployees(initialEmployees);

  return (
    <section className="panel rounded-3xl p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold text-white">Team directory</h3>
          <p className="mt-1 text-sm text-slate-300">
            Search across departments, performance, and recent activity.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-300/40"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search employees"
            value={query}
          />
          <select
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-teal-300/40"
            onChange={(event) => setDepartment(event.target.value)}
            value={department}
          >
            <option value="all">All departments</option>
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-2.5 text-sm text-white transition hover:border-white/20 hover:bg-white/5"
            onClick={() => void refresh()}
            type="button"
          >
            {isLoading ? <LoadingSpinner size="sm" /> : null}
            Refresh
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">Employee</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Productivity</th>
              <th className="px-4 py-3 font-medium">Last active</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-slate-950/20">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-4 py-4">
                  <div className="font-medium text-white">{employee.name}</div>
                  <div className="text-slate-400">{employee.role}</div>
                </td>
                <td className="px-4 py-4 text-slate-300">{employee.department}</td>
                <td className={`px-4 py-4 font-medium ${toneMap[employee.status]}`}>
                  {employee.productivityScore}
                </td>
                <td className="px-4 py-4 text-slate-300">{formatDate(employee.lastActiveAt)}</td>
                <td className="px-4 py-4">
                  <Link
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-slate-200 transition hover:border-white/20 hover:bg-white/5"
                    href={`/employees/${employee.id}`}
                  >
                    View profile
                  </Link>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-slate-400" colSpan={5}>
                  No employees match the current filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
