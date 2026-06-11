# Changelog

All notable changes to winslowtandler.com are documented in this file.
Versions follow the MAJOR.MINOR.PATCH.MICRO format.

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
