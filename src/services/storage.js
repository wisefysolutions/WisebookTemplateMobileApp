import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data to storage
export const saveToStorage = async (key, value) => {
  try {
    const jsonValue = value !== null ? JSON.stringify(value) : null;
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error saving to storage (key: ${key}):`, error);
    return false;
  }
};

// Load data from storage
export const loadFromStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error loading from storage (key: ${key}):`, error);
    return null;
  }
};

// Remove data from storage
export const removeFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from storage (key: ${key}):`, error);
    return false;
  }
};

// Clear all app storage
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

// Save all user data (for offline use)
export const saveUserData = async (userData) => {
  try {
    // Save individual pieces of user data
    await saveToStorage('user', userData.user);
    await saveToStorage('learningProgress', userData.learningProgress);
    await saveToStorage('completedContent', userData.completedContent);
    await saveToStorage('enrolledPaths', userData.enrolledPaths);
    await saveToStorage('achievements', userData.achievements);
    await saveToStorage('offlineContent', userData.offlineContent);
    
    // Save timestamp of last sync
    await saveToStorage('lastSync', new Date().toISOString());
    
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

// Load all user data (for offline use)
export const loadUserData = async () => {
  try {
    const user = await loadFromStorage('user');
    
    if (!user) {
      return null;
    }
    
    const userData = {
      user,
      learningProgress: await loadFromStorage('learningProgress') || {},
      completedContent: await loadFromStorage('completedContent') || [],
      enrolledPaths: await loadFromStorage('enrolledPaths') || [],
      achievements: await loadFromStorage('achievements') || [],
      offlineContent: await loadFromStorage('offlineContent') || [],
      lastSync: await loadFromStorage('lastSync')
    };
    
    return userData;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

// Save app settings
export const saveAppSettings = async (settings) => {
  try {
    await saveToStorage('appSettings', settings);
    return true;
  } catch (error) {
    console.error('Error saving app settings:', error);
    return false;
  }
};

// Load app settings
export const loadAppSettings = async () => {
  try {
    return await loadFromStorage('appSettings') || {
      themeMode: 'dark',
      notifications: true,
      offlineMode: false,
      dataUsage: 'standard'
    };
  } catch (error) {
    console.error('Error loading app settings:', error);
    return {
      themeMode: 'dark',
      notifications: true,
      offlineMode: false,
      dataUsage: 'standard'
    };
  }
};
