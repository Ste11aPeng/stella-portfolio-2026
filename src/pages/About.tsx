import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

import polaroid from "@/assets/about/polaroid.png";
import coffee from "@/assets/about/coffee.png";
import stationery from "@/assets/about/stationery.png";
import homeDecor from "@/assets/about/home-decor.png";
import records from "@/assets/about/records.png";
import plant from "@/assets/about/plant.png";
import gaming from "@/assets/about/gaming.png";
import cats from "@/assets/about/cats.png";
import doodle from "@/assets/about/doodle.png";
import journaling from "@/assets/about/journaling.png";
import matcha from "@/assets/about/matcha.png";
import cleaning from "@/assets/about/cleaning.png";
import stellaWordmark from "@/assets/about/stella-wordmark.png";

// Palette from the Figma "A collection of curiosities" page.
const INK_MUTED = "#75766e";
const INK_STRONG = "#393b35";
const PERF = "#b6b7ad";
const MENU_INK = "#45463c";
const MENU_RULE = "#666759";
const SPECIMEN_INK = "#787a6b";

// Same blur-to-sharp entrance as the homepage project cards, for the menu
// cards. Waits until the cards are well into view before starting.
// `blur` is in the element's own units (the menu cards live in a ×K layer).
const MENU_START = 0.25;
const MENU_GAP = 0.7;
const blurIn = (delay: number, blur = 16) => ({
  initial: { opacity: 0, scale: 0.97, filter: `blur(${blur}px)` },
  whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.45 },
  transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const, delay },
});

// Homepage-style blur-to-sharp reveal. `gate` holds it back (e.g. until the
// section above has loaded); once open it still waits for scroll-in.
const Reveal = ({
  delay = 0,
  gate = true,
  opacity = 1,
  className,
  style,
  children,
}: {
  delay?: number;
  gate?: boolean;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const from = { opacity: 0, scale: 0.97, filter: "blur(16px)" };
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={from}
      animate={inView && gate ? { opacity, scale: 1, filter: "blur(0px)" } : from}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

// Perforated-paper divider: short dashes, wide gaps.
const Perforation = ({
  vertical = false,
  dash = 2,
  gap = 4,
  weight = 0.7,
  delay = 0,
  className = "",
}: {
  vertical?: boolean;
  dash?: number;
  gap?: number;
  weight?: number;
  delay?: number;
  className?: string;
}) => (
  <Reveal
    delay={delay}
    opacity={Math.min(weight / 0.7, 1)}
    className={className}
    style={{
      [vertical ? "width" : "height"]: "1px",
      backgroundImage: `linear-gradient(${vertical ? "to bottom" : "to right"}, ${PERF} ${dash}px, transparent ${dash}px)`,
      backgroundSize: vertical ? `1px ${dash + gap}px` : `${dash + gap}px 1px`,
      backgroundRepeat: vertical ? "repeat-y" : "repeat-x",
    }}
  />
);

// focus-blur-resolve (animate-text skill, portable spec): whole-block focus
// pull from heavy blur to crisp. Played once on scroll-in rather than looped,
// since this is reading copy, not a rotating headline.
const FOCUS_EASE = [0.22, 1, 0.36, 1] as const;

const FOCUS_FROM = { opacity: 0, y: 14, scale: 1.01, filter: "blur(14px)" };
const FOCUS_TO = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };

// `gate` holds the reveal back (e.g. until the section above has loaded);
// once open, the element still waits until it scrolls into view.
const FocusText = ({
  as = "p",
  delay = 0,
  gate = true,
  className,
  style,
  children,
}: {
  as?: "p" | "div";
  delay?: number;
  gate?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) => {
  const ref = useRef<HTMLParagraphElement & HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Tag = as === "div" ? motion.div : motion.p;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{ transformOrigin: "50% 55%", willChange: "transform, opacity, filter", ...style }}
      initial={FOCUS_FROM}
      animate={inView && gate ? FOCUS_TO : FOCUS_FROM}
      transition={{ duration: 0.76, ease: FOCUS_EASE, delay }}
    >
      {children}
    </Tag>
  );
};

const Label = ({
  children,
  size = 11,
  delay = 0,
  gate,
}: {
  children: ReactNode;
  size?: number;
  delay?: number;
  gate?: boolean;
}) => (
  <FocusText
    delay={delay}
    gate={gate}
    className="font-sans uppercase leading-none"
    style={{ fontSize: size, letterSpacing: size === 11 ? "0.08em" : "0.06em", color: INK_MUTED }}
  >
    {children}
  </FocusText>
);

