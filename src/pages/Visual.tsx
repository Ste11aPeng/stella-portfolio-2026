import type { CSSProperties } from "react";
import Header from "@/components/Header";
import Seo from "@/components/Seo";
import VisualGrid from "@/components/VisualGrid";

const Visual = () => (
  <>
    <Seo
      page="visual"
      path="/visual"
      description="Visual work by Stella Peng: motion design, 3D, editorial and generative experiments."
    />
    {/* this page sits on white */}
    <div className="min-h-screen bg-background relative z-10" style={{ "--background": "0 0% 100%" } as CSSProperties}>
      <Header />
      <section className="px-8 md:px-[32px] lg:px-24 pt-4 pb-24 max-w-[1440px] mx-auto">
        <VisualGrid />
      </section>
    </div>
  </>
);

export default Visual;
