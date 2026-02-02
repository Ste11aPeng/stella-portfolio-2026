import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import challengeUIImage from "@/assets/stitchi-challenge-ui.png";
import challengeInteractionImage from "@/assets/stitchi-challenge-interaction.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const StitchiChallenge = () => {
  return (
    <section id="challenge" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">challenge</span>
        <h2 className="text-xl font-medium mb-10 tracking-tight text-foreground leading-relaxed max-w-2xl">
          How can Stitchi.co redesign their discovery experience to help B2B buyers find products faster as supplier catalogs scale?
        </h2>
      </motion.div>
      
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
