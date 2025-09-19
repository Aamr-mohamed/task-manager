/**
 * Animation utilities for the fantasy todo app
 * Provides smooth, magical transitions and effects
 */

import { Animated, Easing } from 'react-native';

export const AnimationUtils = {
  // Scale animation for button presses
  createScaleAnimation: (value: Animated.Value, toValue: number, duration: number = 150) => {
    return Animated.timing(value, {
      toValue,
      duration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    });
  },

  // Fade animation for showing/hiding elements
  createFadeAnimation: (value: Animated.Value, toValue: number, duration: number = 300) => {
    return Animated.timing(value, {
      toValue,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
  },

  // Slide animation for list items
  createSlideAnimation: (value: Animated.Value, toValue: number, duration: number = 400) => {
    return Animated.timing(value, {
      toValue,
      duration,
      easing: Easing.out(Easing.back(1.1)),
      useNativeDriver: true,
    });
  },

  // Spring animation for interactive elements
  createSpringAnimation: (value: Animated.Value, toValue: number) => {
    return Animated.spring(value, {
      toValue,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    });
  },

  // Combined sequence for magical effects
  createMagicalSequence: (
    scaleValue: Animated.Value,
    fadeValue: Animated.Value,
    onComplete?: () => void
  ) => {
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fadeValue, {
          toValue: 0.8,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          tension: 150,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(fadeValue, {
          toValue: 1,
          tension: 150,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
    ]);
  },

  // Stagger animation for list items
  createStaggeredAnimation: (animations: Animated.CompositeAnimation[], staggerDelay: number = 100) => {
    return Animated.stagger(staggerDelay, animations);
  },

  // Completion celebration animation
  createCompletionAnimation: (
    scaleValue: Animated.Value,
    rotationValue: Animated.Value,
    onComplete?: () => void
  ) => {
    return Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 300,
          easing: Easing.out(Easing.back(2)),
          useNativeDriver: true,
        }),
        Animated.timing(rotationValue, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.elastic(2)),
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);
  },
};

export const AnimationPresets = {
  bounceIn: {
    transform: [
      {
        scale: new Animated.Value(0.3),
      },
    ],
    opacity: new Animated.Value(0),
  },
  
  slideInFromRight: {
    transform: [
      {
        translateX: new Animated.Value(300),
      },
    ],
    opacity: new Animated.Value(0),
  },

  slideInFromLeft: {
    transform: [
      {
        translateX: new Animated.Value(-300),
      },
    ],
    opacity: new Animated.Value(0),
  },

  fadeInUp: {
    transform: [
      {
        translateY: new Animated.Value(50),
      },
    ],
    opacity: new Animated.Value(0),
  },
};

// Custom hook for managing multiple animations
export const useAnimationGroup = () => {
  const animations = new Map<string, Animated.Value>();

  const createValue = (key: string, initialValue: number = 0): Animated.Value => {
    if (!animations.has(key)) {
      animations.set(key, new Animated.Value(initialValue));
    }
    return animations.get(key)!;
  };

  const getValue = (key: string): Animated.Value | undefined => {
    return animations.get(key);
  };

  const resetAll = () => {
    animations.forEach((value) => {
      value.setValue(0);
    });
  };

  return {
    createValue,
    getValue,
    resetAll,
  };
};
