# Design

> **Status:** ● Complete · **Last updated:** 2026-08-20 · **Owner:** Megan

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
├── /learn                       Deleted 2026-08-20 (§3.4) — no hub page any more. Its two
│                                 explainers below keep their URLs, now surfaced from
│                                 /improvements' "Renter basics" instead of a /learn index
│   ├── /learn/read-your-bill    Enabler. kWh, rate, what is actually driving the bill
│   ├── /learn/find-your-drafts  Enabler. Guided walkthrough of where heat escapes
│   ├── /learn/heating-systems   Enabler. What kind of heat you have and what it means for
│   │                             you as a renter. Added 2026-08-21, §3.5
│   ├── /learn/who-pays-for-what Enabler. Finding it in the lease. Not yet built
│   └── /learn/:slug             Remaining explainers, not yet built
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
it instead of repeating it. See [docs/content-strategy.md](docs/content-strategy.md) §8. Revised
2026-08-20: each of those improvement pages now also carries a one-sentence "Where to get it" line
inside its own "What you need" section (retailers, plus the fare-free Advance Transit route to
West Lebanon), rather than a separate trailing paragraph lower on the page — sourcing information
belongs with the materials list a student is already reading, not after the steps. This is a short
inline pointer, not a duplicate of the shared page: `/where-to-get-it` remains the fuller reference
once it is built, per §8 of content-strategy.md.

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
  own top-bar slot; its two explainers are reached from `/improvements` instead, in the "Rental
  basics" section (§3.4, renamed from "Learn" 2026-08-20), alongside `/before-you-sign`,
  `/where-to-get-it` and `/glossary`, which were already reached from context rather than the top
  bar. `/checklist` joins them in v2. Fixed 2026-08-20: "Home" linked to `/#house`, jumping straight
  past the hero to the doll house on every visit, including a student who followed "Home" wanting
  the top of the page they are already partway down. It now links to `/`, plain.
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
| Improvement detail `/improvements/:slug` | Get this done today | Follow the steps | Revised 2026-08-20: the page runs the full page-shell width rather than being capped at the 40rem content measure top to bottom. Title, summary, badges and facts sit in two columns above 900px, a custom SVG illustration of the improvement beside them (below 900px the illustration drops below the heading block and above "What you need"). A safety note, where the item has one, is pulled out of that two-column block into its own full-width band directly beneath it — safety does not share space with the illustration, revised again 2026-08-20 after the first pass put it in the text column. What you need, steps, where to get it (folded into "what you need" rather than a trailing paragraph), why this works and savings (now full-width story bars, §5.1), sources. Visible prose under 200 words still applies to the steps and what-you-need column, which keeps the 40rem measure |
| Explainer `/learn/:slug` | Correct one wrong idea, fast | Flip the cards, then go do the improvement | Built as flip cards and an animated diagram rather than paragraphs. Every explainer carries one diagram that shows the mechanism, for example where heat leaves a room. See §5.1 |
| Checklist `/checklist` | Take a list away and act on it over a week | Print, or copy as text to send to roommates | **v2**, cut from v1 per [docs/features.md](docs/features.md) §3. State is local to the browser. Nothing is submitted anywhere |
| Rights `/your-rights` | Find out whether 58°F is legal and who to call | Reach a real help resource | Legal disclaimer at the top, never collapsed. No advice on a specific dispute |
| Programs `/programs` | Find out whether a renter can use this | Go to the program's own page | Any program with `state` other than NH is labeled as another state's program or is not rendered |
| Before you sign `/before-you-sign` | Know what to look at during a ten-minute viewing | Take the list to the viewing | Built 2026-08-21. A viewing checklist plus the two questions to ask about heat and who pays. No legal content: it links to `/your-rights` for that |
| Where to get it `/where-to-get-it` | Find the materials without a car | Pick a route | Built 2026-08-21. The shared sourcing page §2 promised: online delivery, and the fare-free Advance Transit route to the West Lebanon stores. Hanover's own hardware store closed in 2023 and the page says so |
| Glossary `/glossary` | Look up one term and get back to what you were reading | Follow the link back | Built 2026-08-21 from [docs/glossary.md](docs/glossary.md). Every term is a `<dt>`/`<dd>` pair with a stable `#anchor`, because pages deep-link into it mid-sentence |
| About `/about` | Know who made this and whether to trust it | Read the credit, or contact them | Built 2026-08-21. Team credit, the Sustainable Hanover partnership, how the content is sourced and reviewed, and the standing disclaimers in full |
| Accessibility `/accessibility` | Find out whether this site will work for them, and say so if it does not | Report a barrier | Built 2026-08-21. States what v1 commits to and, plainly, what is still unverified per [docs/accessibility.md](docs/accessibility.md) §5. A statement that overclaims is worse than none |

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
the first pass sized "Welcome" wide enough to overflow the mat at some widths, so its clamp
ceiling was pulled back — too far back, leaving empty space inside the border once the mat grew
to its landscape `4:3` shape (below). Revised a third time 2026-08-19: both lines sized back up so
the heading fills the width the border actually has at the mat's new, larger dimensions, without
reopening the original overflow. Revised a fourth time 2026-08-20, sized up again so the lettering
fills the majority of the bordered field rather than leaving it mostly plain tan: both lines now
use a two-point `clamp()` fit to the border's actual content width at two measured anchors — the
320px zoom/reflow floor DESIGN.md §6 commits to, and 753px, the viewport width where the mat's own
`min(85vw, 40rem)` cap stops growing. The clamp's outer ceiling is reached right around that same
753px point, so the text stops scaling with `vw` exactly when the bordered field it sits in stops
growing too, which is what the third pass's overflow was actually caused by (text kept scaling
past the point the mat's width had already capped). Checked with no overflow at 320, 360, 400, 480,
600, 753, 900, 1280 and 1920px.

**Layout, revised 2026-08-19: what "the mat" actually is.** Only the text and its border are the
mat — earlier language that called the whole hero band the mat was imprecise. From the outside in:

