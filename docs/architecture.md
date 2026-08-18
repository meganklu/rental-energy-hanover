# Architecture

> **Status:** ◐ Draft · **Last updated:** 2026-08-18 · **Owner:** Megan

The dominant constraint on this project is not performance or scale. It is a $0 budget and a
one-week build window, against a site that should keep working without attention. Every decision
below is weighed against that.

**The short version.** Hand-written HTML, CSS and JavaScript, committed to this repository and
served by GitHub Pages straight from the `main` branch. No framework, no bundler, no package
manager, no server. Editing a page means editing an HTML file, which can be done in GitHub's web
editor and is live a minute later.

## 1. Driving constraints

| Constraint | Implication |
|---|---|
| Must be maintainable by a non-developer volunteer, per [project-brief.md](project-brief.md) §9 | No build step to learn or break. What is in the repo is what is on the web |
| Budget: $0, per [project-brief.md](project-brief.md) §9 | GitHub Pages is free for public repositories. Rules out paid hosting, a CMS, and a database |
| Traffic: low, hundreds of visits a term | Static hosting is enough. Nothing needs to scale |
| No personal data collected, per [project-brief.md](project-brief.md) §6 | No backend, no auth, no database, no cookies, no analytics |
| Content changes a few times a year, mostly re-verified dates and program figures | A CMS is not worth its maintenance cost. Content lives in the pages themselves |
| Longevity target: still working in five years with no maintenance | Favors platform features over dependencies. Plain HTML, CSS and JS have no version to fall behind |
| Build window is 2026-08-19 to 2026-08-26 | No time to learn tooling or debug a pipeline. Time goes into content and accessibility |

## 2. Decisions

| # | Decision | Chosen | Alternatives considered | Why |
|---|---|---|---|---|
| D1 | Site type | Static multi-page site. One HTML file per URL, committed to the repo | Single-page app; static site generator | The URLs in [DESIGN.md](../DESIGN.md) §2 are real files. Every page works with JavaScript off, loads fast on campus wifi, and is readable in the repo by anyone who opens it |
| D2 | Framework | None | React, Astro, Eleventy, Jekyll | A framework adds a toolchain that will rot before the content does. The site is roughly 25 pages with four interactive behaviors, which is below the size where a framework pays for itself |
| D3 | Language | HTML5, CSS with custom properties, JavaScript as ES modules targeting ES2020 | TypeScript, JSX | No transpiling means no build step. Browsers run the files in the repo as written |
| D4 | Styling | Plain CSS in `assets/css/`, design tokens from [DESIGN.md](../DESIGN.md) §4 declared once in `tokens.css` | Sass, Tailwind, CSS-in-JS | Custom properties, nesting and `@media` cover everything the design system needs. No compiler |
| D5 | Content storage | The prose and the metadata for a content item live together in its own HTML file. Metadata sits in an embedded JSON block. `content/improvements.json` is a generated index of that metadata, used only by the client-side filters | Markdown plus a generator; a JSON file as the single source with pages rendered by JavaScript | Keeps a single editable source per item, keeps every page readable without JavaScript, and still gives the library page structured data to filter |
| D6 | Hosting | GitHub Pages, deployed from a branch, source `main` at `/` (root) | Netlify, Vercel, Cloudflare Pages, hosting inside sustainablehanovernh.org | Free, no account for anyone to maintain beyond GitHub, and the branch-deploy mode has no workflow file that can break. The Squarespace partner site cannot host custom interactive pages |
| D7 | Domain | Default `https://<owner>.github.io/rental-energy-hanover/` for v1. A custom domain stays possible later through a `CNAME` file | Buying a domain; a subdomain of hanovernh.org | $0 budget, and [project-brief.md](project-brief.md) §4 expects the site may fold into Sustainable Hanover's site later. See §13 |
| D8 | Build/CI | No build. One GitHub Actions workflow runs the content check on every push, and it gates nothing about publishing | Building and deploying through Actions | If Actions ever stops working the site keeps publishing. The check is a safety net, not a dependency |
| D9 | Analytics | None. No cookies, no third-party scripts, no fonts or icons from a CDN | Plausible, GoatCounter, GitHub traffic graphs | Required by [AGENTS.md](../AGENTS.md) rule 6 and by the non-goals. GitHub's built-in repository traffic view collects nothing on our behalf |
| D10 | Interactive feature state | URL query string is the source of truth for filters and the situation. `localStorage` holds a copy under one key, `situation`, with no identifiers and no free text | In-memory only; cookies; a server session | Query strings make a filtered list shareable, which [DESIGN.md](../DESIGN.md) §2 asks for. `localStorage` stays on the device and sends nothing anywhere. See the open row in [DESIGN.md](../DESIGN.md) §11 |
| D11 | Page shell | The header, nav and footer are copied into every page. `tools/check-content.mjs` verifies each copy matches `tools/shell.html` | Injecting the shell with JavaScript; server includes | Injection would leave the nav missing without JavaScript and would flash on load. Copying is cheap when a script guards the drift |

