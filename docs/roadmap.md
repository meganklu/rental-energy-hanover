# Roadmap

> **Status:** ● Complete · **Last updated:** 2026-08-21 · **Owner:** Megan

## 1. Fixed dates

| Date | What | Immovable? |
|---|---|---|
| 2026-08-05 | Checkpoint #2 | ☑ |
| 2026-08-10 | Checkpoint #3 | ☑ |
| 2026-08-26 | Final project share session | ☑ |

## 2. Phases

| Phase | Primary | Dates | Exit criteria | Status |
|---|---|---|---|---|
| 0. Planning | Megan | 2026-08-05 | All Tier-1 docs at ◐ Draft; brief approved by Sustainable Hanover | ☑ |
| 1. Research | Ryan and Katharine | 2026-08-12 | Round 1 interviews done; audience.md rewritten from evidence | ☐ |
| 2. Content | Megan | 2026-08-12 | Topic inventory prioritized; v1 content drafted and sourced | ☑ |
| 3. Design | Megan | 2026-08-12 | IA settled; key screens layout planned; tokens contrast-checked | ☑ |
| 4. Build | Megan | 2026-08-19 | Must-have features meet acceptance criteria | ◐ F1, F2, F4, F5 done, F6 (My list) shipped 2026-08-25, and all 21 topics in [content-strategy.md](content-strategy.md) §3 are written. F3 (flip-card myth busters) partially built and needs its myth/correction pairs through content review. Two pages, `/learn/whats-in-your-lease` and `/learn/move-out-restore`, need legal review before publishing |
| 5. Test | Ryan and Katharine | 2026-08-26 | Usability round 2 done; the v1 accessibility floor in [accessibility.md](accessibility.md) §5 passes. Screen reader and audit passes are v2 | ☐ |
| 6. Review & sign-off | All | 2026-08-26 | Partner approval on all content | ☐ |
| 7. Launch | All | 2026-08-26 | Live; distribution channels notified | ☐ |

## 3. Milestones

| # | Milestone | Primary | Target date | Depends on | Done |
|---|---|---|---|---|---|
| M1 | Create tier-1 planning documentation drafts | Megan | 2026-08-05 | N/A | ☑ |
| M2 | Write [user interview guide](research-plan.md#2-round-1--discovery-before-building)| Ryan and Katharine | 2026-08-06 | M1 | ☑ |
| M3 | Conduct user interviews | Ryan and Katharine | 2026-08-12 | M2 | ☐ |
| M4 | Update [target audience and user personas](audience.md) | Ryan and Katharine | 2026-08-12 | M3 | ☐ |
| M5 | Research rental and energy usage statistics in Hanover; compile information for web pages in [glossary.md](glossary.md) and [sources.md](sources.md) | Megan | 2026-08-12 | M1 | ☑ |
| M6 | Establish [design and style guide](DESIGN.md) | Megan | 2026-08-12 | M1 | ☑ |
| M7 | Plan layout and webpages; update [features.md](features.md) and [content-strategy.md](content-strategy.md)  | Megan | 2026-08-12 | M6 | ☑ |
| M8 | Initial website build  | Megan | 2026-08-19 | M7 | ☑ |
| M9 | Website design edits  | Megan | 2026-08-23 | M8 | ☑ |
| M10 | Website content edits  | All | 2026-08-26 | M8 | ☐ |

## 4. What gets cut first

<!-- GUIDANCE: Decide the cut order *now*, while you're calm. Under deadline pressure you
     will cut the wrong things. -->

If time runs short, drop in this order:

1. Test (usability round 2)
2. Launch

**Never cut:** accessibility, content review, research

Accessibility stays a v1 target under any amount of deadline pressure. The per-component
requirements in [accessibility.md](accessibility.md) §2 are build-time work and are not available
to cut. What already moved to v2, on 2026-08-19, is the extensive verification: screen reader
passes, the full zoom matrix, testing with a disabled user, and a formal audit. Building to the
standard is protected. Proving it is scheduled.

## 5. Post-v1 backlog

| Idea | Source | Priority |
|---|---|---|
| Mobile layouts: doll house as a phone experience, filter sheet, full-screen nav panel, touch tuning, real-device testing | [DESIGN.md](../DESIGN.md) §6, deferred from v1 on 2026-08-19 | High |
| F6 generated winter checklist, with print and copy-as-text | [features.md](features.md) §3, cut from v1 on 2026-08-19 | High |
| F7 space heater cost-per-hour tool | [features.md](features.md) §3. Blocked until the Liberty Utilities residential rate is in [sources.md](sources.md) | Medium |
| Accessibility verification: screen reader passes, the doll house session, full zoom matrix, testing with a disabled user, and a criterion-by-criterion audit against WCAG 2.2 AA | [accessibility.md](accessibility.md) §5, deferred from v1 on 2026-08-19. Needed before the site can claim conformance | High |
| [FILL] | [FILL: e.g. usability round 2] | |

## 6. Status log

| Date | Update |
|---|---|
| 2026-08-18 | Stack decided: hand-written HTML, CSS and JavaScript, no build step, hosted on GitHub Pages from `main`. [architecture.md](architecture.md) and [AGENTS.md](../AGENTS.md) filled in accordingly |
| 2026-08-21 | Design pass on the home page closed out, and the rest of the site built. A CSS consolidation pass ran first ([DESIGN.md](../DESIGN.md) §5) so the shared patterns existed before eight pages copied them. Six pages added — `/about`, `/accessibility`, `/your-rights`, `/programs`, `/glossary`, `/where-to-get-it`, `/before-you-sign` — plus a third Renter basics explainer, `/learn/heating-systems` (topic #20, new). Every link in the primary nav and the footer now resolves; before this the nav's own "Rights and programs" and "About" entries 404'd. Phase 4 (Build) exit criteria met for the must-have features except F3 |
| 2026-08-21 | Bug-fix and edit pass across the home page, the improvements page and the shell. The Renter basics carousel was one link and two dead controls, all from a stretched `::after` resolving against the wrong ancestor ([DESIGN.md](../DESIGN.md) §3.4). "Rights and programs" split into two nav entries so `/programs` is reachable from the top bar. `/learn/heating-systems` got a doll house hotspot, making eleven; every Renter basics article is now in the house. "Start here" stops moving once the tour starts and hands over to "Next". The hero shoes were redrawn to face the way they travel and their stride rebuilt around a planted foot. The reduce-motion switch left the footer, where it duplicated the floating control |
