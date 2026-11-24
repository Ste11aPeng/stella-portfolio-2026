import { motion } from "framer-motion";
import type { CSSProperties } from "react";

// A margin note in the polaroids' hand: the words write themselves out left to
// right, then a little arrow draws from them toward what they point at (shaft
// first, head last). `arrow` says which way it points; `at` places the note.
// It plays when it scrolls into view, or, with `onMount`, as soon as it's
// rendered (for notes that come and go with what's on screen).
const INK = "#2b2b2b";
const ARROWS = {
  // from the end of the words, out to the right and down
  right: { shaft: "M4 6 C 18 6, 32 12, 42 26", head: "M33.5 25 L 42 26 L 40 17.5" },
  // from the start of the words, out to the left and up
  left: { shaft: "M42 28 C 30 26, 16 18, 6 6", head: "M5.5 15 L 6 6 L 14.5 9.5" },
};

const Scribble = ({
  lines, arrow, delay = 0, at, className = "", onMount = false,
}: { lines: string[]; arrow: "left" | "right"; delay?: number; at?: CSSProperties; className?: string; onMount?: boolean }) => {
  // play on scroll-in, or straight away
  const play = (to: object) =>
    onMount ? { animate: to } : { whileInView: to, viewport: { once: true, margin: "-40px" } };
  const write = 0.35 * lines.length + 0.6; // longer notes take longer to write
  const svg = (
    <svg width="46" height="32" viewBox="0 0 46 32" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" className="shrink-0 mt-3" aria-hidden="true">
      <motion.path
        d={ARROWS[arrow].shaft}
        initial={{ pathLength: 0 }}
        {...play({ pathLength: 1 })}
        transition={{ duration: 0.45, ease: "easeInOut", delay: delay + write }}
      />
      <motion.path
        d={ARROWS[arrow].head}
        initial={{ pathLength: 0 }}
        {...play({ pathLength: 1 })}
        transition={{ duration: 0.22, ease: "easeOut", delay: delay + write + 0.47 }}
      />
    </svg>
  );
  return (
    <div className={`flex items-start gap-1 ${className}`} style={at}>
      {arrow === "left" && svg}
      <motion.p
        className={`text-[22px] leading-[1.05] pb-1 ${arrow === "right" ? "text-right" : ""}`}
        style={{ color: INK, fontFamily: "'Caveat', cursive", fontWeight: 500, rotate: arrow === "right" ? -2 : 2 }}
        initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
        {...play({ clipPath: "inset(-20% 0% -20% 0)" })}
        transition={{ duration: write, ease: [0.45, 0.05, 0.55, 0.95], delay }}
      >
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </motion.p>
      {arrow === "right" && svg}
    </div>
  );
};

export default Scribble;
