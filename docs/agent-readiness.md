# Agent readiness

How ruocanpeng.com serves AI agents and crawlers, and what still needs hosting-level work.

## What ships from this repo

| Capability | Where |
| --- | --- |
| JS-free content on key routes | `scripts/static-content.mjs` + `scripts/prerender.mjs` inject real HTML into `#root` at build time |
| Markdown twins (`/about.md`, `/index.md`, ...) | emitted by `scripts/prerender.mjs` |
| `<link rel="alternate" type="text/markdown">` per page | `index.html` head, rewritten per route by the prerender step |
| Agent instructions / when-to-use | `public/llms.txt` |
| Agent-friendly 404 | `public/404.html` (HTML links + inline markdown recovery body) and `public/404.md` |
| Structured identity | JSON-LD `@graph` (Person + WebSite) in `index.html`, with `name`, `description`, `url`, `sameAs` |

## Markdown content negotiation (`Accept: text/markdown`)

GitHub Pages serves static files only: it cannot read the `Accept` request header and
cannot add `Vary: Accept` to responses. The markdown bodies exist and are discoverable
(`.md` twins, `rel="alternate"` links, `llms.txt`), but true negotiation requires a layer
that can set headers.

`workers/markdown-negotiation.js` is a drop-in Cloudflare Worker that does exactly this:

1. Put the domain behind Cloudflare (orange-cloud DNS), origin stays GitHub Pages.
2. Deploy the Worker (`wrangler deploy`) and add a route for `ruocanpeng.com/*`.
3. Verify:

```bash
curl -s -D - -o /dev/null -H 'Accept: text/markdown' https://ruocanpeng.com/about
# expect: content-type: text/markdown; charset=utf-8
#         vary: Accept, Accept-Encoding
curl -s -o /dev/null -w '%{http_code}\n' https://ruocanpeng.com/no-such-page   # 404
```

Any equivalent edge layer works (Netlify/Vercel rewrites and `Vary` headers, Fastly, an
nginx `map` on `$http_accept`). Until one is in place the acceptmarkdown.com check will
keep reporting `Vary` as missing, regardless of repo changes.
