import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  Dimensions,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { MotiView, MotiText } from 'moti';
import { useStore } from '../store/useStore';
import { loginUser, initializeDemoUsers } from '../services/authService';
import { theme } from '../theme';
import { spacing } from '../theme';
import Watermark from '../components/ui/Watermark';
import TutorialMascot from '../components/ui/TutorialMascot';

const LoginScreen = ({ navigation }) => {
  const { setUser } = useStore();
  const { width, height } = useWindowDimensions(); // Responsivo a mudanças de orientação
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showMascot, setShowMascot] = useState(true);
  
  // Inicializar usuários de demonstração quando o componente for montado
  useEffect(() => {
    const setupDemoUsers = async () => {
      await initializeDemoUsers();
    };
    
    setupDemoUsers();
  }, []);
  
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha email e senha');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Usar o serviço de autenticação local
      const result = await loginUser(email, password);
      
      if (result.success) {
        setUser(result.user);
        // O AppNavigator vai detectar o usuário e mostrar a interface principal
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro de login:', error);
      setError('Falha no login. Tente novamente.');
      setIsLoading(false);
    }
  };
  
  const handleSignUp = () => {
    // Navegar para a tela de registro
    navigation.navigate('Register');
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Adaptar layout para diferentes tamanhos de tela
  const isTablet = width > 768;
  
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

          
          {showMascot && (
            <TutorialMascot
              message="Welcome to Wisebook! I'm Byte, your digital learning assistant. I'll help you navigate through your knowledge journey."
              onDismiss={() => setShowMascot(false)}
            />
          )}
          
          <ScrollView 
            contentContainerStyle={[
              styles.contentContainer,
              isTablet && styles.tabletContentContainer
            ]}
          >
            <MotiView
              from={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800 }}
              style={styles.logoContainer}
            >
              <Text style={[styles.logoText, isTablet && styles.tabletLogoText]}>WISEBOOK</Text>
              <Text style={[styles.tagline, isTablet && styles.tabletTagline]}>Your Knowledge Journey</Text>
            </MotiView>
            
            <MotiView
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 300 }}
              style={[styles.formContainer, isTablet && styles.tabletFormContainer]}
            >
              <View style={styles.inputContainer}>
                <Feather name="mail" size={20} color="rgba(255,255,255,0.7)" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  accessibilityLabel="Email field"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="rgba(255,255,255,0.7)" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  accessibilityLabel="Password field"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} accessibilityLabel="Show/hide password" style={styles.eyeButton}>
                  <Feather 
                    name={showPassword ? "eye" : "eye-off"} 
                    size={20} 
                    color="rgba(255,255,255,0.7)" 
                  />
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
              
              <TouchableOpacity 
                style={styles.forgotPassword}
                accessibilityLabel="Forgot password?"
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
                accessibilityLabel="Login button"
              >
                <LinearGradient
                  colors={['#7B4DFF', '#5E35C8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginButtonGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.loginButtonText}>Log in</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
              
              {/* Demo users information - Subtle version */}
              <Text style={styles.demoSimpleText}>Use demo@wisebook.app / demo123 to test</Text>
            </MotiView>
            
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 800, delay: 600 }}
              style={styles.signupContainer}
            >
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity 
                onPress={handleSignUp}
                accessibilityLabel="Sign up"
              >
                <Text style={styles.signupButton}>Sign up</Text>
              </TouchableOpacity>
            </MotiView>
          </ScrollView>
          
          {/* Watermark */}
          <Watermark />
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

// Using the actual ScrollView component from react-native

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
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  // Estilos específicos para tablets/desktop
  tabletContentContainer: {
    paddingHorizontal: spacing.xl,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 3,
  },
  tabletLogoText: {
    fontSize: 48,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.sm,
  },
  tabletTagline: {
    fontSize: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  tabletFormContainer: {
    maxWidth: 480,
    padding: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: spacing.borderRadiusLarge,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: spacing.borderRadiusMedium,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: spacing.sm,
    height: 44,
  },
  eyeButton: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
    padding: spacing.xs, // Área de toque maior
  },
  forgotPasswordText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  loginButton: {
    borderRadius: spacing.borderRadiusMedium,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    width: '100%',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    paddingVertical: spacing.md,
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
    marginVertical: spacing.md,
    width: '100%',
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  orText: {
    color: 'rgba(255,255,255,0.8)',
    marginHorizontal: spacing.md,
    fontSize: 14,
  },
  demoContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: spacing.borderRadiusMedium,
    padding: spacing.md,
    marginVertical: spacing.md,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  demoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  demoText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginVertical: 2,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  signupText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  signupButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    borderRadius: spacing.borderRadiusSmall,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 82, 82, 0.3)',
    width: '100%',
  },
  errorText: {
    color: '#FF5252',
    marginLeft: spacing.sm,
    fontSize: 14,
    flex: 1,
  },
  // Removidos elementos decorativos que estavam causando problemas visuais
  demoSimpleText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
});

export default LoginScreen;
