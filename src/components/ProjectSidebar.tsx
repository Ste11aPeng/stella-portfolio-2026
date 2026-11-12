import { cn } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";
import { useNavSound } from "@/hooks/use-nav-sound";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProjectSidebarProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "solution", label: "Solution" },
  { id: "research", label: "Research" },
  { id: "testing", label: "Iteration" },
  { id: "reflection", label: "Reflection" },
];

// In, the items drop in one after another; out (scrolling back up to the
// cover), they all go at once, quickly. The list items carry this motion and
// the links inside carry the hover fade, so the two never fight over opacity.
const HIDDEN = { opacity: 0, y: -8 };
const SHOWN = { opacity: 1, y: 0 };
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const enter = (delay: number) => ({ duration: 0.6, ease: EASE, delay });
const LEAVE = { duration: 0.2, ease: "easeOut" as const, delay: 0 };
// hovering the nav fades and softly blurs every item but the one under the pointer
const HOVER =
  "inline-block transition-all duration-700 ease-out group-hover/sidebar:opacity-20 group-hover/sidebar:blur-[0.8px] hover:!opacity-100 hover:!blur-0";

const ProjectSidebar = ({ activeSection, onSectionClick }: ProjectSidebarProps) => {
  const { id } = useParams<{ id: string }>();
  const playSound = useNavSound();
  
  const [isVisible, setIsVisible] = useState(false);

  // Reset visibility when project changes
  useEffect(() => {
    setIsVisible(false);
  }, [id]);

  useEffect(() => {
    // the nav ("back" included) stays out of the way while the cover is on
    // screen and comes in once the write-up is reached
    const handleScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.6);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  const getVisibleSections = () => {
    if (id === "stitchi") {
      return sections.filter(s => s.id !== "testing");
    }
    if (id === "philo") {
      return [
        { id: "overview", label: "Overview" },
        { id: "challenge", label: "Challenge" },
        { id: "solution", label: "Solution" },
        { id: "audit-review", label: "Audit & Review" },
        { id: "component-mapping", label: "Component Mapping" },
      ];
    }
    if (id === "tiktok-widget") {
      return [
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Problem" },
      { id: "widget", label: "Widget" },
      { id: "tutorial", label: "Tutorial" },
      { id: "cold-start", label: "Cold Start" },
      { id: "reflection", label: "Takeaway" },
    ];
    }
    if (id === "tiktok-highlights") {
      return [
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Challenge" },
      { id: "solution-1", label: "Solution 1" },
      { id: "solution-2", label: "Solution 2" },
      { id: "reflection", label: "Reflection" },
    ];
    }
    if (id === "asksia") {
      return [
        { id: "overview", label: "Overview" },
        { id: "challenge", label: "Challenge" },
        { id: "solution", label: "Solution" },
        { id: "research", label: "Case Study" },
        { id: "design-analysis", label: "Design Decision" },
        { id: "reflection", label: "Reflection" },
      ];
    }
    return sections;
  };
  
  const visibleSections = getVisibleSections();

  return (
    // "back" stays pinned top-left, where the homepage's intro sits (case
    // studies have no header on desktop, so it's the way home); the section
    // list sits apart in the bottom-left corner
    <>
      <nav className="fixed top-8 left-8 lg:left-9 z-40 hidden md:block group/sidebar">
        <motion.div
          initial={HIDDEN}
          animate={isVisible ? SHOWN : HIDDEN}
          transition={isVisible ? enter(0) : LEAVE}
          className={isVisible ? "" : "pointer-events-none"}
        >
          <Link
            to="/"
            onClick={() => playSound("switch")}
            className={`${HOVER} text-sm text-muted-foreground hover:text-foreground`}
          >
            back
          </Link>
        </motion.div>
      </nav>

      {/* clear of the reading-progress band along the bottom (~46px), with the same 32px as "back" keeps from the top */}
      <nav aria-label="Sections" className="fixed bottom-[78px] left-8 lg:left-9 z-40 hidden md:block group/sidebar">
        <ul className="flex flex-col text-left">
          {visibleSections.map((section, index) => (
            <motion.li
              key={section.id}
              initial={HIDDEN}
              animate={isVisible ? SHOWN : HIDDEN}
              transition={isVisible ? enter(0.1 * (index + 1)) : LEAVE}
              className={isVisible ? "" : "pointer-events-none"}
            >
              <button
                onClick={() => onSectionClick(section.id)}
                className={cn(
                  HOVER,
                  "inline-flex items-center text-sm lowercase hover:text-foreground",
                  activeSection === section.id ? "text-foreground" : "text-muted-foreground/50"
                )}
              >
                {/* the same short leading line as the homepage sidebar marks the section on screen */}
                <span
                  aria-hidden="true"
                  className={`inline-block h-px bg-foreground transition-all duration-500 ease-out ${
                    activeSection === section.id ? "w-2 mr-1.5 opacity-100" : "w-0 mr-0 opacity-0"
                  }`}
                />
                {section.label}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default ProjectSidebar;
