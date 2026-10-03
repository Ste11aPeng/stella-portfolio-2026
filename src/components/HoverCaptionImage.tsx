import ImageLightbox from "@/components/ImageLightbox";

interface HoverCaptionImageProps {
  src: string;
  alt: string;
  title: string;
  body: string;
}

// Product/process shot with a hover-reveal caption: progressive bottom blur
// (blur strength itself animates from 0, so the effect starts the instant the
// cursor enters), then the caption text fades in on top of it.
const HoverCaptionImage = ({ src, alt, title, body }: HoverCaptionImageProps) => (
  <div className="group relative overflow-hidden rounded-lg">
    <ImageLightbox src={src} alt={alt} className="w-full h-auto rounded-lg" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5" aria-hidden="true">
      <div
        className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-[2px] transition-[backdrop-filter,-webkit-backdrop-filter] duration-500 ease-out"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
        }}
      />
      <div
        className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-[6px] transition-[backdrop-filter,-webkit-backdrop-filter] duration-500 ease-out"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 25%, black 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 25%, black 70%)",
        }}
      />
      <div
        className="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-[14px] transition-[backdrop-filter,-webkit-backdrop-filter] duration-500 ease-out"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 55%, black 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 55%, black 90%)",
        }}
      />
      {/* Darkening scrim so caption text stays legible over light-background images too */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 100%)" }}
      />
    </div>
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-6 opacity-0 group-hover:opacity-100 text-white"
      style={{ transition: "opacity 700ms cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      <h4 className="text-xs md:text-sm font-semibold mb-1">{title}</h4>
      <p className="text-[11px] md:text-xs text-white/80 leading-relaxed">{body}</p>
    </div>
  </div>
);

export default HoverCaptionImage;
