// Carousel controls, F-spec in DESIGN.md §5.1. The carousel scrolls and tabs with no JavaScript
// at all — it is a scroll-snap row of real slides — and the Previous/Next controls are ordinary
// anchor links to slide IDs, so they move the track natively too. Everything here is the optional
// half: retargeting those two links at the slides either side of wherever the reader currently is,
// keeping the "2 of 3" counter honest, and marking which slide is centered so the peek variant can
// bring it forward. With this file absent, Previous goes to the first slide and Next to the last,
// and every slide renders at full size, which is a working component rather than a dead one.
//
// Revised 2026-08-25: "which slides are there" is a question asked on every render rather than
// answered once at load. `/programs` filters its slides (assets/js/programs.js), and a count, a
// Previous target and a centered-slide measurement taken over slides that are no longer showing are
// all wrong in the same way. Anything that hides a slide dispatches `carouselrefresh` when it is
// done.

const carousels = document.querySelectorAll(".carousel:has([data-carousel-count])");

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".carousel__track");
  const allSlides = [...carousel.querySelectorAll(".carousel__slide")];
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const count = carousel.querySelector("[data-carousel-count]");
  if (!track || allSlides.length < 2 || !prev || !next || !count) return;

  let slides = allSlides;
  let current = 0;

  // Only now is the dimmed/scaled peek treatment safe to apply: something on the page can move
  // the emphasis as the reader scrolls. See the `.is-enhanced` note in components.css.
  carousel.classList.add("is-enhanced");

  function render() {
    slides = allSlides.filter((slide) => !slide.hidden);
    const total = slides.length;
    // Nothing matches the filter. The controls stay in the DOM and stay focusable, saying so,
    // rather than disappearing out from under whoever just changed the filter.
    if (total === 0) {
      count.textContent = "No programs match";
      prev.toggleAttribute("aria-disabled", true);
      next.toggleAttribute("aria-disabled", true);
      return;
    }

    current = Math.min(current, total - 1);
    count.textContent = `${current + 1} of ${total}`;
    allSlides.forEach((slide) => slide.classList.toggle("is-current", slide === slides[current]));
    // Clamped rather than wrapped: at either end the control points at the slide you are already
    // on, and is marked as unavailable, instead of silently jumping to the far end.
    const back = slides[Math.max(0, current - 1)];
    const forward = slides[Math.min(total - 1, current + 1)];
    prev.setAttribute("href", `#${back.id}`);
    next.setAttribute("href", `#${forward.id}`);
    prev.toggleAttribute("aria-disabled", current === 0);
    next.toggleAttribute("aria-disabled", current === total - 1);
  }

  function scrollToSlide(slide, behavior) {
    if (!slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior,
    });
  }

  const smoothOrNot = () =>
    matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  // Whichever slide's center is nearest the track's center is the one being read. Measured on
  // scroll rather than watched with IntersectionObserver, because a peek carousel deliberately
  // keeps two slides intersecting at once and "which is centered" is the question being asked.
  function measure() {
    if (slides.length === 0) return;
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

  // The href alone would work, but following it moves the document's scroll position as well as
  // the track's and leaves a fragment in the address bar for a control that is not a destination.
  // Scrolling the track directly keeps the page where it is. The href stays on the element as the
  // no-JS path and as the thing a middle-click or a screen reader announces.
  [prev, next].forEach((control) => {
    control.addEventListener("click", (event) => {
      if (control.hasAttribute("aria-disabled")) {
        event.preventDefault();
        return;
      }
      const target = document.getElementById(control.getAttribute("href").slice(1));
      if (!target) return;
      event.preventDefault();
      scrollToSlide(target, smoothOrNot());
    });
  });

  // A filter has changed which slides are showing. Back to the first result rather than wherever
  // the track happened to be sitting: the reader asked a new question and the answer starts at the
  // top of it.
  window.addEventListener("carouselrefresh", () => {
    current = 0;
    render();
    scrollToSlide(slides[0], "auto");
  });

  render();
});
