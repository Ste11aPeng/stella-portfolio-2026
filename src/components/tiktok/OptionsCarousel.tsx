import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type Transition } from "framer-motion";
import { Reveal, Tag } from "./parts";
import { SlideActive } from "./PhoneLoop";

export interface Option {
  name: string;
  /** the still, when there is no demo */
  img?: string;
  alt: string;
  /** dissolve the screen's cut-off lower edge into the panel */
  fade?: boolean;
  chosen?: boolean;
  /** a wider picture (two phones side by side) gets more of the slide */
  wide?: boolean;
  /** a live demo to play in place of the picture */
  demo?: ReactNode;
  pros: string[];
  cons: string[];
}

const GREEN = "#22a65a";
const GREY = "#b7b7c0";
const ease = [0.22, 1, 0.36, 1] as const;
// leaving a slide snaps everything back at once, so the next visit replays it
const RESET: Transition = { duration: 0 };

// One pro or con. When its slide becomes the one in view, the line plays in
// order: the words fade up, a pro's box fills green and its tick draws itself,
// a con's dash draws inside its grey outline. Each item starts a beat after
// the one before it.
const Point = ({ text, pro, step, on }: { text: string; pro: boolean; step: number; on: boolean }) => {
  const at = 0.2 + step * 0.22;
  const state = on ? "on" : "off";
  return (
    <motion.li
      className="grid grid-cols-[18px_1fr] gap-2.5 text-sm leading-relaxed text-foreground/80"
      initial="off"
      animate={state}
      variants={{
        off: { opacity: 0, y: 6, transition: RESET },
        on: { opacity: 1, y: 0, transition: { duration: 0.45, ease, delay: at } },
      }}
    >
      <motion.span
        className="mt-[3px] w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex items-center justify-center"
        variants={
          pro
            ? {
                off: { backgroundColor: "rgba(34, 166, 90, 0)", borderColor: GREY, scale: 0.85, transition: RESET },
                on: {
                  backgroundColor: GREEN,
                  borderColor: GREEN,
                  scale: 1,
                  transition: { duration: 0.3, ease, delay: at + 0.12 },
                },
              }
            : {
                off: { borderColor: GREY, scale: 0.85, transition: RESET },
                on: { borderColor: GREY, scale: 1, transition: { duration: 0.3, ease, delay: at + 0.12 } },
              }
        }
      >
        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d={pro ? "M5 12.5l4.5 4.5L19 7.5" : "M6 12h12"}
            stroke={pro ? "#fff" : GREY}
            variants={{
              off: { pathLength: 0, opacity: 0, transition: RESET },
              on: {
                pathLength: 1,
                opacity: 1,
                transition: { pathLength: { duration: 0.32, ease: "easeOut", delay: at + 0.32 }, opacity: { duration: 0.01, delay: at + 0.32 } },
              },
            }}
          />
        </svg>
      </motion.span>
      {text}
    </motion.li>
  );
};

