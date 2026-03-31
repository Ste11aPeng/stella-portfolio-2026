import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import about1 from "@/assets/about-1.png";
import about2 from "@/assets/about-2.png";
import about3 from "@/assets/about-3.png";
import about4 from "@/assets/about-4.png";
import { useRef, useState, useCallback, useEffect } from "react";

// Set page title
const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
    return () => { document.title = "Stella P. | Product Designer Portfolio"; };
  }, [title]);
};

const experiences = [
  { company: "AskSia Inc.", url: "https://www.asksia.ai/", role: "Product Designer", period: "2025 – 2026" },
  { company: "Desai Accelerator", url: "https://www.desaiaccelerator.com/", role: "Product Design Intern", period: "2025" },
  { company: "Michigan Engineering", url: "https://www.engin.umich.edu/", role: "Social Media Intern", period: "2024 – 2026" },
  { company: "Michigan Open UX", url: "https://www.moux.club/", role: "Product Designer", period: "2023" },
];

const education = [
  { school: "University of Michigan", degree: "B.A. Design, Minor in UX and Entre", period: "Class of 2025" },
  { school: "University of Washington", degree: "M.S. Human-Computer Interaction + Design", period: "Class of 2027" },
];

const PhotoWithHover = ({ src, label, index }: { src: string; label: string; index: number }) => {
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
      className="aspect-[4/5] overflow-hidden bg-muted relative cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} alt={label} className="w-full h-full object-cover" />
      {isHovering && (
        <div ref={hintRef} className="project-cursor-hint" style={{ willChange: "left, top" }}>
          {label}
        </div>
      )}
    </div>
  );
};

const About = () => {
  usePageTitle("About Stella P. | Product Designer");
  const [stellaHovered, setStellaHovered] = useState(false);
  const [eduHovered, setEduHovered] = useState(false);
  const sayHelloRef = useRef<HTMLParagraphElement>(null);
  const [highlight, setHighlight] = useState<'idle' | 'ready' | 'sweeping' | 'fading'>('idle');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    await navigator.clipboard.writeText("stellanotfound@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleReachOut = useCallback(() => {
    setHighlight('ready');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHighlight('sweeping');
      });
    });
    setTimeout(() => setHighlight('fading'), 1800);
    setTimeout(() => setHighlight('idle'), 3800);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background relative z-10">
        <Header />

        <section className="px-8 pt-16 pb-12 lg:px-24 md:px-[32px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Left – Introduction */}
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
              }}
            >
              <motion.h1
                className="font-['New_Spirit'] text-3xl md:text-4xl font-normal text-foreground leading-snug"
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } }}
              >
                Hi, I'm{" "}
                <span
                  className="relative inline-flex items-center cursor-pointer"
                  onMouseEnter={() => setStellaHovered(true)}
                  onMouseLeave={() => setStellaHovered(false)}
                >
                  Stella.
                  <AnimatePresence>
                    {stellaHovered && (
                      <motion.button
                        onClick={handleReachOut}
                        className="absolute left-full ml-2 whitespace-nowrap text-[14px] font-sans font-normal text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        reach out!
                      </motion.button>
                    )}
                  </AnimatePresence>
                </span>
              </motion.h1>
              <motion.p className="font-sans text-[14px] leading-relaxed text-muted-foreground" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } }}>
                A product designer drawn to visual clarity, new tools, and the messy questions behind how products actually work.
              </motion.p>
              <motion.p className="font-sans text-[14px] leading-relaxed text-muted-foreground" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } }}>
                TLDR of my life: I grew up in China, and recently graduated in design from the University of Michigan, so I naturally notice how people use things differently.
              </motion.p>
              <motion.p className="font-sans text-[14px] leading-relaxed text-muted-foreground" variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } }}>
                More than anything, I'm trying to become a designer who brings clarity, momentum, and a point of view to the team.{" "}
                <span
                  ref={sayHelloRef}
                  className="inline"
                  style={highlight === 'ready' ? {
                    backgroundImage: "linear-gradient(90deg, #3B82F6 0%, #3B82F6 100%)",
                    backgroundSize: "0% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left top",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  } : highlight === 'sweeping' ? {
                    backgroundImage: "linear-gradient(90deg, #3B82F6 0%, #3B82F6 100%)",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left top",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transition: "background-size 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  } : highlight === 'fading' ? {
                    color: "hsl(var(--muted-foreground))",
                    transition: "color 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  } : {}}
                >
                  Say hello at{" "}
                  <button onClick={handleCopyEmail} className="underline-offset-2 cursor-pointer" style={{ color: "inherit", WebkitTextFillColor: "inherit" }}>{copied ? "copied!" : "stellanotfound@gmail.com"}</button>
                  {" "}or via{" "}
                  <a href="https://www.linkedin.com/in/stellapengrnr/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: "inherit", WebkitTextFillColor: "inherit" }}>LinkedIn</a>.
                </span>
              </motion.p>
            </motion.div>

            {/* Right – Experience & Education */}
            <motion.div
              className="flex flex-col gap-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } }}>
                <h2 className="font-['New_Spirit'] text-xl md:text-2xl font-normal text-muted-foreground mb-4">
                  Experience
                </h2>
                <div className="flex flex-col divide-y divide-border/40">
                  {experiences.map((exp, i) => (
                    <div key={i} className="flex items-baseline justify-between py-3 first:pt-0">
                      <p className="font-sans text-[14px] text-foreground">
                        <a href={exp.url} target="_blank" rel="noopener noreferrer" className="font-medium relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1.5px] after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">{exp.company}</a>
                        <span className="text-muted-foreground"> / {exp.role}</span>
                      </p>
                      <p className="font-sans text-[13px] text-muted-foreground/60 whitespace-nowrap ml-4">
                        {exp.period}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
              <div>
                <h2
                  className="font-['New_Spirit'] text-xl md:text-2xl font-normal text-muted-foreground mb-4 relative inline-flex items-center"
                  onMouseEnter={() => setEduHovered(true)}
                  onMouseLeave={() => setEduHovered(false)}
                >
                  Education
                  <AnimatePresence>
                    {eduHovered && (
                      <motion.span
                        className="absolute left-full ml-2 whitespace-nowrap text-[14px] font-sans font-normal text-muted-foreground select-none pointer-events-none"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        go blue!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </h2>
                <div className="flex flex-col divide-y divide-border/40">
                  {education.map((edu, i) => (
                    <div key={i} className="flex items-baseline justify-between py-3 first:pt-0">
                      <p className="font-sans text-[14px] text-foreground">
                        <span className="font-medium">{edu.school}</span>
                        <span className="text-muted-foreground"> / {edu.degree}</span>
                      </p>
                      <p className="font-sans text-[13px] text-muted-foreground/60 whitespace-nowrap ml-4">
                        {edu.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bottom – Photo Gallery */}
        <section className="px-8 pt-6 pb-16 lg:px-24 md:px-[32px]">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-[10px]"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          >
            {[
              { src: about1, label: "Hi~" },
              { src: about2, label: "I love matcha" },
              { src: about3, label: "Shoot with my Fuji" },
              { src: about4, label: "Brew time!" },
            ].map((item, i) => (
              <PhotoWithHover key={i} src={item.src} label={item.label} index={i} />
            ))}
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
