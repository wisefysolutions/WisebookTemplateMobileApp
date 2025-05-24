import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import { useStore } from '../store/useStore';
import HudContainer from '../components/ui/HudContainer';
import GlowingText from '../components/ui/GlowingText';
import ContentList from '../components/ContentList';
import RecommendationPanel from '../components/RecommendationPanel';
import CalendarWidget from '../components/CalendarWidget';
import DigitalCoach from '../components/DigitalCoach';
import { getRecommendedContent } from '../services/recommendations';
import { fetchRecentContent, fetchContinueLearning } from '../services/api';
import { theme } from '../theme';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, themeMode } = useStore();
  const [recommendations, setRecommendations] = useState([]);
  const [recentContent, setRecentContent] = useState([]);
  const [continueContent, setContinueContent] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel
        const [recommendedData, recentData, continueData] = await Promise.all([
          getRecommendedContent(user.id),
          fetchRecentContent(),
          fetchContinueLearning(user.id)
        ]);
        
        setRecommendations(recommendedData);
        setRecentContent(recentData);
        setContinueContent(continueData);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [user.id]);
  
  return (
    <HudContainer loading={loading}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={styles.header}
        >
          <GlowingText style={styles.greeting}>
            Welcome back, {user.name}
          </GlowingText>
          <Text style={[styles.subGreeting, { color: theme[themeMode].textSecondary }]}>
            Ready to expand your knowledge?
          </Text>
        </MotiView>
        
        <DigitalCoach 
          message="I've analyzed your progress. Would you like to continue where you left off or explore something new?"
        />
        
        {continueContent.length > 0 && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 800, delay: 200 }}
          >
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme[themeMode].text }]}>Continue Learning</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Library')}>
                <Text style={[styles.seeAll, { color: theme[themeMode].accent }]}>See All</Text>
              </TouchableOpacity>
            </View>
            <ContentList 
              data={continueContent} 
              horizontal={true}
              showProgress={true}
              onItemPress={(item) => navigation.navigate('ContentDetail', { item })}
            />
          </MotiView>
        )}
        
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 400 }}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme[themeMode].text }]}>For You</Text>
          </View>
          <RecommendationPanel 
            recommendations={recommendations}
            onItemPress={(item) => navigation.navigate('ContentDetail', { item })}
          />
        </MotiView>
        
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 600 }}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme[themeMode].text }]}>New Content</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
              <Text style={[styles.seeAll, { color: theme[themeMode].accent }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <ContentList 
            data={recentContent} 
            horizontal={true}
            onItemPress={(item) => navigation.navigate('ContentDetail', { item })}
          />
        </MotiView>
        
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 800 }}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme[themeMode].text }]}>Your Schedule</Text>
          </View>
          <CalendarWidget />
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
    paddingVertical: 20,
    paddingBottom: 80,
  },
  header: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    opacity: 0.8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
  },
});

export default HomeScreen;
