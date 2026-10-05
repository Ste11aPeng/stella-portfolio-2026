import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <>
      <Seo
        path="/"
        description="Stella Peng is a designer who builds across design, tech, and things in between. Master's in HCI + Design @ UW, prev. design @ TikTok."
      />
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
