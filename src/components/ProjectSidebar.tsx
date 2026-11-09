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
          initial={{ opacity: 0, y: -8 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`mb-12 ${isVisible ? "" : "pointer-events-none"} transition-all duration-700 ease-out group-hover/sidebar:opacity-20 group-hover/sidebar:blur-[0.8px] hover:!opacity-100 hover:!blur-0`}
        >
          <Link
            to="/"
            onClick={() => playSound("switch")}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            back
          </Link>
        </motion.li>

        {visibleSections.map((section, index) => (
          <motion.li
            key={section.id}
            initial={{ opacity: 0, y: -8 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1 * (index + 1),
            }}
            className={`transition-all duration-700 ease-out group-hover/sidebar:opacity-20 group-hover/sidebar:blur-[0.8px] hover:!opacity-100 hover:!blur-0 ${isVisible ? "" : "pointer-events-none"}`}
          >
            <button
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "text-sm lowercase transition-colors hover:text-foreground",
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
