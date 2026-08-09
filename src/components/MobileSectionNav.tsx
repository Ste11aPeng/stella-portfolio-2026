import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";

interface MobileSectionNavProps {
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

const MobileSectionNav = ({ activeSection, onSectionClick }: MobileSectionNavProps) => {
  const { id } = useParams<{ id: string }>();

  const getVisibleSections = () => {
    if (id === "stitchi") return sections.filter(s => s.id !== "testing");
    if (id === "philo") return sections.map(s => s.id === "testing" ? { ...s, label: "Impact" } : s);
    if (id === "asksia") return [
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Challenge" },
      { id: "solution", label: "Solution" },
      { id: "impact", label: "Impact" },
      { id: "research", label: "UXR" },
      { id: "design-analysis", label: "Design Analysis" },
      { id: "reflection", label: "Reflection" },
    ];
    return sections;
  };

  const visibleSections = getVisibleSections();

  return (
    <nav className="sticky top-[65px] z-30 bg-background/95 backdrop-blur-sm border-b border-border md:hidden overflow-x-auto group/mnav">
      <div className="flex gap-1 px-4 py-2 justify-center">
        {visibleSections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-700 ease-out group-hover/mnav:opacity-20 group-hover/mnav:blur-[0.8px] hover:!opacity-100 hover:!blur-0",
              activeSection === section.id
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileSectionNav;
