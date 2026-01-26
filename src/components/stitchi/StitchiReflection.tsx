import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import reflectionImage from "@/assets/stitchi-reflection.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const StitchiReflection = () => {
  return (
    <section id="reflection" className="pt-24 pb-24">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.h2 
        className="text-2xl font-bold mb-8 tracking-tight"
        style={{ fontFamily: 'Manrope', color: '#161616' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        Reflection
      </motion.h2>
      
      <motion.p 
        className="text-base mb-6 max-w-3xl text-foreground/80 leading-relaxed"
        style={{ fontFamily: 'Manrope' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        At first, I thought this project would be a small-scope UI clean-up, polishing the filter panel. But as I dug deeper, it became clear that the interaction pattern itself was misaligned with how our task-driven users worked. That realization led to introducing the Apply button and rethinking the flow. It also reminded me how even small details, when intentional, can carry meaningful UX value.
      </motion.p>
      
      <motion.p 
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        style={{ fontFamily: 'Manrope' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        I thought working with a technical PM and SWE would be hard, that we spoke different languages. But after learning how Algolia and the back-end worked, our conversations flowed more easily. I realized it's better to just ask when I don't know something — people are happy to help when you're engaged.
      </motion.p>
      
      {/* Reflection Image */}
      <div className="mb-8">
        <ImageLightbox
          src={reflectionImage}
          alt="Walkthrough video got good feedback - team collaboration"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default StitchiReflection;
