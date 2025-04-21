import { Variants } from 'framer-motion';

// Common animation variants for reuse throughout the application

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Fade in from top
export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Fade in from right
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Scale animation
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Container animation for staggered children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Item animation for staggered children
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3
    }
  }
};

// Animation for list items
export const listItem: Variants = {
  hidden: { 
    opacity: 0, 
    x: -10 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.3
    }
  }
};

// Bottle hover animation
export const bottleHover = {
  rest: { 
    scale: 1,
    y: 0,
    rotateZ: 0,
    transition: { 
      duration: 0.3, 
      ease: 'easeOut' 
    }
  },
  hover: { 
    scale: 1.03,
    y: -5,
    rotateZ: 2,
    transition: { 
      duration: 0.3, 
      ease: 'easeOut' 
    }
  },
  tap: { 
    scale: 0.98,
    transition: { 
      duration: 0.1, 
      ease: 'easeOut' 
    }
  }
};

// Typing animation for text
export const typingContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

export const typingCharacter: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1
  }
};

// Progress bar animation
export const progressBar: Variants = {
  hidden: { width: 0 },
  visible: (custom: number) => ({
    width: `${custom}%`,
    transition: { 
      duration: 0.8,
      ease: 'easeOut' 
    }
  })
};

// Glow pulse animation
export const glowPulse = {
  initial: {
    boxShadow: '0 0 0px rgba(217, 119, 6, 0)'
  },
  pulse: {
    boxShadow: [
      '0 0 5px rgba(217, 119, 6, 0.3)',
      '0 0 15px rgba(217, 119, 6, 0.5)',
      '0 0 5px rgba(217, 119, 6, 0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};