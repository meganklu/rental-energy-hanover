# AGENTS.md

Instructions for AI coding agents working in this repository.

## What this project is

A website helping student renters in Hanover, New Hampshire make energy-efficiency
improvements to their rentals. Built in partnership with **Sustainable Hanover**, a Town of
Hanover committee.

The audience is first-time renters who have never paid a heating bill. The site's distinctive
value is being **interactive** and **rental-specific** as Sustainable Hanover already publishes
static weatherization and energy efficiency guidance for homeowners.

Read [docs/project-brief.md](docs/project-brief.md) and [docs/audience.md](docs/audience.md)
before making decisions that affect scope or content.

## Non-negotiable rules

1. **Never invent facts about energy, cost, savings, utilities, rebates, or tenant law.**
   Every factual claim must trace to a source recorded in [docs/sources.md](docs/sources.md).
   If a number is needed and no source exists, leave a `TODO(source)` marker and say so —
   do not estimate.

2. **Never write or modify legal content unassisted.** Anything touching NH tenant rights,
   habitability, leases, or deposits requires human review per
   [docs/content-strategy.md](docs/content-strategy.md) §4.

3. **Never write safety-critical content unassisted.** Space heaters, carbon monoxide,
   electrical load, blocking vents or baseboards. Flag for human review.

4. **Every improvement/recommendation must state landlord-permission status and
   reversibility.** This is the core constraint that distinguishes renter advice from
   homeowner advice. See the content model in
   [docs/content-strategy.md](docs/content-strategy.md) §6.

5. **Accessibility is not optional.** Target is stated in
   [docs/accessibility.md](docs/accessibility.md). Keyboard operability, visible focus, and
   non-color-dependent meaning are required in every component you write.

6. **Do not add third-party scripts, trackers, fonts, or analytics** without explicit
   approval. The site sets no cookies and uses no third-party analytics. Nothing on the
   published site may load from another origin. No CDN, no Google Fonts, no icon font.

7. **Do not collect personal information.** See non-goals in
   [docs/project-brief.md](docs/project-brief.md).

8. **Do not introduce a build step, a bundler, or a package manager.** The repository is the
   site. See [docs/architecture.md](docs/architecture.md) §2. If you believe a change needs
   tooling, ask a human first.

## Tech stack

Decided in [docs/architecture.md](docs/architecture.md) §2. Read it before changing anything
structural.

- **Framework:** none. Hand-written static multi-page site
- **Language:** HTML5, CSS with custom properties, JavaScript as ES modules targeting ES2020.
  No TypeScript, no JSX, no transpiling
- **Styling:** plain CSS in `assets/css/`. Design tokens from [DESIGN.md](DESIGN.md) §4 are
  declared once in `assets/css/tokens.css`
- **Content format:** HTML prose plus one embedded
  `<script type="application/json" class="content-meta">` block per content page.
  `content/improvements.json` is a generated index of those blocks
- **Hosting:** GitHub Pages, deploy-from-branch, `main` at `/` (root). A push to `main`
  publishes in about a minute. There is no build stage
- **Node version:** 20 or later, needed only to run `tools/check-content.mjs`. The site itself
  needs no Node

## Commands

```bash
# install
# nothing to install. There is no package.json

# dev server (file:// breaks the fetch of content/improvements.json, so serve over HTTP)
python3 -m http.server 8000

# build
# none. The committed files are the published site

# content check: required fields, allowed values, unsourced numbers, unknown source IDs,
# stale index, drifted page shell
node tools/check-content.mjs

# regenerate content/improvements.json after editing any content-meta block
node tools/check-content.mjs --write

# unit tests (filtering, ranking, any logic that produces a number)
node --test tools/

# accessibility check
# Lighthouse and axe DevTools in Chrome, plus the manual passes in docs/accessibility.md §5
```

Run `node tools/check-content.mjs` and `node --test tools/` before considering any change
complete. If you touched markup, styling, or an interactive behavior, also load the page in a
browser, tab through it with the keyboard, and check it at 320px.

## Repository layout

```
.
├── index.html                    home
├── 404.html                      served by GitHub Pages for unknown paths
├── .nojekyll                     stops Pages running Jekyll over the repo
├── start/index.html              situation selector
├── improvements/
│   ├── index.html                filterable library
│   └── <slug>/index.html         one improvement each
├── learn/<slug>/index.html       explainers
├── checklist/ before-you-sign/ your-rights/ programs/
├── where-to-get-it/ glossary/ about/ accessibility/
├── assets/
│   ├── css/    tokens.css · base.css · components.css · print.css
│   ├── js/     situation.js · library.js · checklist.js
│   ├── fonts/  poppins-500.woff2 · poppins-600.woff2
│   ├── icons/  inline SVG source
│   └── img/
├── content/improvements.json     generated, committed
├── tools/check-content.mjs · shell.html
├── .github/workflows/check.yml
├── docs/                         planning & specification documents
├── AGENTS.md · DESIGN.md · README.md · LICENSE
```

