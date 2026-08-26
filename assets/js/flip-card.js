// Flip cards, DESIGN.md §5.1. The markup carries the question and the answer one under the other,
// which is a complete card with no script at all. This turns the two into faces of one card.
//
// The turn itself is CSS: everything below `.flip-card--js` in components.css. What needs script is
// the state (`.flip-card--flipped`), the two buttons' `aria-expanded`, and moving focus — the face
// turning away goes `visibility: hidden`, so a reader who pressed a button on it would otherwise be
// left with focus on nothing.

const cards = document.querySelectorAll(".flip-card");

cards.forEach((card, index) => {
  const front = card.querySelector(".flip-card__front");
  const back = card.querySelector(".flip-card__back");
  const toBack = card.querySelector('[data-flip="back"]');
  const toFront = card.querySelector('[data-flip="front"]');
  if (!front || !back || !toBack || !toFront) return;

  // The back is what `aria-expanded` on the front button is about, so it needs a name to point at.
  // Written here rather than in the markup because it exists only once the card can actually turn.
  if (!back.id) back.id = `flip-card-answer-${index + 1}`;
  toBack.setAttribute("aria-controls", back.id);
  toBack.setAttribute("aria-expanded", "false");
  toFront.setAttribute("aria-controls", back.id);
  toFront.setAttribute("aria-expanded", "true");

  card.classList.add("flip-card--js");

  const turn = (flipped) => {
    card.classList.toggle("flip-card--flipped", flipped);
    toBack.setAttribute("aria-expanded", String(flipped));
    // Focus follows the card. The arriving face is visible from the first frame (the delay in
    // components.css is on the one leaving), so this lands on a focusable element either way.
    (flipped ? toFront : toBack).focus();
  };

  toBack.addEventListener("click", () => turn(true));
  toFront.addEventListener("click", () => turn(false));
});
