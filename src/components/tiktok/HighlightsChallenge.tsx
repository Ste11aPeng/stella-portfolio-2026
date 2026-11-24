import { motion } from "framer-motion";
import { Body, Head, Reveal, TIKTOK } from "./parts";

// in the order the solutions take them: reposts first (solution 1), suggestions second (solution 2)
const BETS = [
  { tag: "bet 1", title: "Let reposts in", body: "People who don't post stories can take part." },
  { tag: "bet 2", title: "Suggest from interests", body: "Creating a highlight takes seconds." },
];

// the rule both bets had to live within, scribbled under the cards like a
// margin note (Solution 1 spells out the why)
const CONSTRAINT = "…without hurting the original highlight creation flow!";

// each card's resting pose on desktop: how far it tucks under the one before,
// how it's tipped, how high it sits, and its place in the pair
const POSE = ["md:z-[1] md:-rotate-[1.5deg]", "md:z-[2] md:-ml-[4%] md:mt-3 md:rotate-[1.5deg]"];

const HighlightsChallenge = () => (
  <section id="challenge" className="pt-5 [&>*:last-child]:mb-0">
    <Head label="challenge" title="Highlights only held old stories, so interests never stuck on the profile." />

    <Body className="mb-10">
      People showed their interests every day through stories and reposts, but none of it reached their profile.
    </Body>

    {/* the two bets lie loosely overlapped, each a little askew; the one under the
        pointer straightens, lifts and comes to the front. (Phones: a plain stack.)
        The outer box carries the pose; Reveal inside it the entrance. */}
    {/* the pair and its note share one centred column, capped so the cards
        don't stretch out on a wide screen */}
    <div className="md:max-w-[680px] md:mx-auto">
    <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-0 md:pt-2 md:pb-4">
      {BETS.map((f, i) => (
        <div
          key={f.tag}
          className={`relative md:w-[52%] md:shrink-0 transition-transform duration-300 ease-out md:hover:!z-10 md:hover:-translate-y-2 md:hover:!rotate-0 ${POSE[i]}`}
        >
          <Reveal
            delay={0.1 * (i + 1)}
            // tag pinned top-left, the words settle bottom-left; one very pale grey,
            // no outline. (The first card keeps its words clear of the one tucked over it.)
            className={`rounded-lg p-2 min-h-[148px] flex flex-col justify-between gap-8 bg-[#FAFAFA] shadow-[0_3px_12px_rgba(0,0,0,0.04)] ${
              i === 0 ? "md:pr-[12%]" : ""
            }`}
          >
            <span className="text-xs font-medium leading-none lowercase" style={{ color: TIKTOK }}>
              {f.tag}
            </span>
            <div>
              <h4 className="text-base font-semibold text-foreground mb-1">{f.title}</h4>
              <p className="text-sm text-foreground/70 leading-relaxed">{f.body}</p>
            </div>
          </Reveal>
        </div>
      ))}
    </div>

    {/* the constraint: a handwritten note in the polaroids' hand, tucked under the
        second card, with a little arrow drawn up at the pair */}
    <Reveal delay={0.35} className="mt-3 md:-mt-1 flex items-start justify-start md:justify-end md:pr-[6%]">
      <svg width="46" height="34" viewBox="0 0 46 34" fill="none" stroke="#2b2b2b" strokeWidth="1.6" strokeLinecap="round" className="shrink-0 mt-1 mr-1 hidden md:block" aria-hidden="true">
        {/* once the note is written, the shaft draws from it up toward the cards… */}
        <motion.path
          d="M42 30 C 30 28, 16 20, 8 6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 2.0 }}
        />
        {/* …then the head, once the line has arrived */}
        <motion.path
          d="M7.5 15 L 8 6 L 16.5 9.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.25, ease: "easeOut", delay: 2.52 }}
        />
      </svg>
      {/* the note writes itself out left to right, as if by hand; the arrow
          comes after it */}
      <motion.p
        className="text-[22px] md:text-[26px] leading-none text-[#2b2b2b] md:mt-6 pb-1"
        style={{ fontFamily: "'Caveat', cursive", fontWeight: 500, rotate: -2 }}
        initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
        whileInView={{ clipPath: "inset(-20% 0% -20% 0)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.5, ease: [0.45, 0.05, 0.55, 0.95], delay: 0.5 }}
      >
        <span className="sr-only">Constraint: </span>
        {CONSTRAINT}
      </motion.p>
    </Reveal>
    </div>
  </section>
);

export default HighlightsChallenge;
