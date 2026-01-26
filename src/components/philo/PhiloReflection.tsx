import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import reflectionImage from "@/assets/philo-reflection.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const PhiloReflection = () => {
  return (
    <section id="reflection" className="pt-24 pb-24">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="text-sm text-muted-foreground mb-3 block">reflection</span>
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
          What I Learned
        </h2>
      </motion.div>
      
      <motion.p
        className="text-base mb-6 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        To be honest, building a fully customized design system for a startup wasn't easy, especially when our founder had a big vision, and the dev team was simultaneously shipping for both iOS and Android under tight timelines. There were moments I asked myself, "Do we really need a design system right now?" It felt like a lot: aligning tokens, naming variants, documenting every state, all while the product was evolving fast.
      </motion.p>
      
      <motion.p
        className="text-base mb-10 max-w-3xl text-foreground/80 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        But then new UI/UX projects started spinning up, and I saw other designers on the team using the system in Figma, speaking the same visual language. Our mockups looked consistent. The devs didn't have to guess what a button state meant. And that's when I knew, the hustle was worth it. We didn't just build components. We built shared understanding.
      </motion.p>
      
      {/* Reflection Image */}
      <div className="mb-8">
        <ImageLightbox
          src={reflectionImage}
          alt="Normal people vs Designers - The design system journey reflection"
          className="w-full rounded-lg shadow-sm"
        />
      </div>
    </section>
  );
};

export default PhiloReflection;
