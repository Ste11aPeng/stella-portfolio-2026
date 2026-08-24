// Cloudflare Worker: acceptmarkdown.com-compliant content negotiation for
// ruocanpeng.com.
//
// GitHub Pages cannot set response headers, so it can neither honour
// `Accept: text/markdown` nor emit `Vary: Accept`. Route ruocanpeng.com/* through
// this Worker (Cloudflare proxy + Workers route) to add both, without changing any
// HTML the site already ships.
//
// Behaviour:
//   - Request with `Accept: text/markdown` (or `text/x-markdown`) for a page route
//     -> serve the prebuilt `.md` twin with `Content-Type: text/markdown; charset=utf-8`.
//   - Any other request -> pass through to the origin HTML.
//   - Every negotiated response carries `Vary: Accept, Accept-Encoding` so CDNs
//     cache the HTML and markdown variants separately.
//   - Unknown paths keep the origin's real 404 status; markdown clients get /404.md.

const MARKDOWN_TYPES = ["text/markdown", "text/x-markdown"];
const VARY = "Accept, Accept-Encoding";

/** Does the Accept header ask for markdown at least as strongly as HTML? */
export function wantsMarkdown(accept) {
  if (!accept) return false;
  const entries = accept.split(",").map((part) => {
    const [type, ...params] = part.trim().split(";");
    const q = params
      .map((p) => p.trim())
      .find((p) => p.startsWith("q="));
    return { type: type.trim().toLowerCase(), q: q ? parseFloat(q.slice(2)) : 1 };
  });
  const best = (types) =>
    entries
      .filter((e) => types.includes(e.type))
      .reduce((max, e) => Math.max(max, e.q), 0);
  const md = best(MARKDOWN_TYPES);
  return md > 0 && md >= best(["text/html", "application/xhtml+xml"]);
}

/** Map a page route to its prebuilt markdown twin, or null when there is none. */
export function markdownPathFor(pathname) {
  const clean = pathname.replace(/\/+$/, "");
  if (clean === "" ) return "/index.md";
  if (/\.[a-z0-9]+$/i.test(clean)) return null; // assets and existing .md files
  return `${clean}.md`;
}

function withVary(response) {
  const headers = new Headers(response.headers);
  headers.set("Vary", VARY);
  return new Response(response.body, { ...response, headers });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const accept = request.headers.get("Accept");

    if (!wantsMarkdown(accept)) {
      return withVary(await fetch(request));
    }

    const mdPath = markdownPathFor(url.pathname);
    if (!mdPath) return withVary(await fetch(request));

    const mdUrl = new URL(mdPath, url.origin);
    let upstream = await fetch(mdUrl.toString(), { headers: { Accept: "text/plain" } });
    let status = 200;

    if (!upstream.ok) {
      upstream = await fetch(new URL("/404.md", url.origin).toString());
      status = 404;
      if (!upstream.ok) return withVary(await fetch(request));
    }

    return new Response(await upstream.text(), {
      status,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": VARY,
        "Cache-Control": "public, max-age=300",
        "Link": `<${url.href}>; rel="canonical"`,
      },
    });
  },
};
