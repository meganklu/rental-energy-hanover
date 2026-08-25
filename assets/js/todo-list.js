// The /checklist page, F6 in features.md. Every improvement is already in the page as markup; this
// hides the ones that are not on the list, the same way the library filters its grid rather than
// building it. With the script off the page is the complete list of everything the site covers,
// which is still a usable thing to print and take to the shop.

import {
  read, write, setDone, remove, clear, readFromQuery, toQuery, merge,
} from "./todo-store.mjs";

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

    const isEmpty = viewing.length === 0;
    if (empty) empty.hidden = !isEmpty;
    if (toolbar) toolbar.hidden = isEmpty;
    if (sharedNote) sharedNote.hidden = !shared || isEmpty;
  }

  document.addEventListener("change", (event) => {
    const box = event.target.closest("[data-todo-done]");
    if (!box) return;
    const slug = box.dataset.todoDone;
    viewing = viewing.map((entry) => (entry.slug === slug ? { ...entry, done: box.checked } : entry));
    if (!shared) setDone(slug, box.checked);
    render();
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
        const box = row.querySelector("[data-todo-done]");
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

  window.addEventListener("todochange", () => {
    if (!shared) viewing = read(known);
    render();
  });

  render();
}
