import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import SideNav, { type Section } from "@/components/SideNav";
import Seo from "@/components/Seo";

// only loaded once picked
const VisualGrid = lazy(() => import("@/components/VisualGrid"));
const AboutContent = lazy(() => import("@/pages/About").then((m) => ({ default: m.AboutContent })));

// Product work, one project per row, beside a slim fixed left column
// (SideNav). Picking "visual" or "about" there swaps the work for that in
// place; neither is shown otherwise. Phones keep the header, hero and footer.
const fromHash = (): Section => {
  const h = window.location.hash.slice(1);
  return h === "visual" || h === "about" ? h : "work";
};

const Index = () => {
  const [view, setView] = useState<Section>(fromHash);
  const [switched, setSwitched] = useState(false);

  useEffect(() => {
    const on = () => setView(fromHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const show = useCallback((s: Section) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setView(s);
    setSwitched(true);
    // keep the link shareable without adding a history step per click
    history.replaceState(null, "", s === "work" ? window.location.pathname : `#${s}`);
  }, []);

  return (
    <>
      <Seo
        path="/"
        description="Stella Peng is a designer who builds across design, tech, and things in between. Master's in HCI + Design @ UW, prev. design @ TikTok."
      />
      <div className="min-h-screen bg-background relative z-10 md:flex">
        <SideNav active={view} onJump={show} />

        <main className="flex-1 min-w-0">
          <Header className="md:hidden" />
          <div className="md:hidden">
            <Hero />
          </div>
          <div className="max-w-[1000px] px-8 md:pl-6 md:pr-8 lg:pl-10 lg:pr-12 md:pt-8 pb-24">
              <motion.div
                key={view}
                initial={switched ? { opacity: 0, filter: "blur(12px)" } : false}
                animate={{ opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Suspense fallback={null}>
                  {view === "work" && <ProjectGrid className="" delay={0.5} grid="flex flex-col gap-3 md:gap-4" />}
                  {view === "visual" && (
                    <section aria-label="Visual work">
                      <VisualGrid />
                    </section>
                  )}
                  {view === "about" && <AboutContent inPanel />}
                </Suspense>
              </motion.div>
          </div>
        </main>
      </div>

    </>
  );
};

export default Index;
