import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import workDesai from "@/assets/Rectangle_4.png.asset.json";
import workBadge from "@/assets/Rectangle_6.png.asset.json";
import workDesk from "@/assets/Rectangle_7.png.asset.json";
import workTrip from "@/assets/Rectangle_8.png.asset.json";
import tiktokLogo from "@/assets/img_logo.png.asset.json";
import educationVisual from "@/assets/education_visual.png.asset.json";

import album1 from "@/assets/album_1.png";
import album2 from "@/assets/album_2.png";
import album3 from "@/assets/album_3.png";
import album4 from "@/assets/album_4.png";
import album5 from "@/assets/album_5.png";
import album6 from "@/assets/album_6.png";
import album7 from "@/assets/album_7.png";
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

  return (
    <div
      className="about-marquee overflow-hidden relative rounded-[8px]"
      onMouseEnter={() => { targetRef.current = 0.08; }}
      onMouseLeave={() => { targetRef.current = 0.25; }}
    >
      <div ref={trackRef} className="flex w-max gap-1.5 will-change-transform">
        {items.map((item, i) => (
          <PhotoWithHover key={i} src={item.src} label={item.label} />
        ))}
      </div>
      {/* progressive blur edges */}
      <EdgeBlur side="left" size="18%" />
      <EdgeBlur side="right" size="18%" />

    </div>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const strip = [
  { src: album1, label: "Hi~" },
  { src: album2, label: "I love matcha" },
  { src: album3, label: "oasis live" },
  { src: album4, label: "brew time!" },
  { src: album5, label: "on the water" },
  { src: album6, label: "tahoe" },
  { src: album7, label: "shoot with my canon" },
];

const workItemsBase = [
  { id: "desai", src: workDesai.url, alt: "Desai Accelerator cohort", rotate: -7, className: "left-[-4%] top-[36%] w-[42%] rounded-[10px] object-cover shadow-md" },
  { id: "desk", src: workDesk.url, alt: "Matcha and laptop workspace", rotate: 6, className: "right-[-2%] top-[30%] w-[46%] rounded-[10px] object-cover shadow-md" },
  { id: "trip", src: workTrip.url, alt: "Team trip by the water", rotate: 8, className: "right-[-6%] top-[52%] w-[38%] rounded-[10px] object-cover shadow-md" },
  { id: "badge", src: workBadge.url, alt: "TikTok intern badge", rotate: -3, className: "left-[30%] top-[46%] w-[34%] rounded-[10px] object-cover shadow-lg" },
  { id: "logo", src: tiktokLogo.url, alt: "TikTok logo", rotate: 0, className: "left-[18%] bottom-[16%] w-[14%] rounded-full shadow-md" },
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
                  onScroll={(e) => setLifeScrolled(e.currentTarget.scrollTop > 4)}
                >
                  <div className="flex flex-col gap-5">
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
                </div>

                {/* top progressive blur, appears once scrolled */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-28 transition-opacity duration-500"
                  style={{ opacity: lifeScrolled ? 1 : 0 }}
                >
                  {[
                    { blur: 0.5, stops: "black 0%, black 50%, transparent 87.5%" },
                    { blur: 1, stops: "transparent 12.5%, black 37.5%, black 62.5%, transparent 87.5%" },
                    { blur: 2, stops: "transparent 25%, black 50%, black 75%, transparent 100%" },
                    { blur: 4, stops: "transparent 37.5%, black 62.5%, black 100%" },
                  ].map((l, i) => (
                    <div
                      key={i}
                      className="absolute inset-0"
                      style={{
                        backdropFilter: `blur(${l.blur}px)`,
                        WebkitBackdropFilter: `blur(${l.blur}px)`,
                        maskImage: `linear-gradient(to top, ${l.stops})`,
                        WebkitMaskImage: `linear-gradient(to top, ${l.stops})`,
                      }}
                    />
                  ))}
                </div>

                {/* bottom progressive blur */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28">
                  {[
                    { blur: 0.5, stops: "black 0%, black 50%, transparent 87.5%" },
                    { blur: 1, stops: "transparent 12.5%, black 37.5%, black 62.5%, transparent 87.5%" },
                    { blur: 2, stops: "transparent 25%, black 50%, black 75%, transparent 100%" },
                    { blur: 4, stops: "transparent 37.5%, black 62.5%, black 100%" },
                  ].map((l, i) => (
                    <div
                      key={i}
                      className="absolute inset-0"
                      style={{
                        backdropFilter: `blur(${l.blur}px)`,
                        WebkitBackdropFilter: `blur(${l.blur}px)`,
                        maskImage: `linear-gradient(to bottom, ${l.stops})`,
                        WebkitMaskImage: `linear-gradient(to bottom, ${l.stops})`,
                      }}
                    />
                  ))}
                </div>

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
                    style={{ rotate: item.rotate, zIndex: 20 + order.indexOf(item.id), touchAction: "none" }}
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
                  src={educationVisual.url}
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
