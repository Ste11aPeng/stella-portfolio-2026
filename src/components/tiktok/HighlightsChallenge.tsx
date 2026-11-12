import { Body, Head, Reveal, TIKTOK } from "./parts";

const FRAMING = [
  { tag: "bet 1", title: "Suggest from interests", body: "Creating a highlight takes seconds." },
  { tag: "bet 2", title: "Let reposts in", body: "People who don't post stories can take part." },
  { tag: "constraint", title: "Keep the formats apart", body: "Tell them apart at a glance." },
];

const HighlightsChallenge = () => (
  <section id="challenge" className="pt-5 [&>*:last-child]:mb-0">
    <Head label="challenge" title="Highlights only held old stories, so interests never stuck on the profile." />

    <Body className="mb-10">
      People showed their interests every day through stories and reposts, but none of it carried over to their
      profile. We defined the goal: a highlight should let visitors understand someone at a glance.
    </Body>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {FRAMING.map((f, i) => (
        // tag pinned top-left, the words settle bottom-left
        <Reveal
          key={f.tag}
          delay={0.1 * (i + 1)}
          // the constraint is a boundary, not a bet: drawn as a dashed outline instead of a filled block
          className={`rounded-lg p-2 min-h-[148px] flex flex-col justify-between gap-8 ${
            f.tag === "constraint" ? "border border-dashed border-foreground/20" : "bg-muted/70"
          }`}
        >
          <span
            className={`text-xs font-medium leading-none lowercase ${f.tag === "constraint" ? "text-muted-foreground" : ""}`}
            style={f.tag === "constraint" ? undefined : { color: TIKTOK }}
          >
            {f.tag}
          </span>
          <div>
            <h4 className="text-base font-semibold text-foreground mb-1">{f.title}</h4>
            <p className="text-sm text-foreground/70 leading-relaxed">{f.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default HighlightsChallenge;
