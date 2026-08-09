import { motion, type Easing } from "framer-motion";
import ImageLightbox from "@/components/ImageLightbox";
import research1Image from "@/assets/circle-research-1.png";

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
        <span className="text-sm text-muted-foreground mb-3 block">
          research
        </span>
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          Research & User Modeling
        </h2>
        <p className="text-base text-foreground/80 leading-relaxed mb-10">
          We ran 50+ household interviews and surveyed 200 Midwest residents, then used CART analysis to find what actually predicts help-seeking behavior during outages.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <ImageLightbox
          src={research1Image}
          alt="Research findings: interviews, affinity diagram, empathy map, and CART feature importance"
          className="w-full rounded-lg"
        />
      </motion.div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-6 text-foreground">
          What we found
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {[
            {
              title: "People don't ask for help",
              body:
                "During outages, most households stayed silent even when they needed assistance. Asking felt like admitting vulnerability.",
            },
            {
              title: "Confidence beats preparedness",
              body:
                "Having flashlights didn't predict whether someone would seek help. Self-confidence and trust in neighbors did.",
            },
            {
              title: "Caregivers are in the dark too",
              body:
                "Family members outside the home had no way to know if elderly or vulnerable relatives were okay.",
            },
          ].map((insight) => (
            <div key={insight.title} className="border-t border-border/60 pt-5">
              <h4 className="text-base font-semibold mb-2 text-foreground">
                {insight.title}
              </h4>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {insight.body}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CircleResearch;
