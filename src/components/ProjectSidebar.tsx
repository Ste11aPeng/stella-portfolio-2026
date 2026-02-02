import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";

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
  
  // Filter out testing/iteration for Stitchi project
  const visibleSections = id === "stitchi" 
    ? sections.filter(s => s.id !== "testing") 
    : sections;

  return (
    <nav className="sticky top-32 hidden lg:block">
      <ul className="flex flex-col text-right">
        {visibleSections.map((section) => (
          <li key={section.id}>
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
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProjectSidebar;
