import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-5 md:px-16 lg:px-24 md:py-6">
        <a href="#/" className="flex items-center gap-1.5 text-foreground font-light text-base font-['New_Spirit']" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}>
          <img src="/favicon-dark.svg" alt="" className="w-4 h-4" />
          Stella P.
        </a>
        
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#/" className="nav-link text-sm" onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}>product</a>
          <a href="#/visual" className="nav-link text-sm">visual</a>
          <a href="#/about" className="nav-link text-sm">about</a>
          <span className="flex items-center gap-1">
            <a href="https://drive.google.com/file/d/1GBV0XPi594jlw8w1T5tvuYeYDhqGcCh4/view" target="_blank" rel="noopener noreferrer" className="nav-link text-sm">resume</a>
            <span className="text-sm text-muted-foreground/40">/</span>
            <a href="https://www.linkedin.com/in/stellapengrnr/" target="_blank" rel="noopener noreferrer" className="nav-link text-sm">linkedin</a>
          </span>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 text-foreground"
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
            <a href="#/" className="text-2xl text-foreground" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}>product</a>
            <a href="#/visual" className="text-2xl text-foreground" onClick={() => setMenuOpen(false)}>visual</a>
            <a href="#/about" className="text-2xl text-foreground" onClick={() => setMenuOpen(false)}>about</a>
            <a
              href="https://drive.google.com/file/d/1GBV0XPi594jlw8w1T5tvuYeYDhqGcCh4/view"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-foreground"
              onClick={() => setMenuOpen(false)}
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
