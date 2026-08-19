// The situation chip in the header, and mirroring the four-question form to localStorage.
// Source of truth is the URL query string when present (per architecture.md D10); localStorage
// under the "situation" key is the copy that lets the chip stay accurate on pages that carry no
// query string of their own. No identifiers, no free text, per AGENTS.md rule 7.

const STORAGE_KEY = "situation";
const FIELDS = ["heat", "payer", "lease", "phase"];

function readFromQuery() {
  const params = new URLSearchParams(window.location.search);
  if (!FIELDS.some((f) => params.has(f))) return null;
  const situation = {};
  FIELDS.forEach((f) => {
    situation[f] = params.get(f) || "any";
  });
  return situation;
}

function readFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function saveToStorage(situation) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(situation));
}

const HEAT_LABELS = {
  "electric-baseboard": "Electric baseboard",
  "forced-air": "Forced air",
  radiator: "Radiator",
  "heat-pump": "Heat pump",
};
const PAYER_LABELS = { tenant: "I pay heat", included: "Heat included" };
const LEASE_LABELS = {
  under3: "Under 3 months left",
  "3to6": "3 to 6 months left",
  "6to12": "6 to 12 months left",
  over12: "12+ months left",
};

function chipText(situation) {
  if (!situation) return null;
  const parts = [
    HEAT_LABELS[situation.heat],
    PAYER_LABELS[situation.payer],
    LEASE_LABELS[situation.lease],
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : null;
}

function renderChip(situation) {
  const chip = document.getElementById("situation-chip");
  if (!chip) return;
  const text = chipText(situation);
  chip.textContent = text || "Set your situation";
}

const fromQuery = readFromQuery();
if (fromQuery) saveToStorage(fromQuery);
renderChip(fromQuery || readFromStorage());

// On /start, mirror the submitted answers without interfering with the plain GET submit —
// the form works identically with this script absent.
const situationForm = document.querySelector("form[action$='improvements/']");
if (situationForm) {
  situationForm.addEventListener("submit", () => {
    const data = new FormData(situationForm);
    const situation = {};
    FIELDS.forEach((f) => {
      situation[f] = data.get(f) || "any";
    });
    saveToStorage(situation);
  });
}
