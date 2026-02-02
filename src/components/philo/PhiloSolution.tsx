import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import solutionImage1 from "@/assets/philo-solution-1.png";
import solutionImage2 from "@/assets/philo-solution-2.png";
import solutionImage3 from "@/assets/philo-solution-3.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloSolution = () => {
  return (
    <section id="solution" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">solution</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
          A Scalable, Dev-Ready System
        </h2>
      </motion.div>
      
      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        A component library built on Philo's brand, optimized for React Native, serving as a single source of truth for the team.
      </motion.p>
      
      {/* Solution Image 1 - Design System Table of Contents */}
      <div className="mb-12">
        <ImageLightbox
          src={solutionImage1}
          alt="Design System Table of Contents - Color, Typography, Button, Icon, Badge, Breadcrumb, and more components"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
      
      {/* Solution Image 2 - Component Library Structure */}
      <div className="mb-12">
        <ImageLightbox
          src={solutionImage2}
          alt="What we have in component library - Foundations, Components, and Patterns"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
      
      {/* Solution Image 3 - Detailed Components */}
      <div className="mb-8">
        <ImageLightbox
          src={solutionImage3}
          alt="Detailed component documentation - Color system, Elevation, Breadcrumb, Filter Chips, and form variants"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default PhiloSolution;
