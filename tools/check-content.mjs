#!/usr/bin/env node
// Validates every content-meta block against the rules in docs/content-strategy.md §6, checks
// that every page's header/footer still matches tools/shell.html, and (with --write) regenerates
// content/improvements.json. Node 20+, no dependencies. See AGENTS.md "Commands".

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WRITE = process.argv.includes("--write");
const errors = [];
const warnings = [];

// ---------- Discover pages ----------

function findIndexPages(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findIndexPages(full, out);
    } else if (entry.name === "index.html") {
      out.push(full);
    }
  }
  return out;
}

const pages = findIndexPages(ROOT).sort();

// ---------- Content model ----------

const ENUMS = {
  cost: ["free", "under25", "25to75", "over75"],
  time: ["under30min", "1to2hr", "afternoon", "contractor"],
  difficulty: ["easy", "moderate", "needs-help"],
  landlordPermission: ["none", "ask", "required"],
  reversible: ["fully", "mostly", "no"],
  impact: ["low", "medium", "high", "enabler"],
  appliesToHeat: ["electric-baseboard", "forced-air", "radiator", "heat-pump", "any"],
  appliesToPayer: ["tenant", "included", "any"],
  phase: ["hunting", "signing", "move-in", "pre-winter", "deep-winter", "break", "spring", "move-out"],
};

const COMMON_REQUIRED = ["type", "slug", "title", "summary", "sources", "lastReviewed"];
const IMPROVEMENT_REQUIRED = [
  "cost", "time", "difficulty", "landlordPermission", "reversible", "impact",
  "appliesToHeat", "appliesToPayer", "phase",
];
const EXPLAINER_REQUIRED = ["question"];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// ---------- Valid source IDs, from docs/sources.md ----------

const sourcesText = readFileSync(path.join(ROOT, "docs/sources.md"), "utf8");
const validSourceIds = new Set(
  [...sourcesText.matchAll(/^\|\s*(S\d+[a-z]?)\s*\|/gm)].map((m) => m[1])
);

// ---------- Canonical shell, from tools/shell.html ----------

const shellText = readFileSync(path.join(ROOT, "tools/shell.html"), "utf8");

function extractRegion(text, name) {
  const re = new RegExp(`<!-- shell:${name} -->([\\s\\S]*?)<!-- /shell:${name} -->`);
  const match = text.match(re);
  return match ? match[1] : null;
}

