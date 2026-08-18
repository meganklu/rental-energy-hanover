# Architecture

> **Status:** ☐ Draft · **Last updated:** [FILL: YYYY-MM-DD]

<!-- GUIDANCE: The dominant constraint on this project is not performance or scale — it's
     that someone other than you has to keep this site alive after you leave. Weigh every
     technical decision against that. -->

## 1. Driving constraints

| Constraint | Implication |
|---|---|
| Must be maintainable by [FILL: a non-developer volunteer? a future student?] | [FILL] |
| Budget: [FILL: likely $0] | [FILL: rules out paid hosting, CMS, databases] |
| Traffic: [FILL: low — hundreds of visits/term?] | [FILL: static hosting is almost certainly right] |
| No personal data collected | [FILL: no backend, no auth, no database] |
| Content changes [FILL: a few times a year] | [FILL: does it need a CMS at all?] |
| Longevity target: [FILL: e.g. still working in 2030] | [FILL: favors boring, low-dependency choices] |

## 2. Decisions

<!-- GUIDANCE: One row per decision, with the alternatives you rejected. Future-you and the
     next maintainer both need the "why not". -->

| # | Decision | Chosen | Alternatives considered | Why |
|---|---|---|---|---|
| D1 | Site type | [FILL: static / SSG / SPA] | | |
| D2 | Framework | [FILL] | | |
| D3 | Language | [FILL] | | |
| D4 | Styling | [FILL] | | |
| D5 | Content storage | [FILL: markdown in repo? JSON? CMS?] | | |
| D6 | Hosting | [FILL] | | |
| D7 | Domain | [FILL: subdomain of hanovernh.org? separate? GitHub Pages URL?] | | |
| D8 | Build/CI | [FILL] | | |
| D9 | Analytics | [FILL: default is none — no cookies, no third-party scripts] | | |
| D10 | Interactive feature state | [FILL: in-memory? localStorage? URL params?] | | |

## 3. System overview

```
[FILL: a simple diagram or description. For a static site this may be four boxes:
 content files → build → static output → host. That's fine — say so.]
```

## 4. Content pipeline

- **Where content lives:** [FILL]
- **Format:** [FILL: e.g. Markdown with YAML frontmatter matching the content model in
  content-strategy.md §6]
- **How content becomes pages:** [FILL]
- **Validation:** [FILL: e.g. schema check that every improvement has `landlordPermission`,
  `reversible`, `sources`, `lastReviewed`]

**Example content file:**

```yaml
[FILL: write one real example — it doubles as documentation for the next maintainer]
```

## 5. Interactive features — technical approach

| Feature | Client-side approach | State | Works without JS? |
|---|---|---|---|
| [FILL] | [FILL] | [FILL] | [FILL] |

**Rule:** [FILL: e.g. "Core content must be readable without JavaScript; interactivity
enhances but is not required to get the information."]

## 6. Performance targets

| Metric | Target | Why |
|---|---|---|
| Total page weight | [FILL] | [FILL: campus wifi, mobile data] |
| Time to interactive | [FILL] | |
| Lighthouse performance | [FILL] | |
| Lighthouse accessibility | [FILL: 100] | see accessibility.md |

## 7. Dependencies

<!-- GUIDANCE: Every dependency is a future maintenance burden. Justify each one. -->

| Dependency | Purpose | Why not do without it? |
|---|---|---|
| [FILL] | | |

**Policy:** [FILL: e.g. "No dependency added without an entry in this table."]

## 8. Build and deploy

- **Trigger:** [FILL: e.g. push to `main`]
- **Steps:** [FILL]
- **Preview environments:** [FILL]
- **Rollback procedure:** [FILL: write this out — the next maintainer will need it under stress]
- **Secrets required:** [FILL: ideally none]

## 9. Repository structure

```
[FILL]
```

## 10. Testing

| Layer | Tool | What's covered |
|---|---|---|
| Content validation | [FILL] | [FILL] |
| Unit | [FILL] | [FILL: especially any savings/estimate logic] |
| Accessibility | [FILL] | [FILL] |
| Link checking | [FILL] | [FILL: external links to utility/state programs rot] |
| Manual | — | [FILL] |

## 11. Browser and device support

[FILL: e.g. last 2 versions of Chrome/Safari/Firefox/Edge, iOS Safari, Android Chrome. State a
floor and stop worrying about it.]

## 12. Failure modes

| If this breaks | Consequence | Detection | Response |
|---|---|---|---|
| Hosting provider changes terms | [FILL] | [FILL] | [FILL] |
| Build tooling stops working after N years | [FILL] | [FILL] | [FILL] |
| External link (utility program page) 404s | [FILL] | [FILL] | [FILL] |
| Nobody has repo access | [FILL] | — | [FILL: at least two people, one of them not a graduating student, hold access] |

## 13. Open technical questions

| Question | Blocking? | Decision needed by |
|---|---|---|
| [FILL] | | |
