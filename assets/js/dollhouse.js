// Doll house interactivity: F1 in features.md. Enlarging a room is plain CSS (:target), and
// every hotspot is a real link to its improvement or explainer page, so all of this is optional
// enhancement. Guarded on the elements it needs, per AGENTS.md JavaScript rules. Path below
// ("content/improvements.json") is root-relative-by-position, correct because this module is
// only ever loaded from index.html today.

const dollhouseEl = document.querySelector(".dollhouse");
const infoBar = document.getElementById("info-bar");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

if (dollhouseEl && infoBar) {
  const hotspots = [...dollhouseEl.querySelectorAll(".hotspot")];
  const TOTAL = hotspots.length;
  const VISITED_KEY = "visitedSpots";
  const roomIndexLink = document.getElementById("everything-in-this-house");

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

  function updateProgress() {
    if (!progressText) return;
    progressText.textContent = `You have viewed ${visited.size} of ${TOTAL} spots.`;
    if (progressFill) {
      progressFill.style.setProperty("--progress", `${Math.round((visited.size / TOTAL) * 100)}%`);
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
    const map = {
      fully: "Comes off at move-out",
      mostly: "Mostly comes off at move-out",
      no: "Permanent. Check with your landlord first",
    };
    return map[value] || null;
  }

  function nextHotspot(currentOrder) {
    const order = Number(currentOrder);
    const sorted = [...hotspots].sort((a, b) => a.dataset.order - b.dataset.order);
    const idx = sorted.findIndex((h) => Number(h.dataset.order) === order);
    return sorted[(idx + 1) % sorted.length];
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
    lastTrigger = hotspot;

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
    }
    if (item.reversible) {
      const rt = reversibleText(item.reversible);
      if (rt) badges.push(`<span class="badge badge--reversible">${rt}</span>`);
    }

    const next = nextHotspot(hotspot.dataset.order);
    const allSeen = visited.size >= TOTAL;

    infoBar.innerHTML = `
      <p class="eyebrow">${room} · ${label}</p>
      <h3 class="info-bar__heading" tabindex="-1">${item.title}</h3>
      <div class="badge-row">${badges.join("")}</div>
      <p>${item.summary}</p>
      <div class="info-bar__actions">
        <a class="btn btn--primary" href="${hotspot.getAttribute("href")}">See the full steps</a>
        <button type="button" class="btn btn--secondary" id="info-bar-next">
          ${allSeen ? "That is all ten spots. View everything in one list." : `Next spot: ${next.dataset.label}`}
        </button>
        <button type="button" class="btn btn--text" id="info-bar-close">Close</button>
      </div>
    `;

    infoBar.hidden = false;

    const heading = infoBar.querySelector(".info-bar__heading");
    if (moveFocus && heading) heading.focus();

    infoBar.querySelector("#info-bar-next").addEventListener("click", () => {
      if (allSeen) {
        infoBar.hidden = true;
        roomIndexLink?.focus();
        roomIndexLink?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      openHotspot(next);
    });

    infoBar.querySelector("#info-bar-close").addEventListener("click", closeInfoBar);
  }

  function closeInfoBar() {
    infoBar.hidden = true;
    infoBar.innerHTML = "";
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
    }
  });

  refreshVisitedStyling();
  updateProgress();
}
