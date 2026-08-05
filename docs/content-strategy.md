# Content Strategy

> **Status:** ☐ Draft · **Last updated:** [FILL: YYYY-MM-DD] · **Content reviewer:** [FILL]

<!-- GUIDANCE: This document governs what the site says and how it says it. Fill it before
     writing any page copy — retrofitting a voice and a citation policy onto finished content
     is miserable. -->

## 1. Content principles

<!-- GUIDANCE: 4–6 principles, each phrased as a rule you could enforce in review.
     Some starters below — edit, cut, replace. -->

1. **Every recommendation states whether it needs landlord permission.** [FILL: expand]
2. **Every recommendation states cost and effort in student terms.** [FILL: e.g. "$12, 20 minutes, reversible"]
3. **Nothing permanent, nothing that risks the deposit** — unless clearly flagged as such. [FILL]
4. **Local specifics over general advice.** [FILL: NH heating fuels, local utilities, local weather]
5. **We cite; we don't guess.** [FILL]
6. [FILL]

## 2. Voice and tone

| Attribute | We are | We are not |
|---|---|---|
| [FILL: e.g. Direct] | [FILL] | [FILL] |
| [FILL: e.g. Practical] | [FILL] | [FILL] |
| [FILL: e.g. Non-preachy] | [FILL: talks about money and comfort first] | [FILL: guilt-driven climate messaging] |
| [FILL] | | |

**Reading level target:** [FILL: e.g. plain language, ~grade 8, short sentences]

**Rewrite example** — take one paragraph of existing weatherization guidance and rewrite it in
this project's voice. This is the fastest way to make the voice section real:

> **Before:** [FILL]
>
> **After:** [FILL]

## 3. Topic inventory

<!-- GUIDANCE: The master list of everything the site might cover. Fill in the whole table,
     then use the Priority column to decide what's in v1. The "Permission" and "Reversible"
     columns are what make this project different from generic weatherization advice. -->

| # | Topic | Lifecycle phase | Cost | Effort | Landlord permission? | Reversible? | Est. impact | Priority |
|---|---|---|---|---|---|---|---|---|
| 1 | [FILL: e.g. Draft-sealing windows with film] | Pre-winter | [FILL] | [FILL] | [FILL] | [FILL] | [FILL] | Must |
| 2 | [FILL: e.g. Door sweeps and weatherstripping] | | | | | | | |
| 3 | [FILL: e.g. Thermostat setback schedules] | | | | | | | |
| 4 | [FILL: e.g. Understanding your utility bill] | | | | | | | |
| 5 | [FILL: e.g. Space heaters — cost and safety] | | | | | | | |
| 6 | [FILL: e.g. Lighting swaps] | | | | | | | |
| 7 | [FILL: e.g. Hot water use] | | | | | | | |
| 8 | [FILL: e.g. Laundry and drying] | | | | | | | |
| 9 | [FILL: e.g. Phantom load / plug loads] | | | | | | | |
| 10 | [FILL: e.g. What to do before leaving for winter break] | | | | | | | |
| 11 | [FILL: e.g. What to ask before signing a lease] | | | | | | | |
| 12 | [FILL: e.g. How to ask your landlord for an improvement] | | | | | | | |
| 13 | [FILL: e.g. Utility programs, rebates, and assistance] | | | | | | | |
| 14 | [FILL: e.g. When the apartment is genuinely too cold — your rights] | | | | | | | |
| 15 | [FILL: e.g. Restoring the unit at move-out] | | | | | | | |

Priority scale: **Must** / **Should** / **Could** / **Won't (this release)**

## 4. Sourcing and accuracy policy

<!-- GUIDANCE: This is the section that protects the project's credibility and Sustainable
     Hanover's. Be strict. -->

**Acceptable sources, in order of preference:**
1. [FILL: e.g. Sustainable Hanover / Town of Hanover published material]
2. [FILL: e.g. NH state agencies and NH utility program pages]
3. [FILL: e.g. U.S. DOE / Energy Star / EIA]
4. [FILL: e.g. peer-reviewed or national-lab research]

**Not acceptable:**
- [FILL: e.g. vendor blogs, product marketing, undated listicles, AI-generated summaries]

