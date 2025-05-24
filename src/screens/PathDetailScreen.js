import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Line } from 'react-native-svg';
import HudContainer from '../components/ui/HudContainer';
import GlowingText from '../components/ui/GlowingText';
import AnimatedButton from '../components/ui/AnimatedButton';
import AchievementBadge from '../components/ui/AchievementBadge';
import { useStore } from '../store/useStore';
import { fetchPathDetails, enrollInPath } from '../services/api';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const PathDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user, themeMode } = useStore();
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [expandedCheckpoint, setExpandedCheckpoint] = useState(null);
  
  // Path is passed from previous screen or fetch it if needed
  const pathId = route.params?.path?.id || route.params?.pathId;
  
  useEffect(() => {
    const loadPathDetails = async () => {
      try {
        setLoading(true);
        
        // If we already have the path with all details, use it
        if (route.params?.path?.fullDetails) {
          setPath(route.params.path);
          setEnrolled(route.params.path.enrolled || false);
          return;
        }
        
        // Otherwise fetch the details
        const pathDetails = await fetchPathDetails(pathId);
        setPath(pathDetails);
        setEnrolled(pathDetails.enrolled || false);
      } catch (error) {
        console.error('Error loading path details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPathDetails();
  }, [pathId, route.params?.path]);
  
  useEffect(() => {
    if (path?.checkpoints && route.params?.startLatest) {
      // Find the first incomplete checkpoint
      const firstIncomplete = path.checkpoints.findIndex(cp => !cp.completed);
      if (firstIncomplete >= 0) {
        setExpandedCheckpoint(firstIncomplete);
      }
    }
  }, [path, route.params?.startLatest]);
  
  const handleEnroll = async () => {
    try {
      await enrollInPath(pathId, user.id);
      setEnrolled(true);
    } catch (error) {
      console.error('Error enrolling in path:', error);
    }
  };
  
  const toggleCheckpoint = (index) => {
    if (expandedCheckpoint === index) {
      setExpandedCheckpoint(null);
    } else {
      setExpandedCheckpoint(index);
    }
  };
  
  const handleStartCheckpoint = (checkpoint) => {
    // Navigate to content if this checkpoint has associated content
    if (checkpoint.contentId) {
      navigation.navigate('ContentDetail', { contentId: checkpoint.contentId });
    }
  };
  
  const renderRoadmap = () => {
    if (!path?.checkpoints) return null;
    
    return (
      <View style={styles.roadmapContainer}>
        <Svg height={path.checkpoints.length * 120} width={30}>
          {path.checkpoints.map((checkpoint, index) => {
            const y = index * 120 + 24;
            const nextY = (index + 1) * 120 + 24;
            const completed = checkpoint.completed;
            const isLast = index === path.checkpoints.length - 1;
            
            return (
              <React.Fragment key={`svg-${index}`}>
                <Circle
                  cx="15"
                  cy={y}
                  r="10"
                  fill={completed ? theme[themeMode].accent : 'transparent'}
                  stroke={completed ? theme[themeMode].accent : theme[themeMode].textSecondary}
                  strokeWidth="2"
                />
                {!isLast && (
                  <Line
                    x1="15"
                    y1={y + 10}
                    x2="15"
                    y2={nextY - 10}
                    stroke={
                      completed && path.checkpoints[index + 1].completed 
                        ? theme[themeMode].accent 
                        : theme[themeMode].textSecondary
                    }
                    strokeWidth="2"
                    strokeDasharray={completed && !path.checkpoints[index + 1].completed ? "5,5" : "0"}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Svg>
        
        <View style={styles.checkpointsContainer}>
          {path.checkpoints.map((checkpoint, index) => (
            <MotiView
              key={`checkpoint-${index}`}
              from={{ opacity: 0, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: index * 100, type: 'timing', duration: 400 }}
            >
              <TouchableOpacity
                style={[
                  styles.checkpointItem,
                  { backgroundColor: theme[themeMode].cardBackground },
                  expandedCheckpoint === index && styles.expandedCheckpoint
                ]}
                onPress={() => toggleCheckpoint(index)}
                disabled={index > 0 && !path.checkpoints[index - 1].completed && !checkpoint.completed}
              >
                <View style={styles.checkpointHeader}>
                  <View>
                    <Text 
                      style={[
                        styles.checkpointTitle, 
                        { color: theme[themeMode].text },
                        checkpoint.completed && { color: theme[themeMode].accent }
                      ]}
                    >
                      {checkpoint.title}
                    </Text>
                    <Text style={[styles.checkpointXP, { color: theme[themeMode].textSecondary }]}>
                      +{checkpoint.xp} XP
                    </Text>
                  </View>
                  
                  <View style={styles.checkpointStatus}>
                    {checkpoint.completed ? (
                      <View style={[styles.completedBadge, { backgroundColor: theme[themeMode].accent }]}>
                        <Feather name="check" size={14} color="#fff" />
                        <Text style={styles.completedText}>Completed</Text>
                      </View>
                    ) : (
                      index > 0 && !path.checkpoints[index - 1].completed ? (
                        <Feather name="lock" size={20} color={theme[themeMode].textSecondary} />
                      ) : (
                        <Feather 
                          name={expandedCheckpoint === index ? "chevron-up" : "chevron-down"} 
                          size={20} 
                          color={theme[themeMode].textSecondary} 
                        />
                      )
                    )}
                  </View>
                </View>
                
                {expandedCheckpoint === index && (
                  <MotiView
                    from={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ type: 'timing', duration: 300 }}
                    style={styles.checkpointDetails}
                  >
                    <Text style={[styles.checkpointDescription, { color: theme[themeMode].text }]}>
                      {checkpoint.description}
                    </Text>
                    
                    {checkpoint.type === 'quiz' && (
                      <View style={styles.quizInfo}>
                        <Feather name="help-circle" size={16} color={theme[themeMode].accent} />
                        <Text style={[styles.quizText, { color: theme[themeMode].text }]}>
                          Quiz: {checkpoint.questions} questions
                        </Text>
                      </View>
                    )}
                    
                    {checkpoint.type === 'content' && (
                      <View style={styles.contentInfo}>
                        <Feather 
                          name={
                            checkpoint.contentType === 'video' ? 'video' :
                            checkpoint.contentType === 'audio' ? 'headphones' :
                            'book-open'
                          } 
                          size={16} 
                          color={theme[themeMode].accent} 
                        />
                        <Text style={[styles.contentText, { color: theme[themeMode].text }]}>
                          {checkpoint.contentType}: {checkpoint.duration}
                        </Text>
                      </View>
                    )}
                    
                    {!checkpoint.completed && (
                      <TouchableOpacity
                        style={[styles.startButton, { backgroundColor: theme[themeMode].accent }]}
                        onPress={() => handleStartCheckpoint(checkpoint)}
                      >
                        <Text style={styles.startButtonText}>
                          {checkpoint.type === 'quiz' ? 'Take Quiz' : 'Start Learning'}
                        </Text>
                        <Feather name="arrow-right" size={16} color="#fff" />
                      </TouchableOpacity>
                    )}
                  </MotiView>
                )}
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>
      </View>
    );
  };
  
  if (!path && !loading) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme[themeMode].background }]}>
        <Feather name="alert-circle" size={50} color={theme[themeMode].textSecondary} />
        <Text style={[styles.errorText, { color: theme[themeMode].text }]}>
          Path not found
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
            
            <View style={styles.pathInfo}>
              <View style={styles.pathIconContainer}>
                <Feather name={path?.icon || "map"} size={28} color="#fff" />
              </View>
              
              <Text style={styles.pathTitle}>{path?.title}</Text>
              
              <View style={styles.pathMeta}>
                {path?.level && (
                  <View style={styles.metaItem}>
                    <Feather name="bar-chart-2" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.metaText}>{path.level} Level</Text>
                  </View>
                )}
                
                {path?.duration && (
                  <View style={styles.metaItem}>
                    <Feather name="clock" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.metaText}>{path.duration}</Text>
                  </View>
                )}
                
                {path?.totalXP && (
                  <View style={styles.metaItem}>
                    <Feather name="award" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.metaText}>{path.totalXP} XP</Text>
                  </View>
                )}
              </View>
              
              {path?.progress !== undefined && path.progress > 0 && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressInfo}>
                    <Text style={styles.progressText}>
                      {Math.round(path.progress * 100)}% Complete
                    </Text>
                    <Text style={styles.checkpointsText}>
                      {path.completedCheckpoints}/{path.totalCheckpoints} Checkpoints
                    </Text>
                  </View>
                  
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressIndicator, 
                          { width: `${path.progress * 100}%` }
                        ]}
                      />
                    </View>
                  </View>
                </View>
              )}
              
              {!enrolled && (
                <AnimatedButton
                  icon="flag"
                  text="Enroll in Path"
                  onPress={handleEnroll}
                  style={styles.enrollButton}
                  primary
                />
              )}
            </View>
          </LinearGradient>
        </MotiView>
        
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: 'timing', duration: 400 }}
          style={styles.pathDetailsContainer}
        >
          <Text style={[styles.sectionTitle, { color: theme[themeMode].text }]}>About this path</Text>
          <Text style={[styles.pathDescription, { color: theme[themeMode].text }]}>
            {path?.description}
          </Text>
          
          {path?.skills && path.skills.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: theme[themeMode].text, marginTop: 24 }]}>
                Skills you'll gain
              </Text>
              <View style={styles.skillsContainer}>
                {path.skills.map((skill, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.skillTag, 
                      { backgroundColor: theme[themeMode].cardBackground }
                    ]}
                  >
                    <Text style={[styles.skillText, { color: theme[themeMode].text }]}>
                      {skill}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
          
          {path?.achievements && path.achievements.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: theme[themeMode].text, marginTop: 24 }]}>
                Achievements to unlock
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.achievementsContainer}
              >
                {path.achievements.map((achievement, index) => (
                  <AchievementBadge 
                    key={index}
                    achievement={achievement}
                    unlocked={achievement.unlocked}
                    style={styles.achievementBadge}
                  />
                ))}
              </ScrollView>
            </>
          )}
        </MotiView>
        
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 400, type: 'timing', duration: 400 }}
        >
          <Text style={[styles.roadmapTitle, { color: theme[themeMode].text }]}>
            Learning Roadmap
          </Text>
          {renderRoadmap()}
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
  pathInfo: {
    alignItems: 'center',
  },
  pathIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  pathTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  pathMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 6,
  },
  metaText: {
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 6,
    fontSize: 14,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkpointsText: {
    color: 'rgba(255,255,255,0.8)',
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#fff',
  },
  enrollButton: {
    marginTop: 10,
  },
  pathDetailsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  pathDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skillTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
  },
  achievementsContainer: {
    paddingVertical: 10,
  },
  achievementBadge: {
    marginRight: 16,
  },
  roadmapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  roadmapContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  checkpointsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  checkpointItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
  },
  expandedCheckpoint: {
    borderWidth: 2,
    borderColor: 'rgba(138, 43, 226, 0.5)',
  },
  checkpointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkpointTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  checkpointXP: {
    fontSize: 14,
  },
  checkpointStatus: {
    marginLeft: 10,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
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
  checkpointDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  checkpointDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  quizInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quizText: {
    fontSize: 14,
    marginLeft: 8,
  },
  contentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contentText: {
    fontSize: 14,
    marginLeft: 8,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
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

export default PathDetailScreen;
