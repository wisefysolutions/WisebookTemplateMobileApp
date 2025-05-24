import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import AchievementBadge from './ui/AchievementBadge';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const AchievementList = ({ 
  achievements = [], 
  onAchievementPress,
  style
}) => {
  const { themeMode } = useStore();
  
  if (!achievements || achievements.length === 0) {
    return (
      <View style={[styles.emptyContainer, style]}>
        <Feather name="award" size={40} color={theme[themeMode].textSecondary} />
        <Text style={[styles.emptyText, { color: theme[themeMode].textSecondary }]}>
          No achievements unlocked yet
        </Text>
      </View>
    );
  }
  
  // Group achievements by category if they have one
  const hasCategories = achievements.some(a => a.category);
  
  if (!hasCategories) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContainer, style]}
      >
        {achievements.map((achievement, index) => (
          <MotiView
            key={achievement.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 100, type: 'timing', duration: 400 }}
            style={styles.badgeContainer}
          >
            <AchievementBadge
              achievement={achievement}
              unlocked={achievement.unlocked}
              onPress={() => onAchievementPress && onAchievementPress(achievement)}
            />
          </MotiView>
        ))}
      </ScrollView>
    );
  }
  
  // Group achievements by category
  const categories = {};
  achievements.forEach(achievement => {
    const category = achievement.category || 'Other';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(achievement);
  });
  
  return (
    <View style={style}>
      {Object.keys(categories).map((category, categoryIndex) => (
        <View key={category} style={styles.categoryContainer}>
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: categoryIndex * 200, type: 'timing', duration: 400 }}
          >
            <Text style={[styles.categoryTitle, { color: theme[themeMode].text }]}>
              {category}
            </Text>
          </MotiView>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {categories[category].map((achievement, index) => (
              <MotiView
                key={achievement.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: (categoryIndex * 100) + (index * 50), type: 'timing', duration: 400 }}
                style={styles.badgeContainer}
              >
                <AchievementBadge
                  achievement={achievement}
                  unlocked={achievement.unlocked}
                  onPress={() => onAchievementPress && onAchievementPress(achievement)}
                />
              </MotiView>
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  badgeContainer: {
    marginRight: 16,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 20,
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

export default AchievementList;
