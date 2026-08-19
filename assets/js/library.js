// The improvements library filter, F2 in features.md. Every card already exists in the page at
// load — this reads content/improvements.json for the structured fields, then shows, hides and
// reorders the cards already in the DOM. It never rebuilds the list from JSON, so the page is a
// complete library with JavaScript off. Guarded on the elements it needs.

import { matchesFilters, compareItems } from "./filter-logic.mjs";

const grid = document.getElementById("card-grid");
const form = document.getElementById("filter-form");

if (grid && form) {
  const resultsCount = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");
  const clearBtn = document.getElementById("clear-filters");
  const cards = [...grid.querySelectorAll(".card")];

  function currentFilters() {
    const params = new URLSearchParams(window.location.search);
    return {
      heat: params.get("heat") || "any",
      payer: params.get("payer") || "any",
      permission: params.get("permission") || "any",
    };
  }

  function syncFormToFilters(filters) {
    ["heat", "payer", "permission"].forEach((field) => {
      const input = form.querySelector(`input[name="${field}"][value="${filters[field]}"]`);
      if (input) input.checked = true;
    });
  }

  async function run() {
    let index = [];
    try {
      const res = await fetch("../content/improvements.json");
      index = await res.json();
    } catch {
      return; // Static, unfiltered card list stands as-is.
    }

    const bySlug = new Map(index.map((item) => [item.slug, item]));
    const filters = currentFilters();
    syncFormToFilters(filters);

    let visibleCount = 0;
    cards.forEach((card) => {
      const item = bySlug.get(card.dataset.slug);
      const show = matchesFilters(item, filters);
      card.hidden = !show;
      if (show) visibleCount += 1;
      if (item) card.dataset.impact = item.impact;
    });

    cards
      .filter((c) => !c.hidden)
      .sort((a, b) => compareItems(bySlug.get(a.dataset.slug), bySlug.get(b.dataset.slug)))
      .forEach((card) => grid.appendChild(card));

    if (resultsCount) {
      resultsCount.textContent =
        visibleCount === cards.length
          ? `Showing all ${cards.length} improvements.`
          : `Showing ${visibleCount} of ${cards.length} improvements.`;
    }
    if (emptyState) emptyState.hidden = visibleCount > 0;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const params = new URLSearchParams(new FormData(form));
    history.replaceState(null, "", `?${params}`);
    run();
  });

  clearBtn?.addEventListener("click", () => {
    form.querySelectorAll('input[value="any"]').forEach((input) => (input.checked = true));
    history.replaceState(null, "", window.location.pathname);
    run();
  });

  run();
}
