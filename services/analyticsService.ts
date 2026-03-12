import type { AnalyticsSummary } from "@/types/analytics";
import { employeeService } from "@/services/employeeService";

function round(value: number): number {
  return Math.round(value);
}

export const analyticsService = {
  async getSummary(): Promise<AnalyticsSummary> {
    const employees = await employeeService.list();

    const averageProductivity = round(
      employees.reduce((sum, employee) => sum + employee.productivityScore, 0) / employees.length,
    );
    const averageEngagement = round(
      employees.reduce((sum, employee) => sum + employee.engagementScore, 0) / employees.length,
    );

    const weeklyActivity = Array.from({ length: 7 }, (_, index) =>
      round(
        employees.reduce((sum, employee) => sum + (employee.weeklyActivity[index] ?? 0), 0) /
          employees.length,
      ),
    );

    const teamPerformance = [
      {
        label: "Thriving",
        count: employees.filter((employee) => employee.productivityScore >= 80).length,
        tone: "bg-emerald-400/80",
      },
      {
        label: "Steady",
        count: employees.filter(
          (employee) => employee.productivityScore >= 65 && employee.productivityScore < 80,
        ).length,
        tone: "bg-amber-400/80",
      },
      {
        label: "Needs attention",
        count: employees.filter((employee) => employee.productivityScore < 65).length,
        tone: "bg-rose-400/80",
      },
    ];

    const topPerformers = [...employees]
      .sort((left, right) => right.productivityScore - left.productivityScore)
      .slice(0, 4);

    return {
      averageProductivity,
      averageEngagement,
      weeklyActivity,
      topPerformers,
      teamPerformance,
      productivityTrend: weeklyActivity[4] - weeklyActivity[0],
      focusHours: employees.reduce((sum, employee) => sum + employee.focusHours, 0),
      retentionRiskCount: employees.filter(
        (employee) => employee.engagementScore < 70 || employee.productivityScore < 65,
      ).length,
    };
  },
};
