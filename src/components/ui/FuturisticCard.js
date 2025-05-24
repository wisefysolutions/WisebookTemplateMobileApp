import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useStore } from '../../store/useStore';
import { theme } from '../../theme';

const { width } = Dimensions.get('window');

const FuturisticCard = ({ item, onPress, style }) => {
  const { themeMode } = useStore();
  
  const getContentIcon = () => {
    switch (item.type) {
      case 'video':
        return 'video';
      case 'audio':
        return 'headphones';
      case 'book':
        return 'book';
      case 'course':
        return 'book-open';
      default:
        return 'file-text';
    }
  };
  
  const cardContent = (
    <>
      <View style={styles.mainContainer}>
        {/* Top section with icon and text */}
        <View style={styles.contentTop}>
          <View style={styles.iconContainer}>
            <Feather name={getContentIcon()} size={24} color="#fff" />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            
            <View style={styles.metaContainer}>
              {item.duration && (
                <View style={styles.metaItem}>
                  <Feather name="clock" size={12} color="rgba(255,255,255,0.7)" />
                  <Text style={styles.metaText}>{item.duration}</Text>
                </View>
              )}
              
              {item.level && (
                <View style={styles.metaItem}>
                  <Feather name="bar-chart-2" size={12} color="rgba(255,255,255,0.7)" />
                  <Text style={styles.metaText}>{item.level}</Text>
                </View>
              )}
            </View>
          </View>
          
          {item.xp && (
            <View style={styles.xpContainer}>
              <Text style={styles.xpText}>+{item.xp} XP</Text>
            </View>
          )}
        </View>
        
        {/* Bottom section with progress bar */}
        {item.progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressIndicator,
                  { width: `${item.progress * 100}%` }
                ]}
              />
            </View>
            {item.progress > 0 && (
              <Text style={styles.progressText}>
                {Math.round(item.progress * 100)}%
              </Text>
            )}
          </View>
        )}
      </View>
      
      {/* Visual decorations */}
      <View style={styles.glowEffect} />
      
      <View style={styles.cardDecoration}>
        <View style={styles.decorationLine} />
        <View style={styles.decorationCircle} />
      </View>
    </>
  );
  
  return (
    <MotiView
      style={[styles.container, style]}
      from={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 500,
      }}
    >
      {onPress ? (
        <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)}>
          <LinearGradient
            colors={[theme[themeMode].cardGradientStart, theme[themeMode].cardGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            {cardContent}
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <LinearGradient
          colors={[theme[themeMode].cardGradientStart, theme[themeMode].cardGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          {cardContent}
        </LinearGradient>
      )}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientBackground: {
    borderRadius: 16,
    padding: 16,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 120, // Garantir altura mínima para os cartões
  },
  contentTop: {
    flexDirection: 'row',
    marginBottom: 30, // Espaço aumentado para a barra de progresso
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    paddingBottom: 8, // Espaço adicional abaixo do texto
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
    minHeight: 40, // Garantir altura mínima para a descrição
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 4,
  },
  progressContainer: {
    width: '100%',
    marginTop: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 0,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#fff',
  },
  progressText: {
    fontSize: 10,
    color: '#fff',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  xpContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  xpText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  glowEffect: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -50,
    right: -50,
  },
  cardDecoration: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  decorationLine: {
    width: 30,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 4,
  },
  decorationCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignSelf: 'flex-end',
  },
});

export default FuturisticCard;
