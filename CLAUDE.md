# winslow-portfolio

Personal portfolio site for Winslow Tandler (winslowtandler.com). Next.js App Router + MDX content: case studies in `content/projects/`, research and commentary in `content/writing/`. Deployed on Vercel from `main` (direct commits, no PR flow).

## Design

Paper-and-ink editorial look, modeled on a research briefing: warm paper background, near-black ink, hairline rules with a heavy 2px rule opening major sections, small uppercase rust kickers (`.kicker`), navy for links and emphasis. Limited palette: ink, navy (`--accent`), rust (`--accent-warm`), nothing else. Sans for reading, mono only for code. No terminal artifacts (shell prompts, `-->` arrows, `//` comments).

## Testing

`pnpm test` runs vitest over `test/*.test.ts` (this repo uses pnpm; the lockfile is pnpm-lock.yaml). See TESTING.md for conventions. Tests assert structural invariants on the content loaders (`lib/mdx.ts`, `lib/writing.ts`); new `lib/` logic gets a test, bug fixes get a regression test, and never commit code that fails existing tests.

## Copy voice

Plain, simple, straightforward. No pithy one-liners, no engineered punchlines, no em/en dashes, no self-promotion. The hero describes the site, not the author. Case studies are first person and honest about tradeoffs.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
