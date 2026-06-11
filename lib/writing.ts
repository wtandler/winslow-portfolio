import {
  createContentLoader,
  normalizeContentDate,
  requireFrontmatterKeys,
  type ContentEntry,
} from "./content";

export interface WritingFrontmatter {
  title: string;
  summary: string;
  date: string;
  // Small label shown above the title, e.g. "Second Order · Issue 02"
  category?: string;
  // Optional link to a full PDF version (path under /public or external URL)
  pdf?: string;
}

export type WritingPiece = ContentEntry<WritingFrontmatter>;

function normalizeFrontmatter(
  slug: string,
  data: Record<string, unknown>
): WritingFrontmatter {
  requireFrontmatterKeys("content/writing", slug, data, [
    "title",
    "summary",
    "date",
  ]);

  // The pdf link renders as a prominent href; only allow site-rooted paths
  // and https URLs so a bad content edit can't ship javascript:/data: links.
  const pdf = data.pdf ? String(data.pdf) : undefined;
  if (pdf && !pdf.startsWith("/") && !pdf.startsWith("https://")) {
    throw new Error(
      `content/writing/${slug}.mdx has an invalid pdf link (must start with "/" or "https://"): ${pdf}`
    );
  }

  return {
    title: String(data.title),
    summary: String(data.summary),
    date: normalizeContentDate("content/writing", slug, data.date),
    category: data.category ? String(data.category) : undefined,
    pdf,
  };
}

const loader = createContentLoader<WritingFrontmatter>({
  dir: "content/writing",
  normalize: normalizeFrontmatter,
  compare: (a, b) =>
    new Date(b.frontmatter.date).getTime() -
    new Date(a.frontmatter.date).getTime(),
});

export const getWritingSlugs = loader.getSlugs;
export const getWritingBySlug = loader.getBySlug;
export const getAllWriting = loader.getAll;
