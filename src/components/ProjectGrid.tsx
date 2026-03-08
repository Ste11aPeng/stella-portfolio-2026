import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const ProjectGrid = () => {
  return (
    <section id="work" className="px-8 lg:px-24 pb-12 md:px-[32px] max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2 + index * 0.08,
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
              index={index}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
