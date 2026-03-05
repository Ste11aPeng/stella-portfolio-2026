import { cn } from "@/lib/utils";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const overviewEl = document.getElementById("overview");
      if (overviewEl) {
        const rect = overviewEl.getBoundingClientRect();
        if (rect.top <= 200) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav className="sticky top-32 hidden md:block">
      <ul className="flex flex-col text-right">
        {/* Home link */}
        <motion.li
          initial={{ opacity: 0, y: -8 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0 }}
        >
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground/50 transition-colors hover:text-foreground"
          >
            Home
          </button>
        </motion.li>

        {/* Spacer */}
        <li className="h-10" />

        {visibleSections.map((section, index) => (
          <motion.li
            key={section.id}
            initial={{ opacity: 0, y: -8 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.05 * (index + 1),
            }}
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
