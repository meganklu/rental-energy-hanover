// Carousel controls, F-spec in DESIGN.md §5.1. The carousel scrolls and tabs with no JavaScript
// at all — it is a scroll-snap row of real slides — and the Previous/Next controls are ordinary
// anchor links to slide IDs, so they move the track natively too. Everything here is the optional
// half: retargeting those two links at the slides either side of wherever the reader currently is,
// and keeping the "2 of 3" counter honest. With this file absent, Previous goes to the first slide
// and Next to the last, which is still a working control rather than a dead one.

const carousels = document.querySelectorAll(".carousel:has([data-carousel-count])");

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".carousel__track");
  const slides = [...carousel.querySelectorAll(".carousel__slide")];
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const count = carousel.querySelector("[data-carousel-count]");
  if (!track || slides.length < 2 || !prev || !next || !count) return;

  const total = slides.length;
  let current = 0;

  function render() {
    count.textContent = `${current + 1} of ${total}`;
    // Clamped rather than wrapped: at either end the control points at the slide you are already
    // on, and is marked as unavailable, instead of silently jumping to the far end.
    const back = slides[Math.max(0, current - 1)];
    const forward = slides[Math.min(total - 1, current + 1)];
    prev.setAttribute("href", `#${back.id}`);
    next.setAttribute("href", `#${forward.id}`);
    prev.toggleAttribute("aria-disabled", current === 0);
    next.toggleAttribute("aria-disabled", current === total - 1);
  }

  // Whichever slide's center is nearest the track's center is the one being read. Measured on
  // scroll rather than watched with IntersectionObserver, because a peek carousel deliberately
  // keeps two slides intersecting at once and "which is centered" is the question being asked.
  function measure() {
    const middle = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - middle);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    if (best !== current) {
      current = best;
      render();
    }
  }

  let queued = false;
  track.addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      measure();
    });
  });

  render();
});
