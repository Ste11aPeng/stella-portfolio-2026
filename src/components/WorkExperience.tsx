import { motion } from "framer-motion";

const experiences = [
  {
    company: "AskSia Inc.",
    role: "Product Designer",
    period: "2025 — 2026",
    description: (
      <>Defining the end-to-end experience for <span className="text-foreground">AI Study Copilot</span> by scaling cross-platform design systems and optimizing growth-driven user flows to enhance product efficiency and engagement.</>
    ),
  },
  {
    company: "Desai Accelerator",
    role: "Product Design Intern",
    period: "2025",
    description: (
      <>Architected <span className="text-foreground">0-to-1 design systems and MVPs</span> for various startups, balancing complex functional flows with technical constraints and business objectives.</>
    ),
  },
  {
    company: "Michigan Engineering",
    role: "Social Media Intern",
    period: "2024 — 2026",
    description: (
      <>Leading brand communication and content strategy for the College of Engineering, leveraging <span className="text-foreground">visual storytelling</span> to amplify social presence while maintaining multi-channel brand consistency.</>
    ),
  },
  {
    company: "Michigan Open UX",
    role: "Product Designer",
    period: "2023",
    description: (
      <>Spearheaded <span className="text-foreground">UX strategy and execution</span> for university organizations, facilitating design reviews and workshops to deliver developer-ready component libraries and interaction patterns.</>
    ),
  },
];

const WorkExperience = () => {
  return (
    <section className="px-8 py-12 lg:px-24 md:px-[32px]">
      <motion.p
        className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground/50 mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Work Experience
      </motion.p>

      <div className="flex flex-col divide-y divide-border/30">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            className="flex flex-col md:flex-row gap-3 md:gap-10 py-6 first:pt-0"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              ease: [0.0, 0.0, 0.2, 1],
              delay: index * 0.06,
            }}
          >
            {/* Company + Role */}
            <div className="flex flex-col md:flex-row gap-1 md:gap-8 md:w-[380px] flex-shrink-0">
              <p className="font-sans font-medium text-foreground text-[14px] md:w-[160px] flex-shrink-0">
                {exp.company}
              </p>
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
