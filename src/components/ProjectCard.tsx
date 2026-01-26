import { useState } from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  type: string;
}

const ProjectCard = ({ image, title, description, type }: ProjectCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      className="project-card group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="overflow-hidden" style={{ width: '645px', maxWidth: '100%', aspectRatio: '645/326' }}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="project-overlay">
        <div className="project-tag">
          <span className="project-badge project-title">{title}</span>
          <span className="project-badge project-description">{description}</span>
          <span className="project-badge project-type">{type}</span>
        </div>
      </div>
      {isHovering && (
        <div 
          className="project-cursor-hint"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        >
          SEE PROJECT →
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