**Rules:**
- Every numeric claim (cost, savings, temperature, R-value) has a citation in [sources.md](sources.md).
- Savings figures are stated as [FILL: ranges? "typical"? with explicit assumptions?] — never as a promise.
- Anything about NH tenant law, utility rates, or rebate programs carries a **last-verified date**
  and is re-checked per [governance.md](governance.md).
- Local-specific claims (weather, fuel mix, utility) are checked against a NH/Upper Valley source,
  not a national average.

**Review workflow:**

| Content type | Written by | Reviewed by | Sign-off required before publish? |
|---|---|---|---|
| General efficiency tips | [FILL] | [FILL] | ☐ |
| Numbers, savings estimates | [FILL] | [FILL] | ☐ |
| Utility programs / rebates | [FILL] | [FILL] | ☐ |
| Anything touching tenant rights or law | [FILL] | [FILL] | ☐ |
| Safety-relevant content (heaters, CO, electrical) | [FILL] | [FILL] | ☐ |

## 5. Legal and safety posture

<!-- GUIDANCE: Decide this now, in writing, with your Sustainable Hanover contact. -->

- **Legal advice:** [FILL: e.g. "We describe general NH tenant protections and link to
  authoritative sources; we never advise on a specific dispute. Standing disclaimer on any page
  that mentions rights."]
- **Safety-critical topics** (space heaters, carbon monoxide, blocking vents, electrical load,
  covering baseboards): [FILL: e.g. "Require explicit safety framing and a named reviewer."]
- **Standing disclaimer text:** [FILL: draft it here so it's consistent everywhere]
- **Where disclaimers appear:** [FILL]
- **Do we ever name specific landlords or properties?** [FILL: recommend no — see project-brief non-goals]
- **Product recommendations:** [FILL: generic categories only, or named products? affiliate links? — recommend no affiliates]

## 6. Content model

<!-- GUIDANCE: Define the repeatable shape of each content type once. This drives your
     components in design.md and your data structures in architecture.md. -->

### Type: "Improvement" (the core unit)

| Field | Required | Notes |
|---|---|---|
| Title | ✓ | [FILL: e.g. verb-first, "Seal your windows"] |
| Summary | ✓ | [FILL: one sentence] |
| Cost | ✓ | [FILL: range or band] |
| Time | ✓ | [FILL] |
| Difficulty | ✓ | [FILL: scale] |
| Landlord permission needed | ✓ | [FILL: yes / no / ask first] |
| Reversible at move-out | ✓ | [FILL] |
| Estimated impact | ✓ | [FILL: how expressed?] |
| Applies to | ✓ | [FILL: heating type, unit type, who pays the bill] |
| Steps | ✓ | [FILL] |
| Materials | | [FILL] |
| Safety notes | | [FILL] |
| Sources | ✓ | [FILL] |
| Last reviewed | ✓ | [FILL] |

### Other content types

[FILL: e.g. Explainer, Checklist item, Glossary term, Quiz question, Program listing]

## 7. Media

- **Photos:** [FILL: original photos of real Hanover rentals? stock? licensing?]
- **Illustrations/diagrams:** [FILL]
- **Alt text policy:** [FILL — coordinate with accessibility.md]
- **Video:** [FILL: in scope? captions required?]

## 8. Localization of the "local"

<!-- GUIDANCE: What has to be true specifically for Hanover/Upper Valley. Verify each with a
     source; don't assume. -->

| Fact needed | Value | Source | Verified |
|---|---|---|---|
| Electric utility serving Hanover | [FILL] | [FILL] | ☐ |
| Common heating fuels in local student rentals | [FILL] | [FILL] | ☐ |
| Typical heating season dates | [FILL] | [FILL] | ☐ |
| Typical heating degree days | [FILL] | [FILL] | ☐ |
| State/utility efficiency program(s) renters can use | [FILL] | [FILL] | ☐ |
| Minimum heat / habitability standard in NH | [FILL] | [FILL] | ☐ |
| Local weatherization material sources | [FILL] | [FILL] | ☐ |

## 9. Content backlog / not yet written

[FILL]
