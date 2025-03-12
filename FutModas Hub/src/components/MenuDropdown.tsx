import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Gift, Heart, House, ShoppingBag, User } from 'lucide-react';
import { useUserProfile } from '../context/UserProfileContext';

interface MenuDropdownProps {
  onClose: () => void;
}

export default function MenuDropdown({ onClose }: MenuDropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { profile } = useUserProfile();

  // Fecha o menu quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      ref={menuRef}
      className="absolute top-16 left-4 bg-gray-800 rounded-lg shadow-lg w-64 z-50 border border-gray-700 animate-fadeIn"
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          {profile?.profilePicture ? (
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
              <img 
                src={profile.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-400" />
            </div>
          )}
          <div>
            <h3 className="font-medium">Meu Perfil</h3>
            {profile && (
              <p className="text-sm text-blue-400">{profile.points} pontos</p>
            )}
          </div>
        </div>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          <li>
            <Link 
              to="/" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={onClose}
            >
              <House className="h-5 w-5 text-gray-400" />
              <span>Início</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={onClose}
            >
              <User className="h-5 w-5 text-gray-400" />
              <span>Perfil</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/wishlist" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={onClose}
            >
              <Heart className="h-5 w-5 text-gray-400" />
              <span>Lista de Desejos</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/games" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={onClose}
            >
              <Gamepad2 className="h-5 w-5 text-gray-400" />
              <span>Jogos e Pontos</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/cart" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={onClose}
            >
              <ShoppingBag className="h-5 w-5 text-gray-400" />
              <span>Carrinho</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 bg-blue-500/10 m-2 rounded-lg">
        <div className="flex items-start gap-2">
          <Gift className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-400">Ganhe pontos!</h4>
            <p className="text-sm text-gray-300">Jogue e acumule pontos para obter descontos exclusivos nas camisetas!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
