# Accessibility

> **Status:** ● Complete · **Last updated:** 2026-08-19 · **Owner:** Megan

This site is associated with a town committee and serves a public audience. A stated, tested
commitment is both the right thing and the defensible thing.

## 1. Commitment

**Target: WCAG 2.2 Level AA.** This is a design requirement for v1, not an aspiration for later.
Every component is built to meet the checklist in §2, and a component that misses a line there is
not finished. 2.2 rather than 2.1 because four of the criteria it adds land directly on things
this design does. See §2.1.

What is deferred is verification, not the target. The extensive testing, screen reader passes,
the full zoom matrix, testing with a disabled user, and a criterion-by-criterion audit, moves to
v2. Accessibility in v1 is built in rather than tested in. The requirements in §2 are enforced as
each component is written, and the build-time checks in §5 run before launch.

**Scope:** every page and every interactive feature in [features.md](features.md), including the
doll house, the situation selector, the flip cards and the looping diagrams. Print output is
covered when it arrives with F6 in v2.

**Public statement:** `/accessibility` is in the sitemap in [DESIGN.md](../DESIGN.md) §2 and ships
with v1, linked from the footer of every page. It states, in this order: the target of WCAG 2.2 AA,
that the site has not yet been audited against it, the short list of what has been checked from §5,
and the known issues from §6. The wording is a commitment and a status rather than a claim, for
example "We build this site to meet WCAG 2.2 Level AA. It has not yet been fully tested against
that standard, and we have not yet tested it with screen reader users."

**Mobile note.** v1 is designed for laptop and desktop, per [DESIGN.md](../DESIGN.md) §6. This does
not reduce the target. Reflow at 320px is how a desktop browser behaves at 400% zoom, so criterion
1.4.10 is built for in v1 and spot-checked before launch, regardless of the mobile deferral.

## 2. Non-negotiables for every component

This list is referenced from [AGENTS.md](../AGENTS.md) rule 5. It is enforceable, and a component
that misses a line here is not finished.

With testing deferred, this list is the control. Every line is checkable while writing the
component, by the person writing it, without tooling or a testing phase. That is why the deferral
in §1 is survivable. It stops being survivable if these get treated as aspirations.

- [ ] Fully operable by keyboard alone, in a logical order
- [ ] Visible focus indicator with sufficient contrast on every focusable element. One token
      site-wide: 2px `--color-accent` at 2px offset, never removed, including on mouse click
- [ ] Meaning never conveyed by color alone. Permission status, cost bands, safety warnings, and
      the visited state of a hotspot all carry text or an icon as well
- [ ] Text contrast ≥ 4.5:1, large text and UI components ≥ 3:1. Every token in
      [DESIGN.md](../DESIGN.md) §4 is measured, including the accent ring that carries the hotspot
      dots past 1.4.11
- [ ] All images have appropriate alt text, decorative images marked as such. SVG labels are real
      `<text>`, never outlined paths
- [ ] Form inputs have persistent visible labels, not placeholder-only
- [ ] Errors identified in text, associated with the field, and announced
- [ ] Dynamic content changes announced. The filter result count is an `aria-live="polite"` region
- [ ] Respects `prefers-reduced-motion`, and the site's own reduce motion toggle, identically
- [ ] Usable at 200% and 400% zoom and at 320px width without horizontal scrolling
- [ ] Touch and pointer targets ≥ 44×44px with 8px between adjacent targets. WCAG 2.2 sets the
      floor at 24×24. We hold 44 because hotspots on a drawing are hard to hit with a mouse too
- [ ] Page has a correct heading hierarchy and a skip-to-content link as the first focusable element
- [ ] Language declared on `<html>`

### 2.1 The four WCAG 2.2 criteria that hit this design

| Criterion | Where it bites | How we meet it |
|---|---|---|
| 2.4.11 Focus Not Obscured (Minimum) | The sticky progress bar and the sticky header could cover a focused element scrolled up behind them | `scroll-margin-top` on every focusable element equal to the combined sticky height. The bar unsticks below 480px of viewport height |
| 2.5.8 Target Size (Minimum) | Hotspots on the drawing, carousel controls, filter chips | 44×44px minimum, well past the 24×24 floor. Verified on the drawing, where the visual dot is 24px and the hit area is not |
| 3.2.6 Consistent Help | The Sustainable Hanover contact address in the footer, which is the site's only help mechanism | It sits in the same position in the footer on every page, per [DESIGN.md](../DESIGN.md) §10 |
| 3.3.7 Redundant Entry | The four-question situation selector, and anything that would ask again | The situation is set once and read everywhere. The header chip shows the current setting rather than re-asking |

3.3.8 Accessible Authentication does not apply. There is no login, no account, and nothing to
authenticate, per [project-brief.md](project-brief.md) §6.

## 3. Feature-specific risks

Interactive features are where accessibility usually breaks. These are ours.

