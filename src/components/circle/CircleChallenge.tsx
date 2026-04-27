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

      <motion.p
        className="text-base text-muted-foreground mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
      >
        The brief was open: <span className="text-foreground">help communities cope with power outages</span>. Our job was to find a <span className="text-foreground">niche user</span> and a <span className="text-foreground">specific moment</span> worth designing for.
      </motion.p>

      <motion.p
        className="text-lg md:text-xl text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        How might we help <span className="text-foreground font-medium">neighbors who don't know each other</span> feel <span className="text-foreground font-medium">safe enough to ask for help</span> when the <span className="text-foreground font-medium">power goes out</span>?
      </motion.p>
    </section>
  );
};

export default CircleChallenge;
