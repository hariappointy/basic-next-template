export type EmployeeStatus = "thriving" | "steady" | "needs-attention";

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatarUrl: string;
  location: string;
  timeZone: string;
  joinedAt: string;
  lastActiveAt: string;
  productivityScore: number;
  engagementScore: number;
  tasksCompleted: number;
  focusHours: number;
  weeklyActivity: number[];
  goals: string[];
  managerId?: string;
  status: EmployeeStatus;
}

export interface EmployeeFilters {
  query?: string;
  department?: string;
  limit?: number;
}

export interface EmployeeInput {
  name: string;
  role: string;
  department: string;
  email: string;
  avatarUrl: string;
  location: string;
  timeZone: string;
  joinedAt: string;
  lastActiveAt: string;
  engagementScore: number;
  tasksCompleted: number;
  focusHours: number;
  weeklyActivity: number[];
  goals: string[];
  managerId?: string;
}
