"use client";

import { motion } from "framer-motion";
import {
  StaggeredContainer,
  StaggeredItem,
} from "@/components/ui";
import Link from "next/link";

const tools = [
  "Azure",
  "Claude",
  "ChatGPT",
  "Cursor",
  "v0",
  "FlutterFlow",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Vercel",
];

const principles = [
  {
    title: "Evidence-first decisions",
    description:
      "I anchor work in real user behavior, real constraints, and measurable outcomes—not vibes.",
  },
  {
    title: "Systems over hacks",
    description:
      "I design for maintainability: clear interfaces, predictable state, and boring reliability.",
  },
  {
    title: "Fast feedback loops",
    description:
      "I prototype early, validate quickly, and iterate with intent.",
  },
  {
    title: "Craft matters",
    description:
      "Thoughtful UX, strong naming, crisp docs, and small details that make software feel inevitable.",
  },
  {
    title: "Pragmatic optimism",
    description:
      "I'm enthusiastic about new tech, but I'm careful about what goes into production.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <StaggeredContainer className="space-y-12">
        {/* Intro */}
        <section>
          <StaggeredItem>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--accent)" }}
            >
              $ cat about.txt
            </p>
          </StaggeredItem>

          <StaggeredItem>
            <h1
              className="text-2xl sm:text-3xl font-medium tracking-tight mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Hard problems are hard to start.
            </h1>
          </StaggeredItem>

          <StaggeredItem>
            <div
              className="space-y-4"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                Paralysis by analysis kills productivity. A change management team
                should focus on change, not PowerPoints. A CrossFit coach should
                focus on coaching, not writing programs.
              </p>
              <p>
                I build tools that remove the busywork so people can do the actual work.
              </p>
              <p>
                Product and engineering: zoom out to shape the workflow, zoom in to
                make the implementation clean and shippable.
              </p>
            </div>
          </StaggeredItem>
        </section>

        {/* How I Work */}
        <section>
          <StaggeredItem>
            <h2
              className="text-base mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              # how_i_work
            </h2>
          </StaggeredItem>

          <div className="grid gap-4">
            {principles.map((principle, index) => (
              <StaggeredItem key={principle.title}>
                <motion.div
                  className="p-4"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                  whileHover={{
                    borderColor: "var(--border-default)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex gap-4">
                    <span
                      className="text-sm shrink-0"
                      style={{ color: "var(--accent)" }}
                    >
                      [{String(index + 1).padStart(2, "0")}]
                    </span>
                    <div>
                      <h3
                        className="mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {principle.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggeredItem>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section>
          <StaggeredItem>
            <h2
              className="text-base mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              # tools
            </h2>
          </StaggeredItem>

          <StaggeredItem>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <motion.span
                  key={tool}
                  className="px-3 py-1 text-sm"
                  style={{
                    background: "var(--bg-tertiary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                  whileHover={{
                    borderColor: "var(--accent)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                  transition={{ duration: 0.1 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </StaggeredItem>
        </section>

        {/* CTA */}
        <section>
          <StaggeredItem>
            <div
              className="p-6"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p
                className="mb-3"
                style={{ color: "var(--text-secondary)" }}
              >
                Want to see this approach in action?
              </p>
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  href="/projects"
                  className="transition-colors"
                  style={{ color: "var(--accent)" }}
                  aria-label="View projects"
                >
                  $ cd ./projects --&gt;
                </Link>
                <span
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  browse case studies
                </span>
              </div>
            </div>
          </StaggeredItem>
        </section>
      </StaggeredContainer>
    </div>
  );
}
