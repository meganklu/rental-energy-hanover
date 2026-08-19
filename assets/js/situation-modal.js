// The "Personalize your recommendations" floating action button, DESIGN.md §3.3. The button is
// a real link to /start; this only intercepts the click to show the same form in a <dialog>
// instead of navigating away. There is exactly one copy of the form's markup, on the /start
// page itself — this fetches it rather than duplicating the fieldsets into every page's shell.

import { readFromStorage, saveToStorage, situationFromForm, applyToForm } from "./situation-store.mjs";

const fab = document.getElementById("situation-fab");
const dialog = document.getElementById("situation-dialog");
const body = document.getElementById("situation-dialog-body");
const closeBtn = document.getElementById("situation-dialog-close");

if (fab && dialog && body && "showModal" in dialog) {
  let loaded = false;

  async function ensureFormLoaded() {
    if (loaded) return true;
    try {
      const res = await fetch(fab.getAttribute("href"));
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const sourceForm = doc.querySelector("form");
      if (!sourceForm) return false;

      const heading = document.createElement("h2");
      heading.id = "situation-dialog-heading";
      heading.textContent = "Set your situation";
      body.appendChild(heading);
      body.appendChild(sourceForm);

      sourceForm.addEventListener("submit", (event) => {
        event.preventDefault();
        saveToStorage(situationFromForm(sourceForm));
        dialog.close();
      });

      loaded = true;
      return true;
    } catch {
      return false;
    }
  }

  fab.addEventListener("click", async (event) => {
    event.preventDefault();
    const ok = await ensureFormLoaded();
    if (!ok) {
      window.location.href = fab.getAttribute("href");
      return;
    }
    applyToForm(body.querySelector("form"), readFromStorage());
    dialog.showModal();
  });

  closeBtn?.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
