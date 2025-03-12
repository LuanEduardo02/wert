import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Games from './components/Games';
import MemoryGame from './components/games/MemoryGame';
import QuizGame from './components/games/QuizGame';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { UserProfileProvider } from './context/UserProfileContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componente principal da aplicação
// Define as rotas e envolve a aplicação com os providers necessários
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProfileProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/memory" element={<MemoryGame />} />
                <Route path="/games/quiz" element={<QuizGame />} />
              </Route>
            </Routes>
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </CartProvider>
        </UserProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
