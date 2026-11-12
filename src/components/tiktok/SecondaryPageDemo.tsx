import { AnimatePresence } from "framer-motion";
import main from "@/assets/tiktok/options/secondary-main.webp";
import allStory from "@/assets/tiktok/options/secondary-all.webp";
import { Tap } from "./AddFlowDemo";
import { CROP, PhoneFrame, PUSH_CSS, W, H, usePhoneLoop } from "./PhoneLoop";

// The explored "secondary page" structure, played on a phone: Add to Highlight
// shows a few stories and reposts; tapping the "All Story" tile pushes the full
// story list in from the right, and the back arrow pops it again, on a loop.
// Both screens are exported whole from Figma.

const ALL_STORY = { x: 137, y: 143.5 }; // the "All Story" tile's label
const BACK = { x: 10, y: 29.3 }; // the back arrow on the All Story page

const T = {
  tapAll: 1.5,
  push: 1.75,
  tapBack: 4.9,
  pop: 5.15,
  end: 7.4,
};

const IMAGES = [main, allStory];

const SecondaryPageDemo = () => {
  const { box, scale, t, reduce } = usePhoneLoop(T.end, IMAGES, CROP);
  // reduced motion: a still of the first screen, with the All Story tile
  const now = reduce ? 0 : t;
  const pushed = now >= T.push && now < T.pop;
  const tapping = (at: number) => now >= at && now < at + 0.55;

  return (
    <PhoneFrame
      box={box}
      scale={scale}
      crop={CROP}
      label="Animation: Add to Highlight shows a few stories with an All Story tile; tapping it opens the full story list on its own page, and back returns"
    >
      {/* the first page eases a little to the left as the next one covers it */}
      <img
        src={main}
        alt=""
        draggable={false}
        className="absolute left-0 top-0"
        style={{ width: W, height: H, transform: `translateX(${pushed ? -0.3 * W : 0}px)`, transition: `transform ${PUSH_CSS}` }}
      />
      <div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: pushed ? 0.08 : 0, transition: `opacity ${PUSH_CSS}` }}
      />
      <img
        src={allStory}
        alt=""
        draggable={false}
        className="absolute left-0 top-0"
        style={{
          width: W,
          height: H,
          // parked just past the edge, so its shadow never shows while it waits
          transform: `translateX(${pushed ? 0 : W + 16}px)`,
          transition: `transform ${PUSH_CSS}`,
          boxShadow: "-4px 0 12px rgba(0,0,0,0.08)",
        }}
      />

      <AnimatePresence>
        {tapping(T.tapAll) && <Tap key="tap-all" x={ALL_STORY.x} y={ALL_STORY.y} />}
        {tapping(T.tapBack) && <Tap key="tap-back" x={BACK.x} y={BACK.y} />}
      </AnimatePresence>
    </PhoneFrame>
  );
};

export default SecondaryPageDemo;
