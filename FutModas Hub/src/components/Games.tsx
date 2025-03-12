import { Link } from 'react-router-dom';
import { Gamepad2, Trophy } from 'lucide-react';
import { useUserProfile } from '../context/UserProfileContext';

export default function Games() {
  const { profile, availableGames } = useUserProfile();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Jogos e Pontos</h1>
      
      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-blue-500/20 rounded-full p-6">
            <Trophy className="h-10 w-10 text-blue-400" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold mb-2">Seus Pontos</h2>
            <p className="text-4xl font-bold text-blue-500 mb-2">{profile?.points || 0}</p>
            <p className="text-gray-400">
              Jogue os jogos abaixo para ganhar pontos e desbloquear descontos especiais nas camisetas!
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Como Funciona</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <p>Jogue os jogos disponíveis na plataforma e ganhe pontos.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <p>Acumule 100 pontos para obter 15% de desconto em qualquer produto.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <p>Ao visualizar um produto, você poderá aplicar seus pontos para obter o desconto.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              4
            </div>
            <p>Cada jogo pode ser jogado uma vez por dia para ganhar pontos.</p>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Jogos Disponíveis</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {availableGames.map((game) => (
          <div 
            key={game.id} 
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg group"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={game.image} 
                alt={game.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{game.name}</h3>
              <p className="text-gray-400 mb-4">{game.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-blue-400" />
                  <span>Recompensa: <strong>{game.pointsReward} pontos</strong></span>
                </div>
                
                <Link 
                  to={game.route} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Jogar Agora
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
