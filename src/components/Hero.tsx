import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import profileImage from "@/assets/profile.webp";

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
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopyEmail = useCallback(async () => {
    await navigator.clipboard.writeText("stellanotfound@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section className="px-8 py-16 lg:px-24 md:px-[32px] md:py-[64px] max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        <motion.div
          className="flex-shrink-0 cursor-pointer relative"
          style={{ width: "120px", height: "120px" }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03, rotate: 0.8 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate("/about")}
        >
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={profileImage}
              alt="Profile"
              width={291}
              height={291}
              className="w-full h-full object-cover"
            />
            {/* Gradient blur overlay - stays aligned with image bottom */}
            <img
              src={profileImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ease-out"
                style={{
                  opacity: isHovered ? 1 : 0,
                  filter: "blur(10px)",
                  transform: "scale(1.06)",
                  maskImage: "linear-gradient(to top, black 0%, black 28%, rgba(0, 0, 0, 0.55) 40%, transparent 68%)",
                  WebkitMaskImage: "linear-gradient(to top, black 0%, black 28%, rgba(0, 0, 0, 0.55) 40%, transparent 68%)",
                }}
            />
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className="absolute bottom-2 left-0 right-0 flex items-center justify-center font-['New_Spirit'] text-[16px] text-white/90 select-none"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  about me
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex flex-col">
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

          <motion.div
            className="flex items-center gap-3 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <span className="flex items-center gap-1.5 text-[13px] font-sans text-muted-foreground">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
              Available for Intern | Summer 26
            </span>
            <span className="text-border">·</span>
            <button
              onClick={handleCopyEmail}
              className="text-[13px] font-sans text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
            >
              {copied ? "copied!" : "stellanotfound@gmail.com"}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
