import { useEffect, useState, type ReactNode } from "react";
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
}

/**
 * Shared carousel used across project case studies.
 * Visual rules: subtle backdrop-blur arrows that fade in on hover,
 * thin animated indicators below, smooth embla scroll.
 */
const ProjectCarousel = ({ children }: ProjectCarouselProps) => {
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
          {children.map((child, i) => (
            <CarouselItem key={i}>{child}</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-3 hidden sm:flex h-9 w-9 border-0 bg-background/40 text-foreground/70 backdrop-blur-md shadow-none opacity-0 group-hover/carousel:opacity-100 hover:bg-background/70 hover:text-foreground transition-all duration-300"
        />
        <CarouselNext
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
