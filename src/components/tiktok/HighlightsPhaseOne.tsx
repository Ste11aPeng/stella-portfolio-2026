import onePage from "@/assets/tiktok/hl-opt-onepage.webp";
import OptionsCarousel, { type Option } from "./OptionsCarousel";
import AddFlowDemo from "./AddFlowDemo";
import ViewFlowDemo from "./ViewFlowDemo";
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
  { from: "data", limit: "Reposts carry no like data, while stories can be liked.", meant: "A repost had to look different in kind, not just in style." },
  { from: "product", limit: "PM needed stories and reposts clearly apart.", meant: "The difference had to register mid-swipe, at a glance." },
];

const HighlightsPhaseOne = () => (
  <section id="solution-1" className="pt-16 [&>*:last-child]:mb-0">
    <Head label="solution · phase 1" title="Put reposts in highlights." />

    {/* the two halves of putting reposts in highlights, each a stop in the side nav */}
    <div id="adding-reposts" aria-hidden="true" />
    <Body className="mb-8">
      <span className="font-semibold text-foreground">Create and navigate.</span> The first question was where reposts live once they can go into a highlight. Creating highlights from stories was
      an established flow with healthy numbers, and adding a second format couldn't pull those numbers down.
    </Body>

    <OptionsCarousel options={OPTIONS} label="Structures explored for adding reposts to a highlight" />

    <div id="watching-reposts" className="mt-14" aria-hidden="true" />
    <Body className="mb-8">
      <span className="font-semibold text-foreground">Reworking consumption so reposts read at a glance.</span> With our
      SDE, I mapped what repost data the backend could carry into a highlight, then chose a framed middle card. It
      reuses the add-to-story style, so it feels familiar, and its shape sets it apart from full-screen stories even
      mid-swipe.
    </Body>

    {/* the two limits, as cards in the same style as the challenge's framing:
        the source top-left, the limit in grey, what it meant in bold beneath */}
    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-2">
      {LIMITS.map((l, i) => (
        <Reveal key={l.from} delay={0.1 * (i + 1)} className="rounded-lg bg-muted/70 p-2 min-h-[148px] flex flex-col justify-between gap-8">
          <span className="text-xs font-medium leading-none lowercase" style={{ color: TIKTOK }}>{l.from}</span>
          <div>
            <p className="text-sm text-foreground/60 leading-relaxed mb-1">{l.limit}</p>
            <h4 className="text-base font-semibold text-foreground leading-snug">{l.meant}</h4>
          </div>
        </Reveal>
      ))}
    </div>

    {/* the deliverable, walked through: stories, then reposts as framed cards */}
    <Reveal className="mb-10">
      <figure>
        <div className="w-full rounded-lg bg-[#EBEBEC] h-[480px] md:h-[560px] py-6">
          <ViewFlowDemo />
        </div>
      </figure>
    </Reveal>
  </section>
);

export default HighlightsPhaseOne;
