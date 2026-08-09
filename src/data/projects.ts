import askSiaAsset from "@/assets/project-asksia-cover.png.asset.json";
const askSiaImage = askSiaAsset.url;
import circleStatusAsset from "@/assets/project-circle-status-cover.png.asset.json";
const circleStatusImage = circleStatusAsset.url;
import philoImage from "@/assets/project-philo.webp";
import tiktokImage from "@/assets/project-tiktok.png";

export interface Project {
  id: string;
  image: string;
  title: string;
  titleColor: string;
  tagline: string;
  description: string;
  type: string;
  role: string;
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
    role: "Product Design Intern",
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
    title: "Circle Status",
    titleColor: "#FFCB05",
    tagline: "light for community",
    description: "connecting neighbors through ambient awareness",
    type: "0 to 1",
    role: "Product Designer: 3D Modeling, Prototyping, Website Design",
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
    role: "Product Design – Information Architecture, Nav, File Model",
    team: "2 Designers, 3 Engineers, 1 PM",
    timeline: "Aug 2025 - Feb 2026",
    skills: ["Figma", "Prototyping", "User Research"],
    tags: ["UI/UX design", "EdTech", "AI"],
    overview: "AskSia is a rapidly growing AI study companion, serving as the core learning tool for 100,000+ users worldwide.\n\nMy team redesigned the workspace and file management system to provide a scalable foundation for the product's rapid expansion.",
  },
  {
    id: "philo",
    image: philoImage,
    title: "Philo Design System",
    titleColor: "#C37933",
    tagline: "a dev-ready UI library",
    description: "building consistent experiences at scale",
    type: "intern",
    role: "Product Designer, audited existing screens, defined scalable patterns, built & documented the system, facilitated design–dev alignment.",
    team: "Me (Designer), PM (Mingfei), 2 developers (Rexell, Danish), 2 Designers (Lauren, Anna)",
    timeline: "July 2025 (3-week sprint)",
    skills: ["Figma", "Slack", "Material 3 UI"],
    tags: ["design system", "UI library"],
    overview: "A 3-week sprint to build a reusable, dev-ready design system for Philo Home's furniture e-commerce platform."
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
