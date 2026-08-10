import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
}

/**
 * Only loads and plays a video once it is close to the viewport,
 * and pauses it again when scrolled away. Keeps the Visual page light.
 */
const LazyVideo = ({ src, className }: LazyVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

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
      { rootMargin: "300px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      loop
      muted
      playsInline
      preload="none"
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      className={className}
    />
  );
};

export default LazyVideo;
