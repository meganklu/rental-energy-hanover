# rental-energy-hanover

An interactive guide helping student renters in Hanover, New Hampshire improve the energy
efficiency of their rentals. In partnership with **Sustainable Hanover**.

> **Status: planning.** No site code yet. The project is currently working through the
> specification documents in [`docs/`](docs/). The build phase opens 2026-08-19.

## How it is built

Hand-written HTML, CSS and JavaScript. No framework, no bundler, no package manager, and no
build step. The repository is the site, served by GitHub Pages from the `main` branch, so a push
publishes in about a minute. Full reasoning in
[docs/architecture.md](docs/architecture.md).

Preview locally by serving the repo root over HTTP:

```bash
python3 -m http.server 8000
```

## Documents

| File | Purpose |
|---|---|
| [docs/](docs/README.md) | Planning & specification documents — **start here** |
| [docs/architecture.md](docs/architecture.md) | Stack, hosting, content pipeline, deploy, rollback |
| [DESIGN.md](DESIGN.md) | Information architecture, visual system, components |
| [AGENTS.md](AGENTS.md) | Instructions for AI coding agents working in this repo |

## License

See [LICENSE](LICENSE).
