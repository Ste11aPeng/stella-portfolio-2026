import { useState, useRef, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  titleColor: string;
  description: string;
  type: string;
  comingSoon?: boolean;
  index?: number;
  /** something live to show in place of the image */
  cover?: ReactNode;
}

const ProjectCard = ({ id, image, title, titleColor, description, type, comingSoon = false, index = 0, cover }: ProjectCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const followRef = useRef<HTMLDivElement>(null);
  // where the pointer is in the card, and where it was at the last move
  const pos = useRef({ x: 0, y: 0 });
  const settle = useRef<number>();

  // No per-frame loop: each pointer move just sets the follower's transform,
  // and a CSS transition on it does the easing (the "lag") on the compositor,
  // so it stays smooth even while a moving cover keeps the main thread busy.
  // The arrow leans with the move (up or down, a touch sideways) and levels
  // out shortly after the pointer stops.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - pos.current.x;
    const dy = y - pos.current.y;
    pos.current = { x, y };
    const el = followRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    const tilt = Math.max(-14, Math.min(14, dy * 1.1 - dx * 0.15));
    el.style.setProperty("--tilt", `${tilt.toFixed(1)}deg`);
    window.clearTimeout(settle.current);
    settle.current = window.setTimeout(() => el.style.setProperty("--tilt", "0deg"), 120);
  };

  useEffect(() => () => window.clearTimeout(settle.current), []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
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
        {cover ?? <img 
          src={image} 
          alt={`${title} – ${description}`} 
          width={645}
          height={400}
          sizes="(max-width: 768px) 100vw, 564px"
          loading={index < 2 ? "eager" : "lazy"}
          decoding={index < 2 ? "sync" : "async"}
          fetchPriority={index === 0 ? "high" : undefined}
          className="w-full h-full object-cover"
        />}
        {/* Gradient blur overlay on hover */}
        {/* (it covers only the lower three quarters, where the blur shows: a
            backdrop blur over a moving cover is recomputed every frame, so the
            less of it the better) */}
        <div
          className="absolute inset-x-0 bottom-0 top-1/4 transition-opacity duration-700 ease-out pointer-events-none"
          style={{
            opacity: isHovering ? 1 : 0,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 33%, rgba(0,0,0,0.7) 60%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 33%, rgba(0,0,0,0.7) 60%, black 100%)",
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
        // the follower carries the position (and the lean); the hint inside it pops
        <div
          ref={followRef}
          className="project-cursor-follow"
          style={{ transform: `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)` }}
          aria-hidden="true"
        >
          <div
            className={`project-cursor-hint ${comingSoon ? "" : "is-arrow"}`}
            // the circle stays white; its arrow takes the project's colour, like its title tag
            style={comingSoon ? undefined : { color: titleColor }}
          >
            {comingSoon ? (
              "coming soon"
            ) : (
              // the tilt sits on a wrapper, so it never fights the arrow's own slide-in
              <span className="arrow-tilt">
                <ArrowRight className="h-6 w-6" strokeWidth={1.75} />
              </span>
            )}
          </div>
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
