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
        <span className="text-sm text-muted-foreground block mb-2">
          challenge
        </span>
      </motion.div>

      <motion.h3
        className="text-xl font-semibold text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
      >
        How might we help <span className="text-foreground">neighbors who don't know each other</span> feel <span className="text-foreground">safe enough to ask for help</span> when the <span className="text-foreground">power goes out</span>?
      </motion.h3>
    </section>
  );
};

export default CircleChallenge;
