import { getAllProjects, getFeaturedProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/projects/ProjectCard";
import Link from "next/link";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const projects = featuredProjects.length > 0 ? featuredProjects : getAllProjects();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Header - minimal */}
      <header className="mb-10">
        <h1
          className="text-lg mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          winslow
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          product + engineering
        </p>
        <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
          I build AI-first software and write about the hard parts. Selected work below.
        </p>
      </header>

      {/* Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-sm"
            style={{ color: "var(--text-tertiary)" }}
          >
            featured projects
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
      <footer className="mt-12 pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="flex gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
          <Link href="/about" className="hover:underline">about</Link>
          <Link href="/contact" className="hover:underline">contact</Link>
        </div>
      </footer>
    </div>
  );
}
