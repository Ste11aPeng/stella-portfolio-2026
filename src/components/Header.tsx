import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 flex items-center justify-between px-8 py-6 md:px-16 lg:px-24 transition-colors duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <a href="/" className="text-foreground font-medium text-base">Stella P.</a>
      <nav className="flex items-center gap-6 md:gap-8">
        <a href="#work" className="nav-link text-sm">work</a>
        <a href="#play" className="nav-link text-sm">play</a>
        <a href="#me" className="nav-link text-sm">me</a>
        <a href="#resume" className="nav-link text-sm">resume</a>
      </nav>
    </header>
  );
};

export default Header;