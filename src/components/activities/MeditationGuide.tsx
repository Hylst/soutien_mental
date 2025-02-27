import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface MeditationGuideProps {
  isActive: boolean;
  currentStep: number;
  instructions: string[];
  ambientSound?: string;
}

const MeditationGuide: React.FC<MeditationGuideProps> = ({
  isActive,
  currentStep,
  instructions,
  ambientSound
}) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (ambientSound) {
      const newAudio = new Audio(ambientSound);
      newAudio.loop = true;
      newAudio.volume = 0.3;
      setAudio(newAudio);

      return () => {
        newAudio.pause();
        newAudio.src = '';
      };
    }
  }, [ambientSound]);

  useEffect(() => {
    if (audio) {
      if (isActive && isSoundEnabled) {
        audio.play().catch(error => {
          console.log('Audio playback failed:', error);
        });
      } else {
        audio.pause();
      }
    }
  }, [isActive, isSoundEnabled, audio]);

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  return (
    <div className="space-y-8">
      {ambientSound && (
        <button
          onClick={toggleSound}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title={isSoundEnabled ? "Désactiver le son" : "Activer le son"}
        >
          {isSoundEnabled ? (
            <Volume2 className="h-6 w-6 text-primary-600" />
          ) : (
            <VolumeX className="h-6 w-6 text-gray-400" />
          )}
        </button>
      )}

      <div className="relative">
        {instructions.map((instruction, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: index === currentStep ? 1 : 0.3,
              y: 0,
              scale: index === currentStep ? 1.05 : 1
            }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-lg mb-4 ${
              index === currentStep
                ? 'bg-primary-50 text-primary-700'
                : 'bg-gray-50 text-gray-600'
            }`}
          >
            <p className="text-lg">{instruction}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MeditationGuide;