import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloChallenge = () => {
  return (
    <section id="challenge" className="pt-24">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">challenge</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
          Our MVP Was Stuck
        </h2>
      </motion.div>
      
      <motion.p
        className="text-base mb-6 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}
      >
        <strong className="text-foreground/90">Where We Started: A Fast MVP, But No Foundation</strong>
      </motion.p>
      
      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        We initially relied on an open-source design system to speed up MVP delivery, but it lacked branding, scalability, and structure. When I onboarded a design engineer, our first task was to audit what existed. Together with a front-end developer, we cataloged all components, prioritized fixes based on how out-of-sync and business-critical they were, and quickly saw how much friction the lack of a system was creating.
      </motion.p>
    </section>
  );
};

export default PhiloChallenge;
