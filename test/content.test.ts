import fs from "fs";
import path from "path";
import { describe, it, expect, vi, afterEach } from "vitest";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import {
  getAllWriting,
  getWritingBySlug,
  getWritingSlugs,
} from "@/lib/writing";
import { VALID_STATUSES } from "@/lib/status";
import sitemap from "@/app/sitemap";

const writingDir = path.join(process.cwd(), "content/writing");

// Drops a temporary .mdx fixture into content/writing, runs the assertion,
// and always cleans up. Fixture tests live in this file (not a separate one)
// because vitest runs files in parallel workers — a half-valid fixture left
// on disk would race the invariant tests below.
function withFixture(name: string, contents: string, run: () => void) {
  const file = path.join(writingDir, `${name}.mdx`);
  fs.writeFileSync(file, contents);
  try {
    run();
  } finally {
    fs.rmSync(file, { force: true });
  }
}

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

describe("writing frontmatter edge cases", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws with the file name when required frontmatter is missing", () => {
    withFixture(
      "__fixture-missing-keys__",
      `---\ntitle: "Only a title"\n---\n\nBody.\n`,
      () => {
        expect(() => getWritingBySlug("__fixture-missing-keys__")).toThrow(
          /__fixture-missing-keys__\.mdx is missing required frontmatter: summary, date/
        );
      }
    );
  });

  it("throws with the file name on invalid YAML frontmatter", () => {
    withFixture(
      "__fixture-bad-yaml__",
      `---\ntitle: [unclosed\n---\n\nBody.\n`,
      () => {
        expect(() => getWritingBySlug("__fixture-bad-yaml__")).toThrow(
          /__fixture-bad-yaml__\.mdx has invalid frontmatter/
        );
      }
    );
  });

  it("leaves category and pdf undefined when absent", () => {
    withFixture(
      "__fixture-minimal__",
      `---\ntitle: "Minimal"\nsummary: "Just the required fields."\ndate: "2020-01-01"\n---\n\nBody.\n`,
      () => {
        const piece = getWritingBySlug("__fixture-minimal__");
        expect(piece).not.toBeNull();
        expect(piece!.frontmatter.category).toBeUndefined();
        expect(piece!.frontmatter.pdf).toBeUndefined();
      }
    );
  });

  it("sorts newer entries before older ones", () => {
    withFixture(
      "__fixture-older__",
      `---\ntitle: "Older"\nsummary: "Older entry."\ndate: "2000-01-02"\n---\n\nBody.\n`,
      () => {
        withFixture(
          "__fixture-oldest__",
          `---\ntitle: "Oldest"\nsummary: "Oldest entry."\ndate: "2000-01-01"\n---\n\nBody.\n`,
          () => {
            const slugs = getAllWriting().map((p) => p.slug);
            const older = slugs.indexOf("__fixture-older__");
            const oldest = slugs.indexOf("__fixture-oldest__");
            expect(older).toBeGreaterThanOrEqual(0);
            expect(oldest).toBeGreaterThanOrEqual(0);
            expect(older).toBeLessThan(oldest);
          }
        );
      }
    );
  });

  it("returns no slugs when the writing directory does not exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(getWritingSlugs()).toEqual([]);
  });
});

describe("sitemap", () => {
  it("includes the writing index and every writing entry", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/writing"))).toBe(true);
    for (const slug of getWritingSlugs()) {
      expect(urls.some((url) => url.endsWith(`/writing/${slug}`))).toBe(true);
    }
  });

  it("includes every project entry", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const project of getAllProjects()) {
      expect(
        urls.some((url) => url.endsWith(`/projects/${project.slug}`))
      ).toBe(true);
    }
  });
});
