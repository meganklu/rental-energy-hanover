// The /checklist page, F6 in features.md. Every improvement is already in the page as markup; this
// hides the ones that are not on the list, the same way the library filters its grid rather than
// building it. With the script off the page is the complete list of everything the site covers,
// which is still a usable thing to print and take to the shop.

import {
  read, write, setDone, setTick, remove, clear, readFromQuery, toQuery, merge,
} from "./todo-store.mjs";
import { composeEmail } from "./ask-email.mjs";

const sections = [...document.querySelectorAll("[data-todo-section]")];
if (sections.length) {
  const rows = [...document.querySelectorAll("[data-todo-item]")];
  const known = new Set(rows.map((row) => row.dataset.todoItem));
  const empty = document.querySelector("[data-todo-empty]");
  const toolbar = document.querySelector("[data-todo-toolbar]");
  const sharedNote = document.querySelector("[data-todo-shared]");

  // A list arriving by link is shown but not saved. Someone opening a roommate's link has not asked
  // for their own list to be replaced, and a cart that silently rewrites itself from a URL is the
  // kind of surprise this pattern is supposed to avoid. The Save button is the consent.
  const shared = readFromQuery(window.location.search, known);
  let viewing = shared || read(known);

  function render() {
    const slugs = new Set(viewing.map((entry) => entry.slug));
    const done = new Map(viewing.map((entry) => [entry.slug, entry.done]));

    rows.forEach((row) => {
      row.hidden = !slugs.has(row.dataset.todoItem);
    });
    sections.forEach((section) => {
      section.hidden = !section.querySelector("[data-todo-item]:not([hidden])");
    });

    document.querySelectorAll("[data-todo-done]").forEach((box) => {
      box.checked = done.get(box.dataset.todoDone) === true;
      box.closest(".todo-item")?.classList.toggle("is-done", box.checked);
    });

    // The buy and ask sections tick per line rather than per improvement, added 2026-08-26: one
    // improvement puts three materials in the shop list and one row in the ask list, and those get
    // crossed off at different moments.
    const ticks = new Map(viewing.map((entry) => [entry.slug, new Set(entry.ticks)]));
    document.querySelectorAll("[data-todo-tick]").forEach((box) => {
      box.checked = ticks.get(box.dataset.todoTickSlug)?.has(box.dataset.todoTick) === true;
      box.closest("li")?.classList.toggle("is-ticked", box.checked);
    });

    renderEmail();

    const isEmpty = viewing.length === 0;
    if (empty) empty.hidden = !isEmpty;
    if (toolbar) toolbar.hidden = isEmpty;
    if (sharedNote) sharedNote.hidden = !shared || isEmpty;
  }

  document.addEventListener("change", (event) => {
    const doneBox = event.target.closest("[data-todo-done]");
    if (doneBox) {
      const slug = doneBox.dataset.todoDone;
      viewing = viewing.map((entry) => (
        entry.slug === slug ? { ...entry, done: doneBox.checked } : entry));
      if (!shared) setDone(slug, doneBox.checked);
      render();
      return;
    }

    const tickBox = event.target.closest("[data-todo-tick]");
    if (tickBox) {
      const { todoTickSlug: slug, todoTick: tick } = tickBox.dataset;
      viewing = viewing.map((entry) => {
        if (entry.slug !== slug) return entry;
        const next = new Set(entry.ticks);
        if (tickBox.checked) next.add(tick); else next.delete(tick);
        return { ...entry, ticks: [...next] };
      });
      if (!shared) setTick(slug, tick, tickBox.checked);
      render();
      return;
    }

    // The three fields under the draft. They are read on every keystroke and never written down:
    // a name and an address are exactly what docs/project-brief.md's non-goals rule out storing.
    if (event.target.closest("[data-ask-email] input")) renderEmail();
  });

  document.addEventListener("input", (event) => {
    if (event.target.closest("[data-ask-email] input")) renderEmail();
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.todoRemove !== undefined) {
      const slug = button.dataset.todoRemove;
      viewing = viewing.filter((entry) => entry.slug !== slug);
      if (!shared) remove(slug);
      render();
      return;
    }

    if (button.dataset.todoSave !== undefined) {
      merge(viewing);
      // Drop the query string so a reload does not put the page back into shared mode, and so the
      // address bar stops advertising a list that is now simply theirs.
      window.location.replace(window.location.pathname);
      return;
    }

    if (button.dataset.todoPrint !== undefined) {
      window.print();
      return;
    }

    if (button.dataset.todoClear !== undefined) {
      // The one destructive control on the page, so it is the one that asks.
      if (!window.confirm("Clear everything from your list? This cannot be undone.")) return;
      clear();
      viewing = [];
      render();
      return;
    }

    if (button.dataset.todoDownload !== undefined) {
      download(asText());
      return;
    }

    if (button.dataset.todoCopy !== undefined) {
      copyLink(button);
      return;
    }

    if (button.dataset.askCopy !== undefined) {
      copyEmail(button);
    }
  });

  // Plain text rather than anything structured: this is a list to read on a phone in a shop, and a
  // .txt opens everywhere without asking what to open it with.
  function asText() {
    const lines = ["Your list — Energy for Student Renters", ""];
    sections.forEach((section) => {
      const visible = [...section.querySelectorAll("[data-todo-item]:not([hidden])")];
      if (!visible.length) return;
      lines.push(section.querySelector("h2").textContent.trim().toUpperCase(), "");
      visible.forEach((row) => {
        const box = row.querySelector("[data-todo-done], [data-todo-tick]");
        const mark = box ? (box.checked ? "[x] " : "[ ] ") : "- ";
        const title = row.querySelector("h3, .todo-buy__what, .todo-ask__what");
        lines.push(mark + (title ? title.textContent.trim().replace(/\s+/g, " ") : ""));
      });
      lines.push("");
    });
    lines.push(window.location.origin + window.location.pathname.replace(/checklist\/$/, ""));
    return lines.join("\n");
  }

  function download(text) {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-energy-list.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function copyLink(button) {
    const url = `${window.location.origin}${window.location.pathname}?items=${toQuery(viewing)}`;
    const label = button.querySelector("[data-todo-copy-label]");
    const restore = label?.textContent;
    try {
      await navigator.clipboard.writeText(url);
      if (label) label.textContent = "Link copied";
    } catch {
      // Clipboard access can be refused, and on a page served over plain HTTP it is not there at
      // all. Falling back to the share sheet covers most phones; failing that, say so rather than
      // leaving a button that looks like it worked.
      if (navigator.share) {
        try {
          await navigator.share({ title: "My energy list", url });
          return;
        } catch {
          /* the reader dismissed the sheet */
        }
      }
      if (label) label.textContent = "Press Ctrl+C to copy";
      window.prompt("Copy this link:", url);
    }
    if (label && restore) setTimeout(() => { label.textContent = restore; }, 2500);
  }

  /* ---------- The email draft, added 2026-08-26 ----------
     The ask list already knows which improvements need the landlord and what each one involves, so
     the email writes itself from the rows that are showing. It follows the six things
     /learn/ask-your-landlord says a good ask has in it: one specific thing per paragraph, what it
     costs, who pays, what is in it for them, and a date to answer by.

     Every fixed sentence comes out of the page's own markup rather than out of a string here, per
     the content conventions. The three fields are the parts only the reader knows, and none of them
     is read back from or written to storage: a name and an address are what
     docs/project-brief.md's non-goals rule out keeping. */
  const emailEl = document.querySelector("[data-ask-email]");
  const body = document.getElementById("ask-email-body");
  const subject = document.getElementById("ask-email-subject");
  const mailto = document.querySelector("[data-ask-mailto]");
  const parts = (name) =>
    document.querySelector(`[data-ask-template] [data-ask-part="${name}"]`)?.textContent.trim() || "";
  // A textarea the reader has typed into is theirs. Regenerating over the top of an edit is the one
  // thing this must not do, so from the first keystroke the draft stops being rewritten.
  let edited = false;
  body?.addEventListener("input", () => { edited = true; });

  function renderEmail() {
    if (!emailEl || !body) return;

    const askSection = document.querySelector('[data-todo-section="ask"]');
    const rows = askSection
      ? [...askSection.querySelectorAll("[data-todo-item]:not([hidden])")]
      : [];
    emailEl.hidden = rows.length === 0;
    if (!rows.length || edited) { syncMailto(); return; }

    body.value = composeEmail({
      parts,
      items: rows.map((row) => ({
        title: row.querySelector(".todo-ask__what")?.textContent.trim() || "",
        line: row.querySelector("[data-ask-line]")?.textContent.trim().replace(/\s+/g, " ") || "",
        diy: row.dataset.askDiy !== undefined,
      })),
      landlord: document.getElementById("ask-email-landlord")?.value.trim() || "",
      address: document.getElementById("ask-email-address")?.value.trim() || "",
      by: document.getElementById("ask-email-date")?.value || "",
    });
    syncMailto();
  }

  function syncMailto() {
    if (!mailto || !body) return;
    // No address in it. The reader's landlord is not something this site knows or wants to know, so
    // the link opens a blank To: field with the draft already in it.
    mailto.href = `mailto:?subject=${encodeURIComponent(subject?.value || "")}`
      + `&body=${encodeURIComponent(body.value)}`;
  }

  async function copyEmail(button) {
    const label = button.querySelector("[data-ask-copy-label]");
    const restore = label?.textContent;
    const text = `${subject?.value || ""}\n\n${body?.value || ""}`;
    try {
      await navigator.clipboard.writeText(text);
      if (label) label.textContent = "Email copied";
    } catch {
      // Same two-step fallback as the share link above: clipboard access can be refused and is
      // absent over plain HTTP. Selecting the textarea leaves the reader one keystroke from copying.
      body?.focus();
      body?.select();
      if (label) label.textContent = "Press Ctrl+C to copy";
    }
    if (label && restore) setTimeout(() => { label.textContent = restore; }, 2500);
  }

  window.addEventListener("todochange", () => {
    if (!shared) viewing = read(known);
    render();
  });

  render();
}
