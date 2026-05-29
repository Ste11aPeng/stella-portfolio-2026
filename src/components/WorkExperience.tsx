import { motion } from "framer-motion";

const experiences = [
  {
    company: "TikTok",
    url: "https://www.tiktok.com/",
    role: "Product Design Intern",
    period: "Summer 2026",
    description: (
      <>Designing <span className="text-foreground">end-to-end product experiences</span> at scale, collaborating across cross-functional teams to shape features that engage a global community of users.</>
    ),
  },
  {
    company: "AskSia Inc.",
    url: "https://www.asksia.ai/",
    role: "Product Designer",
    period: "2025 – 2026",
    description: (
      <>Defining the end-to-end experience for <span className="text-foreground">AI Study Copilot</span> by scaling cross-platform design systems and optimizing growth-driven user flows to enhance product efficiency and engagement.</>
    ),
  },
  {
    company: "Desai Accelerator",
    url: "https://www.desaiaccelerator.com/",
    role: "Product Design Intern",
    period: "Summer 2025",
    description: (
      <>Architected <span className="text-foreground">0-to-1 design systems and MVPs</span> for various startups, balancing complex functional flows with technical constraints and business objectives.</>
    ),
  },
  {
    company: "Michigan Engineering",
    url: "https://www.engin.umich.edu/",
    role: "Social Media Intern",
    period: "2024 – 2026",
    description: (
      <>Leading brand communication and content strategy for the College of Engineering, leveraging <span className="text-foreground">visual storytelling</span> to amplify social presence while maintaining multi-channel brand consistency.</>
    ),
  },
  {
    company: "Michigan Open UX",
    url: "https://www.moux.club/",
    role: "Product Designer",
    period: "2023",
    description: (
      <>Spearheaded <span className="text-foreground">UX strategy and execution</span> for university organizations, facilitating design reviews and workshops to deliver developer-ready component libraries and interaction patterns.</>
    ),
  },
];

const WorkExperience = () => {
  return (
    <section className="px-8 pt-12 pb-6 lg:px-24 md:px-[32px] max-w-[1440px] mx-auto">
      <div className="overflow-hidden">
        <motion.p
          className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground/50 mb-10"
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Work Experience
        </motion.p>
      </div>

      <div className="flex flex-col divide-y divide-border/30">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            className="flex flex-col md:flex-row gap-3 md:gap-10 py-6 first:pt-0"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: index * 0.08,
            }}
          >
            {/* Company + Role */}
            <div className="flex flex-col md:flex-row gap-1 md:gap-8 md:w-[380px] flex-shrink-0">
              <span className="md:w-[160px] flex-shrink-0">
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-medium text-foreground text-[14px] relative inline after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-full after:bg-foreground after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                  {exp.company}
                </a>
              </span>
              <div>
                <p className="font-sans text-muted-foreground text-[13px]">
                  {exp.role}
                </p>
                <p className="font-sans text-muted-foreground/60 text-[12px]">
                  {exp.period}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-muted-foreground/70 text-[13px] leading-relaxed flex-1">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
