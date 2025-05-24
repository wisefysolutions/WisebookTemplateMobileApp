import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useStore } from '../store/useStore';
import { registerUser } from '../services/authService';
import { theme } from '../theme';
import { spacing } from '../theme';

const RegisterScreen = ({ navigation }) => {
  const { setUser } = useStore();
  const { width, height } = useWindowDimensions();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Adaptar layout para diferentes tamanhos de tela
  const isTablet = width > 768;
  
  const handleRegister = async () => {
    // Validações
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um email válido');
      return;
    }
    
    // Validação de senha (mínimo 6 caracteres)
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Chamar serviço de registro
      const result = await registerUser({
        name,
        email,
        password
      });
      
      if (result.success) {
        // Registrado com sucesso - fazer login automático
        setUser(result.user);
        // O AppNavigator vai detectar o usuário e mostrar a interface principal
      } else {
        setError(result.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError('Falha no registro. Tente novamente.');
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          {/* Elementos de fundo animados */}
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ type: 'timing', duration: 1000 }}
            style={[styles.circleDecoration, { top: '10%', left: '20%' }]}
          />
          
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ type: 'timing', duration: 1200, delay: 200 }}
            style={[styles.circleDecoration, { top: '50%', right: '-20%' }]}
          />
          
          {/* Grade de fundo */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ type: 'timing', duration: 1000 }}
            style={styles.gridDecoration}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={`h-line-${i}`} style={[styles.gridLine, styles.horizontalLine, { top: `${i * 10}%` }]} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={`v-line-${i}`} style={[styles.gridLine, styles.verticalLine, { left: `${i * 10}%` }]} />
            ))}
          </MotiView>
          
          <ScrollView 
            contentContainerStyle={[
              styles.contentContainer,
              isTablet && styles.tabletContentContainer
            ]}
          >
            {/* Cabeçalho com botão de voltar */}
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                accessibilityLabel="Voltar para a tela de login"
              >
                <Feather name="arrow-left" size={24} color="#fff" />
              </TouchableOpacity>
              
              <Text style={styles.headerTitle}>Criar Conta</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <MotiView
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 300 }}
              style={[styles.formContainer, isTablet && styles.tabletFormContainer]}
            >
              {/* Formulário de cadastro */}
              <View style={styles.inputContainer}>
                <Feather name="user" size={20} color="rgba(255,255,255,0.7)" />
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  accessibilityLabel="Campo de nome"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Feather name="mail" size={20} color="rgba(255,255,255,0.7)" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  accessibilityLabel="Campo de email"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="rgba(255,255,255,0.7)" />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  accessibilityLabel="Campo de senha"
                />
                <TouchableOpacity 
                  onPress={togglePasswordVisibility}
                  accessibilityLabel="Mostrar/esconder senha"
                >
                  <Feather 
                    name={showPassword ? "eye" : "eye-off"} 
                    size={20} 
                    color="rgba(255,255,255,0.7)" 
                  />
                </TouchableOpacity>
              </View>
              
              <View style={styles.inputContainer}>
                <Feather name="check-circle" size={20} color="rgba(255,255,255,0.7)" />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar senha"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  accessibilityLabel="Campo de confirmação de senha"
                />
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
              
              {/* Termos de uso */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  Ao se cadastrar, você concorda com nossos{' '}
                  <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
                  <Text style={styles.termsLink}>Política de Privacidade</Text>.
                </Text>
              </View>
              
              {/* Botão de cadastro */}
              <TouchableOpacity
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
                accessibilityLabel="Botão de cadastro"
              >
                <LinearGradient
                  colors={['#7B4DFF', '#5E35C8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.registerButtonGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.registerButtonText}>Criar Conta</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </MotiView>
            
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 800, delay: 600 }}
              style={styles.loginContainer}
            >
              <Text style={styles.loginText}>Já tem uma conta?</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                accessibilityLabel="Voltar para login"
              >
                <Text style={styles.loginButton}>Entrar</Text>
              </TouchableOpacity>
            </MotiView>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
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
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  // Estilos específicos para tablets/desktop
  tabletContentContainer: {
    paddingHorizontal: spacing.xl,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.xl,
    paddingVertical: spacing.sm,
  },
  backButton: {
    padding: spacing.xs,
    borderRadius: spacing.borderRadiusMedium,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: spacing.sm,
    fontSize: 16,
    paddingVertical: spacing.sm,
  },
  termsContainer: {
    marginVertical: spacing.md,
  },
  termsText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#7B4DFF',
    textDecorationLine: 'underline',
  },
  registerButton: {
    borderRadius: spacing.borderRadiusMedium,
    overflow: 'hidden',
    marginVertical: spacing.md,
    width: '100%',
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  loginButton: {
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
  circleDecoration: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    borderRadius: 1000, // Valor alto para garantir um círculo
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

export default RegisterScreen;