import { motion, type Easing } from "framer-motion";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const CircleChallenge = () => {
  return (
    <section id="challenge" className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <span className="text-sm text-muted-foreground mb-3 block">
          challenge
        </span>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-foreground leading-snug"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
      >
        How might we help <span className="text-foreground/60">neighbors who don't know each other</span> feel safe enough to ask for help when the <span className="text-foreground/60">power goes out</span>?
      </motion.h2>
    </section>
  );
};

export default CircleChallenge;
