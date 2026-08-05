# Features & Interaction Spec

> **Status:** ☐ Draft · **Last updated:** [FILL: YYYY-MM-DD]

<!-- GUIDANCE: The interactive experience is this project's whole reason for existing —
     Sustainable Hanover already has static text. So this document should be the most
     rigorous one in the set. Each feature gets a hypothesis, a spec, and acceptance
     criteria you could hand to a tester. -->

## 1. Interaction philosophy

[FILL: 3–4 sentences. What does "interactive" mean here, and why does it teach better than a
page of text? Beware of interactivity for its own sake — a quiz that only quizzes is worse
than a good checklist. State the bar a feature must clear to be worth building.]

**A feature earns its place only if it:** [FILL: e.g. "produces something the student takes
away — a personalized list, a number, a decision — that a static page could not."]

## 2. Feature candidates

<!-- GUIDANCE: Brainstorm broadly, then prioritize hard. You will build fewer of these than
     you think. Some starters listed — replace freely. -->

| ID | Feature | What the student gets | Effort | Priority |
|---|---|---|---|---|
| F1 | [FILL: e.g. Interactive apartment walkthrough — click rooms/objects to find issues] | [FILL] | [FILL] | Must |
| F2 | [FILL: e.g. "What can I actually change?" permission filter] | [FILL] | | |
| F3 | [FILL: e.g. Personalized winter-prep checklist, exportable] | [FILL] | | |
| F4 | [FILL: e.g. Bill estimator / "what's driving my bill"] | [FILL] | | |
| F5 | [FILL: e.g. Thermostat setback simulator] | [FILL] | | |
| F6 | [FILL: e.g. Pre-lease inspection checklist] | [FILL] | | |
| F7 | [FILL: e.g. Draft-finding guide with a self-test] | [FILL] | | |
| F8 | [FILL: e.g. Landlord request letter/email generator] | [FILL] | | |
| F9 | [FILL: e.g. Roommate agreement builder for shared utilities] | [FILL] | | |
| F10 | [FILL: e.g. Knowledge check / myth-buster quiz] | [FILL] | | |
| F11 | [FILL: e.g. Cost-vs-payback comparison against lease length] | [FILL] | | |
| F12 | [FILL] | | | |

Priority: **Must** / **Should** / **Could** / **Won't (v1)**

## 3. Prioritization rationale

**In v1:** [FILL: list IDs and one sentence on why]

**Cut from v1:** [FILL: list IDs and why — being explicit here prevents relitigating]

## 4. Feature specs

<!-- GUIDANCE: Copy this block for each "Must" feature. Don't spec what you won't build. -->

### F[N] — [FILL: name]

**Hypothesis**
> [FILL: "If a student does X, they will learn/do Y, which we believe matters because Z."]

**Which audience gap does this close?**
[FILL: link to a specific row in audience.md §3]

**User story**
> As a [FILL], I want to [FILL], so that [FILL].

**Inputs from the user**

| Input | Type | Required? | Why we need it | Default |
|---|---|---|---|---|
| [FILL: e.g. heating type] | [FILL: select] | | | |
| [FILL: e.g. who pays for heat] | | | | |
| [FILL: e.g. months left on lease] | | | | |

**Output the user receives**
[FILL: be exact. A ranked list? A number? A downloadable checklist? What can they do with it?]

**Logic / rules**
[FILL: the actual decision rules, scoring, or formula. If it produces numbers, state every
assumption and cite it in sources.md. If you can't defend the math, don't ship the number.]

**Edge cases**
- [FILL: e.g. user doesn't know their heating type]
- [FILL: e.g. all recommendations require landlord permission]
- [FILL: e.g. no results match their situation]
- [FILL: e.g. user is on a month-to-month lease]

**Failure / empty states**
[FILL]

**Accessibility requirements**
[FILL: keyboard operation, screen reader announcements, non-color-dependent state, motion —
cross-reference accessibility.md]

**Does it work without JavaScript / on a slow connection?**
[FILL: decide the fallback]

**Data persistence**
[FILL: none? localStorage? shareable URL? — must be consistent with the privacy stance in
measurement.md and the non-goals in project-brief.md]

**Acceptance criteria**
- [ ] [FILL: observable, testable statement]
- [ ] [FILL]
- [ ] [FILL]

**Instrumentation**
[FILL: what event, if any, tells us this feature works — see measurement.md]

---

### F[N] — [FILL: name]

[FILL: repeat the block]

---

## 5. Cross-feature behavior

- **Do features share state?** [FILL: e.g. does answering "I have baseboard electric heat" once
  carry across the walkthrough, checklist, and estimator?]
- **Progress or completion tracking:** [FILL]
- **Print / export / share:** [FILL: a student may want to send a checklist to roommates or a
  request to a landlord — decide the mechanism]
- **Entry points:** [FILL: can a student land mid-feature from an external link?]

## 6. Content dependencies

| Feature | Content needed from content-strategy.md | Ready? |
|---|---|---|
| [FILL] | [FILL] | ☐ |

## 7. Explicitly rejected ideas

<!-- GUIDANCE: Record what you decided against and why, so it doesn't come back. -->

| Idea | Why rejected |
|---|---|
| [FILL: e.g. user accounts] | [FILL] |
| [FILL: e.g. landlord ratings] | [FILL] |
| [FILL: e.g. live utility bill integration] | [FILL] |
