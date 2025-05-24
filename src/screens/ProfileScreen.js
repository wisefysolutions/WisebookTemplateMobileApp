import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import HudContainer from '../components/ui/HudContainer';
import GlowingText from '../components/ui/GlowingText';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import AchievementList from '../components/AchievementList';
import { useStore } from '../store/useStore';
import { fetchUserStats, fetchUserAchievements } from '../services/api';
import { saveToStorage } from '../services/storage';
import { theme } from '../theme';

const ProfileScreen = () => {
  const { user, themeMode, setThemeMode, logout } = useStore();
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        const [userStats, userAchievements] = await Promise.all([
          fetchUserStats(user.id),
          fetchUserAchievements(user.id)
        ]);
        
        setStats(userStats);
        setAchievements(userAchievements);
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfileData();
  }, [user.id]);

  const handleThemeToggle = async () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    await saveToStorage('themeMode', newTheme);
  };

  const progressToNextLevel = stats ? stats.xp / stats.xpToNextLevel : 0;

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
            style={styles.profileHeader}
          >
            <View style={styles.profileInfo}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>
                  {user.name.charAt(0)}
                </Text>
              </View>
              
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
                
                {stats && (
                  <View style={styles.levelContainer}>
                    <Text style={styles.levelText}>Level {stats.level}</Text>
                  </View>
                )}
              </View>
            </View>
            
            {stats && (
              <View style={styles.profileStats}>
                <View style={styles.xpContainer}>
                  <Text style={styles.xpText}>
                    {stats.xp} / {stats.xpToNextLevel} XP
                  </Text>
                  <View style={styles.xpBar}>
                    <View 
                      style={[
                        styles.xpProgress, 
                        { width: `${progressToNextLevel * 100}%` }
                      ]} 
                    />
                  </View>
                </View>
                
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stats.completedCourses}</Text>
                    <Text style={styles.statLabel}>Courses</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stats.completedPaths}</Text>
                    <Text style={styles.statLabel}>Paths</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stats.dailyStreak}</Text>
                    <Text style={styles.statLabel}>Streak</Text>
                  </View>
                </View>
              </View>
            )}
          </LinearGradient>
        </MotiView>
        
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: 'timing', duration: 600 }}
        >
          <View style={styles.sectionHeader}>
            <GlowingText style={styles.sectionTitle}>Achievements</GlowingText>
            <Text style={[styles.achievementCount, { color: theme[themeMode].accent }]}>
              {achievements.length} Unlocked
            </Text>
          </View>
          
          <AchievementList achievements={achievements} />
        </MotiView>
        
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400, type: 'timing', duration: 600 }}
        >
          <View style={styles.sectionHeader}>
            <GlowingText style={styles.sectionTitle}>Settings</GlowingText>
          </View>
          
          <View style={[styles.settingsContainer, { backgroundColor: theme[themeMode].cardBackground }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Feather name="moon" size={20} color={theme[themeMode].text} />
                <Text style={[styles.settingLabel, { color: theme[themeMode].text }]}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={themeMode === 'dark'}
                onValueChange={handleThemeToggle}
                trackColor={{ false: '#767577', true: theme[themeMode].accent }}
                thumbColor="#f4f3f4"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Feather name="download" size={20} color={theme[themeMode].text} />
                <Text style={[styles.settingLabel, { color: theme[themeMode].text }]}>
                  Offline Mode
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: theme[themeMode].accent }}
                thumbColor="#f4f3f4"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Feather name="bell" size={20} color={theme[themeMode].text} />
                <Text style={[styles.settingLabel, { color: theme[themeMode].text }]}>
                  Notifications
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: theme[themeMode].accent }}
                thumbColor="#f4f3f4"
                defaultValue={true}
              />
            </View>
            
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Feather name="log-out" size={20} color="#FF5252" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
        
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 600, type: 'timing', duration: 600 }}
          style={styles.versionContainer}
        >
          <Text style={[styles.versionText, { color: theme[themeMode].textSecondary }]}>
            Wisebook v1.0.0
          </Text>
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
    paddingBottom: 80,
  },
  profileHeader: {
    borderRadius: 0,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  levelContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  profileStats: {
    marginTop: 10,
  },
  xpContainer: {
    marginBottom: 16,
  },
  xpText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 6,
    textAlign: 'right',
  },
  xpBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  achievementCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingsContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  logoutText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  versionText: {
    fontSize: 14,
  },
});

export default ProfileScreen;
