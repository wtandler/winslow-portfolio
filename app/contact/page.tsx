"use client";

import { motion } from "framer-motion";
import {
  StaggeredContainer,
  StaggeredItem,
} from "@/components/ui";

const contactLinks = [
  {
    label: "email",
    value: "slow@slowwin.xyz",
    href: "mailto:slow@slowwin.xyz",
    description: "Best for project inquiries",
  },
  {
    label: "github",
    value: "@wtandler",
    href: "https://github.com/wtandler",
    description: "See my code",
  },
  {
    label: "linkedin",
    value: "in/wtandler",
    href: "https://linkedin.com/in/wtandler",
    description: "Professional profile",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <StaggeredContainer className="space-y-10">
        {/* Header */}
        <section>
          <StaggeredItem>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--accent)" }}
            >
              $ ./contact
            </p>
          </StaggeredItem>

          <StaggeredItem>
            <h1
              className="text-2xl sm:text-3xl font-medium tracking-tight mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Let&apos;s talk.
            </h1>
          </StaggeredItem>

          <StaggeredItem>
            <p style={{ color: "var(--text-secondary)" }}>
              Interested in working together, have a question about my projects,
              or just want to connect? Reach out through any of the channels below.
            </p>
          </StaggeredItem>
        </section>

        {/* Contact Links */}
        <section>
          <div className="grid gap-3">
            {contactLinks.map((link) => (
              <StaggeredItem key={link.label}>
                <motion.a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="block p-4"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                  whileHover={{
                    borderColor: "var(--border-default)",
                    boxShadow: "var(--shadow-md)",
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className="text-xs uppercase w-16"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {link.label}
                      </span>
                      <div>
                        <p style={{ color: "var(--text-primary)" }}>
                          {link.value}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {link.description}
                        </p>
                      </div>
                    </div>
                    <span style={{ color: "var(--text-muted)" }}>
                      --&gt;
                    </span>
                  </div>
                </motion.a>
              </StaggeredItem>
            ))}
          </div>
        </section>

        {/* Availability */}
        <section>
          <StaggeredItem>
            <div
              className="p-4"
              style={{
                background: "var(--bg-secondary)",
                borderLeft: "2px solid var(--accent)",
              }}
            >
              <p
                className="text-sm uppercase mb-2"
                style={{ color: "var(--accent)" }}
              >
                status: available
              </p>
              <p style={{ color: "var(--text-secondary)" }}>
                Currently open to freelance projects and interesting collaborations.
              </p>
            </div>
          </StaggeredItem>
        </section>
      </StaggeredContainer>
    </div>
  );
}
