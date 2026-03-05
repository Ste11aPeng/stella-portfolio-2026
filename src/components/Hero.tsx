import { motion } from "framer-motion";
import profileImage from "@/assets/profile.png";

const parts = [
  { text: "Stella P. is a ", color: undefined },
  { text: "Product Designer", color: "#4a86e8" },
  { text: " making calm user experiences for messy, real life. Based in Michigan.", color: undefined },
];

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

const Hero = () => {
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
          className="max-w-md pt-0 font-sans flex flex-wrap"
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
          {parts.map((part, pi) => {
            const partWords = part.text.split(" ").filter(Boolean);
            return partWords.map((word, wi) => (
              <motion.span
                key={`${pi}-${wi}`}
                variants={wordVariants}
                className="inline-block"
                style={part.color ? { color: part.color } : undefined}
              >
                {word}
              </motion.span>
            ));
          })}
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
