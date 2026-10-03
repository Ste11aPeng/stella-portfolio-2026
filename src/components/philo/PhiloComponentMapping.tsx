import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import IframeEmbed from "@/components/philo/IframeEmbed";
import ImageLightbox from "@/components/ImageLightbox";
import philoAudit from "@/assets/philo-audit.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloComponentMapping = () => {
  return (
    <section id="component-mapping" className="pt-16">
      <Separator className="mb-16 bg-border/60" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">Component Mapping</span>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          Four layers: foundations, components, patterns, and pages
        </h2>
        <motion.p
          className="text-base mb-4 max-w-4xl text-foreground/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
        >
          Built on Material 3, our system has four layers: foundations, components, patterns, and pages assembled from them. Each layer builds on the one below, so new features ship from parts that already exist.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.6fr_1fr] md:gap-4 mb-8">
        <div>
          <span className="mb-2 block text-sm text-muted-foreground">Philo_Audit</span>
          <ImageLightbox
            src={philoAudit}
            alt="Current prototype audit with hierarchy, affordance, contrast, and brand identity callouts"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <span className="mb-2 block text-sm text-muted-foreground">Philo_Component Mapping</span>
          <IframeEmbed
            src="/philo/four-layers.html"
            title="Philo design system: four layers"
            aspect="581 / 786"
            className="h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default PhiloComponentMapping;
