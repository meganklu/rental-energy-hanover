// The one shared "my list" record, F6 in features.md. The same shape as the situation store next
// door (assets/js/situation-store.mjs): one localStorage key, one place the shape is defined, and
// nothing leaves the browser. A list is improvement slugs, a done flag and a set of ticked lines,
// which is all it can be without collecting something about the student — see
// docs/project-brief.md's non-goals.
//
// `ticks` was added 2026-08-26, when the buy and ask sections got checkboxes of their own. A slug
// alone could not carry them: one improvement puts three materials in the buy list and one row in
// the ask list, and those are four separate things to tick off. A tick id only has to be unique
// within its improvement, so the markup writes short ones ("buy:door-sweep", "ask") and removing
// the improvement takes its ticks with it rather than leaving them orphaned in storage.

export const STORAGE_KEY = "todo";

// Anything read back out of storage or off a URL is treated as untrusted: it is whatever was in
// that browser last, or whatever a roommate pasted into a link. Only slugs the page already knows
// about survive the filter, so a hand-edited value cannot put arbitrary text on the page.
function clean(list, knownSlugs) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  return list
    .map((entry) => (typeof entry === "string" ? { slug: entry, done: false } : entry))
    .filter((entry) => entry && typeof entry.slug === "string")
    .filter((entry) => (knownSlugs ? knownSlugs.has(entry.slug) : true))
    .filter((entry) => (seen.has(entry.slug) ? false : seen.add(entry.slug)))
    .map((entry) => ({
      slug: entry.slug,
      done: entry.done === true,
      // Capped and deduped for the same reason the slugs are: this comes back out of storage or off
      // a URL, and a tick id is the one field the page cannot check against a known set, since the
      // ids live in the markup of whichever sections happen to be on the page.
      ticks: Array.isArray(entry.ticks)
        ? [...new Set(entry.ticks.filter((t) => typeof t === "string" && t.length <= 64))].slice(0, 24)
        : [],
    }));
}

export function read(knownSlugs) {
  try {
    return clean(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"), knownSlugs);
  } catch {
    return [];
  }
}

export function write(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clean(list)));
  // Every copy of the add button on the page, and the count in the header, re-reads on this rather
  // than each of them polling storage. `storage` events only fire in *other* tabs, so this is what
  // keeps the current one in agreement with itself.
  window.dispatchEvent(new CustomEvent("todochange"));
}

export function has(slug) {
  return read().some((entry) => entry.slug === slug);
}

export function toggle(slug) {
  const list = read();
  const next = list.some((entry) => entry.slug === slug)
    ? list.filter((entry) => entry.slug !== slug)
    : [...list, { slug, done: false, ticks: [] }];
  write(next);
  return next.some((entry) => entry.slug === slug);
}

export function setDone(slug, done) {
  write(read().map((entry) => (entry.slug === slug ? { ...entry, done } : entry)));
}

// One ticked line inside an improvement: a material in the buy list, or its row in the ask list.
export function setTick(slug, tick, on) {
  write(read().map((entry) => {
    if (entry.slug !== slug) return entry;
    const ticks = new Set(entry.ticks);
    if (on) ticks.add(tick); else ticks.delete(tick);
    return { ...entry, ticks: [...ticks] };
  }));
}

export function remove(slug) {
  write(read().filter((entry) => entry.slug !== slug));
}

export function clear() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("todochange"));
}

// A shared list travels as slugs in a query string. No done flags: what a roommate needs is which
// improvements, not how far along you are, and the shorter the link the more likely it survives
// being pasted into a message.
export function readFromQuery(search, knownSlugs) {
  const value = new URLSearchParams(search).get("items");
  if (!value) return null;
  return clean(value.split(",").map((slug) => slug.trim()).filter(Boolean), knownSlugs);
}

export function toQuery(list) {
  return list.map((entry) => entry.slug).join(",");
}

// Merge rather than replace. A link opened by someone who already has a list of their own should
// add to it, not silently throw it away. Also what "Add all showing" in the library runs on
// (assets/js/library.js): adding eleven improvements one at a time would write eleven times and
// fire eleven `todochange` events for one press.
export function merge(list) {
  const existing = read();
  const known = new Set(existing.map((entry) => entry.slug));
  write([...existing, ...list.filter((entry) => !known.has(entry.slug))]);
}

export function addAll(slugs) {
  merge(slugs.map((slug) => ({ slug, done: false, ticks: [] })));
}
