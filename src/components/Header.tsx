import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { useNavSound } from "@/hooks/use-nav-sound";
import { openResume } from "@/lib/resume-events";
import { RESUME_PDF } from "@/data/resume";
import NameCard, { CARD_H, CARD_W } from "@/components/NameCard";
import { useNameCardOnScreen } from "@/lib/name-card-visibility";

// Hovering the 粲 mark opens the name card (see NameCard) just below it.
// The page behind the card goes out of focus by distance: heaviest right at
// the card's sides and bottom, lighter in each ring further out, until it is
// sharp again. Each ring is a backdrop blur over the card's box grown by
// `reach` px, feathered over its last `feather` px (nothing grows upward, so
// the logo above stays sharp). They stack, so the blur compounds near the card.
const HALO_RINGS = [
  { reach: 100, feather: 56, blur: 1.5, extra: "" },
  { reach: 64, feather: 42, blur: 3.5, extra: "" },
  { reach: 36, feather: 28, blur: 7, extra: " saturate(1.1)" },
  { reach: 16, feather: 16, blur: 14, extra: " saturate(1.15) brightness(1.02)" },
];

const ringMask = (feather: number) =>
  `linear-gradient(to right, transparent, black ${feather}px, black calc(100% - ${feather}px), transparent), ` +
  `linear-gradient(to bottom, transparent, black 14px, black calc(100% - ${feather}px), transparent)`;

const haloFade = (shown: boolean) =>
  `absolute transition-opacity ease-out ${shown ? "opacity-100 duration-700 delay-150" : "opacity-0 duration-300"}`;

