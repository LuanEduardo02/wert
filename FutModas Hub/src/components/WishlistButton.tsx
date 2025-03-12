import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';

interface WishlistButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function WishlistButton({ product, size = 'md', className = '' }: WishlistButtonProps) {
  const { user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  // Carregar status da wishlist do localStorage
  useEffect(() => {
    if (user) {
      const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
      setIsInWishlist(wishlist.some((item: Product) => item.id === product.id));
    }
  }, [user, product.id]);

  const toggleWishlist = () => {
    if (!user) {
      toast.info('Faça login para adicionar produtos à sua lista de desejos');
      return;
    }

    const wishlistKey = `wishlist_${user.id}`;
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
    
    if (isInWishlist) {
      // Remover da wishlist
      const newWishlist = wishlist.filter((item: Product) => item.id !== product.id);
      localStorage.setItem(wishlistKey, JSON.stringify(newWishlist));
      setIsInWishlist(false);
      toast.success('Produto removido da lista de desejos');
    } else {
      // Adicionar à wishlist
      wishlist.push(product);
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      setIsInWishlist(true);
      toast.success('Produto adicionado à lista de desejos');
    }
  };

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist();
      }}
      className={`${className} transition-colors duration-200`}
      aria-label={isInWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart 
        className={`${sizeClasses[size]} ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}`} 
      />
    </button>
  );
}