const Chevron = ({ left }: { left?: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={left ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
  </svg>
);

// The options weighed for one decision, as the AskSia write-up shows its
// iterations: one panel per option, the next peeking in from the right, slides
// further from the middle fading back as the row scrolls, arrows and dots below.
const OptionsCarousel = ({ options, label }: { options: Option[]; label: string }) => {
  const track = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const ticking = useRef(false);
  // the points play only once the row is actually on screen
  const inView = useInView(track, { amount: 0.4 });
  const reduce = useReducedMotion();

  const update = useCallback(() => {
    ticking.current = false;
    const t = track.current;
    if (!t) return;
    const mid = t.scrollLeft + t.clientWidth / 2;
    const els = slides.current.filter(Boolean) as HTMLElement[];
    const step = els.length > 1 ? els[1].offsetLeft - els[0].offsetLeft : t.clientWidth;
    let best = 0;
    let bestD = Infinity;
    els.forEach((s, i) => {
      const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
      const f = Math.min(Math.max(d / step - 0.08, 0) / 0.92, 1);
      s.style.opacity = (1 - f * 0.55).toFixed(3);
    });
    setCurrent(best);
  }, []);

  useEffect(() => {
    update();
    const onResize = () => requestAnimationFrame(update);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [update]);

  const onScroll = () => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(update);
  };

  const go = (i: number) => {
    const t = track.current;
    const s = slides.current[Math.max(0, Math.min(options.length - 1, i))];
    if (!t || !s) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollTo({ left: s.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <Reveal className="mb-10">
      <div
        ref={track}
        onScroll={onScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
        }}
        aria-roledescription="carousel"
        aria-label={label}
        className="relative flex gap-4 overflow-x-auto snap-x snap-mandatory pr-[5%] md:pr-[9%] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none"
      >
        {options.map((o, i) => (
          <article
            key={o.name}
            ref={(el) => (slides.current[i] = el)}
            onClick={() => i !== current && go(i)}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${options.length}: ${o.name}`}
            aria-hidden={i !== current}
            className="relative snap-start shrink-0 basis-[90%] md:basis-[88%] rounded-2xl bg-[#F5F6F7] px-5 py-7 md:px-10 md:py-9 flex flex-col md:flex-row items-center gap-6 md:gap-10"
          >
            {/* pinned to the slide's top-right corner */}
            <Tag large accent={o.chosen} className="absolute top-4 right-4 md:top-5 md:right-5">
              {o.chosen ? "chosen" : "explored"}
            </Tag>
            {o.demo ? (
              // a cropped demo (fade) takes the same box the stills had
              <div className={`w-full shrink-0 ${o.fade ? "h-[300px] md:h-[380px] md:w-[46%]" : "h-[440px] md:h-[520px] md:w-[48%]"}`}>
                {/* a demo only plays once its slide is the one in view */}
                <SlideActive.Provider value={i === current}>{o.demo}</SlideActive.Provider>
              </div>
            ) : (
              <div className={`h-[300px] w-full flex items-start justify-center shrink-0 ${o.wide ? "md:h-[440px] md:w-[60%]" : "md:h-[380px] md:w-[46%]"}`}>
                <img
                  src={o.img}
                  alt={o.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                  style={
                    o.fade
                      ? {
                          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                        }
                      : undefined
                  }
                />
              </div>
            )}
            <div className="w-full">
              <motion.h4
                className="text-base font-semibold text-foreground mb-4"
                initial="off"
                animate={reduce || (inView && i === current) ? "on" : "off"}
                variants={{
                  off: { opacity: 0, y: 6, transition: RESET },
                  on: { opacity: 1, y: 0, transition: { duration: 0.45, ease, delay: 0.05 } },
                }}
              >
                {o.name}
              </motion.h4>
              <ul className="grid gap-2.5">
                {[...o.pros.map((t) => ({ t, pro: true })), ...o.cons.map((t) => ({ t, pro: false }))].map((pt, k) => (
                  <Point key={pt.t} text={pt.t} pro={pt.pro} step={k} on={!!reduce || (inView && i === current)} />
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          type="button"
          aria-label="Previous option"
          onClick={() => go(current - 1)}
          disabled={current === 0}
          className="w-9 h-9 rounded-[10px] bg-[#F5F6F7] text-foreground flex items-center justify-center transition-opacity disabled:opacity-35"
        >
          <Chevron left />
        </button>
        <div className="flex gap-1.5">
          {options.map((o, i) => (
            <button
              key={o.name}
              type="button"
              aria-label={`Go to ${o.name}`}
              aria-current={i === current}
              onClick={() => go(i)}
              className={`h-1 rounded-full transition-all duration-200 ${i === current ? "w-[26px] bg-foreground/80" : "w-[18px] bg-foreground/15"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next option"
          onClick={() => go(current + 1)}
          disabled={current === options.length - 1}
          className="w-9 h-9 rounded-[10px] bg-[#F5F6F7] text-foreground flex items-center justify-center transition-opacity disabled:opacity-35"
        >
          <Chevron />
        </button>
      </div>
    </Reveal>
  );
};

export default OptionsCarousel;
