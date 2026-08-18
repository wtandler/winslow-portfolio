// Dependency-free leaf module: safe to import from both server and client
// components (no `fs`/`path` like lib/mdx.ts, which is server-only).

export type ProjectStatus = "live" | "in-progress" | "completed" | "archived";

// "completed" is a shipped prior product whose ownership period ended;
// "archived" is a product no longer maintained.
export const STATUS_COLORS: Record<ProjectStatus, string> = {
  live: "var(--accent)",
  "in-progress": "var(--accent-warm)",
  completed: "var(--text-secondary)",
  archived: "var(--text-muted)",
};

export const VALID_STATUSES: ProjectStatus[] = [
  "live",
  "in-progress",
  "completed",
  "archived",
];

// Groups rendered on the homepage and project index, in display order.
export type ProjectCategory = "enterprise" | "independent" | "earlier";

export const VALID_CATEGORIES: ProjectCategory[] = [
  "enterprise",
  "independent",
  "earlier",
];

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  enterprise: "Enterprise change and operations",
  independent: "Independent products and research",
  earlier: "Earlier work",
};
