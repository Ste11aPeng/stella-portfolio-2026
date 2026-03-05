import { motion, type Easing } from "framer-motion";
import { Project } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";
import NextProject from "@/components/NextProject";
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
            <div className="overflow-hidden">
              <motion.div initial={{
                y: "100%",
                rotateX: 40
              }} animate={{
                y: 0,
                rotateX: 0
              }} transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}>
                <h1 className="text-2xl mb-4 tracking-tight text-foreground" style={{ fontFamily: "'New Spirit', serif", fontWeight: 400 }}>
                  {project.title}
                </h1>
              </motion.div>
            </div>
            
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
                <ImageLightbox src={image.src} alt={image.alt} className="w-full h-auto" />
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <NextProject currentProjectId={project.id} />
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default GalleryProjectDetail;