# Writing Guide

This guide governs all prose in `content/` (case studies and writing entries). It is modeled on Winslow's own writing: conclusion first, then enumerated reasons, each carrying its data inline. The compressed version lives in [CLAUDE.md](CLAUDE.md) under "Copy voice"; this is the full reference with samples. The before/after samples are real edits from the v0.2.1.0 rewrite.

## 1. The voice in one paragraph

Plain, simple, straightforward. Case studies are first person; writing entries are analytical and don't have to be. Honest about tradeoffs and failed attempts. No pithy one-liners, no engineered punchlines, no self-promotion, no consultant vocabulary. The reader is a smart person deciding whether to trust the author with real work; every sentence either gives them a fact or wastes their time.

## 2. The source pattern

The style comes from Winslow's analytical writing. The reference sample is a business school case analysis that opens every answer like this:

> Yes, Chandler should allow Guardian to introduce the lightweight standard wheelchair for three reasons, provided some conditions are met.

Then it enumerates, with each reason carrying its number:

> - The lightweight standard wheelchair is forecast to grow at 15% annually, faster than all other non-powered wheelchair categories.
> - Medicare reimbursement rates were above those for all other non-powered wheelchairs.

The pattern: **answer, then reasons, then data, in that order.** Never the reverse. No warming up, no narrative arc, no withheld conclusion. The whole guide is downstream of this pattern.

## 3. The rules

### Rule 1: Claim first

State the conclusion in the first sentence of every section, then support it. No scene-setting, atmosphere, or rhetorical buildup before the point.

**Before** (Threadbase, The Problem, original four-paragraph opening):

> The failures that hurt a portfolio usually come from questions nobody thought to ask.
>
> Two teams are running on assumptions that quietly contradict each other. A dependency is getting bigger while everyone treats it as settled. A risk spans three orgs, so no single person ever sees the whole shape of it. The information exists. Nobody connected it in time.
>
> Status tools don't help here, because they wait. They sit there until someone thinks to ask the right question, and the right question is the one thing you don't know to ask. By the time it surfaces in a meeting with five VPs and twenty managers, it's too late to do much about it.
>
> The signal that would have caught it is scattered: in the heads of a few long-tenured people, in slide decks that took hours to craft, in back-to-back calls everyone hates but nobody can cancel. Different teams describe the same work in different words, in different tools. So you get status updates without real clarity.

**After** (one paragraph, 168 words down to 71):

> Portfolio failures usually trace back to information nobody connected: two teams running on contradictory assumptions, a dependency growing while everyone treats it as settled, a risk split across three orgs so no one sees the whole of it. Status tools don't catch this because they only answer questions, and the dangerous question is the one nobody knows to ask. The signal exists, scattered across decks, meetings, and a few long-tenured people.

What got cut: the mood-setting ("back-to-back calls everyone hates but nobody can cancel"), the slow reveal, the restatements. What survived: every concrete failure mode.

### Rule 2: No setup-and-reversal

Never build a turn for effect. "I did X... That was a mistake." and "Originally I thought Y. But then..." are tricks: they make the reader hold a false belief so the writer can correct it. State the fact and the reason once, in one pass.

**Before** (Threadbase):

> I started with a chat interface, because "AI product" basically implies chat. That was a mistake.

**After:**

> The first version was a chat interface. It failed because asking the system what's going on reintroduces the friction the system exists to remove.

**Before** (Lamp & Rose):

> Originally I thought this would just be a platform for their chapter. But the more I learned about how Honor Guard chapters operate nationally, the more I realized the pain points weren't unique. Every chapter is dealing with the same spreadsheet juggling, the same email chains, the same manual payment tracking. That's when the architecture shifted from single-tenant to multi-tenant: build once, and let any chapter spin up their own instance with full data isolation.

**After:**

> The architecture moved from single-tenant to multi-tenant once it was clear the anchor chapter's pain points weren't unique: every chapter juggles the same spreadsheets, email chains, and manual payment tracking.

The lesson and the pivot survive; only the staging is gone. Related banned moves:

- "It sounds minor, but..." State the significance directly: "That's the difference between a tool the ops team owns and one they file tickets against."
- Performative framing like "The design rule I'd defend hardest in a review:". Delete the frame, keep the rule: "LLM output is never load-bearing where a deterministic path can do the job."

### Rule 3: Numbers over adjectives

If a count, percentage, date, or dollar amount exists, use it instead of an intensifier. "Brutal," "massive," "absurd," "huge" are placeholders for a number the writer didn't supply.

**Before** (Short Rates Desk):

> Forming that view means reading an absurd amount: sell-side research from a dozen banks...

**After:**

> Forming that view means reading sell-side research from a dozen banks, economist Substacks, Fed releases, NBER and SSRN papers, prediction-market odds, and the prints themselves.

The list itself is the evidence; "absurd" added nothing. Likewise "Corporate slides are brutal" became "Corporate slides defeat standard OCR: dense layouts, nested tables, meaning carried by icons and color." The adjective was replaced by the mechanism.

The corollary is non-negotiable: **when editing, every concrete number survives.** The Threadbase rewrite cut 29% of the words (1,895 to 1,352) and kept every figure: six-stage pipeline, 60+ migrations, ~2,000 tests, eight eval suites, 85% accuracy gate. The other five rewrites did the same: 5,000 account managers and sellers and 90 events per quarter survived in Event Swag Agent, 1,000 workouts and five coaches in CoachGPT.

### Rule 4: Enumerate reasons

