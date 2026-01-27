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

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const images = [
  { src: visual1, alt: "3D coral character artwork", span: "full" as const },
  { src: visual2, alt: "Mechanical sketch illustration", span: "half" as const },
  { src: visual3, alt: "Changsha typography design", span: "half" as const },
  { src: visual4, alt: "Star city editorial design", span: "full" as const },
  { src: visual5, alt: "TouchDesigner generative art", span: "full" as const },
  { src: visual6, alt: "Abstract 3D visualization", span: "full" as const },
];

const Visual = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section */}
      <section className="pt-8 pb-8 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            className="text-2xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            Visual
          </motion.h1>
        </div>
      </section>
      
      {/* Image Gallery */}
      <section className="px-8 md:px-16 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2.5 w-full items-center justify-center">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={image.span === "full" ? "w-full" : "w-full md:w-[calc(50%-5px)]"}
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
