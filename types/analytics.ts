import type { Employee } from "@/types/employee";

export interface TeamPerformanceBucket {
  label: string;
  count: number;
  tone: string;
}

export interface AnalyticsSummary {
  averageProductivity: number;
  averageEngagement: number;
  weeklyActivity: number[];
  topPerformers: Employee[];
  teamPerformance: TeamPerformanceBucket[];
  productivityTrend: number;
  focusHours: number;
  retentionRiskCount: number;
}
