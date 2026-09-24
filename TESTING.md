# Testing

Tests let you move fast and ship with confidence. Without them, vibe coding is just yolo coding.

## Framework

- vitest 4 (config in `vitest.config.ts`)

## Running tests

```bash
pnpm test          # run once (vitest run)
pnpm vitest        # watch mode
```

## Layers

- **Unit tests** (`test/*.test.ts`): the content loaders in `lib/`. They run against the real `content/` directory and assert structural invariants (required frontmatter, sort order, the optional `updated` date at or after `date`, case study bodies under 1,400 words), not specific entries — content that satisfies the invariants never breaks them.
- **Research pages** (`test/research.test.ts`): the hand-published Second Order HTML in `public/research/`. They check that each issue's title and date agree across the page, the archive, the landing page and neighboring previous/next links, that every internal `/research/` link resolves to a file, and that the case study's issue count matches the archive. Run them after publishing or republishing an issue.
- **Build**: `pnpm build` is the second gate (CI runs it too). The loaders throw at build time on missing or invalid frontmatter, naming the offending file.

## Conventions

- Test files live in `test/` and end in `.test.ts`.
- Import app code through the `@/` alias.
- Assert real behavior, never just existence (`toBeDefined` is not a test).
- New logic in `lib/` gets a corresponding test; bug fixes get a regression test.
