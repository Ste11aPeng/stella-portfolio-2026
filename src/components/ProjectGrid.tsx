import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const ProjectGrid = () => {
  return (
    <section id="work" className="px-8 lg:px-24 pb-24 md:px-[32px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.0, 0.0, 0.2, 1], 
              delay: 0.2 + index * 0.05 
            }}
          >
            <ProjectCard
              id={project.id}
              image={project.image}
              title={project.title}
              titleColor={project.titleColor}
              description={project.tagline}
              type={project.type}
              comingSoon={project.comingSoon}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;