import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectProgressBar = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      setProgress(pct);
      // Hide the bar once the page is scrolled to the very bottom (footer)
      const footer = document.querySelector("footer");
      const footerVisible = footer ? footer.getBoundingClientRect().top < window.innerHeight - 1 : false;
      setHidden(footerVisible || scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-background transition-[opacity,transform] duration-300 ${hidden ? "opacity-0 translate-y-full pointer-events-none" : "opacity-100 translate-y-0"}`}
    >
      {/* Progress line — sits at the very top of the bar */}
      <div className="relative h-px w-full bg-foreground/10 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-foreground transition-[width] duration-75 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex items-center px-6 md:px-16 lg:px-24 py-3">
        {/* Home button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-foreground/60 hover:text-foreground transition-colors duration-300 text-sm"
          style={{ letterSpacing: "-0.07em" }}
          aria-label="home"
        >
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-foreground/35">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>home</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectProgressBar;
