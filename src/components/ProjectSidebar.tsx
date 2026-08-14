import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
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
  
  const [isVisible, setIsVisible] = useState(false);

  // Reset visibility when project changes
  useEffect(() => {
    setIsVisible(false);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  const getVisibleSections = () => {
    if (id === "stitchi") {
      return sections.filter(s => s.id !== "testing");
    }
    if (id === "philo") {
      return sections.map(s => s.id === "testing" ? { ...s, label: "Impact" } : s);
    }
    if (id === "asksia") {
      return [
        { id: "overview", label: "Overview" },
        { id: "challenge", label: "Challenge" },
        { id: "solution", label: "Solution" },
        { id: "impact", label: "Impact" },
        { id: "research", label: "UXR" },
        { id: "design-analysis", label: "Design Analysis" },
        { id: "reflection", label: "Reflection" },
      ];
    }
    return sections;
  };
  
  const visibleSections = getVisibleSections();

  return (
    <nav className="sticky top-32 hidden md:block group/sidebar">
      <ul className="flex flex-col text-right pt-16">


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
            className="transition-all duration-700 ease-out group-hover/sidebar:opacity-20 group-hover/sidebar:blur-[0.8px] hover:!opacity-100 hover:!blur-0"
          >
            <button
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "text-sm transition-colors hover:text-foreground",
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
