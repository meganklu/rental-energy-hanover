// The add-to-list buttons and the count in the header, F6 in features.md. Runs on every page,
// guarded on finding something to do.
//
// The pattern is a shopping cart's, because that is the interaction a student already knows: a
// control on the item that flips state the moment it is pressed, a running count in the header that
// never moves, and one link from that count to the whole list. What it deliberately does not do is
// navigate away on add. Adding a second improvement should cost one click from where you already
// are, and a cart that jumps you to the checkout after every item is the thing everyone complains
// about.

import { read, toggle } from "./todo-store.mjs";

// Re-queried on every render rather than captured once, and clicks are delegated from the document,
// both added 2026-08-25. The doll house info bar (assets/js/dollhouse.js) builds its own copy of
// this control after load, and a control built later has to behave like the ones in the markup
// rather than each caller reimplementing the label, the icon and `aria-pressed` for itself.
const buttonsIn = () => [...document.querySelectorAll("[data-todo-slug]")];
const counts = [...document.querySelectorAll("[data-todo-count]")];

if (buttonsIn().length || counts.length) {
  // One live region for the whole page rather than one per button. A button whose label changes
  // under the pointer is announced by most screen readers on focus, but a card button pressed by
  // mouse gives nothing back, and "did that work" is the question a cart has to answer instantly.
  const status = document.createElement("p");
  status.className = "visually-hidden";
  status.setAttribute("role", "status");
  document.body.appendChild(status);

  function render() {
    const list = read();
    const slugs = new Set(list.map((entry) => entry.slug));

    buttonsIn().forEach((button) => {
      const on = slugs.has(button.dataset.todoSlug);
      button.setAttribute("aria-pressed", String(on));
      const label = button.querySelector("[data-todo-label]");
      if (label) label.textContent = on ? "On your list" : "Add to my list";
      const use = button.querySelector("use");
      if (use) {
        use.setAttribute(
          "href",
          use.getAttribute("href").replace(/#icon-(plus|check)$/, on ? "#icon-check" : "#icon-plus")
        );
      }
    });

    counts.forEach((count) => {
      count.textContent = String(list.length);
      count.hidden = list.length === 0;
      // The badge is aria-hidden, so the number reaches a screen reader through the link's own name
      // instead of as a bare digit tacked onto "My list".
      const link = count.closest("a");
      if (link) {
        link.setAttribute(
          "aria-label",
          list.length === 0
            ? "My list, empty"
            : `My list, ${list.length} ${list.length === 1 ? "improvement" : "improvements"}`
        );
      }
    });
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-todo-slug]");
    if (!button) return;
    const added = toggle(button.dataset.todoSlug);
    const name = button.dataset.todoTitle || "This improvement";
    status.textContent = added
      ? `${name} added to your list.`
      : `${name} removed from your list.`;
    if (added) ripple();
  });

  // The count in the header pulses when something lands in it, added 2026-08-26. The cart problem
  // this solves is the oldest one there is: the button is under the reader's finger and the number
  // that changed is in the far corner of the screen, so the change happens where nobody is looking.
  // Adding only — a removal is already confirmed by the button under the pointer changing back, and
  // a badge that flashes on the way down reads like something went wrong.
  //
  // Class toggled rather than animated here, so the whole thing (including whether it runs at all)
  // stays in components.css behind the site's usual motion gates.
  function ripple() {
    counts.forEach((count) => {
      const badge = count.closest(".nav-todo") || count;
      badge.classList.remove("is-pinged");
      // Reading a layout property is what restarts a CSS animation that is already running: without
      // it the class comes off and goes back on inside one frame and nothing replays.
      void badge.offsetWidth;
      badge.classList.add("is-pinged");
    });
  }

  window.addEventListener("todochange", render);
  // Another tab changing the list should not leave this one showing a stale count.
  window.addEventListener("storage", (event) => {
    if (event.key === "todo") render();
  });

  render();
}
