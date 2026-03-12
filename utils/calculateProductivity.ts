import type { EmployeeStatus } from "@/types/employee";

interface ProductivityInput {
  tasksCompleted: number;
  focusHours: number;
  engagementScore: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function calculateProductivity(input: ProductivityInput): number {
  const weighted =
    input.tasksCompleted * 2.4 +
    input.focusHours * 4.8 +
    input.engagementScore * 0.55;

  return Math.round(clamp(weighted / 3.6, 35, 99));
}

export function getProductivityStatus(score: number): EmployeeStatus {
  if (score >= 80) {
    return "thriving";
  }

  if (score >= 65) {
    return "steady";
  }

  return "needs-attention";
}
