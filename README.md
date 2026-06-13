# winslow-portfolio

Source for my personal site — a portfolio of AI-first products I've built by
embedding in a specific domain, learning how the people there actually work, and
shipping the tool they use. Trading desks, regulated compliance, Microsoft event
ops, change-management offices, healthcare volunteers, fitness coaching.

I sit between the business and the build.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **MDX** content (`gray-matter` + `reading-time`)
- **Framer Motion**
- **Vitest** + GitHub Actions CI (see [TESTING.md](TESTING.md))
- Deployed on **Vercel**

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm test       # run the vitest suite
pnpm lint       # eslint
```

## Structure

```
app/                  Routes — home, projects, contact
  projects/[slug]/    Individual case study pages
content/projects/     MDX case studies (one file per project)
public/samples/       Standalone sample artifacts linked from case studies
components/           UI, layout, and project components
lib/content.ts        Shared MDX loader (parsing, validation, reading time)
lib/mdx.ts            Project loader + frontmatter schema
test/                 Vitest unit tests for the loaders and routes
```

## Adding a case study

Drop a `.mdx` file in `content/projects/` with frontmatter (`title`, `summary`,
`date`, `stack`, `status`, optional `url` / `github` / `featured` / `priority`).
It renders as a card on the projects page and a full page at
`/projects/<slug>`. Keep the body under 1,400 words; the test suite enforces
this.
