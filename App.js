import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { useStore } from './src/store/useStore';
import { ThemeProvider } from './src/theme';
import { loadFromStorage } from './src/services/storage';
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const { setUser, setThemeMode, themeMode } = useStore();

  useEffect(() => {
    async function prepare() {
      try {
        // Load user data and preferences from storage
        const userData = await loadFromStorage('user');
        if (userData) {
          setUser(userData);
        }
        
        const savedTheme = await loadFromStorage('themeMode');
        if (savedTheme) {
          setThemeMode(savedTheme);
        }
        
        // Wait for a second to show splash
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn('Error loading initial data:', e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
