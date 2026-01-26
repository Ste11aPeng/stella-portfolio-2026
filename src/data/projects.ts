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
    tagline: "a smart light system for community support",
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
    tagline: "better search UX",
    description: "better search UX for B2B merch platform",
    type: "intern",
    role: "Product Designer",
    team: "2 Designers, 2 Engineers, 4 Product Managers",
    timeline: "Jun 2025 - Jul 2025",
    skills: ["Product Design", "Interface Design", "Interaction Design", "Prototyping", "Usability Testing", "Thematic Analysis"],
    tags: ["UI/UX design", "B2B / SaaS", "e-commerce"],
    overview: "In June 2025, our team ran a 4-week internal redesign sprint to tackle a growing usability problem on Stitchi, a B2B merch management platform. As the product scaled and supplier catalogs grew, users struggled to find what they needed due to cluttered filters, inconsistent interactions, and poor search guidance."
  },
  {
    id: "philo",
    image: philoImage,
    title: "Philo Design System",
    tagline: "a developer-ready UI library",
    description: "building consistent experiences at scale",
    type: "intern",
    role: "Design System Designer",
    team: "3 Designers, 5 Engineers",
    timeline: "Mar 2024 - Aug 2024",
    skills: ["Design Systems", "Component Design", "Documentation", "Accessibility"],
    tags: ["design system", "UI library"],
    overview: "Philo is a comprehensive design system built to ensure consistency across products while enabling rapid development through a well-documented, accessible component library."
  },
  {
    id: "tell-tool",
    image: tellToolImage,
    title: "Tell Tool",
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
