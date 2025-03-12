import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  mainImage: string;
  additionalImages: string[];
  productName: string;
}

export default function ImageGallery({ mainImage, additionalImages, productName }: ImageGalleryProps) {
  // Combina a imagem principal com as adicionais
  const allImages = [mainImage, ...additionalImages];
  
  // Estado para controlar a imagem selecionada
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Estado para controlar o modal de zoom
  const [showZoom, setShowZoom] = useState(false);

  // Funções para navegar entre as imagens
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Função para selecionar uma imagem específica
  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Labels para cada imagem
  const imageLabels = ["Frente", "Costas", "Lateral", "Detalhe", "Etiqueta"];

  return (
    <div className="space-y-4">
      {/* Imagem principal com controles de navegação */}
      <div className="relative group">
        <div 
          className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden cursor-zoom-in"
          onClick={() => setShowZoom(true)}
        >
          <img 
            src={allImages[currentImageIndex]} 
            alt={`${productName} - ${imageLabels[currentImageIndex] || "Visualização"}`}
            className="w-full h-full object-contain bg-gray-900 rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Botões de navegação */}
        {allImages.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        
        {/* Ícone de zoom */}
        <div className="absolute top-3 right-3 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="h-5 w-5 text-white" />
        </div>
      </div>
      
      {/* Miniaturas das imagens */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`relative min-w-[80px] h-20 rounded-md overflow-hidden transition-all ${
                currentImageIndex === index 
                  ? 'ring-2 ring-blue-500 opacity-100 scale-105' 
                  : 'opacity-70 hover:opacity-100'
              }`}
              aria-label={`Ver ${imageLabels[index] || "imagem"}`}
            >
              <img 
                src={img} 
                alt={`${productName} - miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity"></div>
              <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-1">
                {imageLabels[index] || `Imagem ${index + 1}`}
              </span>
            </button>
          ))}
        </div>
      )}
      
      {/* Modal de zoom */}
      {showZoom && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" 
          onClick={() => setShowZoom(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
            <img 
              src={allImages[currentImageIndex]} 
              alt={`${productName} - ampliada`}
              className="max-w-full max-h-full object-contain"
            />
            
            {allImages.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            
            <button 
              className="absolute top-4 right-4 text-white text-lg bg-black/60 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => setShowZoom(false)}
              aria-label="Fechar zoom"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
