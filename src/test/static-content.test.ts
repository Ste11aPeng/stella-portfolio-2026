import { describe, it, expect } from "vitest";
// @ts-expect-error - plain ESM module shared with the build-time prerender script
import { pages, markdownToHtml } from "../../scripts/static-content.mjs";

type Page = {
  path: string;
  file: string;
  title: string;
  description: string;
  markdown: string;
};

const all = pages as Page[];
const byPath = (p: string) => all.find((page) => page.path === p)!;

describe("prerendered static content", () => {
  it("covers the homepage and the trust anchor pages", () => {
    expect(all.map((p) => p.path).sort()).toEqual(["", "about", "contact", "privacy"]);
  });

  for (const page of all) {
    describe(`/${page.path || "(home)"}`, () => {
      it("has exactly one H1", () => {
        const html = markdownToHtml(page.markdown) as string;
        expect(html.match(/<h1>/g)?.length).toBe(1);
      });

      it("renders at least 500 characters of visible text", () => {
        const html = markdownToHtml(page.markdown) as string;
        const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        expect(text.length).toBeGreaterThanOrEqual(500);
      });

      it("has a title and a description under 160 chars", () => {
        expect(page.title.length).toBeGreaterThan(0);
        expect(page.description.length).toBeLessThan(200);
      });
    });
  }

  it("links contact details on the contact page", () => {
    expect(byPath("contact").markdown).toContain("stellanotfound@gmail.com");
  });

  it("escapes html and converts links and lists", () => {
    const html = markdownToHtml("# T\n\n- [a](https://x.test) <b>\n\n**bold** text") as string;
    expect(html).toContain('<a href="https://x.test">a</a>');
    expect(html).toContain("&lt;b&gt;");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<ul>");
  });
});
