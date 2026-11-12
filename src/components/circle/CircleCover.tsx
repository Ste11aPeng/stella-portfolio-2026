import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import plate from "@/assets/circle-cover/plate.webp";
import phoneLeft from "@/assets/circle-cover/phone-left.webp";
import phoneRight from "@/assets/circle-cover/phone-right.webp";
import device from "@/assets/circle-cover/device.webp";

// The Circle Status cover, brought to life: the same composition as the Figma
// cover (1193 × 671), taken apart into layers. The backdrop (with the Michigan
// mark) stays put; the big pale "Circle Status" behind everything drifts left
// like a marquee, on a loop; the two phones and
// the device float on their own slow rhythms, and the device's light breathes
// a warm glow, like the status light it is. Everything is placed in the
// Figma frame's own units and the stage is scaled to cover its box.

const STAGE = { w: 1193, h: 671 };
// the phones mockup, rotated as in Figma; each phone is cut out of it
const PHONES = { left: -47, top: 154.4, w: 1005.17, h: 753.88, rot: -9.818 };
const LEFT = { left: 259.15, top: 51.04, w: 298.41, h: 453.5 };
const RIGHT = { left: 422.09, top: 280.74, w: 335.71, h: 424.06 };
const DEVICE = { left: 789.3, top: 157.16, w: 206.58, h: 360.34, rot: 10.08 };
// the big type, as set in Figma: Poppins SemiBold 198, -3% tracking, grey at
// 17%, starting just off the left edge; the tallest letter tops out at y 523.5
const TYPE = { left: -48, top: 501.7, size: 198 };

const CSS = `
@keyframes cs-float-a { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-9px) } }
@keyframes cs-float-b { 0%, 100% { transform: translateY(-3px) } 50% { transform: translateY(9px) } }
@keyframes cs-bob { 0%, 100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-14px) rotate(-2.5deg) } }
@keyframes cs-glow { 0%, 100% { opacity: 0.3; transform: scale(0.9) } 50% { opacity: 0.85; transform: scale(1.08) } }
@keyframes cs-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
@media (prefers-reduced-motion: reduce) { .cs-anim { animation: none !important } }
`;

const CircleCover = () => {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { once: true, amount: 0.3 });
  const [fit, setFit] = useState({ s: 0, x: 0, y: 0 });

  // scale the stage to cover the box, centred
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const s = Math.max(W / STAGE.w, H / STAGE.h);
      setFit({ s, x: (W - STAGE.w * s) / 2, y: (H - STAGE.h * s) / 2 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // the moving layers rise into place once, then keep floating
  const enter = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(24px)",
    transition: `opacity 0.8s ease-out ${delay}s, transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
  });

  return (
    <div
      ref={box}
      className="absolute inset-0 overflow-hidden bg-[#F2F2F2]"
      role="img"
      aria-label="Circle Status: the app on two phones and the home device, floating"
    >
      <style>{CSS}</style>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: STAGE.w, height: STAGE.h, transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.s})` }}
      >
        <img src={plate} alt="" draggable={false} className="absolute inset-0 w-full h-full" />

        {/* the marquee: two copies of the words side by side, slid by one copy's width */}
        <div
          className="cs-anim absolute flex whitespace-nowrap pointer-events-none"
          style={{ left: TYPE.left, top: TYPE.top, animation: "cs-marquee 45s linear infinite" }}
          aria-hidden="true"
        >
          {[0, 1].map((k) => (
            <span
              key={k}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: TYPE.size,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "rgba(181, 181, 181, 0.17)",
                // the same breath between one "Circle Status" and the next
                // as a little more than the space between its two words
                paddingRight: "0.45em",
              }}
            >
              Circle Status
            </span>
          ))}
        </div>

        {/* the two phones */}
        <div
          className="absolute origin-top-left"
          style={{ left: PHONES.left, top: PHONES.top, width: PHONES.w, height: PHONES.h, transform: `rotate(${PHONES.rot}deg)` }}
        >
          <div className="absolute inset-0" style={enter(0.1)}>
            <img
              src={phoneLeft}
              alt=""
              draggable={false}
              className="cs-anim absolute"
              style={{ ...LEFT, width: LEFT.w, height: LEFT.h, animation: "cs-float-a 6s ease-in-out infinite" }}
            />
          </div>
          <div className="absolute inset-0" style={enter(0.25)}>
            <img
              src={phoneRight}
              alt=""
              draggable={false}
              className="cs-anim absolute"
              style={{ ...RIGHT, width: RIGHT.w, height: RIGHT.h, animation: "cs-float-b 7s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* the device, with its light glowing behind it */}
        <div
          className="absolute origin-top-left"
          style={{ left: DEVICE.left, top: DEVICE.top, width: DEVICE.w, height: DEVICE.h, transform: `rotate(${DEVICE.rot}deg)` }}
        >
          <div className="absolute inset-0" style={enter(0.4)}>
            <div className="cs-anim absolute inset-0" style={{ animation: "cs-bob 5.5s ease-in-out infinite" }}>
              <div
                className="cs-anim absolute rounded-full pointer-events-none"
                style={{
                  left: DEVICE.w * 0.4 - 120,
                  top: DEVICE.h * 0.65 - 120,
                  width: 240,
                  height: 240,
                  background: "radial-gradient(circle, rgba(255, 205, 105, 0.6) 0%, rgba(255, 205, 105, 0) 65%)",
                  filter: "blur(6px)",
                  animation: "cs-glow 2.6s ease-in-out infinite",
                }}
              />
              <img src={device} alt="" draggable={false} className="absolute inset-0 w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleCover;
