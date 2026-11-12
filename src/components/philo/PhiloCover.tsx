import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import base from "@/assets/philo-cover/base.webp";
import tilesFront from "@/assets/philo-cover/tiles.webp";
import tilesBack from "@/assets/philo-cover/tiles-back.webp";

// The Philo cover, brought to life: the same composition as the Figma cover
// (1325 × 620), with both sheets' component tiles taken off and set back in
// one by one, row by row, like a design system being assembled: the front
// sheet first, the one behind it a beat later. Each tile is a window onto a
// picture of the finished sheet, clipped to that tile's (slightly rotated)
// outline, so it lands exactly where it belongs. The front sheet is laid back
// over the rear tiles, so the ones tucked behind it stay hidden.

const STAGE = { w: 1325, h: 620 };
// the front sheet's outline (it covers the rear sheet's left side)
const FRONT_SHEET: [number, number][] = [[345.7, 124.5], [801.5, 115.2], [812.1, 631.6], [356.3, 641]];
// each sheet's tiles: where the picture of them sits on the stage, and each
// tile's corners from Figma, row by row
type Group = { at: { left: number; top: number; w: number; h: number }; src: string; start: number; quads: [number, number][][] };
const GROUPS: Group[] = [
  {
    at: { left: 360, top: 190, w: 440, h: 395 },
    src: tilesFront,
    start: 0.25,
    quads: [
      [[369, 205.4], [496.2, 202.8], [497.9, 285.4], [370.7, 288]],
      [[511.5, 202.4], [638.8, 199.8], [640.5, 282.5], [513.2, 285.1]],
      [[654.1, 199.5], [781.3, 196.9], [783, 279.6], [655.8, 282.2]],
      [[371, 302.6], [498.2, 299.9], [499.9, 382.6], [372.7, 385.2]],
      [[513.5, 299.6], [640.8, 297], [642.5, 379.7], [515.2, 382.3]],
      [[656.1, 296.7], [783.3, 294.1], [785, 376.7], [657.8, 379.4]],
      [[373, 399.7], [500.2, 397.1], [501.9, 479.8], [374.7, 482.4]],
      [[515.5, 396.8], [642.8, 394.2], [644.5, 476.9], [517.2, 479.5]],
      [[658.1, 393.9], [785.3, 391.3], [787, 473.9], [659.8, 476.5]],
      [[375, 496.9], [502.3, 494.3], [504, 577], [376.7, 579.6]],
      [[517.5, 494], [644.9, 491.4], [646.6, 574.1], [519.2, 576.7]],
      [[660.1, 491], [787.4, 488.4], [789.1, 571.1], [661.8, 573.8]],
    ],
  },
  {
    at: { left: 580, top: 180, w: 430, h: 400 },
    src: tilesBack,
    start: 0.55,
    quads: [
      [[594.5, 186.9], [721.8, 191], [719.1, 273.7], [591.8, 269.6]],
      [[737.2, 191.5], [864.5, 195.7], [861.8, 278.4], [734.5, 274.2]],
      [[879.8, 196.2], [1007.1, 200.4], [1004.4, 283.1], [877.1, 278.9]],
      [[591.4, 284], [718.7, 288.2], [715.9, 370.9], [588.6, 366.7]],
      [[734, 288.7], [861.3, 292.9], [858.6, 375.6], [731.3, 371.4]],
      [[876.6, 293.4], [1003.9, 297.6], [1001.2, 380.3], [873.9, 376.1]],
      [[588.2, 381.2], [715.5, 385.4], [712.8, 468.1], [585.5, 463.9]],
      [[730.8, 385.9], [858.1, 390.1], [855.4, 472.8], [728.1, 468.6]],
      [[873.5, 390.6], [1000.7, 394.8], [998, 477.4], [870.7, 473.3]],
      [[585, 478.4], [712.3, 482.6], [709.6, 565.3], [582.3, 561.1]],
      [[727.6, 483.1], [854.9, 487.3], [852.2, 570], [724.9, 565.8]],
      [[870.3, 487.8], [997.6, 491.9], [994.8, 574.6], [867.6, 570.5]],
    ],
  },
];
// a few units of slack around each tile, so its soft shadow comes with it
const PAD = 5;

