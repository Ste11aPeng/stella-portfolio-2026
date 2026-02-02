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
          iteration
        </span>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          From Feedback to Functional Prototype
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
        <h3 className="text-xl font-semibold mb-3 text-foreground">
          Expert Review: Safety Meets Approachability
        </h3>
        <ul className="list-none mb-6 space-y-3">
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Industry and accessibility experts stressed safety should feel intuitive
          </li>
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Affinity diagramming to synthesize and prioritize feedback
          </li>
        </ul>
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
        <h3 className="text-xl font-semibold mb-3 text-foreground">
          Concept Validation: 50-Person Survey
        </h3>
        <ul className="list-none mb-6 space-y-3">
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Surveyed 50 people on purchase interest; "Notify Light" scored highest
          </li>
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Led branding workshop to unify visual and emotional tone
          </li>
        </ul>
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
        <h3 className="text-xl font-semibold mb-3 text-foreground">
          Hardware Prototype: Arduino + ESP32
        </h3>
        <ul className="list-none mb-6 space-y-3">
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Detects power loss and pulses a light for network notification
          </li>
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Built on Feather HUZZAH32 (ESP32) with LiPo backup
          </li>
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Debouncing and state machine prevent false alarms
          </li>
        </ul>
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
