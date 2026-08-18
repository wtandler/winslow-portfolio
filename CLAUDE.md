# winslow-portfolio

Personal portfolio site for Winslow Tandler (winslowtandler.com). Next.js App Router + MDX content: case studies in `content/projects/`. Standalone artifacts (e.g. a finished issue of a research product) live in `public/research/` and are linked from the relevant case study. Deployed on Vercel from `main`.

## Positioning

The site positions Winslow as "AI Systems Architect and Product Builder" for enterprise change and program management, per the August 2026 resume alignment brief. Enterprise work leads everywhere; independent markets/research work is labeled and grouped separately. Projects carry `category` (enterprise | independent | earlier), `platforms` (product-level tags shown on cards), `ownership` (one-line role label), and `stack` (implementation detail, shown only inside the case study under "Technology used in this product"). Statuses are live | in-progress | completed | archived, and they must reflect current reality. Programming languages never appear as personal skills or on card previews. Azure DevOps claims are limited to Boards, work items, and extensions. Threadbase is the public product name; never expose internal codenames from source repos. No internal acronym (e.g. the old CSS prefix) appears without plain-language context.

## Design

Paper-and-ink editorial look, modeled on a research briefing: warm paper background, near-black ink, hairline rules with a heavy 2px rule opening major sections, small uppercase rust kickers (`.kicker`), navy for links and emphasis. Limited palette: ink, navy (`--accent`), rust (`--accent-warm`), nothing else. Sans for reading, mono only for code. No terminal artifacts (shell prompts, `-->` arrows, `//` comments).

## Testing

`pnpm test` runs vitest over `test/*.test.ts` (this repo uses pnpm; the lockfile is pnpm-lock.yaml). See TESTING.md for conventions. Tests assert structural invariants on the content loader (`lib/mdx.ts`, over the shared `lib/content.ts`); new `lib/` logic gets a test, bug fixes get a regression test, and never commit code that fails existing tests.

## Copy voice

Plain, simple, straightforward. No pithy one-liners, no engineered punchlines, no em/en dashes, no consultant cliches. The hero states the professional positioning in first person (who Winslow works with, what he owns), per the alignment brief; it does not describe the site. Case studies are first person and honest about tradeoffs. Enterprise case studies follow a standard reader journey: problem, what I noticed, product decision, what I owned, what shipped, results, Microsoft ecosystem fit, AI-native delivery, ongoing ownership.

Writing rules for all `content/` prose (modeled on Winslow's own writing: conclusion first, then enumerated reasons with numbers):

- **Claim first.** State the conclusion in the first sentence of a section, then support it. No scene-setting, atmosphere, or rhetorical buildup before the point.
- **No setup-and-reversal.** Never build a turn for effect ("I did X... That was a mistake.", "You'd think Y. Actually..."). State the fact and the reason once, in one pass.
- **Numbers over adjectives.** If a count, percentage, date, or dollar amount exists, use it instead of an intensifier ("brutal", "massive", "absurd"). Keep every concrete number when editing; cut adjectives a metric could replace.
- **Enumerate reasons.** Multiple reasons or conditions go in a numbered or bulleted list, each item carrying its data inline.
- **Cut restatement.** Delete sentences that re-say what the previous sentence or section already established. Don't end a section by summarizing it.
- **Length discipline.** A case study body stays under 1,400 words, most near 600 to 1,000. The Problem section is one paragraph.

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
