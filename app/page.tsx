import { getProjectsByCategory } from "@/lib/mdx";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { STATUS_COLORS } from "@/lib/status";
import Link from "next/link";

const focusAreas = [
  "Enterprise change and program management",
  "Microsoft-native AI products",
  "Portfolio intelligence",
  "Human-governed agentic workflows",
];

const workSteps = [
  {
    title: "Start with the work.",
    body: "I learn how stakeholders make decisions, where effort is lost, and which problems have not yet become formal requirements.",
  },
  {
    title: "Define the product.",
    body: "I turn the operating problem into a workflow, system design, success measures, and release plan that fit the organization's existing tools and controls.",
  },
  {
    title: "Own it in production.",
    body: "I direct coding agents, test the product, manage releases, support users, maintain compliance, and keep improving it after launch.",
  },
];

export default function HomePage() {
  const enterpriseProjects = getProjectsByCategory("enterprise");
  const independentProjects = getProjectsByCategory("independent");

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Hero */}
      <header className="mb-14">
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

        {/* Focus strip */}
        <div
          className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          {focusAreas.map((area, i) => (
            <span key={area} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">·</span>}
              {area}
            </span>
          ))}
        </div>
      </header>

      {/* Enterprise work */}
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

      {/* How I work */}
      <section className="mt-12 rule-strong pt-5">
        <h2 className="kicker mb-4">How I work</h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {workSteps.map((step, i) => (
            <li key={step.title}>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {i + 1}. {step.title}
              </p>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Microsoft ecosystem */}
      <section className="mt-12 rule-strong pt-5">
        <h2 className="kicker mb-4">Microsoft ecosystem</h2>
        <p className="max-w-2xl text-sm" style={{ color: "var(--text-secondary)" }}>
          Most of my enterprise work lives in the Microsoft ecosystem. I build
          with Power Platform, Power Apps canvas, model-driven and code apps,
          Dataverse, Copilot Studio, Power Automate, Azure, Azure DevOps
          Boards and work items, Microsoft Fabric, Azure AI Foundry, Azure
          OpenAI, Azure AI Search, Microsoft Graph, and Entra ID.
        </p>
      </section>

      {/* Independent work */}
      <section className="mt-12 rule-strong pt-5">
        <h2 className="kicker mb-4">Independent products and research</h2>
        <div className="grid gap-2">
          {independentProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="flex items-baseline justify-between gap-4 py-2 group"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <div className="min-w-0 flex items-baseline gap-2">
                <span
                  className="text-sm font-medium shrink-0 group-hover:underline"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.frontmatter.title}
                </span>
                <span
                  className="text-sm hidden sm:inline truncate"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {project.frontmatter.summary}
                </span>
              </div>
              <span
                className="text-xs uppercase shrink-0"
                style={{
                  color: STATUS_COLORS[project.frontmatter.status],
                  letterSpacing: "var(--tracking-caps)",
                }}
              >
                {project.frontmatter.status}
              </span>
            </Link>
          ))}
        </div>
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
            Get in touch
          </Link>
        </div>
      </footer>
    </div>
  );
}
