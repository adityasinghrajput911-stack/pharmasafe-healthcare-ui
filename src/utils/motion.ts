import type { Variants } from 'framer-motion';

/**
 * Global Motion Configuration for PharmaSafe
 * Simple, Snappy, Professional Medical Transitions (ease-out, 150ms-200ms)
 * Flat, reliable, enterprise healthcare UI motion
 */

export const zajnoEase = [0.16, 1, 0.3, 1] as const;
export const standardEaseOut = zajnoEase;

export const pageHeaderMotion = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.18, ease: standardEaseOut }
};

export const pageToggleMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.15, ease: standardEaseOut }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.04
    }
  }
};

export const upwardDriftCard = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: standardEaseOut
    }
  }
};

export const editorialRevealContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  }
};

export const editorialItem = {
  hidden: { opacity: 0, y: 4 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: standardEaseOut
    }
  }
};

// Tactile Spring Tap Physics (Satisfying real-world physical feedback)
export const tactileTapPhysics = {
  scale: 0.97,
  transition: { type: 'spring' as const, stiffness: 400, damping: 25 }
};

// Subtle button squish for smaller chips and icons
export const chipTapPhysics = {
  scale: 0.96,
  transition: { type: 'spring' as const, stiffness: 450, damping: 25 }
};

// Fluid progressive disclosure height animation (250ms ease-out)
export const fluidHeightVariants: Variants = {
  initial: { 
    opacity: 0, 
    height: 0,
    overflow: 'hidden'
  },
  animate: { 
    opacity: 1, 
    height: 'auto',
    transition: {
      height: { duration: 0.25, ease: standardEaseOut },
      opacity: { duration: 0.2, ease: standardEaseOut, delay: 0.04 }
    },
    transitionEnd: {
      overflow: 'visible'
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    overflow: 'hidden',
    transition: {
      height: { duration: 0.22, ease: standardEaseOut },
      opacity: { duration: 0.15, ease: standardEaseOut }
    }
  }
};

