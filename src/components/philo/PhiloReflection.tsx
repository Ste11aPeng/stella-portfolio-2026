import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import AnimatedTitle from "@/components/AnimatedTitle";
import reflectionImage from "@/assets/philo-reflection.png";
const easeOut: Easing = [0.0, 0.0, 0.2, 1];
const PhiloReflection = () => {
  return <section id="reflection" className="pt-16 pb-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true,
      margin: "-50px"
    }} transition={{
      duration: 0.5,
      ease: easeOut
    }}>
        <span className="text-sm text-muted-foreground mb-6 block">reflection</span>
        <AnimatedTitle text="What I Learned" className="text-2xl font-bold mb-6 text-foreground" />
      </motion.div>
      
      
      
      
      
      {/* Reflection Image */}
      <div className="mb-8">
        <ImageLightbox src={reflectionImage} alt="Normal people vs Designers - The design system journey reflection" className="w-full rounded-lg shadow-sm" />
      </div>
    </section>;
};
export default PhiloReflection;