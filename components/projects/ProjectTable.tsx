import Link from "next/link";
import type { Project } from "@/lib/mdx";
import { formatDate } from "@/lib/dates";
import { splitFigures } from "@/lib/figures";
import { StatusPill } from "./StatusPill";
import { TagList } from "./TagList";

// Ruled project list: Product | Status | Started. Each row links to its case
// study; on phones the status and date move above the product text.
export function ProjectTable({ projects }: { projects: Project[] }) {
  return (
    <div>
      <div className="project-table-head" aria-hidden="true">
        <span>Product</span>
        <span>Status</span>
        <span>Started</span>
      </div>
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const { slug, frontmatter } = project;
  const { title, summary, date, platforms, status, ownership } = frontmatter;

  return (
    <Link href={`/projects/${slug}`} className="project-row">
      <div className="project-row-main">
        <h3
          className="project-row-title text-lg font-semibold mb-1.5"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.015em" }}
        >
          {title}
        </h3>
        <p
          className="project-row-summary text-[0.9375rem]"
          style={{ color: "var(--text-tertiary)" }}
        >
          {splitFigures(summary).map((segment, i, all) =>
            segment.figure ? (
              <strong key={i}>{segment.text}</strong>
            ) : all[i - 1]?.figure && segment.text.startsWith("-") ? (
              // Keep "12-month" together: a non-breaking hyphen after a figure.
              "\u2011" + segment.text.slice(1)
            ) : (
              segment.text
            )
          )}
        </p>
        {ownership && (
          <p className="mt-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
            {ownership}
          </p>
        )}
        {platforms.length > 0 && (
          <TagList tags={platforms} className="mt-2.5 text-xs" />
        )}
      </div>
      <div>
        <StatusPill status={status} />
      </div>
      <div
        className="project-row-date text-sm tabular-nums pt-0.5"
        style={{ color: "var(--text-secondary)" }}
      >
        {formatDate(date, "monthYear")}
      </div>
    </Link>
  );
}