// Profile columns: labels and bodies each share a top line across columns;
// equal top/bottom padding keeps the tallest column centred between dividers.
const PROFILE_COL = "flex-1 px-6 py-10 flex flex-col gap-10";
const PROFILE_BODY = "flex flex-col";

const Entry = ({ title, detail, delay = 0 }: { title: string; detail: string; delay?: number }) => (
  <FocusText as="div" delay={delay} className="flex flex-col gap-1.5">
    <p className="text-[14px] leading-normal" style={{ color: INK_STRONG }}>
      {title}
    </p>
    <p className="text-[14px] leading-[1.6]" style={{ color: INK_MUTED }}>
      {detail}
    </p>
  </FocusText>
);

type Interest = {
  label: string;
  // One-liner shown beside the cursor on hover.
  tease: string;
  src: string;
  alt: string;
  w: number;
  h: number;
  rotate?: number;
  // Matcha is cropped inside a taller box in the design.
  crop?: { box: [number, number]; img: CSSProperties };
};

const interests: Interest[] = [
  { label: "Polaroid", tease: "Way too many Polaroid cameras. Hundreds of photos.", src: polaroid, alt: "A polaroid photo of Stella", w: 106.73, h: 96.9, rotate: 1.66 },
  { label: "coffee", tease: "The good ideas show up around cup two.", src: coffee, alt: "A ceramic coffee mug", w: 107.32, h: 107.32 },
  { label: "stationery", tease: "Can't walk past a stationery store. I've tried.", src: stationery, alt: "Washi tape rolls and a fine-tip pen", w: 118.21, h: 107.32 },
  { label: "home decor", tease: "Forever scrolling home decor TikToks.", src: homeDecor, alt: "A round clay globe lamp", w: 108.88, h: 107.32 },
  { label: "R&B and jazz music", tease: "Headphones are basically my second organ.", src: records, alt: "A record in an illustrated sleeve", w: 119.76, h: 107.32 },
  { label: "growing things", tease: "Keeping a few plants alive. Mostly.", src: plant, alt: "A potted plant", w: 102.65, h: 107.32 },
  { label: "gaming", tease: "Nintendo hours don't count, right?", src: gaming, alt: "A game controller", w: 124.43, h: 107.32 },
  { label: "(my) Cat", tease: "Iggy, my tuxedo cat. Ask me for pics.", src: cats, alt: "A small cat food tin", w: 118.21, h: 107.32 },
  { label: "doodle", tease: "My meeting notes are mostly doodles.", src: doodle, alt: "A pencil", w: 111.99, h: 107.32 },
  { label: "journaling", tease: "Writing it down is how I think.", src: journaling, alt: "A cloth-bound journal", w: 104.21, h: 107.32 },
  {
    label: "matcha", tease: "Matcha over coffee. Don't tell the mug.",
    src: matcha,
    alt: "A bowl of whisked matcha with a bamboo whisk",
    w: 120,
    h: 130,
    crop: {
      box: [120, 130],
      img: { position: "absolute", width: "131.43%", height: "121.05%", left: "-19.29%", top: "-10.24%", maxWidth: "none" },
    },
  },
  { label: "cleaning", tease: "Sunday is reset day. No exceptions.", src: cleaning, alt: "A spray bottle beside a folded cloth", w: 118.21, h: 107.32 },
];

// Hovering an object softly blurs the rest of the grid and shows a teaser
// line that trails the cursor (eased like the homepage card hint).
// The collection waits for the profile copy above to resolve first, matching
// the homepage's avatar → cards rhythm.
const COLLECTION_DELAY_MS = 1000;
const COLUMN_STAGGER = 0.18;

const ObjectImage = ({ item, delay, gate }: { item: Interest; delay: number; gate: boolean }) => (
  <Reveal
    delay={delay}
    gate={gate}
    className="flex items-center justify-center w-[161.76px] h-[110.43px] overflow-hidden shrink-0"
  >
    {item.crop ? (
      <div className="relative shrink-0 overflow-hidden" style={{ width: item.w, height: item.h }}>
        <img src={item.src} alt={item.alt} loading="lazy" style={item.crop.img} />
      </div>
    ) : (
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="shrink-0 object-contain"
        style={{
          width: item.w,
          height: item.h,
          transform: item.rotate ? `rotate(${item.rotate}deg)` : undefined,
        }}
      />
    )}
  </Reveal>
);

