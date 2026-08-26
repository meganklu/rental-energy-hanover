# Features & Interaction Spec

> **Status:** ● Complete · **Last updated:** 2026-08-19 · **Owner:** Megan

The interactive experience is this project's reason for existing. Sustainable Hanover already
publishes static text on weatherization, so anything here that could have been a paragraph should
have been a paragraph. This document is the most rigorous one in the set because it is where that
claim gets tested feature by feature.

Read alongside [DESIGN.md](../DESIGN.md), which specifies how these look and behave, and
[architecture.md](architecture.md) §5, which specifies how they are built with no build step.

## 1. Interaction philosophy

Interactive here means the student acts and the site answers with something specific to them.
For example, they might click a window in a drawing of a house to learn about a potential improvement, 
along with its cost, permission status, and instructions. Interaction is also how the
site handles the gap this audience (student renters) actually has: lack of experience with home maintenance 
and rental agreements, specifically in the context of shorter lease periods.

A feature earns its place only if it produces something a static page could not: a view
narrowed to the student's own situation, a correction they discover by acting rather than by
reading, or an answer they can act on within the same minute. A feature that fails this test gets
written as a page instead.

## 2. Feature candidates

| ID | Feature | What the student gets | Effort | Priority |
|---|---|---|---|---|
| F1 | Doll house walkthrough | A spatial way into every improvement. Click the room, click the thing, get the answer | High (illustration) | **Must** |
| F2 | Situation selector and filtering | Every list on the site narrowed to their heat type, who pays, lease length and phase | Medium | **Must** |
| F3 | Flip-card myth busters | A wrong belief corrected by their own action, on the explainer pages | Low (code), Medium (copy) | **Must** |
| F4 | Animated explainer diagrams | A mechanism they cannot see, shown moving. Where heat leaves, how a heat pump runs both ways | Low (code), High (illustration) | **Must** |
| F5 | Progress through the house | A count of spots viewed, and a suggested order for someone who does not know where to start | Low | **Should** (part of F1) |
| F6 | My list | Improvements they picked, sorted into buy / ask / do, printable, shareable, and with a landlord email built from the ask list | Medium | **Shipped 2026-08-25**, extended 2026-08-26 |
| F7 | Space heater cost-per-hour tool | The real hourly cost of the most expensive misconception in the topic inventory | Low (code), blocked on sourcing | **Won't (v1)** |
| F8 | Bill estimator | An explanation of what is driving a specific bill | High | **Won't (v1)** |
| F9 | Landlord request letter generator | Wording for an ask they are nervous about making | Medium | **Won't (v1)** |
| F10 | Roommate agreement builder for shared utilities | A written agreement about the thermostat | Medium | **Won't** |
| F11 | Knowledge check quiz | A score | Low | **Won't** |

Priority: **Must** / **Should** / **Could** / **Won't (v1)**

## 3. Prioritization rationale

**In v1: F1, F2, F3, F4, F5 as part of F1, and F6 as of 2026-08-25.**

- **F1** is the site. Everything else is reachable from it, and it is the only feature that answers
  "where do I even start" without asking the student to phrase a question.
- **F2** is what makes the advice correct rather than merely present. `appliesToPayer` is the field
  that decides whether a recommendation saves the student money or saves their landlord money, and
  a site that gets that wrong loses credibility on first contact. Per
  [DESIGN.md](../DESIGN.md) §3.1 it is optional and reachable from the header chip, so it narrows
  the site for students who want that and blocks nobody who does not.
- **F3 and F4** carry the explainer pages. Together they are the reason `/learn` is not prose.

  **F4's scope narrowed 2026-08-24.** It had spread to every content page: each improvement carried
  a small drawn illustration with its own loop. Most of those were drawing a noun, not a mechanism,
  and at icon weight several were ambiguous about which noun. Photographs replaced them
  ([DESIGN.md](../DESIGN.md) §3.6). F4 now covers three figures, and the test for adding a fourth is
  whether a photograph could carry the same point: the heat pump and furnace cutaways, air moving
  both ways through a gap, and which figure on a bill is the one that moves. A useful side effect is
  that `.motion-loop` appears on three pages instead of eleven, so the floating Pause button (WCAG
  2.2.2) stops appearing on pages with nothing to pause.
  Their code cost is close to zero, since both are CSS on markup that already exists.
- **F5** is a few lines on top of F1 and it is the difference between a house a student pokes at
  twice and one they finish.

