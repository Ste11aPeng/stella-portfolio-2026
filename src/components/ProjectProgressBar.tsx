import { useEffect, useState } from "react";

// The reading-progress strip along the bottom of a case study: a white band
// with a thin line on its top edge that fills as you read. `color` tints the
// line in the project's own colour (its title tag colour); without one it
// stays the ink colour.
const ProjectProgressBar = ({ color }: { color?: string }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background pointer-events-none">
      <div className="relative h-[1.5px] w-full bg-foreground/10 overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full transition-[width] duration-75 ease-out ${color ? "" : "bg-foreground"}`}
          style={{ width: `${progress * 100}%`, backgroundColor: color }}
        />
      </div>
      {/* the band below the line (it used to hold a "home" link) */}
      <div className="h-11" />
    </div>
  );
};

export default ProjectProgressBar;
