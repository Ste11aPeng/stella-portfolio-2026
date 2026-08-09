import { CSSProperties } from "react";

/**
 * Unified progressive edge blur used site-wide.
 * Same layer/mask configuration for every edge so transitions look identical.
 */
export const EDGE_BLUR_MAX = 2; // px
const LAYERS = [0.25, 0.5, 1, EDGE_BLUR_MAX];
const BANDS = [
  "black 0%, black 50%, transparent 87.5%",
  "transparent 12.5%, black 37.5%, black 62.5%, transparent 87.5%",
  "transparent 25%, black 50%, black 75%, transparent 100%",
  "transparent 37.5%, black 62.5%, black 100%",
];

type Side = "top" | "bottom" | "left" | "right";

const SIDE_CONFIG: Record<Side, { direction: string; className: string }> = {
  top: { direction: "to top", className: "inset-x-0 top-0" },
  bottom: { direction: "to bottom", className: "inset-x-0 bottom-0" },
  left: { direction: "to left", className: "inset-y-0 left-0" },
  right: { direction: "to right", className: "inset-y-0 right-0" },
};

interface EdgeBlurProps {
  side: Side;
  /** CSS size of the fade band (height for top/bottom, width for left/right). */
  size?: string;
  className?: string;
  style?: CSSProperties;
}

export const EdgeBlur = ({ side, size = "72px", className = "", style }: EdgeBlurProps) => {
  const { direction, className: pos } = SIDE_CONFIG[side];
  const sizeStyle =
    side === "top" || side === "bottom" ? { height: size } : { width: size };

  return (
    <div
      className={`pointer-events-none absolute ${pos} ${className}`}
      style={{ ...sizeStyle, ...style }}
    >
      {LAYERS.map((blur, i) => {
        const mask = `linear-gradient(${direction}, ${BANDS[i]})`;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
};

export default EdgeBlur;
