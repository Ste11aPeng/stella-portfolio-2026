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
        <span className="text-sm text-muted-foreground mb-3 block">research iteration</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
          Competitive Analysis & User Research
        </h2>
      </motion.div>

      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        Content coming soon...
      </motion.p>

      <ImageLightbox src={researchImage} alt="AskSia - UX Research: Notion, NotebookLM, YouLearn" className="w-full rounded-lg shadow-sm" />
    </section>
  );
};

export default AsksiaResearch;
