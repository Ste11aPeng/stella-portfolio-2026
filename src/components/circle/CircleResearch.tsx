import { motion, type Easing } from "framer-motion";
import ImageLightbox from "@/components/ImageLightbox";
import research1Image from "@/assets/circle-research-1.png";
import research2Image from "@/assets/circle-research-2.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const CircleResearch = () => {
  return (
    <section id="research" className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <span className="text-sm text-muted-foreground block mb-2">
          research
        </span>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Understanding How Communities Cope When Power Fails
        </h2>
        <p className="text-base text-foreground/70 leading-relaxed mb-8">
          Combining qualitative interviews with quantitative modeling to uncover the behavioral patterns that drive, or prevent, neighbor-to-neighbor support.
        </p>
      </motion.div>

      {/* UX Research */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          50+ Voices from the Midwest
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed">
          We conducted <span className="font-medium text-foreground">50+ semi-structured interviews</span> to understand how Midwestern households experience and cope with outages. Using <span className="font-medium text-foreground">Affinity Diagramming</span> and <span className="font-medium text-foreground">Empathy Mapping</span>, we synthesized key insights about user behaviors and unmet needs.
        </p>
      </motion.div>

      {/* EDA and CART */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          200 Survey Respondents + CART Modeling
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          To complement our qualitative findings, we surveyed <span className="font-medium text-foreground">200 respondents</span> on household preparedness, digital access, health reliance, and willingness to help neighbors. After cleaning and standardizing the data, I performed exploratory analysis to identify behavioral patterns.
        </p>
        
        <div className="bg-muted/30 rounded-lg p-5 mb-6">
          <h4 className="font-medium text-foreground mb-3">Key Finding: CART Analysis</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Using Classification and Regression Trees, we discovered that <span className="font-medium text-foreground">confidence, family reliance, and trust in neighbors</span> were the strongest predictors of support behavior—outweighing demographics like age or household size.
          </p>
        </div>
        
        <ImageLightbox
          src={research1Image}
          alt="Exploratory Data Analysis and CART - Feature importance and help-seeking behavior charts"
          className="w-full rounded-lg"
        />
      </motion.div>

      {/* Stakeholder Analysis & Persona */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Stakeholder Analysis & Persona Development
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">
          Effective resilience relies on <span className="font-medium text-foreground">clear information flow</span> and <span className="font-medium text-foreground">mutual aid</span>. This insight shaped three key design decisions:
        </p>
        <ul className="list-disc list-inside text-base text-foreground/80 leading-relaxed mb-6 space-y-1">
          <li>Simplified caregiver notification flows</li>
          <li>Community features designed for real, actionable support</li>
          <li>Privacy controls balanced with institutional data needs</li>
        </ul>
        <ImageLightbox
          src={research2Image}
          alt="Stakeholder analysis diagram and user personas - Luddite Robert and Young Jason"
          className="w-full rounded-lg"
        />
      </motion.div>
    </section>
  );
};

export default CircleResearch;
