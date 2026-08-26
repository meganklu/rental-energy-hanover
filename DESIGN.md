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
│   /#house                      The doll house. Front-open view, six rooms, seventeen hotspots.
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
│   ├── /learn/whats-in-your-lease  Enabler. Who pays for what, and where the lease says so.
│   │                             Added 2026-08-24. Topic #6
│   ├── /learn/ask-your-landlord Enabler. What goes in the email, and what to do at a no.
│   │                             Added 2026-08-24. Topic #9
│   └── /learn/move-out-restore  Enabler. What to take down and photograph. Added 2026-08-24.
│                                 Topic #16
├── /checklist                   "Your list". F6, shipped 2026-08-25 (§3.8). What the student
│                                 added, sorted into buy / ask / do. Prints, downloads, shares
├── /before-you-sign             Hunting and signing. Viewing checklist, what to ask. Reached
│                                 from Renter basics, decided 2026-08-24 — it had no inbound
│                                 link at all until then
├── /your-rights                 NH heat standard, habitability, who to call. Legal disclaimer
├── /programs                    NHSaves and assistance a renter can actually use
├── /where-to-get-it             Materials sourcing. Online, or fare-free bus to West Lebanon.
│                                 Reached from a panel at the foot of /improvements and from
│                                 every improvement page, decided 2026-08-24
├── /glossary                    Plain-language definitions, linked from first use. Reached from
│                                 the footer, decided 2026-08-24 — it had no inbound link at all
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

**Breadcrumbs name the section, added 2026-08-25.** An article's breadcrumb used to read
"Improvements / Set your thermostat back" and link back to the top of `/improvements`, which is now
a shut door two screens above where the reader left. Each breadcrumb links to the part of the page
the reader actually came from: an improvement returns to `#improvements-list`, and an explainer
reads "Improvements / Renter basics / …" and returns to `#renter-basics`. Both anchors sit below the
pinned door scene, so the jump lands past it rather than in the middle of it.

**How those three pages are reached, decided 2026-08-24.** An audit of inbound links found
`/before-you-sign` and `/glossary` with no inbound link from anywhere on the site, and
`/where-to-get-it` reachable only from body text inside five improvement pages. All three are real
content that a reader had no route to. `/where-to-get-it` now has a photo-and-text panel at the
foot of `/improvements` as well as a pointer inside every improvement page, including the free
ones, where the line reads "nothing to buy for this one" and points at the page for when something
is. `/before-you-sign` joins the Renter basics carousel as its first card, which is also where it
belongs in the renter's own timeline. `/glossary` goes in the footer, since it is reference
material rather than a destination.

**Two routes for website navigation.** The doll house is the guided route. It suits a student who does
not yet know what to ask for, and it hands out information in graduated tiers as they explore. The
navigation, the situation selector and the library are the direct route. They suit a student who
arrives from a link, a search, or a second visit, and who wants to filter straight to their heat
type, their budget, or what they are allowed to change. Neither is a fallback for the other, and
both reach the same content items. Every improvement is one tap from the house and one tap from the
library.

### Navigation

- **Primary nav items:** Home · Improvements · Your rights · Programs · About. Revised 2026-08-19:
  "The house" is renamed "Home" and "What you can change" is renamed "Improvements," matching the
  shorter, plainer vocabulary a student arriving from a link would use. Revised 2026-08-21:
  "Rights and programs" is split into two entries. It was one label pointing at one of the two
  pages it named, so `/programs` was reachable from the top bar only by first landing on
  `/your-rights` and finding the link in its prose, and a student who wanted the rebate page had
  no way to tell from the nav that it existed. The two are separate subjects with separate pages
  and now separate slots. `/your-rights` is retitled "Your rights" to match, which also settles a
  page whose `<h1>` claimed content that lives on the other page. The slugs are unchanged. `/learn` no longer has its
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
   regenerate the pattern by hand, not to run at deploy. Scaled up 2026-08-21: the tile is 480px
   rather than 320px, so a unit is 60px and slabs run 60px to 180px. The dissection itself is
   untouched — same seed, same 8×8 grid, same slab layout, same derived joints — because the
   pattern's shape was right and only its scale was not. The joint stroke stays 2px rather than
   scaling with the tile, so larger stones do not come with heavier mortar lines.
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
   **Where the icon was followed and then un-followed: the lacing.** The reference laces as a
   ladder, two rails with three rungs across them and the ends trailing past the heel, and it is
   the most recognizable thing about that drawing. It was ported over faithfully, and then reverted
   the same day to the crossed laces and eyelet dots it replaced. The reason is scale. This shoe
   renders at about 85px wide. At 400% zoom the ladder is clearly a ladder; at 85px it is a row of
   hash marks, while a crossed lace still reads as a lace because the X shape carries it rather
   than the rung spacing. The dark heel opening came back for the same reason: without it the lower
   half of the shoe is an undifferentiated green field at that size.

   **The rule this leaves behind:** check a decorative drawing at the size it actually renders, not
   at the zoom it was drawn at. The ladder pass was only ever checked at 400%, which is how
   something more faithful to the source shipped as something harder to recognize. Where fidelity
   to a reference and legibility at display size disagree, legibility wins.

   **The walk, added 2026-08-21, rebuilt the same day.** Scrolling down out of the hero walks the
   pair across the mat. It is a scroll-progress animation, not a timed one: the position in the
   walk *is* the scroll position, so scrolling back up walks them back, and stopping stops them.
   Gated exactly like the story-bar drift in §7 — behind an `@supports` check for
   `animation-timeline`, off under `prefers-reduced-motion`, off with the reduce-motion switch, and
   off below 600px with the rest of the site's scroll motion. With any of those in force the shoes
   sit where they started, which is the state the hero has always shipped.

   The first pass did not read as walking, for two reasons worth writing down.

   - **They were pointing the wrong way.** The shoe is drawn from above with its toe at the top of
     its own viewBox, so the pair faced up the page while the animation carried them to the right.
     A shoe travelling sideways to the direction it points is a shoe being slid, whatever its feet
     are doing. The drawing is now rotated a quarter turn inside the `<svg>` (the `<g>` itself
     carries `translate(140 0) rotate(90)`, one place rather than two `<use>` sites) so the toe
     points along the direction of travel, and `.hero__shoes` stacks the two as a flex column,
     which from above is what a pair side by side actually looks like when it is facing right.
   - **Both feet were moving at once.** Each shoe alternated between two offsets, so at every
     moment both were sliding. In a real gait one foot is planted and still while the other swings
     past it. The stride is now built from that constraint rather than eyeballed: over one cycle
     the container advances 90% of a shoe's length, so each foot spends half the cycle drifting
     backward 45% relative to the container — which is exactly stationary against the ground — and
     the other half swinging forward 45%, covering 90% against the ground at double the container's
     speed. Amplitude is not a taste value here; it is whatever makes the planted foot stop.

   Three cycles run across the scroll range, half a cycle out of phase between the two shoes. A
   small `scale(1.06)` at the midpoint of each swing stands in for the lift, since from directly
   above a raised foot reads as a nearer one and there is no other axis to show it on.
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

**The stride, revised 2026-08-24.** The shoes read as sliding rather than stepping. The cause was
that the lift was carried entirely by `scale`, running 1 to 1.06, and 6% is not a step. Seen from
directly overhead there are only two axes available to say a foot has left the ground: it is nearer,
so it is larger, and its shadow has further to fall, so the shadow spreads and fades. Both now run
across three stages, 0.94 planted to 1.16 at the top of the swing, with a keyframe either side of
the peak so the foot rises and falls instead of popping between states. The resting frame is held at
`scale(1)` with the planted shadow for both shoes, so the pair still sits level and side by side
before any scroll happens; the follow shoe catches up a quarter cycle in the first few percent of
scroll, which is not visible at that speed.

**The hero is held while the walk plays, added 2026-08-25.** The walk ran over the first 70vh of
scroll, which is the distance a reader covers getting past the hero, so almost nobody saw more than
a step of it. The hero now sits inside a scene 220vh tall and sticks to the top of it, which turns
the scroll from a way past the hero into the thing that drives it: the view holds, the shoes cross
the mat, and the hero lets go at the end. Gated the same three ways as everything else here, and
outside the gate the scene is one screen tall and nothing sticks, because there is nothing to scrub
through.

**And the walk turned upward.** It crossed the mat left to right, which is the one direction nobody
walks over a doormat. It goes up the mat now, toward the door the mat is lying in front of. The shoe
was already drawn toe-up and turned a quarter clockwise to point right, so the turn simply came off;
the pair changed from a column to a row, because from directly overhead a pair walking away from you
sits side by side rather than one behind the other; and the tilt went, because a pair walking
straight away has no reason to lean. The stride keyframes are the same walk with the signs mirrored,
since forward is now negative Y.

