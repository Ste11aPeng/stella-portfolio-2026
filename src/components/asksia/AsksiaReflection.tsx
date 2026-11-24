import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import AnimatedTitle from "@/components/AnimatedTitle";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const AsksiaReflection = () => {
  return (
    <section id="reflection" className="pt-16 pb-24">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="inline-block mb-4 rounded-md bg-foreground/[0.05] px-2.5 py-1 text-sm font-medium leading-5 text-muted-foreground lowercase">reflection</span>
        <AnimatedTitle text="What six months at an AI startup taught me" className="text-2xl font-bold mb-6 text-foreground" />
      </motion.div>

      <motion.p
        className="text-base mb-6 max-w-3xl text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        At an AI startup the ground moves every few weeks, and nobody hands you finished requirements. So I got in the habit of poking at every AI tool that shipped and borrowing the patterns that fit ours. The responsive dropdown came out of that. The less glamorous lesson came from writing every edge case down, from corrupted files to empty states, so engineers could build it without pinging me ten times a day. That doc is where the design held up.
      </motion.p>
    </section>
  );
};

export default AsksiaReflection;
