import { useSyncExternalStore } from "react";

// Whether a page-level 粲 name card (the one closing the About page) is on
// screen. While it is, the header logo doesn't open its own copy on hover.
let onScreen = false;
const listeners = new Set<() => void>();

export const setNameCardOnScreen = (value: boolean) => {
  if (value === onScreen) return;
  onScreen = value;
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useNameCardOnScreen = () => useSyncExternalStore(subscribe, () => onScreen, () => false);
