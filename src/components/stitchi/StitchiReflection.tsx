import reflectionImage from "@/assets/stitchi-reflection.png";

const StitchiReflection = () => {
  return (
    <section id="reflection" className="pt-24 pb-24">
      <h2 
        className="text-2xl font-bold mb-6" 
        style={{ fontFamily: 'Manrope', color: '#161616' }}
      >
        Reflection
      </h2>
      
      <p 
        className="text-base mb-6 max-w-3xl"
        style={{ fontFamily: 'Manrope', color: '#161616', lineHeight: '1.7' }}
      >
        At first, I thought this project would be a small-scope UI clean-up, polishing the filter panel. But as I dug deeper, it became clear that the interaction pattern itself was misaligned with how our task-driven users worked. That realization led to introducing the Apply button and rethinking the flow. It also reminded me how even small details, when intentional, can carry meaningful UX value.
      </p>
      
      <p 
        className="text-base mb-8 max-w-3xl"
        style={{ fontFamily: 'Manrope', color: '#161616', lineHeight: '1.7' }}
      >
        I thought working with a technical PM and SWE would be hard, that we spoke different languages. But after learning how Algolia and the back-end worked, our conversations flowed more easily. I realized it's better to just ask when I don't know something — people are happy to help when you're engaged.
      </p>
      
      {/* Reflection Image */}
      <div className="mb-8">
        <img 
          src={reflectionImage} 
          alt="Walkthrough video got good feedback - team collaboration" 
          className="w-full rounded-lg"
        />
      </div>
    </section>
  );
};

export default StitchiReflection;
