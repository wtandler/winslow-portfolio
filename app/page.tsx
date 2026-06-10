import { getAllProjects, getFeaturedProjects } from "@/lib/mdx";
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

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Hero */}
      <header className="mb-14">
        <p className="text-sm mb-4" style={{ color: "var(--accent)" }}>
          $ whoami
        </p>
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

        {/* CTA */}
        <div className="mt-7 flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/contact"
            className="hover:underline"
            style={{ color: "var(--text-muted)" }}
          >
            get in touch --&gt;
          </Link>
        </div>
      </header>

      {/* Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            selected work
          </h2>
          <Link
            href="/projects"
            className="text-xs uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            all projects --&gt;
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
              // no projects yet
            </p>
          </div>
        )}
      </section>

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
            contact
          </Link>
        </div>
      </footer>
    </div>
  );
}
