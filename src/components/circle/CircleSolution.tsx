import { motion, type Easing, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ImageLightbox from "@/components/ImageLightbox";
import AnimatedTitle from "@/components/AnimatedTitle";
import HoverCaptionImage from "@/components/HoverCaptionImage";
import solutionOverview from "@/assets/circle-solution-overview.png";
import solutionTexture from "@/assets/circle-solution-texture.png";
import solutionLifestyle from "@/assets/circle-solution-lifestyle.png";

import impactImage from "@/assets/circle-solution-impact.png";
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
        <span className="text-sm text-muted-foreground mb-6 block">
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
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          <HoverCaptionImage
            src={solutionOverview}
            alt="Circle Status app and smart device — device status, community map, and check-in flow"
            title="One Connected System"
            body="The device pairs with the app to turn outage detection into instant notifications, easy check-ins, and community support."
          />
          <div className="grid grid-cols-1 md:grid-cols-[932fr_581fr] gap-3 md:gap-4">
            <HoverCaptionImage
              src={solutionTexture}
              alt="Smart Outage Lamp — close-up of the soft-serrated texture"
              title="Soft-Serrated Texture for Safe Handling"
              body="It increases friction, making it easier to grip, unplug, and carry."
              dark
            />
            <HoverCaptionImage
              src={solutionLifestyle}
              alt="Smart Outage Lamp — everyday night light on a bedroom nightstand"
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
        <span className="text-sm text-muted-foreground mb-6 block">impact</span>
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
        <ImageLightbox src={impactImage} alt="IPD Trade Show - Team presenting Circle Status to attendees" className="w-full rounded-lg" />
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
