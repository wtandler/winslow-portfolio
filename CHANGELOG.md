# Changelog

All notable changes to winslowtandler.com are documented in this file.
Versions follow the MAJOR.MINOR.PATCH.MICRO format.

## [0.3.0.0] - 2026-06-13

### Added
- Second Order case study at `/projects/second-order`: an agent pipeline that produces a weekly client research briefing end to end, every number verified against primary sources and every chart built from filed data. Written for both business readers and technical recruiters, and featured on the homepage.
- A sample of the finished product. The full "The Wrong Denominator" issue is hosted at `/samples/second-order-issue-02-the-wrong-denominator.html` and linked from the case study, framed with a site-themed header bar so the linked page ties back to the portfolio.

### Removed
- The Writing section (`/writing`, its index, and its lone entry). The Second Order work now lives in the case study, with the published issue linked as a sample.

### Changed
- Navigation, the homepage, and the sitemap no longer carry a Writing section.
- Restored the shared content-loader guard tests (required frontmatter, invalid YAML, unparseable date, path-shaped slug) against the projects loader, so those error paths stay covered after the writing tests were removed.

## [0.2.1.0] - 2026-06-12

### Changed
- Rewrote all six case studies in a claim-first style: conclusions stated up front, reasons enumerated with their numbers, no rhetorical setups or reversals. Threadbase shrank from roughly 1,900 to 1,350 words with every concrete figure kept.
- Tightened the Threadbase summary used in link previews and search results.

### Added
- Codified the case-study writing rules in CLAUDE.md (claim first, numbers over adjectives, no setup-and-reversal, length discipline) so future copy follows them.
- A content invariant test that fails the build if any case study body exceeds 1,400 prose words.

## [0.2.0.0] - 2026-06-10

### Added
- Writing section at /writing for research and commentary. Entries are MDX files in `content/writing/` with an optional category label and a link to a full PDF version.
- First entry: "The Wrong Denominator" (Second Order · Issue 02), with the full issue PDF.
- Test suite (vitest, 24 tests) covering the content loaders, error paths, date handling, sitemap, and writing routes, plus a CI workflow that runs tests and the production build.

### Changed
- Redesigned the site from the terminal-dark theme to a paper-and-ink editorial look: warm paper background, ink text, navy links, rust section labels, sans-serif for reading with monospace reserved for code.
- Replaced terminal copy artifacts (shell prompts, `-->` arrows, `//` comments) with plain labels throughout.
- Social share image matches the new design, and project and writing pages now carry their own OpenGraph and Twitter metadata.
- Sitemap reports each entry's real date instead of stamping every URL with the build date.
- Standardized on pnpm (single lockfile, `packageManager` pinned) and consolidated the two content loaders into one shared module.

### Fixed
- Dates no longer render one day early in timezones west of UTC.
- Muted link text meets WCAG AA contrast on the new light background.
- Keyboard focus stays visible in Windows forced-colors mode, and the scrollbar is visible on the light theme.
- A content file with an unparseable date or an unsafe PDF link now fails the build naming the file, instead of shipping a broken page.
