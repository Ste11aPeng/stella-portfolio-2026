import { motion, type Easing } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import solution1Image from "@/assets/circle-solution-1.png";
import solution2Image from "@/assets/circle-solution-2.png";
import solution3Image from "@/assets/circle-solution-3.png";
import impactImage from "@/assets/circle-solution-impact.png";

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const CircleSolution = () => {
  return (
    <section id="solution" className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <span className="text-sm text-muted-foreground block mb-2">
          solution
        </span>
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          Circle Status: A Lamp That Speaks When You Can't
        </h2>
      </motion.div>

      {/* Smart Outage Lamp */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Hardware - Smart Night Lamp
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          A soft-textured lamp with battery backup that works as daily lighting and triggers the app's detection flow when power fails.
        </p>
        <ImageLightbox
          src={solution1Image}
          alt="Smart Outage Lamp - Product renders showing soft-serrated texture and night light with battery backup"
          className="w-full rounded-lg"
        />
      </motion.div>

      {/* Product Prototype */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Digital Product - Support
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          The companion app converts outage detection into instant notifications, easy check-ins, and community support.
        </p>
        <ImageLightbox
          src={solution2Image}
          alt="Circle Status App - Smart device status, community map, and easy check-in features"
          className="w-full rounded-lg"
        />
      </motion.div>

      {/* Fully Functional Website */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Brand Presence: Built in 48 Hours
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">
          Designed and launched a Webflow site in two days as a branding hub and online trade show booth.
        </p>
        <div className="relative">
          <ImageLightbox
            src={solution3Image}
            alt="Circle Status Website - Connected In The Dark landing page"
            className="w-full rounded-lg"
          />
          <Button 
            asChild 
            size="sm"
            className="absolute top-4 left-4 bg-background/90 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 backdrop-blur-sm"
          >
            <a 
              href="https://circlestatus.webflow.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Visit Live Website
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Making Waves at IPD Trade Show */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Market Validation: $1M+ in Trade Show Currency
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">
          Showcased at the Ross School of Business IPD Trade Show with 200+ attendees.
        </p>
        <div className="bg-muted/30 rounded-lg p-5 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">264</p>
              <p className="text-sm text-muted-foreground">Units Sold</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$1M+</p>
              <p className="text-sm text-muted-foreground">Trade Currency</p>
            </div>
          </div>
        </div>
        <ImageLightbox
          src={impactImage}
          alt="IPD Trade Show - Team presenting Circle Status to attendees"
          className="w-full rounded-lg"
        />
      </motion.div>
    </section>
  );
};

export default CircleSolution;
