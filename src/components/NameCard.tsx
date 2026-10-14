import { useEffect, useMemo, useRef } from "react";

// The 粲 card: my name, and what it means, over sunlight through leaves. It
// appears under the header logo on hover, and sits at the end of the About
// page. When `shown` turns on, the whole card resolves from a blur, the middle
// of the video comes into focus (the edges stay soft) and the words resolve
// one after another; turning it off blurs it all away at once.

const SUNLIGHT = { mp4: "/videos/sunlight.mp4", webm: "/videos/sunlight.webm", poster: "/videos/sunlight-poster.jpg" };

// Figma-style smoothed corners ("corner smoothing"), which CSS can't do: the
// card is clipped to this path, and the same path draws its hairline stroke.
// Follows the figma-squircle construction for equal corners.
export const CARD_W = 372;
export const CARD_H = 226;
const squirclePath = (w: number, h: number, r: number, smoothing: number) => {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const p = Math.min((1 + smoothing) * r, Math.min(w, h) / 2);
  const arcMeasure = 90 * (1 - smoothing);
  const arc = Math.sin(rad(arcMeasure / 2)) * r * Math.SQRT2;
  const alpha = (90 - arcMeasure) / 2;
  const p3p4 = r * Math.tan(rad(alpha / 2));
  const beta = 45 * smoothing;
  const c = p3p4 * Math.cos(rad(beta));
  const d = c * Math.tan(rad(beta));
  const b = (p - arc - c - d) / 3;
  const a = 2 * b;
  const n = (v: number) => +v.toFixed(3);
  const [A, B, C, D, ARC, abc, bc] = [a, a + b, a + b + c, d, arc, a + b + c, b + c].map(n);
  return [
    `M ${n(w - p)} 0`,
    `c ${n(a)} 0 ${B} 0 ${abc} ${D}`,
    `a ${r} ${r} 0 0 1 ${ARC} ${ARC}`,
    `c ${D} ${C - B} ${D} ${bc} ${D} ${abc}`,
    `L ${w} ${n(h - p)}`,
    `c 0 ${A} 0 ${B} ${-D} ${abc}`,
    `a ${r} ${r} 0 0 1 ${-ARC} ${ARC}`,
    `c ${-(C - B)} ${D} ${-bc} ${D} ${-abc} ${D}`,
    `L ${n(p)} ${h}`,
    `c ${-A} 0 ${-B} 0 ${-abc} ${-D}`,
    `a ${r} ${r} 0 0 1 ${-ARC} ${-ARC}`,
    `c ${-D} ${-(C - B)} ${-D} ${-bc} ${-D} ${-abc}`,
    `L 0 ${n(p)}`,
    `c 0 ${-A} 0 ${-B} ${D} ${-abc}`,
    `a ${r} ${r} 0 0 1 ${ARC} ${-ARC}`,
    `c ${C - B} ${-D} ${bc} ${-D} ${abc} ${-D}`,
    "Z",
  ].join(" ");
};
const CARD_RADIUS = 14;

// Blur over the video that deepens toward the edges and is heaviest in the
// corners; only the empty middle stays clear. Each layer blurs what's under it
// (the card is the backdrop root), so they compound outward.
const CORNER_BLURS = [
  { blur: 6, clear: 18, full: 52, white: 0.06 },
  { blur: 16, clear: 38, full: 74, white: 0.12 },
  { blur: 40, clear: 56, full: 96, white: 0.2 },
];
const cornerMask = (clear: number, full: number) =>
  `radial-gradient(ellipse 60% 62% at 50% 50%, transparent ${clear}%, black ${full}%)`;

// Out → in; delays only on the way in, so leaving blurs it off at once.
const pick = (shown: boolean, on: string, off: string) => (shown ? on : off);
const word = (shown: boolean, delay: string) =>
  `transition-all ease-out ${pick(shown, `opacity-100 blur-0 translate-y-0 duration-700 ${delay}`, "opacity-0 blur-[8px] translate-y-1 duration-300")}`;

