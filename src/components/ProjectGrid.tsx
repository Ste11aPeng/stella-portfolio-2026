import ProjectCard from "./ProjectCard";
import askSiaImage from "@/assets/project-asksia.jpg";
import circleStatusImage from "@/assets/project-circle-status.jpg";
import stitchiImage from "@/assets/project-stitchi.jpg";
import philoImage from "@/assets/project-philo.jpg";

const projects = [
  {
    image: askSiaImage,
    title: "AskSia",
    description: "Human - AI Interaction in EdTech",
    type: "Intern"
  },
  {
    image: circleStatusImage,
    title: "Circle Status",
    description: "A Smart Light System for Community Support",
    type: "Concept"
  },
  {
    image: stitchiImage,
    title: "Stitchi",
    description: "Better Search UX",
    type: "Intern"
  },
  {
    image: philoImage,
    title: "Philo Design system",
    description: "A developer-ready UI library",
    type: "Intern"
  }
];

const ProjectGrid = () => {
  return (
    <section id="work" className="px-8 md:px-16 lg:px-24 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
