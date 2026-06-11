import { getAllProjects, getFeaturedProjects } from "@/lib/mdx";
import { getAllWriting } from "@/lib/writing";
import { formatDate } from "@/lib/dates";
import { ProjectCard } from "@/components/projects/ProjectCard";
import Link from "next/link";

const domains = [
  "trading desks",
  "event ops",
  "change management",
  "nonprofit ops",
  "intake & triage",
  "fitness",
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const projects =
    featuredProjects.length > 0 ? featuredProjects : getAllProjects();
  const writing = getAllWriting().slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Hero */}
      <header className="mb-14">
        <h1
          className="text-2xl sm:text-3xl font-medium tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Winslow Tandler
        </h1>
        <p className="max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          Case studies of the problem, what shipped, and how each tool fits the
          work.
        </p>

        {/* Proof: range across domains */}
        <div
          className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          {domains.map((domain, i) => (
            <span key={domain} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">·</span>}
              {domain}
            </span>
          ))}
        </div>
      </header>

      {/* Projects */}
      <section className="rule-strong pt-5">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="kicker">Selected work</h2>
          <Link
            href="/projects"
            className="text-sm hover:underline"
            style={{ color: "var(--text-muted)" }}
          >
            All projects
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div
            className="p-6"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              No projects yet.
            </p>
          </div>
        )}
      </section>

      {/* Writing */}
      {writing.length > 0 && (
        <section className="mt-14 rule-strong pt-5">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="kicker">Writing</h2>
            <Link
              href="/writing"
              className="text-sm hover:underline"
              style={{ color: "var(--text-muted)" }}
            >
              All writing
            </Link>
          </div>

          <div>
            {writing.map((piece) => (
              <Link
                key={piece.slug}
                href={`/writing/${piece.slug}`}
                className="group block py-4"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  {piece.frontmatter.category && (
                    <span className="kicker">
                      {piece.frontmatter.category}
                    </span>
                  )}
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {formatDate(piece.frontmatter.date)}
                  </span>
                </div>
                <h3
                  className="text-base font-medium group-hover:underline"
                  style={{
                    color: "var(--text-primary)",
                    textUnderlineOffset: "4px",
                  }}
                >
                  {piece.frontmatter.title}
                </h3>
                <p
                  className="text-sm mt-1 max-w-2xl"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {piece.frontmatter.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      <footer
        className="mt-12 pt-6"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <div
          className="flex gap-6 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          <Link href="/contact" className="hover:underline">
            Get in touch
          </Link>
        </div>
      </footer>
    </div>
  );
}
