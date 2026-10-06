import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const ProjectGrid = () => {
  return (
    <section id="work" className="px-8 lg:px-24 pb-12 md:px-[32px] pt-6 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2.5">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.97, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
              delay: 1.3 + index * 0.18,
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
