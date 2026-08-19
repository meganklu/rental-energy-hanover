# Design

> **Status:** ● Complete · **Last updated:** 2026-08-19 · **Owner:** Megan

This document covers information architecture, the visual system, and component behavior. It is
downstream of [docs/audience.md](docs/audience.md) and [docs/content-strategy.md](docs/content-strategy.md),
and it is built within the constraints decided in [docs/architecture.md](docs/architecture.md).
It reads alongside [docs/features.md](docs/features.md), which specifies what each interactive
feature does and which ones ship in v1.

**The shape of the site.** The home page is an interactive doll house. A student clicks a
room, then clicks the window or the thermostat or the water heater, and gets the improvement for
that thing. The site teaches by letting someone interact with an example residence. Reading
is the fallback path, not the main one.

**Relationship to Sustainable Hanover's site.** The site is a partnership with Sustainable
Hanover rather than a Sustainable Hanover publication, and the design should carry that
distinction. It borrows their visual language so the two read as related, and it credits them as
a partner rather than an author or an owner. See §10. Content is reformatted from the Sustainable Hanover pages. 
Colors, section rhythm, and the display typeface are taken from
[sustainablehanovernh.org](https://sustainablehanovernh.org). Where their choices work against a
dense instructional site, this document says so and states the substitution. All
brand values below were read out of the published stylesheet
(`static1.squarespace.com/.../site.css`, retrieved 2026-08-18), not from a style guide. See §10 and §11.

**v1 is a desktop and laptop site.** Mobile layouts are deferred to the next version, per §6. The
narrow-width behavior that v1 does ship is a readable fallback and the path for a zoomed desktop
browser, rather than a designed phone experience.

**Everything here is buildable with no build step.** Per [docs/architecture.md](docs/architecture.md)
§2 there is no framework, no bundler, and no package manager. Every pattern in §5.1 is specified as
plain HTML and CSS first, with JavaScript adding only what CSS cannot do. Where a pattern needs
JavaScript, the section says what a student sees without it.

## 1. Design principles

1. **Show the rental instead of a wall of text.** The first thing on the screen is something to
   click. Explanation arrives after the student has pointed at the thing they want to know about.
   The design should be visual and interactive.
2. **Answer first, explain second.** The action comes first. The reasoning is optional depth the
   student opens. A page that explains before it answers has failed.
3. **Permission and reversibility are never hidden.** Every recommendation shows whether the
   landlord has to agree and whether it comes off at move-out, before the student reads the steps.
   These never go behind a flip, a slide, or a collapsed bar.
4. **Every interactive path has an equal path that is not.** The walkthrough, the flip cards and
   the carousel are ways of reaching content that also exists as plain linked text. A student
   using a screen reader, a keyboard, or a browser with JavaScript off reaches the same
   recommendations by a route that is as short.
5. **Legible over clever.** Accessibility is a priority. If a visual treatment fails contrast,
   keyboard use, or 320px reflow, the treatment loses.

## 2. Information architecture

**Organizing logic: by the thing in front of you, filtered by your situation.**

The primary entry is spatial. A student is guided through the house figure to learn about
different ways to improve their rental. Information is graduated and provided in an interactive
and engaging manner. This is the main way to interact with the site from the home page.
Information can also be accessed through pages and navigation, so students can filter by their specific
situation and needs. Navigation names actions for the students who arrive from a link or a
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
across the site, filters every list, and dims the hotspots in the doll house that do not apply to
them. That is the interactive layer the project exists to provide, and it is what a static
Sustainable Hanover page cannot do.

### Sitemap

```
/                                Hero, then the doll house
│   /#house                      The doll house. Front-open view, six rooms, ten hotspots.
│                                The scroll arrow's target
│   /#kitchen /#basement …       A room, enlarged. Real fragments, so a room is linkable and
│                                works with JavaScript off
├── /start                       Situation selector. Four questions, filters everything after
├── /improvements                The library. Every improvement, filterable. The direct route
│   │                            for a student who already knows what they want
│   └── /improvements/:slug      One improvement: cost, permission, reversibility, steps, sources
├── /learn                       Explainers, built as flip cards and animated diagrams
│   ├── /learn/read-your-bill    Enabler. kWh, rate, what is actually driving the bill
│   ├── /learn/find-your-drafts  Enabler. Guided walkthrough of where heat escapes
│   ├── /learn/who-pays-for-what Enabler. Finding it in the lease
│   └── /learn/:slug             Remaining explainers
├── /checklist                   v2. Generated checklist for the student's phase and situation
├── /before-you-sign             Hunting and signing. Viewing checklist, what to ask
├── /your-rights                 NH heat standard, habitability, who to call. Legal disclaimer
├── /programs                    NHSaves and assistance a renter can actually use
├── /where-to-get-it             Materials sourcing. Online, or fare-free bus to West Lebanon
├── /glossary                    Plain-language definitions, linked from first use
├── /about                       Credits Sustainable Hanover, contact, site-wide last-reviewed
└── /accessibility               Public accessibility statement
```

Rooms are fragments of the home page rather than their own URLs. This keeps the doll house in one
file, makes `/#kitchen` shareable, and lets CSS `:target` enlarge a room with no JavaScript at all.
`/where-to-get-it` is a single shared page so the five improvements that involve a purchase link to
it instead of repeating it. See [docs/content-strategy.md](docs/content-strategy.md) §8.

**Two routes for website navigation.** The doll house is the guided route. It suits a student who does
not yet know what to ask for, and it hands out information in graduated tiers as they explore. The
navigation, the situation selector and the library are the direct route. They suit a student who
arrives from a link, a search, or a second visit, and who wants to filter straight to their heat
type, their budget, or what they are allowed to change. Neither is a fallback for the other, and
both reach the same content items. Every improvement is one tap from the house and one tap from the
library.

### Navigation

- **Primary nav items:** Home · Improvements · Rights and programs · About. Revised 2026-08-19:
  "The house" is renamed "Home" and "What you can change" is renamed "Improvements," matching the
  shorter, plainer vocabulary a student arriving from a link would use. `/learn` no longer has its
  own top-bar slot; its two explainers are reached from `/improvements` instead (a short "Learn"
  section on that page), alongside `/before-you-sign`, `/where-to-get-it` and `/glossary`, which
  were already reached from context rather than the top bar. `/checklist` joins them in v2.
- **Nav layout:** In v1 the four primary items sit inline in the top bar next to the logo lockup
  (house icon plus wordmark), which fits comfortably at the widths v1 targets. Below 600px they
  wrap to a second row and stay visible. The full-screen panel behind a labeled "Menu" button
  arrives with the mobile layouts in v2. No hamburger icon without the word next to it, whenever it
  lands.
- **Persistent elements:** Revised 2026-08-19 — the header no longer carries a situation
  indicator. Setting the situation moved to a single floating action button, "Personalize your
  recommendations," fixed to the bottom-right corner on every page (see §3.3). The button's label
  is static; it does not summarize the current setting. Tapping it opens the same four-question
  form as `/start` in a dialog, without navigating away, and works as a plain link to `/start`
  with JavaScript off.
- **Breadcrumbs and back behavior:** Breadcrumbs on improvement and explainer detail pages only,
  one level deep (`Improvements / Seal your windows with film`). Filter state and the
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
| Hero `/` | Say what the site is in about twenty-five words, and point down | Scroll, or tap the arrow | Spec in §3.1. "Welcome to your Home*", the note, one sentence, an arrow |
| The house `/#house` | Show a doll-house like view of a house with multiple rooms and elements that can be improved for energy efficiency | Tap a room, then tap a thing in it | Spec in §3.2. Under 40 words of copy above the drawing |
| Room, enlarged `/#room` | Show the three or four things worth knowing about in this room | Tap a hotspot | The room box grows out of the doll house. The same hotspots also render as a plain linked list under the drawing, which is the keyboard, screen reader and no-JavaScript path |
| Situation selector `/start` | Collect the four inputs that change what we recommend | Answer, then "Show what I can do" | Every question has "I am not sure", which widens results rather than blocking. All four questions on one screen in v1. One question per screen arrives with the mobile layouts in the next version. A plain form, so it submits without JavaScript. Revised 2026-08-19: this is now also the one and only situation form on the site — the improvements library filters against the same four answers rather than keeping a second, separate filter form. Reached directly at `/start`, or as a dialog opened by the "Personalize your recommendations" button (§3.3) from any page, with the same markup either way |
| Improvements library `/improvements` | Let a student scan everything and narrow it to their situation | Open an improvement | The one screen in the site that is a card grid, because it is the complete index and the direct route for a student who already knows what they want. Default sort: enablers first, then impact, then lowest cost. Empty state never dead-ends |
| Improvement detail `/improvements/:slug` | Get this done today | Follow the steps | Fixed order: title, summary, badges, safety note if any, what you need, steps, where to get it, sources. Visible prose under 200 words. Depth lives in disclosure bars |
| Explainer `/learn/:slug` | Correct one wrong idea, fast | Flip the cards, then go do the improvement | Built as flip cards and an animated diagram rather than paragraphs. Every explainer carries one diagram that shows the mechanism, for example where heat leaves a room. See §5.1 |
| Checklist `/checklist` | Take a list away and act on it over a week | Print, or copy as text to send to roommates | **v2**, cut from v1 per [docs/features.md](docs/features.md) §3. State is local to the browser. Nothing is submitted anywhere |
| Rights `/your-rights` | Find out whether 58°F is legal and who to call | Reach a real help resource | Legal disclaimer at the top, never collapsed. No advice on a specific dispute |
| Programs `/programs` | Find out whether a renter can use this | Go to the program's own page | Any program with `state` other than NH is labeled as another state's program or is not rendered |

Screens for features cut from v1 are marked. See [docs/features.md](docs/features.md) §3 for what
ships and why.

### 3.1 The hero

The first screen. It says what the site is, then points down.

**Revised 2026-08-19: the welcome mat.** The hero now reads as a classic coir welcome mat rather
than a parallax scene. This replaces the parallax-layer spec below; §7's parallax rules stay in
force for the doll house section and any later use, but the hero itself no longer uses parallax.

**Copy, exactly as written:**

> **Welcome to your Home\***
>
> \*Rental home
>
> Learn how to improve energy efficiency in your rental to save money and the environment.

Note the note has no trailing period, matching a real mat's lettering.

**The asterisk.** Marked up as `<h1>Welcome to your Home<sup aria-hidden="true">*</sup></h1>` with
the note read as the sentence it is. The heading is read aloud as "Welcome to your Home" and the
note separately, so the joke lands on the screen without turning into "Welcome to your Home
asterisk" in a screen reader.

**"Welcome" gets its own line,** revised 2026-08-19, set larger than the rest of the heading, with
"to your Home\*" wrapping underneath it at the heading's normal size. Still one `<h1>`, one
accessible name ("Welcome to your Home") — the size and line break are presentational (a `<span>`
around "Welcome" carrying the larger size), not two separate headings. Revised again 2026-08-19:
the first pass sized "Welcome" wide enough to overflow the mat at some widths. Its clamp ceiling
is pulled back so it always fits inside the border with room either side, sized against the mat's
own width rather than the viewport alone.

**Layout, revised 2026-08-19: what "the mat" actually is.** Only the text and its border are the
mat — earlier language that called the whole hero band the mat was imprecise. From the outside in:

1. The hero section itself: `min-height: 85svh` rather than `100vh`, so the top of the doll house
   shows at the bottom edge and the page reads as continuing. Never a fixed pixel height.
   Background is a solid light green (`--color-surface-brand`, revised 2026-08-19 — first pass
   used `--color-bg`), not tan — the tan is the mat's alone.
2. The mat rectangle: a `--color-mat` (tan) box, centered in the hero, sized taller than it is
   wide so the proportions read as an actual doormat rather than a banner, deliberately plain for
   now (no woven texture — see the open question in §11). Revised 2026-08-19: sized larger
   overall (a real doormat is a substantial object on the page, not a small card), on a fixed
   `aspect-ratio` so its proportions are exact and reproducible rather than an incidental result
   of a width and a min-height.
3. The black border: a `--color-mat-border` rule, inset from the tan rectangle's edges by a fixed
   margin on all four sides (`inset:`, not padding) so a strip of tan shows *outside* the border
   all the way around and the border keeps close to the tan rectangle's own aspect ratio rather
   than drifting toward square as the mat grows. This border, not the tan field, is what directly
   frames the heading.
4. Inside the border: the `<h1>` and, anchored to its bottom-right corner, the `*Rental home` note
   — mimicking where a mat's fine print actually sits.

The description sentence and the scroll arrow sit centered below the mat rectangle, outside it
entirely, on the hero's own light green background.

**The scroll arrow.** A real anchor, `<a href="#house">`, carrying the arrow icon and a visible
text label reading "Take a look inside". It is 44×44px at minimum, sits in the tab order directly
after the heading, and works with JavaScript off. With JavaScript on it scrolls smoothly, and it
jumps instantly when motion is reduced. An arrow with no label is not a control anyone can read.

**What it must not do.** It must not become the reason a student never finds the house. The 85svh
cap, the arrow, and the peeking top edge of the next section are all there for that.

### 3.2 The doll house

The centerpiece. Everything else on the site can be reached from it.

**What is drawn.** A doll house. The front wall is removed and all six rooms are visible at once,
each one a box on a two-story frame, with a basement below. Flat front-on elevation, no
perspective and no isometric view, so a room stays a rectangle and the things inside it stay
legible at any size. Built as styled boxes in the markup (CSS Grid), not one monolithic SVG, so
every room and hotspot is a real, independently focusable element rather than a shape inside a
graphic — see "Accessibility" below.

Revised 2026-08-19: the entry and porch box is one story tall, in line with the living room and
kitchen rather than spanning both floors alongside the bedroom and bathroom. The grid reads, top
to bottom: the roof; the bedroom and bathroom on their own floor; the porch alongside the living
room and kitchen on the floor below; the basement spanning the full width beneath that. The
illustration no longer sits on a solid brand-green background band — the rooms sit directly on the
page background. Room interiors themselves are not uniformly white: some rooms use
`--color-bg` and some use `--color-surface`, for visual variety rather than a semantic rule.

**It is an example residence.** The house is a teaching object rather than a
model of anyone's actual unit. This is not specified directly to the user and is assumed
based on context and the simplified illustration.

**Rooms (6):** Entry and porch · Living room · Bedroom · Kitchen · Bathroom · Basement.

**Hotspots (10 in v1),** each mapping to an existing content item so the house adds a way in rather
than a new body of content:

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

**Graduated depth.** Information arrives in three tiers, and a student can stop at any of them.

| Tier | Where it lives | How much | Example |
|---|---|---|---|
| 1 | The hotspot label, visible without tapping | A few words | "Window" |
| 2 | The info bar | One sentence, badges, cost and time. Under 40 words | "A $15 film kit over a drafty window can be installed in an hour and removed at move-out." |
| 3 | The improvement page | Steps, materials, safety, where to get it, sources | The full page |

No tier restates the one above it at greater length. Tier 2 is the answer. Tier 3 is how to do it.
A student who reads only tier 2 for all ten hotspots has learned something real, in about 400
words, without opening a single page.

**Guided, and free to wander.** The bill hotspot is marked "Start here" until it has been visited;
revised 2026-08-19, the badge is removed once that happens rather than staying put, since its job
(telling a lost student where to begin) is done. Every info bar ends with a "Next spot" control
that follows a fixed order: the bill, then the thermostat, then the windows and the door, then the
rest. Following that order is never required. Nothing is locked, nothing is greyed out until it
has been visited, and a student who opens the basement first gets exactly the same content. The
order exists so that a student who does not know where to begin is never staring at an
undifferentiated house.

Added 2026-08-19: whichever hotspot the guided order would take the student to next carries a
"Next" badge, the same pill style as "Start here" — so the guidance is visible on the drawing
itself, not only inside whichever info bar happens to be open. Exactly one hotspot carries it at a
time, recomputed after each spot is opened. It never doubles up with "Start here" on the bill
hotspot before anything has been visited; that badge already does the same job there.

A visited hotspot is shown at reduced opacity rather than with a flag icon, revised 2026-08-19 —
simpler, and it reads at a glance without needing a legend. This is one of the three ways a visited
state is distinguishable (opacity, plus the "Viewed" word added to its accessible name, per
"Accessibility" below); color and opacity together are still not the only signal, since the
accessible name changes too. None of this blocks the student from visiting again or from reaching
any other part of the site.

**Interaction.** Tap a room box and it enlarges, filling the drawing area, with the rest of the
house shown small alongside it. Tap a hotspot in the enlarged room to open an info bar under the
drawing. The open hotspot itself gets a visible selected state (a highlighted ring), so it is clear
which spot the info bar belongs to. The info bar holds the title, the permission and reversibility
badges, cost, time and impact — the same facts shown on the improvement page itself, not a
subset — one sentence, a "Learn more" link to the full improvement, and a "Close" control.
Revised 2026-08-19: reversibility is worded identically everywhere it appears (improvement pages,
cards, and the info bar) — "Comes off at move-out," "Mostly comes off at move-out," or "Permanent,
check with your landlord" for the three `reversible` values, never a page-specific variant. A
"Next spot" control also appears, worded "Next: Window" rather than "Next spot: Window" (revised
2026-08-19, shorter), unless every hotspot has already been visited, in which case it is dropped
rather than relabeled, leaving only "Learn more" and "Close." One info bar is open at a time. The
bar never covers the drawing. "Back to the house" returns to the full view.

**Hotspot color, revised 2026-08-19.** Hotspot buttons no longer fill with `--color-brand`
(#7EDA5D) under their text — that value is 1.74:1 against black and is decorative-only per §4's
own rule, which text sitting on it was quietly violating. A hotspot is now `--color-bg` (white)
with a `--color-accent` border and text, the same interactive pattern as every button on the
site, at the same 7.0:1 contrast. `--color-brand` stays where §4 already scoped it: the roof and
other purely decorative fills.

**Room background, revised 2026-08-19, revised again 2026-08-19.** The white/light-green split
from the first pass was arbitrary per room; a floor-based rule replaced it; the floor-based split
was itself one distinction too many. Every room now shares one background, `--color-bg`, so the
house reads as one consistent structure rather than a patchwork of surfaces.

**Explainer hotspots carry a "Renter basics" badge** (added 2026-08-19) in place of a permission
badge, since find-your-drafts and read-your-bill are not upgrades and have no
`landlordPermission` to state. Same pill shape as the permission badges, but a neutral grey
(`--color-surface` on `--color-border-strong`) rather than any of success/warning/info, since
those three already mean the three permission states and reusing one would misread as a claim
about permission.

**Without JavaScript.** Rooms are `:target` fragments, so enlarging a room is pure CSS. Every
hotspot is a real link to its improvement page, so a tap goes straight to the page. With JavaScript
on, the same link opens the info bar instead and updates the fragment. Under the drawing, always
present in the markup, is "Everything in this house", a list of every room with its hotspots as
ordinary links. That list is the screen reader path, the no-JavaScript path, and the layout below
600px, which makes it the zoom path too. It is never hidden with `display: none` at any width where the drawing is interactive.

**Accessibility.** The doll house is a list of rooms in the markup, positioned by CSS, so tab order
runs room by room in visual order and each room carries an accessible name and a hotspot count.
Each hotspot is a `<button>` or `<a>` with a real accessible name ("Living room window: Sealing
gaps here improves energy efficiency significantly"), never a bare SVG shape. Hit areas are at least 44×44px even
where the drawn dot is 24px. Opening an info bar moves focus to the bar heading, and Escape closes
it and returns focus to the hotspot. Enlarging a room announces the room name and how many spots
are in it. This is the highest accessibility risk in the project, per
[docs/accessibility.md](docs/accessibility.md) §3, and it gets a screen reader pass of its own.

**Progress.** Revised 2026-08-19, restyled as a green pill rather than a labeled bar: a rounded,
`--color-accent`-filled track that fills as the student explores, with no visible text by default.
Revised again 2026-08-19: the pill spans the full width of the section (the same measure the
doll house itself uses), not a small fixed-width bar — legible as a progress indicator at a
glance rather than something to search for. "You have viewed 3 of 10 spots." appears as a tooltip on hover or keyboard focus (the
pill is a real focusable element, `tabindex="0"`), and the same sentence is always present as its
`aria-label`, so a screen reader announces it regardless of hover — the count is never hidden
behind hover alone, only its visible spelled-out form is. Without JavaScript it shows a static
`aria-label` of "10 spots to view" and no fill. It reflects the guided order without enforcing it,
is encouragement, and never gates content. It is not present at all until the doll house section
reaches the viewport, then becomes sticky near the top of the screen — with a visible margin, not
flush against the very top edge — for as long as that section is in view, and scrolls away
normally once the student moves past it. It never claims header space on a screen the student has
not reached the house on yet.

**Weight.** The doll house structure is CSS and HTML, not an SVG payload, so its cost is the
shared component stylesheet rather than a per-page asset. Each hotspot's icon is a small `<use>`
reference into the shared icon sprite (§4), inside the 100 KB per-page budget in
[docs/architecture.md](docs/architecture.md) §6. No embedded raster images in the illustration, no
gradients, no filters.

**If it is not ready.** This is the largest single piece of work in building the site. 
A doll house degrades gracefully as a drawing, which a cutaway would not:
ship labeled empty room boxes with hotspot dots and no furniture, which is already usable, then
add the contents of each room as they get drawn. The room list, the info bars and the improvement
pages are the substance, and they work with no drawing at all.

### 3.3 Personalize your recommendations (added 2026-08-19)

The situation selector's one entry point, site-wide, replacing the header situation chip from the
original spec.

**Where.** A floating action button, fixed to the bottom-right corner, on every page. Static
label, "Personalize your recommendations" — it does not summarize the current setting the way the
old chip did. 44×44px minimum, sits above page content without covering the skip link or blocking
a focused element (`scroll-margin-bottom` on the last focusable element of a page, mirroring the
`scroll-margin-top` pattern already used for the sticky bars). Its hover state, revised 2026-08-19,
darkens the fill one step (`--color-accent` to `--color-accent-hover`) and applies the tactile
scale from §5, with the label staying full-strength white throughout — no opacity fade on the
button or its text at any point in the hover transition, so the label never dims or disappears.

**The form itself.** Revised 2026-08-19, two fixes: the submit button ("Show what I can do") sits
further from the last question, `--space-6` rather than the default paragraph spacing, so it does
not read as part of the fourth fieldset. Every radio input is the same explicit 20×20px box with
`flex-shrink: 0`, so a long option label can never visually compress the input next to it.

**Heat-type options are glossary terms, not parentheticals** (revised 2026-08-19). "Forced air
(you feel it blowing)" becomes a dotted-underline term, "Forced air," that shows the same
definition already in [docs/glossary.md](docs/glossary.md) on hover or keyboard focus, rather than
printing it inline for every option whether the student needs it or not. The definition is a real
tooltip element, not a bare `title` attribute, so it can be styled and is reachable by keyboard
(the term itself is focusable); screen readers get the definition through the tooltip's own text
in the accessibility tree, not through hover alone.

**What it opens.** The same four-question form as `/start`, in a `<dialog>`. There is exactly one
copy of this form's markup, on the `/start` page; the dialog is populated from it rather than
duplicating the fieldsets into every page's shell. Submitting the dialog's form saves the answers
to `localStorage` under `situation` (same key, same shape D10 already specifies), updates
anywhere on the current page that reads the situation, and closes the dialog without navigating
away. The library's filtering (F2) reads this same stored situation — see the note in the
Improvements library row of §3's key-screens table. There is no second, separate filter form.

**Without JavaScript.** The button is a real link to `/start`. Clicking it navigates there, the
same four-question page as always, which still submits as a plain GET with JavaScript off. The
dialog is pure enhancement on top of that link, not a replacement for it.

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
| `--color-brand` | `#7EDA5D` | Decorative fills, illustration, unvisited hotspot dot (always inside an accent ring). Never text | ☑ decorative, 9.7:1 with text on it |
| `--color-success` | `#046648` on `#E6F3EA` | "No permission needed" | ☑ 6.1:1 |
| `--color-warning` | `#8A5300` on `#FDF3E0` | "Ask your landlord first" | ☑ 5.8:1 |
| `--color-info` | `#14527A` on `#EAF2F8` | "Your landlord has to do this" | ☑ 7.4:1 |
| `--color-danger` | `#A32014` on `#FCEDEB` | Safety notes | ☑ 6.7:1 |
| `--color-border` | `#C9D4C6` | Decorative hairlines and card edges only | ☑ decorative, 1.5:1 |
| `--color-border-strong` | `#6F8272` | Form control borders, hotspot outlines, anything that must meet 3:1 | ☑ 4.1:1 on bg, 3.8:1 on surface |
| `--color-mat` | `#D9BE8A` | Added 2026-08-19. The hero's welcome-mat background. Used nowhere else | ☑ 9.3:1 with `--color-text` |
| `--color-mat-border` | `#000000` | Added 2026-08-19. The hero mat's literal black border. Used nowhere else | ☑ 11.7:1 on `--color-mat` |

- **Dark mode:** ☐ Supported ☑ Not in v1. The token structure supports adding one later
  without touching component code.
- **Rule:** color never carries meaning alone. Every status color is paired with text and an icon.
  A visited hotspot differs from an unvisited one three ways at once, revised 2026-08-19: it drops
  to reduced opacity instead of full-strength fill, it no longer carries a flag icon (retired, see
  §4 Iconography), and its accessible name gains the word "Viewed". Any one of the two remaining
  visual/textual signals is enough on its own — opacity change plus the accessible name.
- **Hotspot dots carry a ring.** `--color-brand` at 1.74:1 cannot mark the boundary of a control
  on a white room interior, which WCAG 1.4.11 puts at 3:1. Every hotspot dot therefore carries a
  2px `--color-accent` ring, which holds 7.0:1 whatever the fill inside it is doing.
- **Section themes.** Sustainable Hanover alternates white, light, and dark full-width bands down a
  page. We keep that rhythm with three themes: `white` (default), `light` (`--color-surface`), and
  `dark` (`--color-surface-dark`). Content pages use white throughout. The home page alternates. A
  page never uses more than two dark bands.

### Typography

Sustainable Hanover pairs acumin-pro headings at weight 500 with Poppins body at weight 300.
acumin-pro is served from Adobe Fonts, which is a third-party request and is barred by
[AGENTS.md](AGENTS.md) rule 6. We use Poppins for display (thicker weight to match acumin-pro) and body text.

| Token | Family | Size | Weight | Line height | Use |
|---|---|---|---|---|---|
| `--font-display` | Poppins, self-hosted woff2 | see scale | 600 | 1.25 | h1 through h4, wordmark, hotspot labels, stat figures |
| `--font-body` | Poppins, self-hosted woff2, falling back to `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | 1rem | 400, 600 for emphasis | 1.65 | Everything else |
| Base body size | | 16px, `1rem` | 400 | 1.65 | Never below 16px anywhere, including captions, badges and SVG labels |

Two weights, 400 and 600, cover the whole site. Display takes 600, which reads closer to
acumin-pro at 500 than Poppins 500 does. Body takes 400 rather than Sustainable Hanover's 300,
because 300 is too thin for step-by-step instructions on screen. Line height goes to 1.65, up
from the 1.6 a UI face would need, because Poppins has short descenders and tight default
leading.

Type scale, fluid between 360px and 1140px viewports:

| Element | Narrow | Desktop |
|---|---|---|
| h1 | 2rem | 2.75rem |
| h2 | 1.5rem | 2rem |
| h3 | 1.25rem | 1.5rem |
| h4 | 1.125rem | 1.25rem |
| Body | 1rem | 1.0625rem |
| Small (metadata, badges) | 0.9375rem | 0.9375rem |

Sustainable Hanover sets h1 at 4rem. That works on a page with one heading and a photograph. Our
pages carry six to ten headings each, so the scale is compressed.

- **Font loading:** Two self-hosted woff2 files, Poppins 400 and 600, subset to Latin, both
  preloaded, with `font-display: swap` and a `size-adjust` fallback so the swap does not shift
  layout. Poppins now sets every word on the site rather than the headings alone, so the fallback
  carries more weight than it did: the system stack is the second entry in both stacks, and a page
  whose fonts never arrive stays fully legible. No Google Fonts request, no Adobe Fonts script, no
  third-party origin. Two files is the ceiling. A third weight would push past the 60 KB font
  budget in [docs/architecture.md](docs/architecture.md) §6.
- **Numerals:** `font-variant-numeric: tabular-nums` on costs, times, temperatures and the progress
  counter, so figures line up in the cost meter and the count does not jitter as it changes.
- **Text inside SVG** uses `--font-body` at 16px minimum and is real `<text>`, never outlined
  paths, so it scales, reflows at 200% zoom, and is read by a screen reader.
- **Max line length:** 65 characters, and the content column caps at 40rem. Poppins sets wider
  than a UI face at the same size, so the measure is tighter than the 70 characters a system stack
  would take.

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
screen readers in ways nobody controls, and does not match a hand-drawn doll house.

- **Drawing spec:** 24×24 viewBox, 20px optical live area, 2px stroke, round caps and joins, no
  fills except where a shape needs a solid, `stroke="currentColor"` so an icon inherits the status
  color it sits in. No gradients, no shadows, no two-tone.
- **Delivery:** one SVG sprite in `assets/icons/`, referenced with `<use>`. One request, cached
  across pages, colors still inherit. Icons are `aria-hidden="true"` and always sit next to a real
  text label.
- **The illustration uses the same pen.** The doll house, the enlarged rooms and any diagram share
  the icon stroke weight, corner rounding and flat fills, so the drawing and the icons read as one
  hand. This is what makes a small custom set look deliberate instead of thin.
- **Doll house drawing rules.** Flat front-on elevation, no perspective and no isometric view.
  Room walls and floors are 2px strokes in `--color-border-strong`. Room interiors are
  `--color-bg` or `--color-surface`, never a photograph and never a texture. Objects inside a room
  are the icon set at a larger size rather than a separate drawing style. Brand green
  `--color-brand` fills the roof, the porch and the hotspot dots, which is where the palette's
  decorative-only rule is spent.

**v1 icon set, 23 icons.** Someone has to draw these before the build week. See §11.

- Objects, for the doll house and the improvements: window, door, thermostat, radiator, space
  heater, water heater, plug, light bulb, doll house, bill
- Status, paired with text: check (no permission needed), speech bubble (ask your landlord), key
  (landlord has to do it), warning triangle (safety), arrows (reversible), flag (spot viewed)
- Facts: dollar, clock, gauge (impact)
- Controls: chevron (disclosure), arrow left and arrow right (carousel and "Next spot"), flip,
  replay (animated diagram), printer, external link, back to the house

Revised 2026-08-19: the thermostat hotspot icon is drawn as a plain thermometer (a bulb and a
stem) rather than a dial, and the water heater hotspot icon is drawn as a single water droplet
rather than a tank, both more immediately legible at hotspot size than the literal-appliance
versions they replace. The bill hotspot icon is now the dollar sign (reusing the "dollar" facts
icon) rather than a sheet-of-paper glyph — the bill hotspot is fundamentally about a dollar figure,
and the dollar sign reads faster at hotspot size. The "flag (spot viewed)" icon above is retired
— see §3.2, a visited hotspot is now shown at reduced opacity instead. Two icons added: "close" (an
X, for the personalize dialog) and "sliders" (three adjustable rows, for the personalize FAB). The
"doll house" object icon doubles as the site logo, in the header lockup next to the wordmark and
as the browser tab favicon.

An icon is never the only label, and never the only difference between two states.

## 5. Component inventory

Cards appear in one place in this site, the library at `/improvements`, where a scannable, filterable
index of everything is the point and where a student who knows what they want should land. Everywhere
else the pattern is one interactive element at a time. A page of cards is the thing this site exists
to be better than.

| Component | Purpose | States to design |
|---|---|---|
| Hero | The first screen. Tagline, note, one sentence, arrow | default, parallax running, parallax held still, short viewport, below 600px |
| Parallax layer | Depth behind the hero and the section bands | moving, held still (reduced motion or `animation-timeline` unsupported), off below 600px |
| Scroll cue | The labeled arrow from the hero to the doll house | default, hover, focus-visible |
| Pause control | Stops one looping animation | playing, paused, focus-visible, works with no JavaScript |
| Reduce motion toggle | Turns ambient motion off across the site | following the operating system, forced reduce, forced full, focus-visible |
| Doll house | The home page. Six room boxes seen at once | default, room enlarged, hotspot focused, hotspot visited, reduced motion, no JavaScript |
| Room box | One room in the house, and the enlarged view of it | small (in the house), enlarged (`:target`), focused, empty (no hotspots apply to this student) |
| Next spot control | Carries the guided order from one info bar to the next | default, focus-visible, last spot, removed once all spots are seen (revised 2026-08-19, was a relabeled state) |
| Back to the house | Returns from an enlarged room to the full view | default, focus-visible |
| Hotspot | The tappable thing in a room | default, hover, focus-visible, selected (its info bar is the one open, added 2026-08-19), visited (reduced opacity, revised 2026-08-19, was accent fill plus flag marker), dimmed (does not apply to the student's situation, with a text reason), 44px hit area |
| Info bar | Opens under the drawing with the short answer | closed, opening, open, empty, error, no JavaScript (becomes a link) |
| Flip card | Flashcards for myths and definitions | front, back, focus-visible, reduced motion. Spec in §5.1 |
| Carousel | Ordered walkthroughs and before-and-after pairs | first, middle, last, keyboard, no JavaScript. Spec in §5.1 |
| Animated diagram | Shows a mechanism the student cannot see, for example where heat leaves a room | static (first frame), playing, finished, replay, reduced motion, no JavaScript. Spec in §5.1 |
| Sticky progress bar | Progress through the house, and position within a long page | at rest, condensed, unstuck on short viewports, no JavaScript |
| Disclosure bar | "Why this works", "What if my landlord says no", "How we know this" | closed, open, focus-visible, deep-linked open |
| Improvement card | The unit of the library only | default, hover, focus-visible, visited, filtered-out (removed rather than dimmed) |
| Permission badge | States `landlordPermission`, three variants | three variants, each with icon and text, inline and card sizes |
| Reversibility badge | States `reversible` in move-out terms | three variants |
| Cost and time meter | `cost` and `time` bands as text plus a filled-square indicator | four cost bands, four time bands, unknown |
| Impact indicator | `impact`, including the `enabler` case that saves nothing on its own | low, medium, high, enabler |
| Checklist item (v2) | One step in the generated checklist | unchecked, checked, disabled (blocked by a prerequisite), needs-permission, printed |
| Situation form | The one four-question form, used at `/start` and inside the personalize dialog | default, focused, selected, "not sure", cleared, results-count live region on the library |
| Floating action button (added 2026-08-19) | "Personalize your recommendations," fixed bottom-right, every page | default, hover, focus-visible, active |
| Personalize dialog (added 2026-08-19) | `<dialog>` holding the situation form, opened by the FAB | closed, open, focus-trapped, no JavaScript (FAB is a plain link to `/start` instead) |
| Callout, safety | Renders `safety` above steps, never below, never collapsed | single variant, `--color-danger` |
| Callout, disclaimer | The three standing disclaimers, worded exactly as in content-strategy §5 | legal, savings, permission |
| Source and last-reviewed block | "How we know this". Links plus an ISO date | open by default on detail pages, collapsed to a count on cards |
| Glossary term | Inline definition on first use. Hover over the underlined term to view the definition. | closed, open, focus-visible |
| Program card | An NHSaves or assistance program | NH, out-of-state (explicitly labeled), eligibility unknown |
| Button | Primary, secondary, text | default, hover, focus-visible, active, disabled, loading |
| Skip link | First focusable element on every page | hidden, focused |

**Every interactive component must define:** default, hover, focus-visible, active, disabled,
loading, error, empty.

Focus-visible is one token everywhere: a 2px `--color-accent` ring at 2px offset, which holds 3:1
against white and against `--color-surface`. It is never removed, including on mouse click, and it
is drawn outside the SVG shape for hotspots so it is not clipped.

**Tactile hover, added 2026-08-19.** Every button-like control (`.btn`, hotspots, the FAB, the
scroll cue, cards, filter chips, carousel controls, the dialog close button) grows slightly on
hover, a `transform: scale()` response transition under the same `--motion-duration-base` token
and reduced-motion gating as everything else in §7 — held still, not merely slowed, when motion is
reduced. It is additive to whatever color or border change that component already had on hover,
never a replacement for it, since scale alone is easy to miss for a student skimming quickly.

### 5.1 Interaction pattern specs

Four patterns carry most of the site. Each is specified to work as plain HTML and CSS, with
JavaScript adding only what CSS cannot do.

**Flip card (flashcard).** For myth and correction, and for term and meaning. "Turning the heat
down and back up costs more than leaving it steady" flips to the correction.

- Built as `<details>` with a `<summary>`, so open and close are native, keyboard operable and
  announced. CSS does the flip on `[open]`. No JavaScript.
- The trigger is click, Enter or Space. Never hover alone. Hover adds a small lift and nothing
  more, so a keyboard user loses nothing now and a touch user loses nothing in v2.
- Both faces exist in the DOM at all times. Nothing is injected on flip.
- Back face is 40 words or fewer, and ends with a link to the improvement it argues for.
- Never carries safety, permission, cost, or source information. Those are always visible.
- Under `prefers-reduced-motion: reduce` the card swaps faces with no rotation.
- Cards are also listed as plain question-and-answer text on the explainer page for print and for
  screen reader users who prefer to read straight through.

**Carousel.** For ordered sequences (what to do in October, then November) and before-and-after
pairs of the same window.

- Built as a scroll-snap row of real, focusable slides. It scrolls and it tabs with no JavaScript.
- No auto-advance. Nothing on this site moves on its own.
- Previous and next are anchor links to slide IDs, so they work without JavaScript. They are
  44×44px and carry text labels, not bare arrows.
- A counter reads "2 of 5". Dots alone are not a control.
- Six slides maximum. Anything longer is a list.
- Nothing lives only in a carousel. Every slide's content is also reachable from the library or an
  improvement page.

**Animated diagram.** One per explainer, and the reason an explainer is not a page of paragraphs.
It shows a mechanism a student cannot see: air moving through a gap under a door, heat leaving
through a single-pane window, a thermostat setback over a day.

- Inline SVG with CSS or SMIL-free CSS animation on the elements. No video, no GIF, no library.
- It loops so a student who looks away or arrives mid-cycle still sees the whole mechanism.
  A cycle runs 4 to 6 seconds and rests for about 1 second at the finished frame before repeating,
  so the loop has a readable stopping point rather than running as a continuous churn.
- Every loop carries a visible pause control. Content that moves for more than 5 seconds needs
  a way to stop it under WCAG 2.2.2, and looping means indefinitely. The control is a real button
  labeled "Pause", visible without hovering, sitting with the figure. It toggles to "Play". This is
  what makes looping allowed rather than a violation, so a looping animation without one does not
  ship.
- Pausing one diagram pauses that diagram. The global motion toggle in §7 stops every loop on the
  site at once.
- It starts when the student scrolls it into view rather than on page load, so a page does not
  start moving under someone who is reading further up.
- **The finished frame is the diagram.** Every label and every arrow is present and readable in
  the final state, so the diagram teaches with the animation never having run. Labels are real
  SVG `<text>`, and the whole figure carries a `<figcaption>` describing what it showed, which is
  what a screen reader user gets.
- Under reduced motion, whether from the operating system or the site's own toggle, it renders in
  the finished state, does not loop, and offers "Play" for anyone who wants to watch it once.

**Parallax.** Layered backgrounds that move at different rates as the page scrolls. Used on the
hero, on the section bands between major blocks of a page, and behind the doll house as a room
enlarges. Parallax is used elsewhere when appropriate to add visual interaction without detracting
from the messaging.

- Built with CSS scroll-linked animation inside the same `@supports (animation-timeline: scroll())`
  guard as the scroll-expanding bands, or with layered `position: sticky`. No scroll listener, no
  library, no `background-attachment: fixed`, which is unreliable on iOS.
- The travel is capped at 20% of the scroll distance of the element it sits behind. Beyond
  that, scroll-linked movement stops reading as depth and starts causing motion sickness.
- Layers never overlap text in a way that changes contrast as they move. A parallax layer that
  passes behind text carries a solid band, so the text keeps one background and one measured
  contrast ratio.
- It is decoration and it is skippable. Every layer renders in a fixed position when motion is
  reduced or when `animation-timeline` is unsupported, and the page loses nothing but depth.
- Off below 600px. See §6.

**Sticky and scroll-expanding bars.** Two distinct things.

- *Sticky progress bar.* `position: sticky` under the header. 56px tall at rest, condensing to
  40px as the page scrolls. Header and bar together never exceed 25% of viewport height, and the
  bar unsticks entirely below 480px of viewport height, which is what a zoomed window or a
  landscape laptop reports, so the content keeps the screen.
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

**v1 is designed for laptop and desktop. The mobile experience is the next version.** The build
window does not hold both, and the doll house, the hero and the library each need real mobile
design work rather than a shrunken copy of the desktop layout. Half-designed phone screens would
cost more credibility than no phone screens.

**One piece does not defer.** A desktop browser at 400% zoom reports a viewport about 320px wide,
so the narrow layout is the zoom path before it is ever the phone path. WCAG 1.4.10 puts reflow
without horizontal scrolling at AA, [docs/accessibility.md](docs/accessibility.md) §2 commits to
it, and the pieces it needs already exist for other reasons: one column, and the room-by-room link
list that the doll house carries for screen readers. So v1 reflows. It just does not pretend the
result is a phone design.

| Width | v1 status | Layout |
|---|---|---|
| 900px and up | **Designed.** This is the target | House and info bar side by side, so opening a hotspot does not push the drawing. An enlarged room keeps the rest of the house visible beside it. Library gets a persistent left filter rail. Parallax layers run. The hero holds 85svh. Detail pages keep the 40rem measure. Page shell caps at 1140px |
| 600 to 900px | **Works.** Falls out of the same CSS | Single column. The whole house stays visible, with the info bar below it. Content column caps at 40rem and centers. Library cards go to two columns. Filters become a horizontal chip row |
| Below 600px | **Reflow floor, not a designed experience** | One column, no horizontal scrolling down to 320px. Parallax holds still. The hero shrinks to its content. The doll house gives way to "Everything in this house", the room-by-room link list, which carries every hotspot as an ordinary link. Filters become a plain stacked form. Everything is reachable and readable. Nothing is tuned |

**Pointer targets:** 44×44px minimum stays in v1, on hotspots, carousel controls, disclosure bars
and filter chips, with 8px between adjacent targets. Dense hit areas on a drawing are hard to hit
with a mouse as well as a thumb, and WCAG 2.5.8 sets a 24×24 floor regardless of input. The
touch-specific work, thumb reach and gesture affordances, is what moves to v2.

**What the next version adds:**

- The doll house as a phone experience: two-column room grid, one room at a time, enlarged to full
  width with the other five as a small row above
- A filter sheet opened by a labeled button showing the active count, in place of the stacked form
- The full-screen nav panel described in §2, which currently has no v1 surface to open on
- The hero tuned for short and landscape viewports rather than only capped
- Touch target spacing, thumb reach, and a pass over every hover affordance for tap equivalence
- Testing on real devices, not only on a narrowed desktop window

**Zoom, which v1 does support:** the layout is built to reflow at 200% and 400% and down to 320px,
and it gets one spot check before launch. The full zoom matrix is deferred with the rest of the
testing, per [docs/accessibility.md](docs/accessibility.md) §5. This is the same code path the
mobile work in v2 will build on, so nothing here is thrown away.

## 7. Motion

Motion is part of how this site teaches. It moves more than most content sites do, and every
student gets a way to turn that off.

**Two kinds of motion, two sets of rules.**

- *Response.* A transition that answers something the student just did: a room enlarging, a card
  flipping, an info bar opening, a disclosure expanding, the carousel scrolling. Under 260ms, plays
  once, never loops.
- *Ambient.* Parallax layers and the looping diagrams. Driven by scrolling or by a loop rather than
  by a press. Decorative or explanatory, and always stoppable.

**Rules:**

- **Where motion is used.** Eight places, revised 2026-08-19 (the hero no longer parallaxes, per
  §3.1). Parallax on the section bands, the looping diagram on each explainer, a room box growing
  and shrinking back, the flip card turning, the carousel scrolling, the info bar opening under the
  drawing, the disclosure bar expanding, and the scroll-expanding diagram bands.
- **Loops are allowed, and they come with controls.** Content that moves for more than 5 seconds
  needs a mechanism to pause, stop, or hide it under WCAG 2.2.2, and a loop runs indefinitely by
  definition. Every looping animation therefore carries its own visible "Pause" button, and the
  site-wide toggle below stops all of them at once. A loop with no pause control does not ship.
- **Nothing starts moving on page load.** Parallax responds to scrolling, so the hero is still
  until the student moves. Diagrams start when they are scrolled into view, so a page does not
  begin animating under someone who is reading further up.
- **No auto-advancing carousel.** Looping applies to the diagrams and the decorative layers.
  A carousel that advances on its own takes control of reading pace away from the student, which is
  a different thing from a diagram that repeats in place.
- **Motion never carries information.** Every state a motion communicates is also visible in a
  static frame, through a label, an icon, a border, or `--shadow-raised`. Freeze anything on this
  site at any point and the screen still makes sense. This is what lets the reduced-motion path be
  equal rather than lesser.
- **Duration and easing tokens:** `--motion-fast` 120ms, `--motion-base` 200ms, `--motion-flip`
  260ms, `--motion-room` 240ms, `--motion-loop` 5s, `--motion-ease` `cubic-bezier(0.2, 0, 0, 1)`.
  No response transition exceeds 260ms. A diagram cycle runs 4 to 6 seconds with about a second of
  rest at the finished frame.
- Sustainable Hanover ships their site with global animations turned off. Ours moves, and the
  toggle below is how a student who would rather it did not gets their version of it.

### The reduce motion control

`prefers-reduced-motion` covers students who have already set it at the operating system level. It
does not cover the student on a borrowed laptop, or the one who is fine with motion everywhere else
and not here. So the site carries its own control.

- **Where:** in the footer of every page, and in the header menu panel, labeled "Reduce motion".
  A switch with a visible text label, never an icon alone.
- **Default:** follows the operating system. A student who has already asked for reduced motion
  gets it without touching anything.
- **How it works:** the control is a checkbox, revised 2026-08-19 to be styled as an actual
  sliding toggle switch (a pill-shaped track with a thumb) rather than a default checkbox square,
  since "switch" is the affordance students expect for a single on/off site preference. Still a
  real `<input type="checkbox">` underneath, so it stays a native, keyboard-operable control with
  no ARIA needed to fake the switch role. Within the page, CSS reads it directly through
  `:has()`, so it takes effect with no JavaScript at all. JavaScript only carries the choice to the
  next page, writing `motion` to `localStorage` alongside `situation`, with no identifier attached.
  Without JavaScript the toggle still works on the page the student is on.
- **It can go both ways.** Forcing motion back on is available to a student whose operating system
  setting is on but who wants to watch a diagram move. Reduced is the default in that case, never
  the ceiling.
- **Effect is immediate.** No reload, no page jump, and the scroll position does not move.

**What reduced motion changes,** whether it came from the operating system or from the toggle,
specified per pattern rather than as a blanket rule: parallax layers hold still, looping diagrams
render in their finished frame and offer "Play" for a single run, a room box switches to its
enlarged state without growing, flip cards swap without rotating, disclosure bars open without
sliding, info bars appear without animating, scroll-expanding bands render finished, the sticky bar
stops condensing, and carousel and anchor scrolling become instant (`scroll-behavior: auto`). Every
response transition resolves to 1ms. No component loses a state, a control, or a piece of content.

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

### Graduated depth, everywhere

The three tiers specified for the doll house in §3.2 are the shape of the whole site, not a
special case for the home page.

| Tier | On the house | In the library | On a page |
|---|---|---|---|
| 1 | Hotspot label, a few words | Card title, badges, cost and time | Page title and summary |
| 2 | Info bar, under 40 words | Card summary, one sentence | The steps |
| 3 | The improvement page | The improvement page | "Why this works", opened by choice |

A student should be able to stop after any tier and have something true and useful. This is why
depth goes in disclosure bars rather than in longer paragraphs, and why the summary field is
capped at 140 characters in the content model. A tier that restates the tier above it at greater
length is a tier to delete.

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
- **Sources and last-reviewed.** Every content item ends with a "Sources" block listing
  its sources as links, followed by "Last reviewed 2026-08-18" in muted text. It is a link list
  rather than prose, so it is short. Open by default on detail pages, collapsed to a count on
  cards. This block is a feature, not fine print, because it is the reason a student should believe
  the rest of the page.
- **Short inline, full page for depth, and one source of truth.** Explanatory material appears
  twice: a "Why this works" disclosure bar of two or three sentences on the improvement page, and
  the full explainer at `/learn/:slug`. They are different lengths rather than copies. The rule that
  keeps them from drifting is that the inline version carries no number and no citation of its own.
  Every figure, every range and every source lives on the explainer, with one `lastReviewed` date.
  If the inline version needs a number to make sense, it is too long and belongs on the explainer.
- **Reformatted content credits the page it came from.** Most of this site is Sustainable
  Hanover's material rewritten for renters, per [docs/project-brief.md](docs/project-brief.md) §4.
  Where a page adapts one of theirs, the sources block leads with "Adapted from Sustainable
  Hanover: Weatherize" and links to it. Where we send the student to them as the source of truth,
  for programs and rebates, the link is in the body of the page and not only in the sources block.
- **Enablers.** The four enabler topics are labeled "Start here" rather than given an impact
  rating, in the library and on their hotspots, so a student is never told that reading their bill
  saves nothing.

## 9. Voice in the interface

Microcopy follows [docs/content-strategy.md](docs/content-strategy.md) §2. Lead with the action.
Money and comfort before climate. Plain declarative sentences, around grade 8. Second person.
Commas and periods in place of em dashes when appropriate. No emoji and no warning symbols, write "Safety:" instead.
"Typically saves" rather than "will save". Buttons and hotspots name what happens next, so no
"Submit" and no "Click here". Revised 2026-08-19: the info bar's link to the full improvement page
is now a deliberate exception to the general "no 'Learn more'" instinct, specifically because the
info bar already names the specific thing ("Seal your windows with film") right above the button,
so "Learn more" reads as "more about the thing just named" rather than as an unlabeled catch-all.

| Situation | Copy |
|---|---|
| Hero tagline | "Welcome to your Home*" |
| Hero note | "*Rental home" |
| Hero description | "Learn how to improve energy efficiency in your rental to save money and the environment." |
| Scroll cue | "Take a look inside" |
| Home, above the drawing | "Click a room to open it. Click each highlighted spot to see what you can do about it." |
| Room prompt | "The living room" |
| Room, enlarged | "The living room" |
| Guided start | "Start here" on the bill hotspot |
| Next spot control | "Next spot: the thermostat" |
| Last spot | "That is all ten spots. View everything in one list." |
| Back control | "Back to the house" |
| Hotspot accessible name | "Living room window: Sealing gaps here improves energy efficiency significantly" |
| Hotspot, does not apply | "Your landlord pays for heat, so this one saves them money and not you." |
| Progress bar | "You have viewed 3 of 10 spots." |
| Visited hotspot | Shown at reduced opacity (revised 2026-08-19, no flag icon), and "Viewed" added to the accessible name |
| Looping diagram controls | "Pause" · "Play" |
| Reduce motion toggle | "Reduce motion" |
| Personalize button (revised 2026-08-19, replaces the header situation chip) | "Personalize your recommendations" |
| Info bar link to the full page (revised 2026-08-19) | "Learn more" |
| Flip card front | "True or false: turning the heat down while you are out costs more than leaving it steady." |
| Flip card back opener | "False. Reheating a cold room costs less than holding it warm all day." |
| Disclosure bar labels | "Why this works" · "What if my landlord says no" · "Sources" |
| Carousel control | "Next: November" |
| Empty result set | "Nothing matches all of those filters. Clear the lease-length filter to see 6 more." Always names a filter to drop, and offers a one-tap way to drop it |
| Form validation error | "Choose one of the options, or pick 'I am not sure' to view all improvements." |
| Safety warning lead-in | "Safety" |
| Landlord permission, ask | "Ask your landlord first. Sending it in writing protects you both." |
| Savings figure | "Typically saves 5 to 15% in energy costs for a unit with single-pane windows." |
| Checklist print (v2) | "Print this, or copy it as text to send to your roommates." |
| Out-of-state program | "This is a Vermont program. Hanover renters cannot enroll. The New Hampshire equivalent is NHSaves." |

## 10. Attribution and branding

The site is made in partnership with Sustainable Hanover. It launches as an external site and may be folded into
sustainablehanovernh.org later, per [docs/project-brief.md](docs/project-brief.md) §4, so the
credit has to survive that move.

- **Header:** Revised 2026-08-19 — the site's own name changed from "Rental Energy Hanover" to
  "Energy for Student Renters," which describes the audience rather than repeating the town name
  the partner credit line already carries. The header logo is now a lockup: the house icon from
  the shared icon set (§4), next to the wordmark in `--font-display` and the "In partnership with
  Sustainable Hanover" line stacked under it, both inside one link to `/`. The same house icon is
  the browser tab favicon. Revised again 2026-08-19: the icon's height matches the full height of
  the two-line text stack next to it (`align-self: stretch` on the icon inside the lockup's flex
  row, rather than a fixed pixel size), and the icon and both lines of text are a single color,
  `--color-accent` — a one-color lockup rather than an icon in the brand color next to text in the
  body colors.
- **Footer, every page:** "Project created in partnership with Sustainable Hanover, a committee of the Town of Hanover, New
  Hampshire", their logo at a fixed height, a link to their site, and the contact address
  sustainablehanovernh@gmail.com. Also the site-wide last-reviewed date and a link to the
  accessibility statement.
- **About page:** Full credit to the SIP project team from
  [docs/project-brief.md](docs/project-brief.md) §8 and the partnership description.
- **Logo asset:** Using wordmark from the current Sustainable Hanover website.
- **What we do not do:** We do not present the site as an official Town of Hanover page, we do not
  use the Town seal, and we do not publish anything under their name without review. Per
  [AGENTS.md](AGENTS.md), anything appearing under Sustainable Hanover branding goes to a human
  first.

## 11. Open design questions

| Question | Options | Decision | Date |
|---|---|---|---|
| Who draws the doll house and the 22 icons, and by when? This is the critical path into the 2026-08-19 build week | One person owns illustration / split by room / ship empty labeled room boxes first and add the contents as they are drawn | | |
| The hero mat is a flat tan with a black border, deliberately undecorated for now. Does it stay this plain, or get a woven coir texture (CSS repeating-gradient crosshatch, no image asset) later? | Keep it flat, as specified 2026-08-19 / add a woven texture pass once the flat version has been reviewed | Flat for now | 2026-08-19 |
| The doll house is an example residence, and nothing on the page says so. Do students read it as a generic teaching house, or do they expect it to match their own unit? | Leave it implicit, as specified, and watch for the misread in usability round 2 / add a line under the drawing if it confuses anyone / draw a second, apartment-shaped arrangement | Implicit, carried by context and the simplified illustration | 2026-08-19 |
| Is the guided order advisory or does anything enforce it? | Advisory, as specified. Nothing locks / gate tier 3 until tier 2 is seen | Advisory | 2026-08-18 |
| Ten hotspots in v1, or fewer done better? | 10 as listed in §3.2 / 6 covering only the Must topics | | |
| Does a hotspot that does not apply to the student's situation dim, disappear, or stay with a reason? | Dim with a text reason, as specified / hide / no change | Dim with a reason, pending usability testing | 2026-08-18 |
| Mobile layouts are deferred to v2, and [docs/audience.md](docs/audience.md) §8, context of use, is still unwritten. If interviews show students reach this at 11pm on a phone, does the v2 date need to move ahead of everything else in the backlog? | Hold the deferral and revisit after Round 1 interviews / pull basic mobile layouts into v1 and cut a feature to pay for it | Deferred, pending §8 of audience.md | 2026-08-19 |
| When the doll house does get a phone design in v2, does it become a two-column grid of room boxes or stay the room list? | Two-column grid / room list below 400px / test both | | |
| Is `animation-timeline: scroll()` support wide enough in August 2026 for the scroll-expanding bands, given no build step and no polyfill? | Ship behind `@supports`, as specified / drop the pattern / static diagrams only | Behind `@supports` | 2026-08-18 |
| Do the myth flip cards touch safety-critical content, for example space heaters? If so they need the §4 sign-off in content-strategy | Route all flip-card copy through content review / keep safety topics out of flip cards | | |
| Does Sustainable Hanover have a written brand guide, or is the live stylesheet the only source? | Ask Yolanda / treat published values as canonical | | |
| Poppins now sets display and body, since acumin-pro needs an Adobe Fonts request that AGENTS.md rule 6 bars. Does the partner accept the substitution, and does Poppins 400 hold up for step instructions at 16px? | Poppins throughout, self-hosted, as specified / Poppins display with a system-stack body / request approval for Adobe Fonts | Poppins throughout, at 400 body and 600 display | 2026-08-19 |
| Can we get their logo as SVG or another vector format? | Vector from Yolanda / text wordmark only in v1 | | |
| Do we adopt their bright green `#7EDA5D` as a decorative fill, given it fails text contrast at 1.74:1? | Decorative only, as specified / drop it and use only the deep green | Decorative only, pending confirmation | 2026-08-18 |
| How does the checklist leave the browser, when it arrives in v2? | Print stylesheet / copy as plain text / both | Both. Cut from v1 on 2026-08-19, see [docs/features.md](docs/features.md) §3 | 2026-08-19 |
| Does the situation persist between visits, given the no-personal-data rule? | `localStorage` under one key, no identifiers, per architecture.md D10 | Yes, one key, no identifiers | 2026-08-18 |
| Does the hero cost more than it earns? It puts one screen between a cold student and the house | 85svh with a visible arrow and the next section peeking, as specified / shorter hero / hero only on first visit | 85svh with the arrow | 2026-08-19 |
| Is `:has()` support wide enough in August 2026 to drive the reduce motion toggle with no JavaScript? | CSS `:has()` with JavaScript only for persistence, as specified / JavaScript for the whole toggle | CSS first, JavaScript persists | 2026-08-19 |
| Do the looping diagrams distract from the text beside them, even with a pause control? | Watch in usability round 2 / loop only while in view / pause by default and play on press | Loop while in view, pause control always visible | 2026-08-19 |
| Does parallax survive the accessibility pass, given it is scroll-linked movement? | Capped at 20% travel, decoration only, off below 600px, stoppable, as specified / drop it | Keep, under the §5.1 limits | 2026-08-19 |
| Dark mode | Not in v1, as specified / v1 | Not in v1 | 2026-08-18 |
