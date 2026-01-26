import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import researchImage from "@/assets/philo-research.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloResearch = () => {
  return (
    <section id="research" className="pt-24">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">research</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
          Audited the MVP & Talked to the Dev Team
        </h2>
      </motion.div>
      
      <motion.p
        className="text-base mb-6 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        I audited ~15 screens and mapped all UI elements into a component inventory. In parallel, we were also working with a design engineer. The first thing I did was put him on a task to help us simplify the scattered system that existed.
      </motion.p>
      
      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.25 }}
      >
        Working closely with a front-end developer, we created a shared catalog of all existing components, ordered by how out of sync they were, and how critical they were to repair. This helped us align on what needed to be rebuilt, reused, or removed.
      </motion.p>
      
      {/* Research Image */}
      <div className="mb-8">
        <ImageLightbox
          src={researchImage}
          alt="Current MVP audit - Component Inventory, Brand Gap Callout, and Engineering Needs"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default PhiloResearch;
