import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

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
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-5 md:px-16 lg:px-24 md:py-6 group/header">
        <Link to="/" className="flex items-center gap-1.5 text-foreground font-light text-base font-['New_Spirit'] transition-all duration-700 ease-out group-hover/header:opacity-20 group-hover/header:blur-[0.8px]" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}>
          <img src="/favicon-dark.svg" alt="" className="w-4 h-4" />
          Stella
        </Link>
        
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 group/nav">
          <Link to="/" className={`nav-link text-sm transition-all duration-700 ease-out group-hover/nav:opacity-20 group-hover/nav:blur-[0.8px] hover:!opacity-100 hover:!blur-0 ${currentPath === "/" ? "text-foreground" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}>product</Link>
          <Link to="/visual" className={`nav-link text-sm transition-all duration-700 ease-out group-hover/nav:opacity-20 group-hover/nav:blur-[0.8px] hover:!opacity-100 hover:!blur-0 ${currentPath === "/visual" ? "text-foreground" : ""}`}>visual</Link>
          <Link to="/about" className={`nav-link text-sm transition-all duration-700 ease-out group-hover/nav:opacity-20 group-hover/nav:blur-[0.8px] hover:!opacity-100 hover:!blur-0 ${currentPath === "/about" ? "text-foreground" : ""}`}>about</Link>
          <span className="flex items-center gap-1 transition-all duration-700 ease-out group-hover/nav:opacity-20 group-hover/nav:blur-[0.8px] hover:!opacity-100 hover:!blur-0">
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
            <Link to="/" className="text-2xl text-foreground" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}>product</Link>
            <Link to="/visual" className="text-2xl text-foreground" onClick={() => setMenuOpen(false)}>visual</Link>
            <Link to="/about" className="text-2xl text-foreground" onClick={() => setMenuOpen(false)}>about</Link>
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
