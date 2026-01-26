interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  type: string;
}

const ProjectCard = ({ image, title, description, type }: ProjectCardProps) => {
  return (
    <div className="project-card group">
      <div className="aspect-[4/3] overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="project-overlay bg-gradient-to-t from-white/90 via-white/60 to-transparent pt-16">
        <span className="project-title">{title}</span>
        <span className="project-description">{description}</span>
        <span className="project-type">{type}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
