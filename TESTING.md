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
- **Build**: `pnpm build` is the second gate (CI runs it too). The loaders throw at build time on missing or invalid frontmatter, naming the offending file.

## Conventions

- Test files live in `test/` and end in `.test.ts`.
- Import app code through the `@/` alias.
- Assert real behavior, never just existence (`toBeDefined` is not a test).
- New logic in `lib/` gets a corresponding test; bug fixes get a regression test.
