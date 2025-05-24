import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { MotiView } from 'moti';
import FuturisticCard from './ui/FuturisticCard';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const ContentList = ({ 
  data = [], 
  horizontal = true, 
  showProgress = false,
  onItemPress, 
  style,
  emptyMessage = "No content available" 
}) => {
  const { themeMode } = useStore();
  
  const renderItem = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, translateX: horizontal ? 20 : 0, translateY: horizontal ? 0 : 20 }}
      animate={{ opacity: 1, translateX: 0, translateY: 0 }}
      transition={{ delay: index * 100, type: 'timing', duration: 500 }}
      style={[
        styles.itemContainer,
        horizontal ? styles.horizontalItem : styles.verticalItem
      ]}
    >
      <FuturisticCard
        item={showProgress ? { ...item, progress: item.progress || 0 } : item}
        onPress={() => onItemPress && onItemPress(item)}
      />
    </MotiView>
  );
  
  if (!data || data.length === 0) {
    return (
      <View style={[styles.emptyContainer, style]}>
        <Text style={[styles.emptyText, { color: theme[themeMode].textSecondary }]}>
          {emptyMessage}
        </Text>
      </View>
    );
  }
  
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        horizontal ? styles.horizontalList : styles.verticalList,
        style
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontalList: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
  },
  verticalList: {
    paddingVertical: 8,
  },
  itemContainer: {
    marginBottom: 16,
  },
  horizontalItem: {
    width: width * 0.7,
    maxWidth: 300,
    marginRight: 16,
  },
  verticalItem: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default ContentList;
