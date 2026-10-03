# CLAUDE.md

Guidance for working in this repo: Stella Peng's product design portfolio, deployed at [ruocanpeng.com](https://ruocanpeng.com).

## Origin and workflow

This project was originally built and edited in [Lovable](https://lovable.dev) (an AI app builder), which pushed its commits straight to this GitHub repo. It is now edited directly here instead — Lovable is no longer the source of truth. Artifacts from that era still exist in the repo (`.lovable/`, `lovable-tagger` dev dependency, `README.md`'s Lovable-centric instructions) but don't affect how the site runs or ships.

## Tech stack

- **Build tool**: Vite 5 + React 18 + TypeScript, using `@vitejs/plugin-react-swc`
- **Routing**: `react-router-dom` (`BrowserRouter`), all routes declared in [src/App.tsx](src/App.tsx)
- **Styling**: Tailwind CSS (config in [tailwind.config.ts](tailwind.config.ts)) with shadcn/ui components in [src/components/ui/](src/components/ui/) (Radix UI primitives underneath)
- **Other notable libraries**: `framer-motion` (animation), `react-helmet-async` (per-page `<head>`/SEO tags), `embla-carousel-react` (carousels), `lottie-react` (JSON animations), `@tanstack/react-query` (installed, little used), `react-hook-form` + `zod` (forms/validation)
- **Testing**: Vitest + Testing Library ([src/test/](src/test/))
- **Package manager**: both `package-lock.json` and `bun.lock(b)` are present; the GitHub Actions deploy workflow uses `npm install`, so treat npm as canonical unless told otherwise

### Common commands

```bash
npm run dev        # start the Vite dev server (port 8080)
npm run build       # vite build, then scripts/prerender.mjs (see below)
npm run test        # vitest run
npm run lint        # eslint .
```

## Pages and routing

Top-level routes (defined in [src/App.tsx](src/App.tsx)):

| Path | Page | Notes |
| --- | --- | --- |
| `/` | [Index.tsx](src/pages/Index.tsx) | Home — hero, project grid |
| `/project/:id` | [ProjectDetail.tsx](src/pages/ProjectDetail.tsx) | Case study detail (see below) |
| `/visual` | [Visual.tsx](src/pages/Visual.tsx) | Motion/visual experiments, lazy-loaded |
| `/about` | [About.tsx](src/pages/About.tsx) | Lazy-loaded |
| `/contact` | [Contact.tsx](src/pages/Contact.tsx) | Lazy-loaded |
| `/privacy` | [Privacy.tsx](src/pages/Privacy.tsx) | Lazy-loaded |
| `*` | [NotFound.tsx](src/pages/NotFound.tsx) | Lazy-loaded 404 |

`Index` and `ProjectDetail` load eagerly; the rest are `React.lazy`-loaded.

## Case studies: how they're organized

Project metadata lives in one place: [src/data/projects.ts](src/data/projects.ts). Each entry in the `projects` array (title, tagline, cover image, skills, status, etc.) is looked up by id via `getProjectById()`. Current ids: `tiktok` (coming soon), `circle-status`, `asksia`, `philo`. A few older/side projects (`tell-tool`, `forgotten-sense`) render through a separate gallery layout — see below.

The actual case-study content is **not** data-driven — it's hand-assembled per project inside [src/pages/ProjectDetail.tsx](src/pages/ProjectDetail.tsx):

- The page reads `:id` from the route, looks up the project, and renders a shared shell (cover image, sidebar nav, progress bar, footer, `NextProject`).
- For each section (Challenge, Solution, Research, Testing, Reflection, …) it does an `id === "..."` check and renders a **project-specific component** — e.g. `StitchiChallenge`, `PhiloSolution`, `CircleResearch`, `AsksiaReflection` — or a generic "Content coming soon..." placeholder if no component exists for that project/section.
- Project-specific section components live under `src/components/<project>/`, e.g. [src/components/philo/](src/components/philo/), [src/components/circle/](src/components/circle/), [src/components/asksia/](src/components/asksia/), [src/components/stitchi/](src/components/stitchi/) (Stitchi has no `projects.ts` entry currently — likely legacy/unlinked).
- Each project also has its own section list (`getSectionIds`) since not every case study has the same sections (e.g. Philo uses `audit-review` / `component-mapping` instead of `research`/`testing`).
- `tell-tool` and `forgotten-sense` skip this custom-section system entirely and render via [GalleryProjectDetail.tsx](src/components/GalleryProjectDetail.tsx), a simpler image-gallery layout driven by an image array defined inline in `ProjectDetail.tsx`.

**To add a new case study**: add an entry to `projects.ts`, then either (a) build section components under a new `src/components/<project>/` folder and wire them into the `id === "..."` chains in `ProjectDetail.tsx`, or (b) if it's just a visual gallery, add it to the `galleryProjects` list with an image array.

Images for case studies live in [src/assets/](src/assets/), imported directly into components (Vite bundles them with hashed filenames).

## SEO / agent-readiness (prerendering)

Because this is a client-rendered SPA, a post-build step emits static, crawlable content for key routes:

- [scripts/static-content.mjs](scripts/static-content.mjs) — hand-written per-page markdown/metadata (title, description, body) for the home, about, etc.
- [scripts/prerender.mjs](scripts/prerender.mjs) — runs after `vite build`, injects that content into `dist/<path>/index.html`'s `#root` (so crawlers without JS see real text) and also emits `.md` twins (e.g. `/about.md`) for each page.
- `npm run build` always runs both steps (`vite build && node scripts/prerender.mjs`).
- See [docs/agent-readiness.md](docs/agent-readiness.md) for the full picture, including the Cloudflare Worker ([workers/markdown-negotiation.js](workers/markdown-negotiation.js)) that would add true `Accept: text/markdown` content negotiation at the edge — not yet deployed.
- Per-page `<title>`/meta tags at runtime (client-side nav) are handled by [src/components/Seo.tsx](src/components/Seo.tsx) via `react-helmet-async`.

If editing page copy that should also appear in prerendered/markdown form (home, about, etc.), update `scripts/static-content.mjs` too — it's a separate, hand-maintained copy of that text, not derived from the React components.

## Deployment

- Hosted on **GitHub Pages**, custom domain `ruocanpeng.com` (see [public/CNAME](public/CNAME)).
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml): on every push to `main` (or manual dispatch), GitHub Actions runs `npm install && npm run build`, then uploads `dist/` as a Pages artifact and deploys it.
- No separate staging environment — pushing to `main` ships to production.
- There is no Lovable deploy step anymore; publishing now only happens through this GitHub Actions workflow.
