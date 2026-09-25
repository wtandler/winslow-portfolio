// Dependency-free leaf module: safe to import from both server and client
// components (no `fs`/`path` like lib/mdx.ts, which is server-only).

export type ProjectStatus = "live" | "in-progress" | "completed" | "archived";

// "completed" is a shipped prior product whose ownership period ended;
// "archived" is a product no longer maintained.
export const STATUS_COLORS: Record<ProjectStatus, string> = {
  live: "var(--accent)",
  "in-progress": "var(--accent-label)",
  completed: "var(--text-secondary)",
  archived: "var(--text-muted)",
};

// Live and in-progress are both navy shades, so the marker shape carries the
// difference: a filled dot for a running or shipped product, a hollow ring
// for one not yet shipped or no longer maintained.
export const STATUS_MARKERS: Record<ProjectStatus, "dot" | "ring"> = {
  live: "dot",
  "in-progress": "ring",
  completed: "dot",
  archived: "ring",
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  completed: "Completed",
  archived: "Archived",
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
