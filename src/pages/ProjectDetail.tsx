import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import siaIntroImage from "@/assets/sia-intro.png";
import { useState, useEffect, useRef } from "react";
import BackBar from "@/components/BackBar";
import Seo from "@/components/Seo";
import ProjectSidebar from "@/components/ProjectSidebar";
import MobileSectionNav from "@/components/MobileSectionNav";
import ProjectOverview from "@/components/ProjectOverview";
import ProjectProgressBar from "@/components/ProjectProgressBar";
import NextProject from "@/components/NextProject";
import AnimatedCover from "@/components/AnimatedCover";
import StitchiChallenge from "@/components/stitchi/StitchiChallenge";
import StitchiSolution from "@/components/stitchi/StitchiSolution";
import StitchiResearch from "@/components/stitchi/StitchiResearch";
import StitchiTesting from "@/components/stitchi/StitchiTesting";
import StitchiReflection from "@/components/stitchi/StitchiReflection";
import PhiloChallenge from "@/components/philo/PhiloChallenge";
import PhiloSolution from "@/components/philo/PhiloSolution";
import PhiloAuditReview from "@/components/philo/PhiloAuditReview";
import PhiloComponentMapping from "@/components/philo/PhiloComponentMapping";
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
import HighlightsChallenge from "@/components/tiktok/HighlightsChallenge";
import HighlightsPhaseOne from "@/components/tiktok/HighlightsPhaseOne";
import HighlightsPhaseTwo from "@/components/tiktok/HighlightsPhaseTwo";
import HighlightsReflection from "@/components/tiktok/HighlightsReflection";
import WidgetCaseStudy from "@/components/tiktok/WidgetCaseStudy";
import { getProjectById, projects } from "@/data/projects";

const baseSectionIds = ["overview", "challenge", "solution", "research", "testing", "reflection"];

