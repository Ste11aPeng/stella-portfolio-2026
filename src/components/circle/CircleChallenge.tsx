import { motion, type Easing } from "framer-motion";
import AnimatedTitle from "@/components/AnimatedTitle";

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
        <span className="text-sm text-muted-foreground mb-6 block">
          challenge
        </span>
      </motion.div>

      <AnimatedTitle
        className="text-2xl font-bold text-foreground leading-snug"
        segments={[
          { text: "How might we help " },
          { text: "neighbors who don't know each other", className: "text-foreground/60" },
          { text: " feel safe enough to ask for help when the " },
          { text: "power goes out", className: "text-foreground/60" },
          { text: "?" },
        ]}
      />
    </section>
  );
};

export default CircleChallenge;
