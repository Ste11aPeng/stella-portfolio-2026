import suggested from "@/assets/tiktok/hl-suggested.webp";
import { Body, Figure, Head } from "./parts";

const HighlightsPhaseTwo = () => (
  <section id="solution-2" className="pt-16 [&>*:last-child]:mb-0">
    <Head label="solution · phase 2" title="Highlights that suggest themselves." />

    <Body className="mb-10">
      As more content came into highlight creation, we wanted to offer a suggested flow where TikTok picks for you.
      After testing several entry points with my design manager, I placed the suggestion inside this flow. The final
      design is still under NDA, so I can only share it at a high level here.
    </Body>

    <Figure
      src={suggested}
      bg="#EBEBEB"
      alt="A profile and the Add to Highlight page, marked as under NDA"
      nda
    />
  </section>
);

export default HighlightsPhaseTwo;
