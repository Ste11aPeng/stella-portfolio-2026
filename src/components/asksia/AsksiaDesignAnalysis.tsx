import { motion, type Easing } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import ImageLightbox from "@/components/ImageLightbox";
import AnimatedTitle from "@/components/AnimatedTitle";
import OptionsCarousel, { type Option } from "@/components/tiktok/OptionsCarousel";
import { DrawerSketch, DropdownSketch, TabsSketch } from "./AsksiaIterationSketches";
import analysis4 from "@/assets/sia-design-analysis-4.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];
const ASKSIA = "#4E4DF4";

// the picked option first, then the two it was weighed against
const OPTIONS: Option[] = [
  {
    name: "Responsive Dropdown",
    alt: "A file button at the top left opens a short dropdown list over the document",
    chosen: true,
    art: <DropdownSketch />,
    pros: ["Shows the file count at a glance", "Works for one file or twenty", "Reuses an existing component, so it's quick to build"],
    cons: ["Files stay hidden until the menu is opened"],
  },
  {
    name: "Side Drawer",
    alt: "A file panel slides in from the left and covers part of the document",
    art: <DrawerSketch />,
    pros: ["Clean when closed"],
    cons: ["Covers the document when open", "Takes an extra tap to switch files"],
  },
  {
    name: "Browser-like Tabs",
    alt: "A row of tabs along the top, with the last tabs squeezed narrow",
    art: <TabsSketch />,
    pros: ["Familiar from web browsers"],
    cons: ["Gets crowded after three or four files", "Costly to build and maintain"],
  },
];

const AsksiaDesignAnalysis = () => {
  return (
    <section id="design-analysis" className="pt-16">
      <Separator className="mb-16 bg-border/60" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, ease: easeOut }}>
        <span className="inline-block mb-4 rounded-md bg-foreground/[0.05] px-2.5 py-1 text-sm font-medium leading-5 text-muted-foreground lowercase">Design Decision</span>
        <AnimatedTitle text="Will This Nav Still Work at 10x the Files?" className="text-2xl font-bold mb-6 text-foreground" />
      </motion.div>

      <motion.p
        className="text-base mb-10 max-w-3xl text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        I explored Side Drawers and Tabs before pivoting to a Responsive Dropdown, prioritizing long-term scalability and maximum viewport for AI responses.
      </motion.p>

      <OptionsCarousel options={OPTIONS} label="Design iterations: Responsive Dropdown, Side Drawer, and Browser-like Tabs" accent={ASKSIA} />

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <AnimatedTitle text="Documenting Edge Cases and Acceptance Criteria" className="text-2xl font-bold mb-6 text-foreground" />
      </motion.div>

      <motion.p
        className="text-base mb-10 max-w-3xl text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        I documented every edge case, from corrupted files to empty states, and wrote detailed specs with acceptance criteria so engineers could build without ambiguity.
      </motion.p>

      <ImageLightbox src={analysis4} alt="File upload edge cases and a UI/UX acceptance test tracking table" className="w-full rounded-lg border border-border/30" />
    </section>
  );
};

export default AsksiaDesignAnalysis;
