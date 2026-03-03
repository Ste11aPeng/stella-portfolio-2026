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
  comingSoon?: boolean;
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
    timeline: "Aug 2025 - Feb 2026",
    skills: ["Figma", "Prototyping", "User Research"],
    tags: ["UI/UX design", "EdTech", "AI"],
    overview: "AskSia is an AI study companion that transforms messy learning materials into actionable insights. I redesigned its workspace to balance deep reading with efficient file management, replacing a cluttered interface with an adaptive, responsive environment.",
  },
  {
    id: "circle-status",
    image: circleStatusImage,
    title: "Circle Status",
    titleColor: "#F08368",
    tagline: "light for community",
    description: "connecting neighbors through ambient awareness",
    type: "school project",
    role: "Product Designer: 3D Modeling, Prototyping, Website Design",
    team: "Product Design (Me), PM (David C), SWE (Garima), Visual Design (Maggie), Lecturer (Etika B., Bruce T.)",
    timeline: "Fall 2024 (15 weeks)",
    skills: ["Figma", "Blender", "Rhino", "Webflow"],
    tags: ["UI/UX design", "IoT", "community"],
    overview: "This is a project for Integrated Product Development (IPD) course at University of Michigan. Theme of 2024 is When the Lights Go Out. As cross-disciplinary design and development teams, how might we help people deal with electrical power outages, to ensure that basic needs can be met, inconveniences of the disruption are reduced, and/or possible benefits of the situation are leveraged or embraced."
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
    overview: "Helping B2B buyers stop guessing and start finding. A 4-week sprint to fix product discovery as catalogs scaled."
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
    overview: "A 3-week sprint to build a reusable, dev-ready design system for Philo Home's furniture e-commerce platform."
  },
  {
    id: "tell-tool",
    image: tellToolImage,
    title: "Tell Tool",
    titleColor: "#F45F63",
    tagline: "research brand identity",
    description: "warm visual identity for donor conception research",
    type: "concept",
    role: "Visual Identity Designer — led logo, color, typography, and brand guidelines, collaborating with nursing researchers.",
    team: "Me (Designer), Nursing Researchers (School of Nursing, UMich)",
    timeline: "2024",
    skills: ["Branding", "Visual Identity", "Typography", "Print Design"],
    tags: ["branding", "visual identity", "research"],
    overview: "A visual identity designed for a nursing research project on donor conception, balancing emotional warmth with clinical clarity to help families navigate sensitive conversations."
  },
  {
    id: "forgotten-sense",
    image: forgottenSenseImage,
    title: "Forgotten Sense",
    titleColor: "#678877",
    tagline: "e-textile wearable",
    description: "haptic wearable for anosmia patients",
    type: "concept",
    role: "Designer — wearable form design, interaction patterns, e-textile prototyping",
    team: "Me (Designer)",
    timeline: "2024",
    skills: ["E-textile", "Wearable Design", "Prototyping", "Interaction Design"],
    tags: ["wearable", "e-textile", "assistive tech"],
    overview: "An e-textile wearable that translates scent-dependent moments into gentle haptic and visual cues, helping people with anosmia feel more confident and aware in daily life."
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
