import { lazy, Suspense, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectGrid from "@/components/ProjectGrid";
import SideNav, { MobileFoot, MobileIntro, type Section } from "@/components/SideNav";
import Seo from "@/components/Seo";

// only loaded once picked
const VisualGrid = lazy(() => import("@/components/VisualGrid"));
const AboutContent = lazy(() => import("@/pages/About").then((m) => ({ default: m.AboutContent })));

// The whole site's front: product work, one project per row, beside a slim
// fixed left column (SideNav). Picking "visual" or "about" there swaps the
// work for that in place, and the address follows (/visual, /about), so those
// links land here too. Phones stack the same pieces: intro, a pinned row of
// the index, the work, then the links out.
const PATHS: Record<Section, string> = { work: "/", visual: "/visual", about: "/about" };

// older links used #visual / #about
const viewOf = (pathname: string, hash: string): Section => {
  const p = pathname.replace(/\/+$/, "");
  if (p === "/visual" || hash === "#visual") return "visual";
  if (p === "/about" || hash === "#about") return "about";
  return "work";
};

const SEO: Record<Section, { page?: string; description: string }> = {
  work: {
    description:
      "Stella Peng is a designer who builds across design, tech, and things in between. Master's in HCI + Design @ UW, prev. design @ TikTok.",
  },
  visual: {
    page: "visual",
    description: "Visual work by Stella Peng: motion design, 3D, editorial and generative experiments.",
  },
  about: {
    page: "about",
    description:
      "Stella Peng is a product designer working across design, engineering, and product. Currently designing at TikTok and studying HCI+Design at the University of Washington.",
  },
};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const view = viewOf(location.pathname, location.hash);
  const [switched, setSwitched] = useState(false);

  const show = useCallback(
    (s: Section) => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setSwitched(true);
      // keep the link shareable without adding a history step per click
      navigate(PATHS[s], { replace: true });
    },
    [navigate]
  );

  return (
    <>
      <Seo page={SEO[view].page} path={PATHS[view]} description={SEO[view].description} />
      <div className="min-h-screen bg-background relative z-10 md:flex">
        <SideNav active={view} onJump={show} />

        <main className="flex-1 min-w-0">
          <MobileIntro active={view} onJump={show} />
          <div className="max-w-[1000px] mx-auto px-6 md:pl-6 md:pr-8 lg:pl-10 lg:pr-12 md:pt-8 pb-12 md:pb-24">
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
          <MobileFoot />
        </main>
      </div>
    </>
  );
};

export default Index;
