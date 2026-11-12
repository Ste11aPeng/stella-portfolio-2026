import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import logo from "@/assets/tiktok/widget/drop/logo.webp";
import createS from "@/assets/tiktok/widget/drop/create-s.webp";
import lightSBubble from "@/assets/tiktok/widget/drop/light-s-bubble.webp";
import lightMBubbles from "@/assets/tiktok/widget/drop/light-m-bubbles.webp";
import darkMBubbles from "@/assets/tiktok/widget/drop/dark-m-bubbles.webp";

// The Stories widget cover: four of the widget's variants (small and medium,
// light and dark, "Create a Story") laid out as a bento,
// the way they'd sit on a home screen, centred in the frame with the TikTok
// logo in the top-right corner. They pop in one after another when the cover
// comes into view; on the case study's own cover each lifts a little on hover.

// iOS home-screen geometry, in Figma units: a small widget is one 164 cell, a
// medium spans two (349 = 2 × 164 + the 21 gap), corners are 28
const CELL = 164;
const GAP = 21;
const COLS = 3;
const ROWS = 2;
const GRID_W = COLS * CELL + (COLS - 1) * GAP; // 534
const GRID_H = ROWS * CELL + (ROWS - 1) * GAP; // 349

// two rows, light and dark crossing diagonally
const LAYOUT: { src: string; col: number; row: number; span: 1 | 2 }[] = [
  { src: lightMBubbles, col: 0, row: 0, span: 2 },
  { src: createS, col: 2, row: 0, span: 1 },
  { src: lightSBubble, col: 0, row: 1, span: 1 },
  { src: darkMBubbles, col: 1, row: 1, span: 2 },
];

const at = (n: number) => n * (CELL + GAP);

const WidgetBento = ({ interactive = false, delay = 0 }: { interactive?: boolean; delay?: number }) => {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const [scale, setScale] = useState(0);

  // the grid takes about half the frame, whichever side is tighter
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min((el.clientWidth * 0.5) / GRID_W, (el.clientHeight * 0.48) / GRID_H));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const show = inView || !!reduce;

  return (
    <div
      ref={box}
      className="absolute inset-0 overflow-hidden bg-[#F7F7F7]"
      role="img"
      aria-label="TikTok Stories widgets in every size and style, laid out like a home screen"
    >
      {/* the logo, sized to the grid, in the top-right corner */}
      <img
        src={logo}
        alt=""
        draggable={false}
        className="absolute pointer-events-none"
        style={{ top: "6%", right: "4.5%", width: 48 * scale, height: "auto" }}
      />

      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: GRID_W, height: GRID_H, transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {LAYOUT.map((w, i) => {
          const width = w.span === 2 ? CELL * 2 + GAP : CELL;
          return (
            // (a plain CSS transition: framer's spring flips the opacity back to 0
            // for one frame as it finishes, which showed as a flash)
            <div
              key={i}
              className="absolute"
              style={{
                left: at(w.col),
                top: at(w.row),
                width,
                height: CELL,
                opacity: show ? 1 : 0,
                transform: show ? "none" : "translateY(18px) scale(0.86)",
                transition: reduce
                  ? "none"
                  : `opacity 0.45s ease-out ${delay + 0.07 * i}s, transform 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) ${delay + 0.07 * i}s`,
              }}
            >
              <img
                src={w.src}
                alt=""
                draggable={false}
                className={`block w-full h-full transition-transform duration-300 ease-out ${interactive ? "hover:-translate-y-1.5" : ""}`}
                // the shadow follows the picture's own rounded edge (a box-shadow's square-ish
                // corner would peek out past it as a dark rim)
                style={{ filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.10)) drop-shadow(0 1px 2px rgba(0,0,0,0.05))" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WidgetBento;
