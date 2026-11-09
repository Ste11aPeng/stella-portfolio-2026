import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import LazyVideo from "@/components/LazyVideo";
import { Button } from "@/components/ui/button";
import visual2 from "@/assets/visual-2.png";
import visual3 from "@/assets/visual-3.png";
import visual6 from "@/assets/visual-6.png";
import visual7 from "@/assets/visual-7.png";
import telltoolWordmark from "@/assets/visual-telltool-wordmark.webp";
import telltoolStationery from "@/assets/telltool-3.png";
import pointCloud from "@/assets/visual-point-cloud.webp";
import forgottenSenseGlove from "@/assets/fg-6.png";
import lottieAnimation from "@/assets/visual-lottie.json";

// A masonry of pieces, each captioned with its category and year,
// after jaden.kim/play. Print-like pieces sit inside a grey panel.

type Media =
  | { kind: "video"; src: string; poster: string; eager?: boolean; /** crop in, for recordings with wide margins */ zoomed?: boolean }
  | { kind: "image"; src: string; alt: string }
  | { kind: "lottie"; data: object; speed?: number };

type Piece = {
  /** not shown; names the piece for screen readers and keys */
  title: string;
  category: string;
  /** year (or season and year), shown after the category when set */
  when?: string;
  /** width / height of the media box */
  aspect: number;
  media: Media;
  /** sits inside a grey panel, like a printed piece on a table */
  framed?: boolean;
  /** live demo, offered on hover */
  demo?: string;
};

const DEMO_ASPECT = 619 / 375.938;

const PIECES: Piece[] = [
  {
    title: "Trip Itinerary",
    when: "Fall 2026",
    category: "Travel Card",
    aspect: 4 / 3,
    media: { kind: "video", src: "/videos/trip-itinerary.mp4", poster: "/videos/posters/trip-itinerary.jpg", eager: true },
  },
  {
    title: "Flower Subscription",
    when: "Fall 2026",
    category: "Subscription Plan",
    aspect: 1,
    media: { kind: "video", src: "/videos/flower-subscription.mp4", poster: "/videos/posters/flower-subscription.jpg", eager: true },
  },
  {
    title: "Voice Iterations",
    when: "Fall 2026",
    category: "VUI Prototype",
    aspect: 4 / 3,
    media: { kind: "video", src: "/videos/voice-iterations.mp4", poster: "/videos/posters/voice-iterations.jpg", eager: true },
  },
  {
    title: "Accelerated Insights",
    when: "Fall 2026",
    category: "Concept Product",
    aspect: 4 / 5,
    media: { kind: "video", src: "/videos/accelerated-insights.mp4", poster: "/videos/posters/accelerated-insights.jpg", eager: true },
  },
  {
    title: "Laws of UX Accordion",
    when: "Spring 2026",
    category: "Interaction",
    aspect: 1,
    media: { kind: "video", src: "/videos/accordion.mp4", poster: "/videos/posters/accordion.jpg", eager: true },
    demo: "https://ste11apeng.github.io/accordion-expand-ui/",
  },
  {
    title: "TikTok Text Mode",
    when: "Summer 2026",
    category: "Text Mode",
    aspect: 4 / 5,
    media: { kind: "video", src: "/videos/textmode_opt.mp4", poster: "/videos/posters/textmode_opt.jpg", eager: true },
    demo: "https://ste11apeng.github.io/redesigning-tiktok-text-mode/",
  },
  {
    title: "Product Designer",
    when: "Fall 2025",
    category: "Motion",
    aspect: 4 / 3,
    media: { kind: "lottie", data: lottieAnimation, speed: 0.6 },
  },
  {
    title: "Humane Society",
    when: "Fall 2023",
    category: "Shelter Branding Concept",
    aspect: 1920 / 1091,
    media: { kind: "image", src: visual6, alt: "Humane Society shelter branding design" },
  },
  {
    title: "Knob",
    when: "Spring 2026",
    category: "Interaction",
    aspect: 1,
    media: { kind: "video", src: "/videos/visual-video-2.mp4", poster: "/videos/posters/visual-video-2.jpg", eager: true },
    demo: "https://ste11apeng.github.io/knob-ui-component/",
  },
  {
    title: "Coral",
    when: "Spring 2023",
    category: "3D Modeling",
    aspect: 1320 / 912,
    media: { kind: "image", src: visual2, alt: "Coral sculpture photo collection" },
    framed: true,
  },
  {
    title: "Forgotten Sense Glove",
    when: "Fall 2024",
    category: "Physical Computing",
    aspect: 809 / 558,
    media: { kind: "image", src: forgottenSenseGlove, alt: "Forgotten Sense: a scent-detection glove with an NFC reader, Arduino, Flora, LED and vibration motor" },
  },
  {
    title: "Humane Society App",
    when: "Fall 2023",
    category: "Shelter App Concept",
    aspect: 1920 / 1091,
    media: { kind: "image", src: visual7, alt: "Humane Society shelter app design" },
  },
  {
    title: "Tell Tool Wordmark",
    when: "Spring 2025",
    category: "Logo Design",
    aspect: 809 / 558,
    media: { kind: "image", src: telltoolWordmark, alt: "Tell Tool wordmark variations" },
  },
  {
    title: "Character Studies",
    when: "Fall 2022",
    category: "Illustration",
    aspect: 1320 / 912,
    media: { kind: "image", src: visual3, alt: "Character design iterations and sketches" },
    framed: true,
  },
  {
    title: "Stella at Sea",
    when: "Summer 2026",
    category: "AI Video",
    aspect: 1,
    media: { kind: "video", src: "/videos/seedance_opt.mp4", poster: "/videos/posters/seedance_opt.jpg" },
  },
  {
    title: "Point Cloud Installation",
    when: "Spring 2025",
    category: "TouchDesigner Installation",
    aspect: 809 / 558,
    media: { kind: "image", src: pointCloud, alt: "TouchDesigner point-cloud network and its projection in a darkened room, with visitors watching" },
  },
  {
    title: "Tell Tool Stationery",
    when: "Spring 2025",
    category: "Brand Identity",
    aspect: 809 / 558,
    media: { kind: "image", src: telltoolStationery, alt: "Tell Tool stationery: letterhead, brochure and business cards" },
  },
];

