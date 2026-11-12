import type { CSSProperties } from "react";
import p1 from "@/assets/tiktok/polaroids/p1.webp";
import p2 from "@/assets/tiktok/polaroids/p2.webp";
import p3 from "@/assets/tiktok/polaroids/p3.webp";
import p4 from "@/assets/tiktok/polaroids/p4.webp";
import p5 from "@/assets/tiktok/polaroids/p5.webp";
import { Reveal } from "./parts";

// The summer, as a spill of instant photos, laid out as in Figma (a 1096 × 738
// frame). Hovering a photo lifts it up the page and a handwritten note says
// what it is; the stacking order never changes, so a photo tucked behind stays
// behind. Each photo only answers the pointer inside its own (rotated) card,
// not its whole bounding box.
const FRAME = { w: 1096, h: 738 };

type Note = {
  text: string;
  /** where the note sits, relative to the card's box */
  at: CSSProperties;
  tilt: number;
  /** a little hand-drawn arrow from the note toward the card */
  arrow?: { d: string; at: CSSProperties; w: number; h: number };
};

const PHOTOS: {
  src: string; x: number; y: number; w: number; h: number; hit: string; alt: string; note?: Note;
  /** stays where it is on hover (its note is written on the card itself) */
  still?: boolean;
}[] = [
  {
    src: p1, x: 17.5, y: 167.7, w: 326.5, h: 432.5, hit: "polygon(71.9% 0%, 99.7% 86.5%, 28% 99.8%, 0% 13.2%)", alt: "The summer 2026 sign at the San Jose office",
    note: {
      text: "SJC office",
      at: { left: "-46%", top: "40%" },
      tilt: -6,
      arrow: { d: "M4 6 C 14 8, 26 14, 36 26", at: { left: "-14%", top: "48%" }, w: 40, h: 34 },
    },
  },
  {
    src: p2, x: 195.3, y: 47.6, w: 369, h: 311, hit: "polygon(89.8% 0.2%, 99.9% 85.5%, 10% 99.8%, 0.1% 15%)", alt: "Stella with the team on the last day",
    note: {
      text: "last day with the team",
      at: { left: "-6%", top: "-30%" },
      tilt: -5,
      arrow: { d: "M4 4 C 18 6, 30 14, 34 30", at: { left: "36%", top: "-14%" }, w: 40, h: 34 },
    },
  },
  {
    src: p3, x: 478.3, y: 7.5, w: 604.5, h: 506, hit: "polygon(8.6% 0.1%, 99.9% 12.5%, 91.4% 99.8%, 0.1% 87.2%)", alt: "Whale watching with the interns",
    note: {
      text: "whale watch",
      at: { right: "2%", top: "-19%" },
      tilt: 4,
      arrow: { d: "M36 4 C 26 8, 18 16, 14 30", at: { right: "20%", top: "-11%" }, w: 40, h: 34 },
    },
  },
  {
    src: p4, x: 301.2, y: 192.4, w: 558.5, h: 446.5, hit: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", alt: "Stella on a couch with TikTok pillows",
    still: true,
    note: {
      // written in the polaroid's own blank strip, under the photo
      text: "best summer ever",
      at: { left: "7%", top: "85%" },
      tilt: -2,
    },
  },
  {
    src: p5, x: 786.5, y: 304.7, w: 292, h: 415.5, hit: "polygon(18% 0%, 99.8% 8.1%, 82% 99.9%, 0% 91.9%)", alt: "Unboxing the intern swag",
    note: {
      text: "swag",
      at: { right: "-40%", top: "30%" },
      tilt: -6,
      arrow: { d: "M36 6 C 26 8, 14 14, 4 26", at: { right: "-16%", top: "38%" }, w: 40, h: 34 },
    },
  },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

const Polaroids = () => (
  <Reveal className="mt-12">
    {/* a touch smaller than the column, set a little left of centre, with
        room above and below for the notes */}
    <div className="max-w-[720px] mx-auto md:ml-[60px] pt-12 pb-10">
      <div className="relative w-full" style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}` }}>
        {PHOTOS.map((p) => (
          <div
            key={p.alt}
            className="group absolute pointer-events-none"
            style={{ left: pct(p.x, FRAME.w), top: pct(p.y, FRAME.h), width: pct(p.w, FRAME.w), height: pct(p.h, FRAME.h) }}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-out ${p.still ? "" : "group-hover:-translate-y-6"}`}
              style={{ filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.1))" }}
            />

            {/* the handwritten note, riding up with the photo; above every card */}
            {p.note && (
              <div
                className={`absolute z-50 pointer-events-none opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 ${
                  p.still ? "" : "translate-y-1 group-hover:-translate-y-6"
                }`}
                style={{ inset: 0 }}
                aria-hidden="true"
              >
                <span
                  className="absolute whitespace-nowrap text-[#2b2b2b] text-[22px] md:text-[26px] leading-none"
                  style={{ ...p.note.at, fontFamily: "'Caveat', cursive", fontWeight: 500, transform: `rotate(${p.note.tilt}deg)` }}
                >
                  {p.note.text}
                </span>
                {p.note.arrow && (
                <svg
                  className="absolute overflow-visible"
                  style={p.note.arrow.at}
                  width={p.note.arrow.w}
                  height={p.note.arrow.h}
                  viewBox={`0 0 ${p.note.arrow.w} ${p.note.arrow.h}`}
                  fill="none"
                  stroke="#2b2b2b"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  {/* drawn in on hover */}
                  <path
                    d={p.note.arrow.d}
                    pathLength={1}
                    className="transition-[stroke-dashoffset] duration-500 delay-100 ease-out [stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0]"
                  />
                </svg>
                )}
              </div>
            )}

            {/* the card's own outline catches the pointer; it stays put while the
                photo lifts, so the lift can't flicker at the card's lower edge */}
            <div className="absolute inset-0 pointer-events-auto" style={{ clipPath: p.hit }} />
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);

export default Polaroids;