**Cut from v1:**

- **F6 shipped 2026-08-25**, and it was indeed the first thing back. It came in narrower than the
  original spec in one way and wider in another. Narrower: it is not phase-generated. The site does
  not decide what belongs on the list, the reader does, which removed the hardest part of the
  original design and is also more honest about who knows their own apartment. Wider: it sorts into
  buy, ask and do rather than being one flat checklist, and it shares by link as well as printing.
  The five checklist item states the original spec called for came down to two, done and not done,
  because the other three were describing the item rather than the reader's progress and the
  improvement page already carries those. See [DESIGN.md](../DESIGN.md) §3.8.

  Revised 2026-08-25, the same day: one press in the library toolbar adds every improvement
  currently showing, which is the personalized set once F2's four questions are answered. That is
  the closest this feature gets to the original spec's generated list, and it keeps the reader as
  the one who decides, since they press it. The doll house info bar gained the same add control, so
  every place the site states an improvement's cost, time and impact now also offers the action on
  it.

  Revised 2026-08-26, twice. The buy and ask lists tick off now, which they should have from the
  start: the do list had the only checkboxes on the site, and the two lists a reader actually walks
  around holding were the two they could not cross anything off. And the ask section ends in a
  generated email. It had said "send one email covering all of these" since it shipped, and then
  offered no way to send one; the draft is built from whichever ask rows are showing, following the
  six things `/learn/ask-your-landlord` says a good ask has in it. Nothing typed into it is stored,
  which keeps the feature inside [project-brief.md](project-brief.md)'s non-goals, and the composing
  logic is a module with its own tests rather than a string in a click handler. See
  [DESIGN.md](../DESIGN.md) §3.8.
- **F7 and F8** are blocked by sourcing rather than by effort.
  [content-strategy.md](content-strategy.md) §4 bars unsourced numbers, and the Liberty Utilities
  residential rate is not yet in [sources.md](sources.md). A cost-per-hour figure with no citation
  fails `tools/check-content.mjs` and should. F7 is small once the rate exists, so it is the second
  thing into v2.
- **F9** is explicitly deferred in [project-brief.md](project-brief.md) §7.
- **F10** asks students to negotiate with roommates in writing, which is a social problem the site
  cannot fix and should not pretend to.
- **F11** returns a score. See §1.

## 4. Feature specs

### F1 — Doll house walkthrough

**Hypothesis**
> If a student clicks a room and then an object in it, they will find improvements they would never
> have searched for, because they do not know the vocabulary to search with. We believe this
> matters because the audience gap is not a shortage of information, it is not knowing what to ask.

**Which audience gap does this close?**
Every row of [audience.md](audience.md) §3 that starts "does not know that". A student cannot search
for a rim joist. They can click a basement.

**User story**
> As a renter who has a high electricity bill and does not know why, I want to point at the part of my apartment that
> seems wrong, so that I get advice about that thing instead of a list of everything.

**Inputs from the user**

| Input | Type | Required? | Why we need it | Default |
|---|---|---|---|---|
| Room chosen | click or Enter on a room box | No | Decides which hotspots show | Whole house, nothing enlarged |
| Hotspot chosen | click or Enter on a hotspot | No | Decides which info bar opens | None open |
| Situation, if set (F2) | inherited | No | Dims hotspots that do not apply | All hotspots live |

**Output the user receives**
An info bar holding the improvement title, permission and reversibility badges, cost and time, one
sentence, a link to the full improvement page, and a "Next spot" control. Ten hotspots, six rooms,
per [DESIGN.md](../DESIGN.md) §3.2.

**Logic / rules**
Static mapping from hotspot to content item, defined in the markup. No scoring, no computation, no
numbers generated at runtime. With F2 set, a hotspot whose improvement does not match
`appliesToHeat` or `appliesToPayer` dims and states why in text. It stays clickable.

**Edge cases**
- The student's unit has no basement or no porch. The house is an example residence, so the room
  opens anyway and the advice inside it still travels.
- Every hotspot in a room is dimmed by their situation. The room still opens and says why.
- A student arrives at `/#kitchen` from a shared link with no situation set. The room opens, nothing
  is dimmed.
- A student opens the last spot first. "Next spot" wraps to the first unvisited one.

**Failure / empty states**
There is no failure state, because there is no fetch and no computation. If JavaScript never runs,
hotspots are links to their improvement pages and the room-by-room list under the drawing carries
all ten.

