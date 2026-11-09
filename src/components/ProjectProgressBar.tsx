import { useEffect, useState } from "react";

// A thin reading-progress line along the bottom edge of a case study.
// `color` tints it in the project's own colour (its title tag colour);
// without one it stays the ink colour.
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
    <div className="fixed bottom-0 left-0 right-0 z-50 h-[1.5px] bg-foreground/10 overflow-hidden pointer-events-none">
      <div
        className={`absolute top-0 left-0 h-full transition-[width] duration-75 ease-out ${color ? "" : "bg-foreground"}`}
        style={{ width: `${progress * 100}%`, backgroundColor: color }}
      />
    </div>
  );
};

export default ProjectProgressBar;
