#!/usr/bin/env node
// Generates the hero's bluestone ground pattern (DESIGN.md §3.1) and prints it as the CSS
// `background-image` data URI to paste into assets/css/components.css. Not part of the site and
// not run at deploy — there is no build step (AGENTS.md rule 8). Run it by hand when the pattern
// needs regenerating, then paste the output.
//
//   node tools/ashlar.mjs [seed]
//
// The pattern is a random-ashlar dissection: the tile is a UNITS x UNITS grid, every grid cell
// belongs to exactly one slab, and slabs run from 1x1 up to 3x2. Joints are then *derived* from
// the dissection rather than drawn — an edge between two cells is a joint when the two cells
// belong to different slabs — which is what makes a missing joint impossible. The grid wraps in
// both axes, so slabs cross the tile edge and no full-width or full-height line marks the repeat.

const TILE = 320;
const UNITS = 8;
const STEP = TILE / UNITS;
// [width, height, weight]. Weights keep a mix on the ground rather than letting one size
// dominate: squares are deliberately given as much chance as the long rectangles, since a field
// of nothing but 3x2 slabs stops reading as cut stone and starts reading as a brick bond.
const SIZES = [[1, 1, 3], [2, 2, 4], [2, 1, 4], [1, 2, 4], [3, 1, 2], [1, 3, 2], [3, 2, 2], [2, 3, 2]];
const STROKE = "rgba(20,32,26,0.16)";
const WIDTH = 2;

// Deterministic PRNG, so a given seed always regenerates the same pattern.
function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dissect(seed) {
  const rand = mulberry32(seed);
  const owner = Array.from({ length: UNITS }, () => new Array(UNITS).fill(-1));
  const slabs = [];

  const free = (r, c, h, w) => {
    for (let dr = 0; dr < h; dr++) {
      for (let dc = 0; dc < w; dc++) {
        if (owner[(r + dr) % UNITS][(c + dc) % UNITS] !== -1) return false;
      }
    }
    return true;
  };

  const place = (r, c, w, h) => {
    const id = slabs.length;
    for (let dr = 0; dr < h; dr++) {
      for (let dc = 0; dc < w; dc++) owner[(r + dr) % UNITS][(c + dc) % UNITS] = id;
    }
    slabs.push([w, h]);
  };

  // Straddlers first. The rest of the fill runs row by row, which packs well but can never wrap:
  // a slab anchored in the last column only reaches the first column if the first column is still
  // free, and filling left to right guarantees it is not. Without a wrap, every cell in the last
  // column borders a different slab in the first, and the tile's edge becomes one unbroken line
  // repeating across the whole hero. So a few slabs are placed across each edge before the main
  // fill starts, purely to break that line.
  for (let i = 0; i < 3; i++) {
    const r = Math.floor(rand() * UNITS);
    const w = 2 + Math.floor(rand() * 2);
    const h = 1 + Math.floor(rand() * 2);
    const c = UNITS - 1 - Math.floor(rand() * (w - 1));
    if (free(r, c, h, w)) place(r, c, w, h);
  }
  for (let i = 0; i < 3; i++) {
    const c = Math.floor(rand() * UNITS);
    const h = 2 + Math.floor(rand() * 2);
    const w = 1 + Math.floor(rand() * 2);
    const r = UNITS - 1 - Math.floor(rand() * (h - 1));
    if (free(r, c, h, w)) place(r, c, w, h);
  }

  for (let r = 0; r < UNITS; r++) {
    for (let c = 0; c < UNITS; c++) {
      if (owner[r][c] !== -1) continue;
      const fits = SIZES.filter(([tw, th]) => free(r, c, th, tw));
      const total = fits.reduce((sum, [, , weight]) => sum + weight, 0);
      let pick = rand() * total;
      const [w, h] = fits.find(([, , weight]) => (pick -= weight) <= 0) || [1, 1];
      place(r, c, w, h);
    }
  }
  return { owner, slabs };
}

// An edge is a joint when the two cells it separates belong to different slabs.
function joints(owner) {
  const vert = [];  // [x, y0, y1]
  const horiz = []; // [y, x0, x1]
  for (let r = 0; r < UNITS; r++) {
    for (let c = 0; c < UNITS; c++) {
      if (owner[r][c] !== owner[r][(c + 1) % UNITS]) vert.push([(c + 1) * STEP, r * STEP, (r + 1) * STEP]);
      if (owner[r][c] !== owner[(r + 1) % UNITS][c]) horiz.push([(r + 1) * STEP, c * STEP, (c + 1) * STEP]);
    }
  }
  return { vert, horiz };
}

// Merge runs of collinear, touching segments so the path data stays short.
function merge(segs) {
  const byLine = new Map();
  for (const [fixed, a, b] of segs) {
    if (!byLine.has(fixed)) byLine.set(fixed, []);
    byLine.get(fixed).push([a, b]);
  }
  const out = [];
  for (const [fixed, spans] of [...byLine].sort((x, y) => x[0] - y[0])) {
    spans.sort((x, y) => x[0] - y[0]);
    let [start, end] = spans[0];
    for (const [a, b] of spans.slice(1)) {
      if (a <= end) { end = Math.max(end, b); } else { out.push([fixed, start, end]); [start, end] = [a, b]; }
    }
    out.push([fixed, start, end]);
  }
  return out;
}

const seed = Number(process.argv[2] ?? 24); // chosen by eye from a scan: 25 slabs, all eight sizes used, both edges broken by straddlers
const { owner, slabs } = dissect(seed);

// A dissection that left a cell unassigned, or double-assigned one, would silently ship a hole.
const counts = new Map();
owner.flat().forEach((id) => counts.set(id, (counts.get(id) || 0) + 1));
slabs.forEach(([w, h], id) => {
  if (counts.get(id) !== w * h) throw new Error(`slab ${id} covers ${counts.get(id)} cells, expected ${w * h}`);
});

const { vert, horiz } = joints(owner);
const parts = [];
for (const [x, y0, y1] of merge(vert)) {
  parts.push(`M${x} ${y0}V${y1}`);
  // A joint on the tile edge is drawn on both edges: a 2px stroke centered on x=320 loses its
  // outer half to the viewBox, and the matching half at x=0 of the next tile completes it.
  if (x === TILE) parts.push(`M0 ${y0}V${y1}`);
}
for (const [y, x0, x1] of merge(horiz)) {
  parts.push(`M${x0} ${y}H${x1}`);
  if (y === TILE) parts.push(`M${x0} 0H${x1}`);
}

const svg =
  `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE}' height='${TILE}' viewBox='0 0 ${TILE} ${TILE}'>` +
  `<path fill='none' stroke='${STROKE}' stroke-width='${WIDTH}' d='${parts.join("")}'/>` +
  `</svg>`;

const tally = new Map();
slabs.forEach(([w, h]) => tally.set(`${w}x${h}`, (tally.get(`${w}x${h}`) || 0) + 1));

console.error(`seed ${seed}: ${slabs.length} slabs — ${[...tally].map(([k, v]) => `${v}x ${k}`).join(", ")}`);
console.log(`  background-image: url("data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22")}");`);
