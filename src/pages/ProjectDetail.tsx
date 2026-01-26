import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import ProjectSidebar from "@/components/ProjectSidebar";
import ProjectOverview from "@/components/ProjectOverview";
import StitchiChallenge from "@/components/stitchi/StitchiChallenge";
import StitchiSolution from "@/components/stitchi/StitchiSolution";
import StitchiResearch from "@/components/stitchi/StitchiResearch";
import StitchiTesting from "@/components/stitchi/StitchiTesting";
import StitchiReflection from "@/components/stitchi/StitchiReflection";
import PhiloChallenge from "@/components/philo/PhiloChallenge";
import PhiloSolution from "@/components/philo/PhiloSolution";
import PhiloResearch from "@/components/philo/PhiloResearch";
import PhiloTesting from "@/components/philo/PhiloTesting";
import PhiloReflection from "@/components/philo/PhiloReflection";
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
            
            {/* Challenge Section - project specific */}
            {id === "stitchi" ? (
              <StitchiChallenge />
            ) : id === "philo" ? (
              <PhiloChallenge />
            ) : (
              <section id="challenge" className="pt-24">
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Challenge
                </h2>
                <p className="text-muted-foreground">Content coming soon...</p>
              </section>
            )}
            
            {/* Solution Section - project specific */}
            {id === "stitchi" ? (
              <StitchiSolution />
            ) : id === "philo" ? (
              <PhiloSolution />
            ) : (
              <section id="solution" className="pt-24">
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Solution
                </h2>
                <p className="text-muted-foreground">Content coming soon...</p>
              </section>
            )}
            
            {/* Research Section - project specific */}
            {id === "stitchi" ? (
              <StitchiResearch />
            ) : id === "philo" ? (
              <PhiloResearch />
            ) : (
              <section id="research" className="pt-24">
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Research
                </h2>
                <p className="text-muted-foreground">Content coming soon...</p>
              </section>
            )}
            
            {/* Testing Section - project specific */}
            {id === "stitchi" ? (
              <StitchiTesting />
            ) : id === "philo" ? (
              <PhiloTesting />
            ) : (
              <section id="testing" className="pt-24">
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Testing & Iteration
                </h2>
                <p className="text-muted-foreground">Content coming soon...</p>
              </section>
            )}
            
            {/* Reflection Section - project specific */}
            {id === "stitchi" ? (
              <StitchiReflection />
            ) : id === "philo" ? (
              <PhiloReflection />
            ) : (
              <section id="reflection" className="pt-24 pb-24">
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Reflection
                </h2>
                <p className="text-muted-foreground">Content coming soon...</p>
              </section>
            )}
          </div>
        </div>
      </section>
    </div>;
};
export default ProjectDetail;