**Accessibility requirements**
Specified in full in [DESIGN.md](../DESIGN.md) §3.2 and [accessibility.md](accessibility.md) §3.
The load-bearing parts: rooms and hotspots are real buttons and links with accessible names, tab
order runs in visual order, focus moves to the info bar heading on open and returns to the hotspot
on Escape, and the room-by-room link list is never hidden from assistive technology.

**Does it work without JavaScript / on a slow connection?**
Yes. Room enlarging is `:target`, hotspots are links. The SVG is inline and capped at 40 KB.

**Data persistence**
Which spots have been viewed, in `sessionStorage`, no identifiers. Cleared when the tab closes.
The current room is in the URL fragment.

**Acceptance criteria**
- [ ] Every one of the ten hotspots reaches its improvement page with JavaScript disabled
- [ ] Tab alone reaches every room and every hotspot, in the order they appear on screen
- [ ] Escape closes an open info bar and returns focus to the hotspot that opened it
- [ ] With a situation set that excludes an improvement, its hotspot dims and states a text reason
- [ ] The room-by-room link list is present in the DOM at every viewport width
- [ ] A screen reader announces the room name and its hotspot count when a room is enlarged
- [ ] The page reflows at 320px with no horizontal scrolling, with the list replacing the drawing

**How we'll know it works**
Usability round 2, per [research-plan.md](research-plan.md) §3. Watch for whether a student clicks a
second hotspot without prompting. One click is curiosity. Three is the feature working.

---

### F2 — Situation selector and filtering

**Hypothesis**
> If a student answers four questions about their apartment, the recommendations they see will
> match what they can actually act on, and they will trust the site more than a generic list. We
> believe this matters because advice that saves the landlord money and not the student is how a
> renter site loses its reader on the first page.

**Which audience gap does this close?**
[audience.md](audience.md) §4, every constraint that makes generic weatherization advice wrong here:
short tenancy, split incentives, no permission for permanent changes.

**User story**
> As a renter with electric baseboard heat that I pay for and seven months left on my lease, I want
> the site to stop showing me advice for people with a furnace and a landlord who pays, so that
> what is left is worth reading.

**Inputs from the user**

| Input | Type | Required? | Why we need it | Default |
|---|---|---|---|---|
| Heat type | select, one of five | No | Filters `appliesToHeat` | any |
| Who pays for heat | select: me, included in rent, not sure | No | Filters `appliesToPayer`, the field that decides whether an improvement saves the student anything | any |
| Months left on the lease | select: bands | No | Ranks by payback against tenancy | any |
| Lifecycle phase | select, or derived from the date | No | Orders results | derived |

Every question offers "I am not sure", which widens results rather than blocking. No question is
required, and the form can be submitted empty.

**Output the user receives**
The library filtered and reordered, the header chip summarizing the setting, and dimmed hotspots in
the doll house. No new content is generated. The same items are shown, ranked and narrowed.

**Logic / rules**
Set intersection on the `content-meta` fields, then sort: enablers first, then impact, then lowest
cost. Lease length affects order rather than inclusion, because a student on a two-month lease
should still see the thing that pays back in a year, ranked below the things that pay back this
week. No savings figure is computed. Nothing is multiplied by anything.

**Edge cases**
- All four answers left as "not sure". Everything shows, ordered by impact. This is the same as
  never opening the selector.
- A filter combination that matches nothing. See empty states.
- Utilities included in rent. Improvements that only save on heat drop in rank rather than
  disappearing, with a line explaining that they save the landlord money and may still be worth
  asking for.
- A student changes one answer after filtering. The list updates in place and the count is
  announced.

**Failure / empty states**
"Nothing matches all of those filters. Clear the lease-length filter to see 6 more." The message
always names a specific filter to drop and offers a one-tap way to drop it. An empty list never
appears with no route out of it.

**Accessibility requirements**
A plain `<form>` with `<fieldset>` and `<legend>` per question, persistent visible labels, no
placeholder-only fields. Results count in an `aria-live="polite"` region so a screen reader user
learns that filtering happened. Filtered-out cards are removed from the DOM rather than dimmed, so
they do not appear in the tab order. WCAG 2.2 criterion 3.3.7, redundant entry, is why the chip
shows the current setting rather than asking again.

**Does it work without JavaScript / on a slow connection?**
Yes. The form submits as a GET to `/improvements` with query parameters, and the library page
renders the unfiltered list. Filtering narrows an already complete page.

