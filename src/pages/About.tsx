import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkExperience from "@/components/WorkExperience";
import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const education = [
  {
    school: "University of Michigan",
    degree: "B.S. in Information Science, Minor in Art & Design",
    period: "2022 – 2026",
  },
];

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-background relative z-10">
        <Header />

        {/* Top section: Intro (left) + Experience & Education (right) */}
        <section className="px-8 pt-16 pb-12 lg:px-24 md:px-[32px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left – Introduction */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="overflow-hidden">
                <p className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground/50 mb-6">
                  About
                </p>
              </div>
              <h1 className="font-sans text-2xl md:text-3xl font-medium text-foreground leading-snug">
                Hi, I'm Stella —
              </h1>
              <p className="font-sans text-[14px] leading-relaxed text-muted-foreground/80">
                A product designer who believes great design lives at the intersection of empathy, systems thinking, and craft. I'm passionate about translating complex problems into intuitive, delightful experiences.
              </p>
              <p className="font-sans text-[14px] leading-relaxed text-muted-foreground/80">
                Currently studying Information Science at the University of Michigan, I bring a multidisciplinary lens — blending UX strategy, visual design, and front-end sensibility to ship products that matter.
              </p>
              <p className="font-sans text-[14px] leading-relaxed text-muted-foreground/80">
                When I'm not designing, you'll find me exploring photography, experimenting with visual art, or diving into a good book.
              </p>
            </motion.div>

            {/* Right – Work Experience & Education */}
            <motion.div
              className="flex flex-col gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            >
              {/* Experience */}
              <div>
                <p className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground/50 mb-6">
                  Experience
                </p>
                <div className="flex flex-col divide-y divide-border/30">
                  {[
                    { company: "AskSia Inc.", role: "Product Designer", period: "2025 – 2026" },
                    { company: "Desai Accelerator", role: "Product Design Intern", period: "2025" },
                    { company: "Michigan Engineering", role: "Social Media Intern", period: "2024 – 2026" },
                    { company: "Michigan Open UX", role: "Product Designer", period: "2023" },
                  ].map((exp, i) => (
                    <div key={i} className="py-4 first:pt-0">
                      <p className="font-sans font-medium text-foreground text-[14px]">{exp.company}</p>
                      <p className="font-sans text-muted-foreground text-[13px]">{exp.role}</p>
                      <p className="font-sans text-muted-foreground/60 text-[12px]">{exp.period}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <p className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground/50 mb-6">
                  Education
                </p>
                <div className="flex flex-col divide-y divide-border/30">
                  {education.map((edu, i) => (
                    <div key={i} className="py-4 first:pt-0">
                      <p className="font-sans font-medium text-foreground text-[14px]">{edu.school}</p>
                      <p className="font-sans text-muted-foreground text-[13px]">{edu.degree}</p>
                      <p className="font-sans text-muted-foreground/60 text-[12px]">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bottom – Photo Gallery */}
        <section className="px-8 pt-6 pb-16 lg:px-24 md:px-[32px]">
          <div className="overflow-hidden">
            <motion.p
              className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground/50 mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              A few moments
            </motion.p>
          </div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-[10px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Placeholder photos – replace with real ones */}
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
