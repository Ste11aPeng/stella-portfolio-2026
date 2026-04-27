import { motion, type Easing } from "framer-motion";
import ImageLightbox from "@/components/ImageLightbox";
import research1Image from "@/assets/circle-research-1.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const CircleResearch = () => {
  return (
    <section id="research" className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <span className="text-sm text-muted-foreground block mb-2">
          research
        </span>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Research & User Modeling
        </h2>
        <p className="text-base text-foreground/80 leading-relaxed mb-8">
          We ran 50+ household interviews and surveyed 200 Midwest residents, then used CART analysis to find what actually predicts help-seeking behavior during outages.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <ImageLightbox
          src={research1Image}
          alt="Research findings: interviews, affinity diagram, empathy map, and CART feature importance"
          className="w-full rounded-lg"
        />
      </motion.div>
    </section>
  );
};

export default CircleResearch;
