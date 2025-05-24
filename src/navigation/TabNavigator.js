import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PathsScreen from '../screens/PathsScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Custom tab bar component for futuristic UI
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { themeMode } = useStore();
  const insets = useSafeAreaInsets();
  
  return (
    <LinearGradient
      colors={[
        'transparent',
        theme[themeMode].tabBarBackground,
        theme[themeMode].tabBarBackground
      ]}
      style={[
        styles.tabBarContainer,
        { paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }
      ]}
    >
      <View style={styles.tabBar}>
        <View style={styles.tabBarCorner} />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;
          
          const icon = 
            route.name === 'Home' ? 'home' :
            route.name === 'Library' ? 'book-open' :
            route.name === 'Paths' ? 'map' :
            route.name === 'Community' ? 'users' : 'user';
          
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.tabButton}
            >
              <MotiView
                animate={{
                  scale: isFocused ? 1 : 0.95,
                }}
                transition={{ type: 'timing', duration: 200 }}
                style={styles.tabButtonContent}
              >
                {isFocused && (
                  <MotiView
                    from={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'timing', duration: 250 }}
                    style={[
                      styles.focusedBackground,
                      { backgroundColor: theme[themeMode].accent }
                    ]}
                  />
                )}
                
                <Feather
                  name={icon}
                  size={22}
                  color={isFocused ? '#FFF' : theme[themeMode].tabBarInactive}
                />
                
                {isFocused && (
                  <MotiView
                    from={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ type: 'timing', duration: 200 }}
                  >
                    <Text style={styles.tabLabelFocused}>
                      {label}
                    </Text>
                  </MotiView>
                )}
              </MotiView>
            </TouchableOpacity>
          );
        })}
        <View style={styles.tabBarCorner} />
      </View>
    </LinearGradient>
  );
};

const TabNavigator = () => {
  const { themeMode } = useStore();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Paths" component={PathsScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 8,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    borderRadius: 24,
    height: 60,
    paddingHorizontal: 8,
    position: 'relative',
  },
  tabBarCorner: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    transform: [{ rotate: '45deg' }],
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  focusedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  tabLabelFocused: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default TabNavigator;
