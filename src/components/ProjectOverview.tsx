import { motion, type Easing } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectOverviewProps {
  project: Project;
}

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  return (
    <section id="overview" className="pt-16">
      <motion.h2
        className="text-3xl font-bold mb-4 tracking-tight text-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        {project.title}
      </motion.h2>
      
      <motion.p
        className="text-lg text-foreground/60 mb-12 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        {project.tagline}
      </motion.p>
      
      <motion.p
        className="text-base mb-16 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        {project.overview}
      </motion.p>
      
      {/* Info Grid - 2x2 layout */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
      >
        <div>
          <span className="text-sm text-muted-foreground block mb-2">
            role
          </span>
          <p className="text-base font-medium text-foreground/90">
            {project.role}
          </p>
        </div>
        
        <div>
          <span className="text-sm text-muted-foreground block mb-2">
            team
          </span>
          <p className="text-base font-medium text-foreground/90">
            {project.team}
          </p>
        </div>
        
        <div>
          <span className="text-sm text-muted-foreground block mb-2">
            timeline
          </span>
          <p className="text-base font-medium text-foreground/90">
            {project.timeline}
          </p>
        </div>
        
        <div>
          <span className="text-sm text-muted-foreground block mb-2">
            skills
          </span>
          <p className="text-base font-medium text-foreground/90">
            {project.skills.join(", ")}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectOverview;
