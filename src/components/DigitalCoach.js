import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

// Typing animation effect
const TypingText = ({ text, delay = 1000, typingSpeed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  useEffect(() => {
    if (!startTyping) return;
    
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, startTyping, text, typingSpeed]);
  
  return <Text style={styles.coachText}>{displayedText}</Text>;
};

const DigitalCoach = ({ 
  message, 
  actions,
  avatarColor,
  onDismiss,
  dismissable = true,
  style
}) => {
  const { themeMode } = useStore();
  const [dismissed, setDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  
  if (dismissed) return null;
  
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
    setDismissed(true);
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const bgColor = avatarColor || theme[themeMode].coachBackground;
  
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 800 }}
      style={[styles.container, style]}
    >
      <LinearGradient
        colors={[theme[themeMode].coachGradientStart, theme[themeMode].coachGradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <TouchableOpacity 
          style={styles.expandButton}
          onPress={toggleExpand}
        >
          <Feather 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#fff" 
          />
        </TouchableOpacity>
        
        {dismissable && (
          <TouchableOpacity 
            style={styles.dismissButton}
            onPress={handleDismiss}
          >
            <Feather name="x" size={16} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        )}
        
        <View style={styles.header}>
          <View style={[styles.avatarContainer, { backgroundColor: bgColor }]}>
            <Feather name="cpu" size={20} color="#fff" />
            
            {/* Animated pulse effect */}
            <MotiView
              from={{ opacity: 0.4, scale: 1 }}
              animate={{ opacity: 0, scale: 1.8 }}
              transition={{
                type: 'timing',
                duration: 2000,
                loop: true,
              }}
              style={[styles.avatarPulse, { backgroundColor: bgColor }]}
            />
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>WISEAI</Text>
            <Text style={styles.subtitle}>Digital Coach</Text>
          </View>
        </View>
        
        {isExpanded && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ type: 'timing', duration: 300 }}
            style={styles.messageContainer}
          >
            <TypingText text={message} />
            
            {actions && actions.length > 0 && (
              <View style={styles.actionsContainer}>
                {actions.map((action, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.actionButton}
                    onPress={action.onPress}
                  >
                    <Text style={styles.actionText}>{action.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </MotiView>
        )}
        
        {/* HUD decorations */}
        <View style={styles.hudDecoration}>
          <View style={styles.decorationLine} />
          <View style={styles.decorationDot} />
        </View>
      </LinearGradient>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: -1,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  messageContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  coachText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
  },
  dismissButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  expandButton: {
    position: 'absolute',
    top: 10,
    right: 40,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  hudDecoration: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  decorationLine: {
    width: 20,
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

export default DigitalCoach;
