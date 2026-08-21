# Energy for Student Renters

An interactive guide helping student renters in Hanover, New Hampshire improve the energy
efficiency of their rentals. In partnership with Sustainable Hanover.

> **Status: build, every page now stands up.** As of 2026-08-21 the site is complete end to end
> rather than a home page with stubs behind it. The nav, hero, doll house, situation selector and
> improvements library (F1, F2) are live, the animated explainer diagrams (F4) are drawn, and the
> supporting pages exist: about, accessibility, rights, programs, glossary, where to get it, and
> before you sign. Every link in the nav and the footer resolves. Renter basics now holds three
> explainers, the newest being an illustrated guide to telling one kind of heating system from
> another, which is the question the situation selector has always opened with.
>
> What is still open: 8 of the ~20 improvements in the topic inventory are written, and the rest
> come next now that the styling is settled. Flip-card myth busters (F3) are built as a component
> but still need their myth-and-correction pairs through content review. Accessibility
> verification — screen reader passes, the full zoom matrix, a formal audit — is deferred to v2 and
> the accessibility statement says so plainly.
>
> See [docs/roadmap.md](docs/roadmap.md) for phase status and [docs/features.md](docs/features.md)
> for what each feature covers.

## How it is built

The website is coded in HTML, CSS and JavaScript. There is no framework, no bundler, no package manager, and no
build step. The repository is the site, served by GitHub Pages from the `main` branch, so a push
publishes in about a minute. Full reasoning in
[docs/architecture.md](docs/architecture.md).

Preview locally by serving the repo root over HTTP:

```bash
python3 -m http.server 8000
```

## Documents

These documents were created before building the website to define page content, style guidelines, etc. These documents also provide a summary of research, project goals, and sources.

Other group members added to a [Google Doc version of the documentation](https://docs.google.com/document/d/1eiVNgDUkBtcGCEB93DDOc_6X1RAz4_LM5rE8SMaJ24s/edit?usp=sharing). Edits were moved to the GitHub repositoriy by Megan.

| File | Purpose |
|---|---|
| [docs/](docs/README.md) | Planning & specification documents |
| [DESIGN.md](DESIGN.md) | Information architecture, visual system, components |
| [AGENTS.md](AGENTS.md) | Instructions for AI coding agents working in this repo |
| [docs/ai-use.md](docs/ai-use.md) | Every prompt used to build this site, in order |

## License

See [LICENSE](LICENSE).
