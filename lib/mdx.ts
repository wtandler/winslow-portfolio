import {
  createContentLoader,
  normalizeContentDate,
  requireFrontmatterKeys,
  type ContentEntry,
} from "./content";
import { VALID_STATUSES, type ProjectStatus } from "./status";

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date: string;
  // Optional "last updated" date, shown alongside the start date.
  updated?: string;
  stack: string[];
  status: ProjectStatus;
  url?: string;
  github?: string;
  featured?: boolean;
  // Higher sorts first; ties fall back to date (newest first). Defaults to 0.
  priority?: number;
}

export type Project = ContentEntry<ProjectFrontmatter>;

function normalizeFrontmatter(
  slug: string,
  data: Record<string, unknown>
): ProjectFrontmatter {
  requireFrontmatterKeys("content/projects", slug, data, [
    "title",
    "summary",
    "date",
  ]);

  const status = VALID_STATUSES.includes(data.status as ProjectStatus)
    ? (data.status as ProjectStatus)
    : "in-progress";

  return {
    title: String(data.title),
    summary: String(data.summary),
    date: normalizeContentDate("content/projects", slug, data.date),
    updated: data.updated
      ? normalizeContentDate("content/projects", slug, data.updated)
      : undefined,
    stack: Array.isArray(data.stack) ? (data.stack as string[]) : [],
    status,
    url: data.url ? String(data.url) : undefined,
    github: data.github ? String(data.github) : undefined,
    featured: Boolean(data.featured),
    priority: typeof data.priority === "number" ? data.priority : 0,
  };
}

const loader = createContentLoader<ProjectFrontmatter>({
  dir: "content/projects",
  normalize: normalizeFrontmatter,
  compare: (a, b) => {
    const priorityDiff =
      (b.frontmatter.priority ?? 0) - (a.frontmatter.priority ?? 0);
    if (priorityDiff !== 0) return priorityDiff;

    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    );
  },
});

export const getProjectSlugs = loader.getSlugs;
export const getProjectBySlug = loader.getBySlug;
export const getAllProjects = loader.getAll;

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.frontmatter.featured);
}
