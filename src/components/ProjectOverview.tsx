import { motion, type Easing } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectOverviewProps {
  project: Project;
}

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  return (
    <section id="overview" className="pt-16">
      <div className="overflow-hidden">
        <motion.h2
          className="text-4xl mb-4 tracking-tight text-foreground"
          style={{ fontFamily: "'New Spirit', serif", fontWeight: 400 }}
          initial={{ y: "100%", rotateX: 40 }}
          whileInView={{ y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.title}
        </motion.h2>
      </div>
      
      <div className="overflow-hidden">
        <motion.p
          className="text-3xl text-foreground/60 mb-12 leading-relaxed"
          style={{ fontFamily: "'New Spirit', serif", fontWeight: 400 }}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          {project.tagline}
        </motion.p>
      </div>
      
      <motion.p
        className="text-base mb-16 max-w-3xl text-foreground/80 leading-relaxed whitespace-pre-line"
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