| Feature | Accessibility risk | Mitigation |
|---|---|---|
| F1 doll house | Clickable regions on a drawing are the classic screen reader dead end. A bare SVG shape with a click handler is invisible to assistive technology | Rooms and hotspots are real `<button>` and `<a>` elements with accessible names. The room-by-room link list under the drawing is in the DOM at every width and is never `display: none` while the drawing is interactive |
| F1 doll house | Tab order in an SVG follows document order, which is not always visual order | Rooms are a list in the markup, positioned by CSS, so document order and visual order are the same by construction |
| F1 info bar | Content appearing without focus moving to it is missed entirely | Focus moves to the info bar heading on open. Escape closes it and returns focus to the hotspot |
| F2 filtering | Results changing silently. A screen reader user hears nothing and assumes the control did nothing | `aria-live="polite"` result count. Filtered-out cards are removed from the DOM rather than dimmed, so they leave the tab order |
| F2 selector | A multi-step form that traps someone who does not know an answer | Every question offers "I am not sure", which widens results. No question is required. The form submits empty |
| F3 flip cards | Content on the back of a card that assistive technology cannot reach, or a hover-only flip | Both faces in the DOM at all times, and stacked in normal flow with no script at all. Click, Enter and Space all work, because the control is a real `<button>`. Never hover-only |
| F3 flip cards, rebuilt 2026-08-26 | A card that turns leaves the back face rendered while it faces away, so its link stays in the tab order and its text stays in the accessibility tree. `backface-visibility` hides a face from the eye and from nothing else | The face turned away is `visibility: hidden`, which removes both. The transition delay is on the face that is leaving, so it goes when the turn does. Focus moves onto the button on the arriving face, which is visible from the first frame, so pressing a control never drops focus to the document |
| F4 looping diagrams | Motion that runs indefinitely with no way to stop it fails 2.2.2. Looping is the specific thing that criterion is about | Every loop carries a visible "Pause" button, built as a checkbox CSS reads, so it works with no JavaScript. The site-wide toggle stops all loops at once |
| Parallax | Scroll-linked movement is a vestibular trigger, and it is decoration nobody asked for | Travel capped at 20% of scroll distance, decoration only, never behind text without a solid band, held still under reduced motion, off below 600px |
| Carousel | Auto-advance, dot-only controls, and slides that cannot be tabbed | No auto-advance. Prev and next are anchor links with text labels. Slides are focusable. A counter reads "2 of 5" |
| Sticky bars | Covering focused content, and eating the viewport at high zoom | See 2.4.11 above. Header and bar together never exceed 25% of viewport height |
| Horizontal steps track (2026-08-26) | The usual way to build one pins the section and moves the row with page scroll, which slides content out of view without moving focus. A keyboard reader then lands on a link nobody can see | It is a real scroll container with `tabindex="0"`, so arrow keys move it and focus inside a card scrolls that card into view by itself. Verified. Below 900px, and in print, it is a plain numbered list |
| Step list numerals (2026-08-26) | `list-style: none` is enough for some engines to drop list semantics, and the ordinal goes with it. A numbered sequence then reads as an unordered pile | The numeral is real text inside the item, not `aria-hidden` and not a `::before`, so the order is in the content whatever the engine does with the list role |
| Email draft (2026-08-26) | A field labeled "Your landlord's name" on a site whose whole promise is that it collects nothing | Nothing typed into it is written to storage or sent anywhere, the `mailto:` link carries no recipient, and the page says so above the fields. See [DESIGN.md](../DESIGN.md) §3.8 |
| Page transitions (2026-08-26) | A full-page wipe on every navigation is exactly the kind of movement `prefers-reduced-motion` exists for | The `@view-transition` at-rule sits inside `@media (prefers-reduced-motion: no-preference)`, so it never starts. The site's own switch cannot reach an at-rule, so it zeroes the animations instead, which is an instant swap. That difference is written up in [DESIGN.md](../DESIGN.md) §7 |
| Hero scenes (2026-08-26) | A drawing that only makes sense once its animation has run is a drawing that fails without scroll timelines | Every scene's resting state is its finished state, and every one is `aria-hidden` with its content stated in words elsewhere on the same page |

**Principle:** every interactive feature has a fully equivalent non-visual path to the same
information, and that path is no longer than the visual one. The doll house has the room-by-room
list. The filters have the unfiltered library. The flip cards have plain question-and-answer text.
The diagrams have captions and a finished frame. An equivalent path that takes four times as long
is not equivalent.

## 4. Audience-specific decisions

- Plain language. A first-time renter does not know "R-value", "envelope", "setback" or "rim
  joist". Target is around grade 8, per [content-strategy.md](content-strategy.md) §2. Every
  technical term is linked to [glossary.md](glossary.md) on first use, rendered as a `<details>`
  inline definition that needs no script.
- Cognitive load. Short pages, one decision at a time, and the graduated depth model in
  [DESIGN.md](../DESIGN.md) §8: a student can stop after any tier and still have something true.
  No page exceeds 400 visible words before expansion.
