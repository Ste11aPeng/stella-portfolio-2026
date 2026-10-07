import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, Copy } from "lucide-react";

const SanJoseClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-sm text-[hsl(0,0%,60%)] tabular-nums">
      {time} / Seattle WA
    </span>
  );
};

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText("stellanotfound@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full py-24 px-8 md:px-16 lg:px-24 bg-[hsl(0,0%,5%)] text-[hsl(0,0%,90%)] relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0,0%,40%) 0.8px, transparent 0.8px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1440px] mx-auto flex items-center justify-between relative z-10">
        <motion.p
          className="flex-1 text-sm text-[hsl(0,0%,60%)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          let's build together
        </motion.p>

        <motion.nav
          className="flex items-center gap-6 group/footernav"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          <a
            href="https://www.linkedin.com/in/stellapengrnr/"
            target="_blank"
            rel="noopener noreferrer"
            className="group/fl relative inline-flex items-center text-sm text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,95%)] transition-all duration-500 ease-out group-hover/footernav:opacity-60 group-hover/footernav:blur-[0.4px] hover:!opacity-100 hover:!blur-0"
          >
            linkedin
            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="absolute left-full top-1/2 -translate-y-1/2 translate-x-0.5 opacity-0 transition-all duration-300 ease-out group-hover/fl:opacity-100"
            />
          </a>
          <a
            href="https://drive.google.com/file/d/1GBV0XPi594jlw8w1T5tvuYeYDhqGcCh4/view"
            target="_blank"
            rel="noopener noreferrer"
            className="group/fr relative inline-flex items-center text-sm text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,95%)] transition-all duration-500 ease-out group-hover/footernav:opacity-60 group-hover/footernav:blur-[0.4px] hover:!opacity-100 hover:!blur-0"
          >
            resume
            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="absolute left-full top-1/2 -translate-y-1/2 translate-x-0.5 opacity-0 transition-all duration-300 ease-out group-hover/fr:opacity-100"
            />
          </a>
          <button
            onClick={handleCopyEmail}
            className="group/femail relative inline-flex items-center text-sm text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,95%)] transition-all duration-500 ease-out group-hover/footernav:opacity-60 group-hover/footernav:blur-[0.4px] hover:!opacity-100 hover:!blur-0"
          >
            {copied ? "copied!" : "email"}
            <Copy
              size={12}
              aria-hidden="true"
              className="absolute left-full top-1/2 -translate-y-1/2 translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover/femail:opacity-100"
            />
          </button>
          <a
            href="https://www.instagram.com/abtste11a/"
            target="_blank"
            rel="noopener noreferrer"
            className="group/fi relative inline-flex items-center text-sm text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,95%)] transition-all duration-500 ease-out group-hover/footernav:opacity-60 group-hover/footernav:blur-[0.4px] hover:!opacity-100 hover:!blur-0"
          >
            instagram
            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="absolute left-full top-1/2 -translate-y-1/2 translate-x-0.5 opacity-0 transition-all duration-300 ease-out group-hover/fi:opacity-100"
            />
          </a>
          <a
            href="https://x.com/abtste11a"
            target="_blank"
            rel="noopener noreferrer"
            className="group/fx relative inline-flex items-center text-sm text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,95%)] transition-all duration-500 ease-out group-hover/footernav:opacity-60 group-hover/footernav:blur-[0.4px] hover:!opacity-100 hover:!blur-0"
          >
            x
            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="absolute left-full top-1/2 -translate-y-1/2 translate-x-0.5 opacity-0 transition-all duration-300 ease-out group-hover/fx:opacity-100"
            />
          </a>
        </motion.nav>

        <motion.div
          className="flex-1 flex justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
          <SanJoseClock />
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
