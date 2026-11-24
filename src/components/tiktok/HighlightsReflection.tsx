import { Body, Head } from "./parts";
import Polaroids from "./Polaroids";

const HighlightsReflection = () => (
  <section id="reflection" className="pt-16 pb-24">
    <Head label="takeaway" title="What I took away from TikTok" />

    <Body>
      I came in ready to defend whichever flow looked best. TikTok had other plans. Making highlights from
      stories already worked, so whatever I added for reposts had to leave those numbers alone, and the backend
      had its own opinions about what a repost could even show. So I started asking our SDE what was possible
      before opening Figma, and checking what the data could back up before falling for a direction. Most of the
      real design decisions came out of those limits.
    </Body>

    <Polaroids />
  </section>
);

export default HighlightsReflection;
