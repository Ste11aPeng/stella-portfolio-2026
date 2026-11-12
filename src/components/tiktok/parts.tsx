import { motion, type Easing } from "framer-motion";
import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import AnimatedTitle from "@/components/AnimatedTitle";

// Shared pieces for the TikTok Highlights write-up, set the same way as the
// other case studies: a small lowercase label, a blurred-in title, body copy.
export const easeOut: Easing = [0.0, 0.0, 0.2, 1];
export const TIKTOK = "#FE2C55";

export const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: easeOut, delay }}
  >
    {children}
  </motion.div>
);

// Every section opens on a rule with 64px (mb-16) below it; the next section's
// pt-16 puts 64px above the next rule. A section followed by a rule zeroes its
// last child's bottom margin ([&>*:last-child]:mb-0) so the gap stays 64/64.
export const Head = ({ label, title }: { label: string; title: string }) => (
  <>
    <Separator className="mb-16 bg-border/60" />
    <Reveal>
      {/* the section's name as a soft grey chip */}
      <span className="inline-block mb-4 rounded-md bg-foreground/[0.05] px-2.5 py-1 text-sm font-medium leading-5 text-muted-foreground">
        {label}
      </span>
      <AnimatedTitle text={title} className="text-2xl font-bold mb-6 text-foreground" />
    </Reveal>
  </>
);

export const Body = ({ children, className = "mb-6" }: { children: ReactNode; className?: string }) => (
  <Reveal delay={0.1} className={className}>
    <p className="text-base max-w-3xl text-muted-foreground leading-relaxed">{children}</p>
  </Reveal>
);

// a small chip; accent tints it (TikTok red unless told otherwise) for the
// picked or key item
// a hex colour at a given opacity, for tinted chip backgrounds
const tintBg = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

export const Tag = ({
  children, accent = false, large = false, tint = TIKTOK, className = "",
}: { children: ReactNode; accent?: boolean; large?: boolean; tint?: string; className?: string }) => (
  <span
    className={`inline-flex items-center rounded-md font-medium leading-none lowercase ${
      large ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-xs"
    } ${className} ${
      accent ? "" : "bg-foreground/[0.06] text-muted-foreground"
    }`}
    style={accent ? { color: tint, backgroundColor: tintBg(tint, 0.08) } : undefined}
  >
    {children}
  </span>
);

// a closed eye: a lid with four lashes, drawn in currentColor (viewBox cropped
// to the drawing, so it sits on the text line like a glyph)
const ClosedEye = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="40 186 432 226"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="44"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M65 212 C 120 300, 190 340, 256 340 C 322 340, 392 300, 447 212" />
    <path d="M102 294 L72 324 M192 342 L180 386 M320 342 L332 386 M410 294 L440 324" />
  </svg>
);

// A visual on a soft panel. The panel takes the image's own backdrop colour so
// narrower images (maxW) sit in it seamlessly; the caption sits underneath.
// Work under NDA gets an "under NDA" chip top-right, with room kept above the
// image so the chip never sits on it.
export const Figure = ({
  src, alt, caption, bg = "#F5F6F7", maxW, blur, nda = false, className = "mb-10",
}: {
  src: string; alt: string; caption?: string; bg?: string; maxW?: number; blur?: number; nda?: boolean; className?: string;
}) => (
  <Reveal className={className}>
    <figure>
      <div
        className={`relative w-full overflow-hidden rounded-lg flex justify-center ${nda ? "pt-6" : ""}`}
        style={{ backgroundColor: bg }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-auto"
          style={{ maxWidth: maxW, filter: blur ? `blur(${blur}px)` : undefined }}
        />
        {nda && (
          <Tag large className="absolute top-3 right-3 gap-1.5 normal-case">
            <ClosedEye className="h-[9px] w-auto" />
            under NDA
          </Tag>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  </Reveal>
);

