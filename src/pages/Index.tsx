import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import WorkExperience from "@/components/WorkExperience";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <div className="min-h-screen bg-background relative z-10 max-w-[1440px] mx-auto">
        <Header />
        <Hero />
        <ProjectGrid />
        <WorkExperience />
      </div>
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </>
  );
};

export default Index;
