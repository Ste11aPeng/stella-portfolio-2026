import { useRef } from "react";
import { useInView } from "framer-motion";
import banner from "@/assets/circle-launch/launch-banner.webp";
import booth from "@/assets/circle-launch/launch-booth.webp";
import team from "@/assets/circle-launch/launch-team.webp";
import visitors from "@/assets/circle-launch/launch-visitors.webp";

// The launch at the IPD trade show, as loose photos scattered on the page (no
// panel behind them), the way the Research section shows its process shots. They drop in one
// after another; the one under the pointer straightens, lifts and comes to the
// front. Positions are in percent of the panel, so it scales as one piece.
const PHOTOS = [
  { src: banner, alt: "The Integrated Product Development product launch banner at the trade show", left: 8, top: 17, w: 27, rot: -5, ratio: 622 / 411 },
  { src: booth, alt: "The Circle Status booth: the lamp, the app on a laptop and a phone, and the $39.99 price card", left: 29, top: 40, w: 29, rot: 3, ratio: 632 / 411 },
  { src: team, alt: "The team at the booth in front of the Connected in the Dark posters", left: 50, top: 8, w: 26, rot: -2, ratio: 557 / 394 },
  { src: visitors, alt: "Visitors trying Circle Status at the booth", left: 64, top: 47.5, w: 28, rot: 5, ratio: 697 / 394 },
];
// just tall enough for the scattered group, with a little room above and below
const PANEL = 2.75;

const LaunchCollage = () => {
  const box = useRef<HTMLDivElement>(null);
  const shown = useInView(box, { once: true, margin: "-60px" });
  return (
    <div
      ref={box}
      className="relative w-full"
      style={{ aspectRatio: `${PANEL}` }}
    >
      {PHOTOS.map((p, i) => (
        <div
          key={p.alt}
          className="group absolute hover:!z-10"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.w}%`,
            zIndex: i + 1,
            // drop in, one after another (plain CSS: no end-of-animation flicker)
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(24px)",
            transition: `opacity 0.6s ease-out ${0.1 + i * 0.12}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + i * 0.12}s`,
          }}
        >
          <img
            src={p.src}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto rounded-md shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03]"
            style={{ aspectRatio: `${p.ratio}`, rotate: `${p.rot}deg` }}
          />
        </div>
      ))}
    </div>
  );
};

export default LaunchCollage;
