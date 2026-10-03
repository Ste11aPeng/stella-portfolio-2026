import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import AnimatedTitle from "@/components/AnimatedTitle";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloAuditReview = () => {
  return (
    <section id="audit-review" className="pt-16">
      <Separator className="mb-16 bg-border/60" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-6 block">Audit &amp; Review</span>
        <AnimatedTitle text="Auditing 15 screens and prioritizing what to fix first" className="text-2xl font-bold mb-6 text-foreground" />
        <motion.p
          className="text-base max-w-4xl text-foreground/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
        >
          With a front-end SDE, I audited ~15 screens and mapped everything into one inventory, ranked by severity and urgency. Engineers told us exactly what they were missing: consistent tokens, predictable naming, and clear variants.
        </motion.p>
      </motion.div>

    </section>
  );
};

export default PhiloAuditReview;
