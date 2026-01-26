import askSiaImage from "@/assets/project-asksia.png";
import circleStatusImage from "@/assets/project-circle-status.png";
import stitchiImage from "@/assets/project-stitchi.png";
import philoImage from "@/assets/project-philo.png";
import tellToolImage from "@/assets/project-telltool.png";
import forgottenSenseImage from "@/assets/project-forgotten-sense.png";

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
}

export const projects: Project[] = [
  {
    id: "asksia",
    image: askSiaImage,
    title: "AskSia",
    titleColor: "#4E4DF4",
    tagline: "human - AI interaction in EdTech",
    description: "helping students learn smarter with AI-powered tutoring",
    type: "intern",
    role: "Product Designer",
    team: "2 Designers, 3 Engineers, 1 PM",
    timeline: "Jan 2025 - Mar 2025",
    skills: ["Product Design", "Interface Design", "Interaction Design", "Prototyping", "User Research"],
    tags: ["UI/UX design", "EdTech", "AI"],
    overview: "In this project, our team worked on improving the learning experience for students using AI-powered tutoring. We focused on creating intuitive interfaces that make complex AI interactions feel natural and helpful."
  },
  {
    id: "circle-status",
    image: circleStatusImage,
    title: "Circle Status",
    titleColor: "#F08368",
    tagline: "light system for community",
    description: "connecting neighbors through ambient awareness",
    type: "concept",
    role: "Lead Designer",
    team: "1 Designer, 2 Engineers",
    timeline: "Sep 2024 - Dec 2024",
    skills: ["Product Design", "IoT Design", "User Research", "Prototyping"],
    tags: ["UI/UX design", "IoT", "community"],
    overview: "Circle Status is a concept project exploring how ambient technology can strengthen community bonds and provide non-intrusive support systems for neighbors."
  },
  {
    id: "stitchi",
    image: stitchiImage,
    title: "Stitchi.co",
    titleColor: "#678877",
    tagline: "better search UX",
    description: "better search UX for B2B merch platform",
    type: "intern",
    role: "Product Designer – led research, defined interaction patterns, validated with users, aligned design with development.",
    team: "Me (UX/UI), PM (Everest), 2 developers (Rexell, Danish)",
    timeline: "June 2025 (4 weeks)",
    skills: ["Figma", "Slack", "Algolia"],
    tags: ["UI/UX design", "B2B / SaaS", "e-commerce"],
    overview: "Helping B2B buyers stop guessing and start finding on Stitchi.co. In June 2025, we ran a 4-week internal redesign sprint to fix a growing usability issue on Stitchi. As supplier catalogs expanded, users struggled to find products because filters were cluttered, interactions were inconsistent, and search offered little guidance."
  },
  {
    id: "philo",
    image: philoImage,
    title: "Philo Design System",
    titleColor: "#C37933",
    tagline: "a dev-ready UI library",
    description: "building consistent experiences at scale",
    type: "intern",
    role: "Product Designer — audited existing screens, defined scalable patterns, built & documented the system, facilitated design–dev alignment.",
    team: "Me (Designer), PM (Mingfei), 2 developers (Rexell, Danish), 2 Designers (Lauren, Anna)",
    timeline: "July 2025 (3-week sprint)",
    skills: ["Figma", "Slack", "Material 3 UI"],
    tags: ["design system", "UI library"],
    overview: "In Summer 2025, I joined Philo Home as a product designer through a startup accelerator, where I supported multiple product initiatives. Philo Home is a furniture e-commerce platform powered by AI-driven recommendations. As the lead designer on this project, I built a reusable design system to help the team scale beyond the MVP."
  },
  {
    id: "tell-tool",
    image: tellToolImage,
    title: "Tell Tool",
    titleColor: "#F45F63",
    tagline: "visualizing care and love",
    description: "visualizing care and love",
    type: "concept",
    role: "Designer",
    team: "1 Designer",
    timeline: "2024",
    skills: ["Branding", "Visual Design", "Concept Development"],
    tags: ["branding", "concept"],
    overview: "Tell Tool is a concept project exploring how to visualize and communicate care and love through design."
  },
  {
    id: "forgotten-sense",
    image: forgottenSenseImage,
    title: "Forgotten Sense",
    titleColor: "#678877",
    tagline: "wearable",
    description: "wearable",
    type: "concept",
    role: "Designer",
    team: "1 Designer",
    timeline: "2024",
    skills: ["Wearable Design", "Prototyping", "Concept Development"],
    tags: ["wearable", "concept"],
    overview: "Forgotten Sense is a concept wearable project exploring sensory experiences through technology."
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
