// Composing the landlord email, F6 in features.md, added 2026-08-26. Pure functions, split out of
// assets/js/todo-list.js for the same reason filter-logic.mjs is split out of library.js: this is
// the part that produces the thing a student actually sends, and it is testable without a DOM.
//
// Nothing here writes any prose. Every fixed sentence arrives in `parts`, read out of the page's
// own markup, per the content conventions. This decides which sentences apply and what order they
// go in.

// `by` is the value of a date input, so it is an ISO day string. Parsed as three numbers rather
// than handed to `new Date`, because `new Date("2026-10-31")` is UTC midnight and renders as the
// day before in every timezone west of London — including this one.
export function longDate(iso, locale) {
  const [y, m, d] = String(iso).split("-").map(Number);
  if (!y || !m || !d) return String(iso);
  return new Date(y, m - 1, d).toLocaleDateString(locale, {
    weekday: "long", month: "long", day: "numeric",
  });
}

/**
 * @param {object} o
 * @param {{title: string, line: string, diy: boolean}[]} o.items  one per ask row showing
 * @param {(name: string) => string} o.parts  the page's fixed sentences, by data-ask-part name
 * @param {string} [o.landlord]  what the reader typed, or nothing
 * @param {string} [o.address]   what the reader typed, or nothing
 * @param {string} [o.by]        an ISO day from the date input, or nothing
 */
export function composeEmail({ items, parts, landlord = "", address = "", by = "", locale } = {}) {
  const numbered = items.map((item, i) => `${i + 1}. ${item.title}\n${item.line}`);

  const blocks = [
    landlord ? parts("greeting").replace("{landlord}", landlord) : parts("greeting-blank"),
    parts("opening").replace("{address}", address || parts("address-blank")),
    numbered.join("\n\n"),
    // The offer sentence is about buying materials and doing the work. One of the four ask rows is
    // telling a landlord you are away over the break, which is neither, so the sentence only goes
    // in when something on the list is actually work the reader would do.
    items.some((item) => item.diy) ? parts("offer") : "",
    by ? parts("closing").replace("{date}", longDate(by, locale)) : parts("closing-blank"),
    parts("signoff"),
  ];

  return blocks.filter(Boolean).join("\n\n");
}
