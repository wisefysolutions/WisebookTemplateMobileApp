import { saveToStorage, loadFromStorage } from './storage';

// Chave para armazenar os usuários no AsyncStorage
const USERS_STORAGE_KEY = 'wisebook_users';
const CURRENT_USER_KEY = 'user';

// Carregar todos os usuários cadastrados
export const loadUsers = async () => {
  try {
    const users = await loadFromStorage(USERS_STORAGE_KEY);
    return users || [];
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    return [];
  }
};

// Salvar a lista de usuários
export const saveUsers = async (users) => {
  try {
    await saveToStorage(USERS_STORAGE_KEY, users);
    return true;
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
    return false;
  }
};

// Registrar um novo usuário
export const registerUser = async (userData) => {
  try {
    // Carregar usuários existentes
    const users = await loadUsers();
    
    // Verificar se o email já está em uso
    const existingUser = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) {
      return { success: false, message: 'Este email já está em uso.' };
    }
    
    // Gerar ID único para o usuário
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      level: 1,
      xp: 0,
      avatar: null
    };
    
    // Adicionar à lista e salvar
    users.push(newUser);
    await saveUsers(users);
    
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return { success: false, message: 'Erro ao registrar usuário. Tente novamente.' };
  }
};

// Login de usuário
export const loginUser = async (email, password) => {
  try {
    // Carregar usuários existentes
    const users = await loadUsers();
    
    // Encontrar usuário pelo email
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    // Verificar se o usuário existe e a senha está correta
    if (!user) {
      return { success: false, message: 'Usuário não encontrado.' };
    }
    
    if (user.password !== password) {
      return { success: false, message: 'Senha incorreta.' };
    }
    
    // Preparar objeto de usuário para o estado da aplicação (sem a senha)
    const loggedUser = { ...user };
    delete loggedUser.password;
    
    // Salvar usuário atual
    await saveToStorage(CURRENT_USER_KEY, loggedUser);
    
    return { success: true, user: loggedUser };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { success: false, message: 'Erro ao fazer login. Tente novamente.' };
  }
};

// Logout de usuário
export const logoutUser = async () => {
  try {
    await saveToStorage(CURRENT_USER_KEY, null);
    return { success: true };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return { success: false, message: 'Erro ao fazer logout.' };
  }
};

// Verificar usuário atual
export const getCurrentUser = async () => {
  try {
    const user = await loadFromStorage(CURRENT_USER_KEY);
    return user;
  } catch (error) {
    console.error('Erro ao verificar usuário atual:', error);
    return null;
  }
};

// Atualizar dados do usuário
export const updateUserData = async (userId, updatedData) => {
  try {
    // Carregar usuários existentes
    const users = await loadUsers();
    
    // Encontrar e atualizar o usuário
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return { success: false, message: 'Usuário não encontrado.' };
    }
    
    // Atualizar dados, mantendo os campos existentes
    const updatedUser = { ...users[userIndex], ...updatedData };
    users[userIndex] = updatedUser;
    
    // Salvar lista atualizada
    await saveUsers(users);
    
    // Se o usuário atualizado for o atual, atualizar no storage
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const loggedUser = { ...updatedUser };
      delete loggedUser.password; // Remover senha
      await saveToStorage(CURRENT_USER_KEY, loggedUser);
    }
    
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Erro ao atualizar dados do usuário:', error);
    return { success: false, message: 'Erro ao atualizar dados.' };
  }
};

// Inicializar alguns usuários de demonstração
export const initializeDemoUsers = async () => {
  const existingUsers = await loadUsers();
  
  // Só adiciona usuários de demonstração se não houver nenhum
  if (existingUsers.length === 0) {
    const demoUsers = [
      {
        id: '1',
        name: 'Demo User',
        email: 'demo@wisebook.app',
        password: 'demo123',
        level: 8,
        xp: 320,
        avatar: null,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Maria Silva',
        email: 'maria@wisebook.app',
        password: 'maria123',
        level: 5,
        xp: 180,
        avatar: null,
        createdAt: new Date().toISOString()
      }
    ];
    
    await saveUsers(demoUsers);
    return true;
  }
  
  return false;
};