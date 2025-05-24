import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { useStore } from '../../store/useStore';
import { theme } from '../../theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressIndicator = ({ 
  progress = 0, 
  size = 100, 
  thickness = 10, 
  color, 
  backgroundColor, 
  glowColor,
  duration = 800,
  showBackground = true
}) => {
  const { themeMode } = useStore();
  const animatedProgress = useSharedValue(0);
  
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [progress, duration]);
  
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - animatedProgress.value);
    return {
      strokeDashoffset,
    };
  });
  
  const gradientId = `progress-gradient-${size}`;
  const bgColor = backgroundColor || theme[themeMode].backgroundLight;
  const progressColor = color || theme[themeMode].accent;
  const glow = glowColor || theme[themeMode].accentGlow;
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={progressColor} />
            <Stop offset="100%" stopColor={glow} />
          </LinearGradient>
        </Defs>
        
        {showBackground && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={bgColor}
            strokeWidth={thickness}
            fill="transparent"
          />
        )}
        
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          fill="transparent"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgressIndicator;
