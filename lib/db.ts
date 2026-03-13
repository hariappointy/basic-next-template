import { COMPANY_NAME } from "@/config/constants";
import type { SessionUser, UserPreferences } from "@/types/auth";
import type { Employee, EmployeeFilters, EmployeeInput } from "@/types/employee";
import { calculateProductivity, getProductivityStatus } from "@/utils/calculateProductivity";

interface AuthRecord extends SessionUser {
  password: string;
}

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

function buildEmployee(input: EmployeeInput & { id: string }): Employee {
  const productivityScore = calculateProductivity({
    tasksCompleted: input.tasksCompleted,
    focusHours: input.focusHours,
    engagementScore: input.engagementScore,
  });

  return {
    ...input,
    productivityScore,
    status: getProductivityStatus(productivityScore),
  };
}

const authUsers: AuthRecord[] = [
  {
    id: "usr_ops_01",
    name: "Morgan Lee",
    email: "admin@teampulse.dev",
    role: "Operations Lead",
    company: COMPANY_NAME,
    password: "teampulse123",
  },
];

const seedEmployees: Employee[] = [
  buildEmployee({
    id: "emp_01",
    name: "Ava Patel",
    role: "Senior Product Designer",
    department: "Design",
    email: "ava.patel@northstarlabs.dev",
    avatarUrl: "AP",
    location: "Bengaluru, IN",
    timeZone: "Asia/Kolkata",
    joinedAt: "2023-02-13T10:00:00.000Z",
    lastActiveAt: "2026-03-12T06:45:00.000Z",
    engagementScore: 92,
    tasksCompleted: 29,
    focusHours: 31,
    weeklyActivity: [68, 72, 84, 81, 79, 54, 38],
    goals: ["Ship onboarding refresh", "Reduce new user drop-off below 14%"],
    managerId: "usr_ops_01",
  }),
  buildEmployee({
    id: "emp_02",
    name: "Jonah Kim",
    role: "Staff Software Engineer",
    department: "Engineering",
    email: "jonah.kim@northstarlabs.dev",
    avatarUrl: "JK",
    location: "Seoul, KR",
    timeZone: "Asia/Seoul",
    joinedAt: "2022-08-22T10:00:00.000Z",
    lastActiveAt: "2026-03-12T08:15:00.000Z",
    engagementScore: 87,
    tasksCompleted: 33,
    focusHours: 36,
    weeklyActivity: [74, 77, 82, 88, 85, 49, 35],
    goals: ["Stabilize sync workers", "Reduce alert noise by 20%"],
    managerId: "usr_ops_01",
  }),
  buildEmployee({
    id: "emp_03",
    name: "Daniela Ruiz",
    role: "Customer Success Manager",
    department: "Success",
    email: "daniela.ruiz@northstarlabs.dev",
    avatarUrl: "DR",
    location: "Mexico City, MX",
    timeZone: "America/Mexico_City",
    joinedAt: "2024-01-15T10:00:00.000Z",
    lastActiveAt: "2026-03-11T19:10:00.000Z",
    engagementScore: 76,
    tasksCompleted: 24,
    focusHours: 24,
    weeklyActivity: [58, 60, 72, 74, 70, 41, 30],
    goals: ["Lift renewal conversations", "Launch executive QBR template"],
    managerId: "usr_ops_01",
  }),
  buildEmployee({
    id: "emp_04",
    name: "Mina Okafor",
    role: "Lifecycle Marketing Lead",
    department: "Marketing",
    email: "mina.okafor@northstarlabs.dev",
    avatarUrl: "MO",
    location: "Lagos, NG",
    timeZone: "Africa/Lagos",
    joinedAt: "2023-09-04T10:00:00.000Z",
    lastActiveAt: "2026-03-12T03:30:00.000Z",
    engagementScore: 81,
    tasksCompleted: 27,
    focusHours: 29,
    weeklyActivity: [61, 67, 70, 75, 77, 46, 28],
    goals: ["Lift activation email CTR", "Rework trial nurture automation"],
    managerId: "usr_ops_01",
  }),
  buildEmployee({
    id: "emp_05",
    name: "Leo Thompson",
    role: "Revenue Operations Analyst",
    department: "Operations",
    email: "leo.thompson@northstarlabs.dev",
    avatarUrl: "LT",
    location: "Austin, US",
    timeZone: "America/Chicago",
    joinedAt: "2021-11-29T10:00:00.000Z",
    lastActiveAt: "2026-03-12T01:05:00.000Z",
    engagementScore: 69,
    tasksCompleted: 21,
    focusHours: 22,
    weeklyActivity: [54, 57, 63, 66, 68, 39, 22],
    goals: ["Audit expansion pipeline", "Consolidate MRR reporting"],
    managerId: "usr_ops_01",
  }),
  buildEmployee({
    id: "emp_06",
    name: "Nadia Hassan",
    role: "People Operations Partner",
    department: "People",
    email: "nadia.hassan@northstarlabs.dev",
    avatarUrl: "NH",
    location: "Dubai, AE",
    timeZone: "Asia/Dubai",
    joinedAt: "2024-04-08T10:00:00.000Z",
    lastActiveAt: "2026-03-11T16:40:00.000Z",
    engagementScore: 71,
    tasksCompleted: 18,
    focusHours: 20,
    weeklyActivity: [49, 52, 58, 61, 63, 31, 18],
    goals: ["Finalize manager enablement plan", "Improve survey participation"],
    managerId: "usr_ops_01",
  }),
  buildEmployee({
    id: "emp_07",
    name: "Sofia Petrov",
    role: "Finance Controller",
    department: "Finance",
    email: "sofia.petrov@northstarlabs.dev",
    avatarUrl: "SP",
    location: "Warsaw, PL",
    timeZone: "Europe/Warsaw",
    joinedAt: "2022-06-06T10:00:00.000Z",
    lastActiveAt: "2026-03-12T05:55:00.000Z",
    engagementScore: 83,
    tasksCompleted: 26,
    focusHours: 28,
    weeklyActivity: [65, 66, 73, 79, 80, 45, 27],
    goals: ["Shorten month-end close", "Finalize board reporting package"],
    managerId: "usr_ops_01",
  }),
  buildEmployee({
    id: "emp_08",
    name: "Marcus Green",
    role: "Solutions Engineer",
    department: "Sales",
    email: "marcus.green@northstarlabs.dev",
    avatarUrl: "MG",
    location: "Toronto, CA",
    timeZone: "America/Toronto",
    joinedAt: "2023-12-11T10:00:00.000Z",
    lastActiveAt: "2026-03-11T22:25:00.000Z",
    engagementScore: 66,
    tasksCompleted: 19,
    focusHours: 18,
    weeklyActivity: [46, 52, 59, 62, 58, 36, 20],
    goals: ["Refresh demo environment", "Partner on enterprise pilot"],
    managerId: "usr_ops_01",
  }),
];

