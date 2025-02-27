import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface BreathingGuideProps {
  phase: 'inhale' | 'hold' | 'exhale';
  progress: number;
  duration: number;
}

const BreathingGuide: React.FC<BreathingGuideProps> = ({ phase, progress, duration }) => {
  const circleVariants = {
    inhale: {
      scale: [1, 1.5],
      transition: { duration: duration / 1000, ease: "easeInOut" }
    },
    hold: {
      scale: 1.5,
      transition: { duration: duration / 1000 }
    },
    exhale: {
      scale: [1.5, 1],
      transition: { duration: duration / 1000, ease: "easeInOut" }
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return '#0ea5e9';
      case 'hold':
        return '#22c55e';
      case 'exhale':
        return '#6366f1';
      default:
        return '#0ea5e9';
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Inspirez';
      case 'hold':
        return 'Retenez';
      case 'exhale':
        return 'Expirez';
      default:
        return '';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="w-64 h-64">
        <CircularProgressbar
          value={progress}
          strokeWidth={2}
          styles={buildStyles({
            pathColor: getPhaseColor(),
            trailColor: '#e2e8f0'
          })}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-50 rounded-full"
          variants={circleVariants}
          animate={phase}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-semibold text-primary-700">{getPhaseText()}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BreathingGuide;