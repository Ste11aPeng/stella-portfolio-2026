import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import AnimatedTitle from "@/components/AnimatedTitle";
import IframeEmbed from "@/components/philo/IframeEmbed";
import analysis4 from "@/assets/sia-design-analysis-4.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaDesignAnalysis = () => {
  return (
    <section id="design-analysis" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-6 block">Design Decision</span>
        <AnimatedTitle text="Will This Nav Still Work at 10x the Files?" className="text-2xl font-bold mb-6 text-foreground" />
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

      <IframeEmbed
        src="/asksia/file-access-iterations.html"
        title="Design iterations: Responsive Dropdown, Side Drawer, and Browser-like Tabs"
        aspect="880 / 695"
        className="!border-0 !rounded-none"
      />

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <AnimatedTitle text="Documenting Edge Cases and Acceptance Criteria" className="text-2xl font-bold mb-6 text-foreground" />
      </motion.div>

      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        I documented every edge case, from corrupted files to empty states, and wrote detailed specs with acceptance criteria so engineers could build without ambiguity.
      </motion.p>

      <ImageLightbox src={analysis4} alt="File upload edge cases and a UI/UX acceptance test tracking table" className="w-full rounded-lg border border-border/30" />
    </section>
  );
};

export default AsksiaDesignAnalysis;
