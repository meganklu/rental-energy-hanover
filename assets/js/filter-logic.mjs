// Pure filter and sort logic for the improvements library (F2 in features.md), factored out of
// library.js so it can run under `node --test` with no DOM. Nothing here touches the page.

export const IMPACT_RANK = { enabler: 0, high: 1, medium: 2, low: 3 };
export const COST_RANK = { free: 0, under25: 1, "25to75": 2, over75: 3 };
export const TIME_RANK = { under30min: 0, "1to2hr": 1, afternoon: 2, contractor: 3 };

export function matchesFilters(item, filters) {
  if (!item) return false;
  // Explainers carry neither applicability field — content-strategy.md §6 requires them of
  // improvements only — and an explainer applies to every student whatever heat they have and
  // whoever pays for it. A missing field reads as "any". Fixed 2026-08-21: this used to reach
  // straight for `.includes` and threw on the first explainer it met, which the doll house's
  // personalization hit as soon as a student set a heat type, part-way through hiding hotspots.
  // The library never saw it because its grid holds improvements only.
  const appliesToHeat = item.appliesToHeat || ["any"];
  const appliesToPayer = item.appliesToPayer || "any";
  if (
    filters.heat !== "any" &&
    !appliesToHeat.includes(filters.heat) &&
    !appliesToHeat.includes("any")
  ) {
    return false;
  }
  if (filters.payer !== "any" && appliesToPayer !== filters.payer && appliesToPayer !== "any") {
    return false;
  }
  if (filters.permission !== "any" && item.landlordPermission !== filters.permission) {
    return false;
  }
  return true;
}

export function compareItems(a, b) {
  const rankA = IMPACT_RANK[a?.impact] ?? 9;
  const rankB = IMPACT_RANK[b?.impact] ?? 9;
  if (rankA !== rankB) return rankA - rankB;
  const costA = COST_RANK[a?.cost] ?? 9;
  const costB = COST_RANK[b?.cost] ?? 9;
  return costA - costB;
}

// Named sort orders for the library's sort control (F2). "recommended" is compareItems above,
// kept under both names so existing callers and tests that import compareItems directly still
// work unchanged.
export const SORTERS = {
  recommended: compareItems,
  costLow: (a, b) => (COST_RANK[a?.cost] ?? 9) - (COST_RANK[b?.cost] ?? 9),
  timeShort: (a, b) => (TIME_RANK[a?.time] ?? 9) - (TIME_RANK[b?.time] ?? 9),
  impactHigh: (a, b) => (IMPACT_RANK[a?.impact] ?? 9) - (IMPACT_RANK[b?.impact] ?? 9),
};
