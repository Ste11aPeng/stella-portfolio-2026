import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profileImage from "@/assets/profile.webp";

// Build a flat word list so we can compute each word's distance from "designer".
const accentParts = [
  { text: "Stella is a ", accent: false },
  { text: "designer", accent: true },
  { text: " who builds across design, engineering, and product.", accent: false },
];

type WordItem = { text: string; accent: boolean; dist: number };

const buildWords = (): WordItem[] => {
  const words: WordItem[] = [];
  for (const part of accentParts) {
    for (const w of part.text.split(" ").filter(Boolean)) {
      words.push({ text: w, accent: part.accent, dist: 0 });
    }
  }
  return words;
};

const initialWords = buildWords();

// Map 2D pixel distance from "designer" center to a progressive blur + opacity.
// Visually close words stay almost sharp, far words fade/blur more — but light.
const blurFor = (dist: number) =>
  Math.min(0.6 + dist * 0.012, 2.6).toFixed(2);
const opacityFor = (dist: number) =>
  Math.max(0.82 - dist * 0.0018, 0.4).toFixed(2);

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
  const [words, setWords] = useState<WordItem[]>(initialWords);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const navigate = useNavigate();

  // Measure actual rendered positions and compute 2D distance from "designer".
  useLayoutEffect(() => {
    const accentIdx = initialWords.findIndex((w) => w.accent);
    const accentEl = wordRefs.current[accentIdx];
    if (!accentEl) return;
    const accentRect = accentEl.getBoundingClientRect();
    const ac = {
      x: accentRect.left + accentRect.width / 2,
      y: accentRect.top + accentRect.height / 2,
    };
    const measured = initialWords.map((w, i) => {
      const el = wordRefs.current[i];
      if (!el || w.accent) return { ...w, dist: 0 };
      const r = el.getBoundingClientRect();
      const c = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      const dx = c.x - ac.x;
      const dy = c.y - ac.y;
      return { ...w, dist: Math.sqrt(dx * dx + dy * dy) };
    });
    setWords(measured);
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
            className="group/title max-w-3xl pt-0 flex flex-wrap text-[1.5rem] leading-[1.85rem] md:text-[2rem] md:leading-[2.4rem]"
            style={{
              color: "#161616",
              fontFamily: "'Exposure', 'New Spirit', serif",
              fontWeight: 650,
              letterSpacing: "-0.05em",
              gap: "0 8px",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {flatWords.map((word, wi) => (
              <motion.span
                key={wi}
                variants={wordVariants}
                className="inline-block transition-[filter,opacity] duration-700 ease-out group-hover/title:[filter:blur(var(--hb))] group-hover/title:opacity-[var(--ho)]"
                style={
                  word.accent
                    ? undefined
                    : {
                        ["--hb" as string]: `${blurFor(word.dist)}px`,
                        ["--ho" as string]: opacityFor(word.dist),
                      }
                }
              >
                {word.text}
              </motion.span>
            ))}
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
                className="text-muted-foreground transition-opacity hover:opacity-100 hover:text-foreground"
              >
                @TikTok
              </a>{" "}
              and pursuing a{" "}
              <a
                href="https://mhcid.washington.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-opacity hover:opacity-100 hover:text-foreground"
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
