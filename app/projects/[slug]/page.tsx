import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { STATUS_COLORS } from "@/lib/status";
import { formatDate } from "@/lib/dates";
import { MDXContent } from "@/components/projects/MDXContent";
import { TagList } from "@/components/projects/TagList";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Only slugs from generateStaticParams resolve; unknown slugs 404 at the
// router instead of reaching the filesystem loader.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const { title, summary } = project.frontmatter;
  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      url: `/projects/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content, readingTime } = project;
  const {
    title,
    summary,
    date,
    updated,
    platforms,
    stack,
    status,
    ownership,
    role,
    url,
    github,
  } = frontmatter;

  // The case-study header shows the full role strip when the frontmatter
  // declares one, otherwise the one-line ownership label. Both come from the
  // content file so an independent build never inherits an enterprise claim.
  const roleLine = role ?? ownership;

  const formattedDate = updated
    ? `${formatDate(date, "monthYear")} · updated ${formatDate(updated, "monthYear")}`
    : formatDate(date, "monthYear");

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-block text-sm mb-8 hover:underline"
        style={{ color: "var(--text-muted)" }}
      >
        ← All projects
      </Link>

      {/* Header */}
      <header className="mb-10 pt-6 rule-strong">
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span
            className="flex items-center gap-1.5 text-xs uppercase"
            style={{
              color: STATUS_COLORS[status],
              letterSpacing: "var(--tracking-caps)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: STATUS_COLORS[status] }}
            />
            {status}
          </span>
          <span style={{ color: "var(--text-muted)" }} aria-hidden="true">
            ·
          </span>
          <span style={{ color: "var(--text-muted)" }}>
            {formattedDate}
          </span>
          <span style={{ color: "var(--text-muted)" }} aria-hidden="true">
            ·
          </span>
          <span style={{ color: "var(--text-muted)" }}>
            {readingTime}
          </span>
        </div>

        <h1
          className="text-2xl sm:text-3xl font-medium tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h1>

        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          {summary}
        </p>

        {/* Role strip */}
        {roleLine && (
          <p className="mb-4 text-sm" style={{ color: "var(--text-muted)" }}>
            <span
              className="text-xs uppercase mr-2"
              style={{ letterSpacing: "var(--tracking-caps)" }}
            >
              My role
            </span>
            {roleLine}
          </p>
        )}

        {/* Platforms */}
        {platforms.length > 0 && (
          <div className="mb-6">
            <TagList tags={platforms} />
          </div>
        )}

        {/* Links */}
        {(url || github) && (
          <div className="flex items-center gap-3">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center gap-2 px-4 py-2 text-sm"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                View live
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center gap-2 px-4 py-2 text-sm"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                }}
              >
                GitHub
              </a>
            )}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose">
        <MDXContent source={content} />
      </div>

      {/* Technology used in this product */}
      {stack.length > 0 && (
        <section
          className="mt-12 pt-6"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <h2 className="kicker mb-3">Technology used in this product</h2>
          <TagList tags={stack} />
        </section>
      )}

      {/* Footer */}
      <footer
        className="mt-12 pt-6"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <Link
          href="/projects"
          className="text-sm hover:underline"
          style={{ color: "var(--text-muted)" }}
        >
          ← All projects
        </Link>
      </footer>
    </article>
  );
}
