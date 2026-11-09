import { Link } from "react-router-dom";

// A plain "back" pinned top-left, for pages that don't have the sidebar
// (and for case studies on phones, where their own pinned nav is hidden).
const BackBar = ({ className = "" }: { className?: string }) => (
  <div className={`sticky top-0 z-40 bg-background/90 backdrop-blur-md ${className}`}>
    <div className="flex h-12 items-center px-6 md:px-8 lg:px-9">
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
        className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
      >
        back
      </Link>
    </div>
  </div>
);

export default BackBar;
