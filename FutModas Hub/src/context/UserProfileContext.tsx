import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserProfile, Game } from '../types';
import { useAuth } from './AuthContext';

// Interface para o contexto de perfil do usuário
interface UserProfileContextType {
  profile: UserProfile | null;
  updateProfilePicture: (picture: string) => void;
  addPoints: (points: number) => void;
  useDiscount: (productId: number) => boolean;
  availableGames: Game[];
  markGameAsPlayed: (gameId: string) => void;
  canUsePoints: (pointsToUse: number) => boolean;
}

// Lista de jogos disponíveis
const GAMES: Game[] = [
  {
    id: 'memory',
    name: 'Jogo da Memória',
    description: 'Encontre os pares de camisetas idênticas o mais rápido possível.',
    image: 'https://placehold.co/400x300/orange/white?text=Jogo+da+Memoria',
    route: '/games/memory',
    pointsReward: 10,
    played: false
  },
  {
    id: 'quiz',
    name: 'Quiz do Futebol',
    description: 'Teste seus conhecimentos sobre futebol e ganhe pontos!',
    image: 'https://placehold.co/400x300/green/white?text=Quiz+do+Futebol',
    route: '/games/quiz',
    pointsReward: 10,
    played: false
  }
];

// Criação do contexto
const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

// Provider do perfil do usuário
export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [availableGames, setAvailableGames] = useState<Game[]>(GAMES);

  // Carrega o perfil do localStorage quando o usuário muda
  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
        
        // Atualiza o estado dos jogos com base no perfil salvo
        const savedGames = localStorage.getItem(`games_${user.id}`);
        if (savedGames) {
          setAvailableGames(JSON.parse(savedGames));
        } else {
          // Reset games if user is new
          setAvailableGames(GAMES);
          localStorage.setItem(`games_${user.id}`, JSON.stringify(GAMES));
        }
      } else {
        // Cria perfil padrão para novo usuário
        const newProfile: UserProfile = {
          points: 0,
          profilePicture: undefined,
          discountsUsed: []
        };
        setProfile(newProfile);
        localStorage.setItem(`profile_${user.id}`, JSON.stringify(newProfile));
        
        // Reset games for new user
        setAvailableGames(GAMES);
        localStorage.setItem(`games_${user.id}`, JSON.stringify(GAMES));
      }
    } else {
      setProfile(null);
      setAvailableGames(GAMES);
    }
  }, [user]);

  // Atualiza a foto de perfil
  const updateProfilePicture = (picture: string) => {
    if (!user) return;
    
    const updatedProfile = { 
      ...profile!,
      profilePicture: picture 
    };
    
    setProfile(updatedProfile);
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
  };

  // Adiciona pontos ao perfil
  const addPoints = (points: number) => {
    if (!user || !profile) return;
    
    const updatedProfile = { 
      ...profile,
      points: profile.points + points 
    };
    
    setProfile(updatedProfile);
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
  };

  // Marca um jogo como jogado
  const markGameAsPlayed = (gameId: string) => {
    if (!user) return;
    
    const updatedGames = availableGames.map(game => 
      game.id === gameId ? { ...game, played: true } : game
    );
    
    setAvailableGames(updatedGames);
    localStorage.setItem(`games_${user.id}`, JSON.stringify(updatedGames));
  };

  // Verifica se o usuário pode usar os pontos
  const canUsePoints = (pointsToUse: number) => {
    if (!profile) return false;
    return profile.points >= pointsToUse;
  };

  // Usa desconto em um produto
  const useDiscount = (productId: number) => {
    if (!user || !profile) return false;
    
    // Verifica se o desconto já foi usado neste produto
    if (profile.discountsUsed.includes(productId)) {
      return false;
    }
    
    // 100 pontos = 15% de desconto
    if (profile.points < 100) {
      return false;
    }
    
    const updatedProfile = { 
      ...profile,
      points: profile.points - 100,
      discountsUsed: [...profile.discountsUsed, productId]
    };
    
    setProfile(updatedProfile);
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
    return true;
  };

  return (
    <UserProfileContext.Provider value={{ 
      profile, 
      updateProfilePicture, 
      addPoints, 
      useDiscount,
      availableGames,
      markGameAsPlayed,
      canUsePoints
    }}>
      {children}
    </UserProfileContext.Provider>
  );
}

// Hook para usar o contexto de perfil
export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile deve ser usado dentro de um UserProfileProvider');
  }
  return context;
}