const ObjectGrid = () => {
  const [active, setActive] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), COLLECTION_DELAY_MS);
    return () => clearTimeout(t);
  }, []);
  const hintRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    if (active === null) return;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.16;
      pos.current.y += (target.current.y - pos.current.y) * 0.16;
      const el = hintRef.current;
      if (el) {
        // Flip to the left of the cursor near the right edge of the viewport.
        const flip = pos.current.x + 16 + el.offsetWidth > window.innerWidth - 12;
        const x = flip ? pos.current.x - 12 - el.offsetWidth : pos.current.x + 16;
        el.style.transform = `translate3d(${x}px, ${pos.current.y + 18}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [active]);

  const onMove = (e: React.MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
  };

  const onEnter = (i: number) => (e: React.MouseEvent) => {
    if (active === null) pos.current = { x: e.clientX, y: e.clientY };
    target.current = { x: e.clientX, y: e.clientY };
    setActive(i);
  };

  return (
    <>
      <Label size={10} gate={ready}>
        A few interests, in objects
      </Label>
      <div className="mt-6 max-w-[871px] mx-auto overflow-hidden">
        <div
          className="group/objects grid grid-cols-2 md:grid-cols-4 w-[calc(100%+1px)] mb-[-1px]"
          onMouseMove={onMove}
          onMouseLeave={() => setActive(null)}
        >
          {interests.map((item, i) => (
            <div
              key={item.label}
              className="group/object relative h-[191.31px]"
              onMouseEnter={onEnter(i)}
            >
              {/* This cell's right and bottom grid lines. */}
              <Reveal
                gate={ready}
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to bottom, ${PERF} 2.33px, transparent 2.33px), linear-gradient(to right, ${PERF} 2.33px, transparent 2.33px)`,
                  backgroundSize: "1px 5.44px, 5.44px 1px",
                  backgroundPosition: "right top, left bottom",
                  backgroundRepeat: "repeat-y, repeat-x",
                }}
              />
              <div className="h-full flex flex-col items-center gap-[10.11px] pt-[37.33px] pb-[17.11px] transition-[filter,opacity] duration-500 ease-out group-hover/objects:opacity-50 group-hover/objects:blur-[1.5px] group-hover/object:!opacity-100 group-hover/object:!blur-0">
                <FocusText
                  as="div"
                  gate={ready}
                  delay={0.3 + (i % 4) * COLUMN_STAGGER}
                  className="absolute left-0 top-0 w-[33.1px] pt-2 text-center leading-none tabular-nums"
                  style={{ fontSize: 6.05, color: INK_MUTED }}
                >
                  {String(i + 1).padStart(2, "0")}
                </FocusText>
                <ObjectImage item={item} gate={ready} delay={(i % 4) * COLUMN_STAGGER} />
                <FocusText
                  gate={ready}
                  delay={0.35 + (i % 4) * COLUMN_STAGGER}
                  className="text-[9.33px] leading-normal whitespace-nowrap"
                  style={{ color: INK_MUTED }}
                >
                  {item.label}
                </FocusText>
              </div>
            </div>
          ))}
        </div>

        {createPortal(
          <div
            ref={hintRef}
            aria-hidden="true"
            className="fixed left-0 top-0 z-[60] pointer-events-none transition-[opacity,filter] duration-300 ease-out"
            style={{
              opacity: active === null ? 0 : 1,
              filter: active === null ? "blur(6px)" : "blur(0px)",
              willChange: "transform",
            }}
          >
            {active !== null && (
              <motion.p
                key={active}
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.35, ease: FOCUS_EASE }}
                className="whitespace-nowrap rounded-[0_10px_10px_10px] px-2.5 py-1.5 text-[12px] leading-snug shadow-[0_6px_20px_-8px_rgba(0,0,0,0.18)]"
                style={{ background: "#fff", color: INK_STRONG }}
              >
                {interests[active].tease}
              </motion.p>
            )}
          </div>,
          document.body
        )}
      </div>
    </>
  );
};

/* ------------------------------------------------------------------------ */
/* Menu cards                                                                 */
/* The cards are authored in Figma units (text as small as 5px). They are     */
/* laid out at K× and scaled down so browsers never clamp the tiny type.      */
/* ------------------------------------------------------------------------ */

