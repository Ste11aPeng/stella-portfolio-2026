import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy } from "lucide-react";
import { useNavSound } from "@/hooks/use-nav-sound";
import { openResume } from "@/lib/resume-events";
import { RESUME_PDF } from "@/data/resume";

// The homepage's left column, after jerryddi.com / yiqyan.xyz: who I am, an
// index of the page, links out, and the time in Seattle. It stays put
// while the work scrolls beside it. Desktop only; phones get the header.

export type Section = "work" | "visual" | "about";

const useSeattleTime = () => {
  const fmt = () =>
    new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit", hour12: true });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
};

// Hovering one item fades and softly blurs the others in its group, as the header does.
const item =
  "relative inline-flex w-fit items-center text-sm leading-[21px] transition-all duration-700 ease-out group-hover/list:opacity-25 group-hover/list:blur-[0.8px] hover:!opacity-100 hover:!blur-0";

const Arrow = ({ group }: { group: string }) => (
  <ArrowUpRight
    size={12}
    aria-hidden="true"
    className={`ml-0.5 opacity-0 -translate-x-0.5 transition-all duration-300 ease-out ${group}`}
  />
);

const Label = ({ children }: { children: string }) => (
  <p className="mb-1.5 text-[12px] leading-5 text-[#a1a1a1] select-none">{children}</p>
);

// a short line in front marks the section on screen: it draws in from nothing
// and nudges the word along, and folds away again when the section changes
const Marker = ({ on }: { on: boolean }) => (
  <span
    aria-hidden="true"
    className={`inline-block h-px bg-foreground transition-all duration-500 ease-out ${
      on ? "w-2 mr-1.5 opacity-100" : "w-0 mr-0 opacity-0"
    }`}
  />
);

