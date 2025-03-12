import { Facebook, Link, Twitter } from 'lucide-react';
import { toast } from 'react-toastify';

interface ShareButtonsProps {
  product: {
    id: number;
    name: string;
    image: string;
  };
}

export default function ShareButtons({ product }: ShareButtonsProps) {
  const currentUrl = window.location.href;
  
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = `Confira esta camisa na FutModas: ${product.name}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        toast.success('Link copiado para a área de transferência!');
      })
      .catch(() => {
        toast.error('Não foi possível copiar o link');
      });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400">Compartilhar:</span>
      <button
        onClick={shareOnFacebook}
        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-full transition-colors"
        aria-label="Compartilhar no Facebook"
      >
        <Facebook className="h-4 w-4" />
      </button>
      <button
        onClick={shareOnTwitter}
        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-full transition-colors"
        aria-label="Compartilhar no Twitter"
      >
        <Twitter className="h-4 w-4" />
      </button>
      <button
        onClick={copyToClipboard}
        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-full transition-colors"
        aria-label="Copiar link"
      >
        <Link className="h-4 w-4" />
      </button>
    </div>
  );
}
