import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaReflection = () => {
  return (
    <section id="reflection" className="pt-16 pb-24">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">reflection</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
          Staying Ahead in the AI Design Landscape
        </h2>
      </motion.div>

      <motion.p
        className="text-base mb-6 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        These past 6 months were all about staying ahead of the curve. Instead of just waiting for requirements, I pushed myself to deep-dive into the rapidly evolving world of AI design patterns. I didn't just want to "fit" into a startup; I wanted to help define it. By building a habit of constantly scouting new trends and translating them into our system, I've realized that my most valuable asset isn't just my Figma toolkit, but this proactive mindset that keeps me always be curious and ready for what's next in AI.
      </motion.p>
    </section>
  );
};

export default AsksiaReflection;
