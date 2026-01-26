import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";
const ProjectGrid = () => {
  return <section id="work" className="px-8 lg:px-24 pb-24 md:px-[32px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map(project => <ProjectCard key={project.id} id={project.id} image={project.image} title={project.title} description={project.tagline} type={project.type} />)}
      </div>
    </section>;
};
export default ProjectGrid;