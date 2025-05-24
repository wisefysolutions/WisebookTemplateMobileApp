import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MotiView } from 'moti';
import TabNavigator from './TabNavigator';
import ContentDetailScreen from '../screens/ContentDetailScreen';
import PathDetailScreen from '../screens/PathDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { useStore } from '../store/useStore';
import { theme } from '../theme';
import { loadFromStorage, saveToStorage } from '../services/storage';

const Stack = createStackNavigator();

// Importar a tela de registro
import RegisterScreen from '../screens/RegisterScreen';

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={TabNavigator} />
    <Stack.Screen name="ContentDetail" component={ContentDetailScreen} />
    <Stack.Screen name="PathDetail" component={PathDetailScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user, setUser, themeMode } = useStore();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function checkUserAuth() {
      try {
        // Verificar se há um usuário salvo
        const userData = await loadFromStorage('user');
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      } finally {
        setLoading(false);
      }
    }
    
    checkUserAuth();
  }, []);
  
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme[themeMode].background }]}>
        <ActivityIndicator size="large" color={theme[themeMode].accent} />
      </View>
    );
  }
  
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.container}
    >
      {user ? <MainStack /> : <AuthStack />}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
