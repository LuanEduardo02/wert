interface LoginFormProps {
  handleLogin: (provider: 'google' | 'twitter' | 'phone') => void;
}

export default function LoginForm({ handleLogin }: LoginFormProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={() => handleLogin('google')}
        className="w-full py-2 px-4 bg-white text-gray-900 rounded-lg flex items-center justify-center font-medium hover:bg-gray-100"
      >
        Continuar com Google
      </button>
      
      <button
        onClick={() => handleLogin('twitter')}
        className="w-full py-2 px-4 bg-blue-400 text-white rounded-lg flex items-center justify-center font-medium hover:bg-blue-500"
      >
        Continuar com Twitter
      </button>
      
      <button
        onClick={() => handleLogin('phone')}
        className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg flex items-center justify-center font-medium hover:bg-gray-600"
      >
        Continuar com Celular
      </button>
    </div>
  );
}