// `width`/`height` size the card and `scale` grows its corners, blur and
// shadow to match. `type` picks the text sizes: "note" for the small hover card,
// "page" to sit at the same sizes as body text on a page (14px).
const TYPE = {
  note: { pad: "px-4 py-3.5", gap: "gap-2.5", glyph: "w-[26px] h-[28px]", pinyin: "text-[17px]", line: "text-[12.5px]", defs: "text-[11.5px]" },
  page: { pad: "px-6 py-5", gap: "gap-3", glyph: "w-[32px] h-[35px]", pinyin: "text-[20px]", line: "text-[14px]", defs: "text-[14px]" },
};
const NameCard = ({
  shown,
  className = "",
  width = CARD_W,
  height = CARD_H,
  scale = 1,
  type = "note",
  radius,
  shadow = 1,
}: {
  shown: boolean;
  className?: string;
  width?: number;
  height?: number;
  scale?: number;
  type?: keyof typeof TYPE;
  /** corner radius in px; defaults to 14, growing a little with `scale` */
  radius?: number;
  /** multiplies the drop shadow's strength */
  shadow?: number;
}) => {
  const t = TYPE[type];
  const videoRef = useRef<HTMLVideoElement>(null);
  const path = useMemo(
    () => squirclePath(width, height, radius ?? CARD_RADIUS * Math.min(scale, 1.15), 0.6),
    [width, height, scale, radius]
  );

  // Only play the sunlight while the card is showing.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shown) void video.play().catch(() => {});
    else video.pause();
  }, [shown]);

  return (
    // the shadow lives on a wrapper: the card's clip-path would cut it off
    <div
      className={className}
      // a soft shadow with a little sky-blue in it, picked up from the light in the video
      style={{
        filter: `drop-shadow(0 ${10 * scale}px ${18 * scale}px rgba(84,128,170,${0.16 * shadow})) drop-shadow(0 ${2 * scale}px ${4 * scale}px rgba(40,52,60,${0.06 * shadow}))`,
      }}
    >
      <div
        className={`relative origin-top-left transition-all ease-out ${pick(
          shown,
          "opacity-100 blur-0 scale-100 duration-700 delay-100",
          "opacity-0 blur-[14px] scale-[0.98] duration-300"
        )}`}
        style={{ width, height, backgroundColor: "#eef2e6", clipPath: `path("${path}")` }}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={SUNLIGHT.poster}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-all ease-out ${pick(
            shown,
            "blur-0 scale-100 duration-1000 delay-200",
            "blur-[30px] scale-110 duration-300"
          )}`}
        >
          <source src={SUNLIGHT.webm} type="video/webm" />
          <source src={SUNLIGHT.mp4} type="video/mp4" />
        </video>
        {CORNER_BLURS.map(({ blur, clear, full, white }) => {
          const mask = cornerMask(clear, full);
          return (
            <div
              key={blur}
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundColor: `rgba(255,255,255,${white})`,
                backdropFilter: `blur(${blur * scale}px) saturate(1.1) brightness(1.03)`,
                WebkitBackdropFilter: `blur(${blur * scale}px) saturate(1.1) brightness(1.03)`,
                maskImage: mask,
                WebkitMaskImage: mask,
              }}
            />
          );
        })}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(250,250,244,0.55), rgba(250,250,244,0) 55%)" }}
        />

        <div className={`relative h-full flex flex-col justify-between ${t.pad} font-sans font-normal text-left text-foreground`}>
          <div className="flex items-start justify-between gap-6">
            <div className={`flex items-center ${t.gap} ${word(shown, "delay-300")}`}>
              <img src="/favicon-dark.svg" alt="粲" className={t.glyph} />
              {/* read like a dictionary entry's pronunciation, not a second word */}
              <span className={`font-sans font-extralight ${t.pinyin} leading-none tracking-[0.04em] text-black/45`}>
                /càn/
              </span>
            </div>
            <p
              className={`pt-1 whitespace-nowrap text-right font-['Exposure'] ${t.line} leading-[1.3] tracking-[-0.01em] text-foreground/55 ${word(shown, "delay-500")}`}
            >
              Stella is a star, 粲 is its light.
            </p>
          </div>
          <dl className={`grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 ${t.defs} leading-[1.5] ${word(shown, "delay-700")}`}>
            <dt className="text-foreground/90">明白貌；明亮貌</dt>
            <dd className="text-foreground/60">bright, luminous</dd>
            <dt className="text-foreground/90">星光粲然</dt>
            <dd className="text-foreground/60">starlight, shining bright</dd>
          </dl>
        </div>
        {/* hairline: a 1px stroke on the clip edge, so 0.5px shows inside */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
        >
          <path d={path} stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
};

export default NameCard;
