import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaImpact = () => {
  return (
    <section id="impact" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">impact</span>
        <h2 className="text-xl font-medium mb-10 tracking-tight text-foreground leading-relaxed max-w-2xl">
          Content coming soon...
        </h2>
      </motion.div>
    </section>
  );
};

export default AsksiaImpact;
