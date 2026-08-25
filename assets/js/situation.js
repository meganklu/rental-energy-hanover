// On /start: mirrors the submitted answers to localStorage without interfering with the plain
// GET submit — the form works identically with this script absent. On any page reached with
// situation query parameters (a filtered /improvements link), mirrors those too, so the stored
// situation stays in sync with whatever the student is actually looking at.

import { readFromQuery, saveToStorage, clearStorage, situationFromForm } from "./situation-store.mjs";

const fromQuery = readFromQuery(window.location.search);
if (fromQuery) saveToStorage(fromQuery);

const situationForm = document.querySelector("form[action$='improvements/']");
if (situationForm) {
  situationForm.addEventListener("submit", () => {
    saveToStorage(situationFromForm(situationForm));
  });

  // The Reset button is a plain `type="reset"`, so the radios go back to "I am not sure" on their
  // own. This clears the saved copy to match, and announces it so anything already reading the
  // stored situation on this page re-checks it. Fires after the browser's own reset handling,
  // which runs at the end of the event's default action rather than before the listener.
  situationForm.addEventListener("reset", () => {
    clearStorage();
    window.dispatchEvent(new CustomEvent("situationchange"));
  });
}
