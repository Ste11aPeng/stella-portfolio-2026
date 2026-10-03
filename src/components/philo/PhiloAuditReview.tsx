import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import philoAudit from "@/assets/philo-audit.png.asset.json";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloAuditReview = () => {
  return (
    <section id="audit-review" className="pt-16">
      <Separator className="mb-16 bg-border/60" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">solution · 01</span>
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          Auditing 15 screens and prioritizing what to fix first
        </h2>
        <motion.p
          className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
        >
          With a front-end SDE, I audited ~15 screens and mapped everything into one inventory, ranked by severity and urgency. Engineers told us exactly what they were missing: consistent tokens, predictable naming, and clear variants.
        </motion.p>
      </motion.div>

      <div className="mb-8">
        <ImageLightbox
          src={philoAudit.url}
          alt="Current prototype audit - unclear hierarchy, unclear tab affordance, failed contrast check, and missing brand identity callouts"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default PhiloAuditReview;
