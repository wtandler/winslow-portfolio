import { getProjectsByCategory } from "@/lib/mdx";
import { ProjectTable } from "@/components/projects/ProjectTable";
import { CATEGORY_LABELS, VALID_CATEGORIES } from "@/lib/status";

export const metadata = {
  title: "Products and case studies",
  description:
    "Case studies of AI products for enterprise change and program management, built in the Microsoft ecosystem and owned through production.",
};

export default function ProjectsPage() {
  const groups = VALID_CATEGORIES.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    projects: getProjectsByCategory(category),
  })).filter((group) => group.projects.length > 0);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10">
        <h1
          className="text-2xl sm:text-3xl font-medium tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Products and case studies
        </h1>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          Case studies of products I have built. The enterprise work is change
          and program management tooling on Microsoft platforms. The
          independent work is a rates research site, a weekly research
          briefing, and a platform for volunteer nurse chapters.
        </p>
        <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          On every product here I set the direction, design the system, write
          the requirements and acceptance criteria, test, decide releases, and
          run it in production. Coding agents write and maintain the code.
        </p>
      </div>

      {groups.length > 0 ? (
        groups.map((group) => (
          <section key={group.category} className="rule-strong pt-5 mb-10">
            <h2 className="kicker mb-4">{group.label}</h2>
            <ProjectTable projects={group.projects} />
          </section>
        ))
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
