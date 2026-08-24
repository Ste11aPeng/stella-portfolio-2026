// Post-build step: emit static, JS-free HTML for the key routes plus markdown
// twins for agents. Run automatically by `npm run build`.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pages, markdownToHtml, SITE_URL } from "./static-content.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const shellFor = (template, page) => {
  const url = `${SITE_URL}/${page.path}`.replace(/\/$/, "/");
  const mdName = page.path === "" ? "index.md" : `${page.path}.md`;
  const mdUrl = `${SITE_URL}/${mdName}`;
  const body = markdownToHtml(page.markdown);
  const fallback = `<div id="static-content" data-prerendered="true">${body}<p><a href="${mdUrl}">markdown version of this page</a> · <a href="${SITE_URL}/llms.txt">llms.txt</a> · <a href="${SITE_URL}/sitemap.xml">sitemap.xml</a></p></div>`;

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?" \/>/,
      `<meta name="description" content="${escapeAttr(page.description)}" />`
    )
    .replace(
      /<link rel="alternate" type="text\/markdown" href="[^"]*" \/>/,
      `<link rel="alternate" type="text/markdown" href="${mdUrl}" />`
    )
    .replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);

  if (!html.includes('rel="canonical"')) {
    html = html.replace("</head>", `    <link rel="canonical" href="${url}" />\n  </head>`);
  }
  return html;
};


const run = async () => {
  const template = await readFile(path.join(dist, "index.html"), "utf8");

  for (const page of pages) {
    const outFile = path.join(dist, page.file);
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, shellFor(template, page), "utf8");

    const mdName = page.path === "" ? "index.md" : `${page.path}.md`;
    await writeFile(path.join(dist, mdName), page.markdown, "utf8");
    console.log(`prerendered /${page.path} -> ${page.file}, ${mdName}`);
  }
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