// Columns follow the width the wall actually has (it sits beside a sidebar on
// the homepage and full-width on /visual): two across when there's room.
const columnsFor = (w: number) => (w >= 420 ? 2 : 1);
const useColumnCount = (ref: React.RefObject<HTMLElement>) => {
  const [n, setN] = useState(() => (window.innerWidth >= 768 ? 2 : 1));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setN(columnsFor(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return n;
};

// Fill columns in order, always adding to the shortest one, so the grid reads
// left to right like rows while the heights stay balanced.
const toColumns = (pieces: Piece[], n: number) => {
  const cols: { piece: Piece; index: number }[][] = Array.from({ length: n }, () => []);
  const heights = new Array(n).fill(0);
  pieces.forEach((piece, index) => {
    const c = heights.indexOf(Math.min(...heights));
    cols[c].push({ piece, index });
    heights[c] += 1 / piece.aspect + (piece.framed ? 0.25 : 0) + 0.1; // media + caption
  });
  return cols;
};

const PieceMedia = ({ media, title }: { media: Media; title: string }) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const speed = media.kind === "lottie" ? media.speed : undefined;
  useEffect(() => {
    if (speed) lottieRef.current?.setSpeed(speed);
  }, [speed]);

  if (media.kind === "video")
    return (
      <LazyVideo
        src={media.src}
        poster={media.poster}
        eager={media.eager}
        className={`w-full h-full object-cover pointer-events-none select-none ${media.zoomed ? "scale-[1.4]" : ""}`}
      />
    );
  if (media.kind === "image")
    return <img src={media.src} alt={media.alt} loading="lazy" className="w-full h-full object-cover" />;
  return (
    <Lottie
      animationData={media.data}
      loop
      lottieRef={lottieRef}
      className="w-full h-full"
      rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      aria-label={title}
    />
  );
};

const PieceCard = ({ piece, index }: { piece: Piece; index: number }) => {
  const [hover, setHover] = useState(false);
  const media = (
    <div className="relative w-full overflow-hidden rounded-[2px]" style={{ aspectRatio: piece.aspect }}>
      <PieceMedia media={piece.media} title={piece.title} />
    </div>
  );
  return (
    <motion.div
      role="figure"
      aria-label={piece.title}
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.08 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`relative w-full rounded-[2px] ${piece.framed ? "bg-[#ececea] p-6 md:p-10" : "bg-[#efefed]"}`}>
        {media}
        {piece.demo && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : -4 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 left-4"
          >
            <Button
              asChild
              size="sm"
              className="bg-background/90 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 backdrop-blur-sm"
            >
              <a href={piece.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                try it urself
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          </motion.div>
        )}
      </div>
      <p className="text-xs leading-5 text-[#a1a1a1] lowercase">
        {piece.category}
        {piece.when && <> &nbsp;·&nbsp; {piece.when}</>}
      </p>
    </motion.div>
  );
};

const VisualGrid = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const n = useColumnCount(ref);
  const columns = useMemo(() => toColumns(PIECES, n), [n]);
  return (
    <div ref={ref} className={`flex items-start gap-6 ${className}`}>
      {columns.map((col, c) => (
        <div key={c} className="flex-1 min-w-0 flex flex-col gap-8">
          {col.map(({ piece, index }) => (
            <PieceCard key={piece.title} piece={piece} index={index} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default VisualGrid;