**Data persistence**
Query string is the source of truth. `localStorage` key `situation` holds a copy so the setting
survives navigation, with no identifiers and no free text, per
[architecture.md](architecture.md) D10.

**Acceptance criteria**
- [ ] The form submits and returns useful results with JavaScript disabled
- [ ] Every question can be left unanswered, and "I am not sure" widens rather than blocks
- [ ] Changing a filter announces the new result count to a screen reader
- [ ] A filtered URL sent to another person reproduces the same list
- [ ] Setting "heat included in rent" reorders rather than empties the list, with an explanation
- [ ] No result set is ever empty without naming a filter to drop
- [ ] Nothing about the student leaves the browser

**How we'll know it works**
In testing, ask a student to find something they could do this week. Success is them not scrolling
past anything irrelevant enough to complain about.

---

### F3 — Flip-card myth busters

**Hypothesis**
> If a student commits to an answer before seeing it, the correction will stick harder than the
> same sentence read in a paragraph. We believe this matters because the expensive beliefs in this
> domain, that setback costs more than steady heat and that a space heater is cheap, are confidently
> held rather than absent.

**Which audience gap does this close?**
The misconception rows of [audience.md](audience.md) §3, and topics 4 and 7 in
[content-strategy.md](content-strategy.md) §3.

**User story**
> As a renter who is sure that turning the heat down and back up wastes more than leaving it steady,
> I want to find out I am wrong in a way I remember, so that I actually change the thermostat.

**Inputs from the user**
One action: flipping a card.

**Output the user receives**
The correction, 40 words or fewer, ending with a link to the improvement it argues for.

**Logic / rules**
None. Static content, both faces in the markup. No scoring, no tracking of right and wrong, no
sequence to complete.

**Edge cases**
- A student flips every card without reading. Acceptable. Without the script the two faces are
  stacked, which is the same content read straight through.
- A card touches a safety-critical topic, for example space heaters. Per
  [content-strategy.md](content-strategy.md) §5 the safety framing appears before the instructions
  and never on the back of a card. Cards may correct a cost belief. They may not carry the safety
  note.

**Failure / empty states**
None. There is no state to fail.

**Accessibility requirements**
The control is a real `<button>` carrying `aria-expanded` and pointing at the answer's id, so click,
Enter and Space all work. Never hover-only. Both faces exist in the DOM at all times, and the face
turned away is `visibility: hidden` so its link leaves the tab order and its text leaves the
accessibility tree. Focus follows the turn onto the button on the arriving face. Under reduced
motion the card swaps without rotating.

**Does it work without JavaScript / on a slow connection?**
Yes. Without the script the two faces are stacked in normal flow — the question, then the answer —
and the two flip buttons are not shown. The script does not add content, only the turn.

**Data persistence**
None.

**Acceptance criteria**
- [ ] Every card turns and turns back by keyboard, and focus lands on the face that arrives
- [ ] With the script blocked, both faces are on the page and readable
- [ ] The face turned away is out of the tab order
- [ ] No card carries safety, permission, cost, or source information on its back
- [ ] Reduced motion removes the rotation, keeps the function, and shows the written-out version

**How we'll know it works**
Ask a participant the myth question before they see the page, then again after. A changed answer is
the whole measurement.

---

### F4 — Animated explainer diagrams

**Hypothesis**
> If a student watches air move through the gap under a door, they will understand a draft as
> airflow rather than as coldness, and they will look for the other gaps. We believe this matters
> because "find your drafts" is an enabler topic, and a student who cannot find one cannot act on
> anything else.

**Which audience gap does this close?**
Topic 1 in [content-strategy.md](content-strategy.md) §3, and the mechanism behind topics 2, 3, 4
and 11.

**User story**
> As a renter who has been told to look for drafts, I want to see what one actually is, so that I
> know what I am looking for at the window.

**Inputs from the user**
Scrolling the diagram into view, and optionally pressing Pause.

**Output the user receives**
One looping SVG animation per explainer, 4 to 6 seconds a cycle, with a rest at the finished frame.
The finished frame carries every label and arrow, so the diagram teaches without ever moving.

**Logic / rules**
CSS animation on inline SVG. No JavaScript, no video, no GIF. The pause control is a checkbox that
CSS reads, so pausing works without script.

**Edge cases**
- Reduced motion, from the operating system or the site toggle. Renders the finished frame, offers
  "Play" for a single run.