function normalizeShell(fragment) {
  return fragment
    .replace(/(href|src)="(\.\.\/)+/g, '$1="')
    .replace(/\s+aria-current="page"/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();
}

const canonicalHeader = normalizeShell(extractRegion(shellText, "header"));
const canonicalFab = normalizeShell(extractRegion(shellText, "fab"));
const canonicalFooter = normalizeShell(extractRegion(shellText, "footer"));

// ---------- Walk pages ----------

const contentItems = [];

for (const pagePath of pages) {
  const rel = path.relative(ROOT, pagePath);
  const text = readFileSync(pagePath, "utf8");

  // Shell drift
  const header = extractRegion(text, "header");
  const footer = extractRegion(text, "footer");
  if (!header) {
    errors.push(`${rel}: missing <!-- shell:header --> region`);
  } else if (normalizeShell(header) !== canonicalHeader) {
    errors.push(`${rel}: header has drifted from tools/shell.html`);
  }
  const fab = extractRegion(text, "fab");
  if (!fab) {
    errors.push(`${rel}: missing <!-- shell:fab --> region`);
  } else if (normalizeShell(fab) !== canonicalFab) {
    errors.push(`${rel}: fab has drifted from tools/shell.html`);
  }
  if (!footer) {
    errors.push(`${rel}: missing <!-- shell:footer --> region`);
  } else if (normalizeShell(footer) !== canonicalFooter) {
    errors.push(`${rel}: footer has drifted from tools/shell.html`);
  }

  // Basic page hygiene
  if (!/<html lang="en">/.test(text)) errors.push(`${rel}: <html> is missing lang="en"`);
  if (!/class="skip-link"/.test(text)) errors.push(`${rel}: missing the skip link`);
  const h1Count = [...text.matchAll(/<h1[ >]/g)].length;
  if (h1Count !== 1) errors.push(`${rel}: has ${h1Count} <h1> elements, expected exactly 1`);

  // content-meta block
  const metaMatch = text.match(
    /<script type="application\/json" class="content-meta">([\s\S]*?)<\/script>/
  );
  if (!metaMatch) continue;

  let data;
  try {
    data = JSON.parse(metaMatch[1]);
  } catch (e) {
    errors.push(`${rel}: content-meta is not valid JSON (${e.message})`);
    continue;
  }

  const tag = `${rel} [${data.slug || "?"}]`;

  for (const field of COMMON_REQUIRED) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      errors.push(`${tag}: missing required field "${field}"`);
    }
  }

  if (data.type === "improvement") {
    for (const field of IMPROVEMENT_REQUIRED) {
      if (data[field] === undefined || data[field] === null) {
        errors.push(`${tag}: missing required field "${field}"`);
      }
    }
    for (const field of ["cost", "time", "difficulty", "landlordPermission", "reversible", "impact"]) {
      if (data[field] !== undefined && !ENUMS[field].includes(data[field])) {
        errors.push(`${tag}: "${field}" value "${data[field]}" is not one of ${ENUMS[field].join(", ")}`);
      }
    }
    if (Array.isArray(data.appliesToHeat)) {
      for (const v of data.appliesToHeat) {
        if (!ENUMS.appliesToHeat.includes(v)) {
          errors.push(`${tag}: "appliesToHeat" contains invalid value "${v}"`);
        }
      }
    } else if (data.appliesToHeat !== undefined) {
      errors.push(`${tag}: "appliesToHeat" must be an array`);
    }
    if (data.appliesToPayer !== undefined && !ENUMS.appliesToPayer.includes(data.appliesToPayer)) {
      errors.push(`${tag}: "appliesToPayer" value "${data.appliesToPayer}" is not valid`);
    }
    if (data.phase !== undefined && !ENUMS.phase.includes(data.phase)) {
      errors.push(`${tag}: "phase" value "${data.phase}" is not valid`);
    }
    if (data.impactNote && /\d/.test(data.impactNote) && (!data.sources || data.sources.length === 0)) {
      errors.push(`${tag}: "impactNote" contains a number but "sources" is empty`);
    }
  }

  if (data.type === "explainer") {
    for (const field of EXPLAINER_REQUIRED) {
      if (!data[field]) errors.push(`${tag}: missing required field "${field}"`);
    }
  }

  if (Array.isArray(data.sources)) {
    if (data.sources.length === 0) {
      errors.push(`${tag}: "sources" is empty`);
    }
    for (const id of data.sources) {
      if (!validSourceIds.has(id)) {
        errors.push(`${tag}: source "${id}" is not in docs/sources.md`);
      }
    }
  } else {
    errors.push(`${tag}: "sources" must be an array`);
  }

  if (data.lastReviewed !== undefined && !ISO_DATE.test(data.lastReviewed)) {
    errors.push(`${tag}: "lastReviewed" ("${data.lastReviewed}") is not an ISO date (YYYY-MM-DD)`);
  }

  contentItems.push(data);
}

// ---------- Index freshness ----------

contentItems.sort((a, b) => (a.slug > b.slug ? 1 : -1));
const indexPath = path.join(ROOT, "content/improvements.json");
const freshJson = JSON.stringify(contentItems, null, 2) + "\n";

if (WRITE) {
  writeFileSync(indexPath, freshJson);
  console.log(`Wrote ${contentItems.length} items to content/improvements.json`);
} else if (existsSync(indexPath)) {
  const current = readFileSync(indexPath, "utf8");
  if (current !== freshJson) {
    errors.push("content/improvements.json is stale. Run: node tools/check-content.mjs --write");
  }
} else {
  errors.push("content/improvements.json does not exist. Run: node tools/check-content.mjs --write");
}

// ---------- Report ----------

for (const w of warnings) console.warn(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);

console.log(
  `\nChecked ${pages.length} pages, ${contentItems.length} content items, ` +
    `${errors.length} error(s), ${warnings.length} warning(s).`
);

if (errors.length > 0) process.exit(1);
