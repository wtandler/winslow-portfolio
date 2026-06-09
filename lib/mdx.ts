import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date: string;
  stack: string[];
  status: "live" | "in-progress" | "archived";
  url?: string;
  github?: string;
  featured?: boolean;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
  readingTime: string;
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
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
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
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });

  return projects;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.frontmatter.featured);
}
