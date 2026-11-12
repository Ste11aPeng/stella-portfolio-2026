import { useEffect, useRef, useState } from "react";
import logo from "@/assets/tiktok/widget/drop/logo.webp";
import AddFlowDemo from "./AddFlowDemo";
import ViewFlowDemo from "./ViewFlowDemo";

// The Interest Highlights cover: the two flows from the case study, each
// looping on its phone side by side (adding reposts to a highlight, then
// watching one), on the same pale ground and with the logo in the same corner
// as the Stories widget cover, so the two TikTok covers read as a pair.

// the widget cover's grid, used here only to size the logo identically
const GRID = { w: 534, h: 349 };
const SHADOW = "drop-shadow(0 10px 24px rgba(0,0,0,0.10)) drop-shadow(0 1px 2px rgba(0,0,0,0.05))";

const HighlightsCover = () => {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min((el.clientWidth * 0.5) / GRID.w, (el.clientHeight * 0.48) / GRID.h));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={box} className="absolute inset-0 overflow-hidden bg-[#F7F7F7]">
      <img
        src={logo}
        alt=""
        draggable={false}
        className="absolute pointer-events-none"
        style={{ top: "6%", right: "4.5%", width: 48 * scale, height: "auto" }}
      />
      {/* two phones, each 72% of the frame's height, a little apart, with the
          same soft shadow as the widgets (it follows the phone's rounded edge) */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ gap: "5%" }}>
        <div className="h-[72%] aspect-[169/365]" style={{ filter: SHADOW }}>
          <AddFlowDemo />
        </div>
        <div className="h-[72%] aspect-[169/365]" style={{ filter: SHADOW }}>
          <ViewFlowDemo />
        </div>
      </div>
    </div>
  );
};

export default HighlightsCover;
