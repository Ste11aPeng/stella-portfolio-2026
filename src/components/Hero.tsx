import profileImage from "@/assets/profile.jpg";

const Hero = () => {
  return (
    <section className="px-8 py-16 md:px-16 lg:px-24 md:py-24">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        <div className="w-40 h-52 md:w-48 md:h-60 overflow-hidden flex-shrink-0">
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
