import { test } from "node:test";
import assert from "node:assert/strict";
import { composeEmail, longDate } from "../assets/js/ask-email.mjs";

// Stands in for the page's `[data-ask-template]` block. Short strings, because what is under test
// is which sentences apply and in what order, not the wording of any of them.
const SENTENCES = {
  greeting: "Hello {landlord},",
  "greeting-blank": "Hello,",
  "address-blank": "the apartment",
  opening: "I rent {address} from you.",
  offer: "I would buy the materials and do the work myself.",
  closing: "Could you let me know by {date}?",
  "closing-blank": "Could you let me know?",
  signoff: "Thanks,",
};
const parts = (name) => SENTENCES[name] ?? "";

const sweep = { title: "Seal your door with a sweep", line: "Fit weatherstripping.", diy: true };
const away = { title: "Shut down before a break", line: "I will be away.", diy: false };

test("numbers each ask row and puts its sentence underneath", () => {
  const out = composeEmail({ items: [sweep, away], parts });
  assert.match(out, /1\. Seal your door with a sweep\nFit weatherstripping\./);
  assert.match(out, /2\. Shut down before a break\nI will be away\./);
});

test("uses the landlord's name when there is one, and a bare greeting when there is not", () => {
  assert.match(composeEmail({ items: [sweep], parts, landlord: "Sam" }), /^Hello Sam,/);
  assert.match(composeEmail({ items: [sweep], parts }), /^Hello,/);
});

test("falls back to the page's own phrase when no address is typed", () => {
  assert.match(composeEmail({ items: [sweep], parts }), /I rent the apartment from you\./);
  assert.match(
    composeEmail({ items: [sweep], parts, address: "12 Summer Street" }),
    /I rent 12 Summer Street from you\./
  );
});

// The one conditional sentence: it is about buying materials and doing work, so a list holding only
// "I will be away over the break" must not claim the reader is buying anything.
test("includes the offer sentence only when something on the list is work the reader would do", () => {
  assert.match(composeEmail({ items: [sweep, away], parts }), /buy the materials/);
  assert.doesNotMatch(composeEmail({ items: [away], parts }), /buy the materials/);
});

test("asks for an answer by a date only when one is set", () => {
  assert.match(composeEmail({ items: [sweep], parts, by: "2026-10-31", locale: "en-US" }),
    /Could you let me know by Saturday, October 31\?/);
  assert.match(composeEmail({ items: [sweep], parts }), /Could you let me know\?/);
});

test("blocks are separated by a blank line and the sign-off is last", () => {
  const out = composeEmail({ items: [sweep], parts, landlord: "Sam" });
  assert.equal(out.split("\n\n").at(-1), "Thanks,");
  assert.ok(!out.includes("\n\n\n"));
});

// A date input can hand back an empty string, and a day parsed as UTC midnight renders as the day
// before west of London. Both are the reasons this is not a one-liner in the caller.
test("longDate keeps the day it was given, and passes anything unparseable straight through", () => {
  assert.equal(longDate("2026-01-01", "en-US"), "Thursday, January 1");
  assert.equal(longDate(""), "");
  assert.equal(longDate("not-a-date"), "not-a-date");
});
