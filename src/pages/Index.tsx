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
        description="Stella Peng is a designer who builds across design, engineering, and product. Currently designing at TikTok and studying HCI+Design at the University of Washington."
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
