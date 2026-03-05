import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import WorkExperience from "@/components/WorkExperience";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10 bg-background pb-2">
        <Header />
        <Hero />
        <ProjectGrid />
        <WorkExperience />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
