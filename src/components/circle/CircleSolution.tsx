import { motion, type Easing } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import solution1Image from "@/assets/circle-solution-1.png";
import solution2Carousel1 from "@/assets/circle-solution-2-carousel-1.png";
import solution2Carousel2 from "@/assets/circle-solution-2-carousel-2.png";
import solution2Carousel3 from "@/assets/circle-solution-2-carousel-3.png";
import solution3Image from "@/assets/circle-solution-3.png";
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
          Circle Status: A Lamp That Speaks When You Can't
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
          Hardware Core: The Smart Outage Lamp
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          A soft-textured lamp with battery backup that works as daily lighting and triggers the app's detection flow when power fails.
        </p>
        <ImageLightbox src={solution1Image} alt="Smart Outage Lamp - Product renders showing soft-serrated texture and night light with battery backup" className="w-full rounded-lg" />
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
          Digital Experience: Turning Signals Into Support
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          The companion app converts outage detection into instant notifications, easy check-ins, and community support.
        </p>
        <SolutionCarousel />
      </motion.div>

      {/* Making Waves at IPD Trade Show */}
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
        <h3 className="text-xl font-semibold mb-4 text-foreground">Market Impact - $1M+ in Trade Show Currency</h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">Showcased at the Ross School of Business IPD Trade Show with 200+ attendees</p>
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
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
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
        <CarouselPrevious className="left-3 hidden sm:flex" />
        <CarouselNext className="right-3 hidden sm:flex" />
      </Carousel>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CircleSolution;
