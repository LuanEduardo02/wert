import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

// Dados do formulário de cadastro
interface UserFormData {
  name: string;
  email: string;
  password: string;
  cpf?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

// Interface para o contexto de autenticação
interface AuthContextType {
  user: User | null; // Usuário atual ou null se não logado
  login: (provider: 'google' | 'twitter' | 'phone') => void; // Função para login
  logout: () => void; // Função para logout
  register: (data: UserFormData) => void; // Função para cadastro
  updateUserProfile: (data: Partial<User>) => void; // Função para atualizar dados do usuário
}

// Criação do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider que gerencia a autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  // Estado do usuário - carrega do localStorage se existir
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Salva usuário no localStorage quando muda
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Função de login (simulada)
  const login = (provider: 'google' | 'twitter' | 'phone') => {
    // Em um app real, aqui teria a conexão com serviço de autenticação
    setUser({
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
    });
  };

  // Função de cadastro (simulada)
  const register = (data: UserFormData) => {
    // Em um app real, aqui teria a conexão com serviço de autenticação
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.name,
      email: data.email,
    };
    
    setUser(newUser);
  };

  // Função para atualizar dados do perfil do usuário
  const updateUserProfile = (data: Partial<User>) => {
    if (!user) return;
    
    // Atualiza os dados do usuário mantendo os existentes
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    
    // Em um app real, aqui teria a conexão com o backend
    // para persistir as alterações no banco de dados
  };

  // Função de logout
  const logout = () => {
    setUser(null);
  };

  // Retorna o provider com os valores
  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