The pair does cross the wordmark on the way up. That is unavoidable at this mat's proportions, where
any vertical path crosses the lettering, and it is the right trade: the walk is the thing the reader
is being held to watch.

**And it starts in the bottom left corner, 2026-08-25.** The pair rested at the bottom right, which
is the corner the mat's fine print already occupies: `*Rental home` is anchored to the bottom right
of the border, and a pair of shoes resting under it left both harder to read. The start moves to the
opposite corner. The walk is unchanged, since it goes straight up the mat whichever corner it leaves
from.

### 3.2 The doll house

The centerpiece. Everything else on the site can be reached from it.

**Furnished rooms, an experiment on `feature/dollhouse-furniture`, 2026-08-25.** The rooms held a
row of chips, which meant the house was a house in name and a list of buttons in fact, and it meant
opening a room bought you nothing except bigger buttons. This branch draws each room as a toy house
room seen with the front wall off, and the furniture is what you press.

**The look comes from the reference, not from the site's palette.** Cream walls under a faint print,
warm mid-brown floors, a heavier beam under each room where one story sits on the next, arched
windows in white frames, and light natural wood furniture carrying soft fabric pastels. Two passes
got here. The first drew scenery out of rounded CSS boxes, and a bed came out as a crate with a
smaller crate on it. The second drew it in the icon set's flat green line pen, which read as a
wireframe of a doll house. Thirty-nine furniture symbols now live in `assets/icons/sprite.svg`, each
in a viewBox of its own real proportion, because forcing a sofa into a 24 square is what makes a
drawing read as an icon of a sofa rather than as a sofa. The color lives in the furniture rather
than in the walls: a room that is pink from wall to wall leaves nothing for a pink chair to be. The
roof stays the site's green, since the brief scopes the toy reference to the interior.

**Two kinds of object, told apart three ways.** A prop is scenery: no name, no interactive state, no
place in the accessibility tree. An object is the same `.hotspot` link it always was, drawn in full
color, carrying its name under it, and lifting off the wall under the pointer. Only objects carry a
name, and that is the signal that does not depend on color. The button frame came off: a bordered
pill standing on a wall is exactly what this is trying to stop looking like.

**Everything is placed against the floor line.** `--x` across the room, and then either `--b` up
from the floor to a piece's feet or `--y` down from the ceiling to its top edge. Placing by edges
rather than by centers is not a detail: the first pass centered on both axes, and a ceiling light
placed near the top of the wall hung off the top of the room by half its own height. A piece
standing on the floor takes its name above it, since there is no wall under a bed to put a name on.

**Only three things hang from the ceiling**, revised 2026-08-25: the pendant light, the curtain rail
and the floor joists over the basement. Everything else in a house is fixed a set distance up from
the floor, and anchoring it to the ceiling instead means it drifts away from the furniture it
belongs with as the room's height changes. The bill floated a foot clear of the fridge in the
enlarged kitchen for exactly this reason. Wall pieces now sit at the heights they sit at in a
2.5-metre room: a thermostat and a set of key hooks at 1.4m, a window sill at 1.0m, a shower head at
1.65m, and the bill on the fridge's own upper door.

**Size is a share of the room's height, not its width.** This is the whole scaling rule, and getting
it wrong is what made the enlarged room look off. Height is the dimension that maps to a real one: a
bed is about a metre tall in a room about two and a half metres tall, whatever the room's width
happens to be. Sizing by width share was the first pass, and because the enlarged room is a
different aspect from the room in the house, every piece came out around forty percent larger
against the room the moment it opened. Width follows each symbol's own viewBox, so a sofa stays
sofa-shaped. The enlarged room also holds three by two now, the house room's own proportion, since a
room that grows in width alone spreads the same furniture over more wall and reads as half empty.

**The 44px press target is an invisible box, not a bigger drawing.** A thermostat drawn to scale in
a room this size is about twenty pixels across, and inflating it to the site's 44px floor would make
it the size of a picture frame on the wall next to it. The floor is held by a transparent
pseudo-element centered on the piece, at least 44px each way, which takes the press without
changing what is drawn. Verified by hit-testing the center of every drawing and confirming it
resolves to its own link.

**The bug that made the whole thing look broken.** An outer `<svg>` with no `viewBox` has no
intrinsic aspect ratio, so `height: auto` fell back to CSS's default 150px and every drawing sat
letterboxed inside a box far bigger than itself. Furniture floated above the floor, names sat ninety
pixels from the things they named, and the collision measurements were all measuring the wrong
boxes. Each referencing element carries its symbol's own viewBox now. The lesson is narrow and
worth keeping: a `<use>` of a symbol inherits the symbol's aspect ratio for painting but not for
layout.

**Objects are spread evenly across the rooms, 2026-08-25.** Seventeen objects over six rooms sat at
3/3/1/4/3/3, with the bathroom holding one thing and the living room four. Two moves fix it, both to
somewhere the object plausibly is in a real rental: the radiator or baseboard goes to the bathroom,
and the curtains go to the bedroom. That gives 3/3/2/3/3/3, and the bathroom keeps the two since it
is the smallest room drawn. The guided order is untouched, because it was never grouped by room.

**Guidance needed no JavaScript.** `dollhouse.js` already flags the next unvisited object with "Start
here" or "Next"; the branch only restyles that flag into a tag on the piece with an arrowhead
pointing at it, and `:has()` puts a glow on whichever piece is carrying it. Three signals for
one thing: the words, the pointer's shape, the glow. The tag nods once every five seconds so the eye
finds it among seventeen pieces of furniture, gated off under reduced motion. The width gate on that
animation is load-bearing rather than tidiness: the keyframes set `translateX(-50%)` on every frame,
a running animation beats a declared `transform`, and below the gate the flag would sit pulled half
its own width over the name it belongs to.

