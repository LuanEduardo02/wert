import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, Trophy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../context/UserProfileContext';

// Cards do jogo da memória - camisas de times
const CARDS = [
  { id: 1, team: 'Barcelona', image: 'https://placehold.co/100x100/blue/white?text=Barcelona' },
  { id: 2, team: 'Real Madrid', image: 'https://placehold.co/100x100/white/black?text=Real' },
  { id: 3, team: 'Flamengo', image: 'https://placehold.co/100x100/red/black?text=Flamengo' },
  { id: 4, team: 'Liverpool', image: 'https://placehold.co/100x100/red/white?text=Liverpool' },
  { id: 5, team: 'Manchester', image: 'https://placehold.co/100x100/red/white?text=Man+Utd' },
  { id: 6, team: 'Juventus', image: 'https://placehold.co/100x100/black/white?text=Juventus' },
];

// Duplica as cartas e embaralha
const generateCards = () => {
  const duplicatedCards = [...CARDS, ...CARDS].map((card, index) => ({
    ...card,
    uniqueId: `${card.id}_${index}`,
    isFlipped: false,
    isMatched: false,
  }));
  
  // Embaralha as cartas
  return duplicatedCards.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState(generateCards());
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const { addPoints, markGameAsPlayed } = useUserProfile();
  const navigate = useNavigate();

  // Verifica se o jogo acabou - CORRIGIDO para evitar loop infinito
  useEffect(() => {
    const checkGameOver = () => {
      if (gameOver) return;
      
      const allMatched = cards.every(card => card.isMatched);
      if (allMatched && cards.length > 0) {
        setGameWon(true);
        setGameOver(true);
        
        // Adiciona pontos ao jogador (reduzido de 50 para 10)
        addPoints(10);
        markGameAsPlayed('memory');
      }
    };
    
    checkGameOver();
  }, [cards, addPoints, markGameAsPlayed, gameOver]);

  // Reseta o contador de cartas viradas
  const resetFlippedCount = useCallback(() => {
    setFlippedCount(0);
    setFlippedIndexes([]);
  }, []);

  // Lida com a virada de cartas
  const flipCard = (index: number) => {
    // Não permite virar mais de 2 cartas ou cartas já viradas
    if (flippedCount >= 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    // Atualiza estado das cartas
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    
    // Atualiza contadores
    if (flippedCount === 0) {
      setFlippedIndexes([index]);
      setFlippedCount(1);
    } else if (flippedCount === 1) {
      setFlippedIndexes([...flippedIndexes, index]);
      setFlippedCount(2);
      setMoves(moves + 1);
      
      // Verifica se há match
      const firstIndex = flippedIndexes[0];
      if (cards[firstIndex].id === cards[index].id) {
        // Match encontrado
        newCards[firstIndex].isMatched = true;
        newCards[index].isMatched = true;
        setCards(newCards);
        resetFlippedCount();
      } else {
        // Sem match, vira as cartas de volta
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[index].isFlipped = false;
          setCards(newCards);
          resetFlippedCount();
        }, 1000);
      }
    }
  };

  // Reinicia o jogo
  const restartGame = () => {
    setCards(generateCards());
    setFlippedCount(0);
    setFlippedIndexes([]);
    setMoves(0);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link 
          to="/games" 
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Voltar para Jogos</span>
        </Link>
        
        <div className="text-right">
          <p className="text-gray-400">Movimentos: <span className="font-bold text-white">{moves}</span></p>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Jogo da Memória</h1>
        
        {gameWon ? (
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Parabéns!</h2>
            <p className="text-xl mb-6">Você completou o jogo em {moves} movimentos.</p>
            <p className="text-green-400 font-bold mb-6">+10 pontos adicionados ao seu perfil!</p>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={restartGame}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Jogar Novamente
              </button>
              <button
                onClick={() => navigate('/games')}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Voltar para Jogos
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <div
                key={card.uniqueId}
                className="aspect-square bg-gray-800 rounded-lg cursor-pointer transition-all duration-300"
                onClick={() => flipCard(index)}
              >
                <div className="h-full w-full relative">
                  <div className={`absolute inset-0 bg-gray-700 rounded-lg flex items-center justify-center ${
                    card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <span className="text-3xl">?</span>
                  </div>
                  <div className={`absolute inset-0 rounded-lg flex items-center justify-center ${
                    card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <img
                      src={card.image}
                      alt={card.team}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
