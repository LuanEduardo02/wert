import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();

  const handleLogin = (provider: 'google' | 'twitter' | 'phone') => {
    login(provider);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-gray-900 rounded-xl p-6 w-full max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">
              {isLogin ? 'Login' : 'Cadastro'}
            </Dialog.Title>
            <button onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {isLogin ? (
            <LoginForm handleLogin={handleLogin} />
          ) : (
            <SignUpForm onClose={onClose} />
          )}

          <div className="mt-6 text-center">
            <span className="text-gray-400">
              {isLogin ? 'Não possui uma conta?' : 'Já possui uma conta?'}
            </span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-400 hover:text-blue-300"
            >
              {isLogin ? 'Cadastre-se' : 'Fazer login'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
