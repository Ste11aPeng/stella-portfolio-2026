import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import iterationImage from "@/assets/philo-iteration.png";
import impactImage from "@/assets/philo-impact.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloTesting = () => {
  return (
    <section id="testing" className="pt-24">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">iteration</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
          Iterating with the Team
        </h2>
      </motion.div>
      
      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        After delivering the first version, I facilitated a review session with developers to walk through the library and gather their feedback. Together, we identified areas that could be improved for implementation efficiency and clarity.
      </motion.p>
      
      {/* Iteration Image */}
      <div className="mb-12">
        <ImageLightbox
          src={iterationImage}
          alt="Iterating with the Team - V1 Library through Dev Review, Feedback, Design Review, to Refined V2"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
      
      {/* Impact Image */}
      <div className="mb-8">
        <ImageLightbox
          src={impactImage}
          alt="Outcomes Across Dev, Design, and Product - Benefits for Developers, Designers, and Users"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default PhiloTesting;
