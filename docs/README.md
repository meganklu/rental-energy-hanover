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
| 1 | [project-brief.md](project-brief.md) | Why this exists, who it serves, what is in and out of scope | ◐ Draft |
| 2 | [audience.md](audience.md) | Personas, renter lifecycle, what students actually don't know | ◐ Draft |
| 3 | [content-strategy.md](content-strategy.md) | Topic inventory, sourcing rules, voice, disclaimers | ☐ Not started |
| 4 | [features.md](features.md) | Interactive features, specs, acceptance criteria, priority | ☐ Not started |
| 5 | [DESIGN.md](../DESIGN.md) | Visual system, IA, sitemap, components | ☐ Not started |
| 6 | [architecture.md](architecture.md) | Stack, hosting, build, deploy, data | ☐ Not started |
| 7 | [AGENTS.md](../AGENTS.md) | Instructions for AI coding agents working in this repo | ☐ Not started |
| 8 | [accessibility.md](accessibility.md) | WCAG target, testing plan, known constraints | ☐ Not started |
| 9 | [measurement.md](measurement.md) | Success metrics, analytics, privacy stance | ☐ Not started |
| 10 | [research-plan.md](research-plan.md) | Usability testing with student renters | ◐ Draft |
| 11 | [governance.md](governance.md) | Ownership, maintenance, handoff after the project ends | ☐ Not started |
| 12 | [roadmap.md](roadmap.md) | Milestones against the academic calendar | ◐ Draft |
| 13 | [sources.md](sources.md) | Living bibliography with review dates | ☐ Not started |
| 14 | [glossary.md](glossary.md) | Plain-language definitions used site-wide | ☐ Not started |

Update the Status column as you go: ☐ Not started → ◐ Draft → ● Approved by Sustainable Hanover.

## Open questions

<!-- GUIDANCE: Park cross-cutting unknowns here so they don't get lost inside individual docs.
     Move each one out as it gets resolved. -->

| Question | Blocks | Owner | Needed by |
|---|---|---|---|
| [FILL: e.g. "Will this live on hanovernh.org or a separate domain?"] | architecture, governance | [FILL] | [FILL] |
| | | | |

## Document conventions

- Dates are absolute (`2026-09-14`), never relative ("next term")
- Every factual energy or legal claim gets a source in [sources.md](sources.md)
- Changes that affect partner-facing scope get raised with Sustainable Hanover before merging
