import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import WishlistButton from './WishlistButton';

// Props para o componente
interface ProductCardProps {
  product: Product;
}

// Cartão de produto usado na Home
export default function ProductCard({ product }: ProductCardProps) {
  // Hook para adicionar ao carrinho
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg group">
      {/* Link para detalhes do produto */}
      <Link to={`/product/${product.id}`} className="relative block">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <WishlistButton 
          product={product} 
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-800/50 hover:bg-gray-800"
        />
        {/* Badge de desconto */}
        {product.discountPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
            {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
          </div>
        )}
      </Link>
      
      {/* Informações do produto */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-400">{product.name}</h3>
        </Link>
        <p className="text-gray-400 mb-2">{product.team}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            {/* Preço com desconto (se houver) */}
            {product.discountPrice ? (
              <>
                <span className="text-red-500 line-through text-sm">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className="text-green-500 text-xl font-bold">
                  R$ {product.discountPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold">R$ {product.price.toFixed(2)}</span>
            )}
          </div>
          <span className="text-sm text-gray-400">{product.league}</span>
        </div>
        
        {/* Botão de adicionar ao carrinho */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart({ ...product, quantity: 1 });
          }}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <ShoppingCart className="h-5 w-5" />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
