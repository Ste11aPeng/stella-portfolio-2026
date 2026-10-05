import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import AnimatedTitle from "@/components/AnimatedTitle";
import painChat from "@/assets/sia-pain-chat.png";
import painFileList from "@/assets/sia-pain-filelist.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaChallenge = () => {
  return (
    <section id="challenge" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-6 block">challenge</span>
        <AnimatedTitle
          className="text-xl font-medium mb-10 text-foreground leading-relaxed max-w-2xl"
          segments={[
            { text: "How might we optimize " },
            { text: "screen real estate", className: "text-foreground/60" },
            { text: " to help students focus on AI insights rather than " },
            { text: "navigating a cluttered UI", className: "text-foreground/60" },
            { text: "?" },
          ]}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <span className="text-sm text-muted-foreground mb-6 block">constraints</span>
        <p className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed">
          Speed: 2-week Sprint / Team: Lean (4 pax) / Tech: Library-based / Goal: Growth-ready
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}
        className="grid grid-cols-1 gap-3 md:grid-cols-[932fr_581fr] md:gap-4"
      >
        <ImageLightbox
          src={painChat}
          alt="AskSia - Cramped AI chat viewport"
          className="w-full rounded-lg border border-border/30"
        />
        <ImageLightbox
          src={painFileList}
          alt="AskSia - Non-collapsible file list"
          className="w-full rounded-lg border border-border/30"
        />
      </motion.div>
    </section>
  );
};

export default AsksiaChallenge;
