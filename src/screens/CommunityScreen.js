import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import HudContainer from '../components/ui/HudContainer';
import GlowingText from '../components/ui/GlowingText';
import { fetchCommunityPosts, createPost, fetchTopUsers } from '../services/api';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

const TABS = ['All', 'Questions', 'Discussions', 'Announcements'];

const CommunityScreen = () => {
  const { user, themeMode } = useStore();
  const [posts, setPosts] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [newPostText, setNewPostText] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [postsData, usersData] = await Promise.all([
        fetchCommunityPosts(),
        fetchTopUsers()
      ]);
      
      setPosts(postsData);
      setTopUsers(usersData);
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleCreatePost = async () => {
    if (!newPostText.trim()) return;
    
    try {
      const newPost = await createPost({
        userId: user.id,
        content: newPostText,
        type: 'discussion',
        timestamp: new Date().toISOString()
      });
      
      setPosts([newPost, ...posts]);
      setNewPostText('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const filterPosts = () => {
    if (activeTab === 'All') return posts;
    return posts.filter(post => post.type.toLowerCase() === activeTab.toLowerCase());
  };

  const renderPost = ({ item, index }) => {
    const postAuthor = item.user || { name: 'Unknown', avatar: null, level: 1 };
    
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 50, type: 'timing', duration: 400 }}
        style={[
          styles.postContainer, 
          { backgroundColor: theme[themeMode].cardBackground }
        ]}
      >
        <View style={styles.postHeader}>
          <View style={styles.postAuthor}>
            <View style={[styles.postAvatar, { backgroundColor: theme[themeMode].accent }]}>
              <Text style={styles.postAvatarText}>
                {postAuthor.name.charAt(0)}
              </Text>
            </View>
            <View>
              <Text style={[styles.postAuthorName, { color: theme[themeMode].text }]}>
                {postAuthor.name}
              </Text>
              <Text style={[styles.postAuthorLevel, { color: theme[themeMode].textSecondary }]}>
                Level {postAuthor.level}
              </Text>
            </View>
          </View>
          <View style={[styles.postTypeBadge, item.type === 'question' && styles.questionBadge]}>
            <Text style={styles.postTypeText}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.postContent, { color: theme[themeMode].text }]}>
          {item.content}
        </Text>
        
        <View style={styles.postFooter}>
          <View style={styles.postStats}>
            <TouchableOpacity style={styles.postStat}>
              <Feather name="thumbs-up" size={16} color={theme[themeMode].textSecondary} />
              <Text style={[styles.postStatText, { color: theme[themeMode].textSecondary }]}>
                {item.likes || 0}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.postStat}>
              <Feather name="message-square" size={16} color={theme[themeMode].textSecondary} />
              <Text style={[styles.postStatText, { color: theme[themeMode].textSecondary }]}>
                {item.comments?.length || 0}
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.postTime, { color: theme[themeMode].textSecondary }]}>
            {formatTimestamp(item.timestamp)}
          </Text>
        </View>
      </MotiView>
    );
  };

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

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <HudContainer loading={loading}>
      <View style={styles.container}>
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.header}
        >
          <GlowingText style={styles.title}>Wisdom Community</GlowingText>
          <Text style={[styles.subtitle, { color: theme[themeMode].textSecondary }]}>
            Connect, discuss and learn together
          </Text>
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
        
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 300, type: 'timing', duration: 500 }}
        >
          <View style={[styles.topUsersContainer, { backgroundColor: theme[themeMode].cardBackground }]}>
            <Text style={[styles.topUsersTitle, { color: theme[themeMode].text }]}>
              Top Contributors
            </Text>
            <FlatList
              horizontal
              data={topUsers}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.topUserItem}>
                  <View style={[styles.topUserAvatar, { backgroundColor: theme[themeMode].accent }]}>
                    <Text style={styles.topUserAvatarText}>{item.name.charAt(0)}</Text>
                  </View>
                  <Text style={[styles.topUserName, { color: theme[themeMode].text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.topUserXP, { color: theme[themeMode].textSecondary }]}>
                    {item.xp} XP
                  </Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topUsersList}
            />
          </View>
        </MotiView>
        
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400, type: 'timing', duration: 500 }}
          style={[styles.newPostContainer, { backgroundColor: theme[themeMode].cardBackground }]}
        >
          <View style={styles.newPostHeader}>
            <View style={[styles.newPostAvatar, { backgroundColor: theme[themeMode].accent }]}>
              <Text style={styles.newPostAvatarText}>
                {user.name.charAt(0)}
              </Text>
            </View>
            <TextInput
              style={[styles.newPostInput, { color: theme[themeMode].text }]}
              placeholder="Share your thoughts or ask a question..."
              placeholderTextColor={theme[themeMode].textSecondary}
              multiline
              value={newPostText}
              onChangeText={setNewPostText}
            />
          </View>
          
          <View style={styles.newPostFooter}>
            <TouchableOpacity style={styles.newPostTypeButton}>
              <Feather name="hash" size={18} color={theme[themeMode].textSecondary} />
              <Text style={[styles.newPostTypeText, { color: theme[themeMode].textSecondary }]}>
                Discussion
              </Text>
              <Feather name="chevron-down" size={18} color={theme[themeMode].textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.newPostButton,
                { backgroundColor: theme[themeMode].accent },
                !newPostText.trim() && { opacity: 0.5 }
              ]}
              onPress={handleCreatePost}
              disabled={!newPostText.trim()}
            >
              <Text style={styles.newPostButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
        
        <FlatList
          data={filterPosts()}
          renderItem={renderPost}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.postsList}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather 
                name="users" 
                size={50} 
                color={theme[themeMode].textSecondary} 
              />
              <Text style={[styles.emptyText, { color: theme[themeMode].textSecondary }]}>
                No posts found in this category
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
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
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
  topUsersContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  topUsersTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  topUsersList: {
    paddingRight: 8,
  },
  topUserItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  topUserAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  topUserAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topUserName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 2,
  },
  topUserXP: {
    fontSize: 12,
  },
  newPostContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  newPostHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  newPostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  newPostAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newPostInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    fontSize: 16,
  },
  newPostFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  newPostTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newPostTypeText: {
    marginHorizontal: 6,
    fontSize: 14,
  },
  newPostButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newPostButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  postsList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  postContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  postAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postAuthorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  postAuthorLevel: {
    fontSize: 12,
  },
  postTypeBadge: {
    backgroundColor: 'rgba(0,150,136,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  questionBadge: {
    backgroundColor: 'rgba(33,150,243,0.2)',
  },
  postTypeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postStats: {
    flexDirection: 'row',
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  postStatText: {
    marginLeft: 6,
    fontSize: 14,
  },
  postTime: {
    fontSize: 12,
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

export default CommunityScreen;
