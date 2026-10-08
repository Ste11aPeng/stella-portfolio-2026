import { useCallback } from "react";

export type NavSound = "switch" | "click";

// Served from /public so they exist in the production build (GitHub Pages).
const SOURCES: Record<NavSound, string> = {
  switch: "/sounds/bencho-buzz.wav",
  click: "/sounds/bencho-sigh.wav",
};

// Shared across every Header/Hero instance. Each page mounts its own Header,
// so a per-component cache would reload the file on every navigation.
const cache: Partial<Record<NavSound, HTMLAudioElement>> = {};

const getAudio = (sound: NavSound) => {
  let audio = cache[sound];
  if (!audio) {
    audio = new Audio(SOURCES[sound]);
    audio.preload = "auto";
    audio.volume = 0.85;
    cache[sound] = audio;
  }
  return audio;
};

// Warm both sounds up front so the first click isn't silent while loading.
if (typeof window !== "undefined") {
  (Object.keys(SOURCES) as NavSound[]).forEach((s) => getAudio(s).load());
}

export const useNavSound = () =>
  useCallback((sound: NavSound) => {
    try {
      const audio = getAudio(sound);
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    } catch {
      // ignore autoplay/decoding errors
    }
  }, []);
