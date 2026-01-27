import { motion, type Easing } from "framer-motion";
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
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          Circle Status System
        </h2>
      </motion.div>

      {/* Smart Outage Lamp */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Smart Outage Lamp
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          Shown here as rendered product visuals, the lamp is the hardware core of Circle Status, providing daily ambient light and serving as the physical trigger for the app's detection and notification flow.
        </p>
        <ImageLightbox
          src={solution1Image}
          alt="Smart Outage Lamp - Product renders showing soft-serrated texture and night light with battery backup"
          className="w-full rounded-lg"
        />
      </motion.div>

      {/* Product Prototype */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Product Prototype
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          Built as a fully interactive Figma prototype, the app extends the lamp's signals into a clear digital flow: turning outage detection into instant notifications, check-ins, and community support.
        </p>
        <ImageLightbox
          src={solution2Image}
          alt="Circle Status App - Smart device status, community map, and easy check-in features"
          className="w-full rounded-lg"
        />
      </motion.div>

      {/* Fully Functional Website */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Fully Functional Website
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          In just two days, I created a fully functional website using Webflow. It served as both a branding hub and an online trade show booth, helping us communicate the product story.
        </p>
        <ImageLightbox
          src={solution3Image}
          alt="Circle Status Website - Connected In The Dark landing page"
          className="w-full rounded-lg"
        />
        <p className="text-sm text-muted-foreground mt-3">
          <a 
            href="https://circlestatus.webflow.io/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Visit the live website →
          </a>
        </p>
      </motion.div>

      {/* Making Waves at IPD Trade Show */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Making Waves at IPD Trade Show
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-4">
          Showcasing Circle Status to 200+ entrepreneurs, investors, and peers
        </p>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          We presented Circle Status at the Ross School of Business IPD Trade Show, where over 200 attendees experienced our concept firsthand. Within three days, we sold the equivalent of 264 units and generated over $1M in trade-show currency, validating both design value proposition and market potential.
        </p>
        <p className="text-base text-foreground/80 leading-relaxed italic mb-6">
          It was a genuine test of market validation, bridging academic exploration with entrepreneurial practice.
        </p>
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
