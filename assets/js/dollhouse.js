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
  // "Start here" badge is guaranteed to still be exactly where the markup put it. updateGuideBadges
  // (below) treats this as the badge's home and only moves it elsewhere when this hotspot is not
  // showing, so it needs a record of where "here" was that survives everything clicked since.
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
      }
    });
  }

  // The tag always sits above the piece with its arrow pointing down, and which element it is
  // appended to is what puts it there, revised 2026-08-26. It positions itself against its nearest
  // positioned ancestor. On a wall-hung piece that is the link, whose name plate hangs below the
  // drawing, so the tag lands above the drawing. On a piece standing on the floor the name plate is
  // already above the drawing, so the tag goes inside the plate and stacks above the name instead
  // of landing on it. Appending to the link in that case put the tag below the piece and, on
  // anything standing near the floor, past the bottom edge of the room.
  function setFlag(hotspot, flag, text) {
    if (!hotspot || hotspot.querySelector(`.hotspot__badge-flag[data-flag="${flag}"]`)) return;
    const el = document.createElement("span");
    el.className = "hotspot__badge-flag";
    el.dataset.flag = flag;
    el.textContent = text;
    const host = hotspot.classList.contains("hotspot--stands")
      ? hotspot.querySelector(".hotspot__label") || hotspot
      : hotspot;
    host.appendChild(el);
  }

  const clearFlag = (flag) =>
    hotspots.forEach((h) => h.querySelector(`.hotspot__badge-flag[data-flag="${flag}"]`)?.remove());

  const byOrder = (list) => [...list].sort((a, b) => a.dataset.order - b.dataset.order);

  // Two badges doing one job, divided by state rather than by position (DESIGN.md §3.2). Before
  // anything has been opened the drawing carries "Start here"; from the first spot onward it
  // carries "Next", and "Start here" does not come back until Reset. Revised 2026-08-21: the
  // badge used to be re-placed after every visit, so it hopped to a different spot the moment the
  // student opened the one it was on, which reads as the tour starting over somewhere else rather
  // than continuing. Its placement rule — stay on the hotspot the markup put it on, fall back to
  // the lowest-numbered showing spot when personalization hides that one — now applies only while
  // the tour has not begun, which is the case it was written for.
  function updateGuideBadges(from) {
    clearFlag("start");
    clearFlag("next");
    const unvisited = byOrder(hotspots.filter((h) => !isInactive(h) && !visited.has(h.dataset.hotspotId)));
    if (visited.size === 0) {
      const home = startBadgeHotspot && !isInactive(startBadgeHotspot) ? startBadgeHotspot : unvisited[0];
      setFlag(home, "start", "Start here");
      return;
    }
    // Nothing showing is unvisited, so there is no next to point at — the same condition that
    // drops the info bar's own "Next" button.
    if (unvisited.length === 0) return;
    // `from` is absent on a reload part-way through: sessionStorage remembers which spots were
    // visited, not which was opened last, so the order picks up at its own next unvisited spot.
    setFlag(from ? nextHotspot(from.dataset.order) : unvisited[0], "next", "Next");
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
  // How many dollar-sign glyphs each cost band draws, per DESIGN.md §4. The same mapping the
  // cards and the improvement pages render in markup, so the info bar does not state the cost
  // with a different symbol than the page it links to.
  const COST_DOLLARS = { free: 1, under25: 1, "25to75": 2, over75: 3 };
  const TIME_LABEL = {
    under30min: "Under 30 minutes",
    "1to2hr": "1 to 2 hours",
    afternoon: "An afternoon",
    contractor: "Needs a contractor",
  };
  const IMPACT_LABEL = { low: "Low impact", medium: "Medium impact", high: "High impact" };

  // A hotspot that personalization has ruled out (see applyPersonalization below). It is still
  // drawn in its room, so `hidden` is no longer what marks it — the class is.
  const isInactive = (h) => h.classList.contains("hotspot--inactive");

  // Filtered-out-by-personalization hotspots are skipped by the guided order, same as if they were
  // never in the house.
  function nextHotspot(currentOrder) {
    const order = Number(currentOrder);
    const pool = hotspots.filter((h) => !isInactive(h));
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
    updateGuideBadges(hotspot);
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
    const icon = (name) =>
      `<svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#${name}"/></svg>`;
    const dollars = (cost) =>
      `<span class="price-dollars" aria-hidden="true">${
        `<svg class="icon"><use href="assets/icons/sprite.svg#icon-cost"/></svg>`.repeat(COST_DOLLARS[cost] || 1)
      }</span>`;

    const facts = [];
    if (item.cost) facts.push([dollars(item.cost), COST_LABEL[item.cost]]);
    if (item.time) facts.push([icon("icon-time"), TIME_LABEL[item.time]]);
    if (item.impact && IMPACT_LABEL[item.impact]) facts.push([icon(`icon-impact-${item.impact}`), IMPACT_LABEL[item.impact]]);
    const factRow = facts.map(([mark, text]) => `<span class="fact">${mark}${text}</span>`).join("");

    const next = nextHotspot(hotspot.dataset.order);
    const allSeen = visited.size >= TOTAL;

    // Added 2026-08-25 (DESIGN.md §3.8). This bar is the card version of an improvement page — same
    // badges, same cost, time and impact — and it was the one place the site stated those facts
    // without offering the action on them. Improvements only: an explainer is not something you put
    // on a shopping list, and /checklist carries markup for the eleven improvements and nothing
    // else, so a slug from anywhere else would be filtered straight back out of the store.
    const addButton =
      item.type === "improvement"
        ? `<button type="button" class="btn btn--secondary todo-add" data-todo-slug="${item.slug}" data-todo-title="${item.title}" aria-pressed="false">
             <svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#icon-plus"/></svg>
             <span data-todo-label>Add to my list</span>
           </button>`
        : "";

    infoBar.innerHTML = `
      <p class="eyebrow">${room} · ${label}</p>
      <h3 class="info-bar__heading" tabindex="-1">${item.title}</h3>
      <div class="badge-row">${badges.join("")}</div>
      ${factRow ? `<div class="fact-row">${factRow}</div>` : ""}
      <p>${item.summary}</p>
      <div class="info-bar__actions">
        <a class="btn btn--primary" href="${hotspot.getAttribute("href")}">Learn more</a>
        ${addButton}
        ${
          allSeen
            ? ""
            : `<button type="button" class="btn btn--secondary" id="info-bar-next">Next: ${next.dataset.label}</button>`
        }
        <button type="button" class="btn btn--text" id="info-bar-close">Close</button>
      </div>
    `;

    infoBar.hidden = false;

    // The add button above is written with the not-added state in it, which is wrong for an
    // improvement already on the list. assets/js/todo.js owns that state and delegates its clicks,
    // so all this has to do is ask it to re-read the list; the alternative is a second copy of the
    // label, icon and aria-pressed handling living here and drifting away from the first.
    if (addButton) window.dispatchEvent(new CustomEvent("todochange"));

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
      // Revised 2026-08-26: the piece stays in the room and stops being a control, rather than
      // leaving a gap in the furniture where it used to stand. Removing `href` is what takes it out
      // of the tab order and out of the link role in one move — an `<a>` with no href is a plain
      // inline element — and `aria-hidden` finishes the job for anything reading the room. Both are
      // put back the moment the situation stops ruling it out.
      const off = active && !relevant(h.dataset.slug);
      h.classList.toggle("hotspot--inactive", off);
      if (off) {
        if (h.hasAttribute("href")) {
          h.dataset.inactiveHref = h.getAttribute("href");
          h.removeAttribute("href");
        }
        h.setAttribute("aria-hidden", "true");
      } else {
        if (h.dataset.inactiveHref) {
          h.setAttribute("href", h.dataset.inactiveHref);
          delete h.dataset.inactiveHref;
        }
        h.removeAttribute("aria-hidden");
      }
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
      const noneVisible = roomHotspots.length > 0 && roomHotspots.every(isInactive);
      room.classList.toggle("room--filtered-empty", noneVisible);
    });

    TOTAL = hotspots.filter((h) => !isInactive(h)).length || hotspots.length;
    updateProgress();
    // Hiding a hotspot can take whichever badge is showing off the drawing entirely, and can also
    // hide the spot "Next" was pointing at, so both are re-placed here.
    updateGuideBadges(lastTrigger);

    // A stale info bar for a hotspot the new situation just ruled out would be confusing left open.
    if (!infoBar.hidden && lastTrigger && isInactive(lastTrigger)) closeInfoBar();
  }

  // The personalize dialog (situation-modal.js) saves and closes without navigating away, so it
  // announces the change instead of leaving the house to notice on its own.
  window.addEventListener("situationchange", applyPersonalization);

  // Reset, added 2026-08-20: puts every spot back to unvisited and restores the "Start here"
  // badge, undoing refreshVisitedStyling's own changes rather than reloading the page. Clearing
  // lastTrigger is part of that — the tour has no last-opened spot again — and it also leaves
  // focus on the Reset button the student just pressed, rather than closeInfoBar sending it back
  // to a hotspot they are no longer partway through.
  resetBtn?.addEventListener("click", () => {
    visited.clear();
    saveVisited();
    hotspots.forEach((h) => {
      h.classList.remove("hotspot--visited");
      if (h.dataset.baseLabel) {
        h.setAttribute("aria-label", h.dataset.baseLabel);
        delete h.dataset.baseLabel;
      }
    });
    lastTrigger = null;
    updateGuideBadges();
    if (!infoBar.hidden) closeInfoBar();
    updateProgress();
  });

  refreshVisitedStyling();
  updateGuideBadges();
  updateProgress();
  applyPersonalization();
}
