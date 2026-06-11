import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata = {
  title: "Projects",
  description: "AI tools built by learning the job first.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10">
        <h1
          className="text-2xl sm:text-3xl font-medium tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          What I&apos;ve Built
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Each case study covers the domain, the problem, and what shipped.
          Some were built alongside a team, some solo.
        </p>
      </div>

      {projects.length > 0 ? (
        <section className="rule-strong pt-5">
          <h2 className="kicker mb-4">Case studies</h2>
          <div className="grid gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : (
        <div
          className="p-8 text-center"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <p className="mb-3" style={{ color: "var(--text-secondary)" }}>
            No projects found.
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Add MDX files to <code>content/projects/</code>
          </p>
        </div>
      )}
    </div>
  );
}
