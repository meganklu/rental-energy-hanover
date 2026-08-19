import { test } from "node:test";
import assert from "node:assert/strict";
import { matchesFilters, compareItems } from "../assets/js/filter-logic.mjs";

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
