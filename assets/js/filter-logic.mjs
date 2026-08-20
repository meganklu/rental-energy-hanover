// Pure filter and sort logic for the improvements library (F2 in features.md), factored out of
// library.js so it can run under `node --test` with no DOM. Nothing here touches the page.

export const IMPACT_RANK = { enabler: 0, high: 1, medium: 2, low: 3 };
export const COST_RANK = { free: 0, under25: 1, "25to75": 2, over75: 3 };
export const TIME_RANK = { under30min: 0, "1to2hr": 1, afternoon: 2, contractor: 3 };

export function matchesFilters(item, filters) {
  if (!item) return false;
  if (
    filters.heat !== "any" &&
    !item.appliesToHeat.includes(filters.heat) &&
    !item.appliesToHeat.includes("any")
  ) {
    return false;
  }
  if (filters.payer !== "any" && item.appliesToPayer !== filters.payer && item.appliesToPayer !== "any") {
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
