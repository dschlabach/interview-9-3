export const DEFAULT_ANIMATION = {
  transition: { type: "spring", bounce: 0.2, duration: 0.3 },
};

export const FADE_IN_ANIMATION = {
  initial: { opacity: 0, scale: 0.99 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.99 },
};
