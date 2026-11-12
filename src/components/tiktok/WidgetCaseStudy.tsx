import homeLight from "@/assets/tiktok/widget/home-light.webp";
import homeDark from "@/assets/tiktok/widget/home-dark.webp";
import tutorial from "@/assets/tiktok/widget/tutorial.webp";
import before1 from "@/assets/tiktok/widget/before1.webp";
import before2 from "@/assets/tiktok/widget/before2.webp";
import { Body, Head, Reveal, Tag } from "./parts";

// TikTok, part two: the Stories widget. A short, visual-first write-up: the
// problem, the three pieces that were designed (the widget, the add-widget
// tutorial, cold-start prompts), and a takeaway.

// One visual on a soft panel. Its top-right label says what it is (red for the
// final, shipped design; grey for the old one it replaced); motion
// pieces made with TikTok's creative team say so just under the label.
const Label = ({ children, accent = false, credit }: { children: React.ReactNode; accent?: boolean; credit?: boolean }) => (
  <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
    <Tag large accent={accent}>{children}</Tag>
    {credit && <span className="pr-1 text-xs text-muted-foreground">made with the creative team</span>}
  </div>
);

const Panel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <Reveal className="mb-3">
    <div className={`relative w-full rounded-lg bg-[#F5F6F7] ${className}`}>{children}</div>
  </Reveal>
);

// a looping, silent screen recording, shaped like the phone screens around it
const PhoneVideo = ({ src, poster, label }: { src: string; poster: string; label: string }) => (
  <div className="overflow-hidden rounded-[22px] md:rounded-[26px] h-[420px] md:h-[520px] aspect-[552/1200] bg-black">
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className="h-full w-full object-cover"
    />
  </div>
);

const WidgetCaseStudy = () => (
  <>
    <section id="challenge" className="pt-5 [&>*:last-child]:mb-0">
      <Head label="problem" title="Cropped stories, no context, and often blank." />
      <Body className="mb-6">
        The widget already had real adoption among younger users, but it cropped stories with no context and often
        failed to load. Beyond fixing that, I wanted it to make sense at a glance, so people would add it, and to bring
        them back into Stories, to watch or to post.
      </Body>
    </section>

    {/* "what I designed", split into its three pieces so the side nav can jump to each */}
    <section id="widget" className="pt-16">
      <Head label="what I designed" title="Three pieces: the widget, a way to add it, and a nudge to try it." />
      <Panel className="flex justify-center gap-4 md:gap-8 px-6 pt-14 pb-8">
        <Label accent>widget · small and medium</Label>
        <img src={homeLight} alt="Home screen with the Stories widget in small and medium sizes, light mode" loading="lazy" decoding="async" className="h-[340px] md:h-[480px] w-auto" />
        <img src={homeDark} alt="Home screen with the Stories widget in small and medium sizes, dark mode" loading="lazy" decoding="async" className="h-[340px] md:h-[480px] w-auto" />
      </Panel>
    </section>

    <section id="tutorial">
      {/* the old one-sheet tutorial beside the new four-step one, as one bento row */}
      <Reveal className="mb-3">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2.7fr)] gap-3">
          <div className="relative rounded-lg bg-[#F5F6F7] flex items-center justify-center px-4 pt-14 pb-4">
            <Label>tutorial · before</Label>
            {/* the two old sheets, overlapping */}
            <div className="relative w-full max-w-[240px] h-[280px]">
              <img src={before1} alt="The old add-widget sheet, light mode" loading="lazy" decoding="async" className="absolute left-0 top-0 h-[92%] w-auto" />
              <img src={before2} alt="The old add-widget sheet, dark mode" loading="lazy" decoding="async" className="absolute right-0 bottom-0 h-[92%] w-auto" />
            </div>
          </div>
          <div className="relative rounded-lg bg-[#F5F6F7] flex items-center px-4 pt-14 pb-6 md:px-5">
            <Label accent>tutorial · after</Label>
            <img src={tutorial} alt="Four tutorial screens: what the widget shows, long-press the home screen, tap + then Add Widget, search TikTok for Stories" loading="lazy" decoding="async" className="w-full h-auto" />
          </div>
        </div>
      </Reveal>
      <Panel className="flex justify-center px-6 pt-[80px] md:pt-14 pb-8">
        <Label accent credit>tutorial · picture-in-picture guide</Label>
        <PhoneVideo
          src="/videos/widget-guide.mp4"
          poster="/videos/widget-guide-poster.webp"
          label="A picture-in-picture video on the home screen showing how to add the Stories widget, step by step"
        />
      </Panel>
    </section>

    <section id="cold-start" className="[&>*:last-child]:mb-0">
      <Panel className="flex justify-center px-6 pt-[80px] md:pt-14 pb-8">
        <Label accent credit>cold-start prompt in story browsing</Label>
        <PhoneVideo
          src="/videos/widget-coldstart.mp4"
          poster="/videos/widget-coldstart-poster.webp"
          label="Between two stories, a card invites the viewer to add the Stories widget, with a Try it button"
        />
      </Panel>
    </section>

    <section id="reflection" className="pt-16 pb-24">
      <Head label="takeaway" title="Worth adding, and worth keeping." />
      <Body>
        A widget lives on someone's home screen, outside our app, so it has to earn that space every day. Getting people
        to add it was only half the job; it also had to stay worth keeping. That taught me to design for adoption and
        long-term use together, instead of optimizing one step on its own.
      </Body>
    </section>
  </>
);

export default WidgetCaseStudy;
