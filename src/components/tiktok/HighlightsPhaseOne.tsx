import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import onePage from "@/assets/tiktok/hl-opt-onepage.webp";
import OptionsCarousel, { type Option } from "./OptionsCarousel";
import AddFlowDemo from "./AddFlowDemo";
import ViewFlowDemo from "./ViewFlowDemo";
import Scribble from "./Scribble";
import TabsDemo from "./TabsDemo";
import SecondaryPageDemo from "./SecondaryPageDemo";
import { Body, Head, Reveal, TIKTOK } from "./parts";

// the picked structure first, then the two it was weighed against
const OPTIONS: Option[] = [
  {
    name: "One scrolling page",
    img: onePage,
    alt: "Add to Highlight on one scrolling page: stories first, then reposts further down, with the picked items above the Add button",
    chosen: true,
    // the flow itself, played on a phone, instead of a still
    demo: <AddFlowDemo />,
    pros: [
      "Closest to how people already create highlights",
      "Pick it all on one screen",
    ],
    cons: ["Harder to extend later"],
  },
  {
    name: "Tabs",
    alt: "Stories and reposts split into two tabs on the highlight page",
    demo: <TabsDemo />,
    fade: true,
    pros: ["Easier to build"],
    cons: ["Swiping left and right reads as moving between steps, not browsing content"],
  },
  {
    name: "A secondary page",
    alt: "Stories and reposts as previews, each opening its own page",
    demo: <SecondaryPageDemo />,
    fade: true,
    pros: ["A cleaner first view"],
    cons: ["Too heavy for something as light as adding to a highlight"],
  },
];

// the two limits behind that choice: where each came from, the limit itself,
// and what it asked of the design

const LIMITS = [
  { from: "data", limit: "Reposts have no likes; stories do." },
  { from: "product", limit: "PM wanted stories and reposts clearly apart." },
];

// The repost viewer, with the two decisions behind it written beside the phone.
// The notes only appear while a repost is on screen (they write themselves out
// each time, and go when it's back to stories). On phones, where there's no
// room beside it, they follow underneath, always shown.
const RepostDemo = () => {
  const [reposting, setReposting] = useState(false);
  return (
    <figure className="relative">
      <div className="w-full rounded-lg bg-[#F5F6F7] h-[480px] md:h-[560px] py-6">
        <ViewFlowDemo onRepost={setReposting} />
      </div>
      <AnimatePresence>
        {reposting && (
          <motion.div
            key="notes"
            className="absolute inset-0 pointer-events-none hidden md:block"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* right of the phone, level with the framed card */}
            <Scribble
              onMount
              className="absolute"
              at={{ left: "calc(50% + 132px)", top: 262 }}
              arrow="left"
              delay={0.2}
              lines={["framed, not full-screen,", "so it never passes", "as your own story"]}
            />
            {/* lower left of the phone */}
            <Scribble
              onMount
              className="absolute"
              at={{ right: "calc(50% + 132px)", top: 400 }}
              arrow="right"
              delay={1.3}
              lines={["the reposter's note", "stands in for the likes", "reposts don't carry"]}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <figcaption className="md:hidden mt-4 flex flex-col gap-3 text-[20px] leading-[1.1] text-[#2b2b2b]" style={{ fontFamily: "'Caveat', cursive", fontWeight: 500 }}>
        <span>framed, not full-screen, so it never passes as your own story</span>
        <span>the reposter's note stands in for the likes reposts don't carry</span>
      </figcaption>
    </figure>
  );
};

const HighlightsPhaseOne = () => (
  <section id="solution-1" className="pt-16 [&>*:last-child]:mb-0">
    <Head label="solution · phase 1" title="Put reposts in highlights." />

    {/* the two halves of putting reposts in highlights, each a stop in the side nav */}
    <div id="adding-reposts" aria-hidden="true" />
    <Body className="mb-8">
      <span className="font-semibold text-foreground">Adding reposts.</span> The first question was where reposts live once they can go into a highlight. Creating highlights from stories was
      an established flow with healthy numbers, and adding a second format couldn't pull those numbers down.
    </Body>

    <OptionsCarousel options={OPTIONS} label="Structures explored for adding reposts to a highlight" />

    <div id="watching-reposts" className="mt-14" aria-hidden="true" />
    <Body className="mb-8">
      <span className="font-semibold text-foreground">Watching reposts.</span> In a highlight, a repost plays between
      your own stories, so it has to read as someone else's mid-swipe.
    </Body>

    {/* the two limits behind it, as cards: where each came from, then the limit
        itself in one line */}
    {/* (sat close above the viewer, which is what they explain) */}
    <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-2">
      {LIMITS.map((l, i) => (
        <Reveal key={l.from} delay={0.1 * (i + 1)} className="rounded-lg bg-muted/70 p-2 min-h-[120px] flex flex-col justify-between gap-6">
          <span className="text-xs font-medium leading-none lowercase" style={{ color: TIKTOK }}>{l.from}</span>
          <h4 className="text-base font-semibold text-foreground leading-snug">{l.limit}</h4>
        </Reveal>
      ))}
    </div>

    {/* the deliverable, walked through: stories, then reposts as framed cards */}
    <Reveal className="mb-10">
      <RepostDemo />
    </Reveal>
  </section>
);

export default HighlightsPhaseOne;
