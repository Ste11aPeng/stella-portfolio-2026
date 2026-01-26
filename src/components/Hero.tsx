import profileImage from "@/assets/profile.png";

const Hero = () => {
  return (
    <section className="px-8 py-16 md:px-16 lg:px-24 md:py-24">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        <div className="flex-shrink-0" style={{ width: '194px', height: '194px' }}>
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-foreground text-lg md:text-xl leading-relaxed max-w-md pt-4">
          Stella P. is Product Designer making calm user experiences for messy, real life. Base in Ann Arbor.
        </p>
      </div>
    </section>
  );
};

export default Hero;
