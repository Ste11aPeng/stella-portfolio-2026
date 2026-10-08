import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { RESUME_PDF, resumeHeader, resumeSections } from "@/data/resume";
import { RESUME_OPEN_EVENT } from "@/lib/resume-events";
import pencil from "@/assets/resume/pencil.png";
import gelPen from "@/assets/resume/gel-pen.png";

// Warm inks on a clean cream sheet that has yellowed a little at the edges.
const INK = "#33302a";
const INK_MID = "#6d675c";
const INK_SOFT = "#a39b8c";
const PAPER = "#f8f3e8";
const PAPER_BACK = "#f2ecdf";

// `**bold**` → darker emphasis; "\n" → line break.
const Rich = ({ text }: { text: string }) => (
  <>
    {text.split("\n").map((line, li) => (
      <span key={li} className="block">
        {line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
          part.startsWith("**") ? (
            <span key={i} style={{ color: INK }}>
              {part.slice(2, -2)}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    ))}
  </>
);

// Faint paper grain (tiny SVG noise tile).
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.32  0 0 0 0 0.26  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// Only the edges have aged: a soft warm toning that fades out toward the middle.
const EDGE_TONE = [
  "radial-gradient(ellipse 125% 100% at 50% 50%, transparent 66%, rgba(166,128,70,0.07) 88%, rgba(140,104,52,0.15) 100%)",
  "linear-gradient(to right, rgba(150,112,58,0.07), transparent 14px, transparent calc(100% - 14px), rgba(150,112,58,0.07))",
  "linear-gradient(to bottom, rgba(150,112,58,0.06), transparent 14px, transparent calc(100% - 14px), rgba(150,112,58,0.07))",
].join(", ");

// The fold across the middle: a soft valley with a lit ridge just below it.
const CREASE =
  "linear-gradient(to bottom, transparent calc(50% - 40px), rgba(90,70,40,0.035) calc(50% - 2px), rgba(90,70,40,0.1) 50%, rgba(255,250,238,0.5) calc(50% + 1px), rgba(255,250,238,0) calc(50% + 3px), rgba(90,70,40,0.025) calc(50% + 24px), transparent calc(50% + 48px))";

const paperSurface: CSSProperties = {
  backgroundColor: PAPER,
  boxShadow:
    "0 1px 2px rgba(48,40,26,0.07), 0 10px 26px -10px rgba(48,40,26,0.17), 0 32px 64px -28px rgba(48,40,26,0.22)",
};

const PaperDecor = () => (
  <>
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: GRAIN, opacity: 0.08, mixBlendMode: "multiply" }}
    />
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `${EDGE_TONE}, ${CREASE}` }} />
  </>
);

