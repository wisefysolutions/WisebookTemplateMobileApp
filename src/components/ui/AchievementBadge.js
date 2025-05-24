import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';
import { theme } from '../../theme';

const AchievementBadge = ({ achievement, unlocked = false, onPress, style }) => {
  const { themeMode } = useStore();
  
  const renderBadgeContent = () => {
    if (!unlocked) {
      return (
        <View style={styles.lockedContainer}>
          <Feather 
            name="lock" 
            size={24} 
            color={theme[themeMode].textSecondary} 
          />
          <Text style={[styles.lockedText, { color: theme[themeMode].textSecondary }]}>
            Locked
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.unlockedContainer}>
        <View style={styles.iconContainer}>
          <Feather 
            name={achievement.icon || 'award'} 
            size={24} 
            color="#fff" 
          />
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {achievement.title}
        </Text>
        {achievement.xp && (
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+{achievement.xp} XP</Text>
          </View>
        )}
      </View>
    );
  };
  
  const gradientColors = unlocked 
    ? [theme[themeMode].achievementStart, theme[themeMode].achievementEnd]
    : ['rgba(60,60,60,0.6)', 'rgba(30,30,30,0.6)'];
  
  const Wrapper = onPress ? TouchableOpacity : View;
  
  return (
    <Wrapper 
      onPress={unlocked ? onPress : null}
      style={[styles.container, style]}
      activeOpacity={0.8}
    >
      <MotiView
        style={styles.badgeContainer}
        from={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'timing',
          duration: 400,
        }}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {renderBadgeContent()}
          
          {/* Hexagonal decoration */}
          <View style={styles.hexDecoration} />
        </LinearGradient>
        
        {unlocked && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ type: 'timing', duration: 1000, loop: true }}
            style={[styles.glow, { backgroundColor: theme[themeMode].accentGlow }]}
          />
        )}
      </MotiView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 140,
  },
  badgeContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  lockedText: {
    marginTop: 8,
    fontSize: 14,
  },
  unlockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  xpBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 8,
  },
  xpText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  hexDecoration: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    transform: [{ rotate: '45deg' }],
    bottom: -20,
    right: -20,
  },
  glow: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.5,
    zIndex: -1,
  },
});

export default AchievementBadge;
