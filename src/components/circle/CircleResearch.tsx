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
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          Research & User Modeling
        </h2>
      </motion.div>

      {/* UX Research */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          UX Research — Interviews & Synthesis
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          We conducted 50+ semi-structured interviews to understand how Midwestern households experience and cope with outages. Using Affinity Diagramming and Empathy Mapping, we synthesized key insights about user behaviors and needs.
        </p>
      </motion.div>

      {/* EDA and CART */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Exploratory Data Analysis (EDA)
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">
          To complement our qualitative interviews, we conducted a survey with 200 respondents, capturing household preparedness, digital access, health reliance, caregiving burden, and willingness to seek or offer help during outages. After cleaning and standardizing the data, I performed exploratory data analysis to identify behavioral patterns and validate early hypotheses.
        </p>
        
        <h3 className="text-lg font-semibold mb-3 text-foreground mt-8">
          Classification and Regression Trees (CART)
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          Using CART, we modeled key predictors of neighbor-support behavior. Results showed that confidence, family reliance, and trust in neighbors were the most significant predictors, more so than demographics like age or household size.
        </p>
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
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Stakeholder Analysis & Persona
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">
          <span className="font-medium">Design Impact:</span> Mapping key stakeholders showed that effective resilience relies on clear information flow and mutual aid. This insight led us to simplify caregiver notifications, design community features for real support, and balance privacy with data visibility for institutional partners.
        </p>
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
