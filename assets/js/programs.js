// The /programs filter, DESIGN.md §3.9. Every program is already in the page as markup; this hides
// the ones that do not match, the same rule the library (library.js) and the doll house
// (dollhouse.js) follow. The two questions are the ones a renter actually arrives with: who has to
// sign, and what does it help with. Both are read off attributes the page carries, which are a
// restatement of each entry's own permission badges and its "What your landlord signs" line rather
// than anything new about the program.
//
// The form is hidden in the markup and revealed here. There is no server to submit it to, so with
// this file absent it would be a control that does nothing, and all seven programs show.

const form = document.getElementById("program-filter");
const programs = [...document.querySelectorAll("[data-program-permission]")];

if (form && programs.length) {
  const count = form.querySelector("[data-program-count]");
  const empty = document.querySelector("[data-program-empty]");
  const carousel = document.querySelector("[data-program-carousel]");

  form.hidden = false;

  function run() {
    const permission = form.elements.permission.value;
    const topic = form.elements.topic.value;

    let showing = 0;
    programs.forEach((program) => {
      // Space-separated, because a program can be about two things: Hanover Community Power is a
      // supply choice and it is also what lands on the bill.
      const topics = (program.dataset.programTopic || "").split(" ");
      const match =
        (permission === "any" || program.dataset.programPermission === permission) &&
        (topic === "any" || topics.includes(topic));
      program.hidden = !match;
      if (match) showing += 1;
    });

    if (count) {
      count.textContent =
        showing === programs.length
          ? `Showing all ${programs.length} programs.`
          : `Showing ${showing} of ${programs.length} programs.`;
    }
    if (empty) empty.hidden = showing > 0;
    if (carousel) carousel.hidden = showing === 0;

    // The carousel reads which slides are showing rather than being told, so this is only a nudge
    // to go and look again. See the revision note at the top of assets/js/carousel.js.
    window.dispatchEvent(new CustomEvent("carouselrefresh"));
  }

  form.addEventListener("change", run);
  // `type="reset"` restores the two selects to "any" with no script at all, but the event fires
  // before the values are actually restored, so the re-run waits a frame for them.
  form.addEventListener("reset", () => requestAnimationFrame(run));
  // Nothing is submitted anywhere. Enter in a select should not reload the page.
  form.addEventListener("submit", (event) => event.preventDefault());

  run();
}
