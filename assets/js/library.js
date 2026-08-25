// The improvements library filter and sort, F2 in features.md. Every card already exists in the
// page at load — this reads content/improvements.json for the structured fields, then shows,
// hides and reorders the cards already in the DOM. It never rebuilds the list from JSON, so the
// page is a complete library with JavaScript off.
//
// Revised 2026-08-20: the on-page filter form is gone. The "Personalize your recommendations"
// FAB was always meant to be the one situation form site-wide (DESIGN.md §3.3) — the library
// having its own second copy was the thing DESIGN.md's own 2026-08-19 revision note says it
// removed, but the library's filtering never actually got switched over to read the stored
// situation instead. It does now, via the same matchesFilters the doll house's personalization
// (dollhouse.js) uses, so the two stay in agreement. `permission` is always "any" here because
// the situation form never collects a permission preference — nothing on the library narrows by
// that dimension any more.

import { matchesFilters, SORTERS } from "./filter-logic.mjs";
import { readFromStorage } from "./situation-store.mjs";
import { read, addAll } from "./todo-store.mjs";

const grid = document.getElementById("card-grid");

if (grid) {
  const resultsCount = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");
  const sortSelect = document.getElementById("sort-select");
  const addAllBtn = document.getElementById("add-all");
  const addAllLabel = addAllBtn?.querySelector("[data-add-all-label]");
  const cards = [...grid.querySelectorAll(".card")];
  // Whether a situation is narrowing the grid, so "Add all showing" can say which set it means.
  // Set by run(), read by renderAddAll(), which also runs on `todochange` without a fresh filter
  // pass.
  let personalized = false;

  // "Add all showing", F6 in features.md. One press for a reader who has already told the site
  // which improvements are theirs and would otherwise press eleven buttons to act on it. It counts
  // what is showing rather than what exists, so the personalized set is what it adds once the four
  // questions are answered. One-way on purpose: undoing eleven adds is what Clear the list is for,
  // and a second destructive control in this toolbar is one too many.
  function renderAddAll() {
    if (!addAllBtn || !addAllLabel) return;
    const showing = cards.filter((card) => !card.hidden).map((card) => card.dataset.slug);
    const onList = new Set(read().map((entry) => entry.slug));
    const missing = showing.filter((slug) => !onList.has(slug));

    addAllBtn.hidden = showing.length === 0;
    // aria-disabled rather than `disabled`: the button still says something worth reading once
    // everything is on the list, and a control that vanishes under a keyboard user mid-press is
    // the thing WCAG 2.4.11 is about.
    addAllBtn.toggleAttribute("aria-disabled", missing.length === 0);
    addAllLabel.textContent =
      missing.length === 0
        ? `All ${showing.length} are on your list`
        : personalized
          ? `Add all ${showing.length} recommended to my list`
          : `Add all ${showing.length} to my list`;
  }

  addAllBtn?.addEventListener("click", () => {
    if (addAllBtn.hasAttribute("aria-disabled")) return;
    addAll(cards.filter((card) => !card.hidden).map((card) => card.dataset.slug));
  });

  // Every card button writes through the same store, so this stays in agreement with them without
  // either side knowing about the other.
  window.addEventListener("todochange", renderAddAll);

  async function run() {
    let index = [];
    try {
      const res = await fetch("../content/improvements.json");
      index = await res.json();
    } catch {
      // Static, unfiltered card list stands as-is. Every card is showing, so "Add all" is still a
      // true statement about the page and still does what it says.
      renderAddAll();
      return;
    }

    const bySlug = new Map(index.map((item) => [item.slug, item]));
    const situation = readFromStorage();
    const active = !!situation && (situation.heat !== "any" || situation.payer !== "any");
    const filters = { heat: situation?.heat || "any", payer: situation?.payer || "any", permission: "any" };

    let visibleCount = 0;
    cards.forEach((card) => {
      const item = bySlug.get(card.dataset.slug);
      const show = !active || matchesFilters(item, filters);
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    const comparator = SORTERS[sortSelect?.value] || SORTERS.recommended;
    cards
      .filter((c) => !c.hidden)
      .sort((a, b) => comparator(bySlug.get(a.dataset.slug), bySlug.get(b.dataset.slug)))
      .forEach((card) => grid.appendChild(card));

    if (resultsCount) {
      resultsCount.textContent =
        visibleCount === cards.length
          ? `Showing all ${cards.length} improvements.`
          : `Showing ${visibleCount} of ${cards.length} improvements.`;
    }
    if (emptyState) emptyState.hidden = visibleCount > 0;

    personalized = active;
    renderAddAll();
  }

  sortSelect?.addEventListener("change", run);
  // The personalize dialog saves and closes without navigating away (situation-modal.js), so it
  // announces the change instead of leaving the library to notice on its own.
  window.addEventListener("situationchange", run);

  run();
}
