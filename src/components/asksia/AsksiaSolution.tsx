import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import solution1 from "@/assets/sia-solution-1.png";
import solution2 from "@/assets/sia-solution-2.png";
import solution3 from "@/assets/sia-solution-3.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaSolution = () => {
  return (
    <section id="solution" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">solution</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
          A Responsive File List That Adapts to How Students Work
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

      <div className="space-y-8">
        <ImageLightbox src={solution1} alt="AskSia - Chat Focus" className="w-full rounded-lg shadow-sm" />
        <ImageLightbox src={solution2} alt="AskSia - Chat + File List" className="w-full rounded-lg shadow-sm" />
        <ImageLightbox src={solution3} alt="AskSia - Reading + Chat" className="w-full rounded-lg shadow-sm" />
      </div>
    </section>
  );
};

export default AsksiaSolution;