Every page is a directory with an `index.html`, so URLs carry no `.html` extension and match the
sitemap in [DESIGN.md](DESIGN.md) §2.

## Code conventions

- **Naming:** kebab-case for files, directories and URL slugs. camelCase for JavaScript
  identifiers. Content-model field names match [docs/content-strategy.md](docs/content-strategy.md)
  §6 exactly, including their camelCase spelling
- **File organization:** one directory per URL, each holding `index.html`. Shared CSS and JS live
  in `assets/`, never inline in a page, with the single exception of the `content-meta` JSON block
- **HTML:** semantic elements before ARIA. One `<h1>` per page, headings in order with no levels
  skipped. `lang` on `<html>`. The skip link is the first focusable element. Prefer `<details>`,
  `<dialog>` and a plain `<form>` over scripted equivalents
- **Links:** relative only. The site is served from a subpath
  (`/rental-energy-hanover/`), so a root-absolute `href="/improvements/"` breaks in production
  while appearing to work locally
- **CSS:** use the design tokens defined in [DESIGN.md](DESIGN.md); no ad-hoc hex values, and no
  spacing values off the 4px scale. Mobile-first. Never remove a focus outline
- **JavaScript:** progressive enhancement is the rule, not a preference. The page must carry its
  content and its recommendations in HTML. Scripts filter, sort and remember. ES modules with
  `type="module"`, no globals, no dependencies. Guard every feature behind the element it needs
  existing on the page
- **Page shell:** the header, nav and footer are copied into every page from `tools/shell.html`.
  If you change one, change `tools/shell.html` and every page, then run the content check
- **Comments:** explain why, not what. A comment on any non-obvious accessibility choice, so a
  later editor does not remove it as dead weight

## Content conventions

- Content lives in the HTML page for that item, under `improvements/`, `learn/` or `programs/`.
  Prose belongs in the markup, not in a JavaScript string or a template literal
- Every content item carries `lastReviewed` and `sources` fields in its `content-meta` block.
  A number with no source fails `tools/check-content.mjs` and never reaches a page
- After editing any `content-meta` block, run `node tools/check-content.mjs --write` and commit
  the regenerated `content/improvements.json` with the page
- Plain language, short sentences. Match the voice defined in
  [docs/content-strategy.md](docs/content-strategy.md) §2
- Use terms defined in [docs/glossary.md](docs/glossary.md); link the first use of a
  technical term

## Writing style for agent-authored copy

- Lead with the action, then the reason.
- State cost and time in student terms ("$12, 20 minutes").
- Talk about money and comfort first. Leave out guilt-based climate framing.
- Write plain declarative sentences. Use commas and periods in place of em dashes.
- Avoid contrast constructions like "not X, but Y". State the point directly and stop.
- Skip emoji and warning symbols. Write "Note:" or "Safety:" instead.
- Use "typically saves" rather than "will save".

## What to ask a human about

- Anything in the "non-negotiable rules" list above
- Changes to scope, navigation structure, or the set of features
- Anything that would appear under Sustainable Hanover's name or branding
- Adding a dependency, a build step, or a GitHub Actions workflow that the site depends on
- Changing a published URL slug, since links to it exist off-site
- Repository settings, the Pages source, or anything touching the custom domain and `CNAME`

## Git conventions

- Branch naming: `content/<topic>`, `feature/<short-name>`, `fix/<short-name>`
- Commit message style: imperative subject under 72 characters, for example
  "Add window film improvement page". Commit the regenerated `content/improvements.json`
  alongside the content change that caused it
- Work on a branch and open a PR. `main` publishes to the live site on every push, so anything
  merged is public immediately
- Never force-push `main`. Roll back with `git revert`, per
  [docs/architecture.md](docs/architecture.md) §8

## Known gotchas

- **Subpath hosting.** The site lives at `https://<owner>.github.io/rental-energy-hanover/` until
  a custom domain exists. Root-absolute paths in `href`, `src`, `url()` and `fetch` all break
  there and all work on `localhost`. Use relative paths everywhere
- **Case sensitivity.** GitHub Pages serves from Linux and is case-sensitive. `Assets/CSS/base.css`
  works on macOS and 404s in production
- **`file://` breaks the library page.** `fetch` of `content/improvements.json` fails on the file
  protocol. Always preview through `python3 -m http.server`
- **Jekyll.** Pages runs Jekyll by default and skips files and directories starting with an
  underscore. `.nojekyll` at the root prevents this. Do not delete it
- **Deploy delay.** A push takes about a minute to appear, and browsers cache aggressively. Check
  with a hard reload before assuming a change failed
- **The repository is public.** Everything committed is readable, including `docs/`. Never commit
  interview notes with participant names, an email address that is not already public, or a
  credential
