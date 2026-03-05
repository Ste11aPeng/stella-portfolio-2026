import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import WorkExperience from "@/components/WorkExperience";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProjectGrid />
      <WorkExperience />
      <Footer />
    </div>
  );
};

export default Index;
