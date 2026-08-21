// Animated explainer diagrams, F4 in features.md. The finished frame is complete and correct
// with no script at all — this only starts the loop once a diagram scrolls into view. Pausing is
// now the motion-fab's Pause button (assets/js/motion.js), shared across every animated page
// instead of a per-diagram button; reduced motion (OS, the reduce-motion switch, or the pause
// button) is handled by CSS alone via --motion-state, so this script does not need to know
// about any of it.

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

  figures.forEach((figure) => observer.observe(figure));
}
