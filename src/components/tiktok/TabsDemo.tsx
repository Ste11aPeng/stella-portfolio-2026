import { AnimatePresence } from "framer-motion";
import base from "@/assets/tiktok/options/tabs-base.webp";
import storiesGrid from "@/assets/tiktok/options/tabs-stories.webp";
import repostsGrid from "@/assets/tiktok/options/tabs-reposts.webp";
import { Tap } from "./AddFlowDemo";
import { CROP, PhoneFrame, PUSH_CSS, W, usePhoneLoop } from "./PhoneLoop";

// The explored "tabs" structure, played on a phone: the highlight page opens
// on the Stories tab; a tap on the repost tab slides the grid over to reposts,
// and a tap back slides it home again, on a loop. The page (status bar, title,
// Add bar) and the two grids are exported from Figma; the tab bar is drawn
// here so its states can change.

// where Figma puts things, in the 169-wide frame
const GRID_TOP = 61.9; // under the tab bar
const GRID_BOTTOM = 324.4; // the Add bar
const TABS = [
  { x: 29.8, content: 35.0 }, // stories
  { x: 107.5, content: 112.7 }, // reposts
];
const TAB_Y = 48.1;
const TAB_W = 31;
const INDICATOR_Y = 60.7;

const T = {
  tapReposts: 1.4,
  toReposts: 1.65,
  tapStories: 4.2,
  toStories: 4.45,
  end: 6.0, // about as long on each tab
};

// the two tab glyphs, traced from Figma's icons, drawn in currentColor
const PlayIcon = () => (
  <svg width="8.65" height="8.65" viewBox="0 0 8.65144 8.65144" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M0 2.76846C0 1.79941 0 1.31488 0.18859 0.944754C0.354479 0.619179 0.619179 0.354479 0.944754 0.18859C1.31488 0 1.79941 0 2.76846 0H5.88298C6.85203 0 7.33656 0 7.70669 0.18859C8.03226 0.354479 8.29696 0.619179 8.46285 0.944754C8.65144 1.31488 8.65144 1.79941 8.65144 2.76846V5.88298C8.65144 6.85203 8.65144 7.33656 8.46285 7.70669C8.29696 8.03226 8.03226 8.29696 7.70669 8.46285C7.33656 8.65144 6.85203 8.65144 5.88298 8.65144H2.76846C1.79941 8.65144 1.31488 8.65144 0.944754 8.46285C0.619179 8.29696 0.354479 8.03226 0.18859 7.70669C0 7.33656 0 6.85203 0 5.88298V2.76846ZM3.46939 2.63014C3.32545 2.5376 3.13615 2.64095 3.13615 2.81207V5.91289C3.13615 6.08401 3.32545 6.18736 3.46939 6.09483L5.88114 4.54442C6.01358 4.45928 6.01358 4.26569 5.88114 4.18055L3.46939 2.63014Z"
    />
  </svg>
);

const RepostIcon = () => (
  <svg width="10.27" height="8.31" viewBox="0 0 10.2699 8.30678" fill="currentColor" aria-hidden="true">
    <path d="M7.53805 3.38341V5.45111H6.16478C5.8876 5.45111 5.73807 5.77622 5.91845 5.98667L7.7264 8.09594C7.89903 8.29735 8.21063 8.29735 8.38326 8.09594L10.1912 5.98667C10.3716 5.77622 10.2221 5.45111 9.94488 5.45111H8.70369L8.70369 3.3595C8.7037 2.90596 8.69934 2.42066 8.67429 2.13051C8.64824 1.79648 8.59224 1.5183 8.451 1.24163C8.23257 0.813746 7.88404 0.46587 7.45535 0.247853C7.17815 0.10688 6.88355 0.0509839 6.56479 0.0249882C6.25827 -8.79372e-06 6.20004 -7.7624e-06 5.74591 2.81986e-07H5.03713C4.86497 2.81986e-07 4.72555 0.139387 4.72555 0.311328V0.852118C4.72555 1.02406 4.86496 1.16344 5.03712 1.16344H5.72164C6.20604 1.16344 6.21638 1.1639 6.46987 1.18457C6.71655 1.20469 6.84067 1.24101 6.92616 1.28449C7.13552 1.39096 7.30573 1.56085 7.41241 1.76982C7.45597 1.83928 7.49236 1.97904 7.51252 2.22526C7.53323 2.47826 7.53805 2.89993 7.53805 3.38341Z" />
    <path d="M2.73189 2.85567H4.10516C4.38234 2.85567 4.53187 2.53056 4.35148 2.32011L2.54354 0.21084C2.3709 0.00942944 2.05931 0.00942965 1.88667 0.21084L0.0787309 2.32011C-0.101654 2.53056 0.0478789 2.85567 0.325056 2.85567H1.56625L1.56625 4.94728C1.56624 5.40082 1.5706 5.88612 1.59565 6.17626C1.6217 6.51029 1.6777 6.78848 1.81894 7.06515C2.03736 7.49303 2.3859 7.84091 2.81459 8.05892C3.09178 8.1999 3.38639 8.25579 3.70515 8.28179C4.01168 8.30679 4.0699 8.30678 4.52406 8.30678H5.2328C5.40496 8.30678 5.54439 8.16739 5.54439 7.99545V7.45466C5.54439 7.28272 5.40498 7.14333 5.23282 7.14333H4.5483C4.0639 7.14333 4.05356 7.14288 3.80007 7.12221C3.55339 7.10209 3.42926 7.06577 3.34378 7.02229C3.13442 6.91582 2.9642 6.74592 2.85753 6.53696C2.81397 6.4675 2.77758 6.32774 2.75742 6.08152C2.73671 5.82851 2.73189 5.40685 2.73189 4.92336V2.85567Z" />
  </svg>
);

