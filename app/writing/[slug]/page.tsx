import { notFound } from "next/navigation";
import Link from "next/link";
import { getWritingBySlug, getWritingSlugs } from "@/lib/writing";
import { formatDate } from "@/lib/dates";
import { MDXContent } from "@/components/projects/MDXContent";

interface WritingPageProps {
  params: Promise<{ slug: string }>;
}

// Only slugs from generateStaticParams resolve; unknown slugs 404 at the
// router instead of reaching the filesystem loader.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WritingPageProps) {
  const { slug } = await params;
  const piece = getWritingBySlug(slug);

  if (!piece) {
    return { title: "Not Found" };
  }

  const { title, summary } = piece.frontmatter;
  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      url: `/writing/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
    },
  };
}

export default async function WritingPiecePage({ params }: WritingPageProps) {
  const { slug } = await params;
  const piece = getWritingBySlug(slug);

  if (!piece) {
    notFound();
  }

  const { frontmatter, content, readingTime } = piece;
  const { title, summary, date, category, pdf } = frontmatter;

  const formattedDate = formatDate(date);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/writing"
        className="inline-block text-sm mb-8 hover:underline"
        style={{ color: "var(--text-muted)" }}
      >
        ← All writing
      </Link>

      {/* Header */}
      <header className="mb-10 pt-6 rule-strong">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
          {category && <span className="kicker">{category}</span>}
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {formattedDate} · {readingTime}
          </span>
        </div>

        <h1
          className="text-2xl sm:text-3xl font-medium tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h1>

        <p className="text-lg" style={{ color: "var(--text-tertiary)" }}>
          {summary}
        </p>

        {pdf && (
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-block mt-6 px-4 py-2 text-sm"
            style={{
              background: "var(--accent)",
              color: "var(--bg-primary)",
            }}
          >
            Read the full PDF
          </a>
        )}
      </header>

      {/* Content */}
      <div className="prose">
        <MDXContent source={content} />
      </div>

      {/* Footer */}
      <footer
        className="mt-12 pt-6"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <Link
          href="/writing"
          className="text-sm hover:underline"
          style={{ color: "var(--text-muted)" }}
        >
          ← All writing
        </Link>
      </footer>
    </article>
  );
}