let employees = seedEmployees.map(clone);

const preferenceStore = new Map<string, UserPreferences>(
  authUsers.map((user) => [
    user.id,
    {
      timezone: "UTC",
      notifyByEmail: true,
      weeklyDigest: true,
      focusGoal: 28,
    },
  ]),
);

export function listEmployees(filters: EmployeeFilters = {}): Employee[] {
  const query = filters.query?.trim().toLowerCase();
  const department = filters.department?.trim().toLowerCase();

  let results = employees;

  if (query) {
    results = results.filter((employee) =>
      [employee.name, employee.role, employee.email].some((field) =>
        field.toLowerCase().includes(query),
      ),
    );
  }

  if (department && department !== "all") {
    results = results.filter((employee) => employee.department.toLowerCase() === department);
  }

  if (filters.limit) {
    results = results.slice(0, filters.limit);
  }

  return results.map(clone);
}

export function getEmployeeById(id: string): Employee | null {
  const employee = employees.find((entry) => entry.id === id);
  return employee ? clone(employee) : null;
}

export function createEmployee(input: EmployeeInput): Employee {
  const employee = buildEmployee({
    ...input,
    id: `emp_${crypto.randomUUID().slice(0, 8)}`,
  });

  employees = [employee, ...employees];
  return clone(employee);
}

export function updateEmployee(id: string, patch: Partial<EmployeeInput>): Employee | null {
  const employee = employees.find((entry) => entry.id === id);

  if (!employee) {
    return null;
  }

  Object.assign(employee, patch);

  employee.productivityScore = calculateProductivity({
    tasksCompleted: employee.tasksCompleted,
    focusHours: employee.focusHours,
    engagementScore: employee.engagementScore,
  });
  employee.status = getProductivityStatus(employee.productivityScore);

  return clone(employee);
}

export function deleteEmployee(id: string): boolean {
  const nextEmployees = employees.filter((employee) => employee.id !== id);

  if (nextEmployees.length === employees.length) {
    return false;
  }

  employees = nextEmployees;
  return true;
}

export function listDepartments(): string[] {
  return Array.from(new Set(employees.map((employee) => employee.department))).sort();
}

export function getAuthUserByEmail(email: string): AuthRecord | null {
  const normalizedEmail = email.trim().toLowerCase();
  return authUsers.find((user) => user.email === normalizedEmail) ?? null;
}

export function getUserPreferences(userId: string): UserPreferences {
  return clone(
    preferenceStore.get(userId) ?? {
      timezone: "UTC",
      notifyByEmail: true,
      weeklyDigest: false,
      focusGoal: 24,
    },
  );
}

export function updateUserPreferences(
  userId: string,
  patch: Partial<UserPreferences>,
): UserPreferences {
  const current = getUserPreferences(userId);
  const next = {
    ...current,
    ...patch,
  };

  preferenceStore.set(userId, next);
  return clone(next);
}