## 3. System overview

```
repo (main branch)
  ├── *.html          hand-written pages, one per URL
  ├── assets/         css, js, fonts, icons, images
  └── content/        generated metadata index (improvements.json)
              │
              │  git push
              ▼
      GitHub Pages (deploy from branch: main, folder: /)
              │
              ▼
      https://<owner>.github.io/rental-energy-hanover/
```

There is no build stage between the repository and the web. GitHub Pages copies the files as
they are. That is the whole system, and it is deliberate.

## 4. Content pipeline

- **Where content lives:** in the HTML page for that item, for example
  `improvements/seal-your-windows-with-film/index.html`.
- **Format:** the visible prose is ordinary HTML. The structured fields from the content model in
  [content-strategy.md](content-strategy.md) §6 sit in one `<script type="application/json"
  class="content-meta">` block per page. The block is data, never rendered, and is the field of
  record for cost, permission, reversibility, sources and last-reviewed.
- **How content becomes pages:** it does not. The page is the content. The prose and the JSON
  block are edited in the same file, in GitHub's web editor if you like.
- **The index:** `node tools/check-content.mjs --write` reads every `content-meta` block and
  writes `content/improvements.json`. The library page fetches that one file to build cards and
  filters. The index is committed, so the site never waits on tooling.
- **Validation:** `node tools/check-content.mjs` (no flag) fails when a required field is missing
  or holds a value outside the allowed set, when `sources` is empty, when `impactNote` contains a
  digit and `sources` is empty, when a source ID is absent from [sources.md](sources.md), when
  `lastReviewed` is not an ISO date, when a page's shell copy has drifted from `tools/shell.html`,
  or when the committed index is stale. It runs in CI on every push and can be run locally at any
  time. Node 20 or later, no dependencies to install.

The rule stated in [content-strategy.md](content-strategy.md) §6 and [DESIGN.md](../DESIGN.md) §8
that an unsourced number never reaches a screen is enforced here. With no build step, "fails the
build" means "fails `check-content` and does not get merged".

**Example content file** (abridged):

```html
<article class="improvement">
  <h1>Seal your windows with film</h1>
  <p class="summary">A $15 plastic film kit over a drafty window, on in an hour, off at move-out.</p>
  <!-- badges, safety note, steps, sources block -->
</article>

<script type="application/json" class="content-meta">
{
  "type": "improvement",
  "slug": "seal-your-windows-with-film",
  "title": "Seal your windows with film",
  "summary": "A $15 plastic film kit over a drafty window, on in an hour, off at move-out.",
  "cost": "under25",
  "time": "1to2hr",
  "difficulty": "easy",
  "landlordPermission": "none",
  "reversible": "fully",
  "impact": "medium",
  "impactNote": "TODO(source)",
  "appliesToHeat": ["electric-baseboard", "radiator", "forced-air"],
  "appliesToPayer": "tenant",
  "phase": "pre-winter",
  "materials": ["window insulation film kit", "hair dryer"],
  "safety": null,
  "sources": ["S4"],
  "lastReviewed": "2026-08-18"
}
</script>
```

## 5. Interactive features, technical approach

Provisional until [features.md](features.md) exists. The rows below cover the interactive
behavior already specified in [DESIGN.md](../DESIGN.md).

