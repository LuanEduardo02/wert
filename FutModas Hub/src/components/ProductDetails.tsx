import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Gift, ShoppingCart, Star, StarHalf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import ImageGallery from './ImageGallery';
import RecentlyViewed from './RecentlyViewed';
import ShareButtons from './ShareButtons';
import { Product } from '../types';
import SizeGuide from './SizeGuide';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { profile, useDiscount, canUsePoints } = useUserProfile();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [applyingDiscount, setApplyingDiscount] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  const product = PRODUCTS.find(p => p.id === Number(id));

  // Armazena este produto na lista de visualizados recentemente
  useEffect(() => {
    if (product) {
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      
      // Remove o produto atual da lista se já existir
      const filteredList = recentlyViewed.filter((p: Product) => p.id !== product.id);
      
      // Adiciona o produto ao início da lista
      const newList = [product, ...filteredList].slice(0, 10); // Mantém apenas 10 produtos
      localStorage.setItem('recentlyViewed', JSON.stringify(newList));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
        <p className="text-gray-400">O produto que você procura não está disponível.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Voltar para a Home
        </button>
      </div>
    );
  }

  const averageRating = product.reviews 
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length 
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho");
      return;
    }
    addToCart({ ...product, quantity: 1 });
  };

  const handleCheckout = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho");
      return;
    }
    addToCart({ ...product, quantity: 1 });
    navigate('/cart');
  };

  const handleApplyDiscount = () => {
    if (!user) {
      alert("Você precisa estar logado para usar pontos");
      return;
    }
    
    if (!canUsePoints(100)) {
      alert("Você precisa de pelo menos 100 pontos para aplicar um desconto");
      return;
    }
    
    // Aplica o desconto
    const discountApplied = useDiscount(product.id);
    if (discountApplied) {
      setApplyingDiscount(true);
      setTimeout(() => {
        setApplyingDiscount(false);
        // Forçar re-render
        navigate(0);
      }, 1500);
    } else {
      alert("Você já usou um desconto neste produto");
    }
  };

  // Verifica se o desconto já foi aplicado neste produto
  const discountAlreadyUsed = profile?.discountsUsed.includes(product.id);

  // Preço com desconto de pontos (15% off se tiver pontos suficientes)
  const pointsDiscountPrice = product.discountPrice 
    ? product.discountPrice * 0.85 
    : product.price * 0.85;

  // Determina se deve mostrar a galeria ou apenas a imagem única
  const hasMultipleImages = product.images && product.images.length > 0;

  // Se o produto não tem imagens adicionais, criamos algumas fictícias
  if (!product.images) {
    product.images = [
      product.image,
      `https://placehold.co/500x500/gray/white?text=Costas+${product.team}`,
      `https://placehold.co/500x500/gray/white?text=Lateral+${product.team}`,
      `https://placehold.co/500x500/gray/white?text=Detalhe+${product.team}`
    ];
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ImageGallery mainImage={product.image} additionalImages={product.images} productName={product.name} />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-400 mb-2">{product.team} - {product.league}</p>
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, index) => (
                index < Math.floor(averageRating) ? 
                  <Star key={index} className="h-5 w-5 text-yellow-400 fill-current" /> :
                  index === Math.floor(averageRating) && averageRating % 1 >= 0.5 ?
                    <StarHalf key={index} className="h-5 w-5 text-yellow-400 fill-current" /> :
                    <Star key={index} className="h-5 w-5 text-gray-400" />
              ))}
              <span className="text-gray-400">({product.reviews?.length || 0} avaliações)</span>
            </div>
            <ShareButtons product={product} />
          </div>

          <p className="text-gray-300">{product.description || `Camisa oficial do ${product.team} para a temporada 2023/24. Feita com materiais de alta qualidade para conforto e durabilidade.`}</p>

          <div>
            <p className="font-semibold mb-2">Especificações:</p>
            <ul className="text-gray-300 space-y-1">
              <li>Material: {product.material}</li>
              <li>Tipo: {product.type}</li>
              <li>Time: {product.team}</li>
              <li>Liga: {product.league}</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">Tamanhos disponíveis:</p>
              <button 
                onClick={() => setShowSizeGuide(true)}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Guia de tamanhos
              </button>
            </div>
            <div className="flex gap-2">
              {product.sizes?.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    selectedSize === size 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Preço com opção de desconto por pontos */}
          <div className="space-y-2">
            {discountAlreadyUsed ? (
              // Mostra o preço com desconto de pontos já aplicado
              <>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-green-400">Desconto de pontos aplicado!</p>
                  <Gift className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-3xl font-bold text-green-500">
                  R$ {pointsDiscountPrice.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">
                  Desconto de 15% aplicado com sucesso!
                </p>
              </>
            ) : product.discountPrice ? (
              // Produto já tem desconto normal
              <>
                <p className="text-xl text-red-500 line-through">
                  R$ {product.price.toFixed(2)}
                </p>
                <p className="text-3xl font-bold text-green-500">
                  R$ {product.discountPrice.toFixed(2)}
                </p>
                {user && profile && profile.points >= 100 && (
                  <div className="mt-2">
                    <button
                      onClick={handleApplyDiscount}
                      disabled={applyingDiscount}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    >
                      <Gift className="h-4 w-4" />
                      <span>Usar 100 pontos para -15% (R$ {pointsDiscountPrice.toFixed(2)})</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Preço normal sem desconto
              <>
                <p className="text-3xl font-bold">
                  R$ {product.price.toFixed(2)}
                </p>
                {user && profile && profile.points >= 100 && (
                  <div className="mt-2">
                    <button
                      onClick={handleApplyDiscount}
                      disabled={applyingDiscount}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                    >
                      <Gift className="h-4 w-4" />
                      <span>Usar 100 pontos para -15% (R$ {pointsDiscountPrice.toFixed(2)})</span>
                    </button>
                  </div>
                )}
              </>
            )}
            
            {applyingDiscount && (
              <div className="text-green-400 animate-pulse">
                Aplicando desconto...
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              Adicionar ao Carrinho
            </button>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors duration-200"
            >
              <CreditCard className="h-6 w-6" />
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Avaliações</h2>
          <div className="space-y-4">
            {product.reviews.map(review => (
              <div key={review.id} className="bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-2">{review.comment}</p>
                <p className="text-gray-400 text-sm">- {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Produtos visualizados recentemente */}
      <RecentlyViewed />

      {/* Modal guia de tamanhos */}
      <SizeGuide open={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </div>
  );
}
