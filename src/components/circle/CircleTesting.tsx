import { motion, type Easing } from "framer-motion";
import ImageLightbox from "@/components/ImageLightbox";
import iteration1Image from "@/assets/circle-iteration-1.png";
import iteration2Image from "@/assets/circle-iteration-2.png";
import iteration3Image from "@/assets/circle-iteration-3.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const CircleTesting = () => {
  return (
    <section id="testing" className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <span className="text-sm text-muted-foreground block mb-2">
          testing & iteration
        </span>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          Design Iterations
        </h2>
      </motion.div>

      {/* Iteration 1 */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Iteration 1 — Design Critic
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          During the design review, industry and accessibility experts stressed that the product should feel as safe as it looks. We used affinity diagramming to synthesize feedback and prioritize improvements.
        </p>
        <ImageLightbox
          src={iteration1Image}
          alt="Iteration 1 - Design review presentation and affinity mapping at University of Michigan"
          className="w-full rounded-lg"
        />
      </motion.div>

      {/* Iteration 2 */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Iteration 2 — Concept Cards & Branding
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">
          Sent out a survey to 50 people, asking about their purchase interest from 1 to 10. We found that the "Notify Light" concept scored the highest.
        </p>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">
          <span className="font-medium">Aligning Brand Direction:</span> Once the system structure was clear, I led a branding and form workshop to unify the product's visual and emotional tone. The results gave us a clear, shared brand voice.
        </p>
        <ImageLightbox
          src={iteration2Image}
          alt="Iteration 2 - 100+ ideas refined to 9 concept cards, team branding sync, and sketches"
          className="w-full rounded-lg"
        />
      </motion.div>

      {/* Iteration 3 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Iteration 3 — Mechanism Prototyping
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">
          Detect power loss and pulse a light to Network Notification
        </p>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">
          Using an Arduino, photoresistor, and LED, I prototyped a light-based outage alert that detected darkness and responded instantly with gradual illumination.
        </p>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          I built it on a Feather HUZZAH32 (ESP32) with LiPo backup. The LED signals outages locally, while Wi-Fi sends real-time alerts to phones. Debouncing and a simple state machine prevent false alarms.
        </p>
        <ImageLightbox
          src={iteration3Image}
          alt="Iteration 3 - Hardware prototyping with Arduino showing Normal, Outage, and Restore states"
          className="w-full rounded-lg"
        />
      </motion.div>
    </section>
  );
};

export default CircleTesting;
