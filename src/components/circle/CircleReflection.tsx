import { motion, type Easing } from "framer-motion";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const CircleReflection = () => {
  return (
    <section id="reflection" className="pt-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <span className="text-sm text-muted-foreground block mb-2">
          reflection
        </span>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          What I Learned
        </h2>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <p className="text-base text-foreground/80 leading-relaxed">
          Working with engineers, PMs, and visual designers taught me how to <span className="font-medium text-foreground">communicate design decisions</span> in ways that resonate across disciplines. I learned to balance user needs with technical constraints and business goals.
        </p>

        <p className="text-base text-foreground/80 leading-relaxed">
          Combining qualitative interviews with quantitative analysis (EDA, CART) gave us a robust understanding of user behavior. Translating these insights into a <span className="font-medium text-foreground">physical product and digital experience</span> showed me the power of mixed-methods research.
        </p>
      </motion.div>
    </section>
  );
};

export default CircleReflection;
