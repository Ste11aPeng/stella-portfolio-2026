import challengeUIImage from "@/assets/stitchi-challenge-ui.png";
import challengeInteractionImage from "@/assets/stitchi-challenge-interaction.png";

const StitchiChallenge = () => {
  return (
    <section id="challenge" className="pt-24">
      <h2 
        className="text-2xl font-bold mb-6" 
        style={{ fontFamily: 'Manrope', color: '#161616' }}
      >
        Challenge
      </h2>
      
      <h3 
        className="text-xl font-semibold mb-4"
        style={{ fontFamily: 'Manrope', color: '#161616' }}
      >
        Why Discovery Was Broken
      </h3>
      
      <p 
        className="text-base mb-8 max-w-3xl"
        style={{ fontFamily: 'Manrope', color: '#161616', lineHeight: '1.7' }}
      >
        Filters became cluttered and unscalable as suppliers grew. As we onboarded more suppliers, filters became cluttered and inconsistent: overlapping categories and vendor-specific labels turned a UI built for 20 options into chaos at 200. The search bar offered little guidance or tolerance, so users had to guess queries and often got zero results even when matches existed.
      </p>
      
      {/* Challenge UI Image */}
      <div className="mb-8">
        <img 
          src={challengeUIImage} 
          alt="Current UI Problem - Filtering logic not scalable as supplier base grows" 
          className="w-full rounded-lg"
        />
      </div>
      
      {/* Challenge Interaction Image */}
      <div className="mb-8">
        <img 
          src={challengeInteractionImage} 
          alt="Current Interaction Problem - Every click triggers a jarring reload, no filter summary" 
          className="w-full rounded-lg"
        />
      </div>
    </section>
  );
};

export default StitchiChallenge;
