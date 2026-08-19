// Animated explainer diagrams, F4 in features.md. The finished frame is complete and correct
// with no script at all — this only starts the loop once a diagram scrolls into view, and wires
// up its Pause/Play button. Reduced motion (OS or the footer toggle) is handled by CSS alone via
// --motion-state; this script does not need to know about it.

const figures = document.querySelectorAll(".diagram-figure");

if (figures.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  figures.forEach((figure) => {
    observer.observe(figure);

    const button = figure.querySelector(".diagram-controls button");
    if (!button) return;
    button.addEventListener("click", () => {
      const paused = figure.classList.toggle("paused");
      // Path assumes learn/<slug>/, the only depth this script is loaded from today.
      button.querySelector("use").setAttribute("href", `../../assets/icons/sprite.svg#icon-${paused ? "play" : "pause"}`);
      button.querySelector(".diagram-controls__label").textContent = paused ? "Play" : "Pause";
      button.setAttribute("aria-pressed", String(!paused));
    });
  });
}
