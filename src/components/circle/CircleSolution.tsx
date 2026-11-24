import { motion, type Easing, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedTitle from "@/components/AnimatedTitle";
import HoverCaptionImage from "@/components/HoverCaptionImage";
import solutionOverview from "@/assets/circle-solution-overview.webp";
import solutionTexture from "@/assets/circle-solution-texture.webp";
import solutionLifestyle from "@/assets/circle-solution-lifestyle.webp";

import LaunchCollage from "./LaunchCollage";
const easeOut: Easing = [0.0, 0.0, 0.2, 1];
const CircleSolution = () => {
  return <section id="solution" className="pt-16">
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
        <span className="inline-block mb-4 rounded-md bg-foreground/[0.05] px-2.5 py-1 text-sm font-medium leading-5 text-muted-foreground lowercase">
          solution
        </span>
      </motion.div>

      {/* Solution gallery: bento layout — wide overview on top, two product shots below */}
      <motion.div className="mb-14" initial={{
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
      ease: easeOut,
      delay: 0.1
    }}>
        <div className="grid grid-cols-1 gap-2 md:gap-2.5">
          <HoverCaptionImage
            src={solutionOverview}
            alt="The Circle Status app on two phones (device status and the community map) beside a hand holding the lamp"
            title="One Connected System"
            body="The device pairs with the app to turn outage detection into instant notifications, easy check-ins, and community support."
          />
          <div className="grid grid-cols-1 md:grid-cols-[1204fr_814fr] gap-2 md:gap-2.5">
            <HoverCaptionImage
              src={solutionTexture}
              alt="Two Smart Outage Lamps glowing, showing the soft-serrated edge"
              title="Soft-Serrated Texture for Safe Handling"
              body="It increases friction, making it easier to grip, unplug, and carry."
              dark
            />
            <HoverCaptionImage
              src={solutionLifestyle}
              alt="Smart Outage Lamp plugged in by a bedside table at night"
              title="Everyday Light with Battery Backup"
              body="Works as a simple night lamp every day, but can automatically switch to battery power."
              dark
            />
          </div>
        </div>
      </motion.div>

      {/* Impact */}
      <motion.div className="mb-8" initial={{
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
      ease: easeOut,
      delay: 0.4
    }}>
        <span className="inline-block mb-4 rounded-md bg-foreground/[0.05] px-2.5 py-1 text-sm font-medium leading-5 text-muted-foreground lowercase">impact</span>
        <AnimatedTitle text="Showcased at the Ross IPD Trade Show" className="text-2xl font-bold mb-6 text-foreground" />
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 mb-8 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-semibold leading-none mb-2 text-foreground">
              <AnimatedNumber value={264} />
            </p>
            <p className="text-sm text-muted-foreground">
              Units sold in 3 days
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-semibold leading-none mb-2 text-foreground">
              $<AnimatedNumber value={1055736} />
            </p>
            <p className="text-sm text-muted-foreground">
              Trade show currency
            </p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-semibold leading-none mb-2 text-foreground">
              <AnimatedNumber value={1} />
              st
            </p>
            <p className="text-sm text-muted-foreground">
              Place out of 6 teams in class
            </p>
          </div>
        </div>
        <LaunchCollage />
      </motion.div>
    </section>;
};

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

const AnimatedNumber = ({ value, duration = 1.6 }: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest).toLocaleString()
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, value, duration, motionValue]);

  return <span ref={ref}>{display}</span>;
};

export default CircleSolution;
