import { useParams, useNavigate } from "react-router-dom";
import siaIntroImage from "@/assets/sia-intro.png";
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectSidebar from "@/components/ProjectSidebar";
import MobileSectionNav from "@/components/MobileSectionNav";
import ProjectOverview from "@/components/ProjectOverview";
import GalleryProjectDetail from "@/components/GalleryProjectDetail";
import NextProject from "@/components/NextProject";
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
import CircleChallenge from "@/components/circle/CircleChallenge";
import CircleSolution from "@/components/circle/CircleSolution";
import CircleResearch from "@/components/circle/CircleResearch";
import CircleTesting from "@/components/circle/CircleTesting";
import CircleReflection from "@/components/circle/CircleReflection";
import AsksiaChallenge from "@/components/asksia/AsksiaChallenge";
import AsksiaSolution from "@/components/asksia/AsksiaSolution";
import AsksiaImpact from "@/components/asksia/AsksiaImpact";
import AsksiaResearch from "@/components/asksia/AsksiaResearch";
import AsksiaDesignAnalysis from "@/components/asksia/AsksiaDesignAnalysis";
import AsksiaReflection from "@/components/asksia/AsksiaReflection";
import { getProjectById } from "@/data/projects";

// Gallery images for Tell Tool
import tellToolCover from "@/assets/project-telltool.webp";
import telltool1 from "@/assets/telltool-1.png";
import telltool2 from "@/assets/telltool-2.png";
import telltool3 from "@/assets/telltool-3.png";
import telltool4 from "@/assets/telltool-4.png";
import telltool5 from "@/assets/telltool-5.png";
import telltool6 from "@/assets/telltool-6.png";

// Gallery images for Forgotten Sense
import fg1 from "@/assets/fg-1.png";
import fg2 from "@/assets/fg-2.png";
import fg3 from "@/assets/fg-3.png";
import fg4 from "@/assets/fg-4.png";
import fg5 from "@/assets/fg-5.png";
import fg6 from "@/assets/fg-6.png";
import forgottenSenseCover from "@/assets/project-forgotten-sense.webp";

const baseSectionIds = ["overview", "challenge", "solution", "research", "testing", "reflection"];

// Get section IDs based on project type
const getSectionIds = (projectId: string | undefined) => {
  if (projectId === "stitchi") {
    return baseSectionIds.filter(id => id !== "testing");
  }
  if (projectId === "asksia") {
    return ["overview", "challenge", "solution", "impact", "research", "design-analysis", "reflection"];
  }
  return baseSectionIds;
};

// Gallery projects configuration
const galleryProjects = ["tell-tool", "forgotten-sense"];

const tellToolImages = [
  { src: tellToolCover, alt: "Tell Tool - Visualizing Care and Love", span: "full" as const },
  { src: telltool1, alt: "Tell Tool - Logo variations" },
  { src: telltool2, alt: "Tell Tool - Billboard posters" },
  { src: telltool3, alt: "Tell Tool - Merchandise mockups" },
  { src: telltool4, alt: "Tell Tool - Social media and app" },
  { src: telltool5, alt: "Tell Tool - Instagram posts" },
  { src: telltool6, alt: "Tell Tool - Stationery design" },
];

