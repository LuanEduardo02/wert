import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../types';

// Interface para o contexto do carrinho
interface CartContextType {
  items: CartItem[]; // Lista de itens no carrinho
  addToCart: (item: CartItem) => void; // Função para adicionar item
  removeFromCart: (id: number) => void; // Função para remover item
  updateQuantity: (id: number, quantity: number) => void; // Função para atualizar quantidade
  clearCart: () => void; // Função para limpar carrinho
}

// Criação do contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider do carrinho que gerencia o estado
export function CartProvider({ children }: { children: ReactNode }) {
  // Estado do carrinho - carrega do localStorage se existir
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Salva carrinho no localStorage quando muda
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Adiciona item ao carrinho
  const addToCart = (item: CartItem) => {
    setItems(current => {
      // Verifica se o item já existe no carrinho
      const existingItem = current.find(i => i.id === item.id);
      if (existingItem) {
        // Se já existe, aumenta a quantidade
        return current.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Se não existe, adiciona com quantidade 1
      return [...current, { ...item, quantity: 1 }];
    });
  };

  // Remove item do carrinho
  const removeFromCart = (id: number) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  // Atualiza quantidade de um item
  const updateQuantity = (id: number, quantity: number) => {
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Limpa o carrinho
  const clearCart = () => {
    setItems([]);
  };

  // Retorna o provider com os valores
  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar o contexto do carrinho
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
