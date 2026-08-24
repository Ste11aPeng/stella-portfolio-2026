import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { wantsMarkdown, markdownPathFor } from "../../workers/markdown-negotiation.js";

const root = path.resolve(__dirname, "../..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");

describe("agent-friendly 404", () => {
  const html = read("public/404.html");
  const md = read("public/404.md");

  it("keeps the SPA redirect but ships a static recovery body", () => {
    expect(html).toContain("pathSegmentsToKeep");
    expect(html).toContain("<h1>404 Not Found</h1>");
  });

  it("embeds a markdown recovery body in the 404 response", () => {
    expect(html).toContain('<pre data-format="text/markdown">');
    expect(html).toContain("# 404 Not Found");
  });

  it("links the machine-readable index from both variants", () => {
    for (const doc of [html, md]) {
      expect(doc).toContain("llms.txt");
      expect(doc).toContain("sitemap.xml");
    }
  });

  it("advertises the markdown twin of the 404 page", () => {
    expect(html).toContain('type="text/markdown" href="https://ruocanpeng.com/404.md"');
    expect(md.startsWith("# 404 Not Found")).toBe(true);
  });

  it("stays noindex", () => {
    expect(html).toContain('name="robots" content="noindex"');
  });
});

describe("homepage JSON-LD", () => {
  const html = read("index.html");
  const raw = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  )?.[1] as string;
  const data = JSON.parse(raw);
  const nodes = data["@graph"] as Array<Record<string, unknown>>;
  const person = nodes.find((n) => n["@type"] === "Person")!;
  const website = nodes.find((n) => n["@type"] === "WebSite")!;

  it("is valid JSON with a schema.org context", () => {
    expect(data["@context"]).toBe("https://schema.org");
    expect(nodes.length).toBeGreaterThanOrEqual(2);
  });

  it("describes the Person with name, description and url", () => {
    expect(person.name).toBe("Stella Peng");
    expect(String(person.description).length).toBeGreaterThan(50);
    expect(person.url).toBe("https://ruocanpeng.com/");
    expect(person.sameAs).toBeInstanceOf(Array);
    expect(person.jobTitle).toBeTruthy();
  });

  it("describes the WebSite with name, description and url", () => {
    expect(website.name).toBeTruthy();
    expect(String(website.description).length).toBeGreaterThan(20);
    expect(website.url).toBe("https://ruocanpeng.com/");
  });
});

describe("markdown discoverability", () => {
  it("advertises a markdown alternate on the html shell", () => {
    expect(read("index.html")).toContain('rel="alternate" type="text/markdown"');
  });

  it("documents the markdown twins in llms.txt", () => {
    const txt = read("public/llms.txt");
    expect(txt).toContain("rel=\"alternate\" type=\"text/markdown\"");
    expect(txt).toContain("https://ruocanpeng.com/404.md");
  });
});

describe("markdown content negotiation worker", () => {
  it("detects markdown-preferring Accept headers", () => {
    expect(wantsMarkdown("text/markdown")).toBe(true);
    expect(wantsMarkdown("text/markdown, text/html;q=0.9")).toBe(true);
    expect(wantsMarkdown("text/x-markdown")).toBe(true);
    expect(wantsMarkdown("text/html,application/xhtml+xml")).toBe(false);
    expect(wantsMarkdown("text/html,text/markdown;q=0.5")).toBe(false);
    expect(wantsMarkdown(undefined)).toBe(false);
  });

  it("maps routes to their markdown twins", () => {
    expect(markdownPathFor("/")).toBe("/index.md");
    expect(markdownPathFor("/about")).toBe("/about.md");
    expect(markdownPathFor("/about/")).toBe("/about.md");
    expect(markdownPathFor("/project/asksia")).toBe("/project/asksia.md");
    expect(markdownPathFor("/about.md")).toBeNull();
    expect(markdownPathFor("/images/og-image.png")).toBeNull();
  });
});

describe("Organization schema completeness", () => {
  const html = read("index.html");
  const raw = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  )?.[1] as string;
  const nodes = JSON.parse(raw)["@graph"] as Array<Record<string, any>>;
  const org = nodes.find((n) => n["@type"] === "Organization")!;

  it("ships an Organization node", () => {
    expect(org).toBeTruthy();
    expect(org.name).toBeTruthy();
    expect(org.url).toBe("https://ruocanpeng.com/");
  });

  it("includes a contactPoint with email and contactType", () => {
    const cp = Array.isArray(org.contactPoint) ? org.contactPoint[0] : org.contactPoint;
    expect(cp["@type"]).toBe("ContactPoint");
    expect(cp.contactType).toBeTruthy();
    expect(cp.email).toContain("@");
  });

  it("includes a PostalAddress", () => {
    expect(org.address["@type"]).toBe("PostalAddress");
    expect(org.address.addressLocality).toBeTruthy();
    expect(org.address.addressCountry).toBeTruthy();
  });
});

describe("markdown negotiation worker deployment config", () => {
  it("routes the apex domain through the worker", () => {
    const toml = read("workers/wrangler.toml");
    expect(toml).toContain("markdown-negotiation.js");
    expect(toml).toContain("ruocanpeng.com/*");
  });
});
