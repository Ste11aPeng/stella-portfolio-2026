import { motion, type Variants } from "framer-motion";

// Shared "blur-out-up" entrance for case-study heading text: words blur-fade
// in with a short upward drift, staggered left to right.
export interface AnimatedTitleSegment {
  text: string;
  className?: string;
  ariaHidden?: boolean;
}

interface AnimatedTitleProps {
  text?: string;
  segments?: AnimatedTitleSegment[];
  className?: string;
  as?: "h1" | "h2";
  style?: React.CSSProperties;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.028 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
  },
};

const splitWords = (text: string) => text.match(/\S+|\s+/g) ?? [text];

const AnimatedTitle = ({ text, segments, className, as = "h2", style }: AnimatedTitleProps) => {
  const resolvedSegments: AnimatedTitleSegment[] = segments ?? [{ text: text ?? "" }];
  const Tag = as === "h1" ? motion.h1 : motion.h2;

  return (
    <Tag
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {resolvedSegments.map((segment, si) =>
        splitWords(segment.text).map((part, pi) =>
          /^\s+$/.test(part) ? (
            <span key={`${si}-${pi}`} className={segment.className}>
              {part}
            </span>
          ) : (
            <motion.span
              key={`${si}-${pi}`}
              variants={wordVariants}
              className={segment.className}
              style={{ display: "inline-block" }}
              aria-hidden={segment.ariaHidden || undefined}
            >
              {part}
            </motion.span>
          )
        )
      )}
    </Tag>
  );
};

export default AnimatedTitle;
