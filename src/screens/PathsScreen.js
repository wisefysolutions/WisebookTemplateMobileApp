import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import HudContainer from '../components/ui/HudContainer';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import GlowingText from '../components/ui/GlowingText';
import PathList from '../components/PathList';
import { fetchLearningPaths, fetchEnrolledPaths } from '../services/api';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

const PathsScreen = () => {
  const navigation = useNavigation();
  const { user, themeMode } = useStore();
  const [allPaths, setAllPaths] = useState([]);
  const [enrolledPaths, setEnrolledPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('enrolled');

  useEffect(() => {
    const loadPaths = async () => {
      try {
        setLoading(true);
        const [pathsData, enrolledData] = await Promise.all([
          fetchLearningPaths(),
          fetchEnrolledPaths(user.id)
        ]);
        
        setAllPaths(pathsData);
        setEnrolledPaths(enrolledData);
      } catch (error) {
        console.error('Error loading paths:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPaths();
  }, [user.id]);

  const renderEnrolledPath = ({ item, index }) => {
    const progress = item.completedCheckpoints / item.totalCheckpoints;
    
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 100, type: 'timing', duration: 500 }}
        style={styles.enrolledPathItem}
      >
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('PathDetail', { path: item })}
          style={styles.enrolledPathTouchable}
        >
          <LinearGradient
            colors={[theme[themeMode].gradientStart, theme[themeMode].gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.enrolledPathGradient}
          >
            <View style={styles.enrolledPathContent}>
              <View style={styles.enrolledPathTop}>
                <View style={styles.enrolledPathIconContainer}>
                  <Feather 
                    name={item.icon || "map"} 
                    size={22} 
                    color={theme[themeMode].textInvert} 
                  />
                </View>
                <Text style={styles.enrolledPathTitle}>{item.title}</Text>
              </View>
              
              <View style={styles.enrolledPathStats}>
                <ProgressIndicator 
                  progress={progress} 
                  size={120} 
                  thickness={12}
                  glowColor={theme[themeMode].accentGlow}
                />
                
                <View style={styles.enrolledPathDetails}>
                  <Text style={styles.enrolledPathProgressText}>
                    {Math.round(progress * 100)}% Complete
                  </Text>
                  <Text style={styles.enrolledPathCheckpoints}>
                    {item.completedCheckpoints}/{item.totalCheckpoints} Checkpoints
                  </Text>
                  <Text style={styles.enrolledPathXP}>
                    +{item.xpEarned} XP Earned
                  </Text>
                </View>
              </View>
              
              <View style={styles.enrolledPathBottom}>
                <TouchableOpacity 
                  style={styles.continueButton}
                  onPress={() => navigation.navigate('PathDetail', { 
                    path: item, 
                    startLatest: true 
                  })}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                  <Feather name="arrow-right" size={16} color={theme[themeMode].textInvert} />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>
    );
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
          <GlowingText style={styles.title}>Evolution Paths</GlowingText>
          <Text style={[styles.subtitle, { color: theme[themeMode].textSecondary }]}>
            Your journey to wisdom is mapped out
          </Text>
          
          <View style={styles.tabs}>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'enrolled' && {
                  backgroundColor: theme[themeMode].accent,
                  borderColor: theme[themeMode].accentLight,
                }
              ]}
              onPress={() => setActiveTab('enrolled')}
            >
              <Text 
                style={[
                  styles.tabText, 
                  { color: activeTab === 'enrolled' ? theme[themeMode].textInvert : theme[themeMode].text }
                ]}
              >
                My Paths
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'discover' && {
                  backgroundColor: theme[themeMode].accent,
                  borderColor: theme[themeMode].accentLight,
                }
              ]}
              onPress={() => setActiveTab('discover')}
            >
              <Text 
                style={[
                  styles.tabText, 
                  { color: activeTab === 'discover' ? theme[themeMode].textInvert : theme[themeMode].text }
                ]}
              >
                Discover
              </Text>
            </TouchableOpacity>
          </View>
        </MotiView>
        
        {activeTab === 'enrolled' ? (
          enrolledPaths.length > 0 ? (
            <FlatList
              data={enrolledPaths}
              renderItem={renderEnrolledPath}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.enrolledList}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Feather 
                name="compass" 
                size={50} 
                color={theme[themeMode].textSecondary} 
              />
              <Text style={[styles.emptyText, { color: theme[themeMode].textSecondary }]}>
                You haven't enrolled in any paths yet
              </Text>
              <TouchableOpacity 
                style={[styles.emptyButton, { backgroundColor: theme[themeMode].accent }]}
                onPress={() => setActiveTab('discover')}
              >
                <Text style={[styles.emptyButtonText, { color: theme[themeMode].textInvert }]}>
                  Discover Paths
                </Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <PathList 
            paths={allPaths} 
            onPathPress={(path) => navigation.navigate('PathDetail', { path })}
          />
        )}
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
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  enrolledList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  enrolledPathItem: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  enrolledPathTouchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  enrolledPathGradient: {
    borderRadius: 16,
  },
  enrolledPathContent: {
    padding: 16,
  },
  enrolledPathTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  enrolledPathIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  enrolledPathTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  enrolledPathStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  enrolledPathDetails: {
    flex: 1,
    marginLeft: 16,
  },
  enrolledPathProgressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  enrolledPathCheckpoints: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  enrolledPathXP: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  enrolledPathBottom: {
    alignItems: 'flex-end',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  continueButtonText: {
    color: '#fff',
    marginRight: 6,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 24,
    fontSize: 16,
    textAlign: 'center',
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PathsScreen;
