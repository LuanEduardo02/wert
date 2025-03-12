import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Dados dos banners
const banners = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=1920&auto=format&fit=crop",
    altText: "Nova coleção Premier League",
    title: "Nova Coleção Premier League 2024/25",
    description: "As camisas mais recentes dos principais times ingleses com 15% de desconto",
    link: "/?category=Premier%20League"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?q=80&w=1920&auto=format&fit=crop",
    altText: "Promoção camisas do Brasileirão",
    title: "Promoção Especial Brasileirão",
    description: "Todas as camisas dos times brasileiros com até 30% de desconto",
    link: "/?category=Brasileirão"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1920&auto=format&fit=crop",
    altText: "Coleção retrô em promoção",
    title: "Coleção Retrô",
    description: "Reviva a nostalgia do futebol com nossa coleção de camisas históricas",
    link: "/?category=Retrô"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=1920&auto=format&fit=crop",
    altText: "Frete grátis em compras acima de R$300",
    title: "Frete Grátis",
    description: "Em compras acima de R$300 para todo o Brasil",
    link: "/"
  }
];

// Componente do carrossel de banners
export default function BannerCarousel() {
  // Estados para controlar o carrossel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  // Função para avançar para o próximo slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
  }, []);

  // Função para voltar para o slide anterior
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  }, []);

  // Gerencia eventos de toque para dispositivos móveis
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsTouching(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;
    
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Limiar para considerar como swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsTouching(false);
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  // Rotação automática dos slides
  useEffect(() => {
    if (!isHovering && !isTouching) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, isHovering, isTouching]);

  return (
    <div 
      className="relative overflow-hidden rounded-lg mb-10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Container dos slides */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-[300px] md:h-[450px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full relative">
            <a href={banner.link} className="block h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10"></div>
              <img 
                src={banner.imageUrl} 
                alt={banner.altText} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">{banner.title}</h2>
                <p className="text-white text-lg md:text-xl drop-shadow-md max-w-md">{banner.description}</p>
                <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
                  Ver oferta
                </button>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-30 transition-all duration-300 hover:scale-110"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-30 transition-all duration-300 hover:scale-110"
        aria-label="Próximo"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicadores de slide (bolinhas) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
