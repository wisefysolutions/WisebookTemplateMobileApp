import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  FlatList,
  Animated,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { SvgXml } from 'react-native-svg';
import { theme } from '../theme';
import { generateHudSVG } from '../../assets/interfaces';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Welcome to Wisebook',
    subtitle: 'Your Journey to Knowledge Begins Here',
    description: 'Discover a new way of learning with our futuristic educational platform designed to elevate your skills and knowledge.',
    icon: 'book-open'
  },
  {
    id: '2',
    title: 'Content Library',
    subtitle: 'Vast Knowledge at Your Fingertips',
    description: 'Access a comprehensive library of courses, videos, eBooks, and audio content curated by experts across various fields.',
    icon: 'layers'
  },
  {
    id: '3',
    title: 'Learning Paths',
    subtitle: 'Structured Journey to Mastery',
    description: 'Follow custom learning paths that guide you from beginner to expert with achievable milestones along the way.',
    icon: 'map'
  },
  {
    id: '4',
    title: 'Community & Support',
    subtitle: 'Learn Together, Grow Together',
    description: 'Connect with like-minded learners, participate in discussions, and receive guidance from our supportive community.',
    icon: 'users'
  },
  {
    id: '5',
    title: 'Ready to Begin?',
    subtitle: 'Your Knowledge Adventure Awaits',
    description: 'Sign up now to start your learning journey and unlock your full potential with Wisebook.',
    icon: 'zap'
  }
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  
  const navigateToLogin = () => {
    // Usando setTimeout para evitar problemas de timing na navegação
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 100);
  };
  
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigateToLogin();
    }
  };
  
  const handleSkip = () => {
    // Chamada explícita para navegação imediata
    console.log("Skip button pressed, navigating to Login");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  
  const handleScrollEnd = (e) => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentIndex(pageNum);
  };
  
  const renderOnboardingItem = ({ item, index }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.slideContent}>
          <View style={styles.iconContainer}>
            <Feather name={item.icon} size={50} color="#fff" />
            
            {/* Decorative circles */}
            <View style={[styles.iconDecoration, styles.iconDecorationOuter]} />
            <View style={[styles.iconDecoration, styles.iconDecorationInner]} />
          </View>
          
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };
  
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {onboardingData.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive
              ]}
              onPress={() => {
                flatListRef.current.scrollToIndex({ index });
              }}
            />
          ))}
        </View>
        
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <LinearGradient
            colors={[theme.dark.accent, theme.dark.accentDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextButtonGradient}
          >
            <Feather 
              name={currentIndex === onboardingData.length - 1 ? "check" : "chevron-right"} 
              size={24} 
              color="#fff" 
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.dark.gradientStart, theme.dark.gradientEnd]}
        style={styles.background}
      >
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>WISEBOOK</Text>
          
          <TouchableOpacity 
            onPress={handleSkip}
            style={styles.skipButtonContainer}
            activeOpacity={0.7}
          >
            <Text style={styles.skipButton}>Skip</Text>
          </TouchableOpacity>
        </MotiView>
        
        {/* Background Decorations */}
        <View style={styles.backgroundDecorations}>
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ type: 'timing', duration: 1000 }}
            style={[styles.decoration, { top: '20%', left: '-20%' }]}
          >
            <SvgXml
              xml={generateHudSVG({ 
                width: 160, 
                height: 160, 
                type: 'circleIndicator' 
              })}
            />
          </MotiView>
          
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ type: 'timing', duration: 1000, delay: 200 }}
            style={[styles.decoration, { bottom: '20%', right: '-20%' }]}
          >
            <SvgXml
              xml={generateHudSVG({ 
                width: 160, 
                height: 160, 
                type: 'circleIndicator' 
              })}
            />
          </MotiView>
          
          <MotiView
            from={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 0.1, translateY: 0 }}
            transition={{ type: 'timing', duration: 1200 }}
            style={styles.gridDecoration}
          >
            {/* Grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={`h-line-${i}`} style={[styles.gridLine, styles.horizontalLine, { top: `${i * 10}%` }]} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={`v-line-${i}`} style={[styles.gridLine, styles.verticalLine, { left: `${i * 10}%` }]} />
            ))}
          </MotiView>
        </View>
        
        {/* Content */}
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderOnboardingItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={handleScrollEnd}
          bounces={false}
          style={styles.flatList}
          contentContainerStyle={{ alignItems: 'center' }}
          getItemLayout={(data, index) => ({
            length: Dimensions.get('window').width,
            offset: Dimensions.get('window').width * index,
            index,
          })}
        />
        
        {/* Bottom Controls */}
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={styles.bottomControls}
        >
          {renderPagination()}
        </MotiView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  skipButtonContainer: {
    padding: 10,
    paddingHorizontal: 15,
  },
  skipButton: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '500',
  },
  backgroundDecorations: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  decoration: {
    position: 'absolute',
  },
  gridDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  horizontalLine: {
    left: 0,
    right: 0,
    height: 1,
  },
  verticalLine: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  flatList: {
    flex: 1,
  },
  slideContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '90%',
    maxWidth: 400,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(123, 77, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  iconDecoration: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  iconDecorationOuter: {
    width: 150,
    height: 150,
    borderStyle: 'dashed',
  },
  iconDecorationInner: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    width: '100%',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 16,
    width: '100%',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 22,
    width: '100%',
  },
  bottomControls: {
    paddingBottom: 50,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  paginationDots: {
    flexDirection: 'row',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginRight: 8,
  },
  paginationDotActive: {
    backgroundColor: theme.dark.accent,
    width: 24,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingScreen;
