# Energy for Student Renters

An interactive guide helping student renters in Hanover, New Hampshire improve the energy
efficiency of their rentals. In partnership with Sustainable Hanover.

> **Status: build.** The nav, hero, doll house shell, situation selector, and improvements library (F1 and F2) are live across
> every page. Megan is currently making design changes to the home page. She will then move to
> the layout and styling of the other pages. Only 10 of the improvements and recommendations have been
> added so far. After finalizing the styling, these will be added. 
> Flip-card myth busters and animated explainer diagrams (F3, F4) are still open.
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

Other group members added to a [Google Doc version of the documentation](https://docs.google.com/document/d/1eiVNgDUkBtcGCEB93DDOc_6X1RAz4_LM5rE8SMaJ24s/edit?usp=sharing). Edits were moved to the GitHub repositoriy by Megan.

| File | Purpose |
|---|---|
| [docs/](docs/README.md) | Planning & specification documents — **start here** |
| [docs/architecture.md](docs/architecture.md) | Stack, hosting, content pipeline, deploy, rollback |
| [DESIGN.md](DESIGN.md) | Information architecture, visual system, components |
| [AGENTS.md](AGENTS.md) | Instructions for AI coding agents working in this repo |

## License

See [LICENSE](LICENSE).
