import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Brain, Heart, Users, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const features = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Suivi d'humeur personnalisé",
    description: "Suivez votre bien-être mental quotidiennement avec des outils intuitifs."
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Exercices de bien-être",
    description: "Accédez à une bibliothèque d'exercices de méditation et de relaxation."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Communauté de soutien",
    description: "Rejoignez une communauté bienveillante de créatifs et freelances."
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Ressources créatives",
    description: "Découvrez des techniques pour stimuler votre créativité tout en préservant votre équilibre."
  }
];

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <Container>
      <div className="py-12 sm:py-16 lg:py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Prenez soin de votre</span>
          <span className="block text-primary-600">santé mentale</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Une application conçue spécialement pour les créatifs et freelances,
          pour vous aider à maintenir un équilibre mental optimal dans votre vie professionnelle.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Button
            size="lg"
            onClick={handleGetStarted}
          >
            Commencer gratuitement
          </Button>
        </div>
      </div>

      <div className="mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              hover
              className="relative"
            >
              <div className="absolute -top-3 -left-3 bg-primary-100 rounded-lg p-3">
                <div className="text-primary-600">{feature.icon}</div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;