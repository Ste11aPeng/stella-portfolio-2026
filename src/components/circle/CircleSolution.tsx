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
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Circle Status: A Lamp That Speaks When You Can't
        </h2>
        <p className="text-base text-foreground/70 leading-relaxed mb-8">
          An integrated hardware-software ecosystem that transforms power outages from isolating events into opportunities for community connection.
        </p>
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
          Hardware Core: The Smart Outage Lamp
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          The lamp serves dual purposes: <span className="font-medium text-foreground">daily ambient lighting</span> and <span className="font-medium text-foreground">physical trigger</span> for the app's detection and notification flow. Its soft-serrated texture and battery backup ensure it remains functional and approachable even when everything else goes dark.
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
          Digital Experience: Turning Signals Into Support
        </h3>
        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          The companion app extends the lamp's signals into a <span className="font-medium text-foreground">clear digital flow</span>—transforming outage detection into instant notifications, easy check-ins, and meaningful community support when it matters most.
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
          In just two days, I designed and launched a fully functional website using Webflow. It served as both a <span className="font-medium text-foreground">branding hub</span> and an <span className="font-medium text-foreground">online trade show booth</span>, helping us communicate the product story to investors and peers.
        </p>
        <ImageLightbox
          src={solution3Image}
          alt="Circle Status Website - Connected In The Dark landing page"
          className="w-full rounded-lg mb-4"
        />
        <Button 
          asChild 
          variant="outline" 
          className="group hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <a 
            href="https://circlestatus.webflow.io/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            Visit Live Website
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </Button>
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
          We showcased Circle Status at the <span className="font-medium text-foreground">Ross School of Business IPD Trade Show</span>, where over 200 attendees experienced our concept firsthand.
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
