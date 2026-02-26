import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import analysis1 from "@/assets/sia-design-analysis-1.png";
import analysis2 from "@/assets/sia-design-analysis-2.png";
import analysis3 from "@/assets/sia-design-analysis-3.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaDesignAnalysis = () => {
  return (
    <section id="design-analysis" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">design decision analysis</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
          Evaluating Navigation Scalability
        </h2>
      </motion.div>

      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        I explored Side Drawers and Tabs before pivoting to a Responsive Dropdown, prioritizing long-term scalability and maximum viewport for AI responses.
      </motion.p>

      <div className="space-y-8">
        <ImageLightbox src={analysis1} alt="Design Decision - Side Drawer approach" className="w-full rounded-lg border border-border/30" />
        <ImageLightbox src={analysis2} alt="Design Decision - Browser-like Tabs approach" className="w-full rounded-lg border border-border/30" />
        <ImageLightbox src={analysis3} alt="Design Decision - Responsive Dropdown approach" className="w-full rounded-lg border border-border/30" />
      </div>
    </section>
  );
};

export default AsksiaDesignAnalysis;
