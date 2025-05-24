import { Easing } from 'react-native-reanimated';

// Common animation presets for reuse throughout the app

// Basic transitions
export const fadeIn = {
  from: { opacity: 0 },
  animate: { opacity: 1 },
};

export const fadeOut = {
  from: { opacity: 1 },
  animate: { opacity: 0 },
};

export const scaleIn = {
  from: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

export const scaleOut = {
  from: { scale: 1, opacity: 1 },
  animate: { scale: 0.8, opacity: 0 },
};

// Slide transitions
export const slideInRight = {
  from: { translateX: 100, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
};

export const slideOutRight = {
  from: { translateX: 0, opacity: 1 },
  animate: { translateX: 100, opacity: 0 },
};

export const slideInLeft = {
  from: { translateX: -100, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
};

export const slideOutLeft = {
  from: { translateX: 0, opacity: 1 },
  animate: { translateX: -100, opacity: 0 },
};

export const slideInUp = {
  from: { translateY: 100, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
};

export const slideOutUp = {
  from: { translateY: 0, opacity: 1 },
  animate: { translateY: -100, opacity: 0 },
};

export const slideInDown = {
  from: { translateY: -100, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
};

export const slideOutDown = {
  from: { translateY: 0, opacity: 1 },
  animate: { translateY: 100, opacity: 0 },
};

// Timing presets
export const timing = {
  type: 'timing',
  duration: 400,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

export const fastTiming = {
  type: 'timing',
  duration: 200,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

export const slowTiming = {
  type: 'timing',
  duration: 800,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

export const springTiming = {
  type: 'spring',
  damping: 10,
  stiffness: 100,
};

// Loop animations
export const pulseAnimation = {
  from: { opacity: 0.6, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    type: 'timing',
    duration: 1000,
    easing: Easing.inOut(Easing.ease),
    loop: true,
  },
};

export const breatheAnimation = {
  from: { scale: 0.97 },
  animate: { scale: 1 },
  transition: {
    type: 'timing',
    duration: 2000,
    easing: Easing.inOut(Easing.ease),
    loop: true,
  },
};

export const blinkAnimation = {
  from: { opacity: 0.3 },
  animate: { opacity: 1 },
  transition: {
    type: 'timing',
    duration: 1000,
    easing: Easing.inOut(Easing.ease),
    loop: true,
  },
};

export const rotateAnimation = {
  from: { rotate: '0deg' },
  animate: { rotate: '360deg' },
  transition: {
    type: 'timing',
    duration: 2000,
    easing: Easing.linear,
    loop: true,
  },
};

// Staggered animations for lists
export const staggeredFadeIn = (index, baseDelay = 50) => ({
  from: { opacity: 0, translateY: 10 },
  animate: { opacity: 1, translateY: 0 },
  transition: {
    type: 'timing',
    duration: 400,
    delay: index * baseDelay,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
});

// Utility to create a combined animation
export const combineAnimations = (animations) => {
  const from = {};
  const animate = {};
  
  animations.forEach(anim => {
    Object.assign(from, anim.from);
    Object.assign(animate, anim.animate);
  });
  
  return { from, animate };
};

// HUD sci-fi interface animations
export const scanlineAnimation = {
  from: { translateY: -300 },
  animate: { translateY: 800 },
  transition: {
    type: 'timing',
    duration: 1500,
    easing: Easing.linear,
    loop: true,
  },
};

export const glowPulseAnimation = {
  from: { opacity: 0.3 },
  animate: { opacity: 0.8 },
  transition: {
    type: 'timing',
    duration: 1800,
    easing: Easing.inOut(Easing.ease),
    loop: true,
  },
};

export const hologramFlickerAnimation = {
  from: { opacity: 0.7 },
  animate: { opacity: 1 },
  transition: {
    type: 'timing',
    duration: 100,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    loop: true,
    repeatReverse: true,
  },
};
