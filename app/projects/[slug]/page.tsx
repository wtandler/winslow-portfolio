import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { STATUS_COLORS } from "@/lib/status";
import { MDXContent } from "@/components/projects/MDXContent";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

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

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content, readingTime } = project;
  const { title, summary, date, stack, status, url, github } = frontmatter;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-block text-sm mb-8"
        style={{ color: "var(--text-muted)" }}
      >
        &lt;-- ./projects
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span
            className="flex items-center gap-1.5 uppercase"
            style={{ color: STATUS_COLORS[status] }}
          >
            <span
              className="w-1.5 h-1.5"
              style={{ background: STATUS_COLORS[status] }}
            />
            {status}
          </span>
          <span style={{ color: "var(--text-muted)" }}>|</span>
          <span style={{ color: "var(--text-muted)" }}>
            {formattedDate}
          </span>
          <span style={{ color: "var(--text-muted)" }}>|</span>
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

        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
          {summary}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs"
              style={{
                background: "var(--bg-tertiary)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {(url || github) && (
          <div className="flex items-center gap-3">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                }}
              >
                view live --&gt;
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-primary)",
                }}
              >
                github
              </a>
            )}
          </div>
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
          href="/projects"
          className="text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          &lt;-- back to all projects
        </Link>
      </footer>
    </article>
  );
}
