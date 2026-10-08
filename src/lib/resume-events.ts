// Open the résumé overlay from anywhere (nav, footer, 404, …).
export const RESUME_OPEN_EVENT = "resume:open";
export const openResume = () => window.dispatchEvent(new Event(RESUME_OPEN_EVENT));
