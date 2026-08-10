import { CSSProperties } from "react";

/**
 * Unified progressive edge blur used site-wide.
 *
 * Two full-size layers share continuous alpha masks. A light base layer keeps
 * the transition visibly soft, while the stronger layer increases smoothly
 * toward the outer edge. There are no sliced mask bands, so no stripes appear.
 */
export const EDGE_BLUR_MAX = 4; // px at the far edge

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

  const baseMask = `linear-gradient(${direction}, transparent 0%, rgba(0,0,0,0.12) 24%, rgba(0,0,0,0.42) 62%, black 100%)`;
  const strongMask = `linear-gradient(${direction}, transparent 0%, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.28) 68%, black 100%)`;

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ ...offset, ...sizeStyle, ...style }}
    >
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
          maskImage: baseMask,
          WebkitMaskImage: baseMask,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${EDGE_BLUR_MAX}px)`,
          WebkitBackdropFilter: `blur(${EDGE_BLUR_MAX}px)`,
          maskImage: strongMask,
          WebkitMaskImage: strongMask,
        }}
      />
    </div>
  );
};

export default EdgeBlur;
