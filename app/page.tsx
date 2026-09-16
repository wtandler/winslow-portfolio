import { getProjectsByCategory } from "@/lib/mdx";
import { ProjectCard } from "@/components/projects/ProjectCard";
import Link from "next/link";

export default function HomePage() {
  const enterpriseProjects = getProjectsByCategory("enterprise");
  const independentProjects = getProjectsByCategory("independent");

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Hero */}
      <header className="mb-10">
        <p className="kicker mb-3">AI Systems Architect and Product Builder</p>
        <h1
          className="text-2xl sm:text-3xl font-medium tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Winslow Tandler
        </h1>
        <p className="max-w-2xl mb-3" style={{ color: "var(--text-secondary)" }}>
          I work with enterprise change and program teams to uncover
          operational problems and create Microsoft-native AI products. I own
          the work from stakeholder discovery and product design through
          launch, governance, compliance, and production support.
        </p>
        <p className="max-w-2xl text-sm" style={{ color: "var(--text-tertiary)" }}>
          I use coding agents to turn product requirements into production
          software while retaining responsibility for system design, quality,
          release decisions, and ongoing operations.
        </p>
      </header>

      {/* Enterprise work */}
      {enterpriseProjects.length > 0 && (
        <section className="rule-strong pt-5">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="kicker">Enterprise change and operations</h2>
            <Link
              href="/projects"
              className="text-sm hover:underline"
              style={{ color: "var(--text-muted)" }}
            >
              All projects
            </Link>
          </div>

          <div className="grid gap-3">
            {enterpriseProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Independent work */}
      {independentProjects.length > 0 && (
        <section className="mt-12 rule-strong pt-5">
          <h2 className="kicker mb-3">Independent products and research</h2>
          <p
            className="max-w-2xl mb-4 text-sm"
            style={{ color: "var(--text-tertiary)" }}
          >
            Products I build and run on my own, applying the same approach in
            markets, research, and community operations.
          </p>
          <div className="grid gap-3">
            {independentProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
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
