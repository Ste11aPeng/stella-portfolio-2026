import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import philoChallengeBoard from "@/assets/philo-challenge-board.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloChallenge = () => {
  return (
    <section id="challenge" className="pt-5">
      <Separator className="mb-16 bg-border/60" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-6 block">challenge</span>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          how to design a system for features that didn't exist yet.
        </h2>
        <motion.p
          className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
        >
          The startup had an prototype pieced together from an open-source UI kit and mockups made by a non-designer. There was no rules whatsoever, while the dev team was shipping at the same time.
        </motion.p>
      </motion.div>

      <ImageLightbox
        src={philoChallengeBoard}
        alt="The MVP file, before the system - unnamed Figma frames with no shared components"
        className="w-full rounded-lg mb-10"
      />
    </section>
  );
};

export default PhiloChallenge;
