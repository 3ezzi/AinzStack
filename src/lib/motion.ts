import type { Variants } from 'framer-motion';

/** Shared fade-up entrance animation. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/** Stagger children sequentially (default 0.08s gap). */
export const stagger = (delay = 0): Variants => ({
  visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
});
