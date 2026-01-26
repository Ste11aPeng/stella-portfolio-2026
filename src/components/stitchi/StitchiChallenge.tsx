import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import challengeUIImage from "@/assets/stitchi-challenge-ui.png";
import challengeInteractionImage from "@/assets/stitchi-challenge-interaction.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const StitchiChallenge = () => {
  return (
    <section id="challenge" className="pt-24">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.h2 
        className="text-2xl font-bold mb-8 tracking-tight"
        style={{ fontFamily: 'Manrope', color: '#161616' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        Challenge
      </motion.h2>
      
      <motion.h3 
        className="text-lg font-semibold mb-5 text-foreground/90"
        style={{ fontFamily: 'Manrope' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        Why Discovery Was Broken
      </motion.h3>
      
      <motion.p 
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        style={{ fontFamily: 'Manrope' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        Filters became cluttered and unscalable as suppliers grew. As we onboarded more suppliers, filters became cluttered and inconsistent: overlapping categories and vendor-specific labels turned a UI built for 20 options into chaos at 200. The search bar offered little guidance or tolerance, so users had to guess queries and often got zero results even when matches existed.
      </motion.p>
      
      {/* Challenge UI Image */}
      <div className="mb-10">
        <ImageLightbox
          src={challengeUIImage}
          alt="Current UI Problem - Filtering logic not scalable as supplier base grows"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
      
      {/* Challenge Interaction Image */}
      <div className="mb-8">
        <ImageLightbox
          src={challengeInteractionImage}
          alt="Current Interaction Problem - Every click triggers a jarring reload, no filter summary"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default StitchiChallenge;
