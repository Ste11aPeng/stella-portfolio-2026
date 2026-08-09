import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import challengeImage from "@/assets/sia-challenge.png";
import introImage from "@/assets/sia-intro.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaChallenge = () => {
  return (
    <section id="challenge" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">challenge</span>
        <h2 className="text-xl font-medium mb-10 text-foreground leading-relaxed max-w-2xl">
          How might we optimize screen real estate to help students focus on AI insights rather than navigating a cluttered UI?
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <span className="text-sm text-muted-foreground mb-3 block">constraints</span>
        <p className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed">
          Speed: 2-week Sprint / Team: Lean (4 pax) / Tech: Library-based / Goal: Growth-ready
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}
        className="mb-6"
      >
        <ImageLightbox
          src={introImage}
          alt="AskSia - Learning journey overview"
          className="w-full rounded-lg border border-border/30"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        <ImageLightbox
          src={challengeImage}
          alt="AskSia - Current design pain points"
          className="w-full rounded-lg border border-border/30"
        />
      </motion.div>
    </section>
  );
};

export default AsksiaChallenge;
