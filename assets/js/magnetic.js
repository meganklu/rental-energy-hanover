// Magnetic hover, DESIGN.md §7, added 2026-08-26. A control marked `data-magnetic` leans a few
// pixels toward the pointer while the pointer is over it, and lets go when it leaves.
//
// Three gates before this does anything at all, matching every other ambient motion on the site:
//
//   `pointer: fine`      a magnet has nothing to follow on a touch screen, where the first the
//                        element hears about the pointer is the tap that already landed on it.
//   reduced motion       the media query and the site's own switch, both, and both re-read live so
//                        flipping the switch stops it without a reload.
//   `--magnet-range`     the CSS decides how far, and a control that does not set it does not move.
//                        That keeps "which things are magnetic" a design decision in one file.
//
// The move is a transform on a custom property rather than on `transform` itself, so it composes
// with whatever transform the control already had — the FAB's own lift, a button's active press —
// instead of overwriting it.

const els = [...document.querySelectorAll("[data-magnetic]")];

const fine = window.matchMedia("(pointer: fine)");
const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
const switched = () => document.querySelector(".reduce-motion-input:checked") !== null;
const allowed = () => fine.matches && !calm.matches && !switched();

if (els.length) {
  els.forEach((el) => {
    // Read on enter rather than on every move: this is a fixed distance per control, and asking the
    // style system for it sixty times a second is sixty style recalculations for one number.
    let range = 0;

    el.addEventListener("pointerenter", () => {
      range = allowed()
        ? parseFloat(getComputedStyle(el).getPropertyValue("--magnet-range")) || 0
        : 0;
    });

    el.addEventListener("pointermove", (event) => {
      if (!range) return;
      const box = el.getBoundingClientRect();
      // -1 to 1 across the control, so the pull is strongest at the edges and nothing at the middle.
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      el.style.setProperty("--magnet-x", `${(x * 2 * range).toFixed(2)}px`);
      el.style.setProperty("--magnet-y", `${(y * 2 * range).toFixed(2)}px`);
    });

    const release = () => {
      el.style.removeProperty("--magnet-x");
      el.style.removeProperty("--magnet-y");
    };
    el.addEventListener("pointerleave", release);
    // A control that is pressed navigates or opens something; leaving it leaning is a control that
    // has kept a state nobody set.
    el.addEventListener("blur", release);
    el.addEventListener("click", release);
  });

  // Turning the switch on mid-hover should put everything back where it belongs.
  document.addEventListener("change", (event) => {
    if (!event.target.closest(".reduce-motion-input") || allowed()) return;
    els.forEach((el) => {
      el.style.removeProperty("--magnet-x");
      el.style.removeProperty("--magnet-y");
    });
  });
}
