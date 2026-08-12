import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  /** Optional poster image shown instantly while the video loads. */
  poster?: string;
  /** Load immediately instead of waiting for the viewport (above-the-fold items). */
  eager?: boolean;
}

/**
 * Shows a lightweight poster frame instantly, then loads and plays the video
 * once it is close to the viewport. Pauses again when scrolled away.
 */
const LazyVideo = ({ src, className, poster, eager = false }: LazyVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          node.play?.().catch(() => {});
        } else {
          node.pause?.();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      poster={poster}
      loop
      muted
      autoPlay={eager}
      playsInline
      preload={eager ? "auto" : "none"}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      className={className}
    />
  );
};

export default LazyVideo;
