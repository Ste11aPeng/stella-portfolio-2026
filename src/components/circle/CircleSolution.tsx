import { motion, type Easing, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import ProjectCarousel from "@/components/ProjectCarousel";
import solution1Image from "@/assets/circle-solution-1-new.png";
import solution2Carousel1 from "@/assets/circle-solution-2-carousel-1.png";
import solution2Carousel2 from "@/assets/circle-solution-2-carousel-2.png";
import solution2Carousel3 from "@/assets/circle-solution-2-carousel-3.png";

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
        <span className="text-sm text-muted-foreground block mb-2">
          solution
        </span>
      </motion.div>

      {/* Smart Outage Lamp */}
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
        <h3 className="text-2xl font-bold mb-4 text-foreground">
          01 — The Lamp That Speaks When You Can't
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          A soft-textured lamp with battery backup that works as daily lighting and triggers the app's detection flow when power fails.
        </p>
        <div className="group relative overflow-hidden rounded-lg">
          <ImageLightbox src={solution1Image} alt="Smart Outage Lamp - Product renders showing soft-serrated texture and night light with battery backup" className="w-full rounded-lg" />
          {/* Hover overlay: progressive bottom blur — animates backdrop-filter directly so it triggers instantly on hover */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 transition-[backdrop-filter,-webkit-backdrop-filter] duration-500 ease-out"
              style={{
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
              }}
              data-blur-layer="1"
            />
            <div
              className="absolute inset-0 transition-[backdrop-filter,-webkit-backdrop-filter] duration-500 ease-out"
              style={{
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
                maskImage: "linear-gradient(to bottom, transparent 25%, black 70%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 25%, black 70%)",
              }}
              data-blur-layer="2"
            />
            <div
              className="absolute inset-0 transition-[backdrop-filter,-webkit-backdrop-filter] duration-500 ease-out"
              style={{
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
                maskImage: "linear-gradient(to bottom, transparent 55%, black 90%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 55%, black 90%)",
              }}
              data-blur-layer="3"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-6 opacity-0 group-hover:opacity-100"
            style={{ transition: "opacity 700ms cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 text-white">
              <div>
                <h4 className="text-xs md:text-sm font-semibold mb-1">Soft-Serrated Texture for Safe Handling</h4>
                <p className="text-[11px] md:text-xs text-white/80 leading-relaxed">It increases friction, making it easier to grip, unplug, and carry.</p>
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-semibold mb-1">Everyday Night Light with Battery Backup</h4>
                <p className="text-[11px] md:text-xs text-white/80 leading-relaxed">Works as a simple night lamp every day.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Prototype */}
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
      delay: 0.2
    }}>
        <h3 className="text-2xl font-bold mb-4 text-foreground">
          02 — The App That Turns Signals Into Support
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          The companion app converts outage detection into instant notifications, easy check-ins, and community support.
        </p>
        <SolutionCarousel />
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
        <span className="text-sm text-muted-foreground block mb-2">impact</span>
        <p className="text-base text-foreground/80 leading-relaxed mb-8">
          Showcased at the Ross School of Business IPD Trade Show with 200+ attendees.
        </p>
        <div className="flex flex-wrap gap-x-16 gap-y-8 mb-8">
          <div>
            <p className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-2 text-foreground">
              <AnimatedNumber value={264} />
            </p>
            <p className="text-sm text-muted-foreground">
              Units sold in 3 days
            </p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold tracking-tight leading-none mb-2 text-foreground">
              $1M+
            </p>
            <p className="text-sm text-muted-foreground">
              Trade show currency
            </p>
          </div>
        </div>
        <ImageLightbox src={impactImage} alt="IPD Trade Show - Team presenting Circle Status to attendees" className="w-full rounded-lg" />
      </motion.div>
    </section>;
};

const carouselSlides = [
  { src: solution2Carousel1, alt: "Circle Status App - Smart device, community map, and easy check-in" },
  { src: solution2Carousel2, alt: "Circle Status App - Main tabs and key user flows" },
  { src: solution2Carousel3, alt: "Circle Status - Connected In The Dark website" },
];

const SolutionCarousel = () => {
  return (
    <ProjectCarousel>
      {carouselSlides.map((slide, i) => (
        <div className="relative" key={i}>
          <ImageLightbox
            src={slide.src}
            alt={slide.alt}
            className="w-full rounded-lg"
            disableMotion
          />

          {i === 2 && (
            <Button
              asChild
              size="sm"
              className="absolute top-4 left-4 bg-background/90 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 backdrop-blur-sm z-10"
            >
              <a
                href="https://circlestatus.webflow.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Visit Live Website
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          )}
        </div>
      ))}
    </ProjectCarousel>
  );
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
