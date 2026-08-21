// The "Back to the house" link on an improvement/explainer page only makes sense when that page
// was actually reached from the doll house tour. `document.referrer` cannot tell us that (the
// fragment identifier, "#house", never reaches the server or the Referer header), so instead the
// house section marks its own outbound clicks in sessionStorage right before the browser follows
// the link, and the next page reads that flag once and clears it. Both halves live in one
// guarded module, since each half only ever finds its element on one kind of page.

const STORAGE_KEY = "cameFromHouse";

const house = document.getElementById("house");
house?.addEventListener("click", (event) => {
  if (event.target.closest("a[href]")) sessionStorage.setItem(STORAGE_KEY, "1");
});

const returnLink = document.querySelector(".house-return-link");
if (returnLink) {
  returnLink.hidden = sessionStorage.getItem(STORAGE_KEY) !== "1";
  sessionStorage.removeItem(STORAGE_KEY);
}