const K = 4;
const u = (n: number) => `${n * K}px`;

const CARD_H = 417.1;
const cardShadow = [
  [7.85, 17.65, 0.04],
  [32.03, 32.03, 0.03],
  [71.91, 43.15, 0.02],
  [127.48, 50.99, 0.01],
]
  .map(([y, blur, a]) => `0 ${u(y)} ${u(blur)} rgba(0,0,0,${a})`)
  .join(", ");

const cardBase = (w: number, edge: number): CSSProperties => ({
  position: "absolute",
  width: u(w),
  height: u(CARD_H),
  overflow: "hidden",
  background: "linear-gradient(to bottom, #f5efdf 0%, #f5efdf 55%, #f6f0e0 100%)",
  border: `${u(0.5)} solid rgba(255,255,255,${edge})`,
  boxShadow: cardShadow,
  color: MENU_INK,
  fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif",
});

const at = (left: number, top: number, extra: CSSProperties = {}): CSSProperties => ({
  position: "absolute",
  left: u(left),
  top: u(top),
  ...extra,
});

const type = (size: number, extra: CSSProperties = {}): CSSProperties => ({
  fontSize: u(size),
  lineHeight: u(8.5),
  ...extra,
});

// Deterministic speckle so the paper texture is stable between renders.
const PaperGrain = ({ w, seed }: { w: number; seed: number }) => {
  const specks = useMemo(() => {
    let s = seed;
    const rand = () => {
      s |= 0;
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: 547 }, () => {
      const oval = rand() < 0.25;
      return {
        cx: rand() * w,
        cy: rand() * CARD_H,
        rx: oval ? 0.425 : 0.2125,
        ry: oval ? 0.2615 : 0.2125,
        o: rand() < 0.5 ? 0.1 : 0.2,
      };
    });
  }, [w, seed]);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${w} ${CARD_H}`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      {specks.map((p, i) => (
        <ellipse key={i} cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} fill="rgb(121,121,105)" fillOpacity={p.o} />
      ))}
    </svg>
  );
};

const Arrowed = ({ items, size }: { items: string[]; size: number }) => (
  <>
    {items.map((t) => (
      <p key={t} style={{ margin: 0, whiteSpace: "nowrap" }}>
        <span style={type(5.23, { fontWeight: 700 })}>→</span>
        <span style={type(size)}> {t}</span>
      </p>
    ))}
  </>
);

const ingredients: [string, string][] = [
  ["Product thinking", "a base"],
  ["Graphic play", "a dash"],
  ["Motion experiments", "a twist"],
  ["Social media work", "a spoon"],
  ["Video editing", "to taste"],
];

const plates: [string, string][] = [
  ["PRODUCT®", "clear thinking, useful things"],
  ["GRAPHIC®", "type, layout & visual play"],
  ["MOTION®", "moving ideas, frame by frame"],
];

const MenuFront = () => (
  <div style={{ ...cardBase(162.13, 0.74), left: 0, top: 0 }}>
    <PaperGrain w={162.13} seed={7} />

    <p style={at(18.06, 20.02, type(6.8))}>SP</p>
    <p style={at(131.81, 20.02, type(6.8))}>SP</p>
    <div
      style={at(43.47, 16.09, {
        width: u(75.18),
        height: u(18.31),
        borderRadius: "50%",
        border: `${u(0.425)} solid ${MENU_RULE}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
      })}
    >
      <span style={type(5.23)}>✶&nbsp;</span>
      <span style={type(6.54)}>stella, peng&nbsp;</span>
      <span style={type(5.23)}>✶</span>
    </div>

    <p style={at(18.06, 71.01, type(6.8, { fontWeight: 600 }))}>tl;dr</p>
    <p style={at(18.06, 80.16, type(6.6, { width: u(128.14) }))}>
      i'm a product designer who builds across design, tech & things in between.
    </p>
    <div style={at(18.06, 105.01, { width: u(124.87), height: u(0.425), background: MENU_RULE })} />

    <p style={at(18.06, 117.43, type(6.8, { fontWeight: 700 }))}>INGREDIENTS</p>
    {ingredients.map(([name, amount], i) => (
      <div
        key={name}
        style={at(18.06, 128.54 + i * 11.115, {
          width: u(124.87),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          whiteSpace: "nowrap",
        })}
      >
        <span style={{ fontSize: u(6.54) }}>{name}</span>
        <span style={{ fontSize: u(5.88) }}>{amount}</span>
      </div>
    ))}
    <p style={at(18.06, 186.07, type(6.08))}>(a playful blend, not a recipe)</p>

    {plates.map(([title, note], i) => (
      <div key={title} style={at(18.06, 202.42 + i * 25.495, type(6.8, { width: u(126.83) }))}>
        <p style={{ margin: 0 }}>{title}</p>
        <p style={{ margin: 0, marginTop: u(0.65) }}>{note}</p>
      </div>
    ))}

    <p style={at(10.86, 280.21, type(5.69, { whiteSpace: "nowrap" }))}>* SERVED WITH CURIOSITY, ALWAYS</p>
    {[271.72, 276.95, 282.18, 287.41, 292.64].map((top, i) => (
      <span
        key={top}
        style={at(139, top, {
          width: u(2.354),
          height: u(2.354),
          borderRadius: "50%",
          border: `${u(0.392)} solid ${MENU_INK}`,
          background: i < 3 ? SPECIMEN_INK : "#f2efdf",
        })}
      />
    ))}

    <p style={at(18.06, 295.9, type(6.8, { fontWeight: 700 }))}>DETAILS</p>
    <div style={at(10.86, 307.02)}>
      <Arrowed size={6.8} items={["height: 166", "sign: Virgo", "favorite scent: woody", "a taste for things in motion"]} />
    </div>

    <img
      src={stellaWordmark}
      alt="Stella P."
      style={at(41.21, 350.82, { width: u(76), height: u(38), mixBlendMode: "darken", objectFit: "cover" })}
    />

    <div style={at(18.06, 384.16, type(6.67, { whiteSpace: "pre" }))}>
      <p style={{ margin: 0 }}>01</p>
      <p style={{ margin: 0 }}> / 02</p>
    </div>
  </div>
);

