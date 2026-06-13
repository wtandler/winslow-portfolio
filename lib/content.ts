import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface ContentEntry<F> {
  slug: string;
  frontmatter: F;
  content: string;
  readingTime: string;
}

interface LoaderOptions<F> {
  // Directory relative to the repo root, e.g. "content/projects"
  dir: string;
  // Validates + normalizes frontmatter; throws (naming the file) on bad input
  normalize: (slug: string, data: Record<string, unknown>) => F;
  // Sort order for getAll()
  compare: (a: ContentEntry<F>, b: ContentEntry<F>) => number;
}

// Shared MDX content loader. Each content type supplies its directory,
// frontmatter normalizer, and sort order; reading, parsing, error naming,
// and reading time live here once.
export function createContentLoader<F>({
  dir,
  normalize,
  compare,
}: LoaderOptions<F>) {
  const directory = path.join(process.cwd(), dir);

  function getSlugs(): string[] {
    if (!fs.existsSync(directory)) {
      return [];
    }
    return fs
      .readdirSync(directory)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  }

  // cache() shares one parse per slug per request/build — generateMetadata
  // and the page component both call getBySlug for the same slug.
  const getBySlug = cache((slug: string): ContentEntry<F> | null => {
    // Defense in depth: slugs come from readdirSync today, but this loader is
    // the reusable primitive — never let a path-shaped slug traverse.
    if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) {
      return null;
    }

    const fullPath = path.join(directory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    let parsed;
    try {
      parsed = matter(fileContents);
    } catch (error) {
      throw new Error(
        `${dir}/${slug}.mdx has invalid frontmatter (YAML): ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }

    return {
      slug,
      frontmatter: normalize(slug, parsed.data as Record<string, unknown>),
      content: parsed.content,
      readingTime: readingTime(parsed.content).text,
    };
  });

  function getAll(): ContentEntry<F>[] {
    return getSlugs()
      .map((slug) => getBySlug(slug))
      .filter((entry): entry is ContentEntry<F> => entry !== null)
      .sort(compare);
  }

  return { getSlugs, getBySlug, getAll };
}

// Build-time guard shared by normalizers: fails loudly with the file name
// instead of crashing a component at render.
export function requireFrontmatterKeys(
  dir: string,
  slug: string,
  data: Record<string, unknown>,
  keys: readonly string[]
): void {
  const missing = keys.filter((key) => !data[key]);
  if (missing.length > 0) {
    throw new Error(
      `${dir}/${slug}.mdx is missing required frontmatter: ${missing.join(", ")}`
    );
  }
}

// Dates need two guards the key check can't give: YAML hands unquoted dates
// to us as Date objects (normalize to ISO day strings), and a typo'd date
// would otherwise render "Invalid Date" and sort arbitrarily (NaN compares).
export function normalizeContentDate(
  dir: string,
  slug: string,
  value: unknown
): string {
  const date =
    value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
  if (Number.isNaN(new Date(date).getTime())) {
    throw new Error(
      `${dir}/${slug}.mdx has an unparseable date: ${String(value)}`
    );
  }
  return date;
}
