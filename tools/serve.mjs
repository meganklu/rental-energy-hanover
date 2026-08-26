// A dev server for previewing the site, and the only reason it exists is that the obvious one is
// misleading about load time.
//
// `python3 -m http.server` answers in HTTP/1.0 with no keep-alive, so every request opens and
// closes its own connection, and it never compresses anything however the browser asks. A page that
// costs 113KB from GitHub Pages costs 351KB from it, over seventeen separate connections.
//
// This serves what Pages serves: gzip, one connection reused for everything, correct types, and —
// the part that matters most for moving between pages — real revalidation. Every response carries
// an ETag and a Last-Modified, and a conditional request gets a 304 with no body. Without that,
// walking from one page to another re-downloads all 219KB of CSS, the 29KB icon sprite and both
// fonts every single time, which is exactly what "the home page takes forever to come back to"
// feels like. The home page alone makes 53 references into that sprite.
//
// Nothing is cached past the current navigation, so a reload always shows the file as it is on
// disk. Revalidation is what makes that cheap rather than free-in-name-only.
//
// No dependencies and no build step, per AGENTS.md rule 8. Node is already required for
// tools/check-content.mjs, and this uses only what ships with it.
//
//   node tools/serve.mjs [port]

import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createGzip } from "node:zlib";
import { extname, join, normalize, relative, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const PORT = Number(process.argv[2]) || 8000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

// Everything text-shaped. woff2 and webp are already compressed, and gzipping them again costs
// time and adds bytes.
const COMPRESSIBLE = new Set([".html", ".css", ".js", ".mjs", ".json", ".svg", ".txt"]);

// Size and mtime, which is what a static file's identity amounts to here. Weak, because gzip means
// the bytes on the wire differ from the bytes on disk and a strong tag would be a lie about them.
const etagFor = (stat) => `W/"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}"`;

const plain = (res, status, text) => {
  res.writeHead(status, { "Content-Type": TYPES[".txt"], "Cache-Control": "no-cache" });
  res.end(text);
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  let path = resolve(ROOT, "." + normalize(decodeURIComponent(url.pathname)));

  // A request that climbs out of the repository is answered as if the file is not there, which is
  // what it is from the browser's point of view.
  if (relative(ROOT, path).startsWith("..")) return plain(res, 403, "Forbidden");

  let stat;
  try {
    stat = statSync(path);
    if (stat.isDirectory()) {
      path = join(path, "index.html");
      stat = statSync(path);
    }
  } catch {
    // GitHub Pages serves 404.html for an unknown path, so this does too — otherwise a broken
    // relative link looks different here than it will in production.
    try {
      const body = await readFile(join(ROOT, "404.html"));
      res.writeHead(404, { "Content-Type": TYPES[".html"], "Cache-Control": "no-cache" });
      return res.end(body);
    } catch {
      return plain(res, 404, "Not found");
    }
  }

  const ext = extname(path);
  const etag = etagFor(stat);
  const lastModified = stat.mtime.toUTCString();

  const headers = {
    "Content-Type": TYPES[ext] || "application/octet-stream",
    "Cache-Control": "no-cache",
    ETag: etag,
    "Last-Modified": lastModified,
  };

  // The whole point. A browser that already has the file asks whether it changed; when it has not,
  // this is a few hundred bytes instead of the file.
  const noneMatch = req.headers["if-none-match"];
  const modifiedSince = req.headers["if-modified-since"];
  if (noneMatch === etag || (!noneMatch && modifiedSince === lastModified)) {
    res.writeHead(304, headers);
    return res.end();
  }

  const gzip = COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] || "");
  if (gzip) {
    headers["Content-Encoding"] = "gzip";
    headers.Vary = "Accept-Encoding";
  } else {
    headers["Content-Length"] = stat.size;
  }

  res.writeHead(200, headers);
  if (req.method === "HEAD") return res.end();

  const file = createReadStream(path);
  file.on("error", () => res.end());
  if (gzip) file.pipe(createGzip()).pipe(res);
  else file.pipe(res);
});

// Keep-alive is the other half of the point: seventeen requests over one connection rather than
// seventeen connections. Node does this by default over HTTP/1.1; the longer idle window stops it
// dropping the connection between a page and the assets it then asks for.
server.keepAliveTimeout = 30_000;

server.listen(PORT, () => {
  console.log(`Serving ${ROOT}\n  http://localhost:${PORT}/`);
});
