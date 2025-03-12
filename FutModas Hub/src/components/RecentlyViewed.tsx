import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Clock } from 'lucide-react';

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentProducts(recent);
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <div className="mt-12 bg-gray-900 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-blue-400" />
        <h2 className="text-xl font-semibold">Vistos Recentemente</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentProducts.slice(0, 6).map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="block group"
          >
            <div className="relative rounded-md overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.discountPrice && (
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                  {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                </div>
              )}
            </div>
            <h3 className="mt-2 text-sm font-medium truncate group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-gray-400 truncate">{product.team}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