- `animation-timeline` unsupported. The diagram renders finished.
- A student pauses and navigates away. Nothing persists per diagram. The global toggle persists.

**Failure / empty states**
The finished frame is the fallback for every failure mode, which is why it has to be complete.

**Accessibility requirements**
Every looping animation carries a visible "Pause" button, which is what makes looping conformant
under WCAG 2.2.2 rather than a violation. Labels are real SVG `<text>` at 16px minimum. Each figure
carries a `<figcaption>` describing what the animation showed, which is what a screen reader user
receives. Motion never carries information that the finished frame does not.

**Does it work without JavaScript / on a slow connection?**
Yes, including the pause control.

**Data persistence**
None per diagram. The site-wide motion preference lives in `localStorage` under `motion`.

**Acceptance criteria**
- [ ] Every looping animation has a visible pause control that works with JavaScript disabled
- [ ] The finished frame contains every label and arrow, and reads as complete
- [ ] Reduced motion stops all loops and leaves a play control
- [ ] No diagram starts on page load. Each starts when scrolled into view
- [ ] Each figure has a caption describing the mechanism in words
- [ ] A cycle runs no longer than 6 seconds including the rest

**How we'll know it works**
Ask a participant to find a draft in their own apartment afterwards. What they check first tells us
whether the diagram taught airflow or just decorated the page.

**A note on the acceptance criteria above.** They are build-time checks, done by the person
writing the feature, not a formal audit. Extensive accessibility testing is deferred to v2 per
[accessibility.md](accessibility.md) §5, which makes these lists the main thing standing between a
feature and a defect. Check them honestly.

## 5. Cross-feature behavior

- **Shared state.** The situation from F2 is set once and read by the library, the doll house and
  the improvement pages. A student never answers the same question twice, which is WCAG 2.2
  criterion 3.3.7 as well as good manners.
- **Progress.** F5 counts spots viewed in the doll house, in `sessionStorage`. It is encouragement
  and it never gates content. There is no progress tracking anywhere else in v1.
- **Print, export, share.** A filtered URL is shareable. Print, download and share-by-link arrived
  with F6 on 2026-08-25. Every page has a sane print stylesheet regardless, because a student may
  print an improvement page.
- **Entry points.** A student can land mid-feature from an external link: a room fragment, a
  filtered library URL, or an improvement page. Every one of those renders completely on its own,
  with the header chip showing whether a situation is set.

## 6. Content dependencies

| Feature | Content needed from content-strategy.md | Ready? |
|---|---|---|
| F1 | All ten hotspot improvements written, with `landlordPermission`, `reversible`, cost and time | ☐ |
| F1 | The doll house illustration and the 23-icon set | ☐ Not started, critical path |
| F2 | `appliesToHeat` and `appliesToPayer` correct on every improvement | ☐ |
| F2 | The "utilities included" explanation copy | ☐ |
| F3 | Myth and correction pairs for topics 4, 7 and 11, through content review | ☐ |
| F4 | The `/learn/heating-systems` diagram set, adapted 2026-08-21 from the team's own earlier heat pump site (S25) into this site's tokens, icon pen and `--motion-state` motion plumbing. Carries a season toggle scoped to the diagram, which is what shows a heat pump running both directions | ☑ |
| F4 | One diagram concept per explainer, drawn | ☑ Three drawn (read-your-bill, find-your-drafts, heating-systems). Remaining explainers unwritten |
| F4 | Figure captions describing each mechanism in words | ☐ |
| All | Sources in [sources.md](sources.md) for every number that appears | ◐ In progress |

## 7. Explicitly rejected ideas

| Idea | Why rejected |
|---|---|
| User accounts | Collecting personal information is a non-goal in [project-brief.md](project-brief.md) §6, and nothing here needs identity |
| Landlord or property ratings | Non-goal, and it would end the partnership |
| Live utility bill integration | No backend, no personal data, and no student would connect an account to a class project |
| A quiz that returns a score | Produces nothing the student can act on. See §1 |
| Auto-advancing carousel | Takes reading pace away from the student, per [DESIGN.md](../DESIGN.md) §7 |
| Gamified points or streaks for improvements made | The reward for sealing a window is a warmer room and a smaller bill. Adding points implies we are watching, which we are not |
| Savings calculator producing a dollar total for the year | Requires assumptions we cannot source per improvement, and a wrong number is worse than no number |
