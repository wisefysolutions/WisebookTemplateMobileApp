import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';
import { useStore } from '../../store/useStore';
import { theme } from '../../theme';

const GlowingText = ({ children, style, glowColor, glowSize = 15, glowOpacity = 0.4, ...props }) => {
  const { themeMode } = useStore();
  
  const textColor = style?.color || theme[themeMode].text;
  const glow = glowColor || theme[themeMode].textGlow;
  
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: glowOpacity / 2 }}
        animate={{ opacity: glowOpacity }}
        transition={{
          type: 'timing',
          duration: 1800,
          loop: true,
        }}
        style={[
          styles.glow,
          {
            backgroundColor: glow,
            width: glowSize * 5,
            height: glowSize * 2,
            borderRadius: glowSize,
          }
        ]}
      />
      <Text style={[styles.text, { color: textColor }, style]} {...props}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.4,
    zIndex: -1,
    transform: [{ translateX: -10 }, { translateY: -5 }],
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GlowingText;
