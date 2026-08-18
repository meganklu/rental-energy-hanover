# Accessibility

> **Status:** ☐ Draft · **Last updated:** [FILL: YYYY-MM-DD]

<!-- GUIDANCE: This site is associated with a town committee and serves a public audience.
     A stated, tested commitment is both the right thing and the defensible thing. -->

## 1. Commitment

**Target:** [FILL: recommend WCAG 2.2 Level AA]

**Scope:** [FILL: all pages and all interactive features, including any downloadable/printable output]

**Public statement:** ☐ We will publish an accessibility statement page — [FILL: draft it or link it]

## 2. Non-negotiables for every component

<!-- GUIDANCE: This list gets referenced from AGENTS.md. Keep it enforceable. -->

- [ ] Fully operable by keyboard alone, in a logical order
- [ ] Visible focus indicator with sufficient contrast on every focusable element
- [ ] Meaning never conveyed by color alone (critical here — permission status, cost bands,
      safety warnings must all have text or icon labels)
- [ ] Text contrast ≥ 4.5:1; large text and UI components ≥ 3:1
- [ ] All images have appropriate alt text; decorative images marked as such
- [ ] Form inputs have persistent visible labels, not placeholder-only
- [ ] Errors identified in text, associated with the field, and announced
- [ ] Dynamic content changes announced to screen readers where relevant
- [ ] Respects `prefers-reduced-motion`
- [ ] Usable at 200% zoom and at 320px width without horizontal scrolling
- [ ] Touch targets ≥ [FILL: 44×44px]
- [ ] Page has a correct heading hierarchy and a skip-to-content link
- [ ] Language declared on `<html>`

## 3. Feature-specific risks

<!-- GUIDANCE: Interactive features are where accessibility usually breaks. Name yours. -->

| Feature | Accessibility risk | Mitigation |
|---|---|---|
| [FILL: e.g. clickable apartment walkthrough] | [FILL: image-map interactions are often invisible to screen readers] | [FILL: provide an equivalent list-based path] |
| [FILL: e.g. multi-step form] | [FILL] | [FILL] |
| [FILL: e.g. results that appear dynamically] | [FILL] | [FILL] |

**Principle:** [FILL: e.g. "Every interactive feature has a fully equivalent non-visual path
to the same information."]

## 4. Beyond WCAG — this audience specifically

- **Plain language.** [FILL: a first-time renter doesn't know "R-value" or "envelope" — see glossary.md]
- **Cognitive load.** [FILL: short pages, one decision at a time]
- **Reading on a phone, possibly in a hurry.** [FILL]
- **Non-native English speakers.** [FILL: is translation in scope? probably not v1 — say so]
- [FILL]

## 5. Testing plan

| Method | Tool | When | Owner |
|---|---|---|---|
| Automated scan | [FILL: e.g. axe DevTools, Lighthouse, pa11y] | [FILL: before each push? the site has no build step, see architecture.md §10] | [FILL] |
| Keyboard-only pass | manual | [FILL: before each release] | [FILL] |
| Screen reader pass | [FILL: NVDA / VoiceOver] | [FILL] | [FILL] |
| Zoom / reflow at 320px | manual | [FILL] | [FILL] |
| Contrast audit of design tokens | [FILL] | [FILL: at design time] | [FILL] |
| Testing with a disabled user | [FILL: possible? see research-plan.md] | [FILL] | [FILL] |

**Automated tools catch roughly a third of issues.** Manual passes are not optional.

## 6. Known issues and exceptions

| Issue | WCAG criterion | Severity | Plan | Date logged |
|---|---|---|---|---|
| [FILL] | | | | |

## 7. Feedback route

[FILL: how does someone report an accessibility problem? An email address on the accessibility
statement page.]
