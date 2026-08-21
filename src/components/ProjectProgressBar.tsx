import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectProgressBar = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-foreground/5">
      <div className="flex items-center px-6 md:px-16 lg:px-24 py-3">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-foreground/60 hover:text-foreground transition-colors duration-300 text-sm"
          style={{ letterSpacing: "-0.07em" }}
          aria-label="back"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>back</span>
        </button>

        {/* Progress track */}
        <div className="flex-1 ml-6 h-px bg-foreground/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-foreground transition-[width] duration-75 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressBar;
