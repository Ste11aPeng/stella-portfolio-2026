import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";

import visual1 from "@/assets/visual-1.png";
import visual2 from "@/assets/visual-2.png";
import visual3 from "@/assets/visual-3.png";
import visual4 from "@/assets/visual-4.png";
import visual5 from "@/assets/visual-5.png";
import visual7 from "@/assets/visual-7.png";
import lottieAnimation from "@/assets/visual-lottie.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef } from "react";

const images: { src?: string; alt: string; span: "full" | "normal"; lottie?: boolean }[] = [
  { src: visual1, alt: "3D coral character render", span: "full" },
  { src: visual2, alt: "Coral sculpture photo collection", span: "normal" },
  { src: visual3, alt: "Character design iterations and sketches", span: "normal" },
  { src: visual4, alt: "Mechanical creature sketch", span: "normal" },
  { src: visual5, alt: "Changsha typography editorial design", span: "normal" },
  { lottie: true, alt: "Motion design animation", span: "normal" },
  { src: visual7, alt: "TouchDesigner generative art mind map", span: "normal" },
];

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
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.8);
    }
  }, []);

  useEffect(() => {
    document.title = "Visual Work | Stella P. – 3D, Editorial & Generative Art";
    return () => { document.title = "Stella P. | Product Designer Portfolio"; };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page title */}
      <section className="px-8 md:px-16 lg:px-24 pt-16 pb-6 max-w-[1440px] mx-auto">
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          When I'm not designing products, I make 3D characters, editorial zines, and generative visuals.
        </motion.p>
      </section>

      {/* Image & Video Gallery */}
      <section className="px-8 md:px-16 lg:px-24 pb-24 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          {/* Two looping videos */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <video
              src="/videos/accordion.mp4"
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="w-full h-auto rounded-none pointer-events-none select-none"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.06 }}
          >
            <video
              src="/videos/music.mp4"
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="w-full h-auto rounded-none pointer-events-none select-none"
            />
          </motion.div>

          {/* Images */}
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
              {image.lottie ? (
                <div className="w-full aspect-[4/3] overflow-hidden flex items-center justify-center bg-muted">
                  <Lottie animationData={lottieAnimation} loop lottieRef={lottieRef} className="w-full h-full" />
                </div>
              ) : (
                <ImageLightbox
                  src={image.src!}
                  alt={image.alt}
                  className="w-full h-auto"
                />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Visual;
