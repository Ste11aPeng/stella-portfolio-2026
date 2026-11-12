import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

interface NextProjectProps {
  currentProjectId: string;
}

// The end of a case study, set like the end of a magazine piece: a small
// "next project" line and the next title in the same serif as the page's own,
// with an arrow. Hovering nudges the title along and fills the arrow.
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
        <Link
          to={`/project/${nextProject.id}`}
          className="group flex items-center gap-6 border-t border-border/60 pt-8"
          aria-label={`Next project: ${nextProject.title}, ${nextProject.tagline}`}
        >
          <div className="min-w-0 flex-1">
            <span className="text-sm text-muted-foreground mb-3 block">next project</span>
            <div className="transition-transform duration-500 ease-out group-hover:translate-x-2">
              {/* plain text (the section already fades in as a whole): the word-by-word
                  blur entrance could leave words unpainted down here */}
              <h2
                className="text-4xl text-foreground"
                style={{ fontFamily: "'Exposure', 'New Spirit', serif", fontWeight: 650, letterSpacing: "-0.07em" }}
              >
                {nextProject.title}
                <span className="text-foreground/40" aria-hidden="true">
                  {" · "}
                </span>
                <span className="text-foreground/60">{nextProject.tagline}</span>
              </h2>
            </div>
          </div>

          <span className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-foreground/[0.05] text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </motion.div>
    </section>
  );
};

export default NextProject;
