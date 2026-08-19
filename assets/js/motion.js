// Reduce-motion toggle, per DESIGN.md §7. The checkbox itself already drives the effect on the
// current page through CSS (`body:has(#reduce-motion:checked)` in base.css) with no JavaScript
// at all. This module only does two things JavaScript is required for: showing the toggle in
// the position that matches the student's operating system by default, and remembering an
// explicit choice across pages. Guarded on the element existing, per AGENTS.md JavaScript rules.

const toggle = document.getElementById("reduce-motion");

if (toggle) {
  const STORAGE_KEY = "motion";
  const stored = localStorage.getItem(STORAGE_KEY);
  const osPrefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (stored === "reduce") {
    toggle.checked = true;
  } else if (stored === "full") {
    // An explicit prior choice to keep motion on despite the OS setting. base.css only lets
    // this win over `prefers-reduced-motion` when this class is present, so a page that never
    // ran this script (or a first-ever visit) still falls back to the OS preference.
    toggle.checked = false;
    document.documentElement.classList.add("motion-forced-on");
  } else {
    toggle.checked = osPrefersReduced;
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      localStorage.setItem(STORAGE_KEY, "reduce");
      document.documentElement.classList.remove("motion-forced-on");
    } else {
      localStorage.setItem(STORAGE_KEY, "full");
      document.documentElement.classList.add("motion-forced-on");
    }
  });
}