| Feature | Client-side approach | State | Works without JS? |
|---|---|---|---|
| Situation selector (`/start`) | A plain `<form>` of four fieldsets, one question per screen on mobile through CSS and `hidden` | Submits to `/improvements/` with query parameters, then mirrored to `localStorage` | Yes. Without JS the form still submits and the library page still lists everything |
| Improvements filter and sort | Every improvement is in the page as a card at load. JavaScript reads `content/improvements.json`, then shows, hides and reorders the cards it already has | Query string, kept in sync with `history.replaceState` | Yes. The unfiltered list is the no-JS experience, and the filter controls are inside a `<form>` that also works as a GET submission |
| Situation chip in the header | Reads the query string, then `localStorage` | Same as above | Degrades to the "Set your situation" link |
| Generated checklist (`/checklist`) | Builds items from the index for the student's phase and situation, checkboxes persist | `localStorage` key `checklist`, no identifiers | Partly. Without JS the page shows the full phase checklist, unfiltered and unchecked, and it prints |
| Print and copy the checklist | `print.css`, plus a copy-as-text button using the clipboard API | None | Print yes. Copy needs JS, and the text stays selectable so it can be copied by hand |
| Glossary term on first use | `<details>` and `<summary>`, no script | None | Yes |
| House walkthrough (`/`) | One inline SVG. Rooms switch on `:target`, so CSS alone changes room. Every hotspot is a link to its improvement page | The open room is the URL fragment | Yes. Hotspots navigate to the improvement pages, and the room-by-room link list under the drawing carries every one of them |
| Hotspot info bar | JavaScript intercepts the hotspot link and opens a panel built from `content/improvements.json`, then moves focus to it | Fragment only | Yes. Without JavaScript the link goes to the full improvement page, which is the same content |
| Flip cards (`/learn`) | `<details>` with a CSS flip on `[open]`. No script at all | None | Yes |
| Carousel | Scroll-snap row of real slides. Previous and next are anchor links to slide IDs | None | Yes |
| Sticky progress bar | `position: sticky` in CSS. JavaScript only counts spots visited | `sessionStorage`, no identifiers | Yes. Shows a static label instead of a count |
| Scroll-expanding diagram bands | CSS `animation-timeline: scroll()` inside an `@supports` guard. No scroll listener | None | Yes. Renders in the finished state |

**Rule:** every page's core content is readable and every recommendation is reachable with
JavaScript disabled. JavaScript narrows, sorts and remembers. It never holds the only copy of a
fact.

## 6. Performance targets

| Metric | Target | Why |
|---|---|---|
| HTML + CSS + JS per page | ≤ 100 KB uncompressed | Campus wifi is fine, mobile data in a cold apartment is not |
| Fonts | ≤ 60 KB total, two subset woff2 files, per [DESIGN.md](../DESIGN.md) §4 | Self-hosted, preloaded, swap-safe |
| Total first-load page weight | ≤ 250 KB including images | A photo-heavy page needs compression, not an exception |
| Time to interactive | Under 2s on a 4G connection | There is no framework to boot, so this is mostly an image budget |
| Lighthouse performance | ≥ 95 | |
| Lighthouse accessibility | 100 | See [accessibility.md](accessibility.md) |

## 7. Dependencies

| Dependency | Purpose | Why not do without it? |
|---|---|---|
| None for icons | Iconography per [DESIGN.md](../DESIGN.md) §4 | The icon set and the house illustration are drawn for this site and committed as SVG in `assets/icons/` and `assets/img/`. No icon library, no icon font, no emoji |
| Poppins woff2 (SIL Open Font License) | Display typeface, per [DESIGN.md](../DESIGN.md) §4 | Self-hosted files in the repo. No Google Fonts request |
| Node 20 (local only) | Runs `tools/check-content.mjs` | The site does not need it. If Node is unavailable, the check can be skipped and the site still publishes |

**Policy:** the published site ships zero third-party runtime code. No CDN, no script tag pointing
at another origin, no npm package. Anything new goes in this table first, with a human's approval,
per [AGENTS.md](../AGENTS.md) rule 6.

## 8. Build and deploy

- **Setup, done once:** repository Settings → Pages → Build and deployment → Source: "Deploy from
  a branch" → Branch: `main`, folder: `/ (root)`. The repository must stay public for Pages to
  serve on a free plan.
- **Trigger:** any push to `main`. GitHub Pages republishes in about a minute.
- **Steps:** none. The files are served as committed.
- **`.nojekyll`:** an empty file at the repo root, so Pages skips Jekyll processing and serves
  every file literally, including any directory beginning with an underscore.
- **Preview environments:** none. Preview locally with `python3 -m http.server 8000` from the repo
  root and open `http://localhost:8000`. Opening the files with `file://` breaks the `fetch` of
  `content/improvements.json`, so use the server.
- **Rollback:** find the last good commit with `git log --oneline`, then run
  `git revert <bad-commit>` and push, or `git revert <oldest-bad>..<newest-bad>` for a run of
  commits. Pages redeploys the reverted state within a minute. Never force-push `main` to roll
  back, because that throws away the history that shows what changed.
- **Secrets required:** none.

## 9. Repository structure

