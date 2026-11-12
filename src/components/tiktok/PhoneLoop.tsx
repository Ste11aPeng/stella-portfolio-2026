import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// The shared rig for the small looping phone demos of the explored options:
// a 169 × 365 phone (the Figma frame's own units) scaled to fit its box, and a
// clock that runs while the phone is on screen and its screens are decoded.

// Whether the demo's carousel slide is the one in view. A slide only peeking in
// from the side stays parked on its first frame; arriving on it starts the
// loop from the top.
export const SlideActive = createContext(true);

export const W = 169;
export const H = 365;
// The explored options show only the top of the phone, as their stills did:
// the first 255.6 units (a 560 × 847 crop of the full-width screen), its lower
// edge dissolving into the panel.
export const CROP = 255.6;
const FADE = "linear-gradient(to bottom, black 60%, transparent 100%)";
// the iOS push: fast out of the gate, settling gently
export const PUSH_CSS = "0.5s cubic-bezier(0.32, 0.72, 0, 1)";

export const usePhoneLoop = (end: number, images: string[], visible = H) => {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const inView = useInView(box, { amount: 0.2 });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0); // seconds into the current loop

  // decode every screen first, so no layer slides in still blank
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    Promise.all(
      images.map((src) => {
        const img = new Image();
        img.src = src;
        return img.decode().catch(() => undefined);
      })
    ).then(() => live && setReady(true));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(el.clientWidth / W, el.clientHeight / visible));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const active = useContext(SlideActive);
  const run = inView && ready && !reduce && active;
  // leaving the slide rewinds it, so the next visit starts at the beginning
  useEffect(() => {
    if (!active) setT(0);
  }, [active]);
  useEffect(() => {
    if (!run) return;
    const start = performance.now() - t * 1000;
    const id = window.setInterval(() => setT(((performance.now() - start) / 1000) % end), 50);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  return { box, scale, t, reduce };
};

// The phone, centred in its box; or, with `crop`, only its top that many
// units tall, pinned to the top of the box and fading out at the bottom.
export const PhoneFrame = ({
  box, scale, label, crop, children,
}: { box: RefObject<HTMLDivElement>; scale: number; label: string; crop?: number; children: ReactNode }) => (
  <div ref={box} className="relative w-full h-full" role="img" aria-label={label}>
    <div
      className="absolute left-1/2"
      style={
        crop
          ? {
              top: 0,
              width: W,
              height: crop,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: "top center",
              overflow: "hidden",
              borderRadius: "22px 22px 0 0",
              maskImage: FADE,
              WebkitMaskImage: FADE,
            }
          : { top: "50%", width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: "center" }
      }
    >
      <div
        className="absolute left-0 top-0 overflow-hidden bg-white"
        style={{ width: W, height: H, borderRadius: 22, fontFamily: "'TikTok Sans', system-ui, -apple-system, sans-serif" }}
      >
        {children}
      </div>
    </div>
  </div>
);
