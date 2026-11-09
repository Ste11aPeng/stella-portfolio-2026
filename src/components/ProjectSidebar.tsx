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
    // pinned to the top-left corner, where the homepage's intro sits; case
    // studies have no header on desktop, so "back" here is the way home
    <nav className="fixed top-8 left-8 lg:left-9 z-40 hidden md:block group/sidebar">
      <ul className="flex flex-col text-left">
        <motion.li
          initial={HIDDEN}
          animate={isVisible ? SHOWN : HIDDEN}
          transition={isVisible ? enter(0) : LEAVE}
          className={`mb-12 ${isVisible ? "" : "pointer-events-none"}`}
        >
          <Link
            to="/"
            onClick={() => playSound("switch")}
            className={`${HOVER} text-sm text-muted-foreground hover:text-foreground`}
          >
            back
          </Link>
        </motion.li>

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
                "text-sm lowercase hover:text-foreground",
                activeSection === section.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/50"
              )}
            >
              {section.label}
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default ProjectSidebar;
