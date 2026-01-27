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
        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            Cross-Disciplinary Collaboration
          </h3>
          <p className="text-base text-foreground/80 leading-relaxed">
            Working with engineers, PMs, and visual designers taught me how to communicate design decisions in ways that resonate across disciplines. I learned to balance user needs with technical constraints and business goals.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            From Research to Tangible Impact
          </h3>
          <p className="text-base text-foreground/80 leading-relaxed">
            Combining qualitative interviews with quantitative analysis (EDA, CART) gave us a robust understanding of user behavior. Translating these insights into a physical product and digital experience showed me the power of mixed-methods research.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            Rapid Prototyping & Iteration
          </h3>
          <p className="text-base text-foreground/80 leading-relaxed">
            Building hardware prototypes with Arduino and creating a full website in two days pushed me to work quickly without sacrificing quality. The IPD trade show validated that fast iteration can lead to meaningful results.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            Designing for Resilience
          </h3>
          <p className="text-base text-foreground/80 leading-relaxed">
            This project reinforced my belief that good design should serve communities during their most vulnerable moments. Circle Status isn't just a product—it's a system that helps neighbors help each other.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CircleReflection;
