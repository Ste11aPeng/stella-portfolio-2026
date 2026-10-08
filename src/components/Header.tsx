import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { useNavSound } from "@/hooks/use-nav-sound";
import { openResume } from "@/lib/resume-events";
import { RESUME_PDF } from "@/data/resume";

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
        <div className="relative max-w-[1440px] mx-auto flex items-center justify-between px-6 py-5 md:px-16 lg:px-24 md:py-6 group/header">
        <Link to="/" className={`flex items-center gap-1.5 font-light text-base font-['New_Spirit'] transition-all duration-700 ease-out group-hover/header:opacity-20 group-hover/header:blur-[0.8px] ${onDark ? "text-white" : "text-foreground"}`} onClick={() => { playSound("switch"); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}>
          <img src={onDark ? "/favicon-light.svg" : "/favicon-dark.svg"} alt="" className="w-4 h-4" />
          Stella
        </Link>

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
