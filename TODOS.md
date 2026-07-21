# TODOS

## Testing

### Add browser E2E coverage for page renders

**What:** Set up Playwright and cover the 9 flows the unit suite can't reach: /writing list render, article page render, 404 for unknown slugs, PDF button conditional, category kicker conditional, home writing teaser (populated and empty), nav active state on detail pages.

**Why:** Coverage gate for v0.2.0.0 closed at 63% with these flagged as the only remaining gaps; today a markup regression on these pages is only caught by eye.

**Context:** Unit tests (vitest, `test/`) cover all loader logic, dates, metadata, and sitemap. The gap list lives in the v0.2.0.0 PR body under Test Coverage. The site is SSG, so E2E can run against `next build && next start`.

**Effort:** M
**Priority:** P3
**Depends on:** None

## Research site

### Darken the rust accent for text use (WCAG AA)

**What:** `--amber` (#C97B1D) on white measures 3.32:1, below the 4.5:1 AA minimum for normal text. It is used for every exhibit column header, section kicker, exhibit eyebrow, and the Partial/Absent verdicts. On the highlighted-row background (#FBF1E2) it drops to 2.97:1. Introduce a darker `--amber-text` (roughly #A25E0F, about 4.6:1) for text, keeping the current value for rules and chip borders where contrast rules do not apply.

**Why:** Small bold uppercase type is the hardest case to read, and this is the color the design system uses for exactly that. Slate (4.76:1) and cobalt (6.81:1) already pass, so rust is the only failing token.

**Context:** Flagged by the design specialist during the v0.3.5.8 Issue 07 ship. Applies to every Second Order issue page, not just Issue 07, so it is a palette decision rather than a one-page fix, and it should land in the second-order brand module (`brand/so_brand.py`) at the same time so exhibits and pages stay in step.

**Effort:** M
**Priority:** P2
**Depends on:** None

### Serve issue exhibits as files instead of inline base64

**What:** Each issue page inlines every exhibit as a base64 data URI, including both responsive variants. The `<picture>` media query therefore saves nothing: every reader downloads all variants. On Issue 07 that is ~721KB of base64, 94% of the document, of which roughly half is never rendered on any given device.

**Why:** Extracting the PNGs to `public/research/` would let the browser fetch one variant per viewport, make the images cacheable across the archive, and allow `loading="lazy"` on below-fold exhibits.

**Context:** The single-file artifact is a deliberate convention (an issue page is self-contained and portable). Changing it is a publish-workflow decision, not a bug fix. Flagged by the performance specialist during the v0.3.5.8 ship.

**Effort:** M
**Priority:** P3
**Depends on:** None

### Test the cross-file invariants of published issues

**What:** Each published issue repeats its title and date in three places: the article `<title>`/masthead, the feature block in `second-order.html`, and the row in `second-order-archive.html`. Nothing checks they agree. Add a vitest that globs `public/research/second-order-issue-*.html`, extracts each title and dateline, asserts the archive row and (for the newest issue) the landing feature match, and asserts every internal `href` in `public/research/*.html` resolves to a file that exists.

**Why:** A republish touches all three files by hand. A missed edit ships silently, which happened during the Issue 07 work: the page said July 20 while the landing and archive still said July 15.

**Context:** The existing suite only covers `lib/` and never reads `public/research/`. Flagged by the testing specialist during the v0.3.5.8 ship.

**Effort:** S
**Priority:** P3
**Depends on:** None

## Writing

### Extract a shared WritingListItem component

**What:** Merge the duplicated writing list-row markup in `app/page.tsx` (home teaser) and `app/writing/page.tsx` (index) into one component with a density variant.

**Why:** Styling changes to writing rows currently have to be made twice.

**Context:** Deferred from the v0.2.0.0 review as a taste call; the two surfaces intentionally differ in padding, heading level, and whether reading time shows.

**Effort:** S
**Priority:** P4
**Depends on:** None

## Infrastructure

### Pin GitHub Actions to commit SHAs

**What:** Replace mutable tags (`actions/checkout@v4`, `pnpm/action-setup@v4`, `actions/setup-node@v4`) in `.github/workflows/test.yml` with full commit SHAs plus version comments.

**Why:** Mutable tags are exposed to tag-rewrite supply-chain attacks; the workflow already runs with read-only permissions, so blast radius is small but nonzero.

**Context:** Flagged by the security specialist during the v0.2.0.0 ship; deferred rather than pinning to unverified SHAs offline.

**Effort:** S
**Priority:** P4
**Depends on:** None

## Completed

### Compress issue PDFs before committing

**What:** Linearized and recompressed all 8 Second Order deck PDFs in `public/research/` with `qpdf --linearize --object-streams=generate --recompress-flate` (lossless). Total 6.3MB → 5.74MB (-8.9%, 549KB) and every deck now renders progressively (fast web view / first page before full download).

**Note:** Used qpdf lossless rather than ghostscript `/ebook`. Ghostscript isn't installed here, and its downsampling is lossy — a real risk for the chart-heavy exhibit slides. Lossless captures the fast-web-view goal with zero quality loss; deeper size cuts would need a legibility pass on downsampled charts. Future deck exports should run the same qpdf pass (recorded in the publish-workflow memory).

**Completed:** v0.3.4.2 (2026-07-09)
