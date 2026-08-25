// Reads and writes the one shared "situation" record, per DESIGN.md §3.3 and architecture.md D10.
// Used by both /start's own page (assets/js/situation.js) and the personalize dialog
// (assets/js/situation-modal.js), so there is exactly one place this shape is defined.

export const STORAGE_KEY = "situation";
export const FIELDS = ["heat", "payer", "lease", "phase"];

export function readFromQuery(search) {
  const params = new URLSearchParams(search);
  if (!FIELDS.some((f) => params.has(f))) return null;
  const situation = {};
  FIELDS.forEach((f) => {
    situation[f] = params.get(f) || "any";
  });
  return situation;
}

export function readFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveToStorage(situation) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(situation));
}

// Added 2026-08-24 for the form's Reset button. `type="reset"` already restores what is on screen
// to the "I am not sure" defaults with no script at all; forgetting the saved answers too is the
// part markup cannot do, and without it a reader who resets and closes the dialog would find the
// old answers still narrowing the list behind it.
export function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

export function situationFromForm(formEl) {
  const data = new FormData(formEl);
  const situation = {};
  FIELDS.forEach((f) => {
    situation[f] = data.get(f) || "any";
  });
  return situation;
}

// Checks every radio/select named for a FIELDS entry to match a stored situation, so a freshly
// injected copy of the form (the dialog) or a reload of /start itself opens pre-filled.
export function applyToForm(formEl, situation) {
  if (!situation) return;
  FIELDS.forEach((field) => {
    const value = situation[field];
    if (!value) return;
    const input = formEl.querySelector(`[name="${field}"][value="${value}"]`);
    if (input) input.checked = true;
  });
}