1. The hero section itself: `min-height: 85svh` rather than `100vh`, so the top of the doll house
   shows at the bottom edge and the page reads as continuing. Never a fixed pixel height.
   Background color has moved twice: `--color-bg` (white) at first, then light green
   (`--color-surface-brand`), now a bluestone grey (`--color-hero-ground`, new token, added
   2026-08-19) — a cool, muted stone tone behind the mat, the way an entryway paver reads behind
   an actual doormat. Not tan — the tan is the mat's alone. Revised 2026-08-20, twice: the ground
   plane first got a regular grid of hairline joints (two layered `linear-gradient`s), corrected
   the same day to an irregular "crazy paving" joint pattern — a real bluestone patio is cut in
   asymmetric slabs, not a brick grid — built as an inline SVG background (still no image asset, a
   vector pattern rather than a gradient one), scaled up so the tiles read proportionate to the mat
   sitting on them rather than as a fine texture underneath it. Kept subtle (16% opacity).
   Revised 2026-08-21 to **random ashlar**, which is what a cut-bluestone patio actually is: whole
   rectangular slabs of several different sizes, squares among them, set so the joints break rather
   than running through. The two earlier passes both drew joint lines by hand, which is why both
   had joints that stopped short of a stone's edge — a hand-placed line has no way of knowing where
   the stone it borders ends. The pattern is now generated from a **dissection** instead: the 320px
   tile is an 8×8 grid of 40px units, every unit belongs to exactly one slab, and slabs run from
   1×1 (a 40px square) up to 3×2. The joints are then derived rather than drawn — every edge
   between two units that belong to *different* slabs becomes a line, and every edge inside one
   slab does not. A missing joint is not possible by construction, because a joint is defined as
   the boundary between two stones rather than as a line someone placed. Seamlessness works the
   same way: the grid wraps (unit 7 is adjacent to unit 0 in both axes), so slabs cross the tile
   edge and there is no full-width or full-height line marking the 320px repeat. Generated once by
   `tools/ashlar.mjs` and pasted into `components.css` as a static data URI, so the published site
   still ships a plain CSS background and no build step (AGENTS.md rule 8) — the tool exists to
   regenerate the pattern by hand, not to run at deploy.
