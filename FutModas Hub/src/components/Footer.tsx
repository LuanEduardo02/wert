import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sobre a FutModas</h3>
            <p className="text-gray-400">
              Somos especializados em camisas de futebol oficiais, trazendo as melhores
              peças dos principais times e seleções do mundo com qualidade e autenticidade garantidas.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>contato@futmodas.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Av. Paulista, 1000 - São Paulo, SP</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="h-5 w-5" />
                <span>Seg - Sáb: 10h às 22h</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-pink-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 FutModas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
