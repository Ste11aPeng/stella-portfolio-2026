import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <div className="min-h-screen bg-background relative z-10">
        <Header />
        <Hero />
        <ProjectGrid />
      </div>
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </>
  );
};

export default Index;
