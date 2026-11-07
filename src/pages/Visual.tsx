import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import LazyVideo from "@/components/LazyVideo";
import { Button } from "@/components/ui/button";
import visual2 from "@/assets/visual-2.png";
import visual3 from "@/assets/visual-3.png";
import visual6 from "@/assets/visual-6.png";
import visual7 from "@/assets/visual-7.png";
import lottieAnimation from "@/assets/visual-lottie.json";

// A three-across masonry of pieces, each captioned with its category and year,
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
    title: "Flower Subscription",
    when: "Fall 2026",
    category: "Interaction",
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
    title: "Humane Society App",
    when: "Fall 2023",
    category: "Shelter App Concept",
    aspect: 1920 / 1091,
    media: { kind: "image", src: visual7, alt: "Humane Society shelter app design" },
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
];

// Three across from tablet width up; one column on phones.
const useColumnCount = () => {
  const get = () => (window.innerWidth >= 768 ? 3 : 1);
  const [n, setN] = useState(get);
  useEffect(() => {
    const on = () => setN(get());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
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
      <p className="text-xs leading-5 text-[#a1a1a1]">
        {piece.category}
        {piece.when && <> &nbsp;·&nbsp; {piece.when}</>}
      </p>
    </motion.div>
  );
};

const Visual = () => {
  const n = useColumnCount();
  const columns = useMemo(() => toColumns(PIECES, n), [n]);

  return (
    <>
      <Seo
        page="visual"
        path="/visual"
        description="Visual work by Stella Peng: motion design, 3D, editorial and generative experiments."
      />
      {/* this page sits on white: overriding the token here also whitens the
          header's blur gradient, so the two stay one colour */}
      <div className="min-h-screen bg-background relative z-10" style={{ "--background": "0 0% 100%" } as CSSProperties}>
        <Header />

        <section className="px-8 md:px-[32px] lg:px-24 pt-4 pb-24 max-w-[1440px] mx-auto">
          <div className="flex items-start gap-4">
            {columns.map((col, c) => (
              <div key={c} className="flex-1 min-w-0 flex flex-col gap-8">
                {col.map(({ piece, index }) => (
                  <PieceCard key={piece.title} piece={piece} index={index} />
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </>
  );
};

export default Visual;
