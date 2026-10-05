import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import AnimatedTitle from "@/components/AnimatedTitle";
import IframeEmbed from "@/components/philo/IframeEmbed";
import solutionBg from "@/assets/sia-solution-bg.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaSolution = () => {
  return (
    <section id="solution" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-6 block">solution</span>
        <AnimatedTitle text="A Workspace That Adapts to You" className="text-2xl font-bold mb-6 text-foreground" />
      </motion.div>

      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        A responsive UI that dynamically reconfigures its layout based on user intent, seamlessly transitioning from immersive chat to side-by-side file inspection.
      </motion.p>

      <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "1536 / 864" }}>
        <img
          src={solutionBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <IframeEmbed
          src="/asksia/layout-modes.html"
          title="AskSia looping through Chat Focus, Chat + File List, and Reading + Chat layouts"
          className="absolute inset-0 !rounded-none !border-0"
        />
      </div>
    </section>
  );
};

export default AsksiaSolution;
