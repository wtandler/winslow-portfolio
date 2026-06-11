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

### Compress issue PDFs before committing

**What:** Run each issue PDF through a compressor/linearizer (e.g. ghostscript `/ebook` preset) before adding it to `public/pdfs/`.

**Why:** Each issue commits ~1.3MB of binary into git history forever; compression typically halves it and enables fast web view (first page renders before the full download).

**Context:** Flagged in the v0.2.0.0 review and deferred because re-encoding the published artifact needs an eyeball pass on output quality. Applies to future issues as much as the existing one.

**Effort:** S
**Priority:** P4
**Depends on:** None

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
