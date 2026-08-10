import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EdgeBlur from "@/components/EdgeBlur";
import { motion } from "framer-motion";
import workDesai from "@/assets/Rectangle_4.png";
import workBadge from "@/assets/Rectangle_6.png";
import workDesk from "@/assets/Rectangle_7.png";
import workTrip from "@/assets/Rectangle_8.png";
import tiktokLogo from "@/assets/img_logo.png";
import educationVisual from "@/assets/education_visual.png";

import album1 from "@/assets/album_1.png";
import album2 from "@/assets/album_2.png";
import album3 from "@/assets/album_3.png";
import album4 from "@/assets/album_4.png";
import album5 from "@/assets/album_5.png";
import album6 from "@/assets/album_6.png";
import album7 from "@/assets/album_7.png";
import album8 from "@/assets/album_8.jpg";
import stickerFigma from "@/assets/sticker-figma.png";
import stickerClaude from "@/assets/sticker-claude-code.png";
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
      className="relative h-[240px] w-[192px] flex-shrink-0 overflow-hidden rounded-[2px] bg-muted cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} alt={label} className="h-full w-full object-cover rounded-[2px]" />
      {isHovering && (
        <div ref={hintRef} className="project-cursor-hint" style={{ willChange: "left, top" }}>
          {label}
        </div>
      )}
    </div>
  );
};

