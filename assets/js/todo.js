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

const buttons = [...document.querySelectorAll("[data-todo-slug]")];
const counts = [...document.querySelectorAll("[data-todo-count]")];

if (buttons.length || counts.length) {
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

    buttons.forEach((button) => {
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

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const added = toggle(button.dataset.todoSlug);
      const name = button.dataset.todoTitle || "This improvement";
      status.textContent = added
        ? `${name} added to your list.`
        : `${name} removed from your list.`;
    });
  });

  window.addEventListener("todochange", render);
  // Another tab changing the list should not leave this one showing a stale count.
  window.addEventListener("storage", (event) => {
    if (event.key === "todo") render();
  });

  render();
}
