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
    name: "TikTok · interest highlights",
    summary:
      "Product design internship on TikTok's Social team: redesigning Highlights from a shelf for old stories into a home for interests, and bringing reposts into it, in two phases.",
  },
  {
    name: "TikTok · Stories widget",
    summary:
      "Redesigning TikTok's Stories home-screen widget, the tutorial for adding it, and cold-start prompts that invite people to try it.",
  },
];

const projectList = projects
  .map((p) => `- **${p.name}** — ${p.summary}`)
  .join("\n");

export const pages = [
  {
    path: "",
    file: "index.html",
    title: "Stella Peng ✶",
    description:
      "Stella Peng is a designer who builds across design, tech, and things in between. Master's in HCI + Design @ UW, prev. design @ TikTok.",
    h1: "Stella is a designer who builds across design, tech & things in between.",
    markdown: `# Stella Peng

Stella Peng is a designer who builds across design, tech, and things in between.
She's pursuing a Master of HCI + Design at the University of Washington, with previous
design experience at TikTok working on social experiences and on new ways AI can fit
into the design process. Before that she studied and worked in Michigan, shipping
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
    h1: "About Stella Peng — a collection of curiosities",
    markdown: `# About Stella Peng

I'm Stella, a product designer in Seattle. Most recently at TikTok; before that, startups
going 0 to 1. Want to build something, or just say hi? Reach out :D

## Education

- **University of Washington** — M.S. in HCI + Design, Summer 2027
- **University of Michigan** — B.A. in Art & Design, Winter 2025

## Experience

- **TikTok** — 2026, Product Design Intern, Social
- **Desai Accelerator & AskSia.AI** — 2025, Product Design Intern

## A few interests, in objects

Polaroids, coffee, stationery, home decor, R&B and jazz music, growing things, gaming,
my cat Iggy, doodling, journaling, matcha, and cleaning.

## My name

粲 (càn) is my Chinese name, and my English one too: Stella is a star, 粲 is its light.
明白貌；明亮貌: bright, luminous. 星光粲然: starlight, shining bright.

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

const projectPages = [
  {
    id: "tiktok-highlights",
    name: "TikTok · interest highlights",
    description:
      "TikTok interest highlights: turning what people repost into how they show who they are. A product design case study by Stella Peng.",
    meta: { industry: "social media", status: "phase 1 shipped, phase 2 in development", team: "1 PM, 1 SDE", timeline: "Jun 2026 - Sep 2026" },
    body: `I redesigned Highlights from a shelf for old stories into a home for interests, and brought reposts
into it. With my PM, I planned it in two phases. Phase 1, reposts in highlights, launched in
Q3 2026. Phase 2, auto-suggested highlights, is planned for Q4 2026.

## Challenge

People showed their interests every day through stories and reposts, but none of it reached their
profile.

## Solution 1: put reposts in highlights

Stories and reposts sit on one scrolling page when adding to a highlight, so picking stays in the flow
people already know. When viewing, a repost appears as a framed middle card with the reposter's note
above it, so it reads apart from full-screen stories even mid-swipe.

## Solution 2: highlights that suggest themselves

As more content came into highlight creation, we wanted to offer a suggested flow where TikTok picks for
you. After testing several entry points with my design manager, I placed the suggestion inside this flow.
The final design is still under NDA, so I can only share it at a high level here.

## What I took away from TikTok

I came in ready to defend whichever flow looked best. TikTok had other plans. Making highlights from
stories already worked, so whatever I added for reposts had to leave those numbers alone, and the
backend had its own opinions about what a repost could even show. So I started asking our SDE what
was possible before opening Figma, and checking what the data could back up before falling for a
direction. Most of the real design decisions came out of those limits.`,
  },
  {
    id: "tiktok-widget",
    name: "TikTok · Stories widget",
    description:
      "TikTok Stories widget: making a home-screen widget worth adding, and worth keeping. A product design case study by Stella Peng.",
    meta: { industry: "social media", status: "shipped", team: "1 PM, 1 SDE", timeline: "Jul 2026 - Sep 2026" },
    body: `I redesigned TikTok's Stories widget and the flow that teaches people to add it.

## Challenge

The widget's users skewed young, but it cropped stories with no context and often failed to load. The goal was a widget that makes sense at a glance and works as a way back into
Stories.

## What I designed

The widget itself (small and medium, light and dark), a step-by-step tutorial for adding it with a
picture-in-picture guide video, and cold-start prompts between stories. The motion pieces were made
together with TikTok's creative team.

## The part I'd keep working on

Most of what I designed was about getting the widget onto home screens: a clearer tutorial, a
picture-in-picture guide, a little nudge between stories. That part is easy to measure. The harder
question is what makes someone keep a widget around a few weeks later, when their friends haven't
posted and it has nothing new to show. That's where I'd go next.`,
  },
  {
    id: "circle-status",
    name: "Circle Status",
    description:
      "Circle Status: a smart lamp and companion app that turns outage detection into community connection. Sold 264 units in 3 days. A case study by Stella Peng.",
    meta: { industry: "IoT, smart home", status: "sold 264 units in 3 days", team: "2 designers, 1 PM, 1 SWE", timeline: "Fall 2024 (15 weeks)", skills: "Figma, Blender, Rhino, Webflow" },
    body: `Circle Status is a smart lamp and companion app that turns passive outage detection into
active community connection. Built in 15 weeks as part of the University of Michigan's
Integrated Product Development (IPD) program, it launched at a 200-person trade show and
sold 264 units in three days.

## Challenge

When the power goes out, neighbors are often the fastest source of help, yet most people
have no simple way to know who is affected or who needs a hand. Existing outage maps are
passive and slow, and they say nothing about the people on your street.

## Solution

A lamp that glows to signal outage status at a glance, paired with an app that lets
neighbors check in on each other, share resources, and coordinate during an outage. The
physical object makes the state of the community ambient; the app turns it into action.

## Research and testing

Interviews and field research shaped the core insights, which were reframed as
"how might we" questions and tested through rapid prototyping of both the hardware form
and the app flows. Iterations focused on clarity of the light states and on reducing the
effort needed to reach out to a neighbor.

## What 264 lamps taught me

We had fifteen weeks to go from interviews to a lamp people would actually pay for. The interviews
told us why people didn't check on each other during outages, and the outage data (EDA, then a CART
model) told us who and when. We needed both to land on a lamp. Then 264 people bought one in three
days at the trade show, which is the most honest feedback I've ever gotten on a design. Nobody buys
a lamp to be polite.`,
  },
  {
    id: "asksia",
    name: "AskSia",
    description:
      "AskSia: redesigning the workspace and file management of an AI study companion used by 100k+ students. A product design case study by Stella Peng.",
    meta: { industry: "EdTech, AI", status: "100k+ users", team: "2 designers, 3 engineers, 1 PM", timeline: "Aug 2025 - Feb 2026", skills: "Figma, prototyping, user research" },
    body: `AskSia is a rapidly growing AI study companion, serving as the core learning tool for
more than 100,000 users worldwide. My team redesigned the workspace and file management
system to give the product a scalable foundation for its rapid expansion.

## Challenge

As students uploaded more course materials and ran more AI sessions, the original
workspace became hard to navigate. Files, chats, and study outputs were scattered, and
the structure could not keep up with new features.

## Solution

A restructured workspace that organizes materials by course, keeps AI conversations tied
to the files they reference, and makes file management predictable across the product.

## Impact

The new foundation supported continued growth and made it faster for the team to ship new
learning features without reworking navigation.

## Research and design analysis

Usability testing and a design analysis of the existing product surfaced where students
lost context. Key insights guided the information architecture and the constraints the
team worked within.

## What six months at an AI startup taught me

At an AI startup the ground moves every few weeks, and nobody hands you finished requirements. So I
got in the habit of poking at every AI tool that shipped and borrowing the patterns that fit ours.
The responsive dropdown came out of that. The less glamorous lesson came from writing every edge
case down, from corrupted files to empty states, so engineers could build it without pinging me ten
times a day. That doc is where the design held up.`,
  },
];

for (const p of projectPages) {
  const m = p.meta;
  pages.push({
    path: `project/${p.id}`,
    file: `project/${p.id}/index.html`,
    title: `${p.name.toLowerCase()} · Stella`,
    description: p.description,
    markdown: `# ${p.name}

- **Industry:** ${m.industry}
- **Status:** ${m.status}
- **Team:** ${m.team}
- **Timeline:** ${m.timeline}

${p.body}

## More

- [All work](${SITE_URL}/) · [About Stella](${SITE_URL}/about) · [Contact](${SITE_URL}/contact)
`,
  });
}

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
