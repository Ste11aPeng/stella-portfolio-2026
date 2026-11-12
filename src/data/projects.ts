import askSiaImage from "@/assets/asksia-cover.png";
import askSiaInnerCover from "@/assets/asksia-inner-cover.png";
import circleStatusImage from "@/assets/project-circle-status-cover.png";
import circleStatusCover from "@/assets/circle-status-inside-cover.png";
import philoImage from "@/assets/project-philo.webp";
import philoInnerCover from "@/assets/philo-inner-cover.png";
import tiktokImage from "@/assets/project-tiktok.png";

export interface Project {
  id: string;
  image: string;
  coverImage?: string;
  coverFull?: boolean;
  /** with coverFull and an animated cover: the shape the still would have had */
  coverAspect?: string;
  /** a cover that moves, in place of the still (which stands in while it loads) */
  animatedCover?: "widget-bento" | "highlights-phones" | "circle-float" | "philo-tiles" | "asksia-layouts";
  title: string;
  titleColor: string;
  tagline: string;
  description: string;
  type: string;
  industry: string;
  status: string;
  team: string;
  timeline: string;
  skills: string[];
  tags: string[];
  overview: string;
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    id: "tiktok-highlights",
    image: tiktokImage,
    title: "TikTok",
    titleColor: "#FE2C55",
    tagline: "interest highlights",
    animatedCover: "highlights-phones",
    description: "turning what people repost into how they show who they are",
    type: "internship",
    industry: "social media",
    status: "phase 1 shipped, phase 2 in development",
    team: "1 PM, 1 SDE",
    timeline: "Jun 2026 - Sep 2026",
    skills: ["Figma", "Prototyping"],
    tags: ["UI/UX design", "social"],
    // **…** marks the phrases that stay dark in the overview
    overview: "I redesigned Highlights from a shelf for old stories into a home for interests, and brought reposts into it. With my PM, I mapped the 0→1 path in two phases. Phase 1, reposts in highlights, **launched in Q3 2026** and is being measured against a projected lift of **up to 0.6% in daily highlight creators**. Phase 2, auto-suggested highlights, is **planned for Q4 2026**. Together they reach about **5% of global DAU**.",
  },
  {
    id: "tiktok-widget",
    image: tiktokImage,
    title: "TikTok",
    titleColor: "#FE2C55",
    tagline: "story widget",
    animatedCover: "widget-bento",
    description: "making a home-screen widget worth adding, and worth keeping",
    type: "internship",
    industry: "social media",
    status: "shipped",
    team: "1 PM, 1 SDE",
    timeline: "Jul 2026 - Sep 2026",
    skills: ["Figma", "Prototyping"],
    tags: ["UI/UX design", "social"],
    overview: "I redesigned TikTok's Stories widget and the flow that teaches people to add it. It shipped through agile development. The old widget reached **0.267% of active users**, and we projected the add rate to grow from **0.35% to about 0.61%**.",
  },
  {
    id: "asksia",
    image: askSiaImage,
    coverImage: askSiaInnerCover,
    animatedCover: "asksia-layouts",
    coverAspect: "1325 / 671",
    coverFull: true,
    title: "AskSia",
    titleColor: "#4E4DF4",
    tagline: "AI-powered study sidekick",
    description: "helping students learn smarter with AI-powered tutoring",
    type: "internship",
    industry: "EdTech, AI",
    status: "Shipped to production",
    team: "2 Designers, 3 Engineers, 1 PM",
    timeline: "Aug 2025 - Feb 2026",
    skills: ["Figma", "Prototyping", "User Research"],
    tags: ["UI/UX design", "EdTech", "AI"],
    overview: "AskSia is a rapidly growing AI study companion, serving as the core learning tool for 100,000+ users worldwide.\n\nMy team redesigned the workspace and file management system to provide a scalable foundation for the product's rapid expansion.",
  },
  {
    id: "circle-status",
    image: circleStatusImage,
    coverImage: circleStatusCover,
    coverFull: true,
    coverAspect: "1988 / 930",
    title: "Circle Status",
    titleColor: "#FFCB05",
    tagline: "light for community",
    animatedCover: "circle-float",
    description: "connecting neighbors through ambient awareness",
    type: "0 to 1",
    industry: "IoT, smart home",
    status: "sold 264 units in 3 days",
    team: "2 Designers, 1 PM, 1 Engineer",
    timeline: "Sep 2024 - Dec 2024",
    skills: ["Figma", "Blender", "Rhino", "Webflow"],
    tags: ["UI/UX design", "IoT", "community"],
    overview: "Circle Status is a smart lamp and companion app that turns passive outage detection into active community connection. Built in 15 weeks as part of Michigan's IPD program, it launched at a 200-person trade show and sold 264 units in 3 days."
  },
  {
    id: "philo",
    image: philoImage,
    coverImage: philoInnerCover,
    animatedCover: "philo-tiles",
    coverAspect: "1988 / 930",
    coverFull: true,
    title: "Philo Design System",
    titleColor: "#C37933",
    tagline: "UX infra for e-commerce",
    description: "UX infrastructure for an e-commerce MVP",
    type: "internship",
    industry: "e-commerce",
    status: "Shipped to engineering",
    team: "2 Designers, 2 Engineers, 1 Founder",
    timeline: "Jul 2025",
    skills: ["Figma", "Material 3"],
    tags: ["design system", "UI library"],
    overview: "A 3-week sprint where I turned 15 scattered screens into a dev-ready UI library: a token-based foundation, 50 documented components, and UI templates that engineers could build from directly."
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