- Reading in a hurry. The answer comes before the explanation on
  every page. Safety notes and permission status are never behind a disclosure.
- Reading on a phone. Deferred to v2 as a designed experience, per
  [DESIGN.md](../DESIGN.md) §6. The narrow layout in v1 is readable, which is the floor, not the
  goal. If Round 1 interviews show phone-first use, this deferral is the first thing to revisit.
- Non-native English speakers. Translation is out of scope for v1. Plain language and short
  sentences help regardless, and the site declares `lang="en"` so a browser translation tool works
  correctly.
- Students using a shared or borrowed machine. Nothing persists that identifies anyone, and the
  reduce motion toggle does not require the operating system setting to be changed.

## 5. Testing plan

### In v1: the build-time floor

Everything here costs minutes rather than sessions, and runs during the build rather than as a
phase after it. None of it is optional.

| Method | Tool | When | Owner |
|---|---|---|---|
| Automated scan | axe DevTools and Lighthouse in Chrome | Before every merge to `main`, since `main` publishes live | Megan |
| Internal link check | A script walking every `href` and `src` in the repo | Alongside `tools/check-content.mjs`, whenever pages are added | Megan |
| Keyboard-only pass on each new component | Manual, no mouse touched | As the component is built. Not a separate phase | Megan |
| Contrast audit of design tokens | Measured at design time, recorded in [DESIGN.md](../DESIGN.md) §4 | ☑ Done 2026-08-18. Re-check on any token change | Megan |
| Reduced motion, both paths | The operating system setting and the site toggle | One pass before launch | Megan |
| Spot check at 320px width and 200% zoom | Manual, one page of each type | ☑ Done 2026-08-21, measured rather than eyeballed: every page rendered at 320px, every element's right edge compared against the viewport, then the page scrolled to confirm it does not move. Found and fixed four real 1.4.10 failures — see [DESIGN.md](../DESIGN.md) §6 | Megan |
| Acceptance criteria in [features.md](features.md) §4 | Manual, per feature | As each feature is finished | Megan |

### Deferred to v2

| Method | Why it is deferred | Risk carried in the meantime |
|---|---|---|
| Screen reader pass, general | Needs a real session per page type, and nobody on the team has run one before | Medium. Semantic HTML and native elements are doing the work, per §2 |
| Screen reader pass on the doll house | Its own session, and the feature does not exist yet | Highest risk in the project. Mitigated by the room-by-room link list, which is plain HTML links and is the hardest thing on the page to get wrong. The risk is that the drawing is unusable with a screen reader, not that the content is unreachable |
| Full zoom and reflow matrix | Every page at 200% and 400% is an hour | Low. One column at every width, and the spot check above covers the pattern |
| Testing with a disabled user | Recruitment was never secured. See [research-plan.md](research-plan.md) | High for confidence, low for any specific known defect |
| Criterion-by-criterion audit against 2.2 AA | This is the piece that would earn a conformance claim | This is exactly why §1 does not make one |

**Automated tools catch roughly a third of issues,** so the Lighthouse accessibility score of 100
in [architecture.md](architecture.md) §6 is a build signal rather than evidence of conformance.
Saying so plainly is the point of §1.

Owners follow the phase assignments in [roadmap.md](roadmap.md) §2.

## 6. Known issues and exceptions

| Issue | WCAG criterion | Severity | Plan | Date logged |
|---|---|---|---|---|
| Mobile is not a designed experience in v1. Narrow widths reflow and are readable, and nothing is tuned for touch | 1.4.10 met, touch ergonomics beyond WCAG | Medium | v2, first item in [roadmap.md](roadmap.md) §5 | 2026-08-19 |
| Parallax is scroll-linked decorative motion. It conforms with the §5.1 limits and the toggle, and it is still motion nobody asked for | 2.3.3 is AAA and not our target | Low | Held under the §5.1 caps. Drop it if usability round 2 shows anyone struggling | 2026-08-19 |
| The reduce motion choice does not persist across pages without JavaScript | None. It works on the current page either way | Low | Accepted. Persistence needs a script by definition | 2026-08-19 |
| No testing with a disabled user is secured yet | Process, not a criterion | High | Raise in [research-plan.md](research-plan.md) recruitment | 2026-08-19 |
| The skip link on every page below the root pointed at the home page's `#main` rather than the current page's, so the first focusable element on the page navigated away from it | 2.4.1 | High | ☑ Fixed 2026-08-21. Logged here because it is exactly the class of defect §5's deferred keyboard passes exist to catch, and it survived every build-time check the site has | 2026-08-21 |
| The doll house has not been screen reader tested | 1.1.1, 2.1.1, 4.1.2 | Unknown | Its own session, deferred to v2 per §5. The link-list path is the reason this is a known unknown rather than a known defect | 2026-08-19 |
| Conformance with WCAG 2.2 AA is unverified. The site is built to the target and not yet audited against it | All | Known and disclosed | The v2 passes in §5. Disclosed on `/accessibility` in the meantime, per §1 | 2026-08-19 |
