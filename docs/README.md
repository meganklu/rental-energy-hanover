# Planning Documents

Planning and specification documents for the Hanover student renter energy efficiency website,
a project with [Sustainable Hanover](https://www.hanovernh.org/sustainable-hanover).

## How to use these

Every file in this directory is a **template**. Placeholders look like this:

- `[FILL: description of what goes here]` — replace with your content
- `<!-- GUIDANCE: ... -->` — instructions for you; delete once the section is written
- `TBD` — a decision you have not made yet; acceptable to leave, but track it in [Open questions](#open-questions)

Delete any section that genuinely does not apply. An honest short document beats a padded long one.

## Reading order

Fill them roughly in this order — later documents depend on decisions made in earlier ones.

| # | Document | Purpose | Status |
|---|---|---|---|
| 1 | [project-brief.md](project-brief.md) | Why this exists, who it serves, what is in and out of scope | ● Complete |
| 2 | [research-plan.md](research-plan.md) | User interviews and usability testing with student renters | ◐ Draft |
| 3 | [interviews.md](interviews.md) | Raw notes + synthesis from Round 1 interviews | ◐ Draft |
| 4 | [audience.md](audience.md) | Personas, renter lifecycle, what students actually don't know | ◐ Draft |
| 5 | [content-strategy.md](content-strategy.md) | Topic inventory, sourcing rules, voice, disclaimers | ● Complete |
| 6 | [features.md](features.md) | Interactive features, specs, acceptance criteria, priority | ● Complete |
| 7 | [DESIGN.md](../DESIGN.md) | Visual system, IA, sitemap, components | ● Complete |
| 8 | [architecture.md](architecture.md) | Stack, hosting, build, deploy, data | ● Complete |
| 9 | [AGENTS.md](../AGENTS.md) | Instructions for AI coding agents working in this repo | ● Complete |
| 10 | [accessibility.md](accessibility.md) | WCAG target, testing plan, known constraints | ● Complete |
| 11 | [roadmap.md](roadmap.md) | Milestones against the academic calendar | ● Complete |
| 12 | [sources.md](sources.md) | Living bibliography, review cadence, verification log | ● Complete |
| 13 | [glossary.md](glossary.md) | Plain-language definitions used site-wide | ● Complete |

Update the Status column as you go: ☐ Not started → ◐ Draft → ● Complete.

## Open questions

<!-- GUIDANCE: Park cross-cutting unknowns here so they don't get lost inside individual docs.
     Move each one out as it gets resolved. -->

| Question | Blocks | Owner | Needed by |
|---|---|---|---|
| Do we launch on the default `github.io` URL, or set up a custom domain? | launch | Megan | 2026-08-26 |
| Do the planning documents stay in the published repository, where they are served publicly at `/docs/`? | launch | Megan | 2026-08-24 |

**Resolved:** where the site lives. It is hand-written HTML, CSS and JavaScript on GitHub Pages,
served from `main` at the default `github.io` URL, decided 2026-08-18. See
[architecture.md](architecture.md) §2.

## Document conventions

- Dates are absolute (`2026-09-14`), never relative ("next term")
- Every factual energy or legal claim gets a source in [sources.md](sources.md)
- Changes that affect partner-facing scope get raised with Sustainable Hanover before merging
