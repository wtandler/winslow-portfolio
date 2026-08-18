import fs from "fs";
import path from "path";
import { describe, it, expect, vi, beforeAll, afterEach } from "vitest";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
  getProjectsByCategory,
} from "@/lib/mdx";
import { VALID_CATEGORIES, VALID_STATUSES } from "@/lib/status";
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
      expect(VALID_CATEGORIES).toContain(project.frontmatter.category);
      expect(Array.isArray(project.frontmatter.platforms)).toBe(true);
      expect(project.readingTime).toMatch(/min read/);
    }
  });

  it("gives every real project card-level platform tags", () => {
    // Cards render platforms, not stack; an entry without them would show an
    // empty tag row. This applies to real content only, not fixtures.
    for (const project of getAllProjects()) {
      expect(
        project.frontmatter.platforms.length,
        project.slug
      ).toBeGreaterThan(0);
      for (const tag of project.frontmatter.platforms) {
        expect(typeof tag, project.slug).toBe("string");
      }
      for (const tech of project.frontmatter.stack) {
        expect(typeof tech, project.slug).toBe("string");
      }
    }
  });

  it("gives every enterprise and independent project an ownership label", () => {
    // Cards and case pages render the role line only when present; a missing
    // label silently drops it. Only "earlier" work may omit it.
    for (const project of getAllProjects()) {
      if (project.frontmatter.category !== "earlier") {
        expect(project.frontmatter.ownership, project.slug).toBeTruthy();
      }
    }
  });

  it("partitions all projects across the valid categories in sort order", () => {
    const all = getAllProjects();
    const grouped = VALID_CATEGORIES.flatMap((category) =>
      getProjectsByCategory(category)
    );
    expect(grouped.length).toBe(all.length);
    expect(new Set(grouped.map((p) => p.slug)).size).toBe(all.length);
    for (const category of VALID_CATEGORIES) {
      const group = getProjectsByCategory(category);
      for (const project of group) {
        expect(project.frontmatter.category).toBe(category);
      }
      // Within-group order preserves the global sort.
      const globalOrder = all
        .filter((p) => p.frontmatter.category === category)
        .map((p) => p.slug);
      expect(group.map((p) => p.slug)).toEqual(globalOrder);
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
        expect(project!.frontmatter.priority).toBe(0);
        expect(project!.frontmatter.url).toBeUndefined();
        expect(project!.frontmatter.github).toBeUndefined();
        expect(project!.frontmatter.updated).toBeUndefined();
        expect(project!.frontmatter.category).toBe("independent");
        expect(project!.frontmatter.platforms).toEqual([]);
        expect(project!.frontmatter.stack).toEqual([]);
        expect(project!.frontmatter.ownership).toBeUndefined();
      }
    );
  });

  it("throws with the file name on an invalid status", () => {
    // A silent fallback would misclassify a case study; statuses must
    // reflect current reality, so a typo fails the build loudly.
    withFixture(
      "__fixture-bad-status__",
      `---\ntitle: "Bad status"\nsummary: "Typo'd status."\ndate: "2026-01-01"\nstatus: "shipped"\n---\n\nBody.\n`,
      () => {
        expect(() => getProjectBySlug("__fixture-bad-status__")).toThrow(
          /__fixture-bad-status__\.mdx has an invalid status: shipped/
        );
      }
    );
  });

  it("throws with the file name on an invalid category", () => {
    withFixture(
      "__fixture-bad-category__",
      `---\ntitle: "Bad category"\nsummary: "Typo'd category."\ndate: "2026-01-01"\ncategory: "Enterprise"\n---\n\nBody.\n`,
      () => {
        expect(() => getProjectBySlug("__fixture-bad-category__")).toThrow(
          /__fixture-bad-category__\.mdx has an invalid category: Enterprise/
        );
      }
    );
  });

  it("accepts the completed status and every valid category", () => {
    withFixture(
      "__fixture-completed__",
      `---\ntitle: "Completed"\nsummary: "Prior shipped product."\ndate: "2026-01-01"\nstatus: "completed"\ncategory: "earlier"\n---\n\nBody.\n`,
      () => {
        const project = getProjectBySlug("__fixture-completed__");
        expect(project!.frontmatter.status).toBe("completed");
        expect(project!.frontmatter.category).toBe("earlier");
      }
    );
  });

  it("returns no slugs when the projects directory does not exist", () => {
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    expect(getProjectSlugs()).toEqual([]);
  });
});

describe("renamed slugs", () => {
  it("redirects the old css-agentic-intake slug to agentic-intake", async () => {
    // The prototype page was replaced by the launched product under a new
    // slug; the published URL must keep resolving.
    const config = (await import("../next.config")).default;
    const redirects = await config.redirects!();
    expect(redirects).toContainEqual(
      expect.objectContaining({
        source: "/projects/css-agentic-intake",
        destination: "/projects/agentic-intake",
        permanent: true,
      })
    );
    expect(getProjectBySlug("css-agentic-intake")).toBeNull();
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
