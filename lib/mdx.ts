import {
  createContentLoader,
  normalizeContentDate,
  requireFrontmatterKeys,
  type ContentEntry,
} from "./content";
import {
  VALID_CATEGORIES,
  VALID_STATUSES,
  type ProjectCategory,
  type ProjectStatus,
} from "./status";

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date: string;
  // Optional "last updated" date, shown alongside the start date.
  updated?: string;
  // Product-level platform tags shown on cards (e.g. "Power Platform").
  platforms: string[];
  // Full implementation technologies, shown only inside the case study.
  stack: string[];
  status: ProjectStatus;
  // Which group the project renders under; defaults to "independent".
  category: ProjectCategory;
  // One-sentence role summary shown on cards.
  ownership?: string;
  // Full role strip shown in the case-study header ("My role: ..."); falls
  // back to ownership when absent.
  role?: string;
  url?: string;
  github?: string;
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

  // A present-but-invalid status or category fails the build loudly (like
  // dates): a silent fallback would misclassify a case study, and statuses
  // must reflect current reality. Absent values still get defaults.
  if (
    data.status !== undefined &&
    !VALID_STATUSES.includes(data.status as ProjectStatus)
  ) {
    throw new Error(
      `content/projects/${slug}.mdx has an invalid status: ${String(data.status)} (valid: ${VALID_STATUSES.join(", ")})`
    );
  }
  const status = (data.status as ProjectStatus | undefined) ?? "in-progress";

  if (
    data.category !== undefined &&
    !VALID_CATEGORIES.includes(data.category as ProjectCategory)
  ) {
    throw new Error(
      `content/projects/${slug}.mdx has an invalid category: ${String(data.category)} (valid: ${VALID_CATEGORIES.join(", ")})`
    );
  }
  const category =
    (data.category as ProjectCategory | undefined) ?? "independent";

  return {
    title: String(data.title),
    summary: String(data.summary),
    date: normalizeContentDate("content/projects", slug, data.date),
    updated: data.updated
      ? normalizeContentDate("content/projects", slug, data.updated)
      : undefined,
    platforms: Array.isArray(data.platforms) ? (data.platforms as string[]) : [],
    stack: Array.isArray(data.stack) ? (data.stack as string[]) : [],
    status,
    category,
    ownership: data.ownership ? String(data.ownership) : undefined,
    role: data.role ? String(data.role) : undefined,
    url: data.url ? String(data.url) : undefined,
    github: data.github ? String(data.github) : undefined,
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

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getAllProjects().filter(
    (project) => project.frontmatter.category === category
  );
}
