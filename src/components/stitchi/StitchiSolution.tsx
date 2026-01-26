import solutionOverviewImage from "@/assets/stitchi-solution-overview.png";
import solutionPt1Image from "@/assets/stitchi-solution-pt1.png";
import solutionPt2Image from "@/assets/stitchi-solution-pt2.png";

const StitchiSolution = () => {
  return (
    <section id="solution" className="pt-24">
      <h2 
        className="text-2xl font-bold mb-6" 
        style={{ fontFamily: 'Manrope', color: '#161616' }}
      >
        Solution
      </h2>
      
      {/* Solution Overview Image */}
      <div className="mb-12">
        <img 
          src={solutionOverviewImage} 
          alt="Solution Overview - Batch apply, smarter search, always know what's active, new brands navigation, refined category experience" 
          className="w-full rounded-lg"
        />
      </div>
      
      {/* Smarter Search Engine Section */}
      <div className="mb-12">
        <img 
          src={solutionPt1Image} 
          alt="Smarter Search Engine - Pick up where you left off, smarter suggestions as you type" 
          className="w-full rounded-lg"
        />
      </div>
      
      {/* Cleaner Filter Section */}
      <div className="mb-8">
        <img 
          src={solutionPt2Image} 
          alt="Cleaner Filter - Before and after comparison showing applied filter tags, structured panel, and batch apply" 
          className="w-full rounded-lg"
        />
      </div>
    </section>
  );
};

export default StitchiSolution;
