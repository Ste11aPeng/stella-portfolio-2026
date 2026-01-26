import { Project } from "@/data/projects";

interface ProjectOverviewProps {
  project: Project;
}

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  return (
    <section id="overview" className="pt-16">
      <h2 
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: 'Manrope', color: '#161616' }}
      >
        {project.title}
      </h2>
      
      <p 
        className="text-lg text-muted-foreground mb-12"
        style={{ fontFamily: 'Manrope' }}
      >
        {project.tagline}
      </p>
      
      <p 
        className="text-base mb-16 max-w-3xl"
        style={{ fontFamily: 'Manrope', color: '#161616', lineHeight: '1.7' }}
      >
        {project.overview}
      </p>
      
      {/* Info Grid - 2x2 layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
        <div>
          <span 
            className="text-sm text-muted-foreground block mb-2"
            style={{ fontFamily: 'Manrope' }}
          >
            role
          </span>
          <p 
            className="text-base font-medium"
            style={{ fontFamily: 'Manrope', color: '#161616' }}
          >
            {project.role}
          </p>
        </div>
        
        <div>
          <span 
            className="text-sm text-muted-foreground block mb-2"
            style={{ fontFamily: 'Manrope' }}
          >
            team
          </span>
          <p 
            className="text-base font-medium"
            style={{ fontFamily: 'Manrope', color: '#161616' }}
          >
            {project.team}
          </p>
        </div>
        
        <div>
          <span 
            className="text-sm text-muted-foreground block mb-2"
            style={{ fontFamily: 'Manrope' }}
          >
            timeline
          </span>
          <p 
            className="text-base font-medium"
            style={{ fontFamily: 'Manrope', color: '#161616' }}
          >
            {project.timeline}
          </p>
        </div>
        
        <div>
          <span 
            className="text-sm text-muted-foreground block mb-2"
            style={{ fontFamily: 'Manrope' }}
          >
            skills
          </span>
          <p 
            className="text-base font-medium"
            style={{ fontFamily: 'Manrope', color: '#161616' }}
          >
            {project.skills.join(", ")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
