import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
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

const FoldingLetter = ({ height, onDone, Sheet }: { height: number; onDone: () => void; Sheet: () => JSX.Element }) => {
  const half = height / 2;
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
      initial={{ y: -half / 2 }}
      animate={{ y: 0 }}
      transition={UNFOLD}
    >
      {/* shadow for the whole sheet grows as it opens */}
      <motion.div
        className="absolute inset-x-0"
        style={{ ...paperSurface, backgroundColor: "transparent" }}
        initial={{ top: half, height: half }}
        animate={{ top: 0, height }}
        transition={UNFOLD}
      />
      {/* bottom half stays put */}
      <div className="absolute inset-x-0" style={{ top: half, height: half }}>
        {panel(1)}
      </div>
      {/* top half: folded down over the bottom, its back showing */}
      <motion.div
        className="absolute inset-x-0"
        style={{ top: 0, height: half, transformOrigin: "50% 100%", transformStyle: "preserve-3d", zIndex: 2 }}
        initial={{ rotateX: -179 }}
        animate={{ rotateX: 0 }}
        transition={UNFOLD}
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
// the other (same entrance as the About page menu cards).
const PENS = [
  { src: pencil, aspect: 77 / 800, len: 1, rotate: 11, dx: -0.16, dy: -0.04, delay: 0.55, alt: "" },
  { src: gelPen, aspect: 76 / 743, len: 0.96, rotate: -6, dx: 0.17, dy: 0.07, delay: 1.25, alt: "" },
];

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
          {/* shadow on a wrapper so it falls the same way whatever the pen's angle */}
          <div className="w-full h-full" style={{ filter: "drop-shadow(5px 9px 7px rgba(48,40,26,0.2)) drop-shadow(1px 2px 1.5px rgba(48,40,26,0.18))" }}>
            <img
              src={p.src}
              alt={p.alt}
              draggable={false}
              className="w-full h-full select-none"
              style={{ transform: `rotate(${p.rotate}deg)` }}
            />
          </div>
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

// "download resume": a lowercase text link in the site's nav style, sitting
// beside the paper along its top edge; fades in once the letter has opened.
const DownloadLink = ({ show, className }: { show: boolean; className: string }) => (
  <motion.a
    href={RESUME_PDF}
    download="Stella-Peng-Resume.pdf"
    onClick={(e) => e.stopPropagation()}
    className={`group/dl absolute inline-flex items-center whitespace-nowrap text-sm text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:underline underline-offset-4 ${className}`}
    initial={{ opacity: 0, filter: "blur(4px)" }}
    animate={show ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
    transition={{ duration: 0.5, ease: EASE }}
  >
    download resume
    <ArrowDown
      size={12}
      aria-hidden="true"
      className="absolute left-full top-1/2 ml-0.5 -translate-y-[60%] opacity-0 transition-all duration-300 ease-out group-hover/dl:opacity-100 group-hover/dl:-translate-y-1/2"
    />
  </motion.a>
);

// Paper unfolding sound, timed so its swish lands as the flaps swing open.
const UNFOLD_SOUND = "/sounds/resume-unfold.mp3";
const UNFOLD_SOUND_DELAY = 350;
let unfoldAudio: HTMLAudioElement | null = null;

const ResumeOverlay = () => {
  const [open, setOpen] = useState(false);
  const [flat, setFlat] = useState(false);
  const [measured, setMeasured] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const vp = useViewport();

  // Tablet+: one fixed page scaled to fit; phones: readable column that scrolls.
  const letter = vp.w >= 640;
  const scale = letter ? Math.min(0.95, (vp.h - 170) / PAGE_H, (vp.w - 48) / PAGE_W) : 1;
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
      setOpen(true);
      if (!unfoldAudio) {
        unfoldAudio = new Audio(UNFOLD_SOUND);
        unfoldAudio.volume = 0.45;
      }
      const a = unfoldAudio;
      window.setTimeout(() => {
        a.currentTime = 0;
        void a.play().catch(() => {});
      }, reduce ? 0 : UNFOLD_SOUND_DELAY);
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

  // Phones: measure the column so the folding thirds match it.
  useLayoutEffect(() => {
    if (!open || letter || !measureRef.current) return;
    const el = measureRef.current;
    const update = () => setMeasured(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, letter]);

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
      {!flat && height > 0 && <FoldingLetter height={height} Sheet={Sheet} onDone={() => setFlat(true)} />}
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
          {pens && <Pens cx={(paperRight + vp.w) / 2 - 20} cy={vp.h / 2 + PAGE_H * scale * 0.08} length={penLength} />}

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
                    {paper}
                  </div>
                ) : (
                  paper
                )}
                <DownloadLink show={flat} className={letter ? "left-full top-0 ml-6 -mt-[3px]" : "right-0 -top-8"} />
              </motion.div>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ResumeOverlay;
