import { Body, Head } from "./parts";
import Polaroids from "./Polaroids";

const HighlightsReflection = () => (
  <section id="reflection" className="pt-16 pb-24">
    <Head label="reflection" title="What I took away from TikTok" />

    <Body>
      This summer changed how I make design decisions. At TikTok, every choice had to hold up against numbers: a
      creation flow with healthy metrics we couldn't pull down, backend data that decided what a repost could show, and
      launch results that told us whether the work landed. I left more data-driven, checking what the numbers can
      support before arguing for a direction. I also learned to ask what a feature is for before drawing it, and to
      work closely with PM and engineering so a design holds up all the way to launch.
    </Body>

    <Polaroids />
  </section>
);

export default HighlightsReflection;