**The tag goes opposite the name, fixed 2026-08-26.** It was written as "a tag above the piece", and
it was not: `dollhouse.js` appended it inside `.hotspot__label`, so the tag measured itself against
the name plate rather than against the drawing. A wall-hung piece carries its name underneath, which
put "above the name" squarely on top of the piece, arrowhead and all. The flag is appended to the
hotspot now, and the side follows the name: name below the drawing means tag above with the arrow
pointing down, name above the drawing (anything standing on the floor, §3.2's "placed by its feet")
means tag below with the arrow pointing up.

**Two tokens were missing the whole time, fixed 2026-08-26.** `--color-room-plate` and
`--color-guide-halo` were referenced in `components.css` from the day the house was furnished and
never declared in `tokens.css`. Both declarations using them were therefore invalid at
computed-value time and dropped: the names sat directly on the wallpaper wherever they fell, which
is the exact problem the plate was added to solve, and the glow — the third of the three signals
above — was never drawn at all. Both are declared now, and the glow the selected piece carries is a
third token beside them.

**Labels are checked by hit-testing, not by eye.** Fifteen points across each name's box are asked
what is painted on top of them; anything that comes back other than the name itself is something
covering it. That plus the overflow and overlap checks is what the placement numbers are tuned
against, at 1150, 1280 and 1440. Eyeballing a screenshot missed a label sitting ninety pixels from
its own drawing for two passes.

**What it costs, and this is the finding.** A piece's name is sized in text and text does not shrink
with the room; the placement is a percentage and does. Below about 1150px the two stop agreeing:
names collide with each other and run off the wall. Measured across 640 to 1600, and re-measured
after every placement change, which is the only reason it is a number rather than a guess. So the
furnished scene is a wide-screen treatment, and everything narrower drops back to the chip rows it
replaced, which were designed for that width and lose nothing — the same links, the same names, the
same guide flag, in a row instead of on a wall. Below 600px the drawing is hidden entirely and the
plain "Everything in this house" list takes over, unchanged.

**Is it worth it.** The strongest argument for it is the enlarged room, which is where the request
started. Opening a room used to give you the same chips at a larger size. It now gives you a room
you can read. The strongest argument against it is that it is a second layout to maintain for one
breakpoint band on one page, and that seventeen hand-placed coordinates have to be re-checked
whenever a name changes length or a piece moves rooms. Not merged. See `docs/ai-use.md` for the
requests this answers.

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

**Width, fixed 2026-08-21.** The callout capped at 20rem, which broke a two-sentence instruction
into four short lines stacked under the heading and made a tooltip read as a column of text. The
cap is 34rem now, still bounded by `.section-heading-row`'s own width so it cannot run off a narrow
window, and the same instruction lands in two lines on a desktop viewport.

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

**Hotspots (11 in v1),** each mapping to an existing content item so the house adds a way in rather
than a new body of content:

| Hotspot | Room | Goes to |
|---|---|---|
| Window | Living room, Bedroom | Window film, thermal curtains |
| Exterior door | Entry | Door sweeps and weatherstripping |
| Thermostat | Living room | Thermostat setback |
| Radiator or baseboard | Living room, Bedroom | Do not block or cover it |
| Space heater | Bedroom | Real cost per hour, and the safety note |
| Heating system | Basement | Understanding your heating system |
| Water heater | Basement | Hot water, showers, laundry temperature |
| Outlets and plugs | Living room | Phantom load |
| Light fixture | Kitchen | LED swaps, keep the originals in a box |
| Where cold air gets in | Basement | Where the heat actually goes, and the programs page |
| The bill on the fridge | Kitchen | Read your bill. Marked "Start here" |

**Every Renter basics article is in the house, added 2026-08-21.** Two of the three explainers had
hotspots (the bill in the kitchen, the drafts walkthrough in the basement) and the third,
`/learn/heating-systems` (§3.5), reached the site through `/improvements` alone. A guided route
that skips one of three articles is not the guided route to the site's content, it is the guided
route to most of it. "Heating system" now sits in the basement, on `icon-vent` rather than a second
`icon-radiator` — the bedroom hotspot already owns that glyph, and repeating it would say the two
spots are the same thing. It takes second place in the guided order, directly after the bill:
knowing what kind of heat is in the unit is what the thermostat, the radiator and the space heater
spots all quietly assume, and it is the one answer the situation form (§3.3) asks for and never
taught.
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
time, recomputed after each spot is opened. It never appears alongside "Start here"; the two
divide the drawing's guidance between them by state, per "Start here ends when the tour begins"
below.

**"Start here" moves when personalization takes it away, added 2026-08-21.** The badge lives in
the markup on the bill hotspot, which was fine while the house always showed everything. Since
personalization began hiding hotspots (below), a student whose situation rules the bill out lost
the badge entirely and got back exactly the undifferentiated house the badge exists to prevent.
The badge is now placed rather than fixed: it stays on the bill hotspot whenever that hotspot is
showing, and moves to the lowest-numbered spot in the guided order that is both showing and
unvisited whenever it is not. Nothing about this reaches the no-JavaScript path, which never
filters and so never loses the badge.

**"Start here" ends when the tour begins, corrected 2026-08-21.** The placement rule above was
written for the case where personalization hides the badge's home, and it was then also applied
after every visit, which produced a badge that hopped to a new spot the moment the student opened
the one it was on. That reads as the tour restarting somewhere else, and it competes with "Next",
which is the badge that is supposed to carry the guidance from that point on. The two badges now
divide the job cleanly by state rather than by position:

| State | Badge on the drawing |
|---|---|
| Nothing visited yet | "Start here", on the bill, or on the lowest-numbered showing spot if the bill is filtered out |
| Something visited | "Next", on the spot the guided order goes to after the last one opened |
| Everything showing has been visited | Neither. There is nothing left to point at |

One hotspot carries a badge at a time, in every state, so the two can never appear together and
the "does this double up with Start here" check the "Next" badge used to make is gone with the
case it guarded. Reset (below) puts the student back in the first row. A reload mid-tour lands in
the second: the visited set survives in `sessionStorage` but the last spot opened does not, so
"Next" falls back to the lowest-numbered showing spot that is still unvisited.

A visited hotspot is shown at reduced opacity rather than with a flag icon, revised 2026-08-19 —
simpler, and it reads at a glance without needing a legend. This is one of the three ways a visited
state is distinguishable (opacity, plus the "Viewed" word added to its accessible name, per
"Accessibility" below); color and opacity together are still not the only signal, since the
accessible name changes too. None of this blocks the student from visiting again or from reaching
any other part of the site.

**Interaction.** Tap a room box and it enlarges, filling the drawing area, with the rest of the
house shown small alongside it. Tap a hotspot in the enlarged room to open an info bar under the
drawing. The open hotspot itself gets a visible selected state, so it is clear which spot the info
bar belongs to. Revised 2026-08-26 from a 2px accent outline to a glow: the outline was a rectangle
drawn around a thing that is not a rectangle — a lamp, a showerhead, a bill on a fridge — so it read
as a box that had appeared beside the object rather than as the object lighting up. A `drop-shadow`
follows the drawn edge instead, which is what hover already uses. Size is the second signal and it
is not a color, so the piece also holds a scale of its own while it is selected, above hover's; the
third is the info bar itself, open under the house and naming it. A selected piece does not take the
visited fade, since fading back means "you have read this" and the one on screen is the opposite of
that. The info bar holds the title, the permission and reversibility
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
`landlordPermission` to state. Same pill shape as the permission badges, but a neutral gray
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
labeled "Everything in this house" and closed on load. `<details>` is what makes this safe to do:
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

**The filter threw on every explainer, fixed 2026-08-21.** `matchesFilters` read
`item.appliesToHeat.includes(...)` directly, and an explainer has neither applicability field —
[docs/content-strategy.md](docs/content-strategy.md) §6 requires them of improvements only. So the
moment a student set a heat type, the house's filtering pass threw part-way through hiding
hotspots: some hidden, some not, `TOTAL` never updated, the "Everything in this house" list never
filtered, and no error the student could see. The library never hit it, because its grid holds
improvements and nothing else, which is why it survived a build and a half unnoticed. Both missing
fields now read as "any", which is also what they mean: an explainer about reading a bill applies
whatever is heating the room. Found while adding the third explainer hotspot (above), and covered
by a test in `tools/filter-logic.test.mjs` so the shape stays exercised.

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

**The gap between the term and the panel is bridged, fixed 2026-08-25.** Once the panel started
carrying a "Read the full entry" link, the link was almost impossible to reach: the panel sits eight
pixels above the term, and a pointer crossing those eight pixels is over neither the term nor the
panel, so the panel closed under the reader on the way to it. An invisible bridge now spans exactly
that gap, on the panel and flipped for the terms that open downward, so the pointer stays inside the
term's own subtree for the whole trip. The link is also a full 44px target rather than one line of
text, which is what makes it a control rather than a decoration. This is the standard fix for a gap
between a trigger and its popup, and the standard reason it is needed: `:hover` follows the pointer,
and a pointer in a margin is nowhere.

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

**Sized to fit, revised 2026-08-24.** The dialog was 40rem wide with the four fieldsets in an
`auto-fit` grid. Four questions of very different heights (five options, three, five, and nine)
fell into two ragged columns, and the result was taller than a laptop screen: the last question and
the submit button both sat below the fold on the one screen whose entire job is to be filled in and
dismissed. It is 62rem now, with the three short questions in a row and the nine-option lifecycle
question spanning the full width beneath them, its own options flowed into three columns. That fits
without scrolling down to about a 700px-tall viewport. `max-height` and the scrollable inner element
stay, because a short window or a large text size can still overflow and a dialog that clips is
worse than one that scrolls.

**Reset to defaults, added 2026-08-24.** A plain `<button type="reset">` beside the submit button.
The browser's own reset restores the radios to their HTML defaults, which are the four "I am not
sure" options, so the control works with no script at all. The script adds the one thing markup
cannot: clearing the saved situation as well as the shown one, and announcing `situationchange` so
the doll house and the library re-check it. Without that, a reader who reset and closed the dialog
would find the old answers still narrowing the list behind it.

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
component §5.1 already specifies. Prev/next controls and a counter were deferred while the section
held two slides, both of which showed at once through the peek; the third article (§3.5) is what
made a control worth having, and it shipped with one 2026-08-21.

**The whole section was one link, fixed 2026-08-21.** Every slide went to "Find your drafts" no
matter which title was clicked, and Previous and Next did nothing at all. One missing declaration
caused both. A card's title link stretches an invisible `::after` across its whole card to make the
card clickable, which works because `.card` is `position: relative` and the overlay resolves
against it. `.carousel__slide` reuses `.card__title` and was not positioned, so all three overlays
resolved against `.carousel` instead: three full-size sheets stacked over the entire component, the
last one in the markup on top, covering its two siblings and the controls underneath it. The slide
is `position: relative` now.

The lesson is about the pattern, not this component. A stretched `::after` is a link that reaches
as far as the nearest positioned ancestor, which means it is only safe when the element it is meant
to cover is the one establishing that ancestor. Reusing a class that carries a stretched overlay
means inheriting that requirement, and nothing warns when it goes unmet — the overlay does not
disappear, it silently grows.

**Hover, added the same day.** The slides now take the same tactile hover the library cards have
(§5, `scale(1.05)` plus a stronger border), which they had been left out of despite reading as
cards. The track picks up matching padding on both block edges so a slide growing at the top is not
clipped by the scroll container it sits in.

**Focused on one card, rebuilt 2026-08-24.** The peek variant showed all three slides at roughly
equal weight, which meant Previous and Next moved a track that already showed everything and so
appeared to do nothing. A slide is now 58% of the track and the track carries a matching gutter each
side, which puts the current card in the middle at full size with roughly a third of each neighbor
showing either side of it. Neighbours drop to `scale(0.9)` and 72% opacity; the current card takes
the accent border and the raised shadow.

Two things about how that is built are worth keeping. **The slide width is a length, not a
percentage.** Percentage `flex-basis` resolves against the flex container's content box, percentage
`padding-inline` shrinks that same content box, and asking for "a slide centered in the leftover
space" with both at once has no solution short of 50% padding and a zero-width content box. The
first attempt did exactly that and the focused card sat left of center. A length breaks the loop and
the gutter is then simply half the leftover.

**The scale-down only applies under `.is-enhanced`**, a class `assets/js/carousel.js` adds once it
can actually track which slide is centered. With the script absent every slide renders at full size
and full contrast, which is the honest fallback: a dimmed card with nothing able to un-dim it would
be worse than no effect at all. The controls also stop following their own `href` and scroll the
track directly, so pressing Next moves the row without moving the document or leaving a fragment in
the address bar. The `href` stays on the element as the no-JS path.

**The casing overhangs the box it is drawn in, fixed 2026-08-25.** The brickmould is drawn outside
the door's own layout box, six percent of the scene's height past the top and the bottom of it, plus
a pediment above that. The stage is a flex column and its gap measures to the layout box rather than
to the painted one, so the casing's foot landed on top of "Keep scrolling to open the door" and,
being an opaque white board, covered it. The stage now holds the door's width as a custom property
and the hint reserves the overhang the casing needs, which keeps the gap between the trim and the
label the gap it says it is. The general rule: an element drawn outside its own box has to have that
overhang reserved by whatever sits next to it, because layout will not do it.

**Every card in the library is the same height, 2026-08-25.** The grid rows sized to their own
tallest card, so a row holding one three-line summary was taller than the row under it and the add
button sat at a different height on every card. The grid's rows are equal now (`grid-auto-rows:
1fr`), and the add button is pushed to the bottom of its card with an auto top margin, so the
control is in the same place on every card and the eye can run down the column and press without
re-finding it. The badges and facts stay directly under the summary, which leaves the whitespace
between the facts and the button rather than between the title and the facts.

**The carousel is reused on `/programs`, 2026-08-25.** Seven program entries were seven tall cards
to scroll past. The peek treatment suits a long entry better than a short one: you read the one in
front of you and the next is visibly waiting. It takes a wider slide than the Renter basics row,
since a program entry is a heading, two paragraphs and a definition list, and it sits outside the
reading column rather than inside it. At 40rem the column was narrower than the slide, which sent
the track's gutter calculation negative and clipped the cards.

**Seven cards, 2026-08-24.** Three new explainers (§3.6's topic list) plus `/before-you-sign`, which
had no inbound link anywhere on the site until it joined this row. Ordered along the renter's own
timeline: before you sign, who pays for what, what heat you have, reading the bill, finding drafts,
asking your landlord, putting it back at move-out.

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

**The reader is held at the door, added 2026-08-25.** The door swung as the reader scrolled past it,
which meant it was half-open by the time it left the screen. The scene is 300vh now with the stage
sticky inside it, so the view holds while the scroll drives the door: the first two thirds swing it
open, and the last third floods the green out from the doorway until it fills the screen and the
reader arrives in the Renter basics band that green belongs to.

**The flood's first keyframe is `scale(0)`, not `scale(1)`.** `animation-fill-mode: both` back-fills
the `from` keyframe for the entire scroll before the range opens, so a flood sized to the doorway at
`from` rendered as a full-size green rectangle sitting over the shut door from the moment the page
loaded. This is the kind of thing that only shows up in a screenshot.

**The door is drawn against a real one, 2026-08-25.** An MMI Door quarter fan lite four panel:
arched glass in the top quarter with grilles radiating from the sill, two panels above the lock rail
and two below, the door's own stiles left as a margin, and a brickmould casing around the frame.

**Redrawn in the doll house's pen, 2026-08-26.** The shape stayed and the palette changed. This door
and the exterior door in the doll house's entry room are the same object at two sizes, and they were
drawn by two different hands: the toy is flat shapes in one warm brown outline (§3.2), the hero was a
dark green slab with a gray architrave and no outline anywhere on it. The hero takes the toy's
palette now, matched piece for piece against `#obj-door` in the sprite — white casing, `--toy-wood`
slab, `--toy-sky-soft` arched glass, `--toy-wood-light` panels, a `--toy-butter` handle, and
`--toy-outline` around every one of them. The plate keeps the cream and brown of the name plates
under the doll house furniture.

That retired `--color-door-glass` and `--color-door-handle`, which existed only for this drawing.
Two tokens for one element were always the sign that the element was outside the system; the fix was
to bring the element in rather than to keep the tokens.

The doorway behind the door stays `--color-surface-brand`: the green the door opens onto is the
site's own, and it is the payoff the whole scene is built for.

**The title is signage.** A plate screwed across the lock rail, with a raised edge and a fixing at
each end, rather than lettering floating on the door face. It is still the page's `h1` and still the
first heading a screen reader reaches; only its presentation is a plaque.

**The page opens on a door, added 2026-08-24.** `/improvements` opened on a centered page title on a
white band, which said nothing the nav had not already said one line above it. It opens on a front
door now, with the title on the door, and the door swings on its hinge as the reader scrolls until
the Renter basics band behind it is what they are looking at. The metaphor is the site's own: the
home page is a doll house you look into, and this is the door you go in through.

The doorway behind the door is filled with `--color-surface-brand`, the same green as the Renter
basics band below it, so the light coming through the opening is the color of the thing being
revealed rather than an arbitrary panel. Scroll-progress driven rather than timed, the same
mechanism as the hero shoes (§3.1): scroll position is the animation's progress, so it reverses
when the reader scrolls back, stops when they stop, and needs no Pause button because nothing moves
on its own.

Gated the three ways the site's other scroll motion is (§7): `@supports`, because scroll-driven
animation is an enhancement; `prefers-reduced-motion` and the reduce-motion switch; and a 600px
floor, since a door swinging in a phone-width column is a door filling the screen. Under any of
those it stays shut and square on, with the title flat and fully legible, which is the state that
has to work anyway. The swing stops at 72 degrees rather than going flat to 90: past about 75 the
door is edge-on, the title is a line, and the reader loses what they were reading. The title sits in
the door's upper half rather than centered, which is where lettering on a real door goes and which
keeps it clear of the knob at the middle right.

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

### 3.6 Photographs in place of illustrations, added 2026-08-24

Until 2026-08-24 every improvement page opened with a hand-drawn SVG of the thing it was about,
drawn in the icon pen of §4 and given a small looping animation. Several of them did not survive
contact with a reader. At icon weight a shrink-film kit and a bare pane of glass are the same two
rectangles, a door sweep and a skirting board are the same line, and a power strip is a rectangle
with dots on it. The drawings were legible as decoration and ambiguous as information, which is the
wrong way round for the one image on the page.

**Every improvement page and the heating-systems intro now lead with a photograph** of the real
object. The rule for what stays drawn is whether the image teaches a mechanism or names an object.
A photograph cannot show refrigerant carrying heat the wrong way down a temperature gradient, air
moving both directions through the same gap, or which figure on a bill is the one that moves. Those
three stayed: the heat pump and furnace cutaways on `/learn/heating-systems` (§3.5), the draft
figure on `/learn/find-your-drafts`, and the bill figure on `/learn/read-your-bill`. Everything that
was drawing a noun became a photograph.

**Consequences worth noting.** `.motion-loop` now appears on three pages instead of eleven, so the
floating Pause button (§7) correctly stops appearing on pages with nothing to pause. The
`.improvement-illustration` rules and the five `illo-*` keyframes went with the drawings.

**Sourcing and credit.** Photographs come from Unsplash, chosen for what they show rather than for
how they look, and downloaded and committed rather than hotlinked, because AGENTS.md rule 6 means
nothing on the published site may load from another origin. Each is cropped to 4:3 (3:1 for a
full-width band), converted to WebP and held under about 200KB. Every one carries a visible credit
naming the photographer and linking to the page the file came from, which is both the licence
courtesy and this project's own rule that nothing appears without a traceable origin. The registry
is [docs/image-credits.md](docs/image-credits.md). No image on this site is AI-generated, and
`/about` says so.

### 3.7 The About page and the split incentive, added 2026-08-24

`/about` used to open with "Why this site exists" as three paragraphs of prose. The reason is a
structural one and prose was the wrong shape for it: in a rental the person who would pay for an
efficiency improvement is not the person who would save from it, so the improvement often does not
happen. Two parties, two ledgers, one building.

**The treatment.** One color field runs behind everything from the page title down to a converging
arrow: the tenant's side in the site's own dark green, the owner's in a deep slate that is
deliberately not another green, because two sides of one lease have to read as two places. Hovering
or focusing either side widens that side's share of the whole field rather than just its own panel,
so the emphasis reads as the lease tilting. The pattern is adapted from `split-incentives.html` on
the same team's heat pump site (S25), rebuilt in this site's tokens.

**Why it is safe as a hover effect.** Both panels carry all of their text at 50/50. The widening is
emphasis and nothing else, so a reader who never hovers and never focuses misses nothing. That is
what lets the whole thing be CSS: `:has()` on the container moves the field, matching how the
reduce-motion switch and the carousel already work, with no script involved. Below 860px the panels
stack and each takes its own color, since a vertical split would otherwise run down the middle of
each stacked panel.

**One variable drives both halves, fixed 2026-08-24.** The first build set the two background halves
to 58% and 50% and let flex resolve it. Flex items shrink to fit by default, so a pair whose bases
sum to 108% both shrink, and the seam moved about 3.7% instead of 8%: small enough that the effect
read as broken rather than as subtle. The panels moved separately again, on their own `flex-grow`,
so the color boundary and the text boundary travelled different distances. Both now read
`--split-pos` off the container, at 50% at rest and 62% or 38% on hover, so the seam and the text
are the same line and move as one.

**The color, decided the same day.** The owner's side opened as a deep slate blue on the reasoning
that two sides of one lease should read as two distinct places. It read as a different website. The
constraint that decides this is that the page title, the lede, the float card and the three approach
cards all cross the seam, and one element cannot take two text colors depending on which half it
sits over. Both halves therefore have to carry white text, which rules out pairing the dark green
with the light `--color-surface-brand`. It is the site's dark green against its mid green, 2.3:1
between the fields, which is enough to separate two large adjacent areas without either of them
leaving the palette.

**The opening block is laid across the seam on purpose.** Title on the tenant's side, the sentence
that names the problem on the owner's. Centering it instead put the smaller type across the join,
where one text color has to work on two fields at once and the eyebrow stopped being readable on
one of them.

**"How AI was used" lives on this page**, added 2026-08-24. It names the model, says what it wrote,
and states the three things held back from it: facts, which come from named sources and are gated by
`tools/check-content.mjs`; legal and safety content, which a person reviews; and the photographs,
which are existing work by named photographers rather than generated images. It links the full
prompt record in [docs/ai-use.md](docs/ai-use.md) and the standing rules in
[AGENTS.md](AGENTS.md). Disclosure belongs where a reader deciding whether to trust the page will
look, which is the page that already says who made it and how it is sourced.

### 3.8 My list, added 2026-08-25

F6 in [docs/features.md](docs/features.md), cut from v1 as "the largest cut and the first thing back
in v2".

**It is a shopping cart, on purpose.** Not because the site sells anything, but because that is the
one multi-step selection interaction every student already knows without being taught. The pattern
brings its own rules and they are the reason it works:

- **The control lives on the item**, not in a separate mode. An add button sits under the facts on
  each improvement page and on each library card.
- **Pressing it does not navigate away.** Adding a second improvement should cost one click from
  where you already are. A cart that jumps you to the checkout after every item is the thing
  everyone complains about.
- **The count is in the header and never moves.** It is a control rather than a section, so it sits
  outside the nav list and is shaped like a button.
- **The state is on the button.** `aria-pressed` plus a label that changes, because a pressed state
  nobody can see is not a state. One page-level live region announces the change, since a card
  button pressed with a mouse otherwise gives nothing back and "did that work" is the question a
  cart has to answer instantly.
- **Only one control is destructive**, and it is the only one that asks before acting.

**The list sorts by what the reader has to do**, not by what they picked. Buy this, ask your
landlord, do this. The buy list is the materials off every chosen improvement, each saying which one
it is for, so a trip to West Lebanon is one list rather than a page of prose. The ask list is only
the improvements needing permission, pointing at the email guide. The do list is a real checkbox
each, at 24px, because this is the one place on the site a reader ticks something off.

**Every improvement is in the page as markup**, and the script hides what is not on the list. Same
rule as the library (§3.4): the page carries its content and the script filters. With the script off
`/checklist` is the complete list of everything the site covers, which is still a usable thing to
print and take to the shop.

**Sharing is slugs in a query string.** No done flags, because what a roommate needs is which
improvements and not how far along you are, and the shorter the link the better it survives being
pasted into a message. Nothing personal is in it because there is nothing personal to put in it.

**A shared list is shown but not saved.** Opening a roommate's link is not a request to have your
own list replaced, so the page renders theirs, says so, and offers a Save button as the consent.
Saving merges rather than overwrites.

**Copy falls back twice.** Clipboard access can be refused and is absent over plain HTTP, so it
tries the share sheet next and a prompt after that, rather than leaving a button that looks like it
worked.

**Add all the ones that apply, added 2026-08-25.** A reader who has already answered the four
situation questions has told the site which improvements are theirs, and then had to press eleven
buttons to act on it. One control in the library toolbar adds everything currently showing. It
counts what is showing rather than what exists, so with a situation set it adds the personalized set
and with none set it adds all of them, and its label says which of those it is about to do. It is a
one-way control: there is no "remove all" next to it, because undoing eleven adds is what Clear the
list is for and two destructive controls on one toolbar is one too many. Once everything showing is
on the list it states that and stops being pressable, rather than sitting there looking like it
would do something.

**The empty state is a real empty state, revised 2026-08-25.** It was a bare paragraph, and
`base.css` caps every paragraph at the reading measure, so it rendered as a gray box against the
left edge of a 1140px page under a centered title. Centered now, and built like the thing it is: the
list icon at size, one sentence, and a button into `/improvements`. An empty state that names the
next action is worth more than one that only reports the emptiness.

**The doll house adds to the list too, added 2026-08-25.** The info bar under the house is the card
version of an improvement page, carrying the same badges and the same cost, time and impact facts,
and it was the one place those facts appeared without the control that acts on them. It has the add
button now, next to Learn more. Improvements only: an explainer is not something you can put on a
shopping list, and `/checklist` carries markup for the eleven improvements and nothing else.

Because the info bar is rebuilt on every open, the add control's click handling is delegated from
the document and its state is re-read on `todochange` rather than bound to the buttons present at
load. The alternative was for the doll house to reimplement the label, icon and `aria-pressed`
handling itself, which is how two controls that are supposed to be one control drift apart.

**The add control never sits inside a callout, fixed 2026-08-25.** On `/improvements/door-sweeps-and-weatherstripping`
the actions paragraph had been left inside the permission callout's own element, so the button
rendered inside the tinted "ask your landlord first" panel and read as part of the warning rather
than as the page's primary action. It is the only page with a permission callout in its intro, and
so the only page where the mistake was possible; the other ten put the actions paragraph directly
after the fact row and are unchanged.

**The three approach cards got a ground of their own, revised 2026-08-26.** They were a translucent
white border and nothing else, sitting straight on the color field. The field is two greens with a
seam down the middle of the page, and the middle card sat on top of that seam, so one paragraph's
background changed color halfway along the line. They carry their own dark ground now, one shade
below both halves, blurred where `backdrop-filter` exists so the field still shows through them and
opaque where it does not. White measures 9.2:1 over the blurred version and 11.6:1 over the
fallback, both against the lighter half.

**Hanover is a photograph of Hanover now, revised 2026-08-26.** "Hanover in particular" was
illustrated with a stock brick apartment block that could have been any town in the country, under a
heading whose entire job is to say this one. It is a view of the town from the ridge above it
instead. That photograph is the site's one non-Unsplash image and its one share-alike obligation;
[docs/image-credits.md](docs/image-credits.md) records why, and why the Town of Hanover's own aerial
photograph is not the file committed here.

### 3.9 The programs page, revised 2026-08-25

`/programs` is the page a renter arrives at holding a question their landlord asked, or holding a
bill they cannot pay. Seven programs, and only three of them are things a renter can start on their
own. Three changes make that page usable at the size it has grown to.

**The carousel runs the full width of the window.** It was inside the 1140px page shell, which put a
46rem slide in a 71rem box and left the peek gutters doing very little. A program entry is the
longest card on the site, so the width is worth having: the band it sits in is full-bleed, the
gutters are wide enough for the neighbors to actually peek, and the heading and the filter row
above it stay inside the reading column, which is the same "background spans the window, text stays
put" arrangement the Renter basics band uses.

**A program card opens rather than unrolls.** The Window Inserts entry is two paragraphs and six
definition pairs, which is taller than a laptop screen on its own, and a carousel taller than the
window is a carousel whose controls you cannot see while you read it. Each card now shows its
badges, its heading and its first paragraph, and everything after that sits behind a "Show more"
disclosure on the card. `<details>` rather than a scripted panel, per the site's own rule, so it
works with no JavaScript and a browser find-in-page can still open it. The card is capped in height
as well, with its own scrollbar past that cap, so a reader who opens every disclosure on the tallest
card still cannot push the carousel past the bottom of the window.

**Filtering asks the two questions a renter actually has.** Who has to sign, and what does it help
with. The first is the site's existing permission spine, worded for a program rather than for an
improvement: nothing, your landlord approves it, your landlord applies. The second sorts by what the
money or the loan is for: weatherizing the building, paying the bill, borrowing equipment, choosing
your electricity supply. Two `<select>`s in a plain form, no Apply button, and a live count next to
them.

Same rule as the library (§3.4) and the doll house (§3.2): the page carries every program as markup
and the script hides what does not match. With JavaScript off the form is inert and all seven
programs are there, which is the state the page shipped in. The carousel had to learn about hidden
slides for this — its count, its Previous and Next targets and its centered-slide tracking all read
the showing slides now rather than a list captured at load.

"Programs that are not for you" stays outside the carousel and outside the filter. It is one entry,
it exists to be ruled out, and a filter that can hide it defeats the point of writing it down.

### 3.10 Page heroes, added 2026-08-26

The home page opens on a doormat and `/improvements` opens on a door. Everything else reachable from
the nav opened on a centered title over white, which made those pages read as the reference material
behind the two that had been designed. Three of them have a drawn scene now, in the doll house's pen
(§3.2): flat shapes, one outline weight, the toy palette for anything that is a physical object and
the site's greens for anything that is a mark on it.

| Page | The scene | What it does on scroll |
|---|---|---|
| `/your-rights` | A wall thermometer with the state minimum marked on it | The column rises to the 65°F line and stops there |
| `/programs` | Three application forms, one per permission state, in that state's badge color | They fan apart, and a tick lands on the one a renter can sign |
| `/checklist` | A clipboard with four lines | Three ticks draw themselves in, one after another |

**Every scene is `aria-hidden`, and nothing in one is the only place its content appears.** The
65°F is written out in the first key point on that page, the three permission states are on every
program in the list, and the checkboxes on the clipboard are a drawing of the real ones below it.
That is what makes it safe for the scenes to be the part of the page that moves.

**Every scene's resting state is its finished state.** Motion is scroll-driven and gated the site's
three ways (§7), and a timeline that never advances leaves a thermometer reading 65, three fanned
forms and three drawn ticks. A drawing that needs the animation to have run in order to make sense
is a drawing that fails on a browser without scroll timelines, which is the same rule the story bars
and the door already follow.

**The layout is one grid**, words beside scene, stacked below 800px with the scene first so a phone
still opens on the drawing. The two halves drift at different rates as the hero leaves, which is the
multi-level parallax the rest of the site's scroll motion uses.

`/about` is the fourth nav page and keeps its own opening, the split color field of §3.7. It was
already the most distinctive page on the site and adding a scene to it would have been a second
subject competing with the one it is about.

**Every list ticks off, revised 2026-08-26.** The do list had the only checkboxes on the site, which
left the two lists a reader actually walks around holding — the shop list and the list of things to
raise with the landlord — as the two they could not cross anything off. Both have them now, at the
same 24px, with the material's own name as the label so the target is the word and not just the box.

A slug alone could not carry them. One improvement puts three materials in the buy list and one row
in the ask list, and those are four separate things to tick at four different moments, so the stored
entry grew a `ticks` array beside its `done` flag. A tick id only has to be unique within its own
improvement, so the markup writes short ones, and removing the improvement takes its ticks with it
rather than leaving them orphaned in storage.

**The email writes itself, added 2026-08-26.** The ask section said "send one email covering all of
these" and then offered no way to send one. It now ends in a draft built from whichever ask rows are
showing: one numbered paragraph each, saying what the work is, what the materials cost and whether it
comes off at move-out, wrapped in the six things `/learn/ask-your-landlord` says a good ask has in
it — one specific thing per paragraph, what it costs, who pays, what is in it for them, and a date
to answer by.

Three decisions hold it together:

- **None of the prose is in the script.** Every fixed sentence is in the page's markup, in a hidden
  template block with braced slots, and every per-improvement sentence is in that improvement's own
  ask row. `assets/js/ask-email.mjs` decides which sentences apply and in what order, which is the
  part worth unit-testing, and it is tested. The content conventions say prose belongs in the
  markup; a generated email is not an exception to that.
- **Nothing typed into it is stored.** The landlord's name, the apartment and the date are the three
  things only the reader knows, and they are exactly what
  [docs/project-brief.md](docs/project-brief.md)'s non-goals rule out keeping. They are read on
  every keystroke and written down nowhere, and the `mailto:` link carries no address, because who
  the reader's landlord is is not something this site knows or wants to.
- **An edited draft is theirs.** From the first keystroke in the textarea the generator stops
  rewriting it. Regenerating over the top of somebody's edit is the one thing this must not do.

With the script off, the textarea already holds a complete, sendable example covering the general
case, which is the same rule the rest of the page follows: the markup is the content and the script
narrows it.

**One sentence is conditional.** "I would buy the materials and do the work myself" is about buying
and fitting, and one of the four ask rows is telling a landlord you will be away over the break,
which is neither. The row carries a `data-ask-diy` marker and the sentence only goes in when
something on the list is actually work the reader would do.

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
| `--color-room-plate` | `rgba(251, 244, 231, 0.94)` | The plate a doll house piece's name sits on, so a caption crossing from wallpaper onto floorboards keeps one contrast (declared 2026-08-26) | ☑ 15.9:1 with `--color-text` |
| `--color-guide-halo` | `rgba(126, 218, 93, 0.55)` | The ring on the piece carrying "Start here" or "Next" (declared 2026-08-26) | Decorative, never carries text |
| `--color-guide-glow` | `rgba(126, 218, 93, 0.9)` | The glow on the piece whose info bar is open (added 2026-08-26) | Decorative, never carries text |
| `--color-approach-card` | `rgba(6, 48, 31, 0.72)` | The three approach cards on `/about`, where `backdrop-filter` is unavailable (added 2026-08-26) | ☑ 11.6:1 with white |
| `--color-approach-card-blur` | `rgba(6, 48, 31, 0.45)` | The same three, blurred (added 2026-08-26) | ☑ 9.2:1 with white |
| `--color-surface-dark-2` | `#0B573A` | The second of a pair of story bars, so the seam between them is visible (added 2026-08-26) | ☑ 8.6:1 with white, 1.7:1 against `--color-surface-dark` |
| `--color-mat` | `#D9BE8A` | Added 2026-08-19. The hero's welcome-mat background. Used nowhere else | ☑ 9.3:1 with `--color-text` |
| `--color-mat-border` | `#000000` | Added 2026-08-19. The hero mat's literal black border. Used nowhere else | ☑ 11.7:1 on `--color-mat` |
| `--color-hero-ground` | `#94A0A7` | Added 2026-08-19. The hero section's own background, behind the mat. A bluestone grey, used nowhere else | ☑ 6.3:1 with `--color-text`, 7.9:1 with `--color-mat-border` |
| `--motion-slow` / `--motion-ease-smooth` | `450ms` / `cubic-bezier(0.4, 0, 0.2, 1)` | Added 2026-08-25. For something large and continuous, where `--motion-base`'s 200ms and sharp-out curve make a half-page of colour snap rather than slide. The About page's split field is the only user | n/a |
| `--color-split-tenant` | `#06301F` | Added 2026-08-24. The tenant's half of the About page's split field (§3.7). The same value as `--color-surface-dark`, named separately because it is one of a pair | ☑ 14.5:1 with white |
| `--color-split-owner` | `#0A6E4B` | Added 2026-08-24 as a deep slate blue, changed the same day. Both halves have to carry white text, since the title, the lede, the float card and the approach cards all cross the seam and one element cannot take two text colours, so pairing the dark green with the light `--color-surface-brand` was out. This is the site's mid green instead, 2.3:1 against the tenant's half | ☑ 6.3:1 with white |

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
| Room prop (experiment, 2026-08-25) | Scenery inside a furnished room. Sixteen furniture symbols in the sprite, each in a viewBox of its own proportion, drawn with a non-scaling stroke. No name, no interactive state, `aria-hidden`, never focusable — the absence of all three is what says it is not the thing to press | standing on the floor (`--b`), hung on the wall (`--y`), hidden below 1000px |
| Hotspot | The tappable thing in a room | default, hover, focus-visible, selected (its info bar is the one open, added 2026-08-19; a glow and a scale rather than an outline, revised 2026-08-26), visited (reduced opacity, revised 2026-08-19, was accent fill plus flag marker; never applied to the selected piece, revised 2026-08-26), hidden (does not apply to the student's situation — reversed 2026-08-20, was dimmed with a text reason, see §3.2), 44px hit area |
| Info bar | Opens under the drawing with the short answer | closed, opening, open, empty, error, no JavaScript (becomes a link) |
| Flip card | Flashcards for myths and definitions | front, back, focus-visible, reduced motion. Spec in §5.1 |
| Carousel | Ordered walkthroughs and before-and-after pairs | first, middle, last, keyboard, no JavaScript. Spec in §5.1 |
| Animated diagram | Shows a mechanism the student cannot see, for example where heat leaves a room | static (first frame), playing, finished, replay, reduced motion, no JavaScript. Spec in §5.1 |
| Sticky progress bar | Progress through the house, and position within a long page | at rest, condensed, unstuck on short viewports, no JavaScript. Fill capped at 100% regardless of the raw ratio (added 2026-08-20) |
| Progress reset (added 2026-08-20) | Clears visited state and restores "Start here," sitting in the same sticky row as the progress bar | default, hover, focus-visible |
| Disclosure bar | "What if my landlord says no", "How we know this", "Everything in this house" (2026-08-21) | closed, open, focus-visible, deep-linked open |
| Story bar (added 2026-08-20) | "Why this works" and "Savings" on an improvement page — a full-width, always-open band, heading on one side at a larger size, body on the other. `.story-bar--reverse` swaps which side is which. Spec in §5.1 | default, pinned as half a screen in a pair (revised 2026-08-26), parallax entrance running, held still (reduced motion or `animation-timeline: view()` unsupported), off below 600px |
| Key point (added 2026-08-26) | What a story bar is when it is alone: a heavy brand rule, a heading in a sticky column, the body beside it. No band and no full screen. §8 | default, heading pinned, heading released, stacked below 800px, reduced motion (nothing pins) |
| Step list (added 2026-08-26) | A numbered sequence, each step a heading and a paragraph with its numeral in a filled square. §8 | default, arriving (number scales, body slides), held still |
| Steps track (added 2026-08-26) | The step list turned on its side above 900px: a scroll-snap row of cards running off the right edge. A real scroll container, not a scroll-hijacked one | column (below 900px, and in print), row, focused (the track takes the focus ring), card arriving |
| Band (added 2026-08-26) | A full-bleed tinted stretch that is a section rather than a decoration inside one | light, brand, dark |
| Page hero (added 2026-08-26) | The opening of a nav page: words beside a drawn scene, the two drifting at different rates. §3.10 | default, scene animating, scene at rest (reduced motion, or no scroll timelines), stacked below 800px with the scene first |
| Email draft (added 2026-08-26) | On `/checklist`, under the ask list: three fields, a subject, and a message built from whichever ask rows are showing. §3.8 | hidden (nothing to ask about), generated, edited by the reader (generation stops), copied, copy refused (falls back to selecting the textarea), no JavaScript (a complete general-case example) |
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
| Photograph | A credited photo, `4:3` in a page, `3:1` as a full-width band (§3.6) | inline, intro, band |
| Story stack | A run of adjacent story bars that pins and stacks as the reader scrolls | default only |
| Add to list | The cart control on an improvement page, on a library card, and in the doll house info bar (§3.8). Click handling is delegated, so a copy built after page load behaves like the ones in the markup | article, card, info bar, on the list, added, removed |
| Add all showing (added 2026-08-25) | One press puts every improvement currently showing in the library on the list (§3.8) | default, hover, focus-visible, everything already added (states so and stops being pressable) |
| Empty state (revised 2026-08-25) | What `/checklist` and the library show when there is nothing to show. Centred, with an icon, one sentence and the next action | list empty, no improvement matches the situation |
| List row | One item on `/checklist`, with its own checkbox | buy, ask, do |
| Info panel | A photo and a short block of text side by side inside a tinted band | default, reverse |
| Source and last-reviewed block | "How we know this". Links plus an ISO date | open by default on detail pages, collapsed to a count on cards |
| Glossary term | Inline definition on first use. Hover over or focus the underlined term to view the definition, which carries a link to the full entry. The gap between term and panel is bridged so the pointer can reach that link | closed, open, focus-visible, opening upward, opening downward (`--below`), anchored right (`--end`) |
| Program card | An NHSaves or assistance program | NH, out-of-state (explicitly labeled), eligibility unknown, collapsed and expanded (the "Show more" disclosure, added 2026-08-25), filtered out |
| Program filter (added 2026-08-25) | Two selects over `/programs`: who has to sign, and what it helps with (§3.9) | default, focus-visible, no match, no JavaScript (inert, every program shows) |
| Button | Primary, secondary, text | default, hover, focus-visible, active, disabled, loading |
| Skip link | First focusable element on every page | hidden, focused |

**Story bars stack, added 2026-08-25.** A run of adjacent story bars pins to the top of the window
one after another and builds a stack, then the whole stack scrolls away together. The wrapper is the
load-bearing part: `position: sticky` is bounded by the element's containing block, so without a
`.story-stack` around them the first bar would pin at the top of the window and stay there for the
rest of the article, sitting over the steps the reader had moved on to.

Every child of a stack is a story bar, which is why `nth-of-type` can index them there and could not
have out in the article, where the bars are siblings of the body columns and every one of those is a
`div` too. The stack carries a `padding-bottom` because the last bar has nothing below it inside the
stack: without it the stack's bottom edge arrives at the same moment the bar does and it releases
without ever holding.

Gated on width, on height, and on both reduced-motion controls. A pinned full-width band on a short
window is a band covering the thing the reader is trying to read, and a reader who has asked for
less movement has asked for exactly this. Outside the gate they are ordinary stacked bands with
their own margins, which is what they were before.

**One card for every disclaimer, unified 2026-08-24.** The callout variants had drifted apart in a
way that only shows up when you look at them all at once. A permission note on one improvement page
carried no icon at all. Both legal notes borrowed the safety warning triangle, which is the one icon
on the site that should mean "this could hurt you". A legal note on `/your-rights` was wearing the
red safety variant outright. Every variant now shares one card: same padding, radius, gap, icon
size, type size, and a 4px leading rule. They differ in the rule colour and the icon, and the icon
per kind is now legal → document, safety → warning triangle, savings → gauge, permission → speech
bubble.

Safety is the one variant that keeps a tinted background, and that is a content decision rather than
a style one. AGENTS.md rule 3 treats space heaters, carbon monoxide and electrical load as a
category that must not read as one more caveat. It is still the same card, and the word "Safety"
carries the meaning on its own for a reader who cannot see the colour, so the tint is reinforcement
and never the only signal (§4).

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
- **The switch track color** is a token rather than one hard-coded translucent white serving both a
  dark footer and a light floating control. The footer switch has since been removed, so the token
  has one value again. See §7.
- **Hard-coded `#fff`** in component rules is `--color-text-on-dark` where it means "text on a dark
  surface". The token existed and half the rules were already using it.

Also folded in rather than reinvented: "Everything in this house" is now the existing disclosure
bar (§3.2), and the price dollar scale now has one mapping read by the cards, the info bar and the
improvement pages (§4) instead of three renderings of the same idea.

**Tactile hover, added 2026-08-19.** Every button-like control (`.btn`, hotspots, the FAB, the
scroll cue, cards, carousel slides, filter chips, carousel controls, the dialog close button)
grows slightly on hover, a `transform: scale()` response transition under the same `--motion-duration-base` token
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
  progressive enhancement; off under `prefers-reduced-motion: reduce` or the reduce-motion switch; off
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

- **Where:** revised 2026-08-21, twice. It sits in a floating control of its own, fixed to the
  bottom-left corner of every page, paired with the Pause button (below). The footer copy it
  shipped with is gone: the floating control is on screen at every scroll position, including the
  bottom of the page, so the second switch was a duplicate of a control the student could already
  see, and two switches for one setting is one more thing to keep in agreement than the setting is
  worth. `assets/js/motion.js` still holds every `.reduce-motion-input` on a page in sync, since
  that is what makes a page with more than one copy safe, and nothing about the rule depends on
  there being exactly one today. Labeled "Reduce motion" with a visible text label, never an icon
  alone, except in the compact form below 640px where the label goes visually hidden and the
  accessible name carries it.
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

**Contrast, fixed 2026-08-21.** The switch track was drawn in translucent white, which was correct
in the dark footer it was built for and nearly invisible once the same switch appeared on the light
floating control. The track color became a token so one value did not have to serve both places:
`--color-border-strong` (4.1:1, over the 3:1 WCAG 1.4.11 asks of a control boundary), with
`.site-footer` overriding it back to translucent white. The footer switch was removed later the
same day and the override went with it, leaving the token with a single value. It stays a token
rather than folding back into the rule, because the reason it became one — a control that appears
on surfaces of different lightness — is a property of the switch, not of the footer. The floating
control also takes a `--color-border-strong` border and full-strength `--color-text` labels, so it
reads as a control sitting on the page rather than a pale shape floating over it.

**What reduced motion changes,** whether it came from the operating system or from the toggle,
specified per pattern rather than as a blanket rule: parallax layers hold still, looping diagrams
render in their finished frame and offer "Play" for a single run, a room box switches to its
enlarged state without growing, flip cards swap without rotating, disclosure bars open without
sliding, info bars appear without animating, scroll-expanding bands render finished, the sticky bar
stops condensing, and carousel and anchor scrolling become instant (`scroll-behavior: auto`). Every
response transition resolves to 1ms. No component loses a state, a control, or a piece of content.

**Microinteractions, added 2026-08-26.** Three, all response rather than ambient, all behind
`prefers-reduced-motion` and the switch, and all losing nothing that carries meaning when they are
off.

- **Magnetic hover** on primary buttons and the Personalize FAB. The control leans a few pixels
  toward the pointer while the pointer is over it and lets go when it leaves. Four gates before it
  does anything: a fine pointer (a magnet has nothing to follow on a touch screen, where the first
  the element hears about the pointer is the tap that already landed), the media query, the switch,
  and a `--magnet-range` that only exists inside the gate — so `assets/js/magnetic.js` reads zero
  and does nothing rather than the CSS having to undo it. The offset is written to a custom property
  and applied with `translate` rather than `transform`, so a button that already lifts on hover
  keeps doing that and leans as well.
- **The list count pings** when something is added to it. The oldest cart problem there is: the
  button is under the reader's finger and the number that changed is in the far corner of the
  screen. A ring expands out of the control once and the count bumps. Adding only — a removal is
  already confirmed by the button under the pointer changing back, and a badge that flashes on the
  way down reads like something went wrong. The page-level live region has already said it out loud
  either way.
- **The add button's plus turns into a tick.** `assets/js/todo.js` swaps which sprite symbol the
  `<use>` points at, which is instant and correct and reads as the icon having been replaced rather
  than as the thing the reader just did. Rotating and squeezing through the swap gives the change a
  direction. The animation fires on its own, because the selector only starts matching when
  `aria-pressed` flips.

**Scroll reveals, added 2026-08-26.** Section headings wipe in from behind their own baseline as
they reach the viewport, `clip-path` rather than `overflow: hidden` so a descender and a focus ring
are not clipped with them. Step numbers scale up as their step arrives and step bodies slide in from
the side. All of it is `animation-timeline: view()` behind `@supports`, the media query, the switch
and a 600px floor, and all of it is transform-only or clip-only for the reason the story bars are: a
timeline that never advances leaves the element wherever the range started, and that has to be fully
legible, full-contrast text.

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

### Section furniture, revised 2026-08-26

Five things a page can be made of, beyond a paragraph. The rules above say to reach for a paragraph
last; these are what to reach for first.

**The story stack.** Two full-bleed dark bands that pin one after the other and, once both are
locked, fill the screen together. Reserved for the pair of connective explanations on an improvement
page, "Why this works" and "Savings", where one alternates its heading to the other side so the two
read as a matched pair.

Rebuilt 2026-08-26. Each bar used to be `min-height: 100vh` and pin 4.5rem below the one before it,
which had two consequences: a two-sentence "Savings" panel was given a whole viewport to sit in the
middle of, and what a reader watched happen was one panel sliding over another. The pair splits the
screen now, first bar in the top half and second in the bottom, so the stack is one full-height
section assembled out of two pieces rather than two full-height sections in a row. The share is set
off the count with `:has()`, so a stack of three would take thirds.

The band went from `--color-surface` to the site's two darks at the same time. A bar carrying the
one idea a page turns on had been sitting on the same near-white green as the cards and the
callouts, which made it read as more page rather than as a break in it. Two darks rather than one,
for the reason the About page's two halves are two darks (§3.7): a seam between two fields of the
same color is not a seam.

**The key point.** What a story bar becomes when it is alone. Nine pages carried a single bar inside
a stack, which meant a full-bleed band, a display-size heading and a screen of height for two
sentences, with nothing to stack against and so none of the arrival the treatment exists for. A band
that big earns its size by being one of a pair.

A key point is no band, no break in the page's background, and no full screen. The heading sits in a
column beside the body and stays there while the body scrolls past it, which keeps the "holds still
for a moment" quality at a fraction of the cost, and a heavy brand rule down the left marks it as
the page's turning point. It takes exactly the height of its own content.

**The step list.** A numbered sequence where each step is a heading and a paragraph, with the
numeral in a filled square beside it. Adapted from the "Ways to close the gap" list on the same
team's heat pump site (S25). It replaces a run of `<li>` items that each opened with a bold phrase:
the phrases were already headings, and formatting them as headings is what makes the sequence
scannable without reading the sentences around it.

The numeral is not `aria-hidden`. `list-style: none` is enough for some engines to drop list
semantics, which takes the ordinal with it, so the number stays in the accessible name where it
cannot be lost.

**The steps track.** The step list turned on its side. Below 900px, and in print, it is the step list
again; above it the same list becomes a row of cards running off the right edge of the window, so a
sequence reads as continuing rather than as a grid that happens to have seven cells.

It is a real scroll container with `tabindex="0"`, not a track driven by page scroll. That is a
decision about keyboard access rather than about taste: a scroll-hijacked row moves content out of
view without moving focus, so a keyboard reader can land on a link nobody can see. Here arrow keys
move the row, focus inside a card scrolls that card into view by itself, and `scroll-snap` stops
between cards rather than mid-sentence. `scroll-padding-inline-start` has to match the row's start
inset exactly, or the first card snaps flush to the window edge and the row starts a page gutter to
the left of its own heading.

**The band.** A full-bleed tinted stretch that is a section of the page rather than a decoration
inside one. `/programs` was one white column from the title to the sources, so the carousel — the
part a reader came for — began with nothing marking it as a different kind of thing from the two
paragraphs above it. The tint is what a band is for; the extra vertical room is what makes the tint
read as a section break instead of a highlighted paragraph.

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
| Guided start | "Start here" on the bill hotspot, until the first spot is opened |
| Next spot control | "Next spot: the thermostat" |
| Last spot | "That is all eleven spots. View everything in one list." |
| Back control | "Back to the house" |
| Hotspot accessible name | "Living room window: Sealing gaps here improves energy efficiency significantly" |
| Hotspot, does not apply | "Your landlord pays for heat, so this one saves them money and not you." |
| Progress bar | "You have viewed 3 of 11 spots." |
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
- **Footer links, revised 2026-08-21.** "Accessibility statement" and "View the source code" sat a
  full line apart, because each carried the site's 44px `--target-min` as a `min-height` and the
  column added a gap on top of that. Two related links reading as two unrelated blocks. They sit at
  ordinary line spacing now, as a pair. The touch target does not go away with the `min-height`:
  the column is a list of links one after another, which is the case WCAG 2.5.8's inline exception
  covers, and each link still clears the 24px AA floor on its own through the row's padding. The
  site's own 44px commitment (§6) stays where it applies, on standalone controls rather than on a
  run of text links.
- **Reduce motion leaves the footer, 2026-08-21.** The switch had a copy here and a copy in the
  bottom-left floating control. The floating control is visible at the bottom of the page too, so
  the footer copy duplicated a control already on screen. See §7.
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
| Ten hotspots in v1, or fewer done better? | 10 as listed in §3.2 / 6 covering only the Must topics | Eleven, after the heating systems explainer got one 2026-08-21 (§3.2) | 2026-08-21 |
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
