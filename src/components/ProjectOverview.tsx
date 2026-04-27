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
        className="text-base mb-16 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        {project.overview}
      </motion.p>
      
      {/* Compact meta row */}
      <motion.dl
        className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
      >
        <div className="flex gap-1.5">
          <dt className="text-muted-foreground/70">role</dt>
          <dd className="text-foreground/70">{project.role}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-muted-foreground/70">team</dt>
          <dd className="text-foreground/70">{project.team}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-muted-foreground/70">timeline</dt>
          <dd className="text-foreground/70">{project.timeline}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-muted-foreground/70">skills</dt>
          <dd className="text-foreground/70">{project.skills.join(", ")}</dd>
        </div>
      </motion.dl>
    </section>
  );
};

export default ProjectOverview;
