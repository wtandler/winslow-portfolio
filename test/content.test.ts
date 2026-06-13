import fs from "fs";
import path from "path";
import { describe, it, expect, vi, beforeAll, afterEach } from "vitest";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/mdx";
import { VALID_STATUSES } from "@/lib/status";
import sitemap from "@/app/sitemap";

const projectsDir = path.join(process.cwd(), "content/projects");

// A crashed earlier run can strand a fixture file, which the build and
// sitemap would then treat as real content. Purge before running.
beforeAll(() => {
  for (const file of fs.readdirSync(projectsDir)) {
    if (file.startsWith("__fixture-")) {
      fs.rmSync(path.join(projectsDir, file), { force: true });
    }
  }
});

// Drops a temporary .mdx fixture into content/projects, runs the assertion,
// and always cleans up. Fixture tests live in this file (not a separate one)
// because vitest runs files in parallel workers — a half-valid fixture left
// on disk would race the invariant tests below.
function withFixture(name: string, contents: string, run: () => void) {
  const file = path.join(projectsDir, `${name}.mdx`);
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

  it("normalizes the optional updated date and keeps it at or after date", () => {
    for (const project of getAllProjects()) {
      const { date, updated } = project.frontmatter;
      if (updated !== undefined) {
        expect(Number.isNaN(new Date(updated).getTime())).toBe(false);
        expect(new Date(updated).getTime()).toBeGreaterThanOrEqual(
          new Date(date).getTime()
        );
      }
    }
  });

  it("keeps every case study body under 1,400 words", () => {
    // Length discipline from the copy-voice rules in CLAUDE.md. Count prose
    // words only: MDX comments and bare markdown markers are not words.
    for (const project of getAllProjects()) {
      const words = project.content
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
        .split(/\s+/)
        .filter((token) => /[A-Za-z0-9]/.test(token)).length;
      expect(words, project.slug).toBeLessThan(1400);
    }
  });
});

// These exercise the shared content loader's guard paths (lib/content.ts)
// through the projects normalizer. They use throwaway fixtures so a malformed
// entry never has to live in real content to prove the guard fires.
describe("project frontmatter edge cases", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws with the file name when required frontmatter is missing", () => {
    withFixture(
      "__fixture-missing-keys__",
      `---\ntitle: "Only a title"\n---\n\nBody.\n`,
      () => {
        expect(() => getProjectBySlug("__fixture-missing-keys__")).toThrow(
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
        expect(() => getProjectBySlug("__fixture-bad-yaml__")).toThrow(
          /__fixture-bad-yaml__\.mdx has invalid frontmatter/
        );
      }
    );
  });

  it("throws with the file name on an unparseable date", () => {
    withFixture(
      "__fixture-bad-date__",
      `---\ntitle: "Bad date"\nsummary: "Date cannot parse."\ndate: "2026-13-45"\n---\n\nBody.\n`,
      () => {
        expect(() => getProjectBySlug("__fixture-bad-date__")).toThrow(
          /__fixture-bad-date__\.mdx has an unparseable date/
        );
      }
    );
  });

  it("normalizes unquoted YAML dates (Date objects) to ISO day strings", () => {
    withFixture(
      "__fixture-yaml-date__",
      `---\ntitle: "YAML date"\nsummary: "Unquoted date."\ndate: 2020-06-15\n---\n\nBody.\n`,
      () => {
        const project = getProjectBySlug("__fixture-yaml-date__");
        expect(project!.frontmatter.date).toBe("2020-06-15");
      }
    );
  });

  it("rejects path-shaped slugs", () => {
    expect(getProjectBySlug("../projects/coachgpt")).toBeNull();
  });

  it("defaults featured/priority and leaves optional links undefined when absent", () => {
    withFixture(
      "__fixture-minimal__",
      `---\ntitle: "Minimal"\nsummary: "Just the required fields."\ndate: "2020-01-01"\n---\n\nBody.\n`,
      () => {
        const project = getProjectBySlug("__fixture-minimal__");
        expect(project).not.toBeNull();
        expect(project!.frontmatter.featured).toBe(false);
        expect(project!.frontmatter.priority).toBe(0);
        expect(project!.frontmatter.url).toBeUndefined();
        expect(project!.frontmatter.github).toBeUndefined();
        expect(project!.frontmatter.updated).toBeUndefined();
      }
    );
  });

  it("returns no slugs when the projects directory does not exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(getProjectSlugs()).toEqual([]);
  });
});

describe("sitemap", () => {
  it("includes the static routes", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/projects"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/contact"))).toBe(true);
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
