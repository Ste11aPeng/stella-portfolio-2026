import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import about1 from "@/assets/about-1.png";
import about2 from "@/assets/about-2.png";
import about3 from "@/assets/about-3.png";
import about4 from "@/assets/about-4.png";
import { useRef, useState, useCallback, useEffect } from "react";

// Set page title
const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    return () => { document.title = "Stella Peng | Product Designer Portfolio"; };
  }, [title]);
};

const PhotoWithHover = ({ src, label }: { src: string; label: string }) => {
  const [isHovering, setIsHovering] = useState(false);
  const hintRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      const ease = 0.12;
      position.current.x += (target.current.x - position.current.x) * ease;
      position.current.y += (target.current.y - position.current.y) * ease;
      if (hintRef.current) {
        hintRef.current.style.left = `${position.current.x}px`;
        hintRef.current.style.top = `${position.current.y}px`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    if (isHovering) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    position.current = { x, y };
    target.current = { x, y };
    setIsHovering(true);
    window.dispatchEvent(new CustomEvent('projectCardHover', { detail: { hovering: true } }));
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    window.dispatchEvent(new CustomEvent('projectCardHover', { detail: { hovering: false } }));
  };

  return (
    <div
      className="relative h-[260px] w-[230px] flex-shrink-0 overflow-hidden bg-muted cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} alt={label} className="h-full w-full object-cover" />
      {isHovering && (
        <div ref={hintRef} className="project-cursor-hint" style={{ willChange: "left, top" }}>
          {label}
        </div>
      )}
    </div>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const strip = [
  { src: about1, label: "Hi~" },
  { src: about2, label: "I love matcha" },
  { src: about3, label: "Oasis live" },
  { src: about4, label: "Brew time!" },
  { src: about1, label: "Lake days" },
  { src: about2, label: "Shoot with my Fuji" },
  { src: about3, label: "Say hi" },
];

const About = () => {
  usePageTitle("About Stella Peng | Product Designer");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    await navigator.clipboard.writeText("stellanotfound@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background relative z-10">
        <Header />

        {/* Title */}
        <section className="px-8 pt-24 pb-14 lg:px-24 md:px-[32px] max-w-[1440px] mx-auto">
          <motion.h1
            className="text-center text-4xl md:text-5xl text-foreground"
            style={{ fontFamily: "'Exposure', 'New Spirit', serif", fontWeight: 650, letterSpacing: "-0.07em" }}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Hi, I'm Stella.
          </motion.h1>
        </section>

        {/* Three cards */}
        <section className="px-8 lg:px-24 md:px-[32px] max-w-[1440px] mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
          >
            {/* Life */}
            <motion.div
              variants={cardVariants}
              className="relative rounded-2xl bg-muted/40 p-8 min-h-[500px] overflow-hidden"
            >
              <h2
                className="text-2xl md:text-[28px] text-foreground"
                style={{ fontFamily: "'Exposure', 'New Spirit', serif", fontWeight: 650, letterSpacing: "-0.07em" }}
              >
                Life
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <p className="font-sans text-[15px] leading-relaxed text-foreground">
                  A designer who notices the tiny things. Into Nintendo, kittens, film cameras, and things that make me say "ohhh that's clever".
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-muted-foreground">
                  Grew up in China, studied design at Michigan, now at UW for HCI. Summer '26 intern at TikTok, shipping internal prototypes with Figma and Claude Code.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-muted-foreground">
                  Say hello to{" "}
                  <button onClick={handleCopyEmail} className="underline underline-offset-2 hover:text-foreground transition-colors">
                    {copied ? "copied!" : "stellanotfound@gmail.com"}
                  </button>{" "}
                  or{" "}
                  <a href="https://www.linkedin.com/in/stellapengrnr/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">
                    linkedin
                  </a>
                  .
                </p>
              </div>
              {/* bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />
            </motion.div>

            {/* Work */}
            <motion.div
              variants={cardVariants}
              className="relative rounded-2xl bg-muted/40 p-8 min-h-[500px] overflow-hidden"
            >
              <h2
                className="text-2xl md:text-[28px] text-foreground"
                style={{ fontFamily: "'Exposure', 'New Spirit', serif", fontWeight: 650, letterSpacing: "-0.07em" }}
              >
                Work
              </h2>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* placeholder collage - visuals to be provided */}
                <div className="relative h-[260px] w-[300px]">
                  <img src={about1} alt="" className="absolute left-0 top-6 h-[130px] w-[150px] rounded-xl object-cover shadow-md -rotate-6" />
                  <img src={about2} alt="" className="absolute right-0 top-0 h-[120px] w-[140px] rounded-xl object-cover shadow-md rotate-6" />
                  <img src={about3} alt="" className="absolute left-16 bottom-0 h-[150px] w-[130px] rounded-xl object-cover shadow-lg rotate-3" />
                  <img src={about4} alt="" className="absolute right-2 bottom-6 h-[120px] w-[130px] rounded-xl object-cover shadow-md -rotate-3" />
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              variants={cardVariants}
              className="relative rounded-2xl bg-muted/40 p-8 min-h-[500px] overflow-hidden"
            >
              <h2
                className="text-2xl md:text-[28px] text-foreground"
                style={{ fontFamily: "'Exposure', 'New Spirit', serif", fontWeight: 650, letterSpacing: "-0.07em" }}
              >
                Education
              </h2>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8">
                <p className="self-start font-sans text-[14px] text-muted-foreground">
                  Bachelor of Art &amp; Design @UM
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-[110px] w-[110px] items-center justify-center rounded-2xl" style={{ backgroundColor: "#FFCB05" }}>
                    <span className="text-5xl font-black text-[#00274C]">M</span>
                  </div>
                  <div className="flex h-[110px] w-[110px] items-center justify-center rounded-2xl bg-[#32006E]">
                    <span className="text-5xl font-black text-white">W</span>
                  </div>
                </div>
                <p className="self-end font-sans text-[14px] text-muted-foreground">
                  Master of HCI + Design @UW
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Horizontal photo strip */}
        <section className="pt-20 pb-20">
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <div className="flex w-max gap-3 px-8 lg:px-24">
              {strip.map((item, i) => (
                <PhotoWithHover key={i} src={item.src} label={item.label} />
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </>
  );
};

export default About;
