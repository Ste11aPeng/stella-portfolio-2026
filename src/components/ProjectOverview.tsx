import { motion, type Easing } from "framer-motion";
import { Project } from "@/data/projects";
import AnimatedTitle from "@/components/AnimatedTitle";

interface ProjectOverviewProps {
  project: Project;
}

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  const emphasised = project.overview.includes("**");
  return (
    <section id="overview" className="pt-16">
      <div className="overflow-hidden">
        <AnimatedTitle
          className="text-4xl mb-5 text-foreground"
          style={{ fontFamily: "'Exposure', 'New Spirit', serif", fontWeight: 650, letterSpacing: "-0.07em" }}
          segments={[
            { text: project.title },
            { text: " · ", className: "text-foreground/40", ariaHidden: true },
            { text: project.tagline, className: "text-foreground/60" },
          ]}
        />
      </div>

      <motion.div
        className="border-t border-border/40 pt-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}
      >
        <motion.p
          className="text-base leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
        >
          {emphasised
            ? // **marked** phrases (the numbers, the outcome) stay dark; the rest recedes to grey
              project.overview.split("**").map((part, i) =>
                i % 2 ? (
                  <span key={i} className="text-foreground">
                    {part}
                  </span>
                ) : (
                  part
                )
              )
            : project.overview}
        </motion.p>
      </motion.div>

      {/* Compact meta row */}
      <motion.dl
        className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground border-t border-border/40 mt-5 pt-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
      >
        <div className="flex gap-1.5">
          <dt className="text-muted-foreground/70">industry</dt>
          <dd className="text-foreground/70">{project.industry}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-muted-foreground/70">status</dt>
          <dd className="text-foreground/70">{project.status}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-muted-foreground/70">team</dt>
          <dd className="text-foreground/70">{project.team}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="text-muted-foreground/70">timeline</dt>
          <dd className="text-foreground/70">{project.timeline}</dd>
        </div>
      </motion.dl>
    </section>
  );
};

export default ProjectOverview;