// Number specimen on the back: 19 rows × 9 columns on a 13.4 grid, "." = empty.
const SPECIMEN = [
  ".6....5..",
  "928.45.3.",
  "7.....81.",
  "19.76....",
  "2..4.9..1",
  "....18.69",
  ".15.....7",
  ".3.97.685",
  ".......2.",
  ".........",
  ".....2.46",
  "..8.9..2.",
  "2..3.4...",
  ".3.....61",
  "...9.7...",
  "56.....8.",
  "...1.6..5",
  ".9..4.1..",
  "41.2.....",
];

const NumericalSpecimen = () => (
  <div style={at(17.65, 18.31, { width: u(126.83), height: u(268.04) })}>
    {[214.43, 174.23, 120.62, 80.41, 40.21].map((top) => (
      <div key={top} style={at(0, top, { width: u(120.95), height: u(0.392), background: SPECIMEN_INK, opacity: 0.22 })} />
    ))}
    {[80.41, 40.21].map((left) => (
      <div key={left} style={at(left, 0, { width: u(0.392), height: u(261.5), background: SPECIMEN_INK, opacity: 0.22 })} />
    ))}
    {Array.from({ length: 20 * 10 }, (_, i) => (
      <span
        key={i}
        style={at((i % 10) * 13.402, Math.floor(i / 10) * 13.402, {
          width: u(0.523),
          height: u(0.523),
          borderRadius: "50%",
          background: SPECIMEN_INK,
          opacity: 0.6,
        })}
      />
    ))}
    {SPECIMEN.flatMap((row, r) =>
      [...row].map((d, c) =>
        d === "." ? null : (
          <span
            key={`${r}-${c}`}
            style={at(-0.65 + c * 13.4 + 1.93, -5.88 + r * 13.4 + 5.26, {
              fontSize: u(8.55),
              lineHeight: u(8.55),
              fontWeight: 300,
              color: SPECIMEN_INK,
            })}
          >
            {d}
          </span>
        )
      )
    )}
  </div>
);

const MenuReverse = () => (
  <div
    style={{
      ...cardBase(161.48, 0.64),
      left: u(101.66),
      top: u(9.07),
      // Figma reports -7.33°; its rotation sign is the inverse of CSS.
      transform: "rotate(7.327deg)",
      transformOrigin: "0 0",
    }}
  >
    <PaperGrain w={161.48} seed={23} />
    <NumericalSpecimen />
    <div style={at(58.46, 340.51)}>
      <Arrowed size={6.6} items={["born in China", "based in the U.S.", "lived on both coasts", "occupation: designer"]} />
    </div>
    <div style={at(108.85, 385.45, type(6.6, { whiteSpace: "nowrap" }))}>
      <p style={{ margin: 0 }}>Stella P ✶</p>
      <p style={{ margin: 0 }}>design menu</p>
    </div>
  </div>
);

