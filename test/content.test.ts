import { describe, it, expect } from "vitest";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { getAllWriting, getWritingBySlug } from "@/lib/writing";
import { VALID_STATUSES } from "@/lib/status";

// These tests run against the real content/ directory. They assert structural
// invariants (required frontmatter, sort order), not specific entries, so
// adding or editing content should never break them.

describe("getAllProjects", () => {
  it("returns projects with required frontmatter", () => {
    const projects = getAllProjects();
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(project.frontmatter.title).toBeTruthy();
      expect(project.frontmatter.summary).toBeTruthy();
      expect(Number.isNaN(new Date(project.frontmatter.date).getTime())).toBe(
        false
      );
      expect(VALID_STATUSES).toContain(project.frontmatter.status);
      expect(project.readingTime).toMatch(/min read/);
    }
  });

  it("sorts by priority first, then date descending", () => {
    const projects = getAllProjects();
    for (let i = 1; i < projects.length; i++) {
      const prev = projects[i - 1].frontmatter;
      const curr = projects[i].frontmatter;
      const prevPriority = prev.priority ?? 0;
      const currPriority = curr.priority ?? 0;
      expect(prevPriority).toBeGreaterThanOrEqual(currPriority);
      if (prevPriority === currPriority) {
        expect(new Date(prev.date).getTime()).toBeGreaterThanOrEqual(
          new Date(curr.date).getTime()
        );
      }
    }
  });

  it("returns null for a slug that does not exist", () => {
    expect(getProjectBySlug("does-not-exist")).toBeNull();
  });
});

describe("getAllWriting", () => {
  it("returns pieces with required frontmatter", () => {
    const pieces = getAllWriting();
    expect(pieces.length).toBeGreaterThan(0);
    for (const piece of pieces) {
      expect(piece.frontmatter.title).toBeTruthy();
      expect(piece.frontmatter.summary).toBeTruthy();
      expect(Number.isNaN(new Date(piece.frontmatter.date).getTime())).toBe(
        false
      );
      expect(piece.readingTime).toMatch(/min read/);
    }
  });

  it("sorts by date descending", () => {
    const pieces = getAllWriting();
    for (let i = 1; i < pieces.length; i++) {
      expect(new Date(pieces[i - 1].frontmatter.date).getTime())
        .toBeGreaterThanOrEqual(
          new Date(pieces[i].frontmatter.date).getTime()
        );
    }
  });

  it("returns null for a slug that does not exist", () => {
    expect(getWritingBySlug("does-not-exist")).toBeNull();
  });

  it("pdf links in frontmatter point at files that exist in public/", () => {
    const fs = require("fs") as typeof import("fs");
    const path = require("path") as typeof import("path");
    for (const piece of getAllWriting()) {
      const pdf = piece.frontmatter.pdf;
      if (pdf && pdf.startsWith("/")) {
        expect(fs.existsSync(path.join(process.cwd(), "public", pdf))).toBe(
          true
        );
      }
    }
  });
});
