import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import HudContainer from '../components/ui/HudContainer';
import FuturisticCard from '../components/ui/FuturisticCard';
import GlowingText from '../components/ui/GlowingText';
import { fetchLibraryContent } from '../services/api';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

const TABS = ['All', 'Courses', 'eBooks', 'Videos', 'Audio'];

const LibraryScreen = () => {
  const navigation = useNavigation();
  const { themeMode } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const libraryContent = await fetchLibraryContent();
        setContent(libraryContent);
        setFilteredContent(libraryContent);
      } catch (error) {
        console.error('Error loading library content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    filterContent();
  }, [searchQuery, activeTab, content]);

  const filterContent = () => {
    let filtered = [...content];
    
    // Filter by tab
    if (activeTab !== 'All') {
      filtered = filtered.filter(item => item.type === activeTab.toLowerCase());
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredContent(filtered);
  };

  const renderContentItem = ({ item, index }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100, type: 'timing', duration: 400 }}
      style={styles.itemContainer}
    >
      <TouchableOpacity 
        onPress={() => navigation.navigate('ContentDetail', { item })}
        activeOpacity={0.7}
      >
        <FuturisticCard item={item} />
      </TouchableOpacity>
    </MotiView>
  );

  const renderTabItem = (tab) => (
    <TouchableOpacity 
      key={tab}
      onPress={() => setActiveTab(tab)}
      style={[
        styles.tabItem, 
        activeTab === tab && {
          backgroundColor: theme[themeMode].accent,
          borderColor: theme[themeMode].accentLight,
        }
      ]}
    >
      <Text 
        style={[
          styles.tabText,
          { color: activeTab === tab ? theme[themeMode].textInvert : theme[themeMode].text }
        ]}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  );

  return (
    <HudContainer loading={loading}>
      <View style={styles.container}>
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.header}
        >
          <GlowingText style={styles.title}>Knowledge Library</GlowingText>
          <View style={[styles.searchContainer, { backgroundColor: theme[themeMode].cardBackground }]}>
            <Feather name="search" size={20} color={theme[themeMode].textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: theme[themeMode].text }]}
              placeholder="Search for content..."
              placeholderTextColor={theme[themeMode].textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Feather name="x" size={20} color={theme[themeMode].textSecondary} />
              </TouchableOpacity>
            ) : null}
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 200, type: 'timing', duration: 500 }}
        >
          <FlatList
            horizontal
            data={TABS}
            renderItem={({ item }) => renderTabItem(item)}
            keyExtractor={item => item}
            contentContainerStyle={styles.tabsContainer}
            showsHorizontalScrollIndicator={false}
          />
        </MotiView>

        <FlatList
          data={filteredContent}
          renderItem={renderContentItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.contentList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather 
                name="book" 
                size={50} 
                color={theme[themeMode].textSecondary} 
              />
              <Text style={[styles.emptyText, { color: theme[themeMode].textSecondary }]}>
                {searchQuery 
                  ? `No results found for "${searchQuery}"`
                  : `No ${activeTab.toLowerCase()} content available`
                }
              </Text>
            </View>
          }
        />
      </View>
    </HudContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  contentList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  itemContainer: {
    marginBottom: 16,
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

export default LibraryScreen;
