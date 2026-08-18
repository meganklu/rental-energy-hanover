# Design

> **Status:** ◐ Draft · **Last updated:** 2026-08-18 · **Owner:** Megan

This document covers information architecture, the visual system, and component behavior. It is
downstream of [docs/audience.md](docs/audience.md) and [docs/content-strategy.md](docs/content-strategy.md),
and it is built within the constraints decided in [docs/architecture.md](docs/architecture.md).
Sections that depend on [docs/features.md](docs/features.md) are marked, because that document is
still unwritten and this one will need a second pass once it exists.

**The shape of the site.** The home page is an interactive cutaway of a house. A student clicks a
room, then clicks the window or the thermostat or the water heater, and gets the improvement for
that thing. The site teaches by letting someone poke at a drawing of the place they live. Reading
is the fallback path, not the main one.

**Relationship to Sustainable Hanover's site.** The site should read as a Sustainable Hanover
project. Colors, section rhythm, and the display typeface are taken from
[sustainablehanovernh.org](https://sustainablehanovernh.org). Where their choices work against a
dense instructional site read on a phone, this document says so and states the substitution. All
brand values below were read out of the published stylesheet
(`static1.squarespace.com/.../site.css`, retrieved 2026-08-18), not from a style guide, so confirm
them with Yolanda Baumgartner before launch. See §10 and §11.

**Everything here is buildable with no build step.** Per [docs/architecture.md](docs/architecture.md)
§2 there is no framework, no bundler and no package manager. Every pattern in §5.1 is specified as
plain HTML and CSS first, with JavaScript adding only what CSS cannot do. Where a pattern needs
JavaScript, the section says what a student sees without it.

## 1. Design principles

1. **Show the apartment, not a wall of text.** The first thing on the screen is something to
   click. Explanation arrives after the student has pointed at the thing they want to know about.
2. **Mobile first.** Assume a phone, in a cold apartment, at 11pm. Anything that only works on a
   laptop does not work.
3. **Answer first, explain second.** The action comes first. The reasoning is optional depth the
   student opens. A page that explains before it answers has failed.
4. **Permission and reversibility are never hidden.** Every recommendation shows whether the
   landlord has to agree and whether it comes off at move-out, before the student reads the steps.
   These never go behind a flip, a slide, or a collapsed bar.
5. **Every interactive path has an equal path that is not.** The walkthrough, the flip cards and
   the carousel are ways of reaching content that also exists as plain linked text. A student
   using a screen reader, a keyboard, or a browser with JavaScript off reaches the same
   recommendations by a route that is as short.
6. **Legible over clever.** Accessibility is the floor. If a visual treatment fails contrast,
   keyboard use, or 320px reflow, the treatment loses.

## 2. Information architecture

**Organizing logic: by the thing in front of you, filtered by your situation.**

The primary entry is spatial. A student who is cold looks at the drawing, finds the window, and
gets the window advice. Navigation names actions for the students who arrive from a link or a
search rather than from the front page. Lifecycle phase from
[docs/audience.md](docs/audience.md) §6 is a sort and filter dimension rather than a set of nav
labels. Three reasons:

- There are nine lifecycle phases and the nav holds five items. A phase nav would either bury
  content or split it across labels students cannot tell apart ("move-in" against "pre-winter").
- Students arrive mid-problem with a question like "why is this so expensive". They match that to
  a room or a task, not to a phase name.
- Phase is already a required field on every content item, so it can drive default filters and
  ordering everywhere without appearing in the nav at all.

The situation a student sets once (heat type, who pays, months left on the lease, phase) persists
across the site, filters every list, and dims the hotspots in the walkthrough that do not apply to
them. That is the interactive layer the project exists to provide, and it is what a static
Sustainable Hanover page cannot do.

### Sitemap

```
/                                The house. Interactive cutaway, six rooms, ten hotspots
│   /#kitchen /#basement …       Room views. Real fragments, so a room is linkable and works
│                                with JavaScript off
├── /start                       Situation selector. Four questions, filters everything after
├── /improvements                The library. Every improvement, filterable. Also the complete
│   │                            text index behind the walkthrough
│   └── /improvements/:slug      One improvement: cost, permission, reversibility, steps, sources
├── /learn                       Explainers, built as flip cards and diagrams
│   ├── /learn/read-your-bill    Enabler. kWh, rate, what is actually driving the bill
│   ├── /learn/find-your-drafts  Enabler. Guided walkthrough of where heat escapes
│   ├── /learn/who-pays-for-what Enabler. Finding it in the lease
│   └── /learn/:slug             Remaining explainers
├── /checklist                   Generated checklist for the student's phase and situation
├── /before-you-sign             Hunting and signing. Viewing checklist, what to ask
├── /your-rights                 NH heat standard, habitability, who to call. Legal disclaimer
├── /programs                    NHSaves and assistance a renter can actually use
├── /where-to-get-it             Materials sourcing. Online, or fare-free bus to West Lebanon
├── /glossary                    Plain-language definitions, linked from first use
├── /about                       Credits Sustainable Hanover, contact, site-wide last-reviewed
└── /accessibility               Public accessibility statement and how to report a problem
```

Rooms are fragments of the home page rather than their own URLs. This keeps the walkthrough in one
file, makes `/#kitchen` shareable, and lets CSS `:target` switch rooms with no JavaScript at all.
`/where-to-get-it` is a single shared page so the five improvements that involve a purchase link to
it instead of repeating it. See [docs/content-strategy.md](docs/content-strategy.md) §8.

### Navigation

- **Primary nav items:** The house · What you can change · Learn · Rights and programs · About.
  `/checklist`, `/before-you-sign`, `/where-to-get-it` and `/glossary` are reached from context,
  not from the top bar.
- **Mobile nav pattern:** A visible top bar with the wordmark and a labeled menu button reading
  "Menu". Tapping it opens a full-screen panel listing the five primary items with the current
  situation summarized at the top. No hamburger icon without the word next to it.
- **Persistent elements:** A situation chip in the header showing the current setting, for example
  "Electric baseboard · I pay heat · 7 months left". Tapping it reopens the selector. When nothing
  is set it reads "Set your situation" and links to `/start`.
- **Breadcrumbs and back behavior:** Breadcrumbs on improvement and explainer detail pages only,
  one level deep (`What you can change / Seal your windows with film`). Filter state and the
  current room live in the URL, so the browser back button returns the student to the room or the
  filtered list they came from.

### URL conventions

Lowercase kebab-case. Stable slugs that describe the action, never dates, never IDs. A slug is part
of the content item and does not change once published, because links to it exist off-site. Filters
serialize as query parameters (`/improvements?heat=electric-baseboard&permission=none`) so a
student can send a filtered list to a roommate. Rooms serialize as fragments (`/#basement`).

## 3. Key screens

| Screen | Job to be done | Primary action | Notes |
|---|---|---|---|
| The house `/` | Make a cold, annoyed student point at the thing that is bothering them within five seconds | Tap a room, then tap a thing in it | Spec in §3.1. Under 40 words of copy above the drawing |
| Room view `/#room` | Show the three or four things worth knowing about in this room | Tap a hotspot | Also renders as a plain linked list under the drawing, which is the no-JavaScript and screen reader path |
| Situation selector `/start` | Collect the four inputs that change what we recommend | Answer, then "Show what I can do" | Every question has "I am not sure", which widens results rather than blocking. One question per screen on mobile. A plain form, so it submits without JavaScript |
| Improvements library `/improvements` | Let a student scan everything and narrow it | Open an improvement | The one screen in the site that is a card grid, because it is also the complete index and the fallback path. Default sort: enablers first, then impact, then lowest cost. Empty state never dead-ends |
| Improvement detail `/improvements/:slug` | Get this done today | Follow the steps | Fixed order: title, summary, badges, safety note if any, what you need, steps, where to get it, sources. Visible prose under 200 words. Depth lives in disclosure bars |
| Explainer `/learn/:slug` | Correct one wrong idea, fast | Flip the cards, then go do the improvement | Built as flip cards and a diagram rather than paragraphs. See §5.1 |
| Checklist `/checklist` | Take a list away and act on it over a week | Print, or copy as text to send to roommates | State is local to the browser. Nothing is submitted anywhere |
| Rights `/your-rights` | Find out whether 58°F is legal and who to call | Reach a real help resource | Legal disclaimer at the top, never collapsed. No advice on a specific dispute |
| Programs `/programs` | Find out whether a renter can use this | Go to the program's own page | Any program with `state` other than NH is labeled as another state's program or is not rendered |

The row set will need revisiting once [docs/features.md](docs/features.md) exists.

### 3.1 The home walkthrough

The centerpiece. Everything else on the site can be reached from it.

**What is drawn.** A cutaway of a two-story wood-frame house with a basement and an entry porch,
which is the common shape of a Hanover student rental. One SVG, drawn for this site, in the
illustration style set in §4. The archetype needs checking against real units before it is drawn.
See §11.

**Rooms (6):** Entry and porch · Living room · Bedroom · Kitchen · Bathroom · Basement.

**Hotspots (10 in v1),** each mapping to an existing content item so the walkthrough adds a way in
rather than a new body of content:

| Hotspot | Room | Goes to |
|---|---|---|
| Window | Living room, Bedroom | Window film, thermal curtains |
| Exterior door | Entry | Door sweeps and weatherstripping |
| Thermostat | Living room | Thermostat setback |
| Radiator or baseboard | Living room, Bedroom | Do not block or cover it |
| Space heater | Bedroom | Real cost per hour, and the safety note |
| Water heater | Basement | Hot water, showers, laundry temperature |
| Outlets and plugs | Living room | Phantom load |
| Light fixture | Kitchen | LED swaps, keep the originals in a box |
| Rim joist and attic hatch | Basement | Where the heat actually goes, and the programs page |
| The bill on the fridge | Kitchen | Read your bill. Marked "Start here" |

**Interaction.** Tap a room to open it. Tap a hotspot to open an info bar under the drawing
holding the title, the permission and reversibility badges, cost and time, one sentence, and a
link to the full improvement. One info bar is open at a time. The bar does not cover the drawing.

**How it degrades.** Rooms are `:target` fragments, so room switching is pure CSS. Every hotspot is
a real link to its improvement page, so with JavaScript off a tap goes straight to the page. With
JavaScript on, the link opens the info bar instead and updates the fragment. Under the drawing,
always present in the markup, is "Everything in this house", a list of every room with its
hotspots as ordinary links. That list is the screen reader path, the no-JavaScript path, and the
narrow-phone layout, and it is not hidden with `display: none` at any width where the drawing is
interactive.

**Accessibility.** Each hotspot is a `<button>` or `<a>` with a real accessible name ("Living room
window. Sealing gaps here typically saves the most"), never a bare SVG shape. Tab order runs room
by room, top to bottom, matching the visual order. The whole-house drawing is
`role="img"` with a description naming the rooms. Hit areas are at least 44×44px even where the
drawn dot is 24px. Opening an info bar moves focus to the bar heading. Escape closes it and
returns focus to the hotspot. This is the highest accessibility risk in the project, per
[docs/accessibility.md](docs/accessibility.md) §3, and it gets a screen reader pass of its own.

**Progress.** A sticky bar under the header reads "You have looked at 3 of 10 spots" and fills as
the student explores. It is encouragement, and it never gates content. Without JavaScript it shows
the static label "10 spots to look at".

**Weight.** The house SVG is inline, optimized, and no more than 40 KB, inside the 100 KB per-page
budget in [docs/architecture.md](docs/architecture.md) §6. No embedded raster images, no gradients,
no filters.

**If it is not ready.** The build window is 2026-08-19 to 2026-08-26 and this is the largest single
piece of work in it. The room list, the info bars and the improvement pages are the substance, and
they work with a plain room list and no drawing at all. Build that first and layer the SVG over it,
so a slipping illustration cannot take the home page with it.

## 4. Visual system

### Color

Sustainable Hanover's palette is three greens on white. The bright greens carry the brand and
cannot carry text, so they are used as fills and backgrounds while the deep green does the
interactive work.

**Sustainable Hanover brand values, as published:**

| Their token | Value | Contrast on white | How we use it |
|---|---|---|---|
| `accent` | `#7EDA5D` | 1.74:1 | Decorative only. Illustration fills, hotspot dots, section bands |
| `lightAccent` | `#C2E76B` | 1.41:1 | Decorative only. Tinted section backgrounds, highlight bands |
| `darkAccent` | `#046648` | 7.0:1 | Our primary interactive color. Links, buttons, focus ring |
| `black` / `white` | `#000000` / `#FFFFFF` | | We substitute a near-black for body text. See below |

**Our tokens:**

| Token | Value | Use | Contrast checked |
|---|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background | ☑ base |
| `--color-surface` | `#F2F6EE` | Cards, filter bar, info bars, inset blocks | ☑ 15.3:1 with text |
| `--color-surface-brand` | `#C2E76B` | Full-width highlight bands, mirroring their tinted sections | ☑ 11.9:1 with text |
| `--color-surface-dark` | `#06301F` | Dark section band, mirroring their dark sections | ☑ 14.5:1 with white |
| `--color-text` | `#14201A` | Body text. Near-black with a green cast, softer than their pure black at long reading lengths | ☑ 16.8:1 on bg |
| `--color-text-muted` | `#4C5A52` | Metadata, last-reviewed stamps, captions | ☑ 7.3:1 on bg, 6.6:1 on surface |
| `--color-accent` | `#046648` | Links, primary button fill, focus ring, active filter, hotspot ring | ☑ 7.0:1 on bg, white text on it 7.0:1 |
| `--color-accent-hover` | `#03503A` | Hover and active state of the above | ☑ 9.5:1 on bg |
| `--color-brand` | `#7EDA5D` | Decorative fills, illustration, unvisited hotspot dot. Never text | ☑ decorative, 9.7:1 with text on it |
| `--color-success` | `#046648` on `#E6F3EA` | "No permission needed" | ☑ 6.1:1 |
| `--color-warning` | `#8A5300` on `#FDF3E0` | "Ask your landlord first" | ☑ 5.8:1 |
| `--color-info` | `#14527A` on `#EAF2F8` | "Your landlord has to do this" | ☑ 7.4:1 |
| `--color-danger` | `#A32014` on `#FCEDEB` | Safety notes | ☑ 6.7:1 |
| `--color-border` | `#C9D4C6` | Decorative hairlines and card edges only | ☑ decorative, 1.5:1 |
| `--color-border-strong` | `#6F8272` | Form control borders, hotspot outlines, anything that must meet 3:1 | ☑ 4.1:1 on bg, 3.8:1 on surface |

- **Dark mode:** ☐ Supported ☑ Not in v1. The build window is one week and a second
  contrast-checked palette is not affordable in it. The token structure supports adding one later
  without touching component code.
- **Rule:** color never carries meaning alone. Every status color is paired with text and an icon.
  In the walkthrough, a visited hotspot differs from an unvisited one by a filled center and a
  changed accessible name, not by color alone.
- **Section themes.** Sustainable Hanover alternates white, light, and dark full-width bands down a
  page. We keep that rhythm with three themes: `white` (default), `light` (`--color-surface`), and
  `dark` (`--color-surface-dark`). Content pages use white throughout. The home page alternates. A
  page never uses more than two dark bands.

### Typography

Sustainable Hanover pairs acumin-pro headings at weight 500 with Poppins body at weight 300.
acumin-pro is served from Adobe Fonts, which is a third-party request and is barred by
[AGENTS.md](AGENTS.md) rule 6, and Poppins at 300 is thin for instructions read on a phone. We keep
Poppins for display, which is the recognizable half of their pairing, and set body text in the
system stack.

| Token | Family | Size | Weight | Line height | Use |
|---|---|---|---|---|---|
| `--font-display` | Poppins, self-hosted woff2, weights 500 and 600 | see scale | 500, 600 for h1 | 1.25 | h1 through h4, wordmark, hotspot labels, stat figures |
| `--font-body` | `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | 1rem | 400, 600 for emphasis | 1.6 | Everything else |
| Base body size | | 16px, `1rem` | 400 | 1.6 | Never below 16px anywhere, including captions, badges and SVG labels |

Type scale, fluid between 360px and 1140px viewports:

| Element | Mobile | Desktop |
|---|---|---|
| h1 | 2rem | 2.75rem |
| h2 | 1.5rem | 2rem |
| h3 | 1.25rem | 1.5rem |
| h4 | 1.125rem | 1.25rem |
| Body | 1rem | 1.0625rem |
| Small (metadata, badges) | 0.9375rem | 0.9375rem |

Sustainable Hanover sets h1 at 4rem. That works on a page with one heading and a photograph. Our
pages carry six to ten headings each, so the scale is compressed.

- **Font loading:** Two self-hosted woff2 files, Poppins 500 and 600, subset to Latin, preloaded,
  with `font-display: swap` and a metric-adjusted fallback so the swap does not shift layout. No
  Google Fonts request, no Adobe Fonts script, no third-party origin. If the files fail to load the
  site falls back to the system stack and remains fully legible.
- **Text inside SVG** uses `--font-body` at 16px minimum and is real `<text>`, never outlined
  paths, so it scales, reflows at 200% zoom, and is read by a screen reader.
- **Max line length:** 68 characters. Content column caps at 42rem.

### Spacing, radius, elevation

- **Spacing:** 4px base scale. 4, 8, 12, 16, 24, 32, 48, 64, 96. Tokens `--space-1` through
  `--space-9`. No values off the scale.
- **Radius:** `--radius-sm` 4px for inputs and buttons, `--radius-md` 8px for cards and info bars,
  `--radius-pill` 999px for badges and filter chips. Sustainable Hanover uses solid rectangular
  buttons, so ours stay close to square.
- **Elevation:** Borders instead of shadows. Two shadow tokens: `--shadow-sticky`
  (`0 1px 3px rgba(20, 32, 26, 0.18)`) for the sticky bars, and `--shadow-raised`
  (`0 2px 8px rgba(20, 32, 26, 0.12)`) for an open info bar and a flipped card, so the raised state
  is visible without relying on the flip animation to communicate it.

### Iconography

**Custom SVG, drawn for this site. No icon library, and no emoji anywhere in the interface or the
content.** [AGENTS.md](AGENTS.md) already bars emoji in copy. This extends it to the interface:
an emoji renders differently on every device, cannot inherit a status color, is read aloud by
screen readers in ways nobody controls, and does not match a hand-drawn house.

- **Drawing spec:** 24×24 viewBox, 20px optical live area, 2px stroke, round caps and joins, no
  fills except where a shape needs a solid, `stroke="currentColor"` so an icon inherits the status
  color it sits in. No gradients, no shadows, no two-tone.
- **Delivery:** one SVG sprite in `assets/icons/`, referenced with `<use>`. One request, cached
  across pages, colors still inherit. Icons are `aria-hidden="true"` and always sit next to a real
  text label.
- **The illustration uses the same pen.** The house cutaway, the room views and any diagram share
  the icon stroke weight, corner rounding and flat fills, so the drawing and the icons read as one
  hand. This is what makes a small custom set look deliberate instead of thin.

**v1 icon set, 22 icons.** Someone has to draw these before the build week. See §11.

- Objects, for the walkthrough and the improvements: window, door, thermostat, radiator, space
  heater, water heater, plug, light bulb, house cutaway, bill
- Status, paired with text: check (no permission needed), speech bubble (ask your landlord), key
  (landlord has to do it), warning triangle (safety), arrows (reversible)
- Facts: dollar, clock, gauge (impact)
- Controls: chevron (disclosure), arrow left and arrow right (carousel), flip, printer, external
  link

An icon is never the only label, and never the only difference between two states.

## 5. Component inventory

Cards appear in one place in this site, the library at `/improvements`, where a scannable index of
everything is the point and the fallback path. Everywhere else the pattern is one interactive
element at a time. A page of cards is the thing this site exists to be better than.

| Component | Purpose | States to design |
|---|---|---|
| House cutaway | The home page. Rooms and hotspots | default, room open, hotspot focused, hotspot visited, reduced motion, no JavaScript |
| Room view | One room, three or four hotspots | inactive, active (`:target`), focused |
| Hotspot | The tappable thing in a room | default, hover, focus-visible, visited, dimmed (does not apply to the student's situation, with a text reason), 44px hit area |
| Info bar | Opens under the drawing with the short answer | closed, opening, open, empty, error, no JavaScript (becomes a link) |
| Flip card | Flashcards for myths and definitions | front, back, focus-visible, reduced motion. Spec in §5.1 |
| Carousel | Ordered walkthroughs and before-and-after pairs | first, middle, last, keyboard, no JavaScript. Spec in §5.1 |
| Sticky progress bar | Progress through the house, and position within a long page | at rest, condensed, unstuck on short viewports, no JavaScript |
| Disclosure bar | "Why this works", "What if my landlord says no", "How we know this" | closed, open, focus-visible, deep-linked open |
| Improvement card | The unit of the library only | default, hover, focus-visible, visited, filtered-out (removed rather than dimmed) |
| Permission badge | States `landlordPermission`, three variants | three variants, each with icon and text, inline and card sizes |
| Reversibility badge | States `reversible` in move-out terms | three variants |
| Cost and time meter | `cost` and `time` bands as text plus a filled-square indicator | four cost bands, four time bands, unknown |
| Impact indicator | `impact`, including the `enabler` case that saves nothing on its own | low, medium, high, enabler |
| Checklist item | One step in the generated checklist | unchecked, checked, disabled (blocked by a prerequisite), needs-permission, printed |
| Filter and situation selector | Sets the four situation inputs and the library filters | default, focused, selected, "not sure", cleared, results-count live region |
| Callout, safety | Renders `safety` above steps, never below, never collapsed | single variant, `--color-danger` |
| Callout, disclaimer | The three standing disclaimers, worded exactly as in content-strategy §5 | legal, savings, permission |
| Source and last-reviewed block | "How we know this". Links plus an ISO date | open by default on detail pages, collapsed to a count on cards |
| Glossary term | Inline definition on first use | closed, open, focus-visible |
| Program card | An NHSaves or assistance program | NH, out-of-state (explicitly labeled), eligibility unknown |
| Button | Primary, secondary, text | default, hover, focus-visible, active, disabled, loading |
| Skip link | First focusable element on every page | hidden, focused |

**Every interactive component must define:** default, hover, focus-visible, active, disabled,
loading, error, empty.

Focus-visible is one token everywhere: a 2px `--color-accent` ring at 2px offset, which holds 3:1
against white and against `--color-surface`. It is never removed, including on mouse click, and it
is drawn outside the SVG shape for hotspots so it is not clipped.

### 5.1 Interaction pattern specs

Four patterns carry most of the site. Each is specified to work as plain HTML and CSS, with
JavaScript adding only what CSS cannot do.

**Flip card (flashcard).** For myth and correction, and for term and meaning. "Turning the heat
down and back up costs more than leaving it steady" flips to the correction.

- Built as `<details>` with a `<summary>`, so open and close are native, keyboard operable and
  announced. CSS does the flip on `[open]`. No JavaScript.
- The trigger is click, Enter or Space. Never hover alone. Hover adds a small lift and nothing
  more, so a touch user loses nothing.
- Both faces exist in the DOM at all times. Nothing is injected on flip.
- Back face is 40 words or fewer, and ends with a link to the improvement it argues for.
- Never carries safety, permission, cost, or source information. Those are always visible.
- Under `prefers-reduced-motion: reduce` the card swaps faces with no rotation.
- Cards are also listed as plain question-and-answer text on the explainer page for print and for
  screen reader users who prefer to read straight through.

**Carousel.** For ordered sequences (what to do in October, then November) and before-and-after
pairs of the same window.

- Built as a scroll-snap row of real, focusable slides. It scrolls and it tabs with no JavaScript.
- **No auto-advance, ever.** Nothing on this site moves on its own.
- Previous and next are anchor links to slide IDs, so they work without JavaScript. They are
  44×44px and carry text labels, not bare arrows.
- A counter reads "2 of 5". Dots alone are not a control.
- Six slides maximum. Anything longer is a list.
- Nothing lives only in a carousel. Every slide's content is also reachable from the library or an
  improvement page.

**Sticky and scroll-expanding bars.** Two distinct things.

- *Sticky progress bar.* `position: sticky` under the header. 56px tall at rest, condensing to
  40px as the page scrolls. Header and bar together never exceed 25% of viewport height, and the
  bar unsticks entirely below 480px of viewport height so a landscape phone keeps its content.
- *Scroll-expanding band.* A diagram that fills in as it enters the viewport, for example heat-loss
  arrows appearing one at a time. Built with CSS `animation-timeline: scroll()` inside an
  `@supports` guard, so browsers without it show the finished state. No scroll listener, no
  library.
- **No information is conveyed only by motion.** Any content in a scroll-expanding band is fully
  present and readable at any scroll position, and reads as complete when animation never runs.
- Under `prefers-reduced-motion: reduce`, bands render in their final state at once, and the sticky
  bar stops condensing.

**Disclosure bar (open and close).** The main tool for keeping pages short.

- Native `<details>` and `<summary>`, styled as a full-width bar, minimum 48px tall, with a chevron
  that rotates. No JavaScript.
- The label says what is inside. "Why this works", "What if my landlord says no", "How we know
  this". Never "More" and never "Read more".
- Open state is deep-linkable, so a link can point at an opened section.
- One level of nesting only. A disclosure inside a disclosure is a sign the page needs splitting.
- **Never used for:** safety notes, permission status, reversibility, cost and time, or the three
  standing disclaimers. Those are always visible on the page.

## 6. Responsive behavior

| Breakpoint | Width | Layout change |
|---|---|---|
| Mobile | base, 320px and up | Single column. The house shows one room at a time, chosen from a segmented room list above the drawing. No pan, no zoom, no whole-house view. Content column full width minus 16px gutters. Filters collapse into a sheet opened by a labeled button showing the active count |
| Tablet | 600px and up | Whole-house cutaway appears, with the room list beside it. Content column caps at 42rem and centers. Library cards go to two columns |
| Desktop | 900px and up | House and info bar sit side by side, so opening a hotspot does not push the drawing. Library gets a persistent left filter rail. Detail pages keep the 42rem measure. Page shell caps at 1140px |

**Touch targets:** minimum 44×44px, including hotspots, carousel controls, disclosure bars, filter
chips and the situation chip. Adjacent targets keep 8px between them.

The house drawing scales with the viewport and never requires horizontal scrolling or pinch-zoom
to use. Verified at 320px width and at 200% zoom, per
[docs/accessibility.md](docs/accessibility.md) §2. At 400% zoom the drawing gives way to the room
list, which carries the same links.

## 7. Motion

Motion earns its place here, because the interaction patterns in §5.1 depend on it to feel like
objects rather than page loads. It stays small, fast, and optional.

- **Where motion is used.** Five places. The flip card turning, the carousel scrolling, the info
  bar opening under the drawing, the disclosure bar expanding, and the scroll-expanding diagram
  bands. Nothing moves on page load. Nothing moves on its own. There is no auto-advance and no
  parallax.
- **Duration and easing tokens:** `--motion-fast` 120ms, `--motion-base` 200ms, `--motion-flip`
  260ms, `--motion-ease` `cubic-bezier(0.2, 0, 0, 1)`. Nothing exceeds 260ms.
- **Motion never carries information.** Every state a motion communicates is also visible in a
  static frame, through a label, an icon, a border, or `--shadow-raised`. Freeze any animation on
  this site at any point and the screen still makes sense.
- **`prefers-reduced-motion: reduce` behavior.** Required, and specified per pattern rather than as
  a blanket rule: flip cards swap without rotating, disclosure bars open without sliding, info bars
  appear without animating, scroll-expanding bands render finished, the sticky bar stops
  condensing, and carousel scrolling becomes instant (`scroll-behavior: auto`). Every transition
  duration resolves to 1ms. No component loses a state or a control.
- Sustainable Hanover ships their site with global animations turned off. Ours is a more
  interactive site, so it moves more, and it moves only in response to something the student did.

## 8. Content presentation patterns

### Keeping pages short

The site's advantage over a static page is that a student can get an answer without reading an
article. Enforceable rules:

- **No more than 60 consecutive words of body copy** without a heading, a visual, or something to
  interact with.
- **Under 400 visible words per screen** before anything is expanded. The improvement pages aim at
  200.
- **Depth goes in disclosure bars,** not in longer paragraphs. If a section cannot be reduced, it
  becomes a "Why this works" bar that is closed by default.
- **A fact pair becomes a flip card.** A sequence becomes a carousel or a numbered step list. A
  comparison becomes a diagram. Reach for a paragraph last.
- **Steps are imperative and one action each,** per the content model. A step that needs a
  parenthetical is two steps.

**The exceptions, which are never shortened, collapsed, or moved below the fold:** safety notes,
permission and reversibility status, cost and time, the three standing disclaimers from
[docs/content-strategy.md](docs/content-strategy.md) §5, and the sources block. These do not count
against the word budget. A short page is a goal. A page that hides what a student needs in order to
stay safe or keep their deposit is a failure, and the goal loses that argument every time.

### The patterns themselves

- **Permission status.** The permission badge sits directly under the title on the card, on the
  hotspot info bar, and on the detail page, above the summary and before any steps. Icon, color and
  full text: "No permission needed", "Ask your landlord first", "Your landlord has to do this".
  Anything other than "No permission needed" also renders the permission disclaimer.
- **Reversibility.** A second badge next to permission, worded in move-out terms rather than as a
  property of the material: "Comes off at move-out" rather than "reversible". Anything permanent
  carries a deposit warning in the same block.
- **Uncertainty in savings.** Ranges only, with the assumption visible in the same sentence:
  "typically 5 to 15%, in a unit with single-pane windows". Never a single figure, never a
  guarantee, never a projected dollar total for the year. Any page or info bar showing a number
  carries the savings disclaimer. A number with no entry in [docs/sources.md](docs/sources.md)
  fails `tools/check-content.mjs` and never reaches a screen.
- **Sources and last-reviewed.** Every content item ends with a "How we know this" block listing
  its sources as links, followed by "Last reviewed 2026-08-18" in muted text. It is a link list
  rather than prose, so it is short. Open by default on detail pages, collapsed to a count on
  cards. This block is a feature, not fine print, because it is the reason a student should believe
  the rest of the page.
- **Enablers.** The four enabler topics are labeled "Start here" rather than given an impact
  rating, in the library and on their hotspots, so a student is never told that reading their bill
  saves nothing.

## 9. Voice in the interface

Microcopy follows [docs/content-strategy.md](docs/content-strategy.md) §2. Lead with the action.
Money and comfort before climate. Plain declarative sentences, around grade 8. Second person.
Commas and periods in place of em dashes. No emoji and no warning symbols, write "Safety:" instead.
"Typically saves" rather than "will save". Buttons and hotspots name what happens next, so no
"Submit", no "Click here", and no "Learn more".

| Situation | Copy |
|---|---|
| Home, above the drawing | "Tap around your apartment. Most of what is making it cold is fixable, and cheap." |
| Room prompt | "What is in your living room?" |
| Hotspot accessible name | "Living room window. Sealing gaps here typically saves the most." |
| Hotspot, does not apply | "Your landlord pays for heat, so this one saves them money and not you." |
| Progress bar | "You have looked at 3 of 10 spots." |
| Situation chip, unset | "Set your situation" |
| Flip card front | "True or false: turning the heat down while you are out costs more than leaving it steady." |
| Flip card back opener | "False. Reheating a cold room costs less than holding it warm all day." |
| Disclosure bar labels | "Why this works" · "What if my landlord says no" · "How we know this" |
| Carousel control | "Next: November" |
| Empty result set | "Nothing matches all of those filters. Clear the lease-length filter to see 6 more." Always names a filter to drop, and offers a one-tap way to drop it |
| Form validation error | "Choose one of the options, or pick 'I am not sure' and we will show you everything." |
| Safety warning lead-in | "Safety: read this before you start." |
| Landlord permission, ask | "Ask your landlord first. Sending it in writing protects you both." |
| Savings figure | "Typically saves 5 to 15%, in a unit with single-pane windows." |
| Checklist print | "Print this, or copy it as text to send to your roommates." |
| Out-of-state program | "This is a Vermont program. Hanover renters cannot enroll. The New Hampshire equivalent is NHSaves." |

## 10. Attribution and branding

The site is built with Sustainable Hanover and should read that way. It launches as an external
site and may be folded into sustainablehanovernh.org later, per
[docs/project-brief.md](docs/project-brief.md) §4, so branding has to survive that move.

- **Header:** Our own wordmark in `--font-display`, with "A Sustainable Hanover project" as a
  subordinate line linking to sustainablehanovernh.org.
- **Footer, every page:** "Built with Sustainable Hanover, a committee of the Town of Hanover, New
  Hampshire", their logo at a fixed height, a link to their site, and the contact address
  sustainablehanovernh@gmail.com. Also the site-wide last-reviewed date and a link to the
  accessibility statement.
- **About page:** Full credit to the project team from
  [docs/project-brief.md](docs/project-brief.md) §8, the partnership description, and who to
  contact after 2026-08-26.
- **Logo asset:** Requested from Yolanda Baumgartner in a vector format. Their site currently
  serves a raster wordmark sized for mobile, which is not adequate for our header. Until a vector
  file arrives, use the text line only and no logo image.
- **The illustration carries brand weight too.** The house drawing is the most visible thing on the
  site and it will be read as Sustainable Hanover's. Show it to Yolanda before launch, not after.
- **What we do not do:** We do not present the site as an official Town of Hanover page, we do not
  use the Town seal, and we do not publish anything under their name without review. Per
  [AGENTS.md](AGENTS.md), anything appearing under Sustainable Hanover branding goes to a human
  first.

Every item in this section is provisional until Yolanda confirms it. See §11.

## 11. Open design questions

| Question | Options | Decision | Date |
|---|---|---|---|
| Who draws the house cutaway and the 22 icons, and by when? This is the critical path into the 2026-08-19 build week | One person owns illustration / split by room / ship the room list first and layer the drawing on | | |
| Is the two-story-with-basement archetype right for Hanover student rentals? Many are apartments in a subdivided house with no basement access | Verify against interviews and real units / draw a second archetype / draw rooms only and no whole house | | |
| Ten hotspots in v1, or fewer done better? | 10 as listed in §3.1 / 6 covering only the Must topics | | |
| Does a hotspot that does not apply to the student's situation dim, disappear, or stay with a reason? | Dim with a text reason, as specified / hide / no change | Dim with a reason, pending usability testing | 2026-08-18 |
| Does the whole-house view appear on phones at all, or only the room-at-a-time view? | Room at a time below 600px, as specified / pinch-zoom whole house | Room at a time, pending testing at 320px | 2026-08-18 |
| Is `animation-timeline: scroll()` support wide enough in August 2026 for the scroll-expanding bands, given no build step and no polyfill? | Ship behind `@supports`, as specified / drop the pattern / static diagrams only | Behind `@supports` | 2026-08-18 |
| Do the myth flip cards touch safety-critical content, for example space heaters? If so they need the §4 sign-off in content-strategy | Route all flip-card copy through content review / keep safety topics out of flip cards | | |
| Does Sustainable Hanover have a written brand guide, or is the live stylesheet the only source? | Ask Yolanda / treat published values as canonical | | |
| Is Poppins for display acceptable given they use acumin-pro, which needs an Adobe Fonts request that AGENTS.md rule 6 bars? | Poppins display, self-hosted / system stack throughout / request approval | | |
| Can we get their logo as SVG or another vector format? | Vector from Yolanda / text wordmark only in v1 | | |
| Do we adopt their bright green `#7EDA5D` as a decorative fill, given it fails text contrast at 1.74:1? | Decorative only, as specified / drop it and use only the deep green | Decorative only, pending confirmation | 2026-08-18 |
| How does the checklist leave the browser? | Print stylesheet / copy as plain text / both | Both, pending features.md | |
| Does the situation persist between visits, given the no-personal-data rule? | `localStorage` under one key, no identifiers, per architecture.md D10 | Yes, one key, no identifiers | 2026-08-18 |
| Dark mode | Not in v1, as specified / v1 | Not in v1 | 2026-08-18 |
