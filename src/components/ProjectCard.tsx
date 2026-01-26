interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  type: string;
}

const ProjectCard = ({ image, title, description, type }: ProjectCardProps) => {
  return (
    <div className="project-card group">
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
    </div>
  );
};

export default ProjectCard;