2. The mat rectangle: a `--color-mat` (tan) box, centered in the hero. Revised 2026-08-19: sized
   larger overall (a real doormat is a substantial object on the page, not a small card), on a
   fixed `aspect-ratio` so its proportions are exact and reproducible rather than an incidental
   result of a width and a min-height. Revised again 2026-08-19, twice: the first pass ran
   portrait (taller than wide, 4:5) on the reasoning that "taller" meant more height than the
   original flat banner; corrected to landscape `4:3`, actual door-mat proportions (wider than
   tall). The width cap also grows from `min(90vw, 32rem)` to `min(85vw, 40rem)` — the earlier cap
   read as small on a wide window, and the hero should use more of the available width. Revised
   2026-08-20, twice: first added a woven coir/coconut crosshatch texture (§11) and a drop shadow
   (`--shadow-mat`, tokens.css); the crosshatch was reverted the same day — at the mat's actual
   rendered size it read as visual noise rather than fiber — leaving the flat tan fill, while
   `--shadow-mat` stays, so the mat still reads as an object resting on the ground plane rather
   than a flat color field.
   **The shoes,** added 2026-08-20, redrawn the same day. First pass was a side-profile
   silhouette pair in `--color-brand` (the decorative-only bright green); redrawn as a bird's-eye
   pair instead — the view actually available looking down at a doormat — in `--color-accent`
   (the site's primary green, moved off the lighter decorative one on request) with a black
   outline and white crossed-lace detail over black eyelets, the small palette a real sneaker's
   sole/upper/lace contrast actually has. The two `<svg>` shoes sit in one shared flex row inside
   a single rotated container (`.hero__shoes`), so the pair is strictly parallel to itself — zero
   rotation between the two shoes — while the row as a whole tilts slightly against the mat, the
   way a kicked-off pair actually lands rather than squaring up to the border. Sized up from the
   first pass (and the first redraw, which came out badly oversized — a 60:150 top-down viewBox is
   2.5:1 tall, and sizing the container by width alone without rechecking the resulting height sent
   the pair towering up over the mat's own text before the sizing was corrected) so the pair now
   reads as proportionate to the mat rather than a small accent in its corner. Decorative and
   `aria-hidden` throughout — nothing here is informational, so nothing needs an accessible name.

   **Shape, revised 2026-08-21, twice.** The first pass reshaped the outline from memory into a
   waisted foot silhouette — wide ball, pinched arch, heel bulge — and shortened the toe cap. The
   second pass redrew it against the reference sneaker the request actually pointed at, which was
   worth doing because the icon differs from the guess in three ways that matter:

   - **The outline is a smooth capsule,** not a waisted foot. Roughly 2.3:1 long to wide, blunt at
     both ends, with only a gentle taper toward the heel. The waist made it read as a slipper.
   - **The toe cap is inset on every side,** a separate panel with the upper's color visible all
     the way around it, rather than a band spanning the full width of the toe. This is most of what
     "slightly smaller" turned out to mean. Its inner edge, the one facing the laces, is close to
     straight — the request asked for that directly, and it is kept flat here even though the icon
     curves that edge down toward the tongue, because the instruction is the more specific source.
   - **The lacing is a ladder,** two rails with three rungs across them and the ends trailing off
     past the heel. It was crossed laces over eyelet dots. This is the single most recognizable
     thing about the reference and the first pass missed it entirely.

   The collar opening at the heel is gone with it. It was drawn as a dark ellipse, read as a blob at
   mat size, and the reference does not draw one — the trailing lace ends occupy that space instead.

   **The walk, added 2026-08-21.** Scrolling down out of the hero walks the pair across the mat.
   The container carries the forward travel and each shoe carries its own step — lift, swing, set
   down — with the two shoes half a stride out of phase, so it reads as a gait rather than as two
   shoes sliding sideways together. It is a scroll-progress animation, not a timed one: the
   position in the walk *is* the scroll position, so scrolling back up walks them back, and
   stopping stops them. Gated exactly like the story-bar drift in §7 — behind an `@supports` check
   for `animation-timeline`, off under `prefers-reduced-motion`, off with the reduce-motion switch,
   and off below 600px with the rest of the site's scroll motion. With any of those in force the
   shoes simply sit where they started, which is the state the hero has always shipped.
3. The black border: a `--color-mat-border` rule, inset from the tan rectangle's edges by a fixed
   margin on all four sides (`inset:`, not padding) so a strip of tan shows *outside* the border
   all the way around and the border keeps close to the tan rectangle's own aspect ratio rather
   than drifting toward square as the mat grows. This border, not the tan field, is what directly
   frames the heading.
4. Inside the border: the `<h1>` and, anchored to its bottom-right corner, the `*Rental home` note
   — mimicking where a mat's fine print actually sits.

The description sentence and the scroll arrow sit centered below the mat rectangle, outside it
entirely, on the hero's own bluestone ground plane.

**The scroll arrow.** A real anchor, `<a href="#house">`, carrying the arrow icon and a visible
text label reading "Take a look inside". It is 44×44px at minimum, sits in the tab order directly
after the heading, and works with JavaScript off. With JavaScript on it scrolls smoothly, and it
jumps instantly when motion is reduced. An arrow with no label is not a control anyone can read.

**What it must not do.** It must not become the reason a student never finds the house. The 85svh
cap, the arrow, and the peeking top edge of the next section are all there for that.

### 3.2 The doll house

The centerpiece. Everything else on the site can be reached from it.

**How to play is a callout, not a paragraph, added 2026-08-19.** "Click a room to open it. Click
each highlighted spot to see what you can do about it." moved off the page by default and into a
hover/focus callout, opened from a help icon (a question mark in a circle) sitting next to the
"Tour a rental and its potential upgrades" heading. Same `.term`/tooltip pattern already used for
the situation form's glossary terms (§3.3), reused rather than inventing a second tooltip
component. The icon is a real, labeled, focusable control ("Show instructions" as its accessible
name) so the callout opens on keyboard focus as well as mouse hover, and its text is present in
the DOM either way — this is instructions for a novel interaction, not load-bearing content, so
hiding it by default is a legibility win as long as finding it stays a single, obvious step next
to the heading it explains.

**Fixed 2026-08-20: the open tooltip was rendering behind the roof.** The tooltip carries its own
`z-index`, but the roof it was losing to (`.dollhouse__roof`) is drawn with `clip-path`, which
establishes a stacking context of its own the moment it's set — confirmed empirically (stripping
the roof's `clip-path` made the tooltip render correctly on top, at any `z-index` value), not just
a paper stacking-order read. The fix gives `.section-heading-row`, the tooltip's own ancestor, an
explicit stacking context (`position: relative; z-index: 5`) so the comparison resolves there,
above the drawing, instead of being decided by how the grid's `clip-path` descendants happen to
stack at the document root.

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

**"Start here" moves when personalization takes it away, added 2026-08-21.** The badge lives in
the markup on the bill hotspot, which was fine while the house always showed everything. Since
personalization began hiding hotspots (below), a student whose situation rules the bill out lost
the badge entirely and got back exactly the undifferentiated house the badge exists to prevent.
The badge is now placed rather than fixed: it stays on the bill hotspot whenever that hotspot is
showing, and moves to the lowest-numbered spot in the guided order that is both showing and
unvisited whenever it is not. Only one hotspot ever carries it, and if every showing spot has
already been visited it goes away, same as before — there is no "start" left to point at. Nothing
about this reaches the no-JavaScript path, which never filters and so never loses the badge.

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

**"Everything in this house" is a disclosure, revised 2026-08-21.** The list used to sit open
below the drawing at every width, which put a twelve-item link list directly under a section whose
whole point is that you explore it by clicking the drawing. It is now the site's standard
disclosure bar (§5) — the same closed-by-default `<details>` the improvement pages use for depth —
labelled "Everything in this house" and closed on load. `<details>` is what makes this safe to do:
the summary is a real, keyboard-operable control that is always in the tab order and always
announced, so the list stays *reachable* at every width even while it is not *shown*, which is what
the no-JavaScript and zoom paths above actually need. It is still never `display: none`, and it is
still the only route in below 600px, one press away rather than zero.

**Personalization now actually filters the house, added 2026-08-20.** "Personalize your
recommendations" (§3.3) previously only ever reached the situation form itself — the stored
answer changed nothing about what the house showed. It now hides whichever hotspots the stored
heat type and who-pays answer rule out, reading `content/improvements.json` and running the same
`matchesFilters` logic the library (§3.4) filters with, so the two stay consistent with each
other rather than developing their own separate rules. This is the reversal recorded in §11:
earlier v1 planning called for dimming a non-applicable hotspot with a text reason rather than
hiding it, and usability judgment moved to hiding once it was actually built — "only show the
relevant recommendations," full stop, reads clearer on a drawing already carrying ten hotspots
than a dimmed one a student has to read the reason for to rule out. `hidden` rather than a class
and `opacity`, so it leaves the accessibility tree as well as the visible drawing. The "Everything
in this house" list is filtered the same way, entry for entry, and a room whose hotspots are all
hidden by the current situation shows "Nothing here for your situation." in place of them —
worded differently from "Nothing to check in this room yet." (`.room--empty`), which means the
room has no content built for it at all, a different fact. The progress pill's own count
recalculates to the number of currently-visible spots, so "you have viewed 3 of 10" becomes "3 of
4" rather than staying pinned to a denominator the student cannot fully reach. None of this needs
a page reload: the personalize dialog (§3.3) saves and closes in place, so it fires a
`situationchange` event the house listens for and re-filters against immediately. With JavaScript
off, there is no way to set a situation in the first place, so every hotspot and every list entry
simply stays visible — the same fail-open behavior the rest of this file already leans on (a
missing content-index fetch falls back to the hotspot's own plain link, for instance).

**A way back, added 2026-08-20.** Every page a hotspot links to — the eight improvement pages and
the two explainers — now carries a plain "Back to the house" link next to its breadcrumb,
`../../index.html#house`. It is wayfinding, not page content, so it sits outside the article
rather than inside it, and it is unconditional: it does not try to detect whether the student
actually arrived from the house before showing itself, which would need a referrer check this
site's no-build-step, script-optional posture does not want to depend on. A student who arrived
some other way gets a harmless, always-correct way to the house rather than a link that
sometimes fails to appear.

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

**The fill is capped at 100%, fixed 2026-08-20.** `TOTAL` (the denominator) can shrink after
personalization (§3.2's own "Personalization now actually filters the house") narrows which spots
currently apply, and a spot visited before that narrowing stays counted as visited — so
`visited.size` can end up larger than the new `TOTAL` (6 of 3, say). The percentage that drives
the fill's width is clamped at 100 for exactly that case: the bar answers "how much of what's
relevant right now have you seen," which tops out at fully relevant, not at some width past the
end of the track. The spelled-out count ("You have viewed 6 of 3 spots") is left honest rather
than also clamped — the bar's width and its text are allowed to say different things, since the
text is precise, and the bar is closer to a `min-width: 0` progress indicator than a fraction.

**Reset, added 2026-08-20.** A round icon button (the same `icon-replay` glyph the animated
diagram's replay control uses, §5.1) sits to the right of the pill, inside a shared sticky row
(`.progress-row`) — the pill itself is no longer the sticky element, the row is, so the button
travels with the bar instead of being left behind when the page scrolls. Clicking it clears
`visitedSpots` (`sessionStorage`), removes every hotspot's visited state and "Viewed" accessible-
name prefix, drops any "Next" badge left on the drawing, and restores the "Start here" badge on
the bill hotspot — the one badge `refreshVisitedStyling` deletes outright rather than just hiding
once visited, so reset recreates it from scratch rather than un-hiding something already there.
Closes an open info bar too, if one is open, since it could be showing a spot reset just put back
into its unvisited state.

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

### 3.4 The improvements library (revised 2026-08-20)

`/improvements` carried a second, on-page filter form (heat type, who pays, landlord permission)
from v1's first pass, duplicating the one four-question form §3.3 already commits to being the
site's only situation form. It is removed. Filtering is now driven entirely by the same stored
situation the FAB and the doll house (§3.2) read, through the same `matchesFilters` function —
one filtering rule, everywhere it applies, rather than three components that could each drift.
Landlord permission is no longer a filter dimension here at all, since the situation form never
collected a permission preference to filter by.

**What the page opens with.** No description paragraph above the grid — "Every improvement on
the site, filterable by..." was explaining a mechanism (the removed form) rather than telling a
student something they needed, and DESIGN.md's own content rules (§8) already treat an
over-explaining sentence like that as a page's word budget spent on nothing. A `library-toolbar`
row above the grid instead holds two things: the result count (`aria-live`, unchanged in spirit
from the original "Showing X of Y" behavior, now actually reachable — it never had a live source
to react to before this revision, since the on-page form and the stored situation were two
different things) and a sort control.

**Sort control, added 2026-08-20.** A plain `<select>`, four options: Recommended (impact, then
cost — the existing default order), Lowest cost, Shortest time, Highest impact. `assets/js/
filter-logic.mjs` exports these as `SORTERS`, alongside the `compareItems` function it already
exported (kept under both names, so nothing that already imported `compareItems` needed to
change). A native select rather than a custom control: keyboard and screen-reader behavior come
free, and a sort-order choice does not need the visual weight a custom widget would carry.

**Cards now carry the full spec, not one permission pill.** Revised 2026-08-20: each card's badge
row and fact row are now identical in shape to what the doll house's info bar (§3.2) shows for
the same item — both permission and reversibility badges, and the cost, time and impact facts —
rather than a single "No permission needed"-style pill standing in for all of it. A student
scanning the library now gets the same tier-2 depth the house already gives, not a shallower
version of it just because they arrived by the direct route instead of the guided one. Each
card's title also carries the same object icon its doll house hotspot uses (`icon-window`,
`icon-thermostat`, and so on) immediately to its left, decorative and `aria-hidden`, so a card and
its hotspot read as the same thing encountered by two different routes, per §2's "both reach the
same content items" rule.

**The page title, revised 2026-08-21.** "Improvements" now sits centered at the top of the page
at display size (`--text-display`, §4) rather than left-aligned inside the 40rem content column at
normal h1 size. The page has no lede sentence under it (see "What the page opens with" above), so
a normal-size h1 in a narrow left column read as a label someone forgot to finish rather than as
the start of a page. This is the shared `.page-head` block (§5), and every page built after this
one uses it, so a page title looks the same everywhere on the site.

**"Renter basics," moved to the top, added 2026-08-20, renamed 2026-08-21.** The two explainer topics
(`read-your-bill`, `find-your-drafts`) previously sat in a "Learn" section below the main grid,
titled "Learn" with a "Short explainers that correct one wrong idea at a time" subhead and a
per-card "Start here" / "Enabler" tag. Renamed and moved above the main grid in its
own `theme-brand` tinted band so it reads as a distinct, secondary entry point rather than
competing with the improvement cards for attention, and the section-level label and per-card tags
are dropped — the heading already says what the section is without a subhead restating it, and the
"Renter basics" badge (already used for these items in the doll house info bar, §3.2) now does the
job "Start here" and "Enabler" were each doing differently per card.

Two follow-ups, 2026-08-21. **The name is "Renter basics" everywhere.** The section shipped as
"Rental basics" while the badge on the same items read "Renter basics," so the site had two names
for one thing. "Renter" is the right half of the pair: these pages are about being a renter, not
about the rental. **The badge comes off the cards in this section.** A "Renter basics" pill on a
card sitting directly under a "Renter basics" heading states the same fact twice. The badge stays
everywhere the item appears outside this section — the doll house info bar, and any future list
that mixes explainers in with improvements — which is where it is actually doing work.
Built as `.carousel--peek`: each slide scroll-snaps to center with the track padded so a
neighboring slide stays partly visible — "focused on one, the others visible in the background,"
scrollable with no JavaScript needed for the scrolling itself, same mechanism as the `.carousel`
component §5.1 already specifies. Prev/next controls and a "1 of 2" counter are deferred: with
only two slides, both already show at least partially via the peek at once, so a separate control
would be redundant until the section holds enough items that it stops being true.

**The `/learn` hub page is deleted, added 2026-08-20.** Its own nav slot was already removed
2026-08-19 (§2); the page itself sat unlinked from anywhere on the site until this revision
surfaced its two explainers through "Renter basics" instead. `/learn/read-your-bill/` and
`/learn/find-your-drafts/` are not deleted — only the index that listed them — so their URLs are
unchanged, and their breadcrumbs, which read "Learn / Read your bill" against the now-gone hub,
now read "Improvements / Read your bill" against the section that actually surfaces them.

**A latent bug this surfaced, fixed 2026-08-20, not specific to the library.** Setting an
element's `hidden` attribute did nothing on this site for any element whose own component rule
sets `display` — `.card`, `.hotspot`, and others — because that rule and the browser's built-in
`[hidden] { display: none }` rule have equal specificity, and an author style beats a
user-agent style on a tie regardless of which one seems more specific to a reader. `.info-bar`
had already accumulated its own one-off `.info-bar[hidden] { display: none }` fix for exactly
this; the doll house's new personalization filtering (§3.2) hit the same failure on `.hotspot`,
which is what surfaced it. Fixed once, generally: `base.css` now carries a `[hidden] { display:
none !important; }` reset, and the one-off `.info-bar` rule is removed as redundant. The
`!important` is deliberate here — it enforces what the `hidden` attribute already promises
semantically, for every element on the site, rather than patching each component rule that sets
`display` one at a time as each one happens to get caught by it.

### 3.5 The heating systems explainer, added 2026-08-21

`/learn/heating-systems`. The third Renter basics page, and the one the other two point at when a
student asks the question underneath most of their questions: *what kind of heat do I even have?*

**Why it exists.** The situation form (§3.3) opens by asking a student to pick their heat type, and
personalization across the whole site keys off that answer. Until now the site asked the question
without ever teaching it. A student who cannot answer it picks "I am not sure", which widens results
rather than narrowing them, so the one input that makes the site personal was the one input the site
gave no help with. This page is what the form's glossary tooltips shorten to.

**What it covers, in this order.** What is in the room and what it means: radiator or baseboard,
electric baseboard, forced air, heat pump, and the window unit that is not heat at all. Then how to
tell them apart by looking, since that is the actual task. Then what each one means for a renter
specifically — what you can change yourself, what runs on which fuel, and which of them is the one
where "who pays" changes the answer.

**The animated diagram** is the page's centerpiece, per §5.1's "an explainer is not a page of
paragraphs". It is adapted from the heat pump work the same project team built at
`meganklu.github.io/heat-pumps-hanover`, which already had a worked cutaway of a heat pump moving
heat, a furnace burning fuel and venting exhaust, and a window AC unit. Adapted, not copied: the
original is a four-page site of its own with a different palette, a Google-hosted font, and a
season toggle driving the whole page's color. Here it is one diagram in this site's tokens, this
site's icon pen (§4), and this site's motion plumbing (`.motion-loop`, `--motion-state`), so the
Pause button and the reduce-motion switch reach it like every other loop on the site. The season
toggle survives, scoped to the diagram rather than the page: it is what shows that a heat pump is
the one system in the set that runs both directions, which is the single fact hardest to get
across in prose.

**What it does not do.** It does not tell a student to get a heat pump. A renter cannot install
one, and a page that spends its length on equipment the reader cannot buy is the homeowner advice
this project exists to not be ([docs/project-brief.md](docs/project-brief.md)). Heat pumps are here
because some Hanover rentals already have them and a student needs to recognize one, and because
the "ask your landlord" path in `/programs` is where that conversation actually belongs.

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
| `--color-surface-brand` | `#C2E76B` | Full-width highlight bands, mirroring their tinted sections. Also the "Renter basics" badge fill (2026-08-21) | ☑ 11.9:1 with text |
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
| `--color-hero-ground` | `#94A0A7` | Added 2026-08-19. The hero section's own background, behind the mat. A bluestone grey, used nowhere else | ☑ 6.3:1 with `--color-text`, 7.9:1 with `--color-mat-border` |

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
| Display (`--text-display`) | 2.25rem | 4.25rem |
| h1 | 2rem | 2.75rem |
| h2 | 1.5rem | 2rem |
| h3 | 1.25rem | 1.5rem |
| h4 | 1.125rem | 1.25rem |
| Body | 1rem | 1.0625rem |
| Small (metadata, badges) | 0.9375rem | 0.9375rem |

Sustainable Hanover sets h1 at 4rem. That works on a page with one heading and a photograph. Our
pages carry six to ten headings each, so the scale is compressed.

**The display size, tokenized 2026-08-21.** One step above h1, and deliberately outside the
compressed scale above: it is for a heading that is alone on its band with nothing competing for
attention, which on this site means exactly two things — a story bar's heading (§5.1) and a page
title in `.page-head` (§5). It shipped 2026-08-20 as a `clamp()` written inline in the story-bar
rule; making it a token is what let the page titles reuse it rather than a second, slightly
different clamp being written next to the first. Anything that is not one of those two cases uses
h1 and below.

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
  is visible without relying on the flip animation to communicate it. A third, `--shadow-mat`
  (added 2026-08-20), is heavier again and scoped to the hero mat alone — see §3.1.

**Badges, revised 2026-08-20.** Every `.badge` variant (the three permission states, reversible,
and the "Renter basics" neutral variant) now carries the same 1px border in its own text color, on
top of its own tinted background. Previously only the reversible and basics variants had a border;
the three permission-status fills did not, so the same pill component read as two visually
different things depending on which status it stated. One consistent shape now: tint, border,
icon, text, everywhere a badge appears — improvement pages, cards, and the doll house info bar all
read `.badge` from the same rule.

**Badges, revised again 2026-08-21.** Two changes, in opposite directions, which is the point of
recording them together. The **reversibility** badge ("Comes off at move-out" and its two other
wordings) loses its fill and keeps only its border and text. The **"Renter basics"** badge takes
the fill of the section it belongs to, `--color-surface-brand`, instead of the generic
`--color-surface` grey-green. Both follow the same rule: a badge's fill should mean something.
Reversibility is a property every improvement has and states in three grades, so filling it tinted
one flat color put visual weight on a field that is never a status — the three permission states
next to it are the ones that earn a fill, and dropping this one's makes them read. "Renter basics"
is the reverse case: it marks a distinct *kind* of page, and matching it to the band those pages
live in (§3.4) is the fill doing real work. Contrast holds at 11.9:1 either way; the border in
`currentColor` from 2026-08-20 is what keeps the unfilled badge a legible pill shape rather than
loose text.

**Impact rating, revised 2026-08-20.** The gauge icon (`icon-impact` in the sprite) now has three
dedicated variants — `icon-impact-low`, `-medium`, `-high` — with the needle drawn at a different
position on the dial per level, rather than every impact rating showing the identical glyph. Used
on improvement pages and the library (§3.4), and read by `assets/js/dollhouse.js` for the doll
house info bar, so the icon matches the stated level everywhere impact is shown.

**Price dollar scale, added 2026-08-20, corrected the same day, revised twice 2026-08-21.** A row
of small dollar-sign glyphs (`.price-dollars`, reusing `icon-cost`) states the cost band by how
many of them there are — the familiar $/$$/$$$ price-tier convention. First built next to the impact gauge, filling by impact level,
which read backwards the first time anyone other than the person who built it looked at it: more
dollar signs next to an impact rating reads as "this claims to save more," not "this costs more."
Moved to sit with the cost fact it was always meant to describe. Decorative and `aria-hidden`
either way: the visible cost text ("Under $25") is the accessible name.

The two 2026-08-21 revisions. **Free gets one glyph, not zero.** Zero glyphs is not a cheaper
price, it is a missing element: the cost fact on a free improvement rendered as bare text while
every other card in the same grid rendered text with a symbol beside it, so the free ones read as
unfinished rather than as free. One glyph is the floor of the scale, and the visible word "Free"
is what actually distinguishes it from "Under $25" — which is fine, because that word is the
accessible name and the glyphs are decoration. **The scale reaches the cards.** It shipped on
improvement pages only; the cards on `/improvements` and the doll house info bar both still drew a
single glyph regardless of band, which is the one place the convention actively misinforms, since
one glyph there meant "cost" rather than "cheap". Cards, info bar and full page now all render
from the same four-band mapping: free 1, under25 1, 25to75 2, over75 3.

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
— see §3.2, a visited hotspot is now shown at reduced opacity instead. Icons added: "close" (an
X, for the personalize dialog), "sliders" (three adjustable rows, for the personalize FAB), and
"help" (a question mark in a circle, for the doll house instructions callout, §3.2). The "doll
house" object icon doubles as the site logo, in the header lockup next to the wordmark and as the
browser tab favicon; it has been redrawn twice since (§10) to close the gap between its bounding
box and its visible glyph.

Four icons added 2026-08-21, taking the set to 27. **`icon-code`,** angle brackets, for the
footer's "View the source code" link (§10). **`icon-baseboard`, `icon-vent` and `icon-mini-split`**
for `/learn/heating-systems` (§3.5), which asks a reader to identify what is actually on their
wall: `icon-radiator` already covered a hot-water or steam radiator, and these are the other three
things a Hanover rental delivers heat through. They are drawn to the same 24×24 spec as the rest
and are used at a larger size in that page's identification grid, which is the "the illustration
uses the same pen" rule above doing its job — the cards needed no separate drawing style.

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
| Hotspot | The tappable thing in a room | default, hover, focus-visible, selected (its info bar is the one open, added 2026-08-19), visited (reduced opacity, revised 2026-08-19, was accent fill plus flag marker), hidden (does not apply to the student's situation — reversed 2026-08-20, was dimmed with a text reason, see §3.2), 44px hit area |
| Info bar | Opens under the drawing with the short answer | closed, opening, open, empty, error, no JavaScript (becomes a link) |
| Flip card | Flashcards for myths and definitions | front, back, focus-visible, reduced motion. Spec in §5.1 |
| Carousel | Ordered walkthroughs and before-and-after pairs | first, middle, last, keyboard, no JavaScript. Spec in §5.1 |
| Animated diagram | Shows a mechanism the student cannot see, for example where heat leaves a room | static (first frame), playing, finished, replay, reduced motion, no JavaScript. Spec in §5.1 |
| Sticky progress bar | Progress through the house, and position within a long page | at rest, condensed, unstuck on short viewports, no JavaScript. Fill capped at 100% regardless of the raw ratio (added 2026-08-20) |
| Progress reset (added 2026-08-20) | Clears visited state and restores "Start here," sitting in the same sticky row as the progress bar | default, hover, focus-visible |
| Disclosure bar | "What if my landlord says no", "How we know this", "Everything in this house" (2026-08-21) | closed, open, focus-visible, deep-linked open |
| Story bar (added 2026-08-20) | "Why this works" and "Savings" on an improvement page — a full-width, always-open band, heading on one side at a larger size, body on the other. `.story-bar--reverse` swaps which side is which. Spec in §5.1 | default, parallax entrance running, held still (reduced motion or `animation-timeline: view()` unsupported), off below 600px |
| Improvement illustration (added 2026-08-20) | A custom SVG depicting the specific improvement, beside the heading block on a wide screen, below it on a narrow one. Decorative — the page's prose carries the information, the drawing carries the "what does this look like" | single static state, no motion |
| Improvement card | The unit of the library only | default, hover, focus-visible, visited, filtered-out (removed rather than dimmed) |
| Permission badge | States `landlordPermission`, three variants | three variants, each with icon and text, inline and card sizes |
| Reversibility badge | States `reversible` in move-out terms | three variants |
| Cost and time meter | `cost` and `time` bands as text plus a filled-square indicator | four cost bands, four time bands, unknown |
| Impact indicator | `impact`, including the `enabler` case that saves nothing on its own | low, medium, high, enabler |
| Checklist item (v2) | One step in the generated checklist | unchecked, checked, disabled (blocked by a prerequisite), needs-permission, printed |
| Situation form | The one four-question form, used at `/start` and inside the personalize dialog | default, focused, selected, "not sure", cleared, results-count live region on the library |
| Floating action button (added 2026-08-19) | "Personalize your recommendations," fixed bottom-right, every page | default, hover, focus-visible, active |
| Motion controls FAB (added 2026-08-21) | The reduce-motion switch and a Pause button, fixed bottom-left, every page. Pause appears only where the page has something looping | default, hover, focus-visible, paused, compact (below 640px), no JavaScript (switch still works, Pause is absent) |
| Page head (added 2026-08-21) | The title block every page opens with: centered `<h1>` at `--text-display`, optional lede under it. The `.content-column` under it centers to match, and carries the same vertical rhythm rule `.improvement-body` already had | with lede, without lede, below 600px |
| Full-bleed band (added 2026-08-21) | The shared "background spans the window, text stays put" wrapper behind story bars and the Renter basics band | default, tinted, clipped to a point (Renter basics) |
| Program card (built 2026-08-21) | One program on `/programs`. Read one at a time in a stack, not scanned in a grid, which is why it is not `.card` | renter-usable, landlord-approval-required, not available to renters (left rule and badge, never the rule alone) |
| Glossary entry (built 2026-08-21) | One term on `/glossary`. A `<dl>` pair with a stable `#anchor`, since pages deep-link into it mid-sentence | default, arrived at by anchor (offset so it is not tucked under the top of the window) |
| Identification card (added 2026-08-21) | "Is this what is on your wall?" on `/learn/heating-systems`. An icon at large size, what it looks like, and how to tell it apart from the one next to it | single state |
| Data table (added 2026-08-21) | A small comparison table. Scrolls sideways inside its own wrapper rather than making the page scroll | default, narrower than its content (wrapper scrolls) |
| Season toggle (added 2026-08-21) | Winter or summer, scoped to one diagram. A `<fieldset>` of two radios, so it needs no JavaScript and no ARIA | winter (default, and the no-`:has()` fallback), summer, focus-visible |
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

**Skip link, fixed 2026-08-21.** Every page below the root wrote it as `href="../#main"`, which
resolves to the *home page's* main content rather than the current page's. The first focusable
element on the page navigated away from the page. It came from a misreading of the shell rule in
[AGENTS.md](AGENTS.md): a copied shell fragment adjusts its relative paths per depth, but a
fragment-only href has no path to adjust and is already correct at any depth. It reads `#main`
everywhere now, and `tools/check-content.mjs` accepts that at every depth because its
normalization only strips a leading `../`, which this no longer has.

**Consolidation pass, 2026-08-21.** Run deliberately before the remaining pages were built,
because every duplicated value in the CSS at that moment was about to be duplicated eight more
times. Five things merged:

- **`--text-display`** (§4). The story-bar heading's `clamp()` was written inline in its own rule.
  It is a token now, and the page titles use it rather than a second clamp beside the first.
- **`.full-bleed`.** Story bars and the Renter basics band had each written out the same
  `width: 100vw; margin-inline: calc(50% - 50vw)` breakout. One utility now, and the two keep only
  what actually differs — the tint, and Renter basics' clipped point.
- **`.page-head`.** Every page opened its title differently. One block now: centered `<h1>` at
  display size, optional lede under it.
- **The switch track color** is a token with a footer override, rather than one hard-coded
  translucent white serving both a dark footer and a light floating control. See §7.
- **Hard-coded `#fff`** in component rules is `--color-text-on-dark` where it means "text on a dark
  surface". The token existed and half the rules were already using it.

Also folded in rather than reinvented: "Everything in this house" is now the existing disclosure
bar (§3.2), and the price dollar scale now has one mapping read by the cards, the info bar and the
improvement pages (§4) instead of three renderings of the same idea.

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
- The label says what is inside. "What if my landlord says no", "How we know this". Never "More"
  and never "Read more".
- Open state is deep-linkable, so a link can point at an opened section.
- One level of nesting only. A disclosure inside a disclosure is a sign the page needs splitting.
- **Never used for:** safety notes, permission status, reversibility, cost and time, or the three
  standing disclaimers. Those are always visible on the page.

**Story bar, added 2026-08-20, restyled the same day.** "Why this works" and "Savings" on an
improvement page. A deliberate exception to the disclosure-bar-by-default rule above: both are
short (two or three sentences), both are the connective explanation a student reads right after
the steps rather than optional depth, and hiding either behind a closed `<summary>` was costing
more clicks than the length justified. Full-width, always open, two columns, on a tinted
(`--color-surface`) background — the same tint cards and info bars already use — so the pair reads
as a distinct band against the plain-white "What you need"/Steps sections around it.

- Two-column grid: the heading takes one side, the body sits in the other. `.story-bar--reverse`
  swaps which side is which — "Why this works" runs heading-left, "Savings" runs heading-right —
  so the two read as a matched, alternating pair down the page rather than two copies of the same
  layout. Below 700px both stack, heading first.
- **The heading is sized well past a normal `<h1>`,** revised 2026-08-20 (was `--text-h1`): a
  dedicated clamp up to 4.25rem, since this is the one heading on an improvement page allowed to
  dominate — nothing else competes with it for size inside the band that exists to carry exactly
  these two headings. Padding grew to match (`--space-8` block, up from `--space-6`), so the band
  reads as genuinely taller, not just differently colored.
- **The two bars touch,** added 2026-08-20: no margin between "Why this works" and "Savings," a
  shared border (`.story-bar + .story-bar` drops its own top border, since the first bar's bottom
  border already draws the line between them) so the pair reads as one continuous two-part band
  rather than two separate bars with a gap.
- **Parallax/entrance drift, gated exactly like every other ambient motion in this document
  (§7):** behind `@supports (animation-timeline: view())`, since `view()` timelines are a
  progressive enhancement; off under `prefers-reduced-motion: reduce` or the footer switch; off
  below 600px, alongside the rest of the site's parallax (§6). Each side drifts in from a slight
  horizontal offset (opposite offsets on the two sides) as the bar crosses the viewport — a few
  pixels of travel, well under the 20% cap §7 sets for a continuously-running scroll-linked layer,
  because this is a one-time entrance rather than a loop. `view()` rather than the `scroll()`
  timeline the rest of §7 specifies: `scroll()` ties an element's animation to the whole
  document's scroll distance, which suits a layer that runs the length of a page; `view()` ties it
  to the element's own transit through the viewport, which is the better fit for one self-contained
  band animating once as it arrives. Same `@supports`-guarded, reduced-motion-first philosophy
  either way. **Fixed 2026-08-20: opacity dropped from the keyframes entirely, transform-only
  now.** A `view()` timeline that never advances — a short viewport, an engine that only partially
  implements the spec — used to leave the heading and body stuck at 30% opacity, found by actually
  screenshotting the page rather than assumed away, and a direct violation of §7's own "freeze
  anything at any point and the screen still makes sense" rule. A transform stuck mid-range still
  leaves fully legible, full-contrast text, offset by at most 14px; only opacity's failure mode was
  unsafe, so only opacity was removed.
- Never carries a number or a claim that is not already stated in the plain-text sources block —
  same rule as everywhere else content presents a figure (§8).

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

**The 320px pass, 2026-08-21.** Run before the new pages shipped, and it found real breakage
rather than confirming what was assumed. Every page on the site scrolled sideways at 320px, which
is a 1.4.10 failure and the one accessibility criterion §6 above says is not deferred. Measured
rather than eyeballed: each page rendered at 320px, every element's right edge compared against
the viewport, and then the page actually scrolled to see whether it moved. Four causes, all fixed:

- **The footer credit row.** The largest offender, and on every page. The logo and the text sat in
  a flex row that could not wrap, and the contact email is a thirty-character unbreakable token
  that set a min-content width wider than the whole window. It wraps now, and `min-width: 0` lets
  the columns actually shrink.
- **Long links anywhere in prose.** An email address or a URL written out as link text is one
  token. `overflow-wrap` on the reading column and on the links inside it. The subtlety worth
  recording: a direct `overflow-wrap` declaration on `a` beats an inherited one from the column,
  so the container rule has to name the links too or it silently does nothing to the exact
  elements causing the problem.
- **The full-width bands.** `width: 100vw` counts the vertical scrollbar; the body's content box
  does not. Every page with a scrollbar was about 8px wider than its window. `overflow-x: clip` on
  `body` — `clip` and not `hidden`, since `hidden` would make the body a scroll container and the
  doll house's sticky progress row would stop pinning. Verified after the change that the row
  still pins.
- **The Personalize FAB.** Its label wrapped to four lines across the corner of a 320px window. It
  shortens to "Personalize" below 640px, with the full label still the accessible name.

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
  drawing, the disclosure bar expanding, and the scroll-expanding diagram bands. Two more since:
  the improvement illustrations, which each carry one small loop (2026-08-21), and the hero shoes,
  which walk across the mat as the student scrolls out of the hero (2026-08-21, §3.1).
- **A third kind: scroll-driven.** Added 2026-08-21, alongside the hero shoes. Neither response nor
  ambient, and it needs saying because it changes which rule applies: the animation's progress is
  the scroll position, so it only ever moves while the student is moving, and it reverses when they
  scroll back. WCAG 2.2.2 does not reach it — nothing is moving on its own to be paused — so these
  do not carry a Pause button, the way the parallax bands never have. They are still switched off
  entirely by `prefers-reduced-motion`, by the reduce-motion switch, and below 600px.
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

- **Where:** revised 2026-08-21. It sits in a floating control of its own, fixed to the
  bottom-left corner of every page, paired with the Pause button (below). It is also still in the
  footer, which is where it shipped and which is the copy a student reaches by tabbing to the end
  of a page. Both carry `.reduce-motion-input`, and `assets/js/motion.js` keeps them in sync, so a
  page showing both never disagrees with itself. Labeled "Reduce motion" with a visible text label,
  never an icon alone, except in the compact form below 640px where the label goes visually hidden
  and the accessible name carries it.
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

**The Pause button, added 2026-08-21.** One per page rather than one per animation. Every looping
animation on the site now reads `--motion-state` from a single custom property, so one button can
stop all of them, and the per-diagram Pause buttons the explainer pages carried are gone. It
appears only when the page actually has something looping (`body:has(.motion-loop)`), and it is
deliberately not remembered across pages: it is a "stop this now" control, not an accessibility
preference, and the switch beside it is the one that persists.

**Where the floating control sits, and why it moved,** 2026-08-21. It shipped top-right, which put
it on top of two things at once: the primary nav, which is top-right on every page, and the doll
house's sticky progress row and reset button, which pin to the top of the viewport while the
student is touring the house. Both are controls, so this was a fixed decoration covering live
targets. It moved to bottom-left — the one corner on this site that nothing else claims, with the
Personalize FAB opposite it at bottom-right — which clears the header and the sticky row by
construction rather than by a `top` offset tuned per breakpoint. Below 640px both controls collapse
to plain 44px circles and the Personalize FAB is capped in width so the two never meet.

**Contrast, fixed 2026-08-21.** The switch track was drawn in translucent white, which is correct
in the dark footer it was built for and nearly invisible once the same switch appeared on the light
floating control. The track color is now a token that the footer overrides, rather than one value
serving both places: `--color-border-strong` by default (4.1:1, over the 3:1 WCAG 1.4.11 asks of a
control boundary) and translucent white inside `.site-footer`. The floating control also takes a
`--color-border-strong` border and full-strength `--color-text` labels, so it reads as a control
sitting on the page rather than a pale shape floating over it.

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
  body colors. Revised a third time 2026-08-19: matching the icon's bounding box to the text
  stack's height was not enough on its own, because the house icon carried real margin inside its
  own 24×24 viewBox and the gap between icon and text was tuned for two icons of similar visual
  weight rather than an icon next to a full lockup. Both are tightened together: the house icon is
  redrawn with less internal margin (closer to the 20px live area the icon spec already calls
  for, rather than the ~16px it was actually using), so a stretched icon's *visible glyph*, not
  just its bounding box, reads as the same size as the text, and the icon-to-text gap drops from
  `--space-2` to `--space-1`. Revised a fourth time 2026-08-19: still too large, because
  `align-self: stretch` matches the *bounding box* to the text height, and even a 20px live area
  inside a 24px box means the box is 20% taller than the visible glyph. The house icon is redrawn
  again, this time near edge-to-edge in its viewBox (roofline peak at y=2, wall base at y=22, one
  house-width short of the full 24 units each direction) so the bounding box and the visible
  glyph are close enough that stretching the box to text height reads as matching the glyph to
  text height. Width is not set explicitly — `width: auto` alongside the fixed height keeps the
  icon's own proportions as its rendered size changes, rather than distorting it. Revised a fifth
  time 2026-08-20: the icon was still rendering far larger than the text stack, and the cause
  turned out to be upstream of every previous pass — `.brand__icon` sized itself with
  `height: 100%` against `.brand`, a flex row whose own height is `auto`. A percentage height
  against an indefinite parent is itself indefinite, and with no `viewBox` or explicit
  width/height on the `<svg>` element, browsers fall back to the default replaced-element size
  (300×150) to work out the flex row's hypothetical cross size before stretch alignment even
  applies — so the row, and the icon inside it, were resolving to a 150px-tall line regardless of
  how large the two-line text stack actually was (measured: 150px against a real text-stack height
  of about 55px). Separately, `.wordmark` and `.partner-line` were inheriting the body's 1.65
  line-height rather than the display value, inflating the text stack's own height too. Both are
  fixed together: the two spans now set `line-height: var(--leading-display)` explicitly, and
  `.brand__icon` sizes itself with a calculated height (the two text lines' line-heights plus the
  gap between them, using the same tokens the text uses) instead of a percentage stretch, so it
  tracks the text stack by computation rather than by a flex-stretch mechanism that depended on an
  indefinite parent size. Revised a sixth time 2026-08-20: the gap between the icon and the text
  stack, `.brand`'s own `gap`, was still reading as loose once the icon was sized correctly —
  dropped from `--space-1` (4px) to a flat 2px, off the spacing scale deliberately, since the
  lockup is meant to read as one mark rather than two elements with visible daylight between them,
  and no token on the 4px scale sits usefully below 4px. Revised a seventh time 2026-08-20: even
  at zero `gap`, daylight remained, and this time the `gap` value was not the cause — measuring
  the rendered boxes directly showed the icon and text bounding boxes were already touching (0px
  apart) while a visible gap still read on screen. The cause is inside `icon-house` itself: its
  walls (the rect-like block, the shape's real visual mass) stop at x=21 of the symbol's 24-unit
  viewBox, and only the roof's single-point peak reaches nearer the edge, so the icon's own
  bounding box carries built-in empty space on its right side no flex `gap` can close. Fixed with
  `margin-right: -6px` on `.brand__icon`, scoped to this lockup rather than redrawing the shared
  `icon-house` symbol, which is also the favicon and every doll house hotspot that reuses it.
- **Footer, every page:** "Project created in partnership with Sustainable Hanover, a committee of the Town of Hanover, New
  Hampshire", their logo at a fixed height, a link to their site, and the contact address
  sustainablehanovernh@gmail.com. Also the site-wide last-reviewed date and a link to the
  accessibility statement.
- **Footer, revised 2026-08-21.** Four changes, all of them about the partner credit doing its job
  rather than sitting there. **The logo is a link** to sustainablehanovernh.org. It was the one
  piece of Sustainable Hanover branding on the page that was not clickable, which is the opposite
  of what a partner logo is for; a reader who wants their site reaches for the logo before they
  read the sentence next to it. It keeps its `alt="Sustainable Hanover"`, which is now the link's
  accessible name, and the text link below it stays — the same destination twice is correct here,
  since one of the two is an image and the other is the address written out. **The logo is
  larger**, 68px tall against 40px. At 40px against a three-line paragraph it read as a bullet
  point. **The website address and the email each get their own line**, instead of sharing one
  line separated by a middot. They are two different ways to make contact and a reader is picking
  one, not reading a sentence. **A "View the source code" link** goes to the GitHub repository,
  next to the accessibility statement. The repository is public and the project is coursework
  whose method is part of what it is showing, per [docs/ai-use.md](docs/ai-use.md); a reader who
  wants to see how a claim on this site was built should not have to be told the URL. It carries a
  new `icon-code` glyph drawn to the §4 spec — angle brackets — rather than a GitHub mark, which
  would be a third-party logo the project has no license to place.
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
| The hero mat is a flat tan with a black border. Does it stay this plain, or get a woven coir texture (CSS repeating-gradient crosshatch, no image asset) later? | Keep it flat / add a woven texture pass | Tried the crosshatch 2026-08-20, reverted the same day — read as noise at the mat's actual size. Flat tan, plus `--shadow-mat` and a pair of shoes at the corner (§3.1) | 2026-08-20 |
| The doll house is an example residence, and nothing on the page says so. Do students read it as a generic teaching house, or do they expect it to match their own unit? | Leave it implicit, as specified, and watch for the misread in usability round 2 / add a line under the drawing if it confuses anyone / draw a second, apartment-shaped arrangement | Implicit, carried by context and the simplified illustration | 2026-08-19 |
| Is the guided order advisory or does anything enforce it? | Advisory, as specified. Nothing locks / gate tier 3 until tier 2 is seen | Advisory | 2026-08-18 |
| Ten hotspots in v1, or fewer done better? | 10 as listed in §3.2 / 6 covering only the Must topics | | |
| Does a hotspot that does not apply to the student's situation dim, disappear, or stay with a reason? | Dim with a text reason, as specified / hide / no change | Hide — reversed 2026-08-20, see §3.2 | 2026-08-20 |
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
