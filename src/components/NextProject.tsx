import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

interface NextProjectProps {
  currentProjectId: string;
}

const NextProject = ({ currentProjectId }: NextProjectProps) => {
  const currentIndex = projects.findIndex((p) => p.id === currentProjectId);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <section className="pt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1] }}
      >
        <span className="text-sm text-muted-foreground mb-3 block">next project</span>
        <Link to={`/project/${nextProject.id}`} className="group block">
          <div className="relative overflow-hidden" style={{ aspectRatio: "645/326" }}>
            <img
              src={nextProject.image}
              alt={nextProject.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-wrap gap-1.5">
              <span
                className="project-badge project-title font-medium"
                style={{ color: nextProject.titleColor }}
              >
                {nextProject.title}
              </span>
              <span className="project-badge project-description">
                {nextProject.tagline}
              </span>
              <span className="project-badge project-type">
                {nextProject.type}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default NextProject;
