import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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
  const hintRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      const ease = 0.12;
      
      position.current.x += (target.current.x - position.current.x) * ease;
      position.current.y += (target.current.y - position.current.y) * ease;

      if (hintRef.current) {
        hintRef.current.style.left = `${position.current.x}px`;
        hintRef.current.style.top = `${position.current.y}px`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isHovering) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    target.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    position.current = { x, y };
    target.current = { x, y };
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
      className={`project-card group cursor-none ${comingSoon ? '' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden w-full relative rounded-[4px]" style={{ aspectRatio: '645/400' }}>
        <img 
          src={image} 
          alt={`${title} – ${description}`} 
          width={645}
          height={340}
          sizes="(max-width: 768px) 100vw, 564px"
          loading={index < 2 ? "eager" : "lazy"}
          decoding={index < 2 ? "sync" : "async"}
          fetchPriority={index === 0 ? "high" : undefined}
          className="w-full h-full object-cover"
        />
        {/* Gradient blur overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500 ease-out pointer-events-none"
          style={{
            opacity: isHovering ? 1 : 0,
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            maskImage: "linear-gradient(to bottom, transparent 40%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 40%, black 100%)",
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
        <div 
          ref={hintRef}
          className="project-cursor-hint"
          style={{ willChange: "left, top" }}
        >
          {comingSoon ? "coming soon" : "see project"}
        </div>
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
