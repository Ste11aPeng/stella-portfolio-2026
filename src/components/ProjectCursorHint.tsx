import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface ProjectCursorHintProps {
  text: string;
  color?: string;
  textColor?: string;
  size?: number;
}

const ProjectCursorHint = ({
  text,
  color = "#FFFFFF",
  textColor = "#000000",
  size = 31,
}: ProjectCursorHintProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const arrowSpring = { stiffness: 380, damping: 32, mass: 0.6 };
  const labelSpring = { stiffness: 220, damping: 26, mass: 0.7 };

  const arrowX = useSpring(x, arrowSpring);
  const arrowY = useSpring(y, arrowSpring);

  const labelX = useSpring(x, labelSpring);
  const labelY = useSpring(y, labelSpring);

  const labelOffsetX = size * 0.9;
  const labelOffsetY = size * 0.2 + 6;

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };

    parent.addEventListener("mousemove", handleMouseMove);
    return () => parent.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden z-20"
      aria-hidden="true"
    >
      {/* Label pill trails behind the arrow */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          x: labelX,
          y: labelY,
          translateX: labelOffsetX,
          translateY: labelOffsetY,
        }}
      >
        <div
          style={{ backgroundColor: color, color: textColor }}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap leading-none"
        >
          {text}
        </div>
      </motion.div>

      {/* Arrow sits on top, anchored at tip */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          x: arrowX,
          y: arrowY,
          translateX: -4,
          translateY: -4,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L24 20L12 20L16 28L0 24V0Z"
            fill={color}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default ProjectCursorHint;
