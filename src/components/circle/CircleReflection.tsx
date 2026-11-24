import { motion, type Easing } from "framer-motion";
import AnimatedTitle from "@/components/AnimatedTitle";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const CircleReflection = () => {
  return (
    <section id="reflection" className="pt-16 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <span className="inline-block mb-4 rounded-md bg-foreground/[0.05] px-2.5 py-1 text-sm font-medium leading-5 text-muted-foreground lowercase">
          reflection
        </span>
        <AnimatedTitle text="What 264 lamps taught me" className="text-2xl font-bold mb-6 text-foreground" />
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <p className="text-base max-w-3xl text-muted-foreground leading-relaxed">
          We had fifteen weeks to go from interviews to a lamp people would actually pay for. The interviews
          told us why people didn't check on each other during outages, and the outage data (EDA, then a CART
          model) told us who and when. We needed both to land on a lamp. Then 264 people bought one in three
          days at the trade show, which is the most honest feedback I've ever gotten on a design. Nobody buys a
          lamp to be polite.
        </p>
      </motion.div>
    </section>
  );
};

export default CircleReflection;
