import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import iterationImage from "@/assets/philo-iteration.png";
import impactImage from "@/assets/philo-impact.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloTesting = () => {
  return (
    <section id="testing" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">outcome</span>
        <h2 className="text-xl font-medium mb-10 tracking-tight text-foreground leading-relaxed max-w-2xl">
          Improved team efficiency and product consistency, enabling faster development cycles while delivering a cohesive user experience across the platform.
        </h2>
      </motion.div>
      
      {/* Iteration Image */}
      <div className="mb-12">
        <ImageLightbox
          src={iterationImage}
          alt="Iterating with the Team - V1 Library through Dev Review, Feedback, Design Review, to Refined V2"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
      
      {/* Impact Content */}
      <motion.ul
        className="list-none mb-10 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
          <strong className="text-foreground/90">For Developers</strong>: Quick onboarding with clear, ready-to-use components
        </li>
        <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
          <strong className="text-foreground/90">For Designers</strong>: Streamlined future design work with reusable patterns
        </li>
        <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
          <strong className="text-foreground/90">For Users</strong>: Consistent, cohesive experience across the platform
        </li>
      </motion.ul>
      
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
