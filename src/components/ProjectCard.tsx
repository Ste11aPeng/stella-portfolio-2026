import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectCursorHint from "./ProjectCursorHint";

interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  titleColor: string;
  description: string;
  type: string;
  comingSoon?: boolean;
  index?: number;
}

const ProjectCard = ({ id, image, title, titleColor, description, type, comingSoon = false, index = 0 }: ProjectCardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    // Dispatch custom event to hide main cursor
    window.dispatchEvent(new CustomEvent('projectCardHover', { detail: { hovering: true } }));
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Dispatch custom event to show main cursor
    window.dispatchEvent(new CustomEvent('projectCardHover', { detail: { hovering: false } }));
  };

  const cardContent = (
    <div 
      className="project-card group cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden w-full relative rounded-[2px]" style={{ aspectRatio: '645/400' }}>
        <img 
          src={image} 
          alt={`${title} – ${description}`} 
          width={645}
          height={400}
          sizes="(max-width: 768px) 100vw, 564px"
          loading={index < 2 ? "eager" : "lazy"}
          decoding={index < 2 ? "sync" : "async"}
          fetchPriority={index === 0 ? "high" : undefined}
          className="w-full h-full object-cover"
        />
        {/* Gradient blur overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none"
          style={{
            opacity: isHovering ? 1 : 0,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            maskImage: "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.7) 70%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.7) 70%, black 100%)",
          }}
        />
      </div>
      <div className="project-overlay">
        <div className="project-tag">
          <span className="project-badge project-title font-medium" style={{ color: titleColor }}>{title}</span>
          <span className="project-badge project-description">{description}</span>
          <span className="project-badge project-type">{type}</span>
        </div>
      </div>
      {isHovering && (
        <ProjectCursorHint text={comingSoon ? "coming soon" : "see project"} />
      )}
    </div>
  );

  if (comingSoon) {
    return cardContent;
  }

  return (
    <Link to={`/project/${id}`}>
      {cardContent}
    </Link>
  );
};

export default ProjectCard;
