import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profileImage from "@/assets/profile.jpg";

const parts = [
  { text: "Stella P. is a ", color: undefined },
  { text: "Product Designer", color: "#4a86e8" },
  { text: " who spots new tools early, drives momentum, and stays curious about how products grow.", color: undefined },
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
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="px-8 py-16 lg:px-24 md:px-[32px] md:py-[64px] max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        <motion.div
          className="flex-shrink-0 overflow-hidden cursor-pointer relative"
          style={{ width: "100px", height: "100px" }}
          initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate("/about")}
        >
          <img
            src={profileImage}
            alt="Profile"
            width={291}
            height={291}
            className="w-full h-full object-cover transition-[filter] duration-500 ease-out"
            style={{ filter: isHovered ? "blur(3px)" : "blur(0px)" }}
          />
          <AnimatePresence>
            {isHovered && (
              <motion.span
                className="absolute inset-0 flex items-center justify-center font-sans text-[13px] text-foreground/80 select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                more
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="max-w-2xl pt-0 font-sans flex flex-wrap"
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
