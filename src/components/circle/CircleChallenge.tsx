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
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Designing for Darkness: Keeping Communities Connected When Infrastructure Fails
        </h2>
      </motion.div>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <p className="text-lg text-foreground/90 leading-relaxed mb-4 font-medium">
          How might we help isolated communities stay connected and supported during power outages?
        </p>
        <p className="text-base text-foreground/70 leading-relaxed">
          Without relying on expensive infrastructure or vulnerable mobile networks, we set out to bridge the gap between neighbors when they need each other most.
        </p>
      </motion.div>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
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
