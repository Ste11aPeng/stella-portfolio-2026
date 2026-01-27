import { motion, type Easing } from "framer-motion";
import ImageLightbox from "@/components/ImageLightbox";
import challengeImage from "@/assets/circle-challenge.png";

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
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          When the Lights Go Out...
        </h2>
      </motion.div>

      <motion.p
        className="text-base text-foreground/80 leading-relaxed mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        How might we help isolated communities stay connected and supported during power outages, without relying on expensive infrastructure or vulnerable mobile networks?
      </motion.p>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        <ImageLightbox
          src={challengeImage}
          alt="Circle Status Challenge - Power Outages as a systemic problem"
          className="w-full rounded-lg"
        />
      </motion.div>
    </section>
  );
};

export default CircleChallenge;
