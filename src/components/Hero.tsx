import { motion } from "framer-motion";
import profileImage from "@/assets/profile.png";
const Hero = () => {
  return <section className="px-8 py-16 lg:px-24 md:px-[32px] md:py-[64px]">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        <motion.div className="flex-shrink-0" style={{
        width: '136px',
        height: '136px'
      }} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        ease: [0.0, 0.0, 0.2, 1]
      }}>
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        </motion.div>
        <motion.p className="max-w-md pt-0 font-serif text-sm font-normal" style={{
        color: '#161616',
        fontFamily: 'Manrope',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal'
      }} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        ease: [0.0, 0.0, 0.2, 1],
        delay: 0.1
      }}>
          Stella P. is Product Designer making calm user experiences for messy, real life. Base in Ann Arbor.
        </motion.p>
      </div>
    </section>;
};
export default Hero;