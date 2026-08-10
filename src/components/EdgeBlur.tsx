import { CSSProperties, ReactNode } from "react";

/**
 * Unified progressive edge blur used site-wide.
 *
 * Technique: nested layers, each applying a small backdrop blur that compounds
 * on top of the previous one, masked by a wide, smooth gradient. Because the
 * masks are simple 0 -> 1 ramps (no transparent/black/transparent bands) and
 * the blur strength doubles per layer, the result reads as one continuous
 * 0 -> max blur ramp with no visible stripes.
 */
export const EDGE_BLUR_MAX = 2; // px at the far edge
const LAYERS = 6;

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

  // Each layer roughly doubles the accumulated blur; total ends at EDGE_BLUR_MAX.
  const baseBlur = EDGE_BLUR_MAX / Math.pow(2, LAYERS - 1);

  // Build from the outermost (lightest, starts at the content edge) inward.
  let content: ReactNode = null;
  for (let i = LAYERS - 1; i >= 0; i--) {
    const blur = baseBlur * Math.pow(2, i);
    // Layer i ramps in over a wide, overlapping window further from the content.
    const start = (i / LAYERS) * 100;
    const end = ((i + 1.6) / LAYERS) * 100;
    const mask = `linear-gradient(${direction}, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${Math.min(
      end,
      100
    )}%)`;
    content = (
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ ...offset, ...sizeStyle, ...style }}
    >
      {content}
    </div>
  );
};

export default EdgeBlur;
