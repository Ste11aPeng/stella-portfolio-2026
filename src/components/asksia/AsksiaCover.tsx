import { useState } from "react";
import solutionBg from "@/assets/sia-solution-bg.png";

// The AskSia cover: the layout-modes loop from the case study's Solution
// (Chat Focus, then the file list, then reading beside the chat, and back),
// played on the same soft blue ground, in its "cover" mode with no thumbnail
// or pause button. It fades in once the embed has loaded, and never takes the
// pointer, so the card or cover around it still behaves as one link.
const AsksiaCover = () => {
  const [ready, setReady] = useState(false);
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#EEF1F8]">
      <img src={solutionBg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <iframe
        src="/asksia/layout-modes.html?cover"
        title="AskSia's layout changing from chat, to chat with the file list, to reading beside the chat"
        loading="lazy"
        tabIndex={-1}
        onLoad={() => setReady(true)}
        className="absolute inset-0 h-full w-full border-0 pointer-events-none"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.6s ease-out" }}
      />
    </div>
  );
};

export default AsksiaCover;
