# Changelog

All notable changes to winslowtandler.com are documented in this file.
Versions follow the MAJOR.MINOR.PATCH.MICRO format.

## [0.3.3.2] - 2026-07-05

### Removed
- Deleted `voice.md`. It was the Second Order research product's internal voice guide (report register, boxed segments, deck copy, chart notes), which belongs in the private `second-order` repo, not the public portfolio. The finished issues in `public/research/` and the Second Order case study are unchanged; only the production methodology moves. The guide is now canonical in `second-order/VOICE.md`, where the issue generator reads it. No application code referenced this file.

## [0.3.3.1] - 2026-07-03

### Fixed
- Redrew Exhibit 3 in Second Order Issue 05 (`/research/second-order-issue-05-memory-is-the-capex-constraint.html`). The Q2 2024 share markers were wrong: the SK Hynix row carried a stray second dot (a mislaid legend swatch that read as a data point), and the y-axis vendor labels ("SK Hynix", "Samsung") were clipped at the left edge. The chart now shows one dot per vendor, each centered on its bar, with a clean leader line to the "Q2 2024 share" label and comfortable left margin. Underlying data unchanged; styling matches the Exhibit 4 template.

## [0.3.3.0] - 2026-07-02

### Added
- Second Order Issue 05, "Memory Is the Capex Constraint" (`/research/second-order-issue-05-memory-is-the-capex-constraint.html`), with its companion deck, and the desk addendum "The Entry-Level Puzzle, Revisited" (`/research/second-order-addendum-the-entry-level-revisit.html`), a research addendum to Issue 03. Both follow the established research-note template with exhibits embedded.

### Changed
- Featured Issue 05 on the Second Order landing (`/research/second-order.html`) and added the addendum to Recent issues; extended the archive to seven pieces with Issue 05 under Capital & returns and a new "· Addendum" badge.
- Rebuilt all seven research notes from the current editorial source: refreshed the note body text for Issues 01-04 and the desk sidebar, kept the side-by-side exhibits throughout, and slightly widened the reading column (720px to 780px) so the charts have more room. Re-exported the Issue 01/02/03/sidebar decks; Issue 04's deck was unchanged.
- Updated the Second Order case study count to five issues, a desk sidebar, and a research addendum.
- Editorial voicing pass across all seven notes: removed recycled punchlines, drama clefts, and balanced-antithesis constructions in favor of plain analyst sentences with ordinary connectives, and rewrote every meta description (fixing two that broke the content attribute with raw quotes).
- Regenerated the Issue 01/02/05 and sidebar companion deck PDFs so their shared claim and standfirst lines carry the same voicing as the notes. Issue 03 and 04 decks were already clean and left unchanged.

## [0.3.2.0] - 2026-07-01

### Added
- Filterable Second Order archive at `/research/second-order-archive.html`: every issue and sidebar, newest first, with topic filter chips (Compute & policy, The economics, Work & labor, Capital & returns) and a live count. Vanilla JS, no dependencies.

### Changed
- Redesigned the Second Order landing (`/research/second-order.html`) into a publication front page instead of a chronological list. The latest issue is now a featured block (contained panel, dominant title, primary read action) over three recent issues and a "Browse the full archive" link to the new archive page. Built to scale as issues accumulate: the landing stays hero + recent, the archive holds the full history.
- Removed the earlier thematic-archive grouping (The AI economy, Work & labor, Compute & the stack) from the landing, which read as thin, confusing buckets at five pieces; topic grouping now lives as a filter on the archive page.
- Both new pages use the Second Order issue theme (navy ink, cobalt links, amber kickers, the letterspaced `SECOND ORDER` masthead) so they read as one publication with the article pages.

## [0.3.1.1] - 2026-07-01

### Changed
- Unified `voice.md` to the single strict research-note standard, byte-identical to the canonical Second Order `VOICE.md`. Removed the "kicker" allowance and the aphoristic-heading endorsement, added the explicit banned constructions (antithesis in any punctuation, soft reveals, crafted triads, two-group contrasts), and kept the we-voice, falsifiability, editing protocol, surface notes, and shipping checklist. One voice across the portfolio and the Second Order repo.

## [0.3.1.0] - 2026-06-30

### Added
- Second Order research notes: five debranded pieces published as standalone HTML under `/research/` — Issue 01 (From Doom Loop to Abundance Path), Issue 02 (The Wrong Denominator), Issue 03 (The Entry-Level Puzzle), Issue 04 (The Stack Splits), and a desk sidebar (The 7% Problem). Each carries an inline link to its companion deck.
- A Second Order landing page at `/research/second-order.html`: a featured latest issue over a thematic archive (The AI economy, Work & labor, Compute & the stack), linked from the case study. Issues carry previous/next navigation and a masthead link back to the index.
- Companion deck PDFs for all five pieces, converted from the source decks.
- `voice.md`: the research-writing standard for Second Order prose — plain declarative sentences, evidence inline, no engineered antithesis or punchlines — modeled on standard research-note convention and the Citadel Securities macro notes.

### Changed
- Moved standalone artifacts from `public/samples/` to `public/research/`; Issue 02 rewritten to its corrected version with new exhibits.
- Voice pass across all five pieces: removed engineered punchlines, antithesis (in any punctuation), and homerun conclusions in favor of stating each point with its data.
- Case study now links the research notes landing page and drops the "Razor Research" brand from the description.
- CLAUDE.md and README.md reference `public/research/` for standalone research artifacts.

## [0.3.0.1] - 2026-06-13

### Changed
- Plain-voice edit of the Second Order case study: removed engineered punchlines and antithesis ("the model is not the control; the procedure is", "does nothing / does everything", "X beats Y") in favor of stating each point plainly. Claim-first structure and every number kept.

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
