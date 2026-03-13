import { EmployeeCard } from "@/components/employee-card";
import { EmployeeTable } from "@/components/employee-table";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { requireCurrentUser } from "@/lib/auth";
import { employeeService } from "@/services/employeeService";

export default async function EmployeesPage() {
  await requireCurrentUser();

  const [employees, departments] = await Promise.all([
    employeeService.list(),
    employeeService.departments(),
  ]);

  const attentionEmployees = employees.filter((employee) => employee.status === "needs-attention");

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar
          subtitle="Review the health of every employee record, including output, engagement, and activity."
          title="Employees"
        />

        <main className="space-y-6 px-5 py-6 lg:px-8">
          <EmployeeTable departments={departments} initialEmployees={employees} />

          <section>
            <div className="mb-4">
              <h3 className="font-display text-2xl font-semibold text-white">
                Employees needing follow-up
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                These team members have lower engagement or declining focus signals.
              </p>
            </div>
            <div className="grid gap-4 xl:grid-cols-3">
              {attentionEmployees.slice(0, 3).map((employee) => (
                <EmployeeCard compact key={employee.id} employee={employee} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
