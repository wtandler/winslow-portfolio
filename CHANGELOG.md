# Changelog

All notable changes to winslowtandler.com are documented in this file.
Versions follow the MAJOR.MINOR.PATCH.MICRO format.

## [0.3.5.4] - 2026-07-15

### Changed
- Second Order Issue 07: dropped the shaded fill on the closing Second-Order Effect box (white background) while keeping the exhibits exactly as in the source files (their own panel backgrounds, inset by the box padding). The section stays framed by the border that sits wider than the text column, so each exhibit now reads as a card on white inside the wider frame. Completes the closing-box design started in 0.3.5.2-0.3.5.3.

## [0.3.5.3] - 2026-07-15

### Changed
- Second Order Issue 07: reverted the closing box to its shaded panel with the exhibits unchanged (as in the PDF), and instead framed the whole Second-Order Effect section in a border. The border sits wider than the text column (negative side margins outdent it ~26px past the body text on each side), so the prose and exhibits sit inset with a margin inside the border. Supersedes the white-background treatment in 0.3.5.2.

## [0.3.5.2] - 2026-07-15

### Changed
- Second Order Issue 07: the closing Second-Order Effect box is now bordered rather than shaded. The filled `#F4F6F9` panel made the box and its three panel-backed exhibits (DDTL terms, aircraft-finance layers, counterparty recurrence) read as one flat grey slab with no separation. It now uses a white background, a 4px cobalt top rule, and a 1px hairline border, so each exhibit reads as a distinct card on white; prose is inset and the exhibits run full-width to the border. The top Claim box stays shaded (compact prose callout, consistent with issues 01-06).

## [0.3.5.1] - 2026-07-15

### Fixed
- Second Order Issue 07: the three closing exhibits (DDTL terms, aircraft-finance layers, counterparty recurrence) were stacked in a row after the Second-Order Effect box. They now sit inside the box, each directly under the paragraph that cites it, matching the source document. These exhibits are rendered with the box's panel background (#F4F6F9), so they read as titled sections of the box rather than loose charts.

## [0.3.5.0] - 2026-07-15

### Added
- Published Second Order Issue 07, "The Ten-Year GPU" (Capital & returns). The issue tests the claim that disaggregated inference can extend a deployed GPU's economic life toward ten to fifteen years: the architecture is being built, but across five public operators debt still ends by year six, and only IREN cleanly ties asset, customer, and debt to one five-year clock. New standalone page (`second-order-issue-07-the-ten-year-gpu.html`) with six embedded V7 exhibits and a companion deck (`second-order-issue-07-deck.pdf`).
- Wired the new issue into navigation: it becomes the featured latest issue on the Second Order landing page (Issue 06's two parts move into Recent issues), heads the archive under Capital & returns, and is linked forward from Issue 06 Part II. Case-study copy updated to seven shipped issues.

## [0.3.4.8] - 2026-07-10

### Changed
- Republished Second Order Issue 06 with the updated Exhibit 4: the belt price-change chart now carries CPI (+3.3%) and U.S.-average (+8.6%) reference lines so a state's distance past the national line reads as the belt-specific increase, not general inflation. Section 02 gains the matching real-terms framing (national bill up about 5 percent after inflation; the belt's leaders from Virginia near 11 percent to D.C. near 19). Companion deck re-exported and linearized.

## [0.3.4.7] - 2026-07-10

### Fixed
- Second Order Issue 06 and its Part II companion had two shaded boxes the source document does not use. Un-boxed the "Summary" section (now a plain "Summary · The read" section heading over prose) and folded the "What would change our mind" watchlist paragraph into the "Second-order effect" box as its second paragraph. Each page now shows exactly two shaded boxes, The Claim and The Second-order Effect, matching the document.

## [0.3.4.6] - 2026-07-10

