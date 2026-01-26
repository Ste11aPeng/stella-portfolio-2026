import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import testingIterationImage from "@/assets/stitchi-testing-iteration.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const StitchiTesting = () => {
  return (
    <section id="testing" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">iteration</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
          From Exploration to Alignment
        </h2>
      </motion.div>
      
      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        Explored and tested multiple layouts, interactions, and hierarchies for search and filter. Quick feedback loops with a senior designer and mentor helped resolve conflicts between user needs and system constraints. This iterative process surfaced edge cases early and led to a solution aligned with both.
      </motion.p>
      
      {/* Testing Iteration Image */}
      <div className="mb-8">
        <ImageLightbox
          src={testingIterationImage}
          alt="Iteration Archive - Agile sprint with mentor & founder's feedback"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default StitchiTesting;
