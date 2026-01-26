import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import researchPt1Image from "@/assets/stitchi-research-pt1.png";
import researchPt2Image from "@/assets/stitchi-research-pt2.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const StitchiResearch = () => {
  return (
    <section id="research" className="pt-24">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block" style={{ fontFamily: 'Manrope' }}>research</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight" style={{ fontFamily: 'Manrope', color: '#161616' }}>
          Backing Decisions with Real Signals
        </h2>
      </motion.div>
      
      <motion.p
        className="text-base mb-6 max-w-3xl text-foreground/80 leading-relaxed"
        style={{ fontFamily: 'Manrope' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        To ground the design in real behavior, I combined three research methods:
      </motion.p>
      
      <motion.ul
        className="list-none mb-10 max-w-3xl space-y-4 px-[8px] py-[8px]"
        style={{ fontFamily: 'Manrope' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.25 }}
      >
        <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
          <strong className="text-foreground/90">Benchmarking:</strong> Studied platforms like Redbubble, Amazon, Threadless to understand scalable filtering patterns.
        </li>
        <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
          <strong className="text-foreground/90">Technical exploration:</strong> Worked with our dev intern to assess Algolia's capabilities for smarter, more forgiving search.
        </li>
        <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
          <strong className="text-foreground/90">Usability testing:</strong> Observed 3 B2B users in task-based scenarios to uncover interaction pain points.
        </li>
      </motion.ul>
      
      {/* Research Part 1 Image */}
      <div className="mb-10">
        <ImageLightbox
          src={researchPt1Image}
          alt="Usability Test - User feedback about filtering difficulties"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
      
      {/* Research Part 2 Image */}
      <div className="mb-8">
        <ImageLightbox
          src={researchPt2Image}
          alt="What I Found - Key insights from research"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default StitchiResearch;
