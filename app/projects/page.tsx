import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata = {
  title: "Projects",
  description: "Explore my AI-built projects and case studies.",
};

const highlights = [
  {
    title: "Regulated product documentation + compliance",
    description:
      "Azure-based solution for AI-driven workflows for documentation and regulatory compliance—think correct labeling and artwork across every package and revision.",
    problems: [
      "Working through massive packaging/artwork files with tiny symbols and dense layouts.",
      "Adapting to dynamic requirements without losing traceability.",
      "Catching labeling/artwork issues before they become expensive mistakes.",
    ],
  },
  {
    title: "Threadbase",
    description:
      "An AI-powered portfolio governance tool for change management offices—built to manage change with clarity and traceability.",
    href: "https://threadbase.co",
    cta: "threadbase.co",
    problems: [
      "A memory + governance engine that surfaces insights before they become problems.",
      "Finding hidden relationships across initiatives without losing clarity in a vector database.",
      "Extracting signal from visually dense corporate slides and generating dashboards via prompts (reducing Power BI work).",
    ],
  },
  {
    title: "CoachGPT",
    description:
      "An AI-powered CrossFit/workout programming generator + workout log that scales and dynamically creates programs for users. Built before vibe-coding tools in FlutterFlow with GPT-3.5.",
    problems: [
      "Generating large, progressive programs before large-context models existed.",
      "Context engineering across multiple AI steps to keep plans cohesive and constraint-aware.",
      "Scaling personalized programming + logging without a human coach per user.",
    ],
  },
];

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10">
        <p
          className="text-sm mb-4"
          style={{ color: "var(--accent)" }}
        >
          $ ls ./projects
        </p>
        <h1
          className="text-2xl sm:text-3xl font-medium tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          What I&apos;ve Built
        </h1>
      <p style={{ color: "var(--text-secondary)" }}>
        Each project includes a case study showing how I collaborated with AI
        to build it.
      </p>
    </div>

      <section className="mb-12">
        <h2
          className="text-sm mb-6"
          style={{ color: "var(--text-tertiary)" }}
        >
          highlights
        </h2>
        <div className="grid gap-4">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="p-4"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div className="flex gap-4">
                <span
                  className="text-sm shrink-0"
                  style={{ color: "var(--accent)" }}
                >
                  [{String(index + 1).padStart(2, "0")}]
                </span>
                <div className="min-w-0">
                  <h3
                    className="mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {item.description}
                  </p>
                  <div className="mt-3 space-y-1">
                    {item.problems.map((problem) => (
                      <div
                        key={problem}
                        className="flex gap-2 text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span
                          aria-hidden="true"
                          style={{ color: "var(--accent)" }}
                        >
                          -
                        </span>
                        <span className="min-w-0">{problem}</span>
                      </div>
                    ))}
                  </div>
                  {item.href ? (
                    <p
                      className="text-sm mt-2"
                      style={{ color: "var(--accent)" }}
                    >
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.cta} --&gt;
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {projects.length > 0 ? (
        <section>
          <h2
            className="text-sm mb-4"
            style={{ color: "var(--text-tertiary)" }}
          >
            case studies
          </h2>
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
            // no projects found
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            add mdx files to <code>content/projects/</code>
          </p>
        </div>
      )}
    </div>
  );
}
