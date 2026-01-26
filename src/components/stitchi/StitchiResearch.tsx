import researchPt1Image from "@/assets/stitchi-research-pt1.png";
import researchPt2Image from "@/assets/stitchi-research-pt2.png";

const StitchiResearch = () => {
  return (
    <section id="research" className="pt-24">
      <h2 
        className="text-2xl font-bold mb-6" 
        style={{ fontFamily: 'Manrope', color: '#161616' }}
      >
        Research
      </h2>
      
      <h3 
        className="text-xl font-semibold mb-4"
        style={{ fontFamily: 'Manrope', color: '#161616' }}
      >
        Backing Decisions with Real Signals
      </h3>
      
      <h4 
        className="text-lg font-medium mb-4"
        style={{ fontFamily: 'Manrope', color: '#161616' }}
      >
        What I Did
      </h4>
      
      <p 
        className="text-base mb-8 max-w-3xl"
        style={{ fontFamily: 'Manrope', color: '#161616', lineHeight: '1.7' }}
      >
        To ground the design in real behavior, I combined three research methods:
      </p>
      
      <ul 
        className="list-disc list-inside mb-8 max-w-3xl space-y-2"
        style={{ fontFamily: 'Manrope', color: '#161616', lineHeight: '1.7' }}
      >
        <li><strong>Benchmarking:</strong> Studied platforms like Redbubble, Amazon, Threadless to understand scalable filtering patterns.</li>
        <li><strong>Technical exploration:</strong> Worked with our dev intern to assess Algolia's capabilities for smarter, more forgiving search.</li>
        <li><strong>Usability testing:</strong> Observed 3 B2B users in task-based scenarios to uncover interaction pain points.</li>
      </ul>
      
      {/* Research Part 1 Image */}
      <div className="mb-8">
        <img 
          src={researchPt1Image} 
          alt="Usability Test - User feedback about filtering difficulties" 
          className="w-full rounded-lg"
        />
      </div>
      
      {/* Research Part 2 Image */}
      <div className="mb-8">
        <img 
          src={researchPt2Image} 
          alt="What I Found - Key insights from research" 
          className="w-full rounded-lg"
        />
      </div>
    </section>
  );
};

export default StitchiResearch;
