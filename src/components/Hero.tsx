import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profileImage from "@/assets/profile.webp";

// Two lines, with a forced break after "designer".
// Line 1: "Stella is a designer who builds"
// Line 2: "across design, engineering, and product."
const lines = [
  {
    // words on the first visual line
    parts: [
      { text: "Stella", accent: false },
      { text: "is", accent: false },
      { text: "a", accent: false },
      { text: "designer", accent: true },
      { text: "who", accent: false },
      { text: "builds", accent: false },
      { text: "across", accent: false },
    ],
  },
  {
    parts: [
      { text: "design,", accent: false },
      { text: "tech", accent: false },
      { text: "&", accent: false },
      { text: "things", accent: false },
      { text: "in", accent: false },
      { text: "between.", accent: false },
    ],
  },
];

// Flatten the words so each has a global index for ref tracking.
type WordItem = { text: string; accent: boolean };
const flatWords: WordItem[] = (() => {
  const all: WordItem[] = [];
  for (const line of lines) for (const p of line.parts) all.push(p);
  return all;
})();
const accentIdx = flatWords.findIndex((w) => w.accent);

// Map 2D pixel distance from "designer" center to a progressive blur + opacity.
// Words directly below designer (one line-height, ~38px) get only a slight blur,
// while far words fade/blur more. Overall kept light.
const blurFor = (dist: number) =>
  Math.min(0.6 + dist * 0.0105, 2.6).toFixed(2);
const opacityFor = (dist: number) =>
  Math.max(0.82 - dist * 0.001, 0.4).toFixed(2);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [dists, setDists] = useState<number[]>(() => flatWords.map((w, i) => (w.accent ? 0 : Math.abs(i - accentIdx))));
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const navigate = useNavigate();

  // Measure actual rendered positions and compute 2D distance from "designer".
  useLayoutEffect(() => {
    const accentEl = wordRefs.current[accentIdx];
    if (!accentEl) return;
    const accentRect = accentEl.getBoundingClientRect();
    const ac = {
      x: accentRect.left + accentRect.width / 2,
      y: accentRect.top + accentRect.height / 2,
    };
    const measured = flatWords.map((w, i) => {
      const el = wordRefs.current[i];
      if (!el || w.accent) return 0;
      const r = el.getBoundingClientRect();
      const c = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      const dx = c.x - ac.x;
      const dy = c.y - ac.y;
      return Math.sqrt(dx * dx + dy * dy);
    });
    setDists(measured);
  }, []);




  return (
    <section className="px-8 py-16 lg:px-24 md:px-[32px] md:py-[64px] max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        <motion.div
          className="flex-shrink-0 cursor-pointer relative"
          style={{ width: "120px", height: "120px" }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03, rotate: 0.8 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate("/about")}
        >
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={profileImage}
              alt="Profile"
              width={291}
              height={291}
              className="w-full h-full object-cover"
            />
            {/* Gradient blur overlay - stays aligned with image bottom */}
            <img
              src={profileImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ease-out"
                style={{
                  opacity: isHovered ? 1 : 0,
                  filter: "blur(10px)",
                  transform: "scale(1.06)",
                  maskImage: "linear-gradient(to top, black 0%, black 28%, rgba(0, 0, 0, 0.55) 40%, transparent 68%)",
                  WebkitMaskImage: "linear-gradient(to top, black 0%, black 28%, rgba(0, 0, 0, 0.55) 40%, transparent 68%)",
                }}
            />
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className="absolute bottom-2 left-0 right-0 flex items-center justify-center font-['New_Spirit'] text-[16px] text-white/90 select-none"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  about me
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex flex-col">
          <motion.p
            className="group/title max-w-3xl pt-0 text-[1.5rem] leading-[1.85rem] md:text-[2rem] md:leading-[2.4rem]"
            style={{
              color: "#161616",
              fontFamily: "'Exposure', 'New Spirit', serif",
              fontWeight: 650,
              letterSpacing: "-0.07em",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {lines.map((line, li) => {
              const offset = lines
                .slice(0, li)
                .reduce((sum, l) => sum + l.parts.length, 0);
              return (
                <span key={li} className="block">
                  {line.parts.map((p, pi) => {
                    const gi = offset + pi;
                    const word = flatWords[gi];
                    const dist = dists[gi];
                    return (
                      <motion.span
                        key={`${li}-${pi}`}
                        ref={(el) => (wordRefs.current[gi] = el)}
                        variants={wordVariants}
                        className="inline-block transition-[filter,opacity] duration-700 ease-out group-hover/title:[filter:blur(var(--hb))] group-hover/title:opacity-[var(--ho)] mr-[8px]"
                        style={
                          word.accent
                            ? undefined
                            : {
                                ["--hb" as string]: `${blurFor(dist)}px`,
                                ["--ho" as string]: opacityFor(dist),
                              }
                        }
                      >
                        {word.text}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </motion.p>

          <motion.div
            className="flex items-center gap-1 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <span className="text-[13px] font-sans text-muted-foreground">
              Currently designing{" "}
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors duration-300 hover:text-[#FF0050]"
              >
                @TikTok
              </a>{" "}
              and pursuing a{" "}
              <a
                href="https://mhcid.washington.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors duration-300 hover:text-[#4B2E83]"
              >
                Master of HCI + Design @UW
              </a>
              .
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
