import { useState, useEffect, useCallback } from 'react';
import { Check, ChevronLeft, Clock, Trophy, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../context/UserProfileContext';

// Perguntas do Quiz
const QUESTIONS = [
  {
    id: 1,
    question: 'Qual seleção é a maior campeã da Copa do Mundo?',
    options: ['Alemanha', 'Itália', 'Brasil', 'Argentina'],
    correctAnswer: 'Brasil'
  },
  {
    id: 2,
    question: 'Qual time inglês é conhecido como "The Red Devils"?',
    options: ['Liverpool', 'Manchester United', 'Arsenal', 'Chelsea'],
    correctAnswer: 'Manchester United'
  },
  {
    id: 3,
    question: 'Em que ano o Brasil conquistou o pentacampeonato mundial?',
    options: ['1994', '1998', '2002', '2006'],
    correctAnswer: '2002'
  },
  {
    id: 4,
    question: 'Qual destes times nunca venceu a Liga dos Campeões da UEFA?',
    options: ['Ajax', 'Manchester City', 'Chelsea', 'Borussia Dortmund'],
    correctAnswer: 'Manchester City'
  },
  {
    id: 5,
    question: 'Qual jogador tem mais gols em Copas do Mundo?',
    options: ['Pelé', 'Ronaldo Fenômeno', 'Miroslav Klose', 'Lionel Messi'],
    correctAnswer: 'Miroslav Klose'
  }
];

export default function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameStarted, setGameStarted] = useState(false);
  const { addPoints, markGameAsPlayed } = useUserProfile();
  const navigate = useNavigate();

  // Função para passar para a próxima pergunta ou finalizar o jogo
  const handleNextQuestion = useCallback(() => {
    setSelectedAnswer('');
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setTimeLeft(15);
    } else {
      setShowResult(true);
      
      // Adiciona pontos baseado no desempenho (2 pontos por acerto, reduzido de 10)
      const pointsEarned = score * 2;
      addPoints(pointsEarned);
      markGameAsPlayed('quiz');
    }
  }, [currentQuestion, QUESTIONS.length, score, addPoints, markGameAsPlayed]);

  // Temporizador para cada pergunta
  useEffect(() => {
    if (!gameStarted || showResult) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestion, gameStarted, showResult, handleNextQuestion]);

  // Inicia o jogo
  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
  };

  // Verifica a resposta e passa para a próxima pergunta
  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    
    // Verifica se a resposta está correta
    if (answer === QUESTIONS[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    
    // Espera um pouco antes de ir para a próxima pergunta
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/games" 
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Voltar para Jogos</span>
        </Link>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-6">
        {!gameStarted ? (
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold mb-4">Quiz do Futebol</h1>
            <p className="text-gray-400 mb-8">
              Teste seus conhecimentos sobre futebol! 
              Responda corretamente às perguntas para ganhar pontos.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Começar Quiz
            </button>
          </div>
        ) : showResult ? (
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Resultado Final</h2>
            <p className="text-xl mb-2">
              Você acertou <span className="font-bold text-blue-400">{score}</span> de {QUESTIONS.length} perguntas!
            </p>
            <p className="text-green-400 font-bold mb-6">+{score * 2} pontos adicionados ao seu perfil!</p>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={startGame}
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
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Pergunta <span className="font-bold text-white">{currentQuestion + 1}</span> de {QUESTIONS.length}
              </p>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className={`font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}>{timeLeft}s</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">{QUESTIONS[currentQuestion].question}</h2>
              <div className="space-y-3">
                {QUESTIONS[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== ''}
                    className={`w-full p-4 rounded-lg text-left relative ${
                      selectedAnswer === '' 
                        ? 'bg-gray-800 hover:bg-gray-700' 
                        : option === QUESTIONS[currentQuestion].correctAnswer
                          ? 'bg-green-500/20 border border-green-500'
                          : selectedAnswer === option
                            ? 'bg-red-500/20 border border-red-500'
                            : 'bg-gray-800 opacity-70'
                    }`}
                  >
                    {option}
                    {selectedAnswer !== '' && option === QUESTIONS[currentQuestion].correctAnswer && (
                      <Check className="absolute right-3 top-4 h-5 w-5 text-green-500" />
                    )}
                    {selectedAnswer === option && option !== QUESTIONS[currentQuestion].correctAnswer && (
                      <X className="absolute right-3 top-4 h-5 w-5 text-red-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p>
                Pontuação: <span className="font-bold text-blue-400">{score}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
