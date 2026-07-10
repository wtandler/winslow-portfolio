# TODOS

## Testing

### Add browser E2E coverage for page renders

**What:** Set up Playwright and cover the 9 flows the unit suite can't reach: /writing list render, article page render, 404 for unknown slugs, PDF button conditional, category kicker conditional, home writing teaser (populated and empty), nav active state on detail pages.

**Why:** Coverage gate for v0.2.0.0 closed at 63% with these flagged as the only remaining gaps; today a markup regression on these pages is only caught by eye.

**Context:** Unit tests (vitest, `test/`) cover all loader logic, dates, metadata, and sitemap. The gap list lives in the v0.2.0.0 PR body under Test Coverage. The site is SSG, so E2E can run against `next build && next start`.

**Effort:** M
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
