import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const experiences = [
  { company: "AskSia Inc.", role: "Product Designer", period: "2025 – 2026" },
  { company: "Desai Accelerator", role: "Product Design Intern", period: "2025" },
  { company: "Michigan Engineering", role: "Social Media Intern", period: "2024 – 2026" },
  { company: "Michigan Open UX", role: "Product Designer", period: "2023" },
];

const education = [
  { school: "University of Michigan", degree: "BA in Art & Design, Minor in UX Design and Entrepreneurship", period: "Class of 2025" },
];

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-background relative z-10">
        <Header />

        <section className="px-8 pt-16 pb-12 lg:px-24 md:px-[32px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Left – Introduction */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1 className="font-['New_Spirit'] text-3xl md:text-4xl font-normal text-foreground leading-snug">
                Hi, I'm Stella.
              </h1>
              <p className="font-sans text-[14px] leading-relaxed text-muted-foreground">
                A product designer drawn to visual clarity, new tools, and the messy questions behind how products actually work.
              </p>
              <p className="font-sans text-[14px] leading-relaxed text-muted-foreground">
                TLDR of my life: I was born and raised in China, and now study design at the University of Michigan, which means I often see products through a mix of different contexts, habits, and expectations.
              </p>
              <p className="font-sans text-[14px] leading-relaxed text-muted-foreground">
                More than anything, I'm trying to become a designer who brings clarity, momentum, and a point of view to the team. Say hello at stellanotfound@gmail.com or via{" "}
                <a href="https://www.linkedin.com/in/stellapengrnr/" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2">LinkedIn</a>.
              </p>
            </motion.div>

            {/* Right – Experience & Education */}
            <motion.div
              className="flex flex-col gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            >
              {/* Experience */}
              <div>
                <h2 className="font-['New_Spirit'] text-xl md:text-2xl font-normal text-foreground mb-4">
                  Experience
                </h2>
                <div className="flex flex-col divide-y divide-border/40">
                  {experiences.map((exp, i) => (
                    <div key={i} className="flex items-baseline justify-between py-3 first:pt-0">
                      <p className="font-sans text-[14px] text-foreground">
                        <span className="font-medium">{exp.company}</span>
                        <span className="text-muted-foreground"> / {exp.role}</span>
                      </p>
                      <p className="font-sans text-[13px] text-muted-foreground/60 whitespace-nowrap ml-4">
                        {exp.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="font-['New_Spirit'] text-xl md:text-2xl font-normal text-foreground mb-4">
                  Education
                </h2>
                <div className="flex flex-col divide-y divide-border/40">
                  {education.map((edu, i) => (
                    <div key={i} className="flex items-baseline justify-between py-3 first:pt-0">
                      <p className="font-sans text-[14px] text-foreground">
                        <span className="font-medium">{edu.school}</span>
                        <span className="text-muted-foreground"> / {edu.degree}</span>
                      </p>
                      <p className="font-sans text-[13px] text-muted-foreground/60 whitespace-nowrap ml-4">
                        {edu.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bottom – Photo Gallery */}
        <section className="px-8 pt-6 pb-16 lg:px-24 md:px-[32px]">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-[10px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {[profileImg, profileImg, profileImg, profileImg].map((src, i) => (
              <div key={i} className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={src}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </section>
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </>
  );
};

export default About;
