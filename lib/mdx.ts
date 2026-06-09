import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { VALID_STATUSES, type ProjectStatus } from "./status";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date: string;
  stack: string[];
  status: ProjectStatus;
  url?: string;
  github?: string;
  featured?: boolean;
  // Higher sorts first; ties fall back to date (newest first). Defaults to 0.
  priority?: number;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
  readingTime: string;
}

// Validate + normalize frontmatter so a typo in one .mdx file fails loudly here
// (with the file name) at build time, instead of crashing a component at render.
function normalizeFrontmatter(
  slug: string,
  data: Record<string, unknown>
): ProjectFrontmatter {
  const missing = (["title", "summary", "date"] as const).filter(
    (key) => !data[key]
  );
  if (missing.length > 0) {
    throw new Error(
      `content/projects/${slug}.mdx is missing required frontmatter: ${missing.join(
        ", "
      )}`
    );
  }

  const status = VALID_STATUSES.includes(data.status as ProjectStatus)
    ? (data.status as ProjectStatus)
    : "in-progress";

  return {
    title: String(data.title),
    summary: String(data.summary),
    date: String(data.date),
    stack: Array.isArray(data.stack) ? (data.stack as string[]) : [],
    status,
    url: data.url ? String(data.url) : undefined,
    github: data.github ? String(data.github) : undefined,
    featured: Boolean(data.featured),
    priority: typeof data.priority === "number" ? data.priority : 0,
  };
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  let parsed;
  try {
    parsed = matter(fileContents);
  } catch (error) {
    throw new Error(
      `content/projects/${slug}.mdx has invalid frontmatter (YAML): ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }

  const data = parsed.data as Record<string, unknown>;
  const content = parsed.content;

  return {
    slug,
    frontmatter: normalizeFrontmatter(slug, data),
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      const priorityDiff =
        (b.frontmatter.priority ?? 0) - (a.frontmatter.priority ?? 0);
      if (priorityDiff !== 0) return priorityDiff;

      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });

  return projects;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.frontmatter.featured);
}
