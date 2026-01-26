import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import ProjectSidebar from "@/components/ProjectSidebar";
import ProjectOverview from "@/components/ProjectOverview";
import { getProjectById } from "@/data/projects";

const sectionIds = ["overview", "challenge", "solution", "research", "testing", "reflection"];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const project = id ? getProjectById(id) : undefined;

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // offset for header

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!project) {
      navigate("/");
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Cover Image */}
      <section className="pt-[24px] pb-[24px]">
        <div className="px-8 md:px-16 lg:px-24">
          <div className="w-full bg-[#e8ebe4] rounded-lg overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-auto object-contain mx-auto" style={{
            maxHeight: '600px'
          }} />
          </div>
        </div>
      </section>
      
      {/* Content Section with Sidebar */}
      <section className="px-8 md:px-16 lg:px-24 pb-24">
        <div className="flex gap-16">
          {/* Sidebar */}
          <div className="w-48 flex-shrink-0">
            <ProjectSidebar activeSection={activeSection} onSectionClick={handleSectionClick} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            <ProjectOverview project={project} />
            
            {/* Placeholder sections */}
            <section id="challenge" className="pt-24">
              <h2 className="text-2xl font-bold mb-6" style={{
              fontFamily: 'Manrope',
              color: '#161616'
            }}>
                Challenge
              </h2>
              <p className="text-muted-foreground">Content coming soon...</p>
            </section>
            
            <section id="solution" className="pt-24">
              <h2 className="text-2xl font-bold mb-6" style={{
              fontFamily: 'Manrope',
              color: '#161616'
            }}>
                Solution
              </h2>
              <p className="text-muted-foreground">Content coming soon...</p>
            </section>
            
            <section id="research" className="pt-24">
              <h2 className="text-2xl font-bold mb-6" style={{
              fontFamily: 'Manrope',
              color: '#161616'
            }}>
                Research
              </h2>
              <p className="text-muted-foreground">Content coming soon...</p>
            </section>
            
            <section id="testing" className="pt-24">
              <h2 className="text-2xl font-bold mb-6" style={{
              fontFamily: 'Manrope',
              color: '#161616'
            }}>
                Testing & Iteration
              </h2>
              <p className="text-muted-foreground">Content coming soon...</p>
            </section>
            
            <section id="reflection" className="pt-24 pb-24">
              <h2 className="text-2xl font-bold mb-6" style={{
              fontFamily: 'Manrope',
              color: '#161616'
            }}>
                Reflection
              </h2>
              <p className="text-muted-foreground">Content coming soon...</p>
            </section>
          </div>
        </div>
      </section>
    </div>;
};
export default ProjectDetail;