import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import researchImage from "@/assets/sia-research.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaResearch = () => {
  return (
    <section id="research" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">UXR</span>
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          How Other Tools Handle the Same Problem
        </h2>
      </motion.div>

      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        I analyzed navigation patterns in Notion, NotebookLM, and YouLearn to identify the optimal balance between information density and cognitive load.
      </motion.p>

      <ImageLightbox src={researchImage} alt="AskSia - UX Research: Notion, NotebookLM, YouLearn" className="w-full rounded-lg border border-border/30" />

      <motion.div
        className="mt-8 border-l-2 border-primary/60 bg-muted/40 rounded-r-lg px-6 py-5"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-2 block">Key Insight</span>
        <p className="text-base text-foreground/90 leading-relaxed">
          "Navigation visibility should adapt to the user's current intent, not remain static."
        </p>
      </motion.div>
    </section>
  );
};

export default AsksiaResearch;