const BlurHalo = ({ shown }: { shown: boolean }) => (
  // sits exactly over the card's box (below the pt-3 bridge); a sibling of the
  // card, not inside it, so the backdrop blur sees the page. Never takes the
  // pointer, so only the logo and the card keep the note open.
  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-3" style={{ height: CARD_H }}>
    {HALO_RINGS.map(({ reach, feather, blur, extra }, i) => {
      const mask = ringMask(feather);
      return (
        <div
          key={i}
          className={haloFade(shown)}
          style={{
            left: -reach,
            right: -reach,
            top: -4,
            bottom: -reach,
            backdropFilter: `blur(${blur}px)${extra}`,
            WebkitBackdropFilter: `blur(${blur}px)${extra}`,
            maskImage: mask,
            WebkitMaskImage: mask,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
      );
    })}
    {/* a breath of the page colour close to the card, for a frosted feel */}
    <div
      className={haloFade(shown)}
      style={{
        left: -40,
        right: -40,
        top: -4,
        bottom: -48,
        background: "hsl(var(--background) / 0.35)",
        maskImage: ringMask(40),
        WebkitMaskImage: ringMask(40),
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  </div>
);

const NameNote = () => {
  const [hovered, setHovered] = useState(false);
  const bridgeRef = useRef<HTMLDivElement>(null);
  // the About page's own copy of the card is in view: no need for this one
  const pageCardOnScreen = useNameCardOnScreen();
  const shown = hovered && !pageCardOnScreen;

  // Open while the logo or the card is hovered (the group around both).
  useEffect(() => {
    const host = bridgeRef.current?.parentElement;
    if (!host) return;
    const on = () => setHovered(true);
    const off = () => setHovered(false);
    host.addEventListener("mouseenter", on);
    host.addEventListener("mouseleave", off);
    return () => {
      host.removeEventListener("mouseenter", on);
      host.removeEventListener("mouseleave", off);
    };
  }, []);

  return (
    // pt-3 bridges the gap under the logo, so the pointer can move onto the card
    // without losing the hover; it only takes the pointer while showing.
    <div
      ref={bridgeRef}
      aria-hidden="true"
      className={`absolute left-0 top-full pt-3 hidden md:block ${shown ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{ width: CARD_W }}
    >
      <BlurHalo shown={shown} />
      <NameCard shown={shown} />
    </div>
  );
};

const Header = () => {
  const playSound = useNavSound();
  const [menuOpen, setMenuOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Auto-switch the logo/nav to light text when a section marked
  // data-header-contrast="light" (i.e. a dark visual) scrolls under the
  // header. Watches a thin band at the top of the viewport roughly matching
  // the header's own height, re-scanning the DOM on route change since each
  // page marks different sections.
  useEffect(() => {
    const darkSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-header-contrast="light"]')
    );
    if (darkSections.length === 0) {
      setOnDark(false);
      return;
    }

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        });
        setOnDark(intersecting.size > 0);
      },
      { rootMargin: "0px 0px -90% 0px", threshold: 0 }
    );
    darkSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Progressive blur backdrop: strongest right at the top edge, easing
            off toward the bottom so the bar reads as a soft gradient rather
            than a solid bar with a hard seam. */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 backdrop-blur-md"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--background) / 0.65), hsl(var(--background) / 0.15) 70%, transparent 100%)",
            }}
          />
        </div>
        <div className="relative max-w-[1440px] mx-auto flex items-center justify-between px-8 py-5 md:px-[32px] lg:px-24 md:py-6 group/header">
        <div className="group/logo relative">
          <Link to="/" aria-label="Stella Peng, home" className={`relative flex items-center font-['New_Spirit'] transition-all duration-700 ease-out group-hover/header:opacity-20 group-hover/header:blur-[0.8px] hover:!opacity-100 hover:!blur-0 group-hover/logo:!opacity-100 group-hover/logo:!blur-0 ${onDark ? "text-white" : "text-foreground"}`} onClick={() => { playSound("switch"); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}>
            {/* on hover (away from the homepage) the mark gives way to "back home";
                the card below explains 粲 either way */}
            <img
              src={onDark ? "/favicon-light.svg" : "/favicon-dark.svg"}
              alt="粲"
              className={`w-[18px] h-[19px] transition-all duration-300 ease-out ${currentPath === "/" ? "" : "md:group-hover/logo:opacity-0 md:group-hover/logo:blur-[3px]"}`}
            />
            {/* already home: keep the mark */}
            {currentPath !== "/" && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 hidden md:block whitespace-nowrap font-sans text-sm opacity-0 blur-[3px] transition-all duration-300 ease-out group-hover/logo:opacity-100 group-hover/logo:blur-0 group-hover/logo:delay-75"
            >
              back home
            </span>
            )}
          </Link>
          <NameNote />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 group/nav">
          <Link to="/" className={`nav-link text-sm transition-all duration-700 ease-out group-hover/nav:opacity-20 group-hover/nav:blur-[0.8px] hover:!opacity-100 hover:!blur-0 ${onDark ? "!text-white/80 hover:!text-white" : currentPath === "/" ? "text-foreground" : ""}`} onClick={() => { playSound("click"); window.scrollTo({ top: 0, behavior: "instant" }); }}>product</Link>
          <Link to="/visual" className={`nav-link text-sm transition-all duration-700 ease-out group-hover/nav:opacity-20 group-hover/nav:blur-[0.8px] hover:!opacity-100 hover:!blur-0 ${onDark ? "!text-white/80 hover:!text-white" : currentPath === "/visual" ? "text-foreground" : ""}`} onClick={() => playSound("switch")}>visual</Link>
          <Link to="/about" className={`nav-link text-sm transition-all duration-700 ease-out group-hover/nav:opacity-20 group-hover/nav:blur-[0.8px] hover:!opacity-100 hover:!blur-0 ${onDark ? "!text-white/80 hover:!text-white" : currentPath === "/about" ? "text-foreground" : ""}`} onClick={() => playSound("click")}>about</Link>
          <span className="flex items-center gap-1">
            <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); openResume(); }} className={`nav-link text-sm group/resume relative inline-flex items-center transition-all duration-700 ease-out group-hover/nav:opacity-20 group-hover/nav:blur-[0.8px] hover:!opacity-100 hover:!blur-0 ${onDark ? "!text-white/80 hover:!text-white" : ""}`}>
              resume
            </a>
            <span className={`text-sm transition-all duration-700 ease-out group-hover/nav:opacity-20 group-hover/nav:blur-[0.8px] ${onDark ? "text-white/40" : "text-muted-foreground/40"}`}>/</span>
            <a href="https://www.linkedin.com/in/stellapengrnr/" target="_blank" rel="noopener noreferrer" className={`nav-link text-sm group/li relative inline-flex items-center transition-all duration-700 ease-out group-hover/nav:opacity-20 group-hover/nav:blur-[0.8px] hover:!opacity-100 hover:!blur-0 ${onDark ? "!text-white/80 hover:!text-white" : ""}`}>
              linkedin
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="absolute left-full top-1/2 -translate-y-1/2 translate-x-0.5 opacity-0 transition-all duration-300 ease-out group-hover/li:opacity-100"
              />
            </a>
          </span>

        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-1 transition-colors duration-500 ${onDark ? "text-white" : "text-foreground"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Link to="/" className="text-2xl text-foreground" onClick={() => { playSound("click"); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}>product</Link>
            <Link to="/visual" className="text-2xl text-foreground" onClick={() => { playSound("switch"); setMenuOpen(false); }}>visual</Link>
            <Link to="/about" className="text-2xl text-foreground" onClick={() => { playSound("click"); setMenuOpen(false); }}>about</Link>
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-foreground"
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); openResume(); }}
            >
              resume
            </a>
            <a
              href="https://www.linkedin.com/in/stellapengrnr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              linkedin
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
