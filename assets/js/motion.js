// Reduce-motion toggle and pause button, per DESIGN.md §7. Both already drive the current page
// through CSS alone (`body:has(.reduce-motion-input:checked)` and `body.motion-paused` in
// base.css) with no JavaScript needed for the effect itself. This module only does what actually
// needs script: showing the toggle in the position that matches the student's OS by default,
// holding every `.reduce-motion-input` on the page in agreement (one today, in the motion-fab, and
// the footer carried a second until 2026-08-21), remembering an explicit choice across pages, and
// wiring the motion-fab's Pause button.

const toggles = document.querySelectorAll(".reduce-motion-input");

if (toggles.length) {
  const STORAGE_KEY = "motion";
  const stored = localStorage.getItem(STORAGE_KEY);
  const osPrefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // The class exists for one thing the `:has()` selectors cannot do: reach a view transition.
  // A transition's pseudo-elements hang off the root element, and `body:has(...)` does not select
  // the root, so the page-transition rules in components.css key off this instead. Added
  // 2026-08-26. Everything else about the switch still works with no script at all.
  const setToggles = (checked) => {
    toggles.forEach((toggle) => { toggle.checked = checked; });
    document.documentElement.classList.toggle("motion-reduced", checked);
  };

  if (stored === "reduce") {
    setToggles(true);
  } else if (stored === "full") {
    // An explicit prior choice to keep motion on despite the OS setting. base.css only lets
    // this win over `prefers-reduced-motion` when this class is present, so a page that never
    // ran this script (or a first-ever visit) still falls back to the OS preference.
    setToggles(false);
    document.documentElement.classList.add("motion-forced-on");
  } else {
    setToggles(osPrefersReduced);
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      setToggles(toggle.checked);
      if (toggle.checked) {
        localStorage.setItem(STORAGE_KEY, "reduce");
        document.documentElement.classList.remove("motion-forced-on");
      } else {
        localStorage.setItem(STORAGE_KEY, "full");
        document.documentElement.classList.add("motion-forced-on");
      }
    });
  });
}

// The motion-fab Pause button: a per-page, session-local override (not persisted, unlike the
// switch above) that stops whatever is currently looping, per WCAG 2.2.2. Only ever shown by CSS
// when the page actually has a `.motion-loop` element, but the listener itself is cheap to attach
// unconditionally and stays guarded on the button existing.
const pauseButton = document.getElementById("motion-pause");

if (pauseButton) {
  pauseButton.addEventListener("click", () => {
    const paused = document.body.classList.toggle("motion-paused");
    // Swaps only the fragment name, keeping whatever "../" depth prefix is already in the
    // markup — this script runs at every page depth, unlike assets/js/diagram.js's Pause
    // button, which could hardcode a path because it only ever loaded from learn/<slug>/.
    const use = pauseButton.querySelector("use");
    const href = use.getAttribute("href").replace(/icon-(pause|play)$/, `icon-${paused ? "play" : "pause"}`);
    use.setAttribute("href", href);
    pauseButton.querySelector(".visually-hidden").textContent = paused ? "Play animations" : "Pause animations";
    pauseButton.setAttribute("aria-pressed", String(paused));
  });
}
