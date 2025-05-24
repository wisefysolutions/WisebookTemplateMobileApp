import React from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useStore } from '../../store/useStore';
import { theme } from '../../theme';

const { width, height } = Dimensions.get('window');

const HudContainer = ({ children, loading = false, style }) => {
  const { themeMode } = useStore();
  
  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { backgroundColor: theme[themeMode].background },
        style
      ]} 
      edges={['right', 'left']}
    >
      {/* HUD Border/Frame Effect */}
      <View style={styles.borderFrame}>
        <View style={[styles.cornerTL, { borderColor: theme[themeMode].hudBorder }]} />
        <View style={[styles.cornerTR, { borderColor: theme[themeMode].hudBorder }]} />
        <View style={[styles.cornerBL, { borderColor: theme[themeMode].hudBorder }]} />
        <View style={[styles.cornerBR, { borderColor: theme[themeMode].hudBorder }]} />
      </View>
      
      {/* Left Edge Accent */}
      <LinearGradient
        colors={[theme[themeMode].accentGlow, 'transparent']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.leftEdgeAccent}
      />
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
      
      {/* Loading overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={[styles.loadingContainer, { backgroundColor: theme[themeMode].cardBackground }]}>
            <ActivityIndicator size="large" color={theme[themeMode].accent} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  borderFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  cornerTL: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 4,
  },
  cornerTR: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 4,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: 4,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 4,
  },
  leftEdgeAccent: {
    position: 'absolute',
    top: height * 0.3,
    left: 0,
    width: 3,
    height: 80,
    zIndex: 0,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  loadingContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HudContainer;
