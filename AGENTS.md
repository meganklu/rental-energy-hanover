# AGENTS.md

Instructions for AI coding agents working in this repository.

<!-- GUIDANCE: Sections marked [FILL] need your decisions. The rest is already true for this
     project and can stay as written. Keep this file short and specific — an agent reads it
     every session, and vague guidance is worse than none. -->

## What this project is

A website helping student renters in Hanover, New Hampshire make energy-efficiency
improvements to their rentals. Built in partnership with **Sustainable Hanover**, a Town of
Hanover committee.

The audience is first-time renters who have never paid a heating bill. The site's distinctive
value is being **interactive** and **rental-specific** as Sustainable Hanover already publishes
static weatherization and energy efficiency guidance for homeowners.

Read [docs/project-brief.md](docs/project-brief.md) and [docs/audience.md](docs/audience.md)
before making decisions that affect scope or content.

## Non-negotiable rules

1. **Never invent facts about energy, cost, savings, utilities, rebates, or tenant law.**
   Every factual claim must trace to a source recorded in [docs/sources.md](docs/sources.md).
   If a number is needed and no source exists, leave a `TODO(source)` marker and say so —
   do not estimate.

2. **Never write or modify legal content unassisted.** Anything touching NH tenant rights,
   habitability, leases, or deposits requires human review per
   [docs/content-strategy.md](docs/content-strategy.md) §4.

3. **Never write safety-critical content unassisted.** Space heaters, carbon monoxide,
   electrical load, blocking vents or baseboards. Flag for human review.

4. **Every improvement/recommendation must state landlord-permission status and
   reversibility.** This is the core constraint that distinguishes renter advice from
   homeowner advice. See the content model in
   [docs/content-strategy.md](docs/content-strategy.md) §6.

5. **Accessibility is not optional.** Target is stated in
   [docs/accessibility.md](docs/accessibility.md). Keyboard operability, visible focus, and
   non-color-dependent meaning are required in every component you write.

6. **Do not add third-party scripts, trackers, fonts, or analytics** without explicit
   approval. See the privacy stance in [docs/measurement.md](docs/measurement.md).

7. **Do not collect personal information.** See non-goals in
   [docs/project-brief.md](docs/project-brief.md).

## Tech stack

[FILL: complete after architecture.md is decided]

- **Framework:** [FILL]
- **Language:** [FILL]
- **Styling:** [FILL]
- **Content format:** [FILL]
- **Hosting:** [FILL]
- **Node version:** [FILL]

## Commands

```bash
# install
[FILL]

# dev server
[FILL]

# build
[FILL]

# lint
[FILL]

# format
[FILL]

# test
[FILL]

# accessibility check
[FILL]
```

Run [FILL: lint + test + build] before considering any change complete.

## Repository layout

```
[FILL: fill in once the structure exists]
.
├── AGENTS.md
├── design.md
├── docs/            planning & specification documents
├── [FILL]
```

## Code conventions

[FILL: complete once the stack is chosen]

- **Naming:** [FILL]
- **File organization:** [FILL]
- **Components:** [FILL]
- **CSS:** use the design tokens defined in [design.md](design.md); no ad-hoc hex values
- **Comments:** [FILL]

## Content conventions

- Content lives in [FILL: path]. Do not hard-code copy in components.
- Every content item carries `lastReviewed` and `sources` fields.
- Plain language, short sentences. Match the voice defined in
  [docs/content-strategy.md](docs/content-strategy.md) §2.
- Use terms defined in [docs/glossary.md](docs/glossary.md); link the first use of a
  technical term.

## Writing style for agent-authored copy

- Lead with the action, then the reason.
- State cost and time in student terms ("$12, 20 minutes").
- No guilt-based climate framing. Money and comfort first.
- No em-dash-heavy or listicle-flavored prose. [FILL: adjust to taste]
- No promises: "typically saves" not "will save".

## What to ask a human about

- Anything in the "non-negotiable rules" list above
- Changes to scope, navigation structure, or the set of features
- Anything that would appear under Sustainable Hanover's name or branding
- Adding a dependency
- [FILL]

## Git conventions

- Branch naming: [FILL]
- Commit message style: [FILL]
- [FILL: PR requirements, if any]

## Known gotchas

[FILL: accumulate these as you build — they're the highest-value part of this file over time]

- [FILL]