When there are multiple reasons, conditions, or components, use a numbered or bulleted list, each item carrying its data inline. Don't bury three reasons in a paragraph of connective tissue. Threadbase's design rules became:

> Two rules govern the design:
>
> 1. **Evidence first.** No claim enters the system without a link to the exact document, page, and region it came from...
> 2. **A persistent model, not a chat session.** ...

### Rule 5: Cut restatement

Delete sentences that re-say what the previous sentence or section already established. Never end a section by summarizing it. Real cuts from the rewrite:

- "A reviewer never has to take the AI's word for anything" (the bounding-box sentence already said it).
- "The goal is for chapter leaders to spend their time running the chapter instead of managing spreadsheets" (the feature list already showed it).
- "The decision still belongs to a human" (the Review bullet already said it).

### Rule 6: First person, and keep it

Case studies are first person. Shortening prose tends to drift into passive constructions; resist it. This was a real failure mode during the rewrite:

**Wrong** (what compression produced): "The plan had to be scaffolded and serialized in chunks." / "The pipeline that handles this is status-driven Supabase Edge Functions."

**Right** (restored): "I had to scaffold the plan and serialize it in chunks." / "So I built a status-driven pipeline of Supabase Edge Functions."

First person also carries the honesty rule. The failed-attempt story is information, not padding: "After burning through the open-source OCR stacks, I landed on Azure Content Understanding" tells the reader the open-source stacks were tried and lost. That clause was cut for length and restored on review.

### Rule 7: Length discipline

- Case study body: under 1,400 words, enforced by a vitest invariant in `test/content.test.ts` (the tokenizer strips MDX comments and skips tokens with no letters or digits, so bare markdown markers don't count). Most land near 600 to 1,000; a thin prototype study can run shorter. Threadbase, the deepest build, sits at ~1,350.
- The Problem section: one paragraph.
- Frontmatter summary: one to two sentences. It feeds meta/OG descriptions; it sells the page, it doesn't re-tell it.

### Rule 8: Mechanics

- No em dashes, no en dashes. Use commas, colons, parentheses, or a new sentence.
- No terminal artifacts: shell prompts, `-->` arrows, `//` comment framing.
- No engineered aphorisms, even true ones. "AI makes you faster in whatever direction you were already pointed" was cut for this reason.
- Hyphenated ranges are fine ("7-8 per week"); they're data, not dashes.

## 4. The editing protocol

These rules came from mistakes made during the v0.2.1.0 rewrite, caught by adversarial review. They apply any time existing prose is shortened or restyled.

1. **Diff the facts, not just the style.** Before editing, enumerate every concrete claim in the old text (architectures, mechanisms, numbers, named tools, failure stories). After editing, verify each one survives or was dropped on purpose. Three true claims were silently deleted in the first pass of the rewrite and had to be restored: CoachGPT's chained-pipeline overview (intake, strategy, scheduling, phase plan, JSON parsing, logging), Threadbase's "background jobs coordinate through advisory locks," and "document dates" in the classifier's noise examples. Style edits do not have license to change what the page asserts.
2. **Watch meaning drift when merging sentences.** Combining "Large funds pay research teams to do this. It still takes hours every morning." into one sentence produced "reading enough of it to be coherent takes a research team hours every morning," which quietly presupposes the reader has a research team and drops the claim that funds pay for this. Merged sentences must assert exactly what the originals asserted.
3. **Run the mechanical checks.** `pnpm test` must be green; the suite enforces the word cap plus the dash and banned-phrase bans on `content/` bodies (em/en dashes, "That was a mistake," "It sounds minor," "Originally I thought," "You'd think"). Grep CLAUDE.md for dashes separately; the suite doesn't cover it. These strings are allowed here in WRITING.md as quoted examples; the scan applies to `content/`.
4. **Check the new text against the rules it claims to follow.** The first pass of the rewrite shipped "an absurd amount" in the same PR that codified the ban on "absurd." Fresh prose is not exempt.

## 5. Page anatomy

A case study runs in this order, using only the sections it needs. Section names flex per project (CoachGPT opens with "Why I Built It"); the order and each section's job hold:

1. **The Problem** (one paragraph): what fails and why existing approaches don't catch it. Claim first.
2. **The Approach / The Insight** (one section, not two): what the product does, then the design rules as a list.
3. **What It Does / What I Built**: features as bold-led list items, one line of substance each.
4. **How It's Built / The Hard Part**: the engineering. Open with the proof-of-rigor data (pipeline stages, test counts, gates), then subsections. This is where the numbers live.
5. **Building with AI** (where relevant): the workflow as fact, not philosophy.
6. **What I Learned**: bold claim-first bullets. Each bullet's first phrase is the lesson; the rest is one sentence of support. No bullet may restate another section's closing line.

## 6. Pre-ship checklist

Before any `content/` prose ships:

- [ ] First sentence of every section states that section's conclusion
- [ ] No setup-and-reversal, no "it sounds minor, but," no performative framing
- [ ] Every intensifier replaced by a number or a concrete list; every pre-existing number retained
- [ ] Multiple reasons rendered as a list with data inline
- [ ] No sentence restates the previous one; no section ends with its own summary
- [ ] Case studies in first person; failed attempts stated as fact
- [ ] Body under 1,400 words (Problem: one paragraph); `pnpm test` green
- [ ] No em/en dashes, no terminal artifacts, no aphorisms
- [ ] Fact-diff done: every claim in the old text accounted for
