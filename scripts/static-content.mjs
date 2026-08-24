// Shared static content used by the prerender step (scripts/prerender.mjs).
// Every page here is emitted twice at build time:
//   1. as raw HTML injected into #root of dist/<path>/index.html (so agents and
//      crawlers without JavaScript see a real H1 and 500+ characters of text)
//   2. as a plain markdown file at dist/<path>.md for agent consumption
// React hydrates over the injected HTML on load, so the visual design is unchanged.

export const SITE_URL = "https://ruocanpeng.com";

const projects = [
  {
    name: "Circle Status",
    summary:
      "A smart lamp and companion app that turns passive outage detection into active community connection. Built in 15 weeks in Michigan's Integrated Product Development program, launched at a 200-person trade show, and sold 264 units in three days.",
  },
  {
    name: "AskSia",
    summary:
      "An AI study companion for university students. Research-led redesign of the core learning flow, grounded in usability testing and design analysis of the existing product.",
  },
  {
    name: "Philo",
    summary:
      "A 0 to 1 product concept exploring how people learn philosophy through short, conversational lessons, from research through high fidelity design and hand-off.",
  },
  {
    name: "TikTok",
    summary:
      "Product design internship work on social experiences and on new ways AI can fit into the design process. Case study coming soon.",
  },
];

const projectList = projects
  .map((p) => `- **${p.name}** — ${p.summary}`)
  .join("\n");

export const pages = [
  {
    path: "",
    file: "index.html",
    title: "Stella Peng",
    description:
      "Stella Peng is a designer who builds across design, engineering, and product. Currently designing at TikTok and studying HCI+Design at the University of Washington.",
    h1: "Stella is a designer who builds across design, tech & things in between.",
    markdown: `# Stella Peng

Stella Peng is a product designer who builds across design, engineering, and product.
She is currently a product design intern at TikTok, working on social experiences and on
new ways AI can fit into the design process, and is pursuing a Master of HCI + Design at
the University of Washington. Before that she studied and worked in Michigan, shipping
0 to 1 and 1 to 10 products with early-stage startups and an accelerator.

## Selected work

${projectList}

## Elsewhere on this site

- [About](${SITE_URL}/about) — background, work experience, and education
- [Visual](${SITE_URL}/visual) — motion and visual experiments
- [Contact](${SITE_URL}/contact) — how to reach Stella
- [Privacy](${SITE_URL}/privacy) — how this site handles data
- [llms.txt](${SITE_URL}/llms.txt) — machine-readable site guide for agents
`,
  },
  {
    path: "about",
    file: "about/index.html",
    title: "about · Stella",
    description:
      "About Stella Peng: product designer at TikTok, Master of HCI + Design student at the University of Washington, previously shipping 0 to 1 products with early-stage startups.",
    h1: "I'm Stella, here to make.",
    markdown: `# About Stella Peng

Hey, I'm a product designer who likes to stay curious and close to the making.

I'm currently at TikTok, exploring social experiences and new ways AI can fit into the
design process. Before this, I worked in a startup accelerator across 0 to 1 and 1 to 10
products, doing a bit of everything from design systems to wireframes to shipping real
features. I've always liked the messy part of design: figuring things out, trying things
quickly, and turning half-formed ideas into something real.

## Education

Master of HCI + Design, University of Washington. Before Seattle, I studied and built in
Michigan, where Circle Status went from a 15-week course project to a product that sold
264 units in three days at a 200-person trade show.

## Work

- **Product Design Intern, TikTok** — social experiences and AI in the design process.
- **Desai Accelerator (summer 2025)** — design partner to early-stage startups, from
  research and design systems through shipped interfaces.

## Curiosity

I think curiosity shows up everywhere: in the random sports I pick up, the unfamiliar
cities I wander into, the inspiration I repost on X, and the Nintendo games I spend way
too much time on. It's probably the same curiosity that keeps me designing.

Say hello: [stellanotfound@gmail.com](mailto:stellanotfound@gmail.com).
`,
  },
  {
    path: "contact",
    file: "contact/index.html",
    title: "contact · Stella",
    description:
      "Contact Stella Peng, product designer. Email, LinkedIn, X, and Instagram, plus what she is currently available for.",
    h1: "Contact",
    markdown: `# Contact Stella Peng

The fastest way to reach me is email. I read everything and reply to messages that are
specific about what you are building and what you need.

## Direct

- Email: [stellanotfound@gmail.com](mailto:stellanotfound@gmail.com)
- LinkedIn: [linkedin.com/in/stellapengrnr](https://www.linkedin.com/in/stellapengrnr/)
- X: [@abtste11a](https://x.com/PengSte11a41091)
- Instagram: [@abtste11a](https://www.instagram.com/abtste11a/)

## What I'm open to

- Product design internships and new grad roles starting after my Master of HCI + Design
  at the University of Washington.
- Short 0 to 1 engagements with early-stage teams: research, concept design, design
  systems, prototyping, and design engineering hand-off.
- Speaking with students or career switchers about design, HCI, and getting into the
  industry. These conversations are free and I try to make time for them.

## Location and hours

Based in the United States, Pacific time. Expect a reply within two to three business
days. For time-sensitive work, say so in the subject line and include your deadline.
`,
  },
  {
    path: "privacy",
    file: "privacy/index.html",
    title: "privacy · Stella",
    description:
      "Privacy policy for ruocanpeng.com: what data this personal portfolio collects, which third parties are involved, and how to request removal.",
    h1: "Privacy",
    markdown: `# Privacy Policy

Last updated: August 2026.

This is the personal portfolio of Stella Peng at ruocanpeng.com. It is a static website.
There is no account system, no login, no shopping cart, and no newsletter signup, so
there is nothing here that asks you for personal information.

## What is collected

- **No forms.** The site has no contact form and no fields that collect your name, email
  address, or any other personal detail. Contacting me is always your own action through
  email or a social platform.
- **No advertising and no selling of data.** Nothing on this site is sold, rented, or
  shared with data brokers.
- **Local browser storage.** The site may store small technical preferences in your
  browser. This data never leaves your device.

## Third parties

The site is hosted on GitHub Pages, which processes standard server logs such as IP
address and user agent for security and delivery. Fonts are loaded from Google Fonts, and
an anonymous product analytics script (Contentsquare) records aggregate page usage so I
can see which case studies people read. Some pages link out to LinkedIn, X, Instagram,
TikTok, and Google Drive; once you follow those links, the privacy policy of that service
applies instead of this one.

## Your choices

Blocking scripts or cookies in your browser will not break this site. If you emailed me
and want that correspondence deleted, write to
[stellanotfound@gmail.com](mailto:stellanotfound@gmail.com) and I will delete it.

## Contact

Questions about this policy: [stellanotfound@gmail.com](mailto:stellanotfound@gmail.com).
`,
  },
];

/** Minimal markdown to HTML for the prerendered fallback body. */
export function markdownToHtml(md) {
  const lines = md.trim().split("\n");
  const out = [];
  let para = [];
  let list = [];

  const inline = (s) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      out.push(`<ul>${list.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`);
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("# ")) {
      flushPara();
      flushList();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
    } else if (line.startsWith("- ")) {
      flushPara();
      list.push(line.slice(2));
    } else if (list.length) {
      list[list.length - 1] += ` ${line}`;
    } else {
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return out.join("\n");
}
