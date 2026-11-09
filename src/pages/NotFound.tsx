import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import BackBar from "@/components/BackBar";
import Seo from "@/components/Seo";
import { Arrow, Label, OUT_LINKS, Title, fade, item, useCopyEmail, type Token } from "@/components/SideNav";

// In the intro's voice: hovering leaves "lost" sharp and lets the rest
// blur away from it, letter by letter, as the intro does.
const LOST: Token[] = [
  { text: "this" },
  { text: "page" },
  { text: "is" },
  { text: "lost", accent: true },
  { text: ",", glue: true },
  { text: "mostly." },
];

// on touch screens a tap would leave the hover blur stuck on
const touch = typeof window !== "undefined" && window.matchMedia?.("(hover: none)").matches;

const NotFound = () => {
  const location = useLocation();
  const [copied, copyEmail] = useCopyEmail();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo page="page not found" path={location.pathname} description="This page doesn't exist. Head back to Stella Peng's portfolio home." />
      <BackBar />

      <main className="flex-1 flex items-center justify-center px-6 pb-24 select-none">
        <div className="w-full max-w-[340px]">
          <motion.p className="mb-2 text-[12px] leading-5 text-[#c2c2c2] tabular-nums" {...fade(0.1)}>
            404
          </motion.p>
          <motion.div {...fade(0.25)}>
            <Title tokens={LOST} still={touch} />
          </motion.div>
          <motion.p className="mt-3 text-[12px] leading-[1.15rem] text-muted-foreground" {...fade(0.4)}>
            it may have moved, or never existed.
          </motion.p>

          <motion.nav aria-label="Elsewhere" className="mt-10" {...fade(0.55)}>
            <Label>elsewhere</Label>
            <div className="group/list flex flex-wrap gap-x-3">
              {OUT_LINKS.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`${item} group/out text-muted-foreground hover:text-foreground`}>
                  {label}
                  <Arrow group="group-hover/out:opacity-100 group-hover/out:translate-x-0" />
                </a>
              ))}
              <button type="button" onClick={copyEmail} className={`${item} group/email text-muted-foreground hover:text-foreground`}>
                {copied ? "copied!" : "email"}
                <Copy
                  size={11}
                  aria-hidden="true"
                  className="ml-1 opacity-0 -translate-x-0.5 transition-all duration-300 ease-out group-hover/email:opacity-100 group-hover/email:translate-x-0"
                />
              </button>
            </div>
          </motion.nav>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
