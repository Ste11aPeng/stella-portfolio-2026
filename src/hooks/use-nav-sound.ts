import { useCallback, useRef } from "react";

export type NavSound = "switch" | "click";

// Served from /public so they exist in the production build (GitHub Pages).
const SOURCES: Record<NavSound, string> = {
  switch: "/sounds/switch-tap.mp3",
  click: "/sounds/soft-click.mp3",
};

export const useNavSound = () => {
  const cache = useRef<Partial<Record<NavSound, HTMLAudioElement>>>({});

  return useCallback((sound: NavSound) => {
    try {
      let audio = cache.current[sound];
      if (!audio) {
        audio = new Audio(SOURCES[sound]);
        audio.volume = 0.35;
        cache.current[sound] = audio;
      }
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    } catch {
      // ignore autoplay/decoding errors
    }
  }, []);
};