### Changed
- Republished Second Order Issue 06 Part II ("Who Pays for the Buildout") with a §05 prose edit: the duration mismatch is explained plainly and the ~3-year commitment is grounded in AEP Ohio's minimum-charge and exit terms (about three years of minimum charges on a contract that runs at most twelve), and the SECOND-ORDER box sentence is reworded to match. Exhibits and companion deck unchanged.

## [0.3.4.5] - 2026-07-10

### Changed
- Republished Second Order Issue 06 from the latest source (voicing pass + aligned deck). Exhibit 1 is now indexed to 2001 = 100 against the CPI (the high-regulation states run well ahead of inflation; the top data-center states roughly keep pace). Prose revoiced across sections 01, 02, and 04 (Rutgers and EPRI consolidated, paragraph openings varied, section 02 tightened) and the companion deck re-exported and linearized to match. Part II is unchanged.

## [0.3.4.4] - 2026-07-09

### Changed
- Second Order Issue 06 and its Part II companion now render the "Scope & method" section as a lightweight editorial note (small slate label plus muted text) instead of a highlighted slate box, matching the source document where only THE CLAIM is boxed.

## [0.3.4.3] - 2026-07-09

### Changed
- Republished Second Order Issue 06, "The Wrong Kind of Scarcity," from the updated source: rebuilt the reading page and companion deck. New content adds a delivery-versus-production exhibit (now 9 exhibits, up from 8) with current EIA utility-account data (real generation spending down about 24 percent 2003 to 2023, transmission nearly tripled, distribution up 160 percent to a record $50.9 billion), simplifies the prose, and renumbers/interleaves the exhibits. Deck re-exported and linearized. Part II is unchanged.

## [0.3.4.2] - 2026-07-09

### Changed
- Linearized and losslessly recompressed all 8 Second Order deck PDFs in `public/research/` (`qpdf --linearize --object-streams=generate --recompress-flate`). Total 6.3MB to 5.74MB (-8.9%, 549KB), and every deck now renders progressively (first page before the full download). No image downsampling, so exhibit-slide charts are pixel-identical. Closes the "Compress issue PDFs" backlog item; future deck exports should run the same qpdf pass.

## [0.3.4.1] - 2026-07-09

### Changed
- Second Order landing page now presents Issue 06 as a single two-part issue instead of one featured issue plus a demoted companion. The feature panel gains an umbrella title ("AI and the Electricity Bill") over co-equal Part I ("The Wrong Kind of Scarcity") and Part II ("Who Pays for the Buildout") blocks, each with its own read button and companion deck, separated by a small rule. "Who Pays for the Buildout" is no longer listed under Recent issues (it now lives in the feature); the Entry-Level addendum returns as the third recent row.

## [0.3.4.0] - 2026-07-09

### Added
- Second Order Issue 06, "The Wrong Kind of Scarcity" (`/research/second-order-issue-06-the-wrong-kind-of-scarcity.html`), and its Part II companion, "Who Pays for the Buildout" (`/research/second-order-issue-06b-who-pays-for-the-buildout.html`), each with its companion deck. Both follow the established research-note template with exhibits embedded (8 and 4 respectively). Issue 06 argues the decade's residential electricity-price increase is delivery cost, not data centers; the companion prices the net load that will actually connect and traces the stranding risk to ratepayers under regulation and to equity and credit in the merchant world.
- New "Energy & grid" topic filter on the archive, and a "Part II" row treatment for two-part issues.

### Changed
- Second Order landing page now features Issue 06 and demotes Issue 05 into Recent issues.
- Second Order case study updated to reflect six issues shipped (the latest in two parts).
- House style for dollar figures is now the `$` form site-wide (e.g. `$635 billion`, `$14 to $37 a month`), matching Issue 02. Converted the spelled-out "N billion dollars" form in Issues 05 and 06, the sidebar, and the landing page. Generic word-uses ("per dollar", inflation-adjusted "2024 dollars") and cents are unchanged.

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
