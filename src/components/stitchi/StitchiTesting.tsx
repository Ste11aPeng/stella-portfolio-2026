import testingIterationImage from "@/assets/stitchi-testing-iteration.png";

const StitchiTesting = () => {
  return (
    <section id="testing" className="pt-24">
      <h2 
        className="text-2xl font-bold mb-6" 
        style={{ fontFamily: 'Manrope', color: '#161616' }}
      >
        Testing & Iteration
      </h2>
      
      <h3 
        className="text-xl font-semibold mb-4"
        style={{ fontFamily: 'Manrope', color: '#161616' }}
      >
        From Exploration to Alignment
      </h3>
      
      <p 
        className="text-base mb-8 max-w-3xl"
        style={{ fontFamily: 'Manrope', color: '#161616', lineHeight: '1.7' }}
      >
        Explored and tested multiple layouts, interactions, and hierarchies for search and filter. Quick feedback loops with a senior designer and mentor helped resolve conflicts between user needs and system constraints. This iterative process surfaced edge cases early and led to a solution aligned with both.
      </p>
      
      {/* Testing Iteration Image */}
      <div className="mb-8">
        <img 
          src={testingIterationImage} 
          alt="Iteration Archive - Agile sprint with mentor & founder's feedback" 
          className="w-full rounded-lg"
        />
      </div>
    </section>
  );
};

export default StitchiTesting;
