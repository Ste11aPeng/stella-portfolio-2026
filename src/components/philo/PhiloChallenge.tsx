import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import AnimatedTitle from "@/components/AnimatedTitle";
import HoverCaptionImage from "@/components/HoverCaptionImage";
import philoChallengeBoard from "@/assets/philo-challenge-board.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloChallenge = () => {
  return (
    <section id="challenge" className="pt-5">
      <Separator className="mb-16 bg-border/60" />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-6 block">challenge</span>
        <AnimatedTitle text="how to design a system for features that didn't exist yet." className="text-2xl font-bold mb-6 text-foreground" />
        <motion.p
          className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
        >
          The startup had an prototype pieced together from an open-source UI kit and mockups made by a non-designer. There was no rules whatsoever, while the dev team was shipping at the same time.
        </motion.p>
      </motion.div>

      <div className="mb-10">
        <HoverCaptionImage
          src={philoChallengeBoard}
          alt="The MVP file, before the system - unnamed Figma frames with no shared components"
          title="A Common Pain Point in Startup Design Files"
          body="Unnamed frames and no shared components — nothing consistent to build from."
        />
      </div>
    </section>
  );
};

export default PhiloChallenge;
