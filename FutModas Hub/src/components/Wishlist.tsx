import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function Wishlist() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    if (user) {
      const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
      setWishlistItems(wishlist);
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Você precisa estar logado</h2>
        <p className="text-gray-400 mb-4">Faça login para ver sua lista de desejos</p>
      </div>
    );
  }

  const removeFromWishlist = (productId: number) => {
    const newWishlist = wishlistItems.filter(item => item.id !== productId);
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(newWishlist));
    setWishlistItems(newWishlist);
    toast.success('Produto removido da lista de desejos');
  };

  const addItemToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
    toast.success('Produto adicionado ao carrinho');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Sua lista de desejos está vazia</h2>
        <p className="text-gray-400 mb-6">Adicione produtos à sua lista de desejos para encontrá-los facilmente depois</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Continuar Comprando
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-500" />
        Minha Lista de Desejos ({wishlistItems.length})
      </h1>

      <div className="space-y-4">
        {wishlistItems.map(product => (
          <div key={product.id} className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg">
            <Link to={`/product/${product.id}`} className="flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-24 h-24 object-cover rounded"
              />
            </Link>

            <div className="flex-1">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold hover:text-blue-400">{product.name}</h3>
              </Link>
              <p className="text-gray-400">{product.team}</p>
              {product.discountPrice ? (
                <div>
                  <p className="text-red-500 line-through">R$ {product.price.toFixed(2)}</p>
                  <p className="text-green-500 font-bold">R$ {product.discountPrice.toFixed(2)}</p>
                </div>
              ) : (
                <p className="font-bold">R$ {product.price.toFixed(2)}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => addItemToCart(product)}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                aria-label="Adicionar ao carrinho"
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="p-2 bg-gray-700 hover:bg-gray-600 text-red-400 rounded-full"
                aria-label="Remover da lista de desejos"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Continuar Comprando
        </button>
      </div>
    </div>
  );
}
