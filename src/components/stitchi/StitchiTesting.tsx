import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import testingIterationImage from "@/assets/stitchi-testing-iteration.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const StitchiTesting = () => {
  return (
    <section id="testing" className="pt-24">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.h2 
        className="text-2xl font-bold mb-8 tracking-tight"
        style={{ fontFamily: 'Manrope', color: '#161616' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        Testing & Iteration
      </motion.h2>
      
      <motion.h3 
        className="text-lg font-semibold mb-5 text-foreground/90"
        style={{ fontFamily: 'Manrope' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        From Exploration to Alignment
      </motion.h3>
      
      <motion.p 
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        style={{ fontFamily: 'Manrope' }}
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
