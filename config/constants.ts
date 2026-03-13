export const APP_NAME = "TeamPulse";
export const COMPANY_NAME = "Northstar Labs";
export const AUTH_COOKIE = "teampulse_session";
export const SESSION_DURATION_MS = 1000 * 60 * 60 * 8;

export const SIDEBAR_LINKS = [
  {
    href: "/dashboard",
    label: "Dashboard",
    caption: "Productivity overview",
  },
  {
    href: "/employees",
    label: "Employees",
    caption: "Team directory",
  },
  {
    href: "/settings",
    label: "Settings",
    caption: "Workspace preferences",
  },
] as const;

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DEFAULT_REDIRECT = "/dashboard";

