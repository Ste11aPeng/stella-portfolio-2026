import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import solutionImage2 from "@/assets/philo-solution-2.png";
import solutionImage3 from "@/assets/philo-solution-3.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloComponentMapping = () => {
  return (
    <section id="component-mapping" className="pt-16">
      <Separator className="mb-16 bg-border/60" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">solution · 02</span>
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          Component Mapping
        </h2>
      </motion.div>

      <div className="mb-12">
        <ImageLightbox
          src={solutionImage2}
          alt="What we have in component library - Foundations, Components, and Patterns"
          className="w-full rounded-lg shadow-sm"
        />
      </div>

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

export default PhiloComponentMapping;
