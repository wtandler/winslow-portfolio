"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/mdx";
import { STATUS_COLORS } from "@/lib/status";
import { formatDate } from "@/lib/dates";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, frontmatter, readingTime } = project;
  const { title, summary, date, stack, status } = frontmatter;

  const formattedDate = formatDate(date, "monthYear");

  return (
    <Link href={`/projects/${slug}`}>
      <motion.article
        className="block p-5"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
        }}
        whileHover={{
          borderColor: "var(--border-default)",
          boxShadow: "var(--shadow-md)",
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2
            className="text-base font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h2>
          <span
            className="flex items-center gap-1.5 text-xs uppercase shrink-0"
            style={{
              color: STATUS_COLORS[status],
              letterSpacing: "var(--tracking-caps)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: STATUS_COLORS[status] }}
            />
            {status}
          </span>
        </div>

        <p className="mb-4 text-sm" style={{ color: "var(--text-tertiary)" }}>
          {summary}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs"
                style={{
                  background: "var(--bg-secondary)",
                  color: "var(--text-tertiary)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {tech}
              </span>
            ))}
            {stack.length > 4 && (
              <span
                className="px-2 py-0.5 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                +{stack.length - 4}
              </span>
            )}
          </div>

          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <span>{formattedDate}</span>
            <span aria-hidden="true">·</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
