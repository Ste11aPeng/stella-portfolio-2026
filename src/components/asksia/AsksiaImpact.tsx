import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Maximize2, Navigation, TrendingUp } from "lucide-react";

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
          <Maximize2 size={20} className="text-foreground/40 mb-4" />
          <p className="text-sm font-medium text-foreground/50 mb-2">Boosted Reading Focus</p>
          <h3 className="text-2xl font-bold mb-1 text-foreground">
            35% Viewport Gain
          </h3>
          <p className="text-base text-foreground/70 leading-relaxed">
            We made the chat area way bigger — no more squinting at a tiny window during long study sessions.
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-border/40 bg-muted/30 p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
        >
          <Navigation size={20} className="text-foreground/40 mb-4" />
          <p className="text-sm font-medium text-foreground/50 mb-2">Optimized Time-to-Source</p>
          <h3 className="text-2xl font-bold mb-1 text-foreground">
            20% Faster Navigation
          </h3>
          <p className="text-base text-foreground/70 leading-relaxed">
            Jumping between AI answers and your original files used to be clunky — now it's quick and painless.
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
        <TrendingUp size={20} className="text-foreground/40 mb-4" />
        <p className="text-sm font-medium text-foreground/50 mb-2">Built for Growth</p>
        <h3 className="text-2xl font-bold mb-1 text-foreground">
          Scalable Retention
        </h3>
        <p className="text-base text-foreground/70 leading-relaxed max-w-2xl">
          The layout stays clean even when users pile on more files — so the product doesn't get messier as it grows.
        </p>
      </motion.div>
    </section>
  );
};

export default AsksiaImpact;
