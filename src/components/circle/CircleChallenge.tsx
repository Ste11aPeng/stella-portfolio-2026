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
        className="text-base text-foreground/80 mb-6 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.05 }}
      >
        The brief: Help communities cope with power outages.
      </motion.p>

      <motion.p
        className="text-lg md:text-xl text-foreground leading-relaxed font-medium"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        What we actually discovered: People know what to do during an outage. What stops them from asking for help is not lack of resources, it's low confidence and distrust of neighbors. The real problem isn't darkness. It's silence.
      </motion.p>
    </section>
  );
};

export default CircleChallenge;