```
.
├── index.html                    home
├── 404.html                      GitHub Pages serves this for unknown paths
├── .nojekyll
├── CNAME                         only if a custom domain is adopted (see §13)
├── start/index.html
├── improvements/
│   ├── index.html                the filterable library
│   └── <slug>/index.html         one improvement each
├── learn/
│   ├── index.html
│   └── <slug>/index.html
├── checklist/index.html
├── before-you-sign/index.html
├── your-rights/index.html
├── programs/index.html
├── where-to-get-it/index.html
├── glossary/index.html
├── about/index.html
├── accessibility/index.html      the public accessibility statement
├── assets/
│   ├── css/    tokens.css · base.css · components.css · print.css
│   ├── js/     situation.js · library.js · checklist.js
│   ├── fonts/  poppins-500.woff2 · poppins-600.woff2
│   ├── icons/  inline SVG source, copied into pages
│   └── img/
├── content/
│   └── improvements.json         generated by tools/check-content.mjs --write
├── tools/
│   ├── check-content.mjs
│   └── shell.html                canonical header, nav and footer markup
├── .github/workflows/check.yml
├── docs/                         planning and specification documents
├── DESIGN.md · AGENTS.md · README.md · LICENSE
```

Every page is a directory with an `index.html`, so URLs carry no `.html` extension and match the
sitemap in [DESIGN.md](../DESIGN.md) §2 exactly.

## 10. Testing

| Layer | Tool | What's covered |
|---|---|---|
| Content validation | `node tools/check-content.mjs`, run by `.github/workflows/check.yml` on every push | Required fields, allowed values, unsourced numbers, unknown source IDs, `lastReviewed` format, stale index, drifted page shell |
| Unit | The same script, plus `tools/*.test.mjs` run with `node --test` | Any filtering, ranking or estimate logic that produces a number a student might act on |
| Accessibility | Lighthouse and axe DevTools in Chrome, plus the manual passes in [accessibility.md](accessibility.md) §5 | Automated tools catch about a third. The keyboard, screen reader and 320px passes are the real gate |
| Link checking | A monthly scheduled Actions run, or a manual pass on the sources.md cadence | External links to NHSaves, NH Department of Energy and retailer pages rot faster than anything we write |
| HTML validity | Nu Html Checker, run by hand before launch | Hand-written HTML across 25 pages drifts. One pass before launch is enough |
| Manual | Chrome, Safari, Firefox on desktop, iOS Safari and Android Chrome on a phone | The site is read on a phone in a cold apartment. Test it that way |

## 11. Browser and device support

Last two versions of Chrome, Edge, Firefox and Safari on desktop, iOS Safari 16.4 and later, and
Chrome on Android. That floor covers ES modules, CSS custom properties, CSS nesting, `:has()` and
container queries, so nothing in the design system needs a fallback. Older browsers still get
every page's content, because the content is in the HTML.

## 12. Failure modes

| If this breaks | Consequence | Detection | Response |
|---|---|---|---|
| GitHub changes Pages terms or pricing | The site goes down or needs a new host | GitHub changelog, or a report from a reader | The whole site is static files in git. Any static host, including Netlify, Cloudflare Pages or a folder on the Town's own hosting, serves the same repo unchanged. Budget an afternoon |
| The Actions workflow stops working | The content check stops running. Publishing is unaffected | Red check on a commit | Run `node tools/check-content.mjs` locally and fix or delete the workflow. This never blocks a content edit |
| Node changes and `check-content.mjs` breaks | Content edits lose their safety net | The script errors | The script is under 300 lines with no dependencies, so it can be repaired or read as documentation of the rules. The site keeps working |
| An external program page 404s | A student follows a dead link to NHSaves or the NH Department of Energy | Monthly link check, plus the review cadence in [sources.md](sources.md) | Update the link and the `lastReviewed` date on every page citing it. If the program itself ended, remove the claim rather than leaving a stale one |
| A published number turns out to be wrong | Credibility damage, which is the main risk this project runs | A reader, Sustainable Hanover, or the source review cadence | Correct or remove the number the same day, update `sources` and `lastReviewed`, and note it in the sources.md verification log |
| Content goes stale, for example a rebate figure or a legal citation changes | Students act on outdated program or legal information | The review cadence in [sources.md](sources.md), and the site-wide last-reviewed date in the footer | The footer date is the visible expiry signal. Re-verify on the cadence, correct the page, and update `lastReviewed` |

## 13. Open technical questions

| Question | Blocking? | Decision needed by |
|---|---|---|
| Do we adopt a custom domain, or launch on the default `github.io` URL | No, a `CNAME` file can be added later without touching a link | 2026-08-26 |
| Does the site eventually move inside sustainablehanovernh.org, and does Squarespace allow the interactive pages, per [project-brief.md](project-brief.md) §4 | No, not for v1 | Post-launch |
| Does the situation persist between visits through `localStorage`, per D10, or only in the URL. Open in [DESIGN.md](../DESIGN.md) §11 | No, both paths are one file | 2026-08-20 |
| Do we keep the planning documents in the published repository, where they are served publicly at `/docs/`, or move them out before launch | No | 2026-08-24 |
