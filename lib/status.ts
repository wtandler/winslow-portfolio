// Dependency-free leaf module: safe to import from both server and client
// components (no `fs`/`path` like lib/mdx.ts, which is server-only).

export type ProjectStatus = "live" | "in-progress" | "archived";

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  live: "var(--accent)",
  "in-progress": "#eab308",
  archived: "var(--text-muted)",
};

export const VALID_STATUSES: ProjectStatus[] = [
  "live",
  "in-progress",
  "archived",
];
