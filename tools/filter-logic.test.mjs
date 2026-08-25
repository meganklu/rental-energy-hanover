import { test } from "node:test";
import assert from "node:assert/strict";
import { matchesFilters, compareItems, SORTERS } from "../assets/js/filter-logic.mjs";

const NONE = { heat: "any", payer: "any", permission: "any" };

const windowFilm = {
  slug: "seal-your-windows-with-film",
  appliesToHeat: ["any"],
  appliesToPayer: "tenant",
  landlordPermission: "none",
  impact: "medium",
  cost: "under25",
};

const radiator = {
  slug: "dont-block-your-radiator-or-baseboard",
  appliesToHeat: ["electric-baseboard", "radiator"],
  appliesToPayer: "tenant",
  landlordPermission: "none",
  impact: "medium",
  cost: "free",
};

const drafts = {
  slug: "find-your-drafts",
  appliesToHeat: ["any"],
  appliesToPayer: "tenant",
  landlordPermission: "none",
  impact: "enabler",
  cost: "free",
};

test("matchesFilters: no filters set matches everything", () => {
  assert.equal(matchesFilters(windowFilm, NONE), true);
  assert.equal(matchesFilters(radiator, NONE), true);
});

test("matchesFilters: heat filter excludes items that don't apply and don't say any", () => {
  assert.equal(matchesFilters(radiator, { ...NONE, heat: "forced-air" }), false);
  assert.equal(matchesFilters(radiator, { ...NONE, heat: "radiator" }), true);
  assert.equal(matchesFilters(windowFilm, { ...NONE, heat: "forced-air" }), true, "appliesToHeat: any always matches");
});

test("matchesFilters: payer filter respects an item's own 'any'", () => {
  const anyPayer = { ...windowFilm, appliesToPayer: "any" };
  assert.equal(matchesFilters(anyPayer, { ...NONE, payer: "included" }), true);
  assert.equal(matchesFilters(windowFilm, { ...NONE, payer: "included" }), false);
});

test("matchesFilters: permission filter is an exact match, no 'any' on the item side", () => {
  assert.equal(matchesFilters(windowFilm, { ...NONE, permission: "none" }), true);
  assert.equal(matchesFilters(windowFilm, { ...NONE, permission: "ask" }), false);
});

test("matchesFilters: a missing item (unknown slug) never matches", () => {
  assert.equal(matchesFilters(undefined, NONE), false);
});

// An explainer carries neither applicability field. It is in the index the doll house filters
// against (dollhouse.js), so this shape has to survive an active filter rather than throw on it.
test("matchesFilters: an explainer with no applicability fields matches every filter", () => {
  const explainer = { slug: "heating-systems", type: "explainer" };
  assert.equal(matchesFilters(explainer, NONE), true);
  assert.equal(matchesFilters(explainer, { ...NONE, heat: "heat-pump" }), true);
  assert.equal(matchesFilters(explainer, { ...NONE, payer: "included" }), true);
});

test("compareItems: enablers sort before any ranked impact", () => {
  assert.ok(compareItems(drafts, windowFilm) < 0);
});

test("compareItems: within the same impact band, lower cost sorts first", () => {
  assert.ok(compareItems(radiator, windowFilm) < 0, "free sorts before under25 at the same impact");
});

test("compareItems: higher impact sorts before lower impact regardless of cost", () => {
  const highImpactExpensive = { impact: "high", cost: "over75" };
  const lowImpactFree = { impact: "low", cost: "free" };
  assert.ok(compareItems(highImpactExpensive, lowImpactFree) < 0);
});

test("SORTERS.costLow: free sorts before an expensive item regardless of impact", () => {
  const free = { impact: "low", cost: "free" };
  const pricey = { impact: "high", cost: "over75" };
  assert.ok(SORTERS.costLow(free, pricey) < 0);
});

test("SORTERS.timeShort: a quick fix sorts before one that needs a contractor", () => {
  const quick = { time: "under30min" };
  const slow = { time: "contractor" };
  assert.ok(SORTERS.timeShort(quick, slow) < 0);
});

test("SORTERS.impactHigh: matches compareItems' impact ordering, ignoring cost", () => {
  const highCostly = { impact: "high", cost: "over75" };
  const lowFree = { impact: "low", cost: "free" };
  assert.ok(SORTERS.impactHigh(highCostly, lowFree) < 0);
});
