import { motion, type Easing } from "framer-motion";
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
import visual8 from "@/assets/visual-8.png";
import visual9 from "@/assets/visual-9.png";
import visual10 from "@/assets/visual-10.png";
import visual11 from "@/assets/visual-11.png";
import visual12 from "@/assets/visual-12.png";
import visual13 from "@/assets/visual-13.png";
import visual14 from "@/assets/visual-14.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const images = [
  { src: visual13, alt: "YouTube Shorts UI redesign - Problem statement" },
  { src: visual14, alt: "YouTube Shorts UI redesign - Solution" },
  { src: visual1, alt: "3D coral character artwork" },
  { src: visual2, alt: "Mechanical sketch illustration" },
  { src: visual3, alt: "Changsha typography design" },
  { src: visual4, alt: "Star city editorial design" },
  { src: visual5, alt: "TouchDesigner generative art" },
  { src: visual6, alt: "Abstract 3D visualization" },
  { src: visual7, alt: "DailyRock app design" },
  { src: visual8, alt: "Led Zeppelin interactive design" },
  { src: visual9, alt: "Red tulips photography" },
  { src: visual10, alt: "Architecture photography" },
  { src: visual11, alt: "Transpacific Marxism publication" },
  { src: visual12, alt: "MiKSSI branding" },
];

const Visual = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Image Gallery */}
      <section className="px-8 md:px-16 lg:px-24 pt-8 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  ease: easeOut,
                  delay: index * 0.05
                }}
              >
                <ImageLightbox
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Visual;
