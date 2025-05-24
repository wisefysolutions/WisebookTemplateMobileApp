import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../../store/useStore';
import { theme } from '../../theme';

const { width } = Dimensions.get('window');

const AnimatedButton = ({ 
  text, 
  icon, 
  onPress, 
  style, 
  textStyle,
  primary = false,
  disabled = false,
  loading = false,
}) => {
  const { themeMode } = useStore();
  
  const buttonColors = primary 
    ? [theme[themeMode].gradientStart, theme[themeMode].gradientEnd]
    : [theme[themeMode].buttonBackground, theme[themeMode].buttonBackground];
  
  const textColor = primary 
    ? '#FFFFFF' 
    : theme[themeMode].text;
  
  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };
  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled || loading}
      style={[styles.container, style]}
    >
      <MotiView
        style={styles.buttonWrapper}
        animate={{
          scale: disabled ? 0.98 : 1,
          opacity: disabled ? 0.7 : 1,
        }}
        transition={{
          type: 'timing',
          duration: 200,
        }}
      >
        <LinearGradient
          colors={buttonColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradient,
            { borderColor: primary ? 'rgba(255,255,255,0.2)' : theme[themeMode].borderColor },
          ]}
        >
          {loading ? (
            <MotiView
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 300 }}
              style={styles.loadingContainer}
            >
              <MotiView
                animate={{ rotate: '360deg' }}
                transition={{ type: 'timing', duration: 1000, loop: true }}
              >
                <Feather name="loader" size={20} color={textColor} />
              </MotiView>
            </MotiView>
          ) : (
            <>
              {icon && (
                <Feather 
                  name={icon} 
                  size={18} 
                  color={textColor} 
                  style={styles.icon} 
                />
              )}
              <Text style={[styles.text, { color: textColor }, textStyle]}>
                {text}
              </Text>
            </>
          )}
          
          {primary && (
            <View style={styles.buttonDecoration}>
              <View style={styles.decorationLine} />
              <View style={styles.decorationDot} />
            </View>
          )}
        </LinearGradient>
      </MotiView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
  },
  buttonWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 20,
  },
  buttonDecoration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  decorationLine: {
    width: 16,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 2,
  },
  decorationDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'flex-end',
  },
});

export default AnimatedButton;
