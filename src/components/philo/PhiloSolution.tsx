import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import philoSolution2 from "@/assets/philo-solution-2.png";
import philoSolution3 from "@/assets/philo-solution-3.png";
import IframeEmbed from "@/components/philo/IframeEmbed";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloSolution = () => {
  return (
    <section id="solution" className="pt-16">
      <Separator className="mb-16 bg-border/60" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-6 block">solution</span>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          One system, built to grow with the product.
        </h2>
      </motion.div>

      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        50+ components, all mapped to React Native. New screens were assembled from existing parts instead of designed from scratch, cutting the design-to-dev cycle from months to two weeks.
      </motion.p>

      {/* Interactive build: from tokens to a page */}
      <div className="mb-12">
        <IframeEmbed
          src="/philo/tokens-to-page.html"
          title="Philo design system: from tokens to a page"
          aspect="1536 / 864"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[932fr_581fr] md:gap-4">
        <div>
          <ImageLightbox
            src={philoSolution2}
            alt="Design system table of contents with component thumbnails"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <ImageLightbox
            src={philoSolution3}
            alt="Component specs: button sizing, dropdown menu, and product card"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PhiloSolution;