const DesignMenu = () => (
  <div
    className="relative"
    style={{ width: 268.93, height: 442.79 }}
    role="img"
    aria-label="A design menu card for Stella Peng: product thinking as a base, graphic play, motion experiments, social media work and video editing, served with curiosity."
  >
    <div
      className="absolute left-0 top-0"
      style={{ width: u(268.93), height: u(442.79), transform: `scale(${1 / K})`, transformOrigin: "0 0" }}
    >
      {/* Front card resolves first, then the back card fans in behind it. */}
      <motion.div className="absolute inset-0" {...blurIn(MENU_START + MENU_GAP, 16 * K)}>
        <MenuReverse />
      </motion.div>
      <motion.div className="absolute inset-0" {...blurIn(MENU_START, 16 * K)}>
        <MenuFront />
      </motion.div>
    </div>
  </div>
);

/* ------------------------------------------------------------------------ */

const About = () => (
  <>
    <Seo
      page="about"
      path="/about"
      description="Stella Peng is a product designer working across design, engineering, and product. Currently designing at TikTok and studying HCI+Design at the University of Washington."
    />
    <div className="min-h-screen bg-background relative z-10 font-sans">
      <Header />
      <h1 className="sr-only">About Stella Peng — a collection of curiosities</h1>

      {/* Introduction spacer */}
      <div className="h-6 md:h-[30px]" />

      {/* Profile and experience */}
      <section className="max-w-[1120px] mx-auto px-6 md:px-8 xl:px-0 pb-16">
        <Perforation />
        <div className="mt-6 flex flex-col md:flex-row">
          <div className={PROFILE_COL}>
            <Label>Self introduction</Label>
            <div className={PROFILE_BODY}>
              <FocusText delay={0.08} className="text-[14px] leading-[1.65]" style={{ color: INK_MUTED }}>
                I'm Stella, a product designer in Seattle who likes staying close to the making. Most recently I
                designed social experiences at TikTok. Before that, I worked with startups going 0→1. Got an idea
                worth building, or just want to say hi? Reach out :D
              </FocusText>
            </div>
          </div>
          <Perforation vertical delay={0.1} className="hidden md:block self-stretch" weight={0.6} />
          <Perforation delay={0.1} className="md:hidden mx-6" weight={0.6} />
          <div className={PROFILE_COL}>
            <Label delay={0.16}>Education</Label>
            <div className={`${PROFILE_BODY} gap-4`}>
              <Entry delay={0.24} title="University of Washington" detail="M.S. in HCI + Design ✶ Summer 2027" />
              <Entry delay={0.32} title="University of Michigan" detail="B.A. in Art & Design ✶ Winter 2025" />
            </div>
          </div>
          <Perforation vertical delay={0.2} className="hidden md:block self-stretch" weight={0.6} />
          <Perforation delay={0.2} className="md:hidden mx-6" weight={0.6} />
          <div className={PROFILE_COL}>
            <Label delay={0.32}>Experience</Label>
            <div className={`${PROFILE_BODY} gap-4`}>
              <Entry delay={0.4} title="TikTok" detail="2026 ✶ Product Design Intern ✶ Social team" />
              <Entry delay={0.48} title="Desai Accelerator" detail="2025 ✶ Product Design Intern" />
              <Entry delay={0.56} title="AskSia.AI" detail="2025 ✶ Product Design Intern" />
            </div>
          </div>
        </div>
        <Perforation delay={0.3} className="mt-6" />
      </section>

      {/* Object collection */}
      <section className="max-w-[1120px] mx-auto px-6 md:px-8 xl:px-0">
        <ObjectGrid />
      </section>

      {/* Closing divider */}
      <div className="max-w-[1120px] mx-auto px-6 md:px-8 xl:px-0 pt-[52px] pb-[38px]">
        <Perforation dash={3} gap={4} />
      </div>

      {/* Design menu */}
      <section className="flex justify-center pt-16 pb-[86px] overflow-hidden">
        <DesignMenu />
      </section>
    </div>

    <div className="sticky bottom-0 z-0">
      <Footer />
    </div>
  </>
);

export default About;
