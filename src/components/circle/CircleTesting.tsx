import { motion, type Easing } from "framer-motion";
import AnimatedTitle from "@/components/AnimatedTitle";
import HoverCaptionImage from "@/components/HoverCaptionImage";
import iterationReview from "@/assets/circle-iteration-review.png";
import iterationPersonas from "@/assets/circle-iteration-personas.png";
import iterationBranding from "@/assets/circle-iteration-branding.png";
import iterationHardware from "@/assets/circle-iteration-hardware.png";

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
        <span className="text-sm text-muted-foreground mb-6 block">
          iteration
        </span>
        <AnimatedTitle text="From Feedback to Functional Prototype" className="text-2xl font-bold mb-6 text-foreground" />
      </motion.div>

      {/* Iteration gallery: bento layout — wide shots top and bottom, a matched pair in the middle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          <HoverCaptionImage
            src={iterationReview}
            alt="Expert review presentation at the University of Michigan"
            title="Expert Review"
            body="2 rounds of design reviews pushed us to make safety feel like furniture, not a device. Accessibility experts flagged that flashing lights could trigger anxiety, so we moved to a slow pulse."
          />
          <div className="grid grid-cols-1 md:grid-cols-[932fr_581fr] gap-3 md:gap-4">
            <HoverCaptionImage
              src={iterationPersonas}
              alt="Personas — Luddite Robert and Young Jason"
              title="Personas"
              body="Low-tech users are the primary risk group. Personas surfaced a cluster of elderly, low-digital-confidence users who wouldn't open an app, which is why the lamp needed to work without any app interaction at all."
            />
            <HoverCaptionImage
              src={iterationBranding}
              alt="Branding moodboard and brand voice spectrum"
              title="Branding"
              body="We aligned on a shared brand voice that feels warm, calm, and trustworthy, then translated it into UI/UX that feels approachable for both elderly users and their caregivers."
            />
          </div>
          <HoverCaptionImage
            src={iterationHardware}
            alt="Hardware prototyping with Arduino and ESP32 across Normal, Outage, Restore, and Final Proto states"
            title="Hardware"
            body="Arduino + ESP32 prototype detecting power loss across Normal, Outage, Restore, and Final Proto states."
          />
        </div>
      </motion.div>
    </section>
  );
};

export default CircleTesting;
