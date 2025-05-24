import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import HudContainer from '../components/ui/HudContainer';
import GlowingText from '../components/ui/GlowingText';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import AnimatedButton from '../components/ui/AnimatedButton';
import { useStore } from '../store/useStore';
import { fetchContentDetails, markContentProgress } from '../services/api';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const ContentDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user, themeMode } = useStore();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  
  // Content is passed from previous screen or fetch it if needed
  const contentId = route.params?.item?.id || route.params?.contentId;
  
  useEffect(() => {
    const loadContentDetails = async () => {
      try {
        setLoading(true);
        
        // If we already have the content item with all details, use it
        if (route.params?.item?.fullDetails) {
          setContent(route.params.item);
          setProgress(route.params.item.progress || 0);
          return;
        }
        
        // Otherwise fetch the details
        const contentDetails = await fetchContentDetails(contentId);
        setContent(contentDetails);
        setProgress(contentDetails.progress || 0);
      } catch (error) {
        console.error('Error loading content details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadContentDetails();
  }, [contentId, route.params?.item]);
  
  const handleContinuePress = async () => {
    try {
      // For demo, set progress to next 25% increment
      const newProgress = Math.min(1, progress + 0.25);
      setProgress(newProgress);
      
      // Update progress on server
      await markContentProgress(contentId, user.id, newProgress);
      
      // If completed, show achievement modal
      if (newProgress >= 1) {
        // Show completion modal or navigate to next content
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };
  
  const handleDownload = () => {
    // Implementation for downloading content for offline access
  };
  
  const getTabs = () => {
    if (!content) return [];
    
    const tabs = ['Overview'];
    if (content.type === 'course') {
      tabs.push('Modules');
    } else if (content.type === 'book') {
      tabs.push('Chapters');
    }
    tabs.push('Notes');
    
    return tabs;
  };
  
  const renderTabContent = () => {
    const tabs = getTabs();
    
    switch (tabs[tabIndex]) {
      case 'Overview':
        return renderOverviewTab();
      case 'Modules':
      case 'Chapters':
        return renderModulesTab();
      case 'Notes':
        return renderNotesTab();
      default:
        return null;
    }
  };
  
  const renderOverviewTab = () => (
    <View>
      <Text style={[styles.sectionTitle, { color: theme[themeMode].text }]}>About this content</Text>
      <Text style={[styles.description, { color: theme[themeMode].text }]}>
        {content?.description}
      </Text>
      
      <Text style={[styles.sectionTitle, { color: theme[themeMode].text, marginTop: 24 }]}>
        What you'll learn
      </Text>
      <View style={styles.learningPoints}>
        {content?.learningPoints?.map((point, index) => (
          <View key={index} style={styles.learningPoint}>
            <Feather name="check" size={16} color={theme[themeMode].accent} />
            <Text style={[styles.learningPointText, { color: theme[themeMode].text }]}>
              {point}
            </Text>
          </View>
        ))}
      </View>
      
      {content?.author && (
        <>
          <Text style={[styles.sectionTitle, { color: theme[themeMode].text, marginTop: 24 }]}>
            Author
          </Text>
          <View style={[styles.authorContainer, { backgroundColor: theme[themeMode].cardBackground }]}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorAvatarText}>
                {content.author.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.authorInfo}>
              <Text style={[styles.authorName, { color: theme[themeMode].text }]}>
                {content.author.name}
              </Text>
              <Text style={[styles.authorBio, { color: theme[themeMode].textSecondary }]}>
                {content.author.bio}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
  
  const renderModulesTab = () => (
    <View>
      {content?.modules?.map((module, index) => (
        <TouchableOpacity 
          key={index}
          style={[styles.moduleItem, { backgroundColor: theme[themeMode].cardBackground }]}
          onPress={() => {
            // Handle module selection
          }}
        >
          <View style={styles.moduleHeader}>
            <Text style={[styles.moduleTitle, { color: theme[themeMode].text }]}>
              {module.title}
            </Text>
            <Text style={[styles.moduleDuration, { color: theme[themeMode].textSecondary }]}>
              {module.duration}
            </Text>
          </View>
          
          <Text style={[styles.moduleDescription, { color: theme[themeMode].textSecondary }]}>
            {module.description}
          </Text>
          
          <View style={styles.moduleFooter}>
            {module.completed ? (
              <View style={styles.completedBadge}>
                <Feather name="check" size={14} color="#fff" />
                <Text style={styles.completedText}>Completed</Text>
              </View>
            ) : (
              <View style={styles.lockIndicator}>
                {module.locked ? (
                  <Feather name="lock" size={14} color={theme[themeMode].textSecondary} />
                ) : (
                  <Feather name="play-circle" size={14} color={theme[themeMode].accent} />
                )}
                <Text 
                  style={[
                    styles.lockText, 
                    { 
                      color: module.locked 
                        ? theme[themeMode].textSecondary 
                        : theme[themeMode].accent 
                    }
                  ]}
                >
                  {module.locked ? 'Locked' : 'Start'}
                </Text>
              </View>
            )}
            
            {module.xp > 0 && (
              <Text style={[styles.moduleXP, { color: theme[themeMode].accent }]}>
                +{module.xp} XP
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
  
  const renderNotesTab = () => (
    <View style={styles.notesContainer}>
      <Text style={[styles.notesPlaceholder, { color: theme[themeMode].textSecondary }]}>
        You haven't taken any notes for this content yet.
      </Text>
      <TouchableOpacity 
        style={[styles.addNoteButton, { backgroundColor: theme[themeMode].accent }]}
      >
        <Feather name="plus" size={16} color="#fff" />
        <Text style={styles.addNoteText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
  
  if (!content && !loading) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme[themeMode].background }]}>
        <Feather name="alert-circle" size={50} color={theme[themeMode].textSecondary} />
        <Text style={[styles.errorText, { color: theme[themeMode].text }]}>
          Content not found
        </Text>
        <TouchableOpacity 
          style={[styles.errorButton, { backgroundColor: theme[themeMode].accent }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.errorButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <HudContainer loading={loading}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
        >
          <LinearGradient
            colors={[theme[themeMode].gradientStart, theme[themeMode].gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.headerInfo}>
              <View style={styles.contentTypeContainer}>
                <Feather 
                  name={
                    content?.type === 'video' ? 'video' :
                    content?.type === 'audio' ? 'headphones' :
                    content?.type === 'book' ? 'book' : 'book-open'
                  } 
                  size={16} 
                  color="#fff" 
                />
                <Text style={styles.contentType}>
                  {content?.type?.charAt(0).toUpperCase() + content?.type?.slice(1)}
                </Text>
              </View>
              
              <Text style={styles.contentTitle}>{content?.title}</Text>
              
              <View style={styles.contentMeta}>
                {content?.duration && (
                  <View style={styles.metaItem}>
                    <Feather name="clock" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.metaText}>{content.duration}</Text>
                  </View>
                )}
                
                {content?.level && (
                  <View style={styles.metaItem}>
                    <Feather name="bar-chart-2" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.metaText}>{content.level}</Text>
                  </View>
                )}
                
                {content?.rating && (
                  <View style={styles.metaItem}>
                    <Feather name="star" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.metaText}>{content.rating}</Text>
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>
        </MotiView>
        
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: 'timing', duration: 400 }}
          style={[styles.progressContainer, { backgroundColor: theme[themeMode].cardBackground }]}
        >
          <View style={styles.progressInfo}>
            <Text style={[styles.progressTitle, { color: theme[themeMode].text }]}>
              Your Progress
            </Text>
            <Text style={[styles.progressPercentage, { color: theme[themeMode].accent }]}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { backgroundColor: theme[themeMode].backgroundLight }
              ]}
            >
              <View 
                style={[
                  styles.progressIndicator, 
                  { 
                    width: `${progress * 100}%`,
                    backgroundColor: theme[themeMode].accent
                  }
                ]}
              />
            </View>
          </View>
          
          <View style={styles.actionsContainer}>
            <AnimatedButton
              icon="play"
              text={progress > 0 ? "Continue" : "Start Learning"}
              onPress={handleContinuePress}
              primary
            />
            
            <AnimatedButton
              icon="download"
              text="Download"
              onPress={handleDownload}
            />
          </View>
        </MotiView>
        
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 400, type: 'timing', duration: 400 }}
          style={styles.tabsContainer}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScrollContent}
          >
            {getTabs().map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tabItem,
                  tabIndex === index && styles.activeTabItem,
                  tabIndex === index && { borderBottomColor: theme[themeMode].accent }
                ]}
                onPress={() => setTabIndex(index)}
              >
                <Text 
                  style={[
                    styles.tabText,
                    { color: theme[themeMode].text },
                    tabIndex === index && { color: theme[themeMode].accent }
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </MotiView>
        
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 500, type: 'timing', duration: 400 }}
          style={styles.tabContent}
        >
          {renderTabContent()}
        </MotiView>
      </ScrollView>
    </HudContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerInfo: {
    marginBottom: 10,
  },
  contentTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contentType: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  contentMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 6,
  },
  metaText: {
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 6,
    fontSize: 14,
  },
  progressContainer: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    borderRadius: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  tabContent: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  learningPoints: {
    marginTop: 12,
  },
  learningPoint: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  learningPointText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  authorContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6a11cb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  authorAvatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  authorBio: {
    fontSize: 14,
    lineHeight: 20,
  },
  moduleItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  moduleDuration: {
    fontSize: 14,
  },
  moduleDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  moduleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  lockIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockText: {
    fontSize: 14,
    marginLeft: 6,
  },
  moduleXP: {
    fontSize: 14,
    fontWeight: '600',
  },
  notesContainer: {
    alignItems: 'center',
    padding: 20,
  },
  notesPlaceholder: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  addNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addNoteText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  errorButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  errorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ContentDetailScreen;
