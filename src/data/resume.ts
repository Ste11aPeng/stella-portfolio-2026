// Résumé content, transcribed from "Stella Peng-Product Design-2026Resume.pdf".
// `**text**` marks the darker, emphasised phrases from the PDF.

export const RESUME_PDF = "/Stella-Peng-Resume.pdf";

export const resumeHeader = {
  name: "Stella Peng",
  title: "Product Designer",
  site: { label: "ruocanpeng.com" }, // shown as plain text: you are already on the site
  email: { label: "stellanotfound@gmail.com", href: "mailto:stellanotfound@gmail.com" },
  linkedin: { label: "in/stellapengrnr", href: "https://www.linkedin.com/in/stellapengrnr/" },
};

export type ResumeEntry = {
  org: string;
  role?: string;
  when?: string;
  // Each string is one paragraph.
  detail: string[];
};

export type ResumeSection = { label: string; entries: ResumeEntry[] };

export const resumeSections: ResumeSection[] = [
  {
    label: "Experience",
    entries: [
      {
        org: "TikTok",
        role: "Product Design Intern",
        when: "Summer 2026",
        detail: [
          "**Shaped core social experiences** across Story, Friends, and campus relationships, defining interaction patterns across relationship states, and content consumption within TikTok's Design Foundation team.",
          'Co-built "Mini TikTok" with design engineers, a locally runnable build of the app, then used **AI coding tools to ship 20+ hi-fi prototypes on real product code** that aligned PMs and engineers before build.',
        ],
      },
      {
        org: "Desai Accelerator",
        role: "Product Design Intern",
        when: "Summer 2025",
        detail: [
          "Shaped product strategy for 6 startups across 0 to 1 and 1 to 10 stages, translating unfamiliar business models and user needs into product direction through UX audits, competitive analysis, and scalable design systems, driving up to **75% higher user activation and 2× faster iteration**.",
        ],
      },
      {
        org: "AskSia.AI",
        role: "Product Designer",
        when: "2025 – 2026",
        detail: [
          "Drove a **22% increase in new-user activation and $45K in incremental revenue** by translating AI capabilities into intuitive student workflows.",
          "**Increased task completion by 45%** by simplifying information architecture across core learning flows, consolidating fragmented navigation into a unified system.",
        ],
      },
      {
        org: "Michigan Engineering",
        role: "Social Media Intern",
        when: "2024 – 2025",
        detail: [
          "Drove an **81.7% YoY increase** in reach through short-form video and visual storytelling that translated complex engineering concepts into accessible narratives.",
        ],
      },
    ],
  },
  {
    label: "Education",
    entries: [
      {
        org: "University of Washington",
        detail: ["**M.S. in HCI + Design**\nSummer 2027 (Expected)"],
      },
      {
        org: "University of Michigan",
        detail: ["**B.A. in Art & Design,** Minors in UX & Entrepreneurship\nWinter 2025 · GPA 3.9/4.0"],
      },
    ],
  },
  {
    label: "Skills",
    entries: [
      {
        org: "Design & Prototype",
        detail: ["AI-native design, agentic workflows, AI prototyping, interaction design, design systems, UX/UI, motion."],
      },
      {
        org: "Tool & Software",
        detail: ["Claude Code, Codex, Cursor, Figma, Adobe CC, HTML/CSS/JavaScript, Arduino, Raspberry Pi"],
      },
    ],
  },
];