// Get section IDs based on project type
const getSectionIds = (projectId: string | undefined) => {
  if (projectId === "stitchi") {
    return baseSectionIds.filter(id => id !== "testing");
  }
  if (projectId === "philo") {
    return ["overview", "challenge", "solution", "audit-review", "component-mapping"];
  }
  if (projectId === "asksia") {
    return ["overview", "challenge", "solution", "research", "design-analysis", "reflection"];
  }
  if (projectId === "tiktok-widget") {
    return ["overview", "challenge", "widget", "tutorial", "cold-start", "reflection"];
  }
  if (projectId === "tiktok-highlights") {
    return ["overview", "challenge", "solution-1", "adding-reposts", "watching-reposts", "solution-2", "reflection"];
  }
  return baseSectionIds;
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeSection, setActiveSection] = useState("overview");
  // While a click's smooth scroll is under way, the clicked section stays
  // marked: otherwise the scroll spy steps the marker through every section
  // it passes on the way, and the nav twitches before settling.
  const scrollLock = useRef(false);
  const scrollIdle = useRef<number>();
  const project = id ? getProjectById(id) : undefined;




  // Get section IDs for current project
  const sectionIds = getSectionIds(id);

  // Scroll spy effect
  useEffect(() => {
    const currentSectionIds = getSectionIds(id);
    
    const handleScroll = () => {
      if (scrollLock.current) {
        // release once the scroll has come to rest
        window.clearTimeout(scrollIdle.current);
        scrollIdle.current = window.setTimeout(() => (scrollLock.current = false), 140);
        return;
      }
      const scrollPosition = window.scrollY + 150; // offset for header

      for (let i = currentSectionIds.length - 1; i >= 0; i--) {
        const sectionId = currentSectionIds[i];
        const element = document.getElementById(sectionId);
        // measured against the page, not the section's positioned parent
        // (offsetTop skips the cover above and runs a section ahead)
        if (element && element.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(scrollIdle.current);
    };
  }, [id]);

  // a project that doesn't exist (or no longer does) gets the 404
  if (!project) {
    return <NotFound />;
  }

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      scrollLock.current = true;
      // if the page is already there and nothing scrolls, don't stay locked
      window.clearTimeout(scrollIdle.current);
      scrollIdle.current = window.setTimeout(() => (scrollLock.current = false), 300);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  return <>
      <Seo
        // two projects share a title (TikTok), so theirs carry the tagline too,
        // as the prerendered pages already do
        page={(projects.filter((p) => p.title === project.title).length > 1
          ? `${project.title} · ${project.tagline}`
          : project.title
        ).toLowerCase()}
        path={`/project/${project.id}`}
        description={`${project.title}: ${project.description}. A product design case study by Stella Peng.`}
      />
      <div className="relative min-h-screen bg-background z-10">
        {/* phones only: on desktop the section nav (with "back") is pinned top-left instead */}
        <BackBar className="md:hidden" />

        {/* Full-width Cover Image */}
        <section
          className={
            project.coverFull
              ? "w-full overflow-hidden bg-muted relative"
              : "w-full h-screen overflow-hidden bg-muted relative"
          }
          style={project.animatedCover && project.coverFull ? { aspectRatio: project.coverAspect } : undefined}
        >
          {project.animatedCover ? (
            <AnimatedCover
              kind={project.animatedCover}
              interactive
              delay={0.3}
              fallback={<img src={project.image} alt="" className="w-full h-full object-cover" />}
            />
          ) : (
          <img
            src={project.coverImage || project.image}
            alt={project.title}
            loading="eager"
            decoding="async"
            className={
              project.coverFull
                ? "w-full h-auto animate-fade-in"
                : "w-full h-full object-cover animate-fade-in"
            }
          />
          )}
        </section>

        {/* Content */}
        <div className="relative bg-background">
          {/* Mobile Section Nav */}
          <MobileSectionNav activeSection={activeSection} onSectionClick={handleSectionClick} />

          {/* Content Section with Sidebar */}
          {/* The write-up is centred in the space to the right of the section nav
              pinned top-left (not on the whole screen, which reads as leaning left
              next to the nav), as the homepage centres its work beside its sidebar */}
          <section className="px-4 md:pl-[232px] md:pr-12 pb-24">
          <ProjectSidebar activeSection={activeSection} onSectionClick={handleSectionClick} />
          <div className="max-w-[960px] mx-auto">
            {/* Main Content */}
            <div>
              <ProjectOverview project={project} />

              
              
              {id === "tiktok-widget" ? (
                <WidgetCaseStudy />
              ) : id === "tiktok-highlights" ? (
                <>
                  <HighlightsChallenge />
                  <HighlightsPhaseOne />
                  <HighlightsPhaseTwo />
                  <HighlightsReflection />
                </>
              ) : (
              <>
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

              {/* Philo-specific: Solution subsections */}
              {id === "philo" && (
                <>
                  <PhiloAuditReview />
                  <PhiloComponentMapping />
                </>
              )}

              {/* AskSia-specific: Impact before Research */}
              {id === "asksia" && <AsksiaImpact />}
              
              {/* Research Section */}
              {id === "stitchi" || id === "philo" ? null
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
              
              {/* Testing Section (skip for Stitchi, AskSia & Philo) */}
              {id === "stitchi" || id === "asksia" || id === "philo" ? null
                : id === "circle-status" ? <CircleTesting />
                : (
                  <section id="testing" className="pt-24">
                    <h2 className="text-2xl font-bold mb-6 text-foreground">Testing & Iteration</h2>
                    <p className="text-muted-foreground">Content coming soon...</p>
                  </section>
                )}
              
              {/* Reflection Section */}
              {id === "stitchi" || id === "philo" ? null
                : id === "circle-status" ? <CircleReflection />
                : id === "asksia" ? <AsksiaReflection />
                : (
                  <section id="reflection" className="pt-24 pb-24">
                    <h2 className="text-2xl font-bold mb-6 text-foreground">Reflection</h2>
                    <p className="text-muted-foreground">Content coming soon...</p>
                  </section>
                )}

              </>
              )}

              <NextProject currentProjectId={id!} />
            </div>
          </div>
        </section>
      </div>

      <ProjectProgressBar color={project?.titleColor} />
      </div>

    </>;
};
export default ProjectDetail;