import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import header from "@/assets/tiktok/flow/header.webp";
import storiesTitle from "@/assets/tiktok/flow/stories-title.webp";
import storiesGrid from "@/assets/tiktok/flow/stories-grid.webp";
import repostsTitle from "@/assets/tiktok/flow/reposts-title.webp";
import repostsGrid from "@/assets/tiktok/flow/reposts-grid.webp";
import storiesBadges from "@/assets/tiktok/flow/stories-badges.webp";
import repostsBadges from "@/assets/tiktok/flow/reposts-badges.webp";
import profile from "@/assets/tiktok/flow/profile.webp";
import newHighlight from "@/assets/tiktok/flow/new-highlight.webp";

// The chosen "one scrolling page" add flow, played on a phone: from the
// profile, "New" opens Add to Highlight; a few stories are picked and the tray
// of picks rises from the bottom; "See reposts" (offered once something is
// picked) glides the page down to the reposts; a couple of reposts join the
// tray; Add opens the cover-and-name step, which fades out into the next loop.
//
// Everything is laid out in the Figma frame's own units (a 169 × 365 phone),
// then the whole phone is scaled to fit its box. The grids are exported from
// Figma in two layers, the photos and (on top, transparent) the badges: dates,
// repost counts, notes, the bottom shade. A picked tile's photo zooms in while
// its badges stay put. The circles, ticks, tray and button are drawn here so
// they can move.

const W = 169;
const H = 365;
const RED = "#FE2C55";
const HEAD = 39; // status bar + nav
const CTA_TOP = 291; // where the tray + Add bar sits once it's up
const GRID_X = 7;
const GRID_W = 154.5;
const STORIES_Y = 19; // below the "Stories" row
const STORIES_H = 280; // four full rows
const REPOSTS_TITLE_Y = STORIES_Y + STORIES_H + 3;
const REPOSTS_Y = REPOSTS_TITLE_Y + 20;
const REPOSTS_H = 253.5;
const COLS = [0, 52, 105];
const ROWS = [0, 71, 141, 212];
const TILE = { w: 50, h: 68 };
const ease = [0.22, 1, 0.36, 1] as const;

type Pick = { grid: "stories" | "reposts"; col: number; row: number };
const PICKS: Pick[] = [
  { grid: "stories", col: 0, row: 0 },
  { grid: "stories", col: 1, row: 0 },
  { grid: "stories", col: 2, row: 0 },
  { grid: "reposts", col: 1, row: 0 },
  { grid: "reposts", col: 1, row: 1 },
];

// the script, in seconds from the start of a loop
const T = {
  newTap: 1.0, // "New" on the profile is tapped
  open: 1.3, // Add to Highlight slides in
  picks: [2.6, 3.5, 4.4, 8.1, 9.1],
  pill: 5.8, // "See reposts" is tapped
  scroll: 6.1, // the page glides down
  addTap: 10.5, // "Add (5)" is tapped
  create: 10.8, // New Highlight (cover + name) slides in
  type: 11.5, // the name starts typing itself
  end: 14.8, // loop restarts
};
const NAME = "life style";
const TYPE_STEP = 0.13; // seconds per letter
// where Figma puts the name on New Highlight (390-wide frame, scaled to 169)
const K = W / 390;
const NAME_BOX = { top: 292.5 * K, height: 21 * K, size: 16 * K };
const NEW_BTN = { x: 18.2, y: 128.3 }; // the profile's "New" circle
const ADD_BTN = { x: 84, y: CTA_TOP + 35 + 11 };
// the page layers move with plain CSS transitions: framer's fades and slides
// can flip back to their start value for one frame as they finish (a flash)
const PUSH_CSS = "0.5s cubic-bezier(0.32, 0.72, 0, 1)";

const gridTop = (g: Pick["grid"]) => (g === "stories" ? STORIES_Y : REPOSTS_Y);
const tileBox = (p: Pick) => ({ x: GRID_X + COLS[p.col], y: gridTop(p.grid) + ROWS[p.row] });

// a white ring that fills red and draws a tick when picked
const Check = ({ on }: { on: boolean }) => (
  <motion.div
    className="absolute rounded-full flex items-center justify-center"
    style={{ width: 10, height: 10, borderWidth: 0.9, borderStyle: "solid" }}
    initial={false}
    animate={
      on
        ? { backgroundColor: RED, borderColor: RED, scale: [1, 1.25, 1] }
        : { backgroundColor: "rgba(0,0,0,0.12)", borderColor: "rgba(255,255,255,0.95)", scale: 1 }
    }
    transition={{ duration: on ? 0.35 : 0, ease }}
  >
    <svg viewBox="0 0 24 24" width="7" height="7" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
      <motion.path
        d="M5 12.5l4.5 4.5L19 7.5"
        initial={false}
        animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
        transition={on ? { pathLength: { duration: 0.28, delay: 0.12 }, opacity: { duration: 0.01, delay: 0.12 } } : { duration: 0 }}
      />
    </svg>
  </motion.div>
);

// a soft fingertip that presses where the "user" taps
export const Tap = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: x - 9, top: y - 9, width: 18, height: 18, background: "rgba(20,20,20,0.28)", border: "1px solid rgba(255,255,255,0.7)" }}
    initial={{ opacity: 0, scale: 1.4 }}
    animate={{ opacity: [0, 1, 1, 0], scale: [1.4, 0.9, 0.9, 1.1] }}
    transition={{ duration: 0.55, times: [0, 0.35, 0.6, 1] }}
  />
);

// the soft squircle the tray crops each pick to (Figma's highlight shape)
const BLOB =
  "M0.0680 0.2402C0.1000 0.1620 0.1620 0.1000 0.2402 0.0680C0.4067 0.0000 0.5933 0.0000 0.7598 0.0680C0.8380 0.1000 0.9000 0.1620 0.9320 0.2402C1.0000 0.4067 1.0000 0.5933 0.9320 0.7598C0.9000 0.8380 0.8380 0.9000 0.7598 0.9320C0.5933 1.0000 0.4067 1.0000 0.2402 0.9320C0.1620 0.9000 0.1000 0.8380 0.0680 0.7598C0.0000 0.5933 0.0000 0.4067 0.0680 0.2402Z";

// one picked item in the tray: a crop of its tile in the squircle, a close
// badge top-right and, for a repost, the little repost bubble bottom-left
const Thumb = ({ p }: { p: Pick }) => {
  const k = 27 / TILE.w;
  const src = p.grid === "stories" ? storiesGrid : repostsGrid;
  return (
    <motion.div
      layout
      className="relative shrink-0"
      style={{ width: 27, height: 27 }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "url(#flow-blob)" }}>
        <img
          src={src}
          alt=""
          draggable={false}
          className="absolute max-w-none"
          style={{ width: GRID_W * k, left: -COLS[p.col] * k, top: -(ROWS[p.row] + (TILE.h - TILE.w) / 2) * k }}
        />
      </div>
      <svg className="absolute" style={{ left: 17.3, top: 0.87 }} width="8.65" height="8.65" viewBox="0 0 9 9">
        <rect width="8.65" height="8.65" rx="4.33" fill="#333" fillOpacity="0.6" />
        <path
          d="M5.65 6.06a.14.14 0 0 0 .2 0l.2-.2a.14.14 0 0 0 0-.2L4.73 4.33l1.33-1.33a.14.14 0 0 0 0-.2l-.2-.2a.14.14 0 0 0-.2 0L4.33 3.92 3 2.59a.14.14 0 0 0-.2 0l-.2.2a.14.14 0 0 0 0 .2l1.32 1.33L2.59 5.65a.14.14 0 0 0 0 .2l.2.2a.14.14 0 0 0 .2 0l1.33-1.32 1.33 1.33z"
          fill="#fff"
        />
      </svg>
      {p.grid === "reposts" && (
        <svg
          className="absolute"
          style={{ left: 0, top: 17.7, filter: "drop-shadow(0 0.9px 2px rgba(0,0,0,0.12))" }}
          width="8.65"
          height="8.65"
          viewBox="4.33 3.46 8.65 8.65"
        >
          <rect x="4.33" y="3.46" width="8.65" height="8.65" rx="4.33" fill="#fff" fillOpacity="0.89" />
          <path
            d="M7.03 5.82c.09-.1.24-.1.33 0l.9 1.05c.09.11.02.27-.12.27h-.69v1.03c0 .24 0 .45.01.58.01.12.03.19.05.23.05.1.14.19.24.24.04.02.11.04.23.05.13.01.13.01.37.01h.34c.09 0 .16.07.16.16v.27c0 .09-.07.16-.16.16h-.35c-.23 0-.26 0-.41-.01-.16-.01-.31-.04-.45-.11-.21-.11-.39-.28-.5-.5-.07-.14-.1-.28-.11-.44-.01-.15-.01-.39-.01-.61V7.14h-.62c-.14 0-.21-.16-.12-.27l.9-1.05zM8.96 5.71c.23 0 .26 0 .41.01.16.01.31.04.45.11.21.11.39.29.5.5.07.14.1.28.11.44.01.15.01.39.01.62v1.05h.62c.14 0 .21.16.12.27l-.9 1.05c-.09.1-.24.1-.33 0l-.9-1.05c-.09-.11-.02-.27.12-.27h.69V7.4c0-.24 0-.45-.01-.58-.01-.12-.03-.19-.05-.23-.05-.1-.14-.19-.24-.24-.04-.02-.11-.04-.23-.05-.13-.01-.13-.01-.37-.01h-.34c-.09 0-.16-.07-.16-.16v-.27c0-.09.07-.16.16-.16h.35z"
            fill="#000"
            fillOpacity="0.34"
          />
        </svg>
      )}
    </motion.div>
  );
};

