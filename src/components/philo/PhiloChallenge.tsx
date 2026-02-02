import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import philoChallengeImage from "@/assets/philo-challenge.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloChallenge = () => {
  return (
    <section id="challenge" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">challenge</span>
        <h2 className="text-xl font-medium mb-10 tracking-tight text-foreground leading-relaxed max-w-2xl">
          How might we create a scalable design system that enables faster development while maintaining brand consistency?
        </h2>
      </motion.div>

      <ImageLightbox
        src={philoChallengeImage}
        alt="Why a UI library is the right next step - diagram showing MVP vs UI Library positioning"
        className="w-full rounded-lg mb-10"
      />
    </section>
  );
};

export default PhiloChallenge;
