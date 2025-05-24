import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const PathList = ({ paths = [], onPathPress, style }) => {
  const { themeMode } = useStore();
  
  const renderPathItem = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100, type: 'timing', duration: 400 }}
      style={styles.pathItemContainer}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPathPress && onPathPress(item)}
        style={styles.pathTouchable}
      >
        <LinearGradient
          colors={[theme[themeMode].cardGradientStart, theme[themeMode].cardGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.pathGradient}
        >
          <View style={styles.pathHeader}>
            <View style={styles.pathIconContainer}>
              <Feather 
                name={item.icon || "map"} 
                size={24} 
                color="#fff" 
              />
            </View>
            <View style={styles.pathTitleContainer}>
              <Text style={styles.pathTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.pathSubtitle} numberOfLines={1}>
                {item.level} • {item.duration}
              </Text>
            </View>
          </View>
          
          <View style={styles.pathDetails}>
            <Text style={styles.pathDescription} numberOfLines={2}>
              {item.description}
            </Text>
            
            <View style={styles.pathStatsContainer}>
              {item.totalCheckpoints && (
                <View style={styles.pathStat}>
                  <Feather name="flag" size={14} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.pathStatText}>
                    {item.totalCheckpoints} checkpoints
                  </Text>
                </View>
              )}
              
              {item.totalXP && (
                <View style={styles.pathStat}>
                  <Feather name="award" size={14} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.pathStatText}>
                    {item.totalXP} XP
                  </Text>
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.pathFooter}>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => onPathPress && onPathPress(item)}
            >
              <Text style={styles.exploreButtonText}>Explore Path</Text>
              <Feather name="arrow-right" size={14} color="#fff" />
            </TouchableOpacity>
            
            {item.popular && (
              <View style={styles.popularBadge}>
                <Feather name="trending-up" size={12} color="#fff" />
                <Text style={styles.popularText}>Popular</Text>
              </View>
            )}
            
            {item.new && (
              <View style={styles.newBadge}>
                <Text style={styles.newText}>NEW</Text>
              </View>
            )}
          </View>
          
          {/* HUD decorations */}
          <View style={styles.pathDecoration}>
            <View style={styles.decorationLine} />
            <View style={styles.decorationCircle} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </MotiView>
  );
  
  if (!paths || paths.length === 0) {
    return (
      <View style={[styles.emptyContainer, style]}>
        <Feather name="compass" size={40} color={theme[themeMode].textSecondary} />
        <Text style={[styles.emptyText, { color: theme[themeMode].textSecondary }]}>
          No learning paths available
        </Text>
      </View>
    );
  }
  
  return (
    <FlatList
      data={paths}
      renderItem={renderPathItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={[styles.listContainer, style]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  pathItemContainer: {
    marginBottom: 20,
  },
  pathTouchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  pathGradient: {
    borderRadius: 16,
    padding: 16,
  },
  pathHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  pathIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pathTitleContainer: {
    flex: 1,
  },
  pathTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  pathSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  pathDetails: {
    marginBottom: 16,
  },
  pathDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  pathStatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pathStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  pathStatText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 6,
  },
  pathFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: '#fff',
    marginRight: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  popularText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  newBadge: {
    backgroundColor: 'rgba(33, 150, 243, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  newText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pathDecoration: {
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PathList;