// Phones: a readable single-column version that scrolls.
const MobileSheet = () => (
  <div className="relative px-6 py-8 font-sans" style={{ color: INK_MID }}>
    <header className="grid gap-y-3 md:grid-cols-[132px_minmax(0,1fr)_minmax(0,1.3fr)] md:gap-x-6 pb-7 md:pb-9">
      <h2
        className="text-[19px] leading-tight !tracking-[-0.03em]"
        style={{ color: INK, fontFamily: "'Exposure', 'New Spirit', serif" }}
      >
        {resumeHeader.name}
      </h2>
      <div className="text-[13px] leading-[1.6]">
        <p style={{ color: INK }}>{resumeHeader.title}</p>
        <p>{resumeHeader.site.label}</p>
      </div>
      <div className="text-[13px] leading-[1.6] flex flex-col items-start">
        <a href={resumeHeader.email.href} className="hover:text-[#2e2e2b] transition-colors" style={{ color: INK }}>
          {resumeHeader.email.label}
        </a>
        <a
          href={resumeHeader.linkedin.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 decoration-[0.5px] hover:text-[#2e2e2b] transition-colors"
        >
          {resumeHeader.linkedin.label}
        </a>
      </div>
    </header>

    {resumeSections.map((section) => (
      <section
        key={section.label}
        className="grid gap-y-5 md:grid-cols-[132px_minmax(0,1fr)] md:gap-x-6 py-7 md:py-8"
       
      >
        {/* not an <h3>: the global heading style would force the display serif */}
        <div role="heading" aria-level={3} className="text-[11px] uppercase tracking-[0.08em] pt-[3px]" style={{ color: INK_SOFT }}>
          {section.label}
        </div>
        <div className="flex flex-col gap-7">
          {section.entries.map((e) => (
            <div key={e.org} className="grid gap-y-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-x-6">
              <div className="text-[13px] leading-[1.55]">
                <p style={{ color: INK }}>{e.org}</p>
                {e.role && <p style={{ color: INK }}>{e.role}</p>}
                {e.when && <p style={{ color: INK_SOFT }}>{e.when}</p>}
              </div>
              <div className="flex flex-col gap-2 text-[12.5px] leading-[1.6]">
                {e.detail.map((d, i) => (
                  <p key={i}>
                    <Rich text={d} />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);

// Tablet and up: a single letter page with the PDF's proportions (595:842),
// laid out like the original and scaled as a whole to fit the screen.
const PAGE_W = 640;
const PAGE_H = Math.round((PAGE_W * 842) / 595);

const LetterSheet = () => (
  <div className="relative font-sans" style={{ width: PAGE_W, height: PAGE_H, padding: "44px 46px", color: INK_MID }}>
    <header className="grid grid-cols-[104px_160px_minmax(0,1fr)] gap-x-4 pb-6">
      <h2 className="text-[17px] leading-tight !tracking-[-0.03em]" style={{ color: INK, fontFamily: "'Exposure', 'New Spirit', serif" }}>
        {resumeHeader.name}
      </h2>
      <div className="text-[11px] leading-[1.55]">
        <p style={{ color: INK }}>{resumeHeader.title}</p>
        <p>{resumeHeader.site.label}</p>
      </div>
      <div className="text-[11px] leading-[1.55] flex flex-col items-start">
        <a href={resumeHeader.email.href} className="hover:text-[#2e2e2b] transition-colors" style={{ color: INK }}>
          {resumeHeader.email.label}
        </a>
        <a href={resumeHeader.linkedin.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-[0.5px] hover:text-[#2e2e2b] transition-colors">
          {resumeHeader.linkedin.label}
        </a>
      </div>
    </header>
    {resumeSections.map((section) => (
      <section key={section.label} className="grid grid-cols-[104px_minmax(0,1fr)] gap-x-4 py-[19px]">
        <div role="heading" aria-level={3} className="text-[9.5px] uppercase tracking-[0.08em] pt-[2px]" style={{ color: INK_SOFT }}>
          {section.label}
        </div>
        <div className="flex flex-col gap-[16px]">
          {section.entries.map((e) => (
            <div key={e.org} className="grid grid-cols-[160px_minmax(0,1fr)] gap-x-4">
              <div className="text-[11px] leading-[1.5]">
                <p style={{ color: INK }}>{e.org}</p>
                {e.role && <p style={{ color: INK }}>{e.role}</p>}
                {e.when && <p style={{ color: INK_SOFT }}>{e.when}</p>}
              </div>
              <div className="flex flex-col gap-[5px] text-[10.5px] leading-[1.5]">
                {e.detail.map((d, i) => (
                  <p key={i}>
                    <Rich text={d} />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);

// Progressive blur: light near the paper, heaviest at the screen edges.
const Backdrop = () => (
  <>
    <div className="absolute inset-0 backdrop-blur-[2px]" style={{ background: "hsl(var(--background) / 0.25)" }} />
    <div
      className="absolute inset-0 backdrop-blur-[7px]"
      style={{
        maskImage: "radial-gradient(ellipse 62% 72% at 50% 50%, transparent 28%, black 78%)",
        WebkitMaskImage: "radial-gradient(ellipse 62% 72% at 50% 50%, transparent 28%, black 78%)",
      }}
    />
    <div
      className="absolute inset-0 backdrop-blur-[16px]"
      style={{
        maskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 52%, black 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 52%, black 100%)",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 75% 85% at 50% 50%, hsl(var(--background) / 0.08) 0%, hsl(var(--background) / 0.45) 70%, hsl(var(--background) / 0.7) 100%)",
      }}
    />
  </>
);

const EASE = [0.22, 1, 0.36, 1] as const;

// The letter arrives folded in half, the top half closed down over the
// bottom. It rises to centre while the top half swings open on the crease.
// Each half shows its slice of the sheet; once flat we swap to one sheet so
// text selection behaves normally.
const UNFOLD = { duration: 0.95, delay: 0.4, ease: EASE };
// Folding back up when a copy is taken: quicker, no wait.
const REFOLD = { duration: 0.5, ease: [0.55, 0, 0.35, 1] as const };

const FoldingLetter = ({
  height,
  onDone,
  Sheet,
  closing = false,
}: {
  height: number;
  onDone: () => void;
  Sheet: () => JSX.Element;
  closing?: boolean;
}) => {
  const half = height / 2;
  // Open and folded poses; `closing` plays the same fold in reverse.
  const folded = { lift: { y: -half / 2 }, shadow: { top: half, height: half }, flap: { rotateX: -179 } };
  const flat = { lift: { y: 0 }, shadow: { top: 0, height }, flap: { rotateX: 0 } };
  const [from, to] = closing ? [flat, folded] : [folded, flat];
  const transition = closing ? REFOLD : UNFOLD;
  const face: CSSProperties = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" };
  const panel = (k: number) => (
    <div className="absolute inset-0 overflow-hidden" style={{ ...face, ...paperSurface, boxShadow: "none" }}>
      <div style={{ position: "absolute", inset: 0, height, transform: `translateY(${-k * half}px)` }}>
        <PaperDecor />
        <Sheet />
      </div>
    </div>
  );
  return (
    <motion.div
      className="relative"
      style={{ height, perspective: 2000, transformStyle: "preserve-3d" }}
      aria-hidden="true"
      initial={from.lift}
      animate={to.lift}
      transition={transition}
    >
      {/* shadow for the whole sheet grows as it opens */}
      <motion.div
        className="absolute inset-x-0"
        style={{ ...paperSurface, backgroundColor: "transparent" }}
        initial={from.shadow}
        animate={to.shadow}
        transition={transition}
      />
      {/* bottom half stays put */}
      <div className="absolute inset-x-0" style={{ top: half, height: half }}>
        {panel(1)}
      </div>
      {/* top half: folded down over the bottom, its back showing */}
      <motion.div
        className="absolute inset-x-0"
        style={{ top: 0, height: half, transformOrigin: "50% 100%", transformStyle: "preserve-3d", zIndex: 2 }}
        initial={from.flap}
        animate={to.flap}
        transition={transition}
        onAnimationComplete={onDone}
      >
        {panel(0)}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            ...face,
            transform: "rotateX(180deg)",
            background: `linear-gradient(to top, ${PAPER_BACK}, #ece4d4)`,
          }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: `${EDGE_TONE}` }} />
          <div className="absolute inset-0" style={{ backgroundImage: GRAIN, opacity: 0.08, mixBlendMode: "multiply" }} />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Two pens left on the desk beside the letter, resolving from a blur one after
// the other (same entrance as the About page menu cards). Hovering one nudges
// it round a few degrees, as if touched.
const PENS = [
  { src: pencil, aspect: 77 / 800, len: 1, rotate: 11, nudge: -5, dx: -0.16, dy: -0.04, delay: 0.55, alt: "" },
  { src: gelPen, aspect: 76 / 743, len: 0.96, rotate: -6, nudge: 5, dx: 0.17, dy: 0.07, delay: 1.25, alt: "" },
];

// A filter on a rotated element is drawn in the element's own (rotated) frame,
// so turn the shadow offsets back by the pen's angle to keep the light coming
// from the same place on both pens.
const penShadow = (deg: number) => {
  const a = (-deg * Math.PI) / 180;
  const off = (x: number, y: number) =>
    `${(x * Math.cos(a) - y * Math.sin(a)).toFixed(2)}px ${(x * Math.sin(a) + y * Math.cos(a)).toFixed(2)}px`;
  return `drop-shadow(${off(5, 9)} 7px rgba(48,40,26,0.2)) drop-shadow(${off(1, 2)} 1.5px rgba(48,40,26,0.18))`;
};

const Pens = ({ cx, cy, length }: { cx: number; cy: number; length: number }) => (
  <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
    {PENS.map((p, i) => {
      const h = length * p.len;
      const w = h * p.aspect;
      return (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: cx + p.dx * length - w / 2, top: cy + p.dy * length - h / 2, width: w, height: h }}
          initial={{ opacity: 0, scale: 0.97, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: EASE, delay: p.delay }}
        >
          {/* the shadow lives on the pen itself so it turns with it on hover */}
          <img
            src={p.src}
            alt={p.alt}
            draggable={false}
            className="w-full h-full select-none pointer-events-auto [transform:rotate(var(--rest))] hover:[transform:rotate(var(--nudged))] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={
              {
                "--rest": `${p.rotate}deg`,
                "--nudged": `${p.rotate + p.nudge}deg`,
                filter: penShadow(p.rotate),
              } as CSSProperties
            }
          />
        </motion.div>
      );
    })}
  </div>
);

const useViewport = () => {
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return vp;
};

// A few more copies of the letter stacked underneath, each a little askew.
// They settle in with the pens, once the top sheet has opened.
const STACK = [
  { rotate: -1.6, x: -7, y: 5, tint: "#f1ebdd", delay: 1.0 },
  { rotate: 1.1, x: 6, y: 3, tint: "#f4efe3", delay: 1.45 },
];

const CopyStack = () => (
  <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
    {STACK.map((c, i) => (
      <motion.div
        key={i}
        className="absolute inset-0"
        style={{ rotate: c.rotate, x: c.x, y: c.y }}
        initial={{ opacity: 0, filter: "blur(16px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.4, ease: EASE, delay: c.delay }}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backgroundColor: c.tint,
            boxShadow: "0 1px 2px rgba(48,40,26,0.06), 0 8px 22px -12px rgba(48,40,26,0.18)",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: EDGE_TONE }} />
          <div className="absolute inset-0" style={{ backgroundImage: GRAIN, opacity: 0.08, mixBlendMode: "multiply" }} />
        </div>
      </motion.div>
    ))}
  </div>
);

const RESUME_FILENAME = "Stella-Peng-Resume.pdf";

const downloadResume = () => {
  const a = document.createElement("a");
  a.href = RESUME_PDF;
  a.download = RESUME_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

// A paperclip clamped over the note's top edge, upright like the note. Drawn
// in two layers: the back leg and top bend *under* the note (so only the bend
// shows above its edge), and the front leg with its bottom U *over* it.
const CLIP_W = 20;
const CLIP_H = 60;
const CLIP_R = 7.5;
const CLIP_RISE = 12; // how far the bend stands above the note's top edge
const LEG_L = 2;
const LEG_R = CLIP_W - 2;
const CLIP_TOP = CLIP_R + 2;
const CLIP_BOTTOM = CLIP_H - CLIP_R - 2;
const CLIP_BACK = `M${LEG_L} ${CLIP_BOTTOM - 6} L${LEG_L} ${CLIP_TOP} A${CLIP_R} ${CLIP_R} 0 0 1 ${LEG_R} ${CLIP_TOP}`;
const CLIP_FRONT = `M${LEG_R} ${CLIP_TOP} L${LEG_R} ${CLIP_BOTTOM} A${CLIP_R} ${CLIP_R} 0 0 1 ${LEG_L} ${CLIP_BOTTOM} L${LEG_L} ${CLIP_BOTTOM - 15}`;

const Wire = ({ d }: { d: string }) => (
  <>
    <path d={d} stroke="#83827d" strokeWidth="2.8" strokeLinecap="round" />
    <path d={d} stroke="#c4c3be" strokeWidth="1.6" strokeLinecap="round" />
    <path d={d} stroke="#f4f3ef" strokeWidth="0.65" strokeLinecap="round" transform="translate(-0.5 -0.25)" />
  </>
);

const ClipLayer = ({ d, shadow }: { d: string; shadow: string }) => (
  <svg
    width={CLIP_W}
    height={CLIP_H}
    viewBox={`0 0 ${CLIP_W} ${CLIP_H}`}
    fill="none"
    aria-hidden="true"
    className="absolute overflow-visible pointer-events-none"
    style={{
      right: 4,
      top: -CLIP_RISE,
      transform: "rotate(9deg)",
      transformOrigin: `50% ${CLIP_RISE}px`,
      filter: `drop-shadow(${shadow})`,
    }}
  >
    <Wire d={d} />
  </svg>
);

// "take a copy": a square sticky note clipped to the letter's top-right
// corner, hanging off its edge so it never covers the résumé itself.
const CopyNote = ({
  show,
  taking,
  onTake,
  style,
}: {
  show: boolean;
  taking: boolean;
  onTake: () => void;
  style: CSSProperties;
}) => (
  <motion.div
    className="absolute z-10"
    style={style}
    initial={{ opacity: 0, y: -6, filter: "blur(6px)" }}
    animate={show && !taking ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: taking ? 0 : -6, filter: "blur(6px)" }}
    transition={{ duration: taking ? 0.25 : 0.7, ease: EASE }}
  >
    <a
      href={RESUME_PDF}
      download={RESUME_FILENAME}
      aria-label="Take a copy (download résumé PDF)"
      onClick={(e) => {
        // The download starts when the copy lands, not now: starting it here
        // could stall or cut short the fly-away.
        e.preventDefault();
        e.stopPropagation();
        onTake();
      }}
      className="group/note relative block outline-none"
      style={{ pointerEvents: show && !taking ? "auto" : "none" }}
    >
      <span
        className="relative block transition-transform duration-500 ease-out rotate-[1.5deg] group-hover/note:rotate-0 group-hover/note:-translate-y-[2px] group-focus-visible/note:rotate-0 group-focus-visible/note:-translate-y-[2px]"
        style={{ transformOrigin: "70% 0%" }}
      >
        <ClipLayer d={CLIP_BACK} shadow="0.5px 1px 0.6px rgba(40,34,24,0.22)" />
        <span
          className="relative flex items-center justify-center text-center"
          style={{
            width: 100,
            height: 96,
            // a real sticky note: flat yellow, a touch darker where the glue strip is,
            // its free bottom edge lifting off the page
            background: "linear-gradient(to bottom, #efe3b2 0, #f6edc6 9px, #f7eecb 70%, #f3e8bf 100%)",
            boxShadow:
              "0 1px 1px rgba(48,40,26,0.1), 0 6px 9px -6px rgba(48,40,26,0.3), 6px 9px 10px -9px rgba(48,40,26,0.28)",
          }}
        >
          <span
            className="block text-[16px] leading-[1.15] transition-colors group-hover/note:text-[#1f1d19] group-focus-visible/note:underline underline-offset-2"
            style={{ color: INK, fontFamily: "'Exposure', 'New Spirit', serif", fontWeight: 420 }}
          >
            take a<br />
            copy
          </span>
        </span>
        <ClipLayer d={CLIP_FRONT} shadow="0.8px 1.4px 0.8px rgba(40,34,24,0.3)" />
      </span>
    </a>
  </motion.div>
);

// Paper unfolding sound, timed so its swish lands as the flaps swing open.
const UNFOLD_SOUND = "/sounds/resume-unfold.mp3";
const UNFOLD_SOUND_DELAY = 350;
let unfoldAudio: HTMLAudioElement | null = null;

const playPaper = (volume: number, delay: number) => {
  if (!unfoldAudio) unfoldAudio = new Audio(UNFOLD_SOUND);
  const a = unfoldAudio;
  window.setTimeout(() => {
    a.volume = volume;
    a.currentTime = 0;
    void a.play().catch(() => {});
  }, delay);
};

// Where the taken copy flies: toward the browser's downloads. Chrome, Safari,
// Firefox and Edge show them top-right; The Browser Company's Arc and Dia show
// them top-left. Both report a plain Chrome user agent, so:
// - Arc injects its theme colours into every page as --arc-palette-* variables;
// - Dia brands itself only as "Chromium", while Chrome, Edge, Opera, Brave etc.
//   add their own name to navigator.userAgentData.brands.
const BRANDED_CHROMIUM = /Google Chrome|Microsoft Edge|Opera|Brave|Vivaldi|Yandex|Samsung/i;

const downloadsOnLeft = () => {
  if (getComputedStyle(document.documentElement).getPropertyValue("--arc-palette-title").trim() !== "") return true;
  const brands =
    (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands.map(
      (b) => b.brand
    ) ?? [];
  return brands.includes("Chromium") && !brands.some((b) => BRANDED_CHROMIUM.test(b));
};

const flyTarget = (vw: number) =>
  downloadsOnLeft() ? { x: 40, y: 18, rotate: -14 } : { x: vw - 44, y: 18, rotate: 14 };

const FLY_TIME = 0.8;
// The next copy waits underneath, out of focus: softest at the top, still a
// little soft at the bottom. It's built from the sheet at a few blur levels,
// each masked to a horizontal band. `focus` runs 0 → 1; each band clears over
// its own stretch of it, the bottom band first and the top band last, so the
// page sharpens gradually from the bottom up.
const FOCUS_STAGGER = 0.14; // how much later each band above starts to clear
const FOCUS_SPAN = 1 - FOCUS_STAGGER * 3; // how long each band takes
const FOCUS_TIME = 4.2;
const FOCUS_BLURS = [1.4, 2.6, 4, 5.6];
const FOCUS_BAND = 22;
const FOCUS_EDGE = 16;
const FOCUS_LINE = 82; // below this the lightest blur applies

const focusMask = (i: number) => {
  const e = FOCUS_EDGE / 2;
  const bottom = FOCUS_LINE - (i - 1) * FOCUS_BAND; // lower edge of band i
  const top = FOCUS_LINE - i * FOCUS_BAND; // upper edge of band i
  if (i === 0) return `linear-gradient(to bottom, transparent ${FOCUS_LINE - e}%, black ${FOCUS_LINE + e}%)`;
  if (i === FOCUS_BLURS.length - 1)
    return `linear-gradient(to bottom, black ${bottom - e}%, transparent ${bottom + e}%)`;
  return `linear-gradient(to bottom, transparent ${top - e}%, black ${top + e}%, black ${bottom - e}%, transparent ${bottom + e}%)`;
};

// ease-in-out on each band's own stretch of the overall progress
const bandEase = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const FocusLayer = ({ focus, i, Sheet }: { focus: MotionValue<number>; i: number; Sheet: () => JSX.Element }) => {
  const filter = useTransform(focus, (p) => {
    const t = Math.min(1, Math.max(0, (p - i * FOCUS_STAGGER) / FOCUS_SPAN));
    return `blur(${(FOCUS_BLURS[i] * (1 - bandEase(t))).toFixed(2)}px)`;
  });
  const mask = focusMask(i);
  return (
    <motion.div
      className={i === 0 ? "relative" : "absolute inset-0"}
      style={{ maskImage: mask, WebkitMaskImage: mask, filter }}
    >
      <Sheet />
    </motion.div>
  );
};

const FocusSheet = ({ focus, Sheet }: { focus: MotionValue<number>; Sheet: () => JSX.Element }) => (
  <>
    {FOCUS_BLURS.map((_, i) => (
      <FocusLayer key={i} focus={focus} i={i} Sheet={Sheet} />
    ))}
  </>
);

const ResumeOverlay = () => {
  const [open, setOpen] = useState(false);
  const [flat, setFlat] = useState(false);
  // "take a copy": refold the letter, then fly it off toward the download icon.
  const [taking, setTaking] = useState(false);
  // Where a taken copy is in its send-off; a ref so stray animation callbacks
  // can't advance it.
  const phase = useRef<"idle" | "folding" | "flying" | "arriving">("idle");
  // Each taken copy is replaced by the next one off the stack.
  const [copies, setCopies] = useState(0);
  // While a copy is being taken, the next one shows underneath, out of focus.
  const [underlay, setUnderlay] = useState(false);
  const focus = useMotionValue(0);
  const [measured, setMeasured] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const vp = useViewport();

  // Tablet+: one fixed page scaled to fit; phones: readable column that scrolls.
  const letter = vp.w >= 640;
  const scale = letter ? Math.min(1.05, (vp.h - 64) / PAGE_H, (vp.w - 48) / PAGE_W) : 1;
  // Wide screens: nudge the letter left and lay the pens out to its right.
  const pens = letter && vp.w >= 1100;
  const shift = pens ? Math.min(110, vp.w * 0.07) : 0;
  const paperRight = vp.w / 2 - shift + (PAGE_W * scale) / 2;
  const penLength = PAGE_H * scale * 0.49; // a real pen is about half an A4 sheet
  const Sheet = letter ? LetterSheet : MobileSheet;
  const height = letter ? PAGE_H : measured;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => {
      setFlat(!!reduce);
      setTaking(false);
      phase.current = "idle";
      setUnderlay(false);
      setCopies(0);
      setOpen(true);
      playPaper(0.45, reduce ? 0 : UNFOLD_SOUND_DELAY);
    };
    window.addEventListener(RESUME_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(RESUME_OPEN_EVENT, onOpen);
  }, [reduce]);

  // Esc to close; lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, close]);

  // Phones: measure the column so the folding halves match it.
  useLayoutEffect(() => {
    if (!open || letter || !measureRef.current) return;
    const el = measureRef.current;
    const update = () => setMeasured(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, letter]);

  // Fold, fly to the corner, and only then hand over the PDF.
  const take = () => {
    if (phase.current !== "idle") return;
    setTaking(true);
    if (reduce) {
      downloadResume();
      window.setTimeout(() => setTaking(false), 600);
      return;
    }
    phase.current = "folding";
    focus.set(0);
    setUnderlay(true);
    setFlat(false); // back to the folding letter, this time closing
    playPaper(0.3, 0);
  };

  // x leads and y lags, so the copy swoops right before rising into the corner.
  const fly = () => {
    if (phase.current !== "folding") return;
    phase.current = "flying";
    const el = flyRef.current;
    const land = () => {
      downloadResume(); // the copy has "landed" in the downloads corner
      nextCopy();
    };
    if (!el) return land();
    const r = el.getBoundingClientRect();
    const to = flyTarget(vp.w);
    const k = letter ? scale : 1; // the letter's moves are in its unscaled page units
    void animate(
      el,
      {
        x: (to.x - (r.left + r.width / 2)) / k,
        y: (to.y - (r.top + r.height / 2)) / k,
        scale: 0.05,
        rotate: to.rotate,
        opacity: 0,
      },
      {
        x: { duration: FLY_TIME, ease: [0.4, 0, 0.8, 0.45] },
        y: { duration: FLY_TIME, ease: [0.8, 0, 0.85, 1] },
        scale: { duration: FLY_TIME, ease: [0.45, 0, 0.7, 0.5] },
        rotate: { duration: FLY_TIME, ease: "easeIn" },
        opacity: { duration: 0.18, delay: FLY_TIME - 0.18 },
      }
    ).then(land);
  };

  // The copy has gone: the sheet underneath slowly comes into focus, bottom
  // first. Once
  // sharp it hands over to the real (selectable) sheet, which looks identical
  // by then.
  const nextCopy = () => {
    phase.current = "arriving";
    setFlat(true);
    setCopies((c) => c + 1);
    void animate(focus, 1, { duration: FOCUS_TIME, ease: "linear" }).then(() => {
      if (phase.current !== "arriving") return;
      phase.current = "idle";
      setUnderlay(false);
      setTaking(false); // bring the note back
    });
  };

  if (typeof document === "undefined") return null;

  const paper = (
    <>
      <div
        ref={measureRef}
        className="relative"
        style={{
          ...paperSurface,
          visibility: flat ? "visible" : "hidden",
          position: flat ? "relative" : "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <PaperDecor />
        <Sheet />
      </div>
      {!flat && height > 0 && (
        <FoldingLetter
          key={taking ? "refold" : "unfold"}
          height={height}
          Sheet={Sheet}
          closing={taking}
          onDone={taking ? fly : () => setFlat(true)}
        />
      )}
    </>
  );

  const sheet = (
    <>
      <CopyStack />
      {underlay && (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden" style={paperSurface}>
          <PaperDecor />
          <FocusSheet focus={focus} Sheet={Sheet} />
        </div>
      )}
      {/* hidden while the sheet underneath comes into focus */}
      <motion.div
        key={copies}
        ref={flyRef}
        className="relative"
        style={{ visibility: underlay && phase.current === "arriving" ? "hidden" : "visible" }}
      >
        {paper}
      </motion.div>
      <CopyNote show={flat} taking={taking} onTake={take} style={letter ? { right: -24, top: 6 } : { right: -6, top: 6 }} />
    </>
  );

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="resume"
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Résumé"
          className="fixed inset-0 z-[200] outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Backdrop />

          {/* clicking anywhere outside the paper closes */}
          <div className={`absolute inset-0 ${letter ? "overflow-hidden" : "overflow-y-auto"}`} onClick={close}>
            <div className={`min-h-full flex justify-center ${letter ? "items-center" : "px-4 py-16"}`}>
              <motion.div
                // my-auto (not items-center) on phones so the tall column starts at the top and scrolls
                className={letter ? "relative" : "relative w-full max-w-[520px] my-auto"}
                style={letter ? { width: PAGE_W * scale, height: PAGE_H * scale, marginRight: shift * 2 } : undefined}
                onClick={(e) => e.stopPropagation()}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 12, scale: 0.985, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {letter ? (
                  <div
                    className="absolute left-0 top-0"
                    style={{ width: PAGE_W, height: PAGE_H, transform: `scale(${scale})`, transformOrigin: "0 0" }}
                  >
                    {sheet}
                  </div>
                ) : (
                  sheet
                )}
              </motion.div>
            </div>
          </div>

          {/* above the click-to-close layer so the pens can be hovered */}
          {pens && <Pens cx={(paperRight + vp.w) / 2 - 20} cy={vp.h / 2 + PAGE_H * scale * 0.08} length={penLength} />}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ResumeOverlay;
