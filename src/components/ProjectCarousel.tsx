import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ProjectCarouselProps {
  /** Array of slide content (already wrapped in your image / layout). */
  children: ReactNode[];
  /**
   * When true, arrows align to the vertical center of the first <img> inside
   * each slide instead of the slide's full height (useful when slides have
   * captions below the image).
   */
  alignArrowsToImage?: boolean;
}

/**
 * Shared carousel used across project case studies.
 * Visual rules: subtle backdrop-blur arrows that fade in on hover,
 * thin animated indicators below, smooth embla scroll.
 */
const ProjectCarousel = ({ children, alignArrowsToImage = false }: ProjectCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [arrowTop, setArrowTop] = useState<number | null>(null);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Measure the first <img> in the active slide and place arrows at its vertical center.
  useLayoutEffect(() => {
    if (!alignArrowsToImage) return;
    const node = containerRef.current;
    if (!node) return;

    const measure = () => {
      const slides = node.querySelectorAll<HTMLElement>("[data-carousel-item]");
      const active = slides[current];
      if (!active) return;
      const img = active.querySelector<HTMLImageElement>("img");
      if (!img) return;
      const containerRect = node.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      setArrowTop(imgRect.top - containerRect.top + imgRect.height / 2);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    node.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
      ro.observe(img);
    });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [alignArrowsToImage, current, count]);

  const arrowStyle =
    alignArrowsToImage && arrowTop != null
      ? { top: `${arrowTop}px`, transform: "translateY(-50%)" }
      : undefined;

  return (
    <div className="relative group/carousel" ref={containerRef}>
      <Carousel
        setApi={setApi}
        opts={{ loop: true, duration: 35, align: "start" }}
        className="w-full"
      >
        <CarouselContent>
          {children.map((child, i) => (
            <CarouselItem key={i} data-carousel-item>
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          style={arrowStyle}
          className="left-3 hidden sm:flex h-9 w-9 border-0 bg-background/40 text-foreground/70 backdrop-blur-md shadow-none opacity-0 group-hover/carousel:opacity-100 hover:bg-background/70 hover:text-foreground transition-all duration-300"
        />
        <CarouselNext
          style={arrowStyle}
          className="right-3 hidden sm:flex h-9 w-9 border-0 bg-background/40 text-foreground/70 backdrop-blur-md shadow-none opacity-0 group-hover/carousel:opacity-100 hover:bg-background/70 hover:text-foreground transition-all duration-300"
        />
      </Carousel>

      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-1 rounded-full transition-all duration-500 ease-out ${
              i === current
                ? "w-5 bg-foreground/80"
                : "w-1 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
