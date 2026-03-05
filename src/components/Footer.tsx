import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="h-[200px]">
      <footer className="fixed bottom-0 left-0 right-0 w-full py-8 px-6 md:px-12 bg-[hsl(0_0%_5%)] z-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.p
            className="text-sm text-[hsl(0_0%_65%)]"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Don't be a stranger
          </motion.p>

          <motion.nav
            className="flex items-center gap-6"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          >
            <a
              href="https://www.linkedin.com/in/stellapengrnr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[hsl(0_0%_65%)] hover:text-[hsl(0_0%_98%)] transition-colors"
            >
              linkedin
            </a>
            <a
              href="mailto:stellanotfound@gmail.com"
              className="text-sm text-[hsl(0_0%_65%)] hover:text-[hsl(0_0%_98%)] transition-colors"
            >
              email
            </a>
            <a
              href="https://drive.google.com/file/d/1GBV0XPi594jlw8w1T5tvuYeYDhqGcCh4/view"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[hsl(0_0%_65%)] hover:text-[hsl(0_0%_98%)] transition-colors"
            >
              resume
            </a>
          </motion.nav>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
