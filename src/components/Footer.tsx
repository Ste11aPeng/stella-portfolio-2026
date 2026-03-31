import { motion } from "framer-motion";
import { useState } from "react";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText("stellanotfound@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full py-32 px-8 md:px-16 lg:px-24 bg-[hsl(0,0%,5%)] text-[hsl(0,0%,90%)] relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0,0%,85%) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1440px] mx-auto flex items-center justify-between relative z-10">
        <motion.p
          className="text-sm text-[hsl(0,0%,60%)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Let's make something together 😉
        </motion.p>

        <motion.nav
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          <a
            href="https://www.linkedin.com/in/stellapengrnr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,95%)] transition-colors"
          >
            linkedin
          </a>
          <button
            onClick={handleCopyEmail}
            className="text-sm text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,95%)] transition-colors"
          >
            {copied ? "copied!" : "email"}
          </button>
          <a
            href="https://drive.google.com/file/d/1GBV0XPi594jlw8w1T5tvuYeYDhqGcCh4/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,95%)] transition-colors"
          >
            resume
          </a>
        </motion.nav>
      </div>
    </footer>
  );
};

export default Footer;
