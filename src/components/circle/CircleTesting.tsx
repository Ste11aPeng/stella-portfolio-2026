import { motion, type Easing } from "framer-motion";
import ImageLightbox from "@/components/ImageLightbox";
import ProjectCarousel from "@/components/ProjectCarousel";
import iterationCarousel1 from "@/assets/circle-iteration-carousel-1.png";
import iterationCarousel2 from "@/assets/circle-iteration-carousel-2.png";
import iterationCarousel3 from "@/assets/circle-iteration-carousel-3.png";
import iterationCarousel4 from "@/assets/circle-iteration-carousel-4.png";
import iterationCarousel5 from "@/assets/circle-iteration-carousel-5.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const iterationSlides = [
  {
    src: iterationCarousel1,
    alt: "Personas - Luddite Robert and Young Jason",
    title: "Personas",
    caption:
      "Low-tech users are the primary risk group. Personas surfaced a cluster of elderly, low-digital-confidence users who wouldn't open an app, which is why the lamp needed to work without any app interaction at all.",
  },
  {
    src: iterationCarousel2,
    alt: "Expert review presentation at University of Michigan",
    title: "Expert review",
    caption:
      "2 rounds of design reviews pushed us to make safety feel like furniture, not a device. Accessibility experts flagged that flashing lights could trigger anxiety, so we moved to a slow pulse.",
  },
  {
    src: iterationCarousel3,
    alt: "100+ ideas refined to 9 concept cards and form-factor sketches",
    title: "100+ ideas, 9 refined concept cards",
    caption:
      'Concept validation with 50 people confirmed the direction: "Notify Light" scored highest on both desirability and trust.',
  },
  {
    src: iterationCarousel4,
    alt: "Hardware prototyping with Arduino and ESP32 across Normal, Outage, Restore, and Final Proto states",
    title: "Hardware",
    caption: "Arduino + ESP32 prototype detecting power loss across Normal, Outage, Restore, and Final Proto states.",
  },
];

const IterationCarousel = () => {
  return (
    <ProjectCarousel alignArrowsToImage steps={iterationSlides.map((s) => s.title)}>
      {iterationSlides.map((slide, i) => (
        <div className="space-y-5" key={i}>
          <ImageLightbox
            src={slide.src}
            alt={slide.alt}
            className="w-full rounded-lg"
            disableMotion
            disableHoverEffect
          />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {slide.title}
            </h3>
            <p className="text-base text-foreground/80 leading-relaxed">
              {slide.caption}
            </p>
          </div>
        </div>
      ))}
    </ProjectCarousel>
  );
};

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
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          From Feedback to Functional Prototype
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <IterationCarousel />
      </motion.div>
    </section>
  );
};

export default CircleTesting;
