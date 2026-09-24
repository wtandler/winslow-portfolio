import fs from "fs";
import path from "path";
import { describe, it, expect } from "vitest";

// The Second Order pages in public/research are hand-published static HTML.
// Each issue's title and date live in several places (the page's <title> and
// masthead, its archive row, the landing page's feature or recent-issue row,
// and the previous/next links of neighboring issues), and nothing but these
// tests ties them together.

const dir = path.join(process.cwd(), "public/research");
// Pages inline their exhibits as base64; strip it so the regexes stay fast.
const html = (f: string) =>
  fs.readFileSync(path.join(dir, f), "utf8").replace(/base64,[A-Za-z0-9+/=]+/g, "base64,");

const pages = fs
  .readdirSync(dir)
  .filter((f) => /^second-order-(issue|sidebar|addendum)-.+\.html$/.test(f));
const archive = html("second-order-archive.html");
const landing = html("second-order.html");

const NAMED: Record<string, string> = { amp: "&", middot: "·", rsquo: "'", lsquo: "'", nbsp: " ", rarr: "→", larr: "←" };
const text = (s: string) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => NAMED[n] ?? m)
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function must(s: string, re: RegExp, what: string) {
  const m = s.match(re);
  if (!m) throw new Error(`missing ${what}`);
  return m;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Masthead reads "Issue 11 · September 8, 2026" (or "Desk sidebar · ...").
function pageInfo(f: string) {
  const page = html(f);
  const meta = text(must(page, /class="issue-meta">([^<]+)</, `issue-meta in ${f}`)[1]);
  const dateline = meta.split("·").at(-1)!.trim();
  const [month, day] = dateline.split(/[ ,]+/);
  return {
    title: text(must(page, /<h1>([^<]+)<\/h1>/, `<h1> in ${f}`)[1]),
    docTitle: text(must(page, /<title>([^<]+)<\/title>/, `<title> in ${f}`)[1]),
    issue: meta.match(/^Issue (\d+)/)?.[1],
    long: dateline,
    short: `${month.slice(0, 3)} ${day}`,
  };
}

const num = (f: string) => {
  const m = f.match(/-issue-(\d+)(b?)-/);
  return m ? Number(m[1]) + (m[2] ? 0.5 : 0) : -1;
};
const newest = [...pages].sort((a, b) => num(b) - num(a))[0];

describe("published research pages", () => {
  it("resolves every internal /research/ link to a file", () => {
    const linkRe = /(?:href|src)=["'](?:https?:\/\/(?:www\.)?winslowtandler\.com)?\/research\/([^"'#?]+)[^"']*["']/g;
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".html"))) {
      for (const [, target] of html(f).matchAll(linkRe)) {
        const file = decodeURIComponent(target);
        expect(fs.existsSync(path.join(dir, file)), `${f} links to missing ${file}`).toBe(true);
      }
    }
  });

  it.each(pages)("%s agrees with its <title> and archive row", (f) => {
    const info = pageInfo(f);
    expect(info.docTitle).toContain(info.title);
    expect(MONTHS.some((m) => info.long.startsWith(m)), `dateline "${info.long}"`).toBe(true);
    const row = must(
      archive,
      new RegExp(`href="/research/${escapeRe(f)}">([^<]+)</a><span class="tp">[^<]*</span><span class="dt">([^<]+)</span>`),
      `archive row for ${f}`
    );
    expect(text(row[1])).toBe(info.title);
    expect(row[2]).toBe(info.short);
  });

  it("features the newest numbered issue with its title and date", () => {
    const info = pageInfo(newest);
    const feature = must(landing, /<section class="feature">([\s\S]*?)<\/section>/, "landing feature")[1];
    const headline = must(feature, /<h1><a href="([^"]+)">([^<]+)<\/a><\/h1>/, "feature headline")!;
    expect(headline[1]).toBe(`/research/${newest}`);
    expect(text(headline[2])).toBe(info.title);
    expect(must(feature, /class="read" href="([^"]+)"/, "read button")[1]).toBe(`/research/${newest}`);
    expect(text(must(feature, /class="meta">([^<]+)</, "feature meta")[1])).toContain(
      `Issue ${info.issue} · ${info.long}`
    );
  });

  it("dates every recent-issue row on the landing page to match its page", () => {
    const rows = [...landing.matchAll(/<div class="row">([\s\S]*?)<\/div>\s*<\/div>/g)].map((m) => m[1]);
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      const f = must(row, /<h2><a href="\/research\/([^"]+)">([^<]+)<\/a>/, "row headline")[1];
      const info = pageInfo(f);
      expect(text(must(row, /<h2><a [^>]+>([^<]+)</, "row title")[1]), f).toBe(info.title);
      expect(must(row, /class="date">([^<]+)</, `row date for ${f}`)[1], f).toBe(info.short);
    }
  });

  it("labels each previous/next issue link with the issue it opens", () => {
    for (const f of pages) {
      for (const [, target, label] of html(f).matchAll(/<a href="\/research\/([^"]+)" class="navlink">([^<]+)<\/a>/g)) {
        const m = text(label).match(/Issue (\d+)/);
        if (m) expect(pageInfo(target).issue, `${f} → ${target}`).toBe(m[1]);
      }
    }
  });

  it("states the case study's issue count from the archive", () => {
    // Plain rows only: Part II, sidebar and addendum rows carry an extra class.
    const n = (archive.match(/class="arow"/g) ?? []).length;
    const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
    const mdx = fs.readFileSync(path.join(process.cwd(), "content/projects/second-order.mdx"), "utf8");
    expect(mdx).toContain(`${words[n]} issues (one in two parts)`);
  });
});
