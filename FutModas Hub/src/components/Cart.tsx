import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
        <p className="text-gray-400">Adicione alguns produtos para começar</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Seu Carrinho</h1>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 bg-gray-900 p-4 rounded-lg">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-400">{item.team}</p>
              {item.discountPrice ? (
                <div>
                  <p className="text-red-500 line-through">R$ {item.price.toFixed(2)}</p>
                  <p className="text-green-500 font-bold">R$ {item.discountPrice.toFixed(2)}</p>
                </div>
              ) : (
                <p className="font-bold">R$ {item.price.toFixed(2)}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 rounded-full hover:bg-gray-700"
              >
                <Minus className="h-4 w-4" />
              </button>
              
              <span className="w-8 text-center">{item.quantity}</span>
              
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-500 hover:bg-gray-700 rounded-full"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-900 p-6 rounded-lg">
        <div className="flex justify-between text-xl font-bold mb-4">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          Prosseguir para o Pagamento
        </button>
      </div>
    </div>
  );
}
