import { create } from 'zustand';
import { saveToStorage } from '../services/storage';

export const useStore = create((set, get) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),
  
  // Theme state
  themeMode: 'dark', // default theme is dark for futuristic UI
  setThemeMode: (mode) => set({ themeMode: mode }),
  
  // Learning progress
  learningProgress: {},
  updateProgress: (contentId, progress) => {
    const { learningProgress } = get();
    set({
      learningProgress: {
        ...learningProgress,
        [contentId]: progress
      }
    });
  },
  
  // Completed content
  completedContent: [],
  markContentCompleted: (contentId) => {
    const { completedContent } = get();
    if (!completedContent.includes(contentId)) {
      const updatedCompleted = [...completedContent, contentId];
      set({ completedContent: updatedCompleted });
    }
  },
  
  // Enrolled paths
  enrolledPaths: [],
  enrollInPath: (pathId) => {
    const { enrolledPaths } = get();
    if (!enrolledPaths.includes(pathId)) {
      const updatedPaths = [...enrolledPaths, pathId];
      set({ enrolledPaths: updatedPaths });
    }
  },
  
  // User achievements
  achievements: [],
  addAchievement: (achievement) => {
    const { achievements } = get();
    const achievementExists = achievements.some(a => a.id === achievement.id);
    if (!achievementExists) {
      set({ achievements: [...achievements, achievement] });
    }
  },
  
  // User XP and level
  xp: 0,
  level: 1,
  addXP: (amount) => {
    const { xp, level } = get();
    const newXP = xp + amount;
    
    // Simple leveling formula (100 XP per level)
    const xpPerLevel = 100;
    const newLevel = Math.floor(newXP / xpPerLevel) + 1;
    
    set({
      xp: newXP,
      level: newLevel
    });
  },
  
  // Notifications
  notifications: [],
  addNotification: (notification) => {
    const { notifications } = get();
    set({ notifications: [notification, ...notifications] });
  },
  
  // Offline content
  offlineContent: [],
  addToOfflineContent: (content) => {
    const { offlineContent } = get();
    const exists = offlineContent.some(c => c.id === content.id);
    if (!exists) {
      set({ offlineContent: [...offlineContent, content] });
    }
  },
  removeFromOfflineContent: (contentId) => {
    const { offlineContent } = get();
    set({
      offlineContent: offlineContent.filter(c => c.id !== contentId)
    });
  },
  
  // Logout functionality
  logout: async () => {
    // Clear all user data
    set({
      user: null,
      learningProgress: {},
      completedContent: [],
      enrolledPaths: [],
      achievements: [],
      xp: 0,
      level: 1,
      notifications: [],
      offlineContent: []
    });
    
    // Clear user from storage
    await saveToStorage('user', null);
  }
}));
