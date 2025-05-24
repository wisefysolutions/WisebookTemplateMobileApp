import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const RecommendationPanel = ({ recommendations = [], onItemPress, style }) => {
  const { themeMode } = useStore();
  
  if (!recommendations || recommendations.length === 0) {
    return (
      <View style={[styles.emptyContainer, style, { backgroundColor: theme[themeMode].cardBackground }]}>
        <Feather name="zap" size={30} color={theme[themeMode].textSecondary} />
        <Text style={[styles.emptyText, { color: theme[themeMode].textSecondary }]}>
          No recommendations available yet
        </Text>
      </View>
    );
  }
  
  const renderRecommendationItem = (item, index) => {
    const IconComponent = (
      <View style={styles.iconContainer}>
        <Feather 
          name={
            item.type === 'video' ? 'video' :
            item.type === 'audio' ? 'headphones' :
            item.type === 'book' ? 'book' :
            item.type === 'course' ? 'book-open' :
            item.type === 'path' ? 'map' : 'file-text'
          } 
          size={20} 
          color="#fff" 
        />
      </View>
    );
    
    const ReasonBadge = item.reason && (
      <View style={styles.reasonBadge}>
        <Feather 
          name={
            item.reason === 'popular' ? 'trending-up' :
            item.reason === 'new' ? 'star' :
            item.reason === 'personalized' ? 'user' : 'zap'
          } 
          size={12} 
          color="#fff" 
        />
        <Text style={styles.reasonText}>
          {item.reason === 'popular' ? 'Popular' :
           item.reason === 'new' ? 'New' :
           item.reason === 'personalized' ? 'For You' : 'Recommended'}
        </Text>
      </View>
    );
    
    return (
      <MotiView
        key={item.id}
        from={{ opacity: 0, translateX: 20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ delay: index * 100, type: 'timing', duration: 500 }}
        style={styles.itemContainer}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onItemPress && onItemPress(item)}
          style={styles.touchable}
        >
          <LinearGradient
            colors={[theme[themeMode].cardGradientStart, theme[themeMode].cardGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBg}
          >
            <View style={styles.contentContainer}>
              {IconComponent}
              
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
              
              {ReasonBadge}
            </View>
            
            <View style={styles.decorationContainer}>
              <View style={styles.decorationLine} />
              <View style={styles.decorationDot} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>
    );
  };
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {recommendations.map(renderRecommendationItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemContainer: {
    width: width * 0.8,
    maxWidth: 320,
    marginRight: 16,
  },
  touchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientBg: {
    borderRadius: 16,
    padding: 16,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginLeft: 4,
  },
  reasonBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  reasonText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  decorationContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  decorationLine: {
    width: 24,
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
  emptyContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default RecommendationPanel;
