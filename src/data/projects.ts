import askSiaImage from "@/assets/asksia-cover.png";
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
    id: "tiktok",
    image: tiktokImage,
    title: "TikTok",
    titleColor: "#FE2C55",
    tagline: "social experience",
    description: "social experience",
    type: "intern",
    industry: "social media",
    status: "shipped",
    team: "Social team",
    timeline: "Summer 2026",
    skills: ["Figma", "Prototyping"],
    tags: ["UI/UX design", "social"],
    overview: "Coming soon.",
    comingSoon: true,
  },
  {
    id: "circle-status",
    image: circleStatusImage,
    coverImage: circleStatusCover,
    title: "Circle Status",
    titleColor: "#FFCB05",
    tagline: "light for community",
    description: "connecting neighbors through ambient awareness",
    type: "0 to 1",
    industry: "IoT, smart home",
    status: "shipped",
    team: "2 designer, 1 PM, 1 SWE",
    timeline: "Fall 2024 (15 weeks)",
    skills: ["Figma", "Blender", "Rhino", "Webflow"],
    tags: ["UI/UX design", "IoT", "community"],
    overview: "Circle Status is a smart lamp and companion app that turns passive outage detection into active community connection. Built in 15 weeks as part of Michigan's IPD program, it launched at a 200-person trade show and sold 264 units in 3 days."
  },
  {
    id: "asksia",
    image: askSiaImage,
    title: "AskSia",
    titleColor: "#4E4DF4",
    tagline: "workspace for AI-study tool",
    description: "helping students learn smarter with AI-powered tutoring",
    type: "intern",
    industry: "EdTech, AI",
    status: "shipped",
    team: "2 Designers, 3 Engineers, 1 PM",
    timeline: "Aug 2025 - Feb 2026",
    skills: ["Figma", "Prototyping", "User Research"],
    tags: ["UI/UX design", "EdTech", "AI"],
    overview: "AskSia is a rapidly growing AI study companion, serving as the core learning tool for 100,000+ users worldwide.\n\nMy team redesigned the workspace and file management system to provide a scalable foundation for the product's rapid expansion.",
  },
  {
    id: "philo",
    image: philoImage,
    coverImage: philoInnerCover,
    coverFull: true,
    title: "Philo Design System",
    titleColor: "#C37933",
    tagline: "UX infra for e-commerce",
    description: "UX infrastructure for an e-commerce MVP",
    type: "intern",
    industry: "e-commerce",
    status: "shipped",
    team: "2 Designer, Founder, 2 Developers",
    timeline: "July 2025 (3-week sprint)",
    skills: ["Figma", "Material 3"],
    tags: ["design system", "UI library"],
    overview: "A 3-week sprint where I turned 15 scattered screens into a dev-ready UI library: a token-based foundation, 50 documented components, and UI templates that engineers could build from directly."
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
