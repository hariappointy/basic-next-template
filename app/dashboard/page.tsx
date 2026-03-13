import { DashboardStats } from "@/components/dashboard-stats";
import { EmployeeCard } from "@/components/employee-card";
import { Navbar } from "@/components/navbar";
import { ProductivityChart } from "@/components/productivity-chart";
import { Sidebar } from "@/components/sidebar";
import { requireCurrentUser } from "@/lib/auth";
import { analyticsService } from "@/services/analyticsService";
import { employeeService } from "@/services/employeeService";

export default async function DashboardPage() {
  await requireCurrentUser();

  const [summary, employees] = await Promise.all([
    analyticsService.getSummary(),
    employeeService.list(),
  ]);

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar
          subtitle="Track team momentum, engagement, and performance risks from one operating view."
          title="Dashboard"
        />

        <main className="space-y-6 px-5 py-6 lg:px-8">
          <DashboardStats summary={summary} />

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
            <ProductivityChart activity={summary.weeklyActivity} trend={summary.productivityTrend} />

            <section className="panel rounded-3xl p-5">
              <h3 className="font-display text-2xl font-semibold text-white">Team distribution</h3>
              <p className="mt-1 text-sm text-slate-300">
                Breakdown of current performance bands across the company.
              </p>

              <div className="mt-6 space-y-4">
                {summary.teamPerformance.map((bucket) => (
                  <div key={bucket.label}>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-200">
                      <span>{bucket.label}</span>
                      <span>{bucket.count} employees</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/5">
                      <div
                        className={`h-3 rounded-full ${bucket.tone}`}
                        style={{
                          width: `${Math.max((bucket.count / employees.length) * 100, 8)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section>
            <div className="mb-4">
              <h3 className="font-display text-2xl font-semibold text-white">Top performers</h3>
              <p className="mt-1 text-sm text-slate-300">
                Employees with the strongest balance of focus time, engagement, and completed work.
              </p>
            </div>
            <div className="grid gap-4 xl:grid-cols-3">
              {summary.topPerformers.slice(0, 3).map((employee) => (
                <EmployeeCard compact key={employee.id} employee={employee} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
