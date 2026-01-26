import { motion, type Easing } from "framer-motion";
import { Project } from "@/data/projects";
import Header from "@/components/Header";
import ImageLightbox from "@/components/ImageLightbox";
interface GalleryProjectDetailProps {
  project: Project;
  images: {
    src: string;
    alt: string;
    span?: "full" | "half";
  }[];
}
const easeOut: Easing = [0.0, 0.0, 0.2, 1];
const GalleryProjectDetail = ({
  project,
  images
}: GalleryProjectDetailProps) => {
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section */}
      <section className="pt-8 pb-8 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            {/* Left: Title + Tags */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            ease: easeOut
          }}>
              <h1 className="text-2xl font-bold mb-4 tracking-tight text-foreground">
                {project.title}
              </h1>
              
            </motion.div>
            
            {/* Right: Description */}
            <motion.p className="text-base text-foreground/70 leading-relaxed max-w-md md:text-right" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            ease: easeOut,
            delay: 0.1
          }}>
              {project.overview}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Image Gallery */}
      <section className="px-8 md:px-16 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2.5 w-full items-center justify-center">
            {images.map((image, index) => <motion.div key={index} className={image.span === "full" ? "w-full" : "w-full md:w-[calc(50%-5px)]"} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.5,
            ease: easeOut,
            delay: index * 0.05
          }}>
                <ImageLightbox src={image.src} alt={image.alt} className="w-full h-auto rounded-lg" />
              </motion.div>)}
          </div>
        </div>
      </section>
    </div>;
};
export default GalleryProjectDetail;