const MarqueeStrip = ({ items }: { items: { src: string; label: string }[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(0.25);
  const targetRef = useRef(0.25);
  const rafRef = useRef<number>();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let last = performance.now();
    const animate = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      speedRef.current += (targetRef.current - speedRef.current) * 0.06;
      offsetRef.current += speedRef.current * dt;
      const track = trackRef.current;
      if (track) {
        const half = track.scrollWidth / 2;
        if (half > 0 && offsetRef.current >= half) offsetRef.current -= half;
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const dragging = useRef(false);
  const lastX = useRef(0);

  const normalize = () => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    while (offsetRef.current >= half) offsetRef.current -= half;
    while (offsetRef.current < 0) offsetRef.current += half;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    lastX.current = e.clientX;
    targetRef.current = 0;
    speedRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    offsetRef.current -= dx;
    normalize();
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* noop */ }
    targetRef.current = 0.08;
  };

  return (
    <div
      className="about-marquee overflow-hidden relative rounded-[8px] touch-pan-y select-none"
      onMouseEnter={() => { if (!dragging.current) targetRef.current = 0.08; }}
      onMouseLeave={() => { if (!dragging.current) targetRef.current = 0.25; }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div ref={trackRef} className="flex w-max gap-1.5 will-change-transform">
        {items.map((item, i) => (
          <PhotoWithHover key={i} src={item.src} label={item.label} />
        ))}
      </div>
      {/* progressive blur edges */}
      <EdgeBlur side="left" size="26%" />
      <EdgeBlur side="right" size="26%" />

    </div>
  );
};


const cardVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const strip = [
  { src: album1, label: "me by the lake" },
  { src: album2, label: "always make a drink before diving into work" },
  { src: album3, label: "blur vs oasis" },
  { src: album4, label: "brew time" },
  { src: album5, label: "monterey" },
  { src: album6, label: "tahoe" },
  { src: album7, label: "i waymo everywhere" },
  { src: album8, label: "playing khalil fong 🎵" },
];

const workItemsBase = [
  { id: "desai", src: workDesai, alt: "Desai Accelerator cohort", rotate: -5, className: "left-[-3%] top-[26%] w-[42%] rounded-[10px] object-cover shadow-md" },
  { id: "desk", src: workDesk, alt: "Matcha and laptop workspace", rotate: 5, className: "left-[46%] top-[24%] w-[42%] rounded-[10px] object-cover shadow-md" },
  { id: "trip", src: workTrip, alt: "Team trip by the water", rotate: 4, className: "left-[66%] top-[41%] w-[40%] rounded-[10px] object-cover shadow-md" },
  { id: "badge", src: workBadge, alt: "TikTok intern badge", rotate: -3, className: "left-[24%] top-[44%] w-[38%] rounded-[10px] object-cover shadow-lg" },
  { id: "logo", src: tiktokLogo, alt: "TikTok logo", rotate: 0, className: "left-[14%] top-[70%] w-[16%] rounded-full shadow-md" },
  { id: "figma", src: stickerFigma, alt: "Figma sticker", rotate: 0, className: "left-[72%] top-[15%] w-[16%] rounded-full", shadowStyle: "0 8px 24px -6px rgba(0,0,0,0.12), 0 2px 8px -2px rgba(0,0,0,0.06)" },
  { id: "claude", src: stickerClaude, alt: "Claude Code sticker", rotate: 0, className: "left-[56%] top-[78%] w-[17%]", shadowStyle: "0 8px 24px -6px rgba(0,0,0,0.12), 0 2px 8px -2px rgba(0,0,0,0.06)" },
];


const About = () => {
  usePageTitle("About Stella Peng | Product Designer");
  const [copied, setCopied] = useState(false);
  const [lifeScrolled, setLifeScrolled] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState(workItemsBase.map((i) => i.id));
  const workItems = workItemsBase;

  const bringToFront = useCallback((id: string) => {
    setOrder((prev) => [...prev.filter((x) => x !== id), id]);
  }, []);

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
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
          >
            {/* Life */}
            <motion.div
              variants={cardVariants}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              <h2
                className="relative z-20 px-8 pt-8 text-2xl md:text-[28px] text-foreground"
                style={{ fontFamily: "'Exposure', 'New Spirit', serif", fontWeight: 650, letterSpacing: "-0.07em" }}
              >
                Life
              </h2>
              <div className="relative flex-1 mt-8 min-h-0">
                <div
                  className="h-full overflow-y-auto px-8 pb-12 about-scroll"
                  onScroll={(e) => setLifeScrolled(e.currentTarget.scrollTop > 0)}
                >
                  <div className="flex flex-col gap-5">
                    <p className="font-sans text-[15px] leading-relaxed text-muted-foreground">
                      I'm currently a product design intern at TikTok, where I{" "}
                      <span className="text-foreground">design end-to-end social experiences and explore how AI can become a natural part of the design process.</span>{" "}
                      I like using AI not simply as a productivity tool, but as a way to think, experiment, and build differently.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-muted-foreground">
                      Before TikTok, I worked with early-stage startups, where I learned to be comfortable with ambiguity. I worked across design systems, product concepts, and wireframes. That experience shaped how I approach design today:{" "}
                      <span className="text-foreground">I care about the big picture, but I also like getting my hands dirty and figuring out how things actually get built.</span>
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-muted-foreground">
                      Outside of design, I'm pretty much the same person:{" "}
                      <span className="text-foreground">I'm curious, hands-on, and always up for trying something new.</span>{" "}
                      I like picking up new sports, exploring unfamiliar cities, always getting my driver license, and spending an unreasonable amount of time playing board games with friends.
                    </p>
                  </div>
                </div>

                {/* top progressive blur, appears once scrolled */}
                <EdgeBlur
                  side="top"
                  className="transition-opacity duration-150"
                  style={{ opacity: lifeScrolled ? 1 : 0 }}
                />

                {/* bottom progressive blur */}
                <EdgeBlur side="bottom" />


              </div>
            </motion.div>


            {/* Work */}
            <motion.div
              variants={cardVariants}
              ref={workRef}
              className="relative aspect-[4/5] rounded-2xl p-8 overflow-hidden"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              <h2
                className="relative z-10 text-2xl md:text-[28px] text-foreground pointer-events-none"
                style={{ fontFamily: "'Exposure', 'New Spirit', serif", fontWeight: 650, letterSpacing: "-0.07em" }}
              >
                Work
              </h2>
              <div className="absolute inset-0">
                {workItems.map((item) => (
                  <motion.img
                    key={item.id}
                    src={item.src}
                    alt={item.alt}
                    drag
                    dragConstraints={workRef}
                    dragElastic={0.12}
                    dragMomentum={false}
                    whileDrag={{ scale: 1.04, rotate: item.rotate }}
                    onPointerDown={() => bringToFront(item.id)}
                    className={`absolute cursor-grab active:cursor-grabbing select-none ${item.className}`}
                    style={{ rotate: item.rotate, zIndex: 20 + order.indexOf(item.id), touchAction: "none", boxShadow: (item as any).shadowStyle || undefined }}
                    draggable={false}
                  />
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              variants={cardVariants}
              className="relative aspect-[4/5] rounded-2xl p-8 overflow-hidden"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              <h2
                className="relative z-10 text-2xl md:text-[28px] text-foreground"
                style={{ fontFamily: "'Exposure', 'New Spirit', serif", fontWeight: 650, letterSpacing: "-0.07em" }}
              >
                Education
              </h2>
              <div className="absolute inset-0 flex items-end justify-center px-6 pb-[10%]">
                <img
                  src={educationVisual}
                  alt="Bachelor of Art & Design at UM, Master of HCI + Design at UW"
                  className="w-[96%] object-contain"
                />
              </div>
            </motion.div>


          </motion.div>
        </section>

        {/* Horizontal photo strip - auto scrolling, slows on hover */}
        <section className="pt-20 pb-20 px-8 lg:px-24 md:px-[32px] max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MarqueeStrip items={[...strip, ...strip]} />
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
