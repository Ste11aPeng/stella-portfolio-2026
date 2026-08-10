import { CSSProperties } from "react";

/**
 * Unified progressive edge blur used site-wide.
 *
 * Stacks multiple backdrop-filter layers, each with increasing blur and
 * decreasing size, all sharing the same black-to-transparent gradient mask.
 * Because shorter layers compress the gradient, they contribute a sharper,
 * stronger blur right at the edge; taller layers add a softer, gradual haze
 * that extends further inward. Combined, the result is a smooth 0-to-max
 * progressive ramp with no visible banding.
 */

type Side = "top" | "bottom" | "left" | "right";

const OVERSHOOT = 1; // px bleed past the edges so no unblurred sliver remains

const LAYERS = [
  { blur: 1, size: "100%" },
  { blur: 2, size: "90%" },
  { blur: 3, size: "80%" },
  { blur: 4, size: "70%" },
  { blur: 5, size: "60%" },
  { blur: 6, size: "50%" },
  { blur: 7, size: "40%" },
  { blur: 8, size: "30%" },
  { blur: 10, size: "20%" },
  { blur: 12, size: "10%" },
];

const SIDE_CONFIG: Record<
  Side,
  { offset: CSSProperties; layerAnchor: CSSProperties; maskDirection: string }
> = {
  top: {
    offset: { left: -OVERSHOOT, right: -OVERSHOOT, top: -OVERSHOOT },
    layerAnchor: { top: 0, left: 0, right: 0 },
    maskDirection: "to bottom",
  },
  bottom: {
    offset: { left: -OVERSHOOT, right: -OVERSHOOT, bottom: -OVERSHOOT },
    layerAnchor: { bottom: 0, left: 0, right: 0 },
    maskDirection: "to top",
  },
  left: {
    offset: { top: -OVERSHOOT, bottom: -OVERSHOOT, left: -OVERSHOOT },
    layerAnchor: { left: 0, top: 0, bottom: 0 },
    maskDirection: "to right",
  },
  right: {
    offset: { top: -OVERSHOOT, bottom: -OVERSHOOT, right: -OVERSHOOT },
    layerAnchor: { right: 0, top: 0, bottom: 0 },
    maskDirection: "to left",
  },
};

interface EdgeBlurProps {
  side: Side;
  /** CSS size of the fade band (height for top/bottom, width for left/right). */
  size?: string;
  className?: string;
  style?: CSSProperties;
}

export const EdgeBlur = ({
  side,
  size = "72px",
  className = "",
  style,
}: EdgeBlurProps) => {
  const isVertical = side === "top" || side === "bottom";
  const { offset, layerAnchor, maskDirection } = SIDE_CONFIG[side];
  const containerSize = isVertical
    ? { height: `calc(${size} + ${OVERSHOOT}px)` }
    : { width: `calc(${size} + ${OVERSHOOT}px)` };

  const mask = `linear-gradient(${maskDirection}, black, transparent)`;

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{ ...offset, ...containerSize, ...style }}
    >
      {LAYERS.map(({ blur, size: layerSize }, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            ...layerAnchor,
            ...(isVertical ? { height: layerSize } : { width: layerSize }),
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
        />
      ))}
    </div>
  );
};

export default EdgeBlur;
