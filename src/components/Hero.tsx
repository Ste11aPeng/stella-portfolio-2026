import { motion } from "framer-motion";
import profileImage from "@/assets/profile.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

// Split sentence into segments, marking "Product Designer" specially
const segments: { text: string; highlight?: boolean }[] = [
  { text: "Stella P. is a " },
  { text: "Product Designer", highlight: true },
  { text: " making calm user experiences for messy, real life. Based in Ann Arbor." },
];

const WavyUnderline = () => (
  <motion.svg
    viewBox="0 0 160 12"
    fill="none"
    className="absolute -bottom-1 left-0 w-full"
    style={{ height: "8px" }}
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
  >
    <motion.path
      d="M2 8 C 12 2, 22 2, 32 8 S 52 14, 62 8 S 82 2, 92 8 S 112 14, 122 8 S 142 2, 158 8"
      stroke="#C2785C"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
    />
  </motion.svg>
);

const Hero = () => {
  // Build word list with highlight info
  const words: { word: string; highlight: boolean }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").filter(Boolean).forEach((w) => {
      words.push({ word: w, highlight: !!seg.highlight });
    });
  });

  return (
    <section className="px-8 py-16 lg:px-24 md:px-[32px] md:py-[64px]">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        <motion.div
          className="flex-shrink-0 overflow-hidden"
          style={{ width: "100px", height: "100px" }}
          initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.p
          className="max-w-md pt-0 flex flex-wrap"
          style={{
            color: "#161616",
            fontFamily: "'New Spirit', serif",
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "1.5",
            gap: "0 5px",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((item, i) => {
            if (item.highlight) {
              // Check if this is the first highlighted word to attach the underline
              const isFirstHighlight = !words.slice(0, i).some((w) => w.highlight);
              return (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="inline-block relative"
                  style={{ color: "#C2785C" }}
                >
                  {item.word}
                  {isFirstHighlight && (
                    <span className="absolute -bottom-1 left-0" style={{ width: "calc(200% + 5px)", height: "8px" }}>
                      <WavyUnderline />
                    </span>
                  )}
                </motion.span>
              );
            }
            return (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {item.word}
              </motion.span>
            );
          })}
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
