# Design

> **Status:** ☐ Draft · **Last updated:** [FILL: YYYY-MM-DD]

<!-- GUIDANCE: This covers information architecture, visual system, and component behavior.
     Fill audience.md and features.md first — this document is downstream of both. -->

## 1. Design principles

<!-- GUIDANCE: 4–5, each phrased so it can settle an argument. -->

1. [FILL: e.g. "Mobile first — assume a phone, in a cold apartment, at 11pm."]
2. [FILL: e.g. "Answer before explaining. The action comes first, the reasoning is optional depth."]
3. [FILL: e.g. "Never hide whether something needs landlord permission."]
4. [FILL: e.g. "Legible over clever. Accessibility is a floor, not a feature."]
5. [FILL]

## 2. Information architecture

**Organizing logic:** [FILL: pick one and justify — by lifecycle phase? by room? by cost/effort?
by "can I do this myself"? Mixed navigation confuses; commit to a primary.]

### Sitemap

```
[FILL: replace with your actual structure]
/
├── /start                  — [FILL]
├── /improvements           — [FILL]
│   └── /improvements/:slug — [FILL]
├── /[interactive feature]  — [FILL]
├── /before-you-sign        — [FILL]
├── /your-rights            — [FILL]
├── /programs-and-help      — [FILL]
├── /glossary               — [FILL]
└── /about                  — [FILL: credits Sustainable Hanover, contact, last-updated]
```

### Navigation

- **Primary nav items:** [FILL: 4–5 max]
- **Mobile nav pattern:** [FILL]
- **Persistent elements:** [FILL: e.g. a "what's my situation" affordance]
- **Breadcrumbs / back behavior:** [FILL]

### URL conventions

[FILL: e.g. lowercase kebab-case, stable slugs, no dates in URLs]

## 3. Key screens

<!-- GUIDANCE: One row per screen you'll actually build. Sketch these on paper before styling. -->

| Screen | Job to be done | Primary action | Notes |
|---|---|---|---|
| Home | [FILL] | [FILL] | [FILL: a first-time renter should know within 5 seconds whether this is for them] |
| [FILL] | | | |

## 4. Visual system

### Color

<!-- GUIDANCE: Check every pairing for contrast before committing. See accessibility.md. -->

| Token | Value | Use | Contrast checked |
|---|---|---|---|
| `--color-bg` | [FILL] | [FILL] | ☐ |
| `--color-surface` | [FILL] | | ☐ |
| `--color-text` | [FILL] | | ☐ |
| `--color-text-muted` | [FILL] | | ☐ |
| `--color-accent` | [FILL] | | ☐ |
| `--color-success` | [FILL] | [FILL: e.g. "do this yourself"] | ☐ |
| `--color-warning` | [FILL] | [FILL: e.g. "ask your landlord"] | ☐ |
| `--color-danger` | [FILL] | [FILL: e.g. safety notes] | ☐ |
| `--color-border` | [FILL] | | ☐ |

- **Dark mode:** ☐ Supported ☐ Not in v1 — [FILL: decide]
- **Sustainable Hanover / Town brand colors we must or may use:** [FILL]
- **Rule:** color never carries meaning alone — always paired with text or an icon.

### Typography

| Token | Family | Size | Weight | Line height | Use |
|---|---|---|---|---|---|
| `--font-display` | [FILL] | | | | [FILL] |
| `--font-body` | [FILL] | | | | [FILL] |
| Base body size | | [FILL: ≥16px] | | [FILL: ≥1.5] | |

- **Font loading:** [FILL: system stack? self-hosted? avoid layout shift and third-party requests]
- **Max line length:** [FILL: ~65–75 characters]

### Spacing, radius, elevation

[FILL: e.g. 4px base scale — 4, 8, 12, 16, 24, 32, 48, 64]

### Iconography

[FILL: source, license, sizing, and the rule that icons are never the only label]

## 5. Component inventory

<!-- GUIDANCE: These fall out of the content model in content-strategy.md and the specs in
     features.md. Define states now; you'll thank yourself later. -->

| Component | Purpose | States to design |
|---|---|---|
| Improvement card | [FILL] | default, hover, focus, expanded, [FILL] |
| Permission badge | [FILL: "no permission needed" / "ask your landlord"] | [FILL] |
| Cost/effort meter | [FILL] | [FILL] |
| Checklist item | [FILL] | unchecked, checked, disabled, [FILL] |
| Filter / situation selector | [FILL] | [FILL] |
| Callout — safety | [FILL] | [FILL] |
| Callout — disclaimer | [FILL] | [FILL] |
| Source citation / last-reviewed stamp | [FILL] | [FILL] |
| Glossary term (inline definition) | [FILL] | [FILL] |
| [FILL] | | |

**Every interactive component must define:** default, hover, focus-visible, active, disabled,
loading, error, empty.

## 6. Responsive behavior

| Breakpoint | Width | Layout change |
|---|---|---|
| Mobile | [FILL: base] | [FILL] |
| Tablet | [FILL] | [FILL] |
| Desktop | [FILL] | [FILL] |

**Touch targets:** minimum [FILL: 44×44px].

## 7. Motion

- **Where motion is used:** [FILL: keep it minimal]
- **Duration/easing tokens:** [FILL]
- **`prefers-reduced-motion` behavior:** [FILL: required]

## 8. Content presentation patterns

- **How a "needs landlord permission" item looks vs. one that doesn't:** [FILL]
- **How reversibility is signaled:** [FILL]
- **How uncertainty in savings estimates is shown:** [FILL: ranges, not point figures]
- **How sources and last-reviewed dates are surfaced:** [FILL]

## 9. Voice in the interface

[FILL: microcopy rules — button labels, error messages, empty states. Cross-reference the
voice section of content-strategy.md.]

| Situation | Copy |
|---|---|
| Primary CTA on home | [FILL] |
| Empty result set | [FILL] |
| Form validation error | [FILL] |
| Safety warning lead-in | [FILL] |

## 10. Attribution and branding

[FILL: How Sustainable Hanover is credited, where, and with what assets. Confirm requirements
with your partner contact — this is easy to get wrong and awkward to fix after launch.]

## 11. Open design questions

| Question | Options | Decision | Date |
|---|---|---|---|
| [FILL] | | | |
