import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import visual1 from "@/assets/visual-1.png";
import visual2 from "@/assets/visual-2.png";
import visual3 from "@/assets/visual-3.png";
import visual4 from "@/assets/visual-4.png";
import visual5 from "@/assets/visual-5.png";
import lottieAnimation from "@/assets/visual-lottie.json";
import lottieAnimation2 from "@/assets/visual-lottie-2.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState } from "react";

const images: { src?: string; alt: string; span: "full" | "normal"; lottie?: 1 | 2 }[] = [
  { lottie: 1, alt: "Motion design animation", span: "normal" },
  { lottie: 2, alt: "Motion design animation 2", span: "normal" },
  { src: visual1, alt: "3D coral character render", span: "full" },
  { src: visual2, alt: "Coral sculpture photo collection", span: "normal" },
  { src: visual3, alt: "Character design iterations and sketches", span: "normal" },
  { src: visual4, alt: "Mechanical creature sketch", span: "normal" },
  { src: visual5, alt: "Changsha typography editorial design", span: "normal" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const Visual = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [hoverVideo1, setHoverVideo1] = useState(false);
  const [hoverVideo2, setHoverVideo2] = useState(false);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.6);
    }
  }, []);

  useEffect(() => {
    document.title = "Visual Work | Stella P. – 3D, Editorial & Generative Art";
    return () => { document.title = "Stella P. | Product Designer Portfolio"; };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />


      {/* Image & Video Gallery */}
      <section className="px-8 md:px-16 lg:px-24 pb-24 max-w-[1440px] mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-[10px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Two looping videos */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
            onMouseEnter={() => setHoverVideo1(true)}
            onMouseLeave={() => setHoverVideo1(false)}
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
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: hoverVideo1 ? 1 : 0, y: hoverVideo1 ? 0 : -4 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 left-4"
            >
              <Button asChild size="sm" className="bg-background/90 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 backdrop-blur-sm">
                <a href="https://ste11apeng.github.io/accordion-expand-ui/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  try it urself
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.06 }}
            className="relative"
            onMouseEnter={() => setHoverVideo2(true)}
            onMouseLeave={() => setHoverVideo2(false)}
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
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: hoverVideo2 ? 1 : 0, y: hoverVideo2 ? 0 : -4 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 left-4"
            >
              <Button asChild size="sm" className="bg-background/90 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 backdrop-blur-sm">
                <a href="https://ste11apeng.github.io/music-slider-ui/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  try it urself
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </motion.div>
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
                  <Lottie
                    animationData={image.lottie === 1 ? lottieAnimation : lottieAnimation2}
                    loop
                    lottieRef={image.lottie === 1 ? lottieRef : undefined}
                    className="w-full h-full"
                  />
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
