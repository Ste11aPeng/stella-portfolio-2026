import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import solutionOverviewImage from "@/assets/stitchi-solution-overview.png";
import solutionPt1Image from "@/assets/stitchi-solution-pt1.png";
import solutionPt2Image from "@/assets/stitchi-solution-pt2.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const StitchiSolution = () => {
  return (
    <section id="solution" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">solution</span>
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          Redesigning Search & Filter
        </h2>
      </motion.div>
      
      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        These insights shaped the system strategy: moving from instant to batch filtering, adding clearer feedback, and adopting Algolia for search.
      </motion.p>
      
      {/* Solution Overview Image */}
      <div className="mb-12">
        <ImageLightbox
          src={solutionOverviewImage}
          alt="Solution Overview - Batch apply, smarter search, always know what's active, new brands navigation, refined category experience"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
      
      {/* Smarter Search Engine Section */}
      <div className="mb-12">
        <ImageLightbox
          src={solutionPt1Image}
          alt="Smarter Search Engine - Pick up where you left off, smarter suggestions as you type"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
      
      {/* Cleaner Filter Section */}
      <div className="mb-8">
        <ImageLightbox
          src={solutionPt2Image}
          alt="Cleaner Filter - Before and after comparison showing applied filter tags, structured panel, and batch apply"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default StitchiSolution;
