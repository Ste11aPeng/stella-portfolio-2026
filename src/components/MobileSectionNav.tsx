import { useEffect, useRef } from "react";
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
    if (id === "philo") return [
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Challenge" },
      { id: "solution", label: "Solution" },
      { id: "audit-review", label: "Audit & Review" },
      { id: "component-mapping", label: "Component Mapping" },
    ];
    if (id === "tiktok-widget") return [
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Problem" },
      { id: "widget", label: "Widget" },
      { id: "tutorial", label: "Tutorial" },
      { id: "cold-start", label: "Cold Start" },
      { id: "reflection", label: "Takeaway" },
    ];
    if (id === "tiktok-highlights") return [
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Challenge" },
      { id: "solution-1", label: "Solution 1" },
      { id: "solution-2", label: "Solution 2" },
      { id: "reflection", label: "Reflection" },
    ];
    if (id === "asksia") return [
      { id: "overview", label: "Overview" },
      { id: "challenge", label: "Challenge" },
      { id: "solution", label: "Solution" },
      { id: "research", label: "Case Study" },
      { id: "design-analysis", label: "Design Decision" },
      { id: "reflection", label: "Reflection" },
    ];
    return sections;
  };

  const visibleSections = getVisibleSections();

  // keep the current section's label in view as the row scrolls sideways
  const row = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = row.current;
    const on = nav?.querySelector<HTMLElement>(`[data-section="${activeSection}"]`);
    if (!nav || !on) return;
    nav.scrollTo({ left: on.offsetLeft - (nav.clientWidth - on.offsetWidth) / 2, behavior: "smooth" });
  }, [activeSection]);

  return (
    // sits right under the "back" bar; scrolls sideways when the sections run long
    <nav ref={row} className="sticky top-12 z-30 bg-background/90 backdrop-blur-md md:hidden overflow-x-auto [scrollbar-width:none]">
      <div className="flex w-max gap-5 px-6 h-10 items-center">
        {visibleSections.map((section) => (
          <button
            key={section.id}
            data-section={section.id}
            onClick={() => onSectionClick(section.id)}
            className={cn(
              "inline-flex items-center text-[13px] lowercase whitespace-nowrap transition-colors duration-300",
              activeSection === section.id ? "text-foreground" : "text-muted-foreground/60"
            )}
          >
            {/* the same marker line as the desktop nav */}
            <span
              aria-hidden="true"
              className={cn(
                "inline-block h-px bg-foreground transition-all duration-500 ease-out",
                activeSection === section.id ? "w-2 mr-1.5 opacity-100" : "w-0 mr-0 opacity-0"
              )}
            />
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileSectionNav;
