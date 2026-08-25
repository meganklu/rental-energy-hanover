// The one shared "my list" record, F6 in features.md. The same shape as the situation store next
// door (assets/js/situation-store.mjs): one localStorage key, one place the shape is defined, and
// nothing leaves the browser. A list is improvement slugs and a done flag, which is all it can be
// without collecting something about the student — see docs/project-brief.md's non-goals.

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
    .map((entry) => ({ slug: entry.slug, done: entry.done === true }));
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
    : [...list, { slug, done: false }];
  write(next);
  return next.some((entry) => entry.slug === slug);
}

export function setDone(slug, done) {
  write(read().map((entry) => (entry.slug === slug ? { ...entry, done } : entry)));
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
  merge(slugs.map((slug) => ({ slug, done: false })));
}
