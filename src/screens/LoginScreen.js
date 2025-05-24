import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { MotiView, MotiText } from 'moti';
import { useStore } from '../store/useStore';
import { saveToStorage } from '../services/storage';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { setUser } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(async () => {
      try {
        // For demo purposes, any login attempt is successful
        const userData = {
          id: '1',
          name: 'Demo User',
          email: email,
          avatar: null,
          level: 8,
          xp: 320
        };
        
        // Save user to storage and store
        await saveToStorage('user', userData);
        setUser(userData);
      } catch (error) {
        setError('Login failed. Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };
  
  const handleSignUp = () => {
    // For demo, we'll use the same login functionality
    handleLogin();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.dark.gradientStart, theme.dark.gradientEnd]}
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidView}
        >
          {/* Animated background elements */}
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ type: 'timing', duration: 1000 }}
            style={[styles.circleDecoration, { top: height * 0.1, left: width * 0.2 }]}
          />
          
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ type: 'timing', duration: 1200, delay: 200 }}
            style={[styles.circleDecoration, { top: height * 0.5, right: -width * 0.2 }]}
          />
          
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ type: 'timing', duration: 1000 }}
            style={styles.gridDecoration}
          >
            {/* Grid lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={`h-line-${i}`} style={[styles.gridLine, styles.horizontalLine, { top: height * (i / 10) }]} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={`v-line-${i}`} style={[styles.gridLine, styles.verticalLine, { left: width * (i / 10) }]} />
            ))}
          </MotiView>
          
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <MotiView
              from={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800 }}
              style={styles.logoContainer}
            >
              <Text style={styles.logoText}>WISEBOOK</Text>
              <Text style={styles.tagline}>Elevate Your Knowledge</Text>
            </MotiView>
            
            <MotiView
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 300 }}
              style={styles.formContainer}
            >
              <View style={styles.inputContainer}>
                <Feather name="user" size={20} color="rgba(255,255,255,0.7)" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="rgba(255,255,255,0.7)" />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <TouchableOpacity>
                  <Feather name="eye-off" size={20} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>
              </View>
              
              {error ? (
                <MotiView
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'timing', duration: 300 }}
                  style={styles.errorContainer}
                >
                  <Feather name="alert-circle" size={16} color="#FF5252" />
                  <Text style={styles.errorText}>{error}</Text>
                </MotiView>
              ) : null}
              
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#7B4DFF', '#5E35C8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginButtonGradient}
                >
                  {isLoading ? (
                    <MotiView
                      animate={{ rotate: '360deg' }}
                      transition={{
                        type: 'timing',
                        duration: 1000,
                        loop: true,
                      }}
                    >
                      <Feather name="loader" size={20} color="#fff" />
                    </MotiView>
                  ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={styles.orContainer}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.orLine} />
              </View>
              
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Feather name="github" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Feather name="twitter" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Feather name="linkedin" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </MotiView>
            
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 800, delay: 600 }}
              style={styles.signupContainer}
            >
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signupButton}>Sign Up</Text>
              </TouchableOpacity>
            </MotiView>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const ScrollView = ({ children, contentContainerStyle }) => {
  return (
    <View style={contentContainerStyle}>
      {children}
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
  keyboardAvoidView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  orText: {
    color: 'rgba(255,255,255,0.8)',
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  signupButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 82, 82, 0.3)',
  },
  errorText: {
    color: '#FF5252',
    marginLeft: 8,
    fontSize: 14,
  },
  circleDecoration: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#7B4DFF',
    opacity: 0.3,
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
});

export default LoginScreen;
