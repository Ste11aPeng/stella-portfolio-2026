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
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          How might we help isolated communities stay connected and supported during power outages?
        </h2>
      </motion.div>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <ImageLightbox
          src={challengeImage}
          alt="Power Outages Is Never A Local Problem - intersecting public health, infrastructure reliability, and climate resilience"
          className="w-full rounded-lg"
        />
      </motion.div>
    </section>
  );
};

export default CircleChallenge;
