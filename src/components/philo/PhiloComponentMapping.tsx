import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import IframeEmbed from "@/components/philo/IframeEmbed";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloComponentMapping = () => {
  return (
    <section id="component-mapping" className="pt-16">
      <Separator className="mb-16 bg-border/60" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">solution · 02</span>
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          Four layers: foundations, components, patterns, and pages
        </h2>
        <motion.p
          className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
        >
          Built on Material 3, our system has four layers: foundations, components, patterns, and pages assembled from them. Each layer builds on the one below, so new features ship from parts that already exist.
        </motion.p>
      </motion.div>

      {/* Interactive build: the four layers stacking animation */}
      <div className="mb-8">
        <IframeEmbed
          src="/philo/four-layers.html"
          title="Philo design system: four layers"
          aspect="581 / 786"
          maxWidth={581}
        />
      </div>
    </section>
  );
};

export default PhiloComponentMapping;
