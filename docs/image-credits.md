# Image credits

> **Status:** ● Complete · **Last updated:** 2026-08-24 · **Owner:** Megan

Every photograph on the site, who took it, and where it came from. See
[content-strategy.md](content-strategy.md) §7 for the policy this implements and
[DESIGN.md](../DESIGN.md) §3.6 for why the drawings were replaced.

## Licence and why the files are committed

All photographs come from [Unsplash](https://unsplash.com/) under the
[Unsplash License](https://unsplash.com/license), which permits free commercial and
non-commercial use with no permission required. Attribution is not required by the licence. This
project credits every photograph anyway, on the page it appears on, for two reasons: it is the
courtesy the licence asks for, and this project's own sourcing rule is that nothing appears on the
site without a traceable origin.

**Nothing is hotlinked.** Every file is downloaded and committed to `assets/img/photos/`. AGENTS.md
rule 6 means the published site loads nothing from another origin, and a committed file also cannot
change or vanish underneath the page.

**Nothing is generated.** No image on this site is AI-generated. `/about` states that plainly under
"How AI was used".

## Processing

Downloaded at 2000px wide, centre-cropped to a fixed aspect (1000&times;750 for a page image,
1600&times;800 for a full-width band), converted to WebP at quality 80, and re-encoded at 68 where
that left a file over 140KB. The crop is baked into the file so the browser is never asked to do it,
and every `<img>` carries explicit `width` and `height` so nothing reflows as images arrive.

## The photographs

| File | Photographer | Unsplash | Size | Appears on |
|---|---|---|---|---|
| `brick-apartment.webp` | Seyi Ariyo | [XCCAVA3BjhM](https://unsplash.com/photos/XCCAVA3BjhM) | 108 KB | `/about/` |
| `cold-apartment.webp` | Brooke Balentine | [fpJNQGflFQo](https://unsplash.com/photos/fpJNQGflFQo) | 74 KB | `/your-rights/` |
| `curtains.webp` | GLOBALDSIO IT SOLUTION | [2OBBekMc3Tc](https://unsplash.com/photos/2OBBekMc3Tc) | 27 KB | `/improvements/thermal-curtains/` |
| `door-open-snow.webp` | Josh Withers | [IA9KZceY-lg](https://unsplash.com/photos/IA9KZceY-lg) | 89 KB | `/improvements/door-sweeps-and-weatherstripping/` |
| `electric-meter.webp` | Thomas Kelley | [xVptEZzgVfo](https://unsplash.com/photos/xVptEZzgVfo) | 63 KB | `/learn/read-your-bill/` |
| `hand-cold-window.webp` | Clay LeConey | [6hmjdWkylj8](https://unsplash.com/photos/6hmjdWkylj8) | 57 KB | `/learn/find-your-drafts/` |
| `hardware-store.webp` | Darien Attridge | [ciY4tc7539I](https://unsplash.com/photos/ciY4tc7539I) | 196 KB | `/improvements/`, `/where-to-get-it/` |
| `heater-living-room.webp` | Qian Shawn | [wOBH1cXktKY](https://unsplash.com/photos/wOBH1cXktKY) | 93 KB | `/programs/` |
| `keys-stairs.webp` | Jakub Żerdzicki | [V7Q94jc04wQ](https://unsplash.com/photos/V7Q94jc04wQ) | 26 KB | `/before-you-sign/` |
| `laptop-writing.webp` | Kelly Sikkema | [kA50vHmCxbk](https://unsplash.com/photos/kA50vHmCxbk) | 48 KB | `/learn/ask-your-landlord/` |
| `lease-documents.webp` | Olena Kholina | [MhqUBTxQ3Hw](https://unsplash.com/photos/MhqUBTxQ3Hw) | 28 KB | `/learn/whats-in-your-lease/` |
| `led-bulb.webp` | Ian Talmacs | [iEDKPLfJrEo](https://unsplash.com/photos/iEDKPLfJrEo) | 11 KB | `/improvements/led-lighting-swaps/` |
| `mini-split.webp` | Illia Horokhovsky | [SJnak9YYFWU](https://unsplash.com/photos/SJnak9YYFWU) | 55 KB | `/learn/heating-systems/` |
| `moving-boxes.webp` | Alicia Christin Gerald | [bV7WI-AeiTA](https://unsplash.com/photos/bV7WI-AeiTA) | 32 KB | `/learn/move-out-restore/` |
| `power-strip.webp` | Babak Eshaghian | [dh4tcWXPlUc](https://unsplash.com/photos/dh4tcWXPlUc) | 51 KB | `/improvements/phantom-load-and-plug-loads/` |
| `radiator-room.webp` | e24 | [N6KVqGA44ZI](https://unsplash.com/photos/N6KVqGA44ZI) | 24 KB | `/improvements/dont-block-your-radiator-or-baseboard/` |
| `showerhead.webp` | Igal Ness | [RxaCpvl3N0E](https://unsplash.com/photos/RxaCpvl3N0E) | 38 KB | `/improvements/hot-water-showers-and-laundry/` |
| `showerhead-fixture.webp` | Clay Banks | [e4GP7d-uyag](https://unsplash.com/photos/e4GP7d-uyag) | 21 KB | `/improvements/low-flow-showerhead/` |
| `space-heater.webp` | Donald Teel | [Pab6RD90F00](https://unsplash.com/photos/Pab6RD90F00) | 34 KB | `/improvements/space-heaters-real-cost-and-safety/` |
| `thermostat.webp` | Erik Mclean | [fSLI8RdCdyk](https://unsplash.com/photos/fSLI8RdCdyk) | 12 KB | `/improvements/thermostat-setback/` |
| `window-frost.webp` | Kelly Sikkema | [hSPVuakrJqs](https://unsplash.com/photos/hSPVuakrJqs) | 166 KB | `/improvements/seal-your-windows-with-film/` |
| `winter-house.webp` | Alison Courtney | [ibPkGkYa358](https://unsplash.com/photos/ibPkGkYa358) | 125 KB | `/improvements/winter-break-shutdown/` |

## Diagrams kept as drawings

Three figures stayed hand-drawn, because a photograph cannot show a mechanism. All are SVG written
for this site, in this site's design tokens.

| Figure | Page | Why it is not a photograph |
|---|---|---|
| Heat pump and furnace cutaways | `/learn/heating-systems/` | Refrigerant carrying heat against a temperature gradient, and a burner venting exhaust, are both invisible in a photograph. Adapted from the same team's earlier heat pump site (S25) |
| Draft figure | `/learn/find-your-drafts/` | Air moves both directions through the same gap, which is the whole point and is not visible |
| Bill figure | `/learn/read-your-bill/` | It highlights which figure on a bill is the one that moves |

## Icons

`assets/icons/sprite.svg`, drawn for this site in the pen described in [DESIGN.md](../DESIGN.md)
&sect;4. Not photographs and not third-party: no icon font and no icon library, per AGENTS.md rule 6.
