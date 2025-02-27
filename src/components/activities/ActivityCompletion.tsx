import React from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { Star, Heart, Calendar } from 'lucide-react';

interface ActivityCompletionProps {
  duration: number;
  type: string;
  onSave?: () => void;
  onRestart?: () => void;
}

const ActivityCompletion: React.FC<ActivityCompletionProps> = ({
  duration,
  type,
  onSave,
  onRestart
}) => {
  const [showConfetti, setShowConfetti] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-primary-100 rounded-full p-4">
            <Star className="h-12 w-12 text-primary-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Félicitations !
        </h2>
        
        <p className="text-gray-600 mb-6">
          Vous avez terminé votre séance de {type} de {Math.floor(duration / 60)} minutes.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <Heart className="h-6 w-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Bien-être amélioré</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <Calendar className="h-6 w-6 text-primary-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Activité enregistrée</p>
          </div>
        </div>

        <div className="space-x-4">
          {onSave && (
            <button
              onClick={onSave}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Enregistrer la session
            </button>
          )}
          {onRestart && (
            <button
              onClick={onRestart}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Recommencer
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ActivityCompletion;