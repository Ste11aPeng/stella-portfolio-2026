import askSiaImage from "@/assets/asksia-cover.png";
import circleStatusImage from "@/assets/project-circle-status-cover.png";
import circleStatusCover from "@/assets/circle-status-inside-cover.png";
import philoImage from "@/assets/project-philo.webp";
import tiktokImage from "@/assets/project-tiktok.png";

export interface Project {
  id: string;
  image: string;
  coverImage?: string;
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
    coverImage: circleStatusCover,
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
    title: "Philo Design system",
    titleColor: "#C37933",
    tagline: "UX infrastructure for a furniture e-commerce MVP",
    description: "UX infrastructure for a furniture e-commerce MVP",
    type: "intern",
    role: "audited problem, built the system, facilitated design–dev alignment.",
    team: "2 Designer, Founder, 2 developers",
    timeline: "July 2025 (3-week sprint)",
    skills: ["Figma", "Material 3"],
    tags: ["design system", "UI library"],
    overview: "A 3-week sprint where I turned 15 scattered screens into a dev-ready UI library: a token-based foundation, 50 documented components, and page templates that engineers could build from directly."
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
