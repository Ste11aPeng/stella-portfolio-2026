import { motion } from "framer-motion";

const experiences = [
  {
    company: "AskSia Inc.",
    role: "Product Designer",
    period: "2025 — 2026",
    description:
      "Defining the end-to-end experience for AI Study Copilot by scaling cross-platform design systems and optimizing growth-driven user flows to enhance product efficiency and engagement.",
  },
  {
    company: "Desai Accelerator",
    role: "Product Design Intern",
    period: "2025",
    description:
      "Architected 0-to-1 design systems and MVPs for various startups, balancing complex functional flows with technical constraints and business objectives.",
  },
  {
    company: "Michigan Engineering",
    role: "Social Media Intern",
    period: "2024 — 2026",
    description:
      "Leading brand communication and content strategy for the College of Engineering, leveraging visual storytelling to amplify social presence while maintaining multi-channel brand consistency.",
  },
  {
    company: "Michigan Open UX",
    role: "Product Designer",
    period: "2023",
    description:
      "Spearheaded UX strategy and execution for university organizations, facilitating design reviews and workshops to deliver developer-ready component libraries and interaction patterns.",
  },
];

const WorkExperience = () => {
  return (
    <section className="px-8 py-16 lg:px-24 md:px-[32px]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-20">
        {/* Section Title */}
        <motion.h2
          className="font-serif text-muted-foreground/40 text-4xl md:text-5xl leading-tight flex-shrink-0 md:w-48"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1] }}
        >
          Work
          <br />
          Experience
        </motion.h2>

        {/* Experience List */}
        <div className="flex-1 flex flex-col">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className={`flex flex-col md:flex-row gap-4 md:gap-12 py-8 ${
                index !== experiences.length - 1 ? "border-b border-border/40" : ""
              } ${index === 0 ? "pt-0" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: [0.0, 0.0, 0.2, 1],
                delay: index * 0.08,
              }}
            >
              {/* Left: Company + Role/Period */}
              <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-12 md:w-[420px] flex-shrink-0">
                <div className="flex-shrink-0 md:w-[180px]">
                  <p className="font-sans font-semibold text-foreground text-[15px]">
                    {exp.company}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="font-sans font-medium text-foreground text-[15px]">
                    {exp.role}
                  </p>
                  <p className="font-sans text-muted-foreground text-sm">
                    {exp.period}
                  </p>
                </div>
              </div>

              {/* Right: Description */}
              <p className="font-sans text-muted-foreground text-[14px] leading-relaxed flex-1">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
