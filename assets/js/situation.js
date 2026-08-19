// On /start: mirrors the submitted answers to localStorage without interfering with the plain
// GET submit — the form works identically with this script absent. On any page reached with
// situation query parameters (a filtered /improvements link), mirrors those too, so the stored
// situation stays in sync with whatever the student is actually looking at.

import { readFromQuery, saveToStorage, situationFromForm } from "./situation-store.mjs";

const fromQuery = readFromQuery(window.location.search);
if (fromQuery) saveToStorage(fromQuery);

const situationForm = document.querySelector("form[action$='improvements/']");
if (situationForm) {
  situationForm.addEventListener("submit", () => {
    saveToStorage(situationFromForm(situationForm));
  });
}
