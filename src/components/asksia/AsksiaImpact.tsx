import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaImpact = () => {
  return (
    <section id="impact" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">impact</span>
      </motion.div>

      {/* Top row: two cards side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <motion.div
          className="rounded-2xl border border-border/40 bg-muted/30 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold mb-2 text-foreground">
            35%
          </h3>
          <p className="text-base text-foreground/70 leading-relaxed">
            Increase in chat viewport by implementing an adaptive collapsed state, directly solving the "cramped window" pain point.
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-border/40 bg-muted/30 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-2 text-foreground">
            3 Teams · 2 Weeks · 3 Iterations
          </h3>
          <p className="text-base text-foreground/70 leading-relaxed">
            Partnered with Engineering, Product, and AI Research to move from initial concept to a validated solution in a 14-day sprint.
          </p>
        </motion.div>
      </div>

      {/* Bottom row: full-width card */}
      <motion.div
        className="rounded-2xl border border-border/40 bg-muted/30 p-8 mt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-2 text-foreground">
          Strategic Scalability
        </h3>
        <p className="text-base text-foreground/70 leading-relaxed max-w-2xl">
          Established a universal navigation framework that now serves as the organizational standard for all AI-native tools in the product suite.
        </p>
      </motion.div>
    </section>
  );
};

export default AsksiaImpact;
