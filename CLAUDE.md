# winslow-portfolio

Personal portfolio site for Winslow Tandler (winslowtandler.com). Next.js App Router + MDX case studies in `content/projects/`, deployed on Vercel from `main` (direct commits, no PR flow).

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
