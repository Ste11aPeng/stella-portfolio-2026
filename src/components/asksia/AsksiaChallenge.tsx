import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import challengeImage from "@/assets/sia-challenge.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaChallenge = () => {
  return (
    <section id="challenge" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">challenge</span>
        <h2 className="text-xl font-medium mb-10 tracking-tight text-foreground leading-relaxed max-w-2xl">
          How might we improve the AI chat experience so students can focus on learning without feeling overwhelmed by cluttered interfaces?
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <ImageLightbox
          src={challengeImage}
          alt="AskSia - Current design pain points"
          className="w-full rounded-lg shadow-sm"
        />
      </motion.div>
    </section>
  );
};

export default AsksiaChallenge;
