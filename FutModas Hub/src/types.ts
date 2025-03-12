// Definição dos tipos básicos usados na aplicação

// Tipo do produto
export interface Product {
  id: number;
  name: string;
  team: string;
  league: string;
  price: number;
  discountPrice?: number; // Preço com desconto (opcional)
  image: string;
  images?: string[]; // Array de imagens adicionais para diferentes ângulos
  description?: string;
  sizes?: string[]; // Tamanhos disponíveis
  reviews?: Review[]; // Avaliações do produto
  material?: string;
  type: string;
}

// Tipo das avaliações/reviews
export interface Review {
  id: number;
  rating: number; // 1-5 estrelas
  comment: string;
  author: string;
}

// Tipo para itens no carrinho (produto + quantidade)
export interface CartItem extends Product {
  quantity: number;
}

// Tipo para usuários do sistema
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Tipo para o perfil do usuário com pontos e foto
export interface UserProfile {
  points: number;
  profilePicture?: string;
  discountsUsed: number[];
}

// Tipo para um jogo disponível
export interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
  route: string;
  pointsReward: number;
  played: boolean;
}

// Tipo para cartão do jogo da memória
export interface MemoryCard {
  id: number;
  team: string;
  image: string;
  uniqueId: string;
  isFlipped: boolean;
  isMatched: boolean;
}
