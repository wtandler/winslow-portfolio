import { getProjectsByCategory } from "@/lib/mdx";
import { ProjectTable } from "@/components/projects/ProjectTable";
import Link from "next/link";

export default function HomePage() {
  const enterpriseProjects = getProjectsByCategory("enterprise");
  const independentProjects = getProjectsByCategory("independent");

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Hero */}
      <header className="pt-8 sm:pt-12 mb-12">
        <p className="kicker mb-4">AI Systems Architect and Product Builder</p>
        <h1
          className="text-[2.75rem] sm:text-6xl font-semibold leading-none mb-6 -ml-0.5"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
        >
          Winslow Tandler
        </h1>
        <p
          className="max-w-2xl mb-4 text-lg sm:text-[1.1875rem] leading-relaxed"
          style={{ color: "var(--text-primary)" }}
        >
          I work with enterprise change and program teams to uncover
          operational problems and create Microsoft-native AI products. I own
          the work from stakeholder discovery and product design through
          launch, governance, compliance, and production support.
        </p>
        <p
          className="max-w-2xl text-[0.9375rem]"
          style={{ color: "var(--text-tertiary)" }}
        >
          I use coding agents to turn product requirements into production
          software while retaining responsibility for system design, quality,
          release decisions, and ongoing operations.
        </p>
      </header>

      {/* Front matter: collapsible platform note */}
      <section
        className="mb-10"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <details className="disclosure">
          <summary>
            <h2 className="kicker">Microsoft ecosystem</h2>
          </summary>
          <div className="disclosure-body">
            <p
              className="max-w-2xl text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Most of my enterprise work lives in the Microsoft ecosystem. I
              build with Power Platform, Power Apps canvas, model-driven and
              code apps, Dataverse, Copilot Studio, Power Automate, Azure,
              Azure DevOps Boards and work items, Microsoft Fabric, Azure AI
              Foundry, Azure OpenAI, Azure AI Search, Microsoft Graph, and
              Entra ID.
            </p>
          </div>
        </details>
      </section>

      {/* Enterprise work */}
      {enterpriseProjects.length > 0 && (
        <section className="rule-strong pt-5">
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h2 className="kicker">Enterprise change and operations</h2>
            <Link
              href="/projects"
              className="text-sm whitespace-nowrap hover:underline"
              style={{ color: "var(--text-muted)" }}
            >
              All projects
            </Link>
          </div>

          <ProjectTable projects={enterpriseProjects} />
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
          <ProjectTable projects={independentProjects} />
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