const AddFlowDemo = () => {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const inView = useInView(box, { amount: 0.2 });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0); // seconds into the current loop
  // loops on its own whenever it is on screen
  const run = inView && !reduce;

  // fit the 169 × 365 phone into whatever box it's given
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(el.clientWidth / W, el.clientHeight / H));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // a coarse clock (20 fps: each beat animates itself; this just keeps the typing even)
  useEffect(() => {
    if (!run) return;
    const start = performance.now() - t * 1000;
    const id = window.setInterval(() => {
      // wrap around so it keeps looping, not just once
      setT(((performance.now() - start) / 1000) % T.end);
    }, 50);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  // reduced motion: show the finished state, still
  const now = reduce ? T.end - 1 : t;
  const picked = PICKS.filter((_, i) => now >= T.picks[i]);
  const scrolled = now >= T.scroll;
  const trayUp = picked.length > 0;
  // the last beat: New Highlight dissolves straight into the profile, which is
  // already back in place underneath, so the loop restarts without a blank frame
  const closing = !reduce && now >= T.end - 0.7;
  const tapAt = [...T.picks.map((s, i) => ({ s, i })), { s: T.pill, i: -1 }].find(({ s }) => now >= s && now < s + 0.55);
  const pillShown = now >= T.picks[0] + 0.3 && !scrolled;
  const opened = now >= T.open;
  const creating = now >= T.create;
  const tapping = (at: number) => now >= at && now < at + 0.55;
  const typed = Math.max(0, Math.min(NAME.length, Math.floor((now - T.type) / TYPE_STEP) + 1));
  // the caret holds steady while typing, then blinks
  const caretOn = now < T.type + NAME.length * TYPE_STEP + 0.3 || Math.floor(now * 2) % 2 === 0;
  const contentY = scrolled ? -(REPOSTS_TITLE_Y) : 0;

  return (
    <div ref={box} className="relative w-full h-full" aria-label="Animation: from the profile, New opens Add to Highlight; stories are picked, See reposts jumps down to reposts, a couple are picked, and Add moves on to naming the highlight" role="img">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <clipPath id="flow-blob" clipPathUnits="objectBoundingBox">
          <path d={BLOB} />
        </clipPath>
      </svg>
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: "center" }}
      >
        <motion.div
          className="absolute inset-0 overflow-hidden bg-white"
          style={{ borderRadius: 22, fontFamily: "'TikTok Sans', system-ui, -apple-system, sans-serif" }}

        >
          {/* 1 · the profile, where "New" starts it all */}
          <img
            src={profile}
            alt=""
            draggable={false}
            className="absolute left-0 top-0"
            style={{
              width: W,
              height: H,
              transform: `translateX(${opened && !closing ? -W * 0.3 : 0}px)`,
              // once covered it's hidden outright, so no sliver of it shows at the phone's edge
              opacity: opened && !closing ? 0 : 1,
              transition:
                now < 0.3 || closing
                  ? "none"
                  : `transform ${PUSH_CSS}, opacity 0s linear ${opened ? "0.55s" : "0s"}`,
            }}
          />

          {/* 2 · Add to Highlight, pushed in from the right */}
          <div
            className="absolute inset-0 bg-white overflow-hidden"
            style={{
              transform: `translateX(${!opened ? W + 16 : creating ? -W * 0.3 : 0}px)`,
              opacity: opened && !creating ? 1 : 0,
              transition: now < 0.3 ? "none" : `transform ${PUSH_CSS}, opacity 0s linear ${creating ? "0.55s" : "0s"}`,
            }}
          >
          {/* the page that scrolls */}
          <div className="absolute inset-x-0 overflow-hidden" style={{ top: HEAD, bottom: 0 }}>
            <motion.div
              className="absolute inset-x-0 top-0"
              initial={false}
              animate={{ y: contentY }}
              transition={scrolled ? { duration: 1.1, ease: [0.65, 0, 0.35, 1] } : { duration: 0 }}
            >
              <img src={storiesTitle} alt="" draggable={false} className="absolute left-0 top-0" style={{ width: W }} />
              <img src={storiesGrid} alt="" draggable={false} className="absolute" style={{ left: GRID_X, top: STORIES_Y, width: GRID_W }} />
              <img src={repostsTitle} alt="" draggable={false} className="absolute left-0" style={{ top: REPOSTS_TITLE_Y, width: W }} />
              <img src={repostsGrid} alt="" draggable={false} className="absolute" style={{ left: GRID_X, top: REPOSTS_Y, width: GRID_W }} />

              {/* a picked tile's photo zooms in a touch, inside the tile's own corners */}
              {(["stories", "reposts"] as const).map((g) =>
                ROWS.flatMap((_, row) =>
                  COLS.map((__, col) => {
                    const on = picked.some((p) => p.grid === g && p.col === col && p.row === row);
                    const { x, y } = tileBox({ grid: g, col, row });
                    return (
                      <div
                        key={`zoom-${g}-${row}-${col}`}
                        className="absolute overflow-hidden"
                        style={{ left: x, top: y, width: TILE.w, height: TILE.h, borderRadius: 4.5, visibility: on ? "visible" : "hidden" }}
                      >
                        <motion.img
                          src={g === "stories" ? storiesGrid : repostsGrid}
                          alt=""
                          draggable={false}
                          className="absolute max-w-none"
                          style={{ left: -COLS[col], top: -ROWS[row], width: GRID_W, transformOrigin: `${COLS[col] + TILE.w / 2}px ${ROWS[row] + TILE.h / 2}px` }}
                          initial={false}
                          animate={{ scale: on ? 1.08 : 1 }}
                          transition={on ? { duration: 0.5, ease } : { duration: 0 }}
                        />
                      </div>
                    );
                  })
                )
              )}

              {/* the badges sit still above the photos */}
              <img src={storiesBadges} alt="" draggable={false} className="absolute pointer-events-none" style={{ left: GRID_X, top: STORIES_Y, width: GRID_W }} />
              <img src={repostsBadges} alt="" draggable={false} className="absolute pointer-events-none" style={{ left: GRID_X, top: REPOSTS_Y, width: GRID_W }} />

              {/* a check circle on every tile, filled for the picked ones */}
              {(["stories", "reposts"] as const).map((g) =>
                ROWS.flatMap((_, row) =>
                  COLS.map((__, col) => {
                    const { x, y } = tileBox({ grid: g, col, row });
                    const on = picked.some((p) => p.grid === g && p.col === col && p.row === row);
                    return (
                      <div key={`${g}-${row}-${col}`} className="absolute" style={{ left: x + 37, top: y + 2, width: 10, height: 10 }}>
                        <Check on={on} />
                      </div>
                    );
                  })
                )
              )}

              {/* fingertip on tiles */}
              <AnimatePresence>
                {tapAt && tapAt.i >= 0 && (
                  <Tap key={`tap-${tapAt.i}`} x={tileBox(PICKS[tapAt.i]).x + TILE.w / 2} y={tileBox(PICKS[tapAt.i]).y + TILE.h / 2} />
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* status bar + nav stay put */}
          <img src={header} alt="" draggable={false} className="absolute left-0 top-0" style={{ width: W }} />

          {/* "See reposts" appears once something is picked, until it's used */}
          <motion.div
            className="absolute flex items-center gap-[2px] rounded-full bg-white text-[#161823]"
            style={{ left: 57, top: 267, height: 16, padding: "0 6px", fontSize: 7, fontWeight: 600, boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}
            initial={false}
            animate={{ opacity: pillShown ? 1 : 0, y: pillShown ? 0 : 6, scale: tapAt?.i === -1 ? 0.94 : 1 }}
            transition={{ duration: now < 0.3 ? 0 : 0.3, ease }}
          >
            See reposts
            <svg viewBox="0 0 24 24" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 6l5 5 5-5M7 13l5 5 5-5" />
            </svg>
          </motion.div>
          <AnimatePresence>{tapAt?.i === -1 && <Tap key="tap-pill" x={57 + 28} y={267 + 8} />}</AnimatePresence>

          {/* the tray of picks + Add, rising once something is picked */}
          <motion.div
            className="absolute inset-x-0 bg-white"
            style={{ top: CTA_TOP, height: H - CTA_TOP, borderTop: "0.5px solid rgba(22,24,35,0.12)" }}
            initial={false}
            animate={{ y: trayUp ? 0 : H - CTA_TOP }}
            transition={{ duration: trayUp ? 0.4 : 0, ease }}
          >
            <div className="absolute flex gap-[3.5px]" style={{ left: 3, top: 4 }}>
              <AnimatePresence initial={false}>
                {picked.map((p) => (
                  <Thumb key={`${p.grid}-${p.col}-${p.row}`} p={p} />
                ))}
              </AnimatePresence>
            </div>
            <div
              className="absolute flex items-center justify-center rounded-full text-white"
              style={{ left: 5, top: 35, width: 158, height: 22, background: RED, fontSize: 7.5, fontWeight: 600 }}
            >
              Add ({picked.length})
            </div>
          </motion.div>

          {/* home indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#161823]" style={{ bottom: 5, width: 54, height: 2 }} />
          </div>

          {/* 3 · New Highlight: cover and name, the step the flow hands off to */}
          <div
            className="absolute inset-0"
            style={{
              transform: `translateX(${creating ? 0 : W + 16}px)`,
              opacity: creating && !closing ? 1 : 0,
              transition:
                now < 0.3 ? "none" : closing ? "opacity 0.6s ease-in-out" : `transform ${PUSH_CSS}, opacity 0s linear`,
            }}
          >
            <img src={newHighlight} alt="" draggable={false} className="absolute left-0 top-0" style={{ width: W, height: H }} />
            {/* the name in the export is covered and typed out live, letter by letter */}
            <div className="absolute bg-white" style={{ left: 66, width: 38, top: NAME_BOX.top - 1, height: NAME_BOX.height + 2 }} />
            <div
              className="absolute inset-x-0 flex items-center justify-center text-black"
              style={{ top: NAME_BOX.top, height: NAME_BOX.height, fontSize: NAME_BOX.size, lineHeight: `${NAME_BOX.height}px` }}
            >
              <span style={{ whiteSpace: "pre" }}>{NAME.slice(0, typed)}</span>
              <span
                className="inline-block"
                style={{ width: 0.9, height: NAME_BOX.height * 0.95, marginLeft: 0.4, background: RED, opacity: caretOn ? 1 : 0 }}
              />
            </div>
          </div>

          {/* taps that start and finish the flow */}
          <AnimatePresence>
            {tapping(T.newTap) && <Tap key="tap-new" x={NEW_BTN.x} y={NEW_BTN.y} />}
            {tapping(T.addTap) && <Tap key="tap-add" x={ADD_BTN.x} y={ADD_BTN.y} />}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AddFlowDemo;
