import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
// Every row is 28px tall: buttons and links otherwise sit on the line box
// differently and come out 28px and 24px.
export const item =
  "relative inline-flex h-7 w-fit items-center text-sm leading-[21px] transition-all duration-700 ease-out group-hover/list:opacity-25 group-hover/list:blur-[0.8px] hover:!opacity-100 hover:!blur-0";

export const Arrow = ({ group }: { group: string }) => (
  <ArrowUpRight
    size={12}
    aria-hidden="true"
    className={`ml-0.5 opacity-0 -translate-x-0.5 transition-all duration-300 ease-out ${group}`}
  />
);

export const Label = ({ children }: { children: string }) => (
  <p className="mb-1.5 text-[12px] leading-5 text-[#c2c2c2] select-none">{children}</p>
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

export const fade = (delay: number) => ({
  initial: { opacity: 0, filter: "blur(10px)", y: 6 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0, transitionEnd: { filter: "none" } },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

// One line of the nav lists, resolving from a blur in turn. The wrapper takes
// the animation so the link inside keeps its own hover fade and blur.
const STEP_START = 0.75;
const STEP_GAP = 0.06;
const Step = ({ i, children }: { i: number; children: React.ReactNode }) => (
  <motion.div className="flex" {...fade(STEP_START + i * STEP_GAP)}>
    {children}
  </motion.div>
);

// The intro: hovering it leaves the two roles, "designer" and "builder", sharp
// while everything else blurs and fades with its distance from the nearer of
// them. That's worked out letter by letter, not word by word, so a lone word
// like "mostly." still clears towards the role beside it and hazes away from it.
export type Token = {
  text: string;
  accent?: boolean;
  /** sits right after the previous token, no space */
  glue?: boolean;
  /** starts the second line */
  newline?: boolean;
};
const TITLE: Token[] = [
  { text: "Stella" },
  { text: "is" },
  { text: "a" },
  { text: "designer", accent: true },
  { text: ",", glue: true },
  { text: "mostly." },
  { text: "builder", accent: true, newline: true },
  { text: ",", glue: true },
  { text: "often." },
];
// How a line of tokens breaks down: words (a glued token joins the one before
// it), and the pieces that blur on their own: an accent whole, anything else
// letter by letter.
type Piece = { token: number; text: string };
const layoutOf = (tokens: Token[]) => {
  const groups = tokens.reduce<number[][]>((gs, t, i) => {
    if (t.glue && gs.length) gs[gs.length - 1].push(i);
    else gs.push([i]);
    return gs;
  }, []);
  const pieces: Piece[] = tokens.flatMap((t, token) =>
    t.accent ? [{ token, text: t.text }] : [...t.text].map((ch) => ({ token, text: ch }))
  );
  const accents = tokens.flatMap((t, i) => (t.accent ? [i] : []));
  return {
    groups,
    pieces,
    piecesOf: (token: number) => pieces.flatMap((p, k) => (p.token === token ? [k] : [])),
    accentPieces: pieces.flatMap((p, k) => (tokens[p.token].accent ? [k] : [])),
    nearestAccent: (i: number) => Math.min(...accents.map((a) => Math.abs(i - a))),
  };
};
// set smaller than the old hero (21px vs 32px), so distances are scaled up to match its feel
const SCALE = 32 / 21;
const blurFor = (d: number) => Math.min(0.4 + d * SCALE * 0.016, 2.8).toFixed(2);
const opacityFor = (d: number) => Math.max(0.88 - d * SCALE * 0.002, 0.35).toFixed(2);

// The intro by default; the 404 page sets its own line in the same voice.
// `still`: no hover effect (phones, where a tap would leave it stuck blurred)
export const Title = ({ tokens = TITLE, still = false }: { tokens?: Token[]; still?: boolean }) => {
  const { groups, pieces, piecesOf, accentPieces, nearestAccent } = useMemo(() => layoutOf(tokens), [tokens]);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const para = useRef<HTMLParagraphElement>(null);
  const [dists, setDists] = useState<number[]>(() => pieces.map((p) => nearestAccent(p.token) * 30));

  // distance from each letter to the nearer accent, as laid out: sideways it
  // counts from the accent's edge (so letters right beside "designer" are
  // nearly sharp), and a line apart counts as far, so each word takes its
  // cue from the role on its own line
  useLayoutEffect(() => {
    const box = (el: HTMLElement | null) => {
      const r = el?.getBoundingClientRect();
      return r && r.width ? { x: r.left + r.width / 2, y: r.top + r.height / 2, hw: r.width / 2 } : null;
    };
    const measure = () => {
      const anchors = accentPieces.map((k) => box(refs.current[k])).filter((c): c is NonNullable<typeof c> => !!c);
      if (!anchors.length) return;
      setDists(
        refs.current.map((el) => {
          const c = box(el);
          return c
            ? Math.min(...anchors.map((a) => Math.hypot(Math.max(Math.abs(c.x - a.x) - a.hw, 0), (c.y - a.y) * 3)))
            : 0;
        })
      );
    };
    measure();
    document.fonts?.ready.then(measure);
    // again whenever it reflows (or first gets laid out, if it started hidden)
    const ro = new ResizeObserver(measure);
    if (para.current) ro.observe(para.current);
    return () => ro.disconnect();
  }, [accentPieces]);

  return (
    <p
      ref={para}
      className="group/title whitespace-nowrap text-[21px] leading-[1.5rem] select-none"
      style={{ color: "var(--title-ink)", fontFamily: "'Baskervville', serif", fontWeight: 500, letterSpacing: "-0.01em" }}
    >
      {groups.map((group, g) => (
        // always two lines, broken after "mostly." (letter-by-letter spans
        // lose a little kerning, enough to push it down a line otherwise)
        <Fragment key={g}>
          {g > 0 && (tokens[group[0]].newline ? <br /> : " ")}
          <span>
            {group.flatMap(piecesOf).map((k) => {
              const accent = tokens[pieces[k].token].accent;
              return (
                <span
                  key={k}
                  ref={(el) => (refs.current[k] = el)}
                  className={
                    accent || still
                      ? "inline-block"
                      : "inline-block transition-[filter,opacity] duration-700 ease-out group-hover/title:[filter:blur(var(--hb))] group-hover/title:opacity-[var(--ho)]"
                  }
                  style={accent ? undefined : ({ "--hb": `${blurFor(dists[k])}px`, "--ho": opacityFor(dists[k]) } as React.CSSProperties)}
                >
                  {pieces[k].text}
                </span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </p>
  );
};

// the line under the intro
const Credits = ({ className = "" }: { className?: string }) => (
  <p className={`text-[12px] leading-[1.15rem] text-muted-foreground ${className}`}>
    <a href="https://mhcid.washington.edu" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#4B2E83]">
      Master's in HCI + Design @UW
    </a>
    <br />
    Prev. design{" "}
    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-[#FF0050]">
      @TikTok
    </a>
  </p>
);

export const OUT_LINKS = [
  ["linkedin", "https://www.linkedin.com/in/stellapengrnr/"],
  ["instagram", "https://www.instagram.com/abtste11a/"],
  ["x/twitter", "https://x.com/abtste11a"],
] as const;

// copies the address rather than opening mail
export const useCopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText("stellanotfound@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return [copied, copy] as const;
};

const SideNav = ({ active, onJump }: { active: Section; onJump: (s: Section) => void }) => {
  const playSound = useNavSound();
  const time = useSeattleTime();
  const [copied, copyEmail] = useCopyEmail();

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
    <aside className="hidden md:flex sticky top-0 h-screen w-[288px] lg:w-[290px] shrink-0 flex-col justify-between pl-8 pr-2.5 lg:pl-9 py-8 select-none">
      <div>
        <motion.div {...fade(0.3)}>
          <Title />
        </motion.div>

        <motion.div className="mt-3" {...fade(0.6)}>
          <Credits />
        </motion.div>

        {/* the lists come in a line at a time, top to bottom */}
        <nav aria-label="Site" className="mt-10">
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
        </nav>
      </div>

      {/* links out sit at the foot of the column, above the time */}
      <div>
        <nav aria-label="Elsewhere" className="mb-8">
          <div>
            <Step i={5}>
              <Label>elsewhere</Label>
            </Step>
            <div className="group/list flex flex-col">
              {OUT_LINKS.map(([label, href], k) => (
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
        <motion.div className="text-[12px] leading-5 text-[#a1a1a1]" {...fade(STEP_START + 10 * STEP_GAP)}>
          <p className="tabular-nums">{time}, Seattle WA</p>
        </motion.div>
      </div>
    </aside>
  );
};

// Phones: the same pieces stacked instead of in a column. The intro and
// credits open the page, the index rides along at the top in one row (with
// the same marker line), and the links out and the time close the page.
export const MobileIntro = ({ active, onJump }: { active: Section; onJump: (s: Section) => void }) => {
  const playSound = useNavSound();
  const link = (s: Section, label: string) => (
    <button
      type="button"
      onClick={() => {
        playSound("click");
        onJump(s);
      }}
      className={`inline-flex h-7 items-center text-sm transition-colors duration-300 ${active === s ? "text-foreground" : "text-muted-foreground"}`}
    >
      <Marker on={active === s} />
      {label}
    </button>
  );

  return (
    <>
      <div className="md:hidden px-6 pt-12 pb-5 select-none">
        <motion.div {...fade(0.2)}>
          <Title still />
        </motion.div>
        <motion.div className="mt-3" {...fade(0.4)}>
          <Credits />
        </motion.div>
      </div>
      {/* sticks to the top of the screen once the intro has scrolled away */}
      <motion.nav
        aria-label="Site"
        className="md:hidden sticky top-0 z-30 mb-3 bg-background/90 backdrop-blur-md px-6 select-none"
        {...fade(0.55)}
      >
        <div className="flex h-12 items-center gap-5">
          {link("work", "product")}
          {link("visual", "visual")}
          {link("about", "about")}
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              openResume();
            }}
            className="inline-flex h-7 items-center text-sm text-muted-foreground"
          >
            resume
          </a>
        </div>
      </motion.nav>
    </>
  );
};

export const MobileFoot = () => {
  const time = useSeattleTime();
  const [copied, copyEmail] = useCopyEmail();
  return (
    <footer className="md:hidden px-6 pt-6 pb-12 select-none">
      <Label>elsewhere</Label>
      <div className="flex flex-wrap gap-x-5">
        {OUT_LINKS.map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex h-7 items-center text-sm text-muted-foreground">
            {label}
            <ArrowUpRight size={12} aria-hidden="true" className="ml-0.5 opacity-60" />
          </a>
        ))}
        <button type="button" onClick={copyEmail} className="inline-flex h-7 items-center text-sm text-muted-foreground">
          {copied ? "copied!" : "email"}
          <Copy size={11} aria-hidden="true" className="ml-1 opacity-60" />
        </button>
      </div>
      <p className="mt-6 text-[12px] leading-5 text-[#a1a1a1] tabular-nums">{time}, Seattle WA</p>
    </footer>
  );
};

export default SideNav;