// the clip for one tile, in its group picture's own coordinates, grown by PAD
const clipFor = (q: [number, number][], at: Group["at"]) => {
  const cx = q.reduce((s, p) => s + p[0], 0) / 4;
  const cy = q.reduce((s, p) => s + p[1], 0) / 4;
  const pts = q.map(([x, y]) => {
    const dx = x - cx;
    const dy = y - cy;
    const d = Math.hypot(dx, dy);
    return [x + (dx / d) * PAD * 1.4 - at.left, y + (dy / d) * PAD * 1.4 - at.top];
  });
  return { clip: `polygon(${pts.map(([x, y]) => `${x}px ${y}px`).join(", ")})`, origin: `${cx - at.left}px ${cy - at.top}px` };
};
const poly = (q: [number, number][]) => `polygon(${q.map(([x, y]) => `${x}px ${y}px`).join(", ")})`;

/**
 * `page`: the case study's own wide cover (the stage just fits). Otherwise
 * it's the homepage card, which crops in a touch closer on the front sheet,
 * as the card's still did.
 */
const PhiloCover = ({ page = false }: { page?: boolean }) => {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, amount: 0.3 });
  const [fit, setFit] = useState({ s: 0, x: 0, y: 0 });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const s0 = Math.max(W / STAGE.w, H / STAGE.h);
      if (page) {
        setFit({ s: s0, x: (W - STAGE.w * s0) / 2, y: (H - STAGE.h * s0) / 2 });
      } else {
        // the card: a little closer, centred on the front sheet's upper half
        const s = s0 * 1.05;
        const fx = 0.512 * STAGE.w;
        const fy = 0.543 * STAGE.h;
        // …but never so far that an edge of the stage shows inside the card
        const clamp = (v: number, min: number) => Math.min(0, Math.max(min, v));
        setFit({ s, x: clamp(W / 2 - fx * s, W - STAGE.w * s), y: clamp(H / 2 - fy * s, H - STAGE.h * s) });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [page]);

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden bg-[#E9DCCB]" role="img" aria-label="The Philo Homes design system: component tiles assembling on the sheet">
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: STAGE.w, height: STAGE.h, transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.s})` }}
      >
        <img src={base} alt="" draggable={false} className="absolute inset-0 w-full h-full" />
        {GROUPS.map((g, gi) => (
          <div key={gi}>
            {/* the front sheet, laid back over the rear tiles (it hides the ones behind it) */}
            {gi === 1 && (
              <img
                src={base}
                alt=""
                draggable={false}
                className="absolute inset-0 w-full h-full"
                style={{ clipPath: poly(FRONT_SHEET), zIndex: 1 }}
              />
            )}
            <div
              className="absolute"
              style={{ left: g.at.left, top: g.at.top, width: g.at.w, height: g.at.h, zIndex: gi === 0 ? 2 : 0 }}
            >
              {g.quads.map((q, i) => {
                const c = clipFor(q, g.at);
                const delay = g.start + i * 0.09;
                return (
                  <img
                    key={i}
                    src={g.src}
                    alt=""
                    draggable={false}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      clipPath: c.clip,
                      transformOrigin: c.origin,
                      opacity: inView ? 1 : 0,
                      transform: inView ? "none" : "translateY(10px) scale(0.94)",
                      // plain CSS transitions (no end-of-animation flicker), one tile after another
                      transition: `opacity 0.5s ease-out ${delay}s, transform 0.7s cubic-bezier(0.34, 1.35, 0.64, 1) ${delay}s`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhiloCover;
