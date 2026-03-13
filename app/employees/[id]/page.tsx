import { notFound } from "next/navigation";

import { EmployeeCard } from "@/components/employee-card";
import { Navbar } from "@/components/navbar";
import { ProductivityChart } from "@/components/productivity-chart";
import { Sidebar } from "@/components/sidebar";
import { requireCurrentUser } from "@/lib/auth";
import { employeeService } from "@/services/employeeService";
import { formatDate } from "@/utils/formatDate";

interface EmployeeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EmployeeDetailPage({ params }: EmployeeDetailPageProps) {
  await requireCurrentUser();

  const { id } = await params;
  const employee = await employeeService.getById(id);

  if (!employee) {
    notFound();
  }

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar
          subtitle="Individual productivity, engagement, and recent activity for a single employee."
          title={employee.name}
        />

        <main className="space-y-6 px-5 py-6 lg:px-8">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.2fr]">
            <EmployeeCard employee={employee} />

            <section className="panel rounded-3xl p-5">
              <h3 className="font-display text-2xl font-semibold text-white">Profile details</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["Email", employee.email],
                  ["Location", employee.location],
                  ["Time zone", employee.timeZone],
                  ["Joined", formatDate(employee.joinedAt)],
                  ["Tasks completed", `${employee.tasksCompleted}`],
                  ["Last active", formatDate(employee.lastActiveAt)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
                    <div className="mt-2 text-sm text-white">{value}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <ProductivityChart
            activity={employee.weeklyActivity}
            description="This employee's normalized activity over the last seven days."
            title={`${employee.name}'s weekly momentum`}
            trend={employee.weeklyActivity[4] - employee.weeklyActivity[0]}
          />
        </main>
      </div>
    </div>
  );
}
