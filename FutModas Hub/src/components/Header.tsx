import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EllipsisVertical, Search, Shirt, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useUserProfile } from '../context/UserProfileContext';
import AuthModal from './AuthModal';
import MenuDropdown from './MenuDropdown';

export default function Header() {
  const [showAuth, setShowAuth] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuth();
  const { items } = useCart();
  const { profile } = useUserProfile();
  const navigate = useNavigate();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMenu}
              className="text-white hover:text-blue-400 transition-colors"
              aria-label="Menu"
            >
              <EllipsisVertical className="h-6 w-6" />
            </button>
            
            {showMenu && <MenuDropdown onClose={() => setShowMenu(false)} />}
            
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-blue-400 transition-colors">
              <Shirt className="h-7 w-7 text-blue-500" />
              <span>FutModas</span>
            </Link>
          </div>

          <div className="flex-1 mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar camisetas..."
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-white">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center text-white hover:text-gray-300"
            >
              {profile?.profilePicture ? (
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-blue-500">
                  <img 
                    src={profile.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <User className="h-6 w-6" />
              )}
              <span className="ml-2">{user ? user.name : 'Login'}</span>
              {profile && profile.points > 0 && (
                <span className="ml-2 text-xs bg-blue-500 rounded-full px-2 py-0.5">
                  {profile.points} pts
                </span>
              )}
            </button>

            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </header>
  );
}