const fade = (delay: number) => ({
  initial: { opacity: 0, filter: "blur(10px)", y: 6 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0, transitionEnd: { filter: "none" } },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

// One line of the nav lists, resolving from a blur in turn. The wrapper takes
// the animation so the link inside keeps its own hover fade and blur.
const STEP_START = 0.75;
const STEP_GAP = 0.06;
const Step = ({ i, children }: { i: number; children: React.ReactNode }) => (
  <motion.div {...fade(STEP_START + i * STEP_GAP)}>{children}</motion.div>
);

// The intro: hovering it leaves the two roles, "designer" and "builder", sharp
// while every other word (and their commas) blurs and fades with its distance
// from the nearer of them.
type Token = { text: string; accent?: boolean; /** sits right after the previous token, no space */ glue?: boolean };
const TITLE: Token[] = [
  { text: "Stella" },
  { text: "is" },
  { text: "a" },
  { text: "designer", accent: true },
  { text: ",", glue: true },
  { text: "mostly." },
  { text: "builder", accent: true },
  { text: ",", glue: true },
  { text: "often." },
];
// token indices grouped into words (a glued token joins the one before it)
const GROUPS = TITLE.reduce<number[][]>((groups, t, i) => {
  if (t.glue && groups.length) groups[groups.length - 1].push(i);
  else groups.push([i]);
  return groups;
}, []);
const ACCENTS = TITLE.flatMap((t, i) => (t.accent ? [i] : []));
// set smaller than the old hero (19px vs 32px), so distances are scaled up to match its feel
const SCALE = 32 / 19;
const blurFor = (d: number) => Math.min(0.6 + d * SCALE * 0.0105, 2.6).toFixed(2);
const opacityFor = (d: number) => Math.max(0.82 - d * SCALE * 0.001, 0.4).toFixed(2);
const nearestAccent = (i: number) => Math.min(...ACCENTS.map((a) => Math.abs(i - a)));

const Title = () => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [dists, setDists] = useState<number[]>(() => TITLE.map((_, i) => nearestAccent(i) * 30));

  // distance from each word to the nearer accent's middle, as laid out
  useLayoutEffect(() => {
    const centre = (el: HTMLElement | null) => {
      const r = el?.getBoundingClientRect();
      return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
    };
    const measure = () => {
      const anchors = ACCENTS.map((a) => centre(refs.current[a])).filter((c): c is { x: number; y: number } => !!c);
      if (!anchors.length) return;
      setDists(
        refs.current.map((el) => {
          const c = centre(el);
          return c ? Math.min(...anchors.map((a) => Math.hypot(c.x - a.x, c.y - a.y))) : 0;
        })
      );
    };
    measure();
    document.fonts?.ready.then(measure);
  }, []);

  return (
    <p
      className="group/title text-[19px] leading-[1.35rem] select-none"
      style={{ color: "var(--title-ink)", fontFamily: "'Baskervville', serif", fontWeight: 500, letterSpacing: "-0.01em" }}
    >
      {GROUPS.map((group, g) => (
        // a word and the comma glued to it never part across lines; the space
        // before it sits outside, so lines can still break between words
        <Fragment key={g}>
          {g > 0 && " "}
          <span className="whitespace-nowrap">
          {group.map((i) => {
            const t = TITLE[i];
            return (
              <span
                key={i}
                ref={(el) => (refs.current[i] = el)}
                className={
                  t.accent
                    ? "inline-block"
                    : "inline-block transition-[filter,opacity] duration-700 ease-out group-hover/title:[filter:blur(var(--hb))] group-hover/title:opacity-[var(--ho)]"
                }
                style={
                  t.accent ? undefined : ({ "--hb": `${blurFor(dists[i])}px`, "--ho": opacityFor(dists[i]) } as React.CSSProperties)
                }
              >
                {t.text}
              </span>
            );
          })}
          </span>
        </Fragment>
      ))}
    </p>
  );
};

const SideNav = ({ active, onJump }: { active: Section; onJump: (s: Section) => void }) => {
  const playSound = useNavSound();
  const time = useSeattleTime();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("stellanotfound@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sectionLink = (s: Section, label: string) => (
    <button
      type="button"
      onClick={() => {
        playSound("click");
        onJump(s);
      }}
      className={`${item} ${active === s ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
    >
      <Marker on={active === s} />
      {label}
    </button>
  );

  return (
    <aside className="hidden md:flex sticky top-0 h-screen w-[264px] lg:w-[276px] shrink-0 flex-col justify-between pl-8 pr-2.5 lg:pl-9 py-8 select-none">
      <div>
        <motion.div {...fade(0.3)}>
          <Title />
        </motion.div>

        <motion.p className="mt-3 text-[12px] leading-[1.15rem] text-muted-foreground" {...fade(0.6)}>
          <a href="https://mhcid.washington.edu" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#4B2E83]">
            Master's in HCI + Design @UW
          </a>
          <br />
          Prev. design{" "}
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#FF0050]">
            @TikTok
          </a>
        </motion.p>

        {/* the lists come in a line at a time, top to bottom */}
        <nav aria-label="Site" className="mt-10 flex flex-col gap-7">
          <div>
            <Step i={0}>
              <Label>index</Label>
            </Step>
            <div className="group/list flex flex-col">
              <Step i={1}>{sectionLink("work", "product")}</Step>
              <Step i={2}>{sectionLink("visual", "visual")}</Step>
              <Step i={3}>{sectionLink("about", "about")}</Step>
              <Step i={4}>
                <a
                  href={RESUME_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openResume();
                  }}
                  className={`${item} text-muted-foreground hover:text-foreground`}
                >
                  resume
                </a>
              </Step>
            </div>
          </div>
          <div>
            <Step i={5}>
              <Label>elsewhere</Label>
            </Step>
            <div className="group/list flex flex-col">
              {[
                ["linkedin", "https://www.linkedin.com/in/stellapengrnr/"],
                ["instagram", "https://www.instagram.com/abtste11a/"],
                ["twitter", "https://x.com/abtste11a"],
              ].map(([label, href], k) => (
                <Step key={label} i={6 + k}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${item} group/out text-muted-foreground hover:text-foreground`}
                  >
                    {label}
                    <Arrow group="group-hover/out:opacity-100 group-hover/out:translate-x-0" />
                  </a>
                </Step>
              ))}
              <Step i={9}>
                <button type="button" onClick={copyEmail} className={`${item} group/email text-muted-foreground hover:text-foreground`}>
                  {copied ? "copied!" : "email"}
                  {/* copies the address rather than opening mail */}
                  <Copy
                    size={11}
                    aria-hidden="true"
                    className="ml-1 opacity-0 -translate-x-0.5 transition-all duration-300 ease-out group-hover/email:opacity-100 group-hover/email:translate-x-0"
                  />
                </button>
              </Step>
            </div>
          </div>
        </nav>
      </div>

      <motion.div className="text-[12px] leading-5 text-[#a1a1a1]" {...fade(STEP_START + 10 * STEP_GAP)}>
        <p className="tabular-nums">{time}, Seattle WA</p>
      </motion.div>
    </aside>
  );
};

export default SideNav;
