import { CSSProperties } from "react";

/**
 * Unified progressive edge blur used site-wide.
 * Uses many overlapping soft-banded slices whose blur amount ramps smoothly
 * from the content edge (near, light blur) to the far edge (heavy blur),
 * producing a continuous progressive blur with no visible banding.
 */
export const EDGE_BLUR_MAX = 2; // px
const SLICES = 12; // more slices = smoother ramp
const MIN_BLUR = 0.3; // px at the content-facing edge

type Side = "top" | "bottom" | "left" | "right";

const OVERSHOOT = 1; // px bleed past the edges so no unblurred sliver remains

const SIDE_CONFIG: Record<Side, { direction: string; offset: CSSProperties }> = {
  top: { direction: "to top", offset: { left: -OVERSHOOT, right: -OVERSHOOT, top: -OVERSHOOT } },
  bottom: { direction: "to bottom", offset: { left: -OVERSHOOT, right: -OVERSHOOT, bottom: -OVERSHOOT } },
  left: { direction: "to left", offset: { top: -OVERSHOOT, bottom: -OVERSHOOT, left: -OVERSHOOT } },
  right: { direction: "to right", offset: { top: -OVERSHOOT, bottom: -OVERSHOOT, right: -OVERSHOOT } },
};

interface EdgeBlurProps {
  side: Side;
  /** CSS size of the fade band (height for top/bottom, width for left/right). */
  size?: string;
  className?: string;
  style?: CSSProperties;
}

export const EdgeBlur = ({ side, size = "72px", className = "", style }: EdgeBlurProps) => {
  const { direction, offset } = SIDE_CONFIG[side];
  const sizeStyle =
    side === "top" || side === "bottom"
      ? { height: `calc(${size} + ${OVERSHOOT}px)` }
      : { width: `calc(${size} + ${OVERSHOOT}px)` };

  // Build overlapping soft bands with increasing blur.
  const step = 100 / SLICES;
  const slices = Array.from({ length: SLICES }, (_, i) => {
    const t = i / (SLICES - 1); // 0 at content edge, 1 at far edge
    const blur = MIN_BLUR + (EDGE_BLUR_MAX - MIN_BLUR) * t;
    const center = (i + 0.5) * step; // band center %
    const half = step * 0.85; // overlap neighbors
    const inner = step * 0.25; // soft plateau
    const lo = Math.max(0, center - half);
    const loIn = center - inner;
    const hiIn = center + inner;
    const hi = Math.min(100, center + half);
    const mask = `linear-gradient(${direction}, transparent ${lo}%, black ${loIn}%, black ${hiIn}%, transparent ${hi}%)`;
    return { blur, mask };
  });

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ ...offset, ...sizeStyle, ...style }}
    >
      {slices.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${s.blur}px)`,
            WebkitBackdropFilter: `blur(${s.blur}px)`,
            maskImage: s.mask,
            WebkitMaskImage: s.mask,
          }}
        />
      ))}
    </div>
  );
};

export default EdgeBlur;