const IMAGES = [base, storiesGrid, repostsGrid];

const TabsDemo = () => {
  const { box, scale, t, reduce } = usePhoneLoop(T.end, IMAGES, CROP);
  // reduced motion: a still of the reposts tab, the part this option adds
  const now = reduce ? T.toReposts + 1 : t;
  const active = now >= T.toReposts && now < T.toStories ? 1 : 0;
  const tapping = (at: number) => now >= at && now < at + 0.55;
  // inactive tabs are the same glyphs, faded as in Figma (icon 34%, count 48%)
  const tone = (i: number, alpha: number) => ({
    color: `rgba(0,0,0,${i === active ? 1 : alpha})`,
    transition: "color 0.3s ease",
  });

  return (
    <PhoneFrame
      box={box}
      scale={scale}
      crop={CROP}
      label="Animation: the highlight page with Stories and Reposts as two tabs; tapping a tab slides the grid between stories and reposts"
    >
      <img src={base} alt="" draggable={false} className="absolute left-0 top-0" style={{ width: W, height: 365 }} />

      {/* the two grids side by side, slid under a window between the tabs and the Add bar */}
      <div className="absolute left-0 overflow-hidden" style={{ top: GRID_TOP, width: W, height: GRID_BOTTOM - GRID_TOP }}>
        <div
          className="absolute left-0 top-0 flex"
          style={{ width: W * 2, transform: `translateX(${-active * W}px)`, transition: `transform ${PUSH_CSS}` }}
        >
          <img src={storiesGrid} alt="" draggable={false} style={{ width: W, height: "auto" }} />
          <img src={repostsGrid} alt="" draggable={false} style={{ width: W, height: "auto" }} />
        </div>
      </div>

      {/* the tab bar: a glyph and a count per tab, and the line under the open one */}
      {TABS.map((tab, i) => (
        <div key={i}>
          <div className="absolute flex items-center justify-center" style={{ left: tab.content, top: TAB_Y, width: 10.4, height: 10.4, ...tone(i, 0.34) }}>
            {i === 0 ? <PlayIcon /> : <RepostIcon />}
          </div>
          <span
            className="absolute whitespace-nowrap"
            style={{ left: tab.content + 12.1, top: TAB_Y + 1.2, fontSize: 7, lineHeight: "8px", fontWeight: 500, ...tone(i, 0.48) }}
          >
            (0)
          </span>
        </div>
      ))}
      <div
        className="absolute bg-black"
        style={{ left: TABS[active].x, top: INDICATOR_Y, width: TAB_W, height: 0.9, transition: `left ${PUSH_CSS}` }}
      />

      <AnimatePresence>
        {tapping(T.tapReposts) && <Tap key="tap-reposts" x={TABS[1].x + TAB_W / 2} y={TAB_Y + 5} />}
        {tapping(T.tapStories) && <Tap key="tap-stories" x={TABS[0].x + TAB_W / 2} y={TAB_Y + 5} />}
      </AnimatePresence>
    </PhoneFrame>
  );
};

export default TabsDemo;
