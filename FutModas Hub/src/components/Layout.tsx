import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { useEffect } from 'react';

// Layout principal da aplicação
export default function Layout() {
  // Carrega a fonte do Google Fonts
  useEffect(() => {
    // Cria elemento link para a fonte
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);

    // Aplica a fonte ao body
    document.body.style.fontFamily = "'Poppins', sans-serif";

    // Limpa ao desmontar o componente
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
