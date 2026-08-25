# Energy for Student Renters

An interactive guide helping student renters in Hanover, New Hampshire improve the energy
efficiency of their rentals. In partnership with Sustainable Hanover.

> **Status: build, all twenty topics written.** As of 2026-08-24 every topic in the inventory
> ([docs/content-strategy.md](docs/content-strategy.md) §3) has a page. Ten improvements, six
> explainers, and the standalone pages for programs, rights, pre-lease and materials. The doll
> house tour is sixteen spots, ordered as a sequence rather than a list: understand the bill and
> the lease, find where the heat goes, seal it, control it, then ask, then leave.
>
> The 2026-08-24 pass replaced the drawn illustration on every improvement page with a credited
> photograph, keeping the three diagrams that teach a mechanism a photograph cannot show. It
> rebuilt the Renter basics carousel to focus one card at a time, widened the situation dialog so
> it fits a laptop screen without scrolling and gave it a Reset button, and unified the disclaimer
> cards onto one design. `/about` now opens on the split-incentive problem the project exists
> because of, and states how AI was used to build the site. Three pages that had no inbound link
> anywhere — the glossary, the pre-lease checklist and the materials page — now have routes to
> them.
>
> What is still open: flip-card myth busters (F3) are built as a component but still need their
> myth-and-correction pairs through content review. `/learn/whats-in-your-lease` and
> `/learn/move-out-restore` touch leases and deposits and need human review before publishing, per
> [AGENTS.md](AGENTS.md) rule 2. Accessibility verification — screen reader passes, the full zoom
> matrix, a formal audit — is deferred to v2 and the accessibility statement says so plainly.
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
| [docs/image-credits.md](docs/image-credits.md) | Every photograph, its photographer, and its licence |

## License

See [LICENSE](LICENSE).
