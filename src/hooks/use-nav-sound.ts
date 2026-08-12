import { useCallback, useRef } from "react";
import switchTap from "@/assets/switch-tap.wav.asset.json";
import softClick from "@/assets/soft-click.wav.asset.json";

export type NavSound = "switch" | "click";

const SOURCES: Record<NavSound, string> = {
  switch: switchTap.url,
  click: softClick.url,
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
