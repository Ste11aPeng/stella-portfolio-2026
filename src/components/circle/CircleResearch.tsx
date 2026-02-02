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
          Understanding How Communities Cope
        </h2>
        <p className="text-base text-foreground/70 leading-relaxed mb-8">
          Mixed-methods research to uncover behavioral patterns during outages.
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
        <ul className="list-none mb-6 space-y-3">
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            <strong className="text-foreground/90">Semi-structured interviews</strong> with 50+ households on outage experiences
          </li>
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            <strong className="text-foreground/90">Affinity Diagramming</strong> and <strong className="text-foreground/90">Empathy Mapping</strong> to synthesize insights
          </li>
        </ul>
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
        <ul className="list-none mb-6 space-y-3">
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Surveyed 200 respondents on preparedness, digital access, and willingness to help
          </li>
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            <strong className="text-foreground/90">CART analysis</strong> revealed confidence, family reliance, and neighbor trust as strongest predictors
          </li>
        </ul>
        
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
          Stakeholder Analysis & Personas
        </h3>
        <ul className="list-none mb-6 space-y-3">
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Simplified caregiver notification flows
          </li>
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Community features designed for actionable support
          </li>
          <li className="text-foreground/80 leading-relaxed pl-4 border-l-2 border-foreground/20">
            Privacy controls balanced with institutional data needs
          </li>
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
