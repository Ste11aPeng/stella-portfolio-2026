import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";

import visual1 from "@/assets/visual-1.png";
import visual2 from "@/assets/visual-2.png";
import visual3 from "@/assets/visual-3.png";
import visual4 from "@/assets/visual-4.png";
import visual5 from "@/assets/visual-5.png";
import visual6 from "@/assets/visual-6.png";
import visual7 from "@/assets/visual-7.png";

const images = [
  { src: visual1, alt: "3D coral character render", span: "full" },
  { src: visual2, alt: "Coral sculpture photo collection", span: "normal" },
  { src: visual3, alt: "Character design iterations and sketches", span: "normal" },
  { src: visual4, alt: "Mechanical creature sketch", span: "normal" },
  { src: visual5, alt: "Changsha typography editorial design", span: "normal" },
  { src: visual6, alt: "Star city editorial spread", span: "normal" },
  { src: visual7, alt: "TouchDesigner generative art mind map", span: "full" },
] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const Visual = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page title */}
      <section className="px-8 md:px-16 lg:px-24 pt-16 pb-6 max-w-[1440px] mx-auto">
        <motion.h1
          className="font-['New_Spirit'] text-[28px] md:text-[36px] text-foreground"
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Visual
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground mt-2 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A collection of 3D, editorial, and generative work.
        </motion.p>
      </section>

      {/* Image Gallery */}
      <section className="px-8 md:px-16 lg:px-24 pb-24 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={image.span === "full" ? "md:col-span-2" : ""}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06 }}
            >
              <ImageLightbox
                src={image.src}
                alt={image.alt}
                className="w-full h-auto"
              />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Visual;
