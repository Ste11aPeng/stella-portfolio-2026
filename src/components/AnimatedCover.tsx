import { lazy, Suspense, type ReactNode } from "react";

// Covers that move. Each is loaded only when a page shows it, and the
// project's still image stands in until it arrives.
const WidgetBento = lazy(() => import("@/components/tiktok/WidgetBento"));
const HighlightsCover = lazy(() => import("@/components/tiktok/HighlightsCover"));
const CircleCover = lazy(() => import("@/components/circle/CircleCover"));
const PhiloCover = lazy(() => import("@/components/philo/PhiloCover"));
const AsksiaCover = lazy(() => import("@/components/asksia/AsksiaCover"));

export type AnimatedCoverKind = "widget-bento" | "highlights-phones" | "circle-float" | "philo-tiles" | "asksia-layouts";

const AnimatedCover = ({
  kind, fallback, interactive = false, delay = 0,
}: { kind: AnimatedCoverKind; fallback: ReactNode; interactive?: boolean; delay?: number }) => (
  <Suspense fallback={fallback}>
    {kind === "widget-bento" && <WidgetBento interactive={interactive} delay={delay} />}
    {kind === "highlights-phones" && <HighlightsCover />}
    {kind === "circle-float" && <CircleCover />}
    {/* `interactive` is only set on the case study's own cover */}
    {kind === "philo-tiles" && <PhiloCover page={interactive} />}
    {kind === "asksia-layouts" && <AsksiaCover />}
  </Suspense>
);

export default AnimatedCover;
