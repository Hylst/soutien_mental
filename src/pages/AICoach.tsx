import React, { useState } from 'react';
import { Bot, Send, RefreshCw, Brain, Zap, Heart } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';

const coachingTypes = [
  {
    id: 'motivation',
    icon: <Zap className="h-6 w-6" />,
    title: 'Coach Motivation',
    description: 'Retrouvez votre énergie et votre motivation pour avancer dans vos projets.'
  },
  {
    id: 'creativity',
    icon: <Brain className="h-6 w-6" />,
    title: 'Coach Créativité',
    description: 'Débloquez votre potentiel créatif et trouvez de nouvelles inspirations.'
  },
  {
    id: 'wellbeing',
    icon: <Heart className="h-6 w-6" />,
    title: 'Coach Bien-être',
    description: 'Prenez soin de votre équilibre mental et émotionnel.'
  }
];

const AICoach: React.FC = () => {
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCoachSelect = (coachId: string) => {
    setSelectedCoach(coachId);
    setConversation([{
      role: 'assistant',
      content: getInitialMessage(coachId)
    }]);
  };

  const getInitialMessage = (coachId: string) => {
    switch (coachId) {
      case 'motivation':
        return "Je suis votre coach motivation. Parlez-moi de vos objectifs et des défis que vous rencontrez.";
      case 'creativity':
        return "Je suis là pour stimuler votre créativité. Quel type de projet souhaitez-vous explorer ?";
      case 'wellbeing':
        return "Je suis votre guide bien-être. Comment puis-je vous aider à maintenir votre équilibre aujourd'hui ?";
      default:
        return "Comment puis-je vous aider aujourd'hui ?";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setConversation(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simuler une réponse de l'IA après un court délai
    setTimeout(() => {
      const response = generateResponse(userMessage, selectedCoach);
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (message: string, coachType: string | null) => {
    // Simulation de réponses personnalisées selon le type de coach
    switch (coachType) {
      case 'motivation':
        return "Je comprends vos défis. Concentrons-nous sur vos forces et définissons ensemble des objectifs atteignables. Que diriez-vous de commencer par une petite victoire aujourd'hui ?";
      case 'creativity':
        return "Votre idée est intéressante ! Essayons de l'explorer sous un angle différent. Avez-vous pensé à combiner cela avec une autre de vos passions ?";
      case 'wellbeing':
        return "Prenons un moment pour respirer et réfléchir à ce qui est vraiment important pour vous. Comment vous sentez-vous en ce moment précis ?";
      default:
        return "Je suis là pour vous accompagner. Pouvez-vous m'en dire plus ?";
    }
  };

  return (
    <Container maxWidth="7xl">
      <div className="py-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-primary-100 rounded-lg p-3">
            <Bot className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Coach IA</h1>
            <p className="text-gray-600">Votre accompagnateur personnel pour le développement et le bien-être</p>
          </div>
        </div>

        {!selectedCoach ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coachingTypes.map((coach) => (
              <Card
                key={coach.id}
                hover
                className="cursor-pointer"
                onClick={() => handleCoachSelect(coach.id)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary-100 rounded-lg p-3 text-primary-600">
                    {coach.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{coach.title}</h3>
                </div>
                <p className="text-gray-600">{coach.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 rounded-lg p-2 text-primary-600">
                  {coachingTypes.find(c => c.id === selectedCoach)?.icon}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {coachingTypes.find(c => c.id === selectedCoach)?.title}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={<RefreshCw className="h-4 w-4" />}
                onClick={() => setSelectedCoach(null)}
              >
                Changer de coach
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      msg.role === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <LoadingSpinner size={5} />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex space-x-2 p-4 border-t">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              />
              <Button
                type="submit"
                disabled={!message.trim() || isLoading}
                icon={<Send className="h-5 w-5" />}
              >
                Envoyer
              </Button>
            </form>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default AICoach;