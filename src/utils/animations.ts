/**
 * Standardized Motion Variants & Easing Functions
 * Designed for museum/fine-art luxury aesthetic with high framerate, compositor-only transforms.
 */

// Luxury editorial ease curve (anticipatory entry, gentle settle)
export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;
export const GENTLE_EASE = [0.25, 0.1, 0.25, 1] as const;

// Stagger orchestrations
export const staggerContainer = (staggerTime = 0.1, delay = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
      delayChildren: delay,
    },
  },
});

// Fade Up Variant
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: LUXURY_EASE,
    },
  },
};

// Fade Down Variant (for Top Nav / Announcement)
export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: LUXURY_EASE,
    },
  },
};

// Fade Scale Variant (for Cards / Modals)
export const fadeScale = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: LUXURY_EASE,
    },
  },
};

// Gentle Hover Lift for Cards
export const cardHoverProps = {
  whileHover: {
    y: -6,
    transition: { duration: 0.28, ease: LUXURY_EASE },
  },
  whileTap: {
    scale: 0.99,
    transition: { duration: 0.12 },
  },
};

// Button Click & Hover Feedback
export const buttonInteractionProps = {
  whileHover: {
    scale: 1.02,
    y: -1,
    transition: { duration: 0.2, ease: LUXURY_EASE },
  },
  whileTap: {
    scale: 0.97,
    y: 0,
    transition: { duration: 0.1 },
  },
};
