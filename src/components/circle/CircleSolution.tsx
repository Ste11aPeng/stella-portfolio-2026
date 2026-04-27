import { motion, type Easing, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
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
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          A Lamp That Speaks When You Can't
        </h2>
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
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          01 — The Lamp
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          A soft-textured lamp with battery backup that works as daily lighting and triggers the app's detection flow when power fails.
        </p>
        <div className="group relative overflow-hidden rounded-lg">
          <ImageLightbox src={solution1Image} alt="Smart Outage Lamp - Product renders showing soft-serrated texture and night light with battery backup" className="w-full rounded-lg" />
          {/* Hover overlay: progressive bottom blur (top weakest, bottom strongest) */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 backdrop-blur-[2px]"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
              }}
            />
            <div
              className="absolute inset-0 backdrop-blur-[6px]"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 25%, black 70%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 25%, black 70%)",
              }}
            />
            <div
              className="absolute inset-0 backdrop-blur-[14px]"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 55%, black 90%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 55%, black 90%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(0 0% 0% / 0) 0%, hsl(0 0% 0% / 0.25) 45%, hsl(0 0% 0% / 0.65) 100%)",
              }}
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-6 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
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
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          02 — The App
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
        <h3 className="text-2xl font-bold mb-3 text-foreground">$1M+ in Trade Show Currency</h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">Showcased at the Ross School of Business IPD Trade Show with 200+ attendees</p>
        <div className="bg-muted/30 rounded-lg p-5 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">264 Units</p>
              <p className="text-sm text-muted-foreground">Sold in 3 days</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$1M+</p>
              <p className="text-sm text-muted-foreground">Trade Currency</p>
            </div>
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="relative group/carousel">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, duration: 35, align: "start" }}
        className="w-full"
      >
        <CarouselContent>
          {carouselSlides.map((slide, i) => (
            <CarouselItem key={i}>
              <div className="relative">
                <ImageLightbox src={slide.src} alt={slide.alt} className="w-full rounded-lg" />
                {i === 2 && (
                  <Button asChild size="sm" className="absolute top-4 left-4 bg-background/90 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 backdrop-blur-sm z-10">
                    <a href="https://circlestatus.webflow.io/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      Visit Live Website
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-3 hidden sm:flex h-9 w-9 border-0 bg-background/40 text-foreground/70 backdrop-blur-md shadow-none opacity-0 group-hover/carousel:opacity-100 hover:bg-background/70 hover:text-foreground transition-all duration-300"
        />
        <CarouselNext
          className="right-3 hidden sm:flex h-9 w-9 border-0 bg-background/40 text-foreground/70 backdrop-blur-md shadow-none opacity-0 group-hover/carousel:opacity-100 hover:bg-background/70 hover:text-foreground transition-all duration-300"
        />
      </Carousel>

      {/* Indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-1 rounded-full transition-all duration-500 ease-out ${
              i === current ? "w-5 bg-foreground/80" : "w-1 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CircleSolution;
