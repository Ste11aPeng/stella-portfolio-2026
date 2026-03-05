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
    <section className="pt-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1] }}
      >
        <p className="text-sm text-muted-foreground/50 mb-4">Next Project</p>
        <Link to={`/project/${nextProject.id}`} className="group block">
          <div className="overflow-hidden rounded-lg">
            <img
              src={nextProject.image}
              alt={nextProject.title}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <h3
              className="text-xl transition-colors"
              style={{ fontFamily: "'New Spirit', serif", fontWeight: 400, color: nextProject.titleColor }}
            >
              {nextProject.title}
            </h3>
            <span className="text-sm text-muted-foreground/60">{nextProject.description}</span>
          </div>
          <div className="flex gap-2 mt-2">
            {nextProject.tags.map((tag) => (
              <span key={tag} className="project-badge text-xs">{tag}</span>
            ))}
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default NextProject;
