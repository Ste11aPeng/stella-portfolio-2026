import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

interface NextProjectProps {
  currentProjectId: string;
}

const NextProject = ({ currentProjectId }: NextProjectProps) => {
  const currentIndex = projects.findIndex((p) => p.id === currentProjectId);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!nextProject) return null;

  return (
    <section className="pt-24 pb-8">
      <motion.p
        className="text-sm text-muted-foreground mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        Next Project
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to={`/project/${nextProject.id}`}>
          <div className="group relative overflow-hidden rounded-lg cursor-pointer">
            <div className="overflow-hidden w-full" style={{ aspectRatio: "645/326" }}>
              <img
                src={nextProject.image}
                alt={nextProject.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            {/* Tags always visible */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pl-5 pb-5">
              <div className="inline-flex items-center" style={{ gap: "5px" }}>
                <span
                  className="project-badge project-title font-medium"
                  style={{ color: nextProject.titleColor }}
                >
                  {nextProject.title}
                </span>
                <span className="project-badge project-description">
                  {nextProject.tagline}
                </span>
                <span className="project-badge project-type">{nextProject.type}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default NextProject;
