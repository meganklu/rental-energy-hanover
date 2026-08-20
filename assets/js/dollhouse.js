// Doll house interactivity: F1 in features.md. Enlarging a room is plain CSS (:target), and
// every hotspot is a real link to its improvement or explainer page, so all of this is optional
// enhancement. Guarded on the elements it needs, per AGENTS.md JavaScript rules. Path below
// ("content/improvements.json") is root-relative-by-position, correct because this module is
// only ever loaded from index.html today.

import { readFromStorage } from "./situation-store.mjs";
import { matchesFilters } from "./filter-logic.mjs";

const dollhouseEl = document.querySelector(".dollhouse");
const infoBar = document.getElementById("info-bar");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

if (dollhouseEl && infoBar) {
  const hotspots = [...dollhouseEl.querySelectorAll(".hotspot")];
  // Captured now, at load, before any visiting can happen — the one reliable point at which the
  // "Start here" badge is guaranteed to still be exactly where the markup put it, so reset (below)
  // has a fixed hotspot to restore it to regardless of what has been clicked since.
  const startBadgeHotspot = hotspots.find((h) => h.querySelector('.hotspot__badge-flag[data-flag="start"]'));
  let TOTAL = hotspots.length;
  const VISITED_KEY = "visitedSpots";

  let contentIndex = null;
  let lastTrigger = null;

  const getVisited = () => {
    try {
      return new Set(JSON.parse(sessionStorage.getItem(VISITED_KEY) || "[]"));
    } catch {
      return new Set();
    }
  };
  const visited = getVisited();
  const saveVisited = () => sessionStorage.setItem(VISITED_KEY, JSON.stringify([...visited]));

  const progressBar = document.getElementById("progress-bar");
  const resetBtn = document.getElementById("progress-reset");

  function updateProgress() {
    if (!progressText) return;
    const text = `You have viewed ${visited.size} of ${TOTAL} spots.`;
    progressText.textContent = text;
    progressBar?.setAttribute("aria-label", text);
    if (progressFill) {
      // Clamped at 100 — TOTAL can shrink after personalization (applyPersonalization, below)
      // narrows which spots currently apply, and a spot visited before that narrowing stays
      // counted as visited, so visited.size can end up bigger than the new TOTAL. The bar's
      // length is "how much of what's relevant right now have you seen," and that tops out at
      // fully relevant, not at some number past it.
      const pct = TOTAL > 0 ? Math.round((visited.size / TOTAL) * 100) : 0;
      progressFill.style.setProperty("--progress", `${Math.min(100, pct)}%`);
    }
  }

  function refreshVisitedStyling() {
    hotspots.forEach((h) => {
      const isVisited = visited.has(h.dataset.hotspotId);
      h.classList.toggle("hotspot--visited", isVisited);
      if (isVisited && !h.dataset.baseLabel) {
        h.dataset.baseLabel = h.getAttribute("aria-label") || "";
        h.setAttribute("aria-label", `Viewed. ${h.dataset.baseLabel}`);
        // The "Start here" badge's job is done once the spot has actually been visited.
        h.querySelector('.hotspot__badge-flag[data-flag="start"]')?.remove();
      }
    });
  }

  // Whichever hotspot the guided order would go to next carries a "Next" badge on the drawing
  // itself, added 2026-08-19. Never doubles up with "Start here" on the bill hotspot.
  function updateNextBadge(from) {
    hotspots.forEach((h) => h.querySelector('.hotspot__badge-flag[data-flag="next"]')?.remove());
    const next = nextHotspot(from.dataset.order);
    const nextHasStartBadge = next.querySelector('.hotspot__badge-flag[data-flag="start"]');
    if (nextHasStartBadge) return;
    const label = next.querySelector(".hotspot__label");
    if (!label) return;
    const flag = document.createElement("span");
    flag.className = "hotspot__badge-flag";
    flag.dataset.flag = "next";
    flag.textContent = "Next";
    label.appendChild(flag);
  }

  async function loadContent() {
    if (contentIndex) return contentIndex;
    const res = await fetch("content/improvements.json");
    contentIndex = await res.json();
    return contentIndex;
  }

  function permissionBadge(value) {
    const map = {
      none: ["No permission needed", "badge--permission-none", "icon-check"],
      ask: ["Ask your landlord first", "badge--permission-ask", "icon-ask"],
      required: ["Your landlord has to do this", "badge--permission-required", "icon-key"],
    };
    return map[value] || null;
  }

  function reversibleText(value) {
    // Worded identically everywhere reversibility appears (info bar, improvement pages, cards),
    // per DESIGN.md §3.2, revised 2026-08-19.
    const map = {
      fully: "Comes off at move-out",
      mostly: "Mostly comes off at move-out",
      no: "Permanent, check with your landlord",
    };
    return map[value] || null;
  }

  const COST_LABEL = { free: "Free", under25: "Under $25", "25to75": "$25 to $75", over75: "Over $75" };
  const TIME_LABEL = {
    under30min: "Under 30 minutes",
    "1to2hr": "1 to 2 hours",
    afternoon: "An afternoon",
    contractor: "Needs a contractor",
  };
  const IMPACT_LABEL = { low: "Low impact", medium: "Medium impact", high: "High impact" };

  // Filtered-out-by-personalization hotspots (see applyPersonalization below) are skipped by the
  // guided order, same as if they were never in the house.
  function nextHotspot(currentOrder) {
    const order = Number(currentOrder);
    const pool = hotspots.filter((h) => !h.hidden);
    const sorted = pool.sort((a, b) => a.dataset.order - b.dataset.order);
    const idx = sorted.findIndex((h) => Number(h.dataset.order) === order);
    return sorted[(idx + 1) % sorted.length] || sorted[0];
  }

  async function openHotspot(hotspot, { moveFocus = true } = {}) {
    const slug = hotspot.dataset.slug;
    const room = hotspot.dataset.room;
    const label = hotspot.dataset.label;

    // Keep the enlarged room in sync with whichever hotspot is open, including via Next spot.
    const roomId = hotspot.closest(".room")?.id;
    if (roomId && location.hash.slice(1) !== roomId) {
      history.replaceState(null, "", `#${roomId}`);
    }

    visited.add(hotspot.dataset.hotspotId);
    saveVisited();
    refreshVisitedStyling();
    updateProgress();
    updateNextBadge(hotspot);
    lastTrigger = hotspot;

    hotspots.forEach((h) => h.classList.toggle("hotspot--selected", h === hotspot));

    let item = null;
    try {
      const index = await loadContent();
      item = index.find((entry) => entry.slug === slug) || null;
    } catch {
      item = null;
    }

    if (!item) {
      // Content index unavailable. The hotspot's real href still works, so fail open.
      window.location.href = hotspot.href;
      return;
    }

    const badges = [];
    if (item.landlordPermission) {
      const pb = permissionBadge(item.landlordPermission);
      if (pb) {
        badges.push(
          `<span class="badge ${pb[1]}"><svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#${pb[2]}"/></svg>${pb[0]}</span>`
        );
      }
    } else if (item.type === "explainer") {
      // Not an upgrade, so there's no landlordPermission to state.
      badges.push('<span class="badge badge--basics">Renter basics</span>');
    }
    if (item.reversible) {
      const rt = reversibleText(item.reversible);
      if (rt) badges.push(`<span class="badge badge--reversible">${rt}</span>`);
    }

    // The full set of specs shown on the improvement page itself, per DESIGN.md §3.2 — not a
    // shorter tier-2 subset. Explainer items (read-your-bill, find-your-drafts) carry none of
    // these fields, so the row is simply empty for them.
    const facts = [];
    if (item.cost) facts.push(["icon-cost", COST_LABEL[item.cost]]);
    if (item.time) facts.push(["icon-time", TIME_LABEL[item.time]]);
    if (item.impact && IMPACT_LABEL[item.impact]) facts.push([`icon-impact-${item.impact}`, IMPACT_LABEL[item.impact]]);
    const factRow = facts
      .map(
        ([icon, text]) =>
          `<span class="fact"><svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#${icon}"/></svg>${text}</span>`
      )
      .join("");

    const next = nextHotspot(hotspot.dataset.order);
    const allSeen = visited.size >= TOTAL;

    infoBar.innerHTML = `
      <p class="eyebrow">${room} · ${label}</p>
      <h3 class="info-bar__heading" tabindex="-1">${item.title}</h3>
      <div class="badge-row">${badges.join("")}</div>
      ${factRow ? `<div class="fact-row">${factRow}</div>` : ""}
      <p>${item.summary}</p>
      <div class="info-bar__actions">
        <a class="btn btn--primary" href="${hotspot.getAttribute("href")}">Learn more</a>
        ${
          allSeen
            ? ""
            : `<button type="button" class="btn btn--secondary" id="info-bar-next">Next: ${next.dataset.label}</button>`
        }
        <button type="button" class="btn btn--text" id="info-bar-close">Close</button>
      </div>
    `;

    infoBar.hidden = false;

    const heading = infoBar.querySelector(".info-bar__heading");
    if (moveFocus && heading) heading.focus();

    infoBar.querySelector("#info-bar-next")?.addEventListener("click", () => openHotspot(next));
    infoBar.querySelector("#info-bar-close").addEventListener("click", closeInfoBar);
  }

  function closeInfoBar() {
    infoBar.hidden = true;
    infoBar.innerHTML = "";
    hotspots.forEach((h) => h.classList.remove("hotspot--selected"));
    lastTrigger?.focus();
  }

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("click", (event) => {
      event.preventDefault();
      openHotspot(hotspot);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !infoBar.hidden) {
      closeInfoBar();
    }
  });

  // A room opened by its own heading link (a plain fragment navigation, no JS needed for the
  // CSS enlarge) should still close a stale info bar left open from a different room.
  window.addEventListener("hashchange", () => {
    if (!infoBar.hidden && lastTrigger && lastTrigger.closest(".room")?.id !== location.hash.slice(1)) {
      infoBar.hidden = true;
      infoBar.innerHTML = "";
      hotspots.forEach((h) => h.classList.remove("hotspot--selected"));
    }
  });

  // Personalization, added 2026-08-20: "Personalize your recommendations" (DESIGN.md §3.3)
  // used to only ever widen or filter the /improvements library. The house itself always showed
  // every hotspot regardless of the stored situation. Now it hides whichever hotspots the
  // student's own heat type and who-pays answer rule out, using the same matchesFilters logic
  // the library uses, so the two stay consistent with each other. `hidden` rather than a dimmed
  // opacity — the request this responds to is "only show the relevant recommendations," not
  // "show everything, greyed differently." The no-JS and JavaScript-off paths are unaffected:
  // there is no way to set a situation without JavaScript, so every hotspot and every "Everything
  // in this house" entry stays visible for those students, which is the fail-open behavior this
  // whole feature already leans on elsewhere (loadContent() failing open to a plain link, etc).
  const roomIndexLinks = [...document.querySelectorAll(".room-index__room a[href]")].map((a) => ({
    li: a.closest("li"),
    slug: a.getAttribute("href").split("/").filter(Boolean).pop(),
  }));

  async function applyPersonalization() {
    const situation = readFromStorage();
    const active = !!situation && (situation.heat !== "any" || situation.payer !== "any");

    let bySlug = new Map();
    if (active) {
      try {
        bySlug = new Map((await loadContent()).map((item) => [item.slug, item]));
      } catch {
        // Content index unavailable — fail open, same as everywhere else in this file.
      }
    }
    const filters = { heat: situation?.heat || "any", payer: situation?.payer || "any", permission: "any" };
    const relevant = (slug) => {
      const item = bySlug.get(slug);
      return !item || matchesFilters(item, filters);
    };

    hotspots.forEach((h) => {
      h.hidden = active && !relevant(h.dataset.slug);
    });
    roomIndexLinks.forEach(({ li, slug }) => {
      if (li) li.hidden = active && !relevant(slug);
    });

    // Same "nothing for you here" idea, applied to each room's entry in the plain-link list —
    // the screen reader, no-JavaScript and narrow-viewport path, per DESIGN.md §3.2.
    document.querySelectorAll(".room-index__room ul").forEach((ul) => {
      const linked = [...ul.querySelectorAll("li")].filter((li) => li.querySelector("a"));
      if (linked.length === 0) return; // a room with no built content at all, e.g. the bathroom
      const allHidden = active && linked.every((li) => li.hidden);
      let note = ul.querySelector(".room-index__filtered-note");
      if (allHidden) {
        if (!note) {
          note = document.createElement("li");
          note.className = "room-index__filtered-note";
          note.textContent = "Nothing here for your situation.";
          ul.appendChild(note);
        }
        note.hidden = false;
      } else if (note) {
        note.hidden = true;
      }
    });

    // A room that still has hotspots built for it, but none that apply to this situation, gets
    // its own "nothing for you here" message — distinct from `.room--empty`, which means nothing
    // has been drawn for that room at all yet.
    dollhouseEl.querySelectorAll(".room").forEach((room) => {
      const roomHotspots = [...room.querySelectorAll(".hotspot")];
      const noneVisible = roomHotspots.length > 0 && roomHotspots.every((h) => h.hidden);
      room.classList.toggle("room--filtered-empty", noneVisible);
    });

    TOTAL = hotspots.filter((h) => !h.hidden).length || hotspots.length;
    updateProgress();

    // A stale info bar for a hotspot the new situation just hid would be confusing left open.
    if (!infoBar.hidden && lastTrigger?.hidden) closeInfoBar();
  }

  // The personalize dialog (situation-modal.js) saves and closes without navigating away, so it
  // announces the change instead of leaving the house to notice on its own.
  window.addEventListener("situationchange", applyPersonalization);

  // Reset, added 2026-08-20: puts every spot back to unvisited and restores the "Start here"
  // badge, undoing refreshVisitedStyling's own changes rather than reloading the page.
  resetBtn?.addEventListener("click", () => {
    visited.clear();
    saveVisited();
    hotspots.forEach((h) => {
      h.classList.remove("hotspot--visited");
      if (h.dataset.baseLabel) {
        h.setAttribute("aria-label", h.dataset.baseLabel);
        delete h.dataset.baseLabel;
      }
      h.querySelector('.hotspot__badge-flag[data-flag="next"]')?.remove();
    });
    const label = startBadgeHotspot?.querySelector(".hotspot__label");
    if (label && !label.querySelector('.hotspot__badge-flag[data-flag="start"]')) {
      const flag = document.createElement("span");
      flag.className = "hotspot__badge-flag";
      flag.dataset.flag = "start";
      flag.textContent = "Start here";
      label.appendChild(flag);
    }
    if (!infoBar.hidden) closeInfoBar();
    updateProgress();
  });

  refreshVisitedStyling();
  updateProgress();
  applyPersonalization();
}
