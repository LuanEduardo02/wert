import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "+55 41 9633-6493"; // Updated to the requested phone number
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Contato via WhatsApp"
      >
        {showTooltip ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {showTooltip && (
        <div className="absolute bottom-16 left-0 bg-white text-gray-800 p-4 rounded-lg shadow-xl w-64 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-5 w-5 text-green-500" />
            <span className="font-semibold">WhatsApp</span>
          </div>
          
          <p className="mb-2 text-sm font-medium text-gray-700">Olá! Como podemos ajudar você hoje?</p>
          <p className="mb-3 text-sm">Entre em contato via WhatsApp:</p>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors"
          >
            {phoneNumber}
          </a>
          
          <div className="absolute -bottom-2 left-4 w-3 h-3 bg-white transform rotate-45"></div>
        </div>
      )}
    </div>
  );
}
