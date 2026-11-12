import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import profile from "@/assets/tiktok/view/profile.webp";
import cover from "@/assets/tiktok/view/cover.webp";
import story1 from "@/assets/tiktok/view/story1.webp";
import story2 from "@/assets/tiktok/view/story2.webp";
import story3 from "@/assets/tiktok/view/story3.webp";
import repost1 from "@/assets/tiktok/view/repost1.webp";
import repost2 from "@/assets/tiktok/view/repost2.webp";
import repost3 from "@/assets/tiktok/view/repost3.webp";
import { Tap } from "./AddFlowDemo";

// Watching a highlight that holds reposts, played on a phone: the "Photos"
// highlight on a profile opens on its title, plays two stories, then two
// reposts in the framed middle card with the reposter's note above, and closes
// back into its circle. Same 169 × 365 phone and scaling as the add-flow demo;
// the six screens are exported from the Figma deliverable.

const W = 169;
const H = 365;
const K = W / 390; // Figma frame units → phone units
const CIRCLE = { x: 42 * K, y: 297 * K }; // the "Photos" highlight on the profile
const CLOSE = { x: 362 * K, y: 97 * K }; // the × in the viewer
const NEXT = { x: 330 * K, y: 430 * K }; // a tap on the right half moves on
const SCREENS = [cover, story1, story2, story3, repost1, repost2, repost3];
// the progress bar along the top: six segments, as in Figma (390-wide units)
const SEG = { y: 64 * K, h: 4 * K, w: 57.7 * K, x0: 12 * K, step: 61.68 * K, count: 6 };
// which segment each screen plays in: the title rides on the first story, then
// one segment per story and per repost
const SEG_OF = [0, 0, 1, 2, 3, 4, 5];
// how long a segment would take to fill if left alone: the full-screen stories
// are tapped through quickly, the reposts are given longer
const FILL_SECONDS = [2.2, 2.2, 2.2, 4.2, 4.2, 4.2];
const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

// the script, in seconds from the start of a loop
const T = {
  tapOpen: 1.0,
  open: 1.25, // the highlight grows out of its circle
  // when each screen comes up: title, three quick stories, three slower reposts
  shows: [1.25, 1.85, 3.05, 4.25, 5.45, 8.05, 10.65],
  nexts: [2.9, 4.1, 5.3, 7.9, 10.5], // taps that move it on
  tapClose: 13.1,
  close: 13.3, // it shrinks back into the circle
  end: 14.7,
};

const ViewFlowDemo = () => {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const inView = useInView(box, { amount: 0.2 });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  // decode every screen before the first play, so the viewer never opens onto
  // a frame where its pictures aren't painted yet
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    Promise.all(
      [profile, ...SCREENS].map((src) => {
        const img = new Image();
        img.src = src;
        return img.decode().catch(() => undefined);
      })
    ).then(() => live && setReady(true));
    return () => {
      live = false;
    };
  }, []);
  const run = inView && ready && !reduce;

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(el.clientWidth / W, el.clientHeight / H));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    const start = performance.now() - t * 1000;
    const id = window.setInterval(() => setT(((performance.now() - start) / 1000) % T.end), 50);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  // reduced motion: a still of the first repost, the screen this is about
  const now = reduce ? T.shows[3] + 0.5 : t;
  const open = now >= T.open && now < T.close;
  const settled = now >= T.open + 0.5 && now < T.close; // viewer fully covers the profile
  const current = SCREENS.reduce((acc, _, i) => (now >= T.shows[i] ? i : acc), 0);
  const instant = now < 0.3;
  const tapping = (at: number) => now >= at && now < at + 0.55;
  const seg = SEG_OF[current];
  // the active segment starts filling when its first screen comes up
  const segStart = T.shows[SEG_OF.indexOf(seg)];
  const fill = Math.min(1, Math.max(0, (now - segStart) / FILL_SECONDS[seg]));

  return (
    <div
      ref={box}
      className="relative w-full h-full"
      role="img"
      aria-label="Animation: opening a highlight from the profile, two stories, then two reposts shown as framed cards with the reposter's note, and closing it"
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: "center" }}
      >
        <div className="absolute inset-0 overflow-hidden bg-white" style={{ borderRadius: 22 }}>
          {/* the profile, hidden while the viewer covers it so no edge of it shows */}
          <img
            src={profile}
            alt=""
            draggable={false}
            className="absolute left-0 top-0"
            style={{ width: W, height: H, opacity: settled ? 0 : 1 }}
          />

          {/* the highlight viewer, growing out of (and back into) the circle */}
          {/* (plain CSS transitions here: framer's opacity fades flip back to their
              start value for one frame as they finish, which read as a flash) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              transformOrigin: `${CIRCLE.x}px ${CIRCLE.y}px`,
              transform: `scale(${open ? 1 : 0.12})`,
              opacity: open ? 1 : 0,
              borderRadius: open ? 0 : 60,
              transition: instant ? "none" : `transform ${open ? 0.45 : 0.4}s ${EASE_CSS}, opacity ${open ? 0.45 : 0.4}s ${EASE_CSS}, border-radius ${open ? 0.45 : 0.4}s ${EASE_CSS}`,
            }}
          >
            {SCREENS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                draggable={false}
                className="absolute left-0 top-0"
                style={{
                  width: W,
                  height: H,
                  zIndex: i === 0 ? 20 : i,
                  // each screen fades in over the one before (which stays put underneath,
                  // so nothing dips to black); the title cover is the exception: it is
                  // the top layer and simply fades away to reveal the first story
                  opacity: i === 0 ? (current === 0 ? 1 : 0) : i === 1 || i <= current ? 1 : 0,
                  transition: instant ? "none" : i === 0 ? "opacity 0.7s ease-out" : "opacity 0.25s ease",
                }}
              />
            ))}

            {/* the progress bar: finished segments full, the playing one growing */}
            {Array.from({ length: SEG.count }).map((_, i) => (
              <div
                key={`seg-${i}`}
                className="absolute overflow-hidden rounded-full"
                style={{ left: SEG.x0 + i * SEG.step, top: SEG.y, width: SEG.w, height: SEG.h, background: "rgba(255,255,255,0.34)", zIndex: 30 }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(i < seg ? 1 : i === seg ? fill : 0) * 100}%`,
                    background: "rgba(255,255,255,0.9)",
                    transition: i === seg && fill > 0 ? "width 60ms linear" : "none",
                  }}
                />
              </div>
            ))}
          </div>

          <AnimatePresence>
            {tapping(T.tapOpen) && <Tap key="tap-open" x={CIRCLE.x} y={CIRCLE.y} />}
            {T.nexts.map((s, i) => tapping(s) && <Tap key={`tap-next-${i}`} x={NEXT.x} y={NEXT.y} />)}
            {tapping(T.tapClose) && <Tap key="tap-close" x={CLOSE.x} y={CLOSE.y} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ViewFlowDemo;
