import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

// `delay` is when the first card starts to resolve (the homepage hero takes a
// moment to come in first); `className` replaces the section's own padding.
// `grid` swaps the two-across layout (the homepage stacks them one per row).
const ProjectGrid = ({ className, delay = 1.3, grid }: { className?: string; delay?: number; grid?: string }) => {
  return (
    <section id="work" className={className ?? "px-8 lg:px-24 pb-12 md:px-[32px] pt-6 max-w-[1440px] mx-auto"}>
      <div className={grid ?? "grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2.5"}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.97, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + index * 0.18,
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