const forgottenSenseImages = [
  { src: forgottenSenseCover, alt: "Forgotten Sense - Wearable Cover", span: "full" as const },
  { src: fg1, alt: "Forgotten Sense - Wearable glove with electronics" },
  { src: fg2, alt: "Forgotten Sense - LED and Haptic modules" },
  { src: fg3, alt: "Forgotten Sense - App screens and UI design" },
  { src: fg4, alt: "Forgotten Sense - Hardware components diagram" },
  { src: fg5, alt: "Forgotten Sense - Making process" },
  { src: fg6, alt: "Forgotten Sense - Final prototype" },
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const project = id ? getProjectById(id) : undefined;

  // Dynamic page title
  useEffect(() => {
    if (project) {
      document.title = `${project.title} – Stella P. | Product Designer`;
    }
    return () => { document.title = "Stella P. | Product Designer Portfolio"; };
  }, [project]);

  // Get section IDs for current project
  const sectionIds = getSectionIds(id);

  // Scroll spy effect
  useEffect(() => {
    const currentSectionIds = getSectionIds(id);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // offset for header

      for (let i = currentSectionIds.length - 1; i >= 0; i--) {
        const sectionId = currentSectionIds[i];
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
  }, [id]);

  useEffect(() => {
    if (!project) {
      navigate("/");
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  // Use gallery layout for Tell Tool and Forgotten Sense
  if (id === "tell-tool") {
    return <GalleryProjectDetail project={project} images={tellToolImages} />;
  }
  
  if (id === "forgotten-sense") {
    return <GalleryProjectDetail project={project} images={forgottenSenseImages} />;
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
      <section className="pt-4 pb-4 md:pt-[24px] md:pb-[24px] max-w-[1440px] mx-auto">
        <div className="px-4 md:px-16 lg:px-24">
          <div className="w-full bg-muted rounded-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain mx-auto animate-fade-in"
              style={{ maxHeight: '600px' }}
            />
          </div>
        </div>
      </section>

      {/* Mobile Section Nav */}
      <MobileSectionNav activeSection={activeSection} onSectionClick={handleSectionClick} />
      
      {/* Content Section with Sidebar */}
      <section className="px-4 md:px-16 lg:px-24 pb-24 max-w-[1440px] mx-auto">
        <div className="flex gap-16 max-w-6xl mx-auto">
          {/* Sidebar - desktop only */}
          <div className="w-48 flex-shrink-0 hidden md:block">
            <ProjectSidebar activeSection={activeSection} onSectionClick={handleSectionClick} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            <ProjectOverview project={project} />

            
            
            {/* Challenge Section */}
            {id === "stitchi" ? <StitchiChallenge />
              : id === "philo" ? <PhiloChallenge />
              : id === "circle-status" ? <CircleChallenge />
              : id === "asksia" ? <AsksiaChallenge />
              : (
                <section id="challenge" className="pt-24">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Challenge</h2>
                  <p className="text-muted-foreground">Content coming soon...</p>
                </section>
              )}
            
            {/* Solution Section */}
            {id === "stitchi" ? <StitchiSolution />
              : id === "philo" ? <PhiloSolution />
              : id === "circle-status" ? <CircleSolution />
              : id === "asksia" ? <AsksiaSolution />
              : (
                <section id="solution" className="pt-24">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Solution</h2>
                  <p className="text-muted-foreground">Content coming soon...</p>
                </section>
              )}
            
            {/* AskSia-specific: Impact before Research */}
            {id === "asksia" && <AsksiaImpact />}
            
            {/* Research Section */}
            {id === "stitchi" ? <StitchiResearch />
              : id === "philo" ? <PhiloResearch />
              : id === "circle-status" ? <CircleResearch />
              : id === "asksia" ? <AsksiaResearch />
              : (
                <section id="research" className="pt-24">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Research</h2>
                  <p className="text-muted-foreground">Content coming soon...</p>
                </section>
              )}

            {/* AskSia-specific: Design Analysis */}
            {id === "asksia" && <AsksiaDesignAnalysis />}
            
            {/* Testing Section (skip for Stitchi & AskSia) */}
            {id === "stitchi" || id === "asksia" ? null
              : id === "philo" ? <PhiloTesting />
              : id === "circle-status" ? <CircleTesting />
              : (
                <section id="testing" className="pt-24">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Testing & Iteration</h2>
                  <p className="text-muted-foreground">Content coming soon...</p>
                </section>
              )}
            
            {/* Reflection Section */}
            {id === "stitchi" ? <StitchiReflection />
              : id === "philo" ? <PhiloReflection />
              : id === "circle-status" ? <CircleReflection />
              : id === "asksia" ? <AsksiaReflection />
              : (
                <section id="reflection" className="pt-24 pb-24">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Reflection</h2>
                  <p className="text-muted-foreground">Content coming soon...</p>
                </section>
              )}

            <NextProject currentProjectId={id!} />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default ProjectDetail;