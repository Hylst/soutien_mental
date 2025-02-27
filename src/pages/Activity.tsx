import React, { useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Timer as TimerIcon, Wind, Brain, Volume2, VolumeX, Heart, Sparkles, Coffee, Sun, Moon } from 'lucide-react';
import Timer from '../components/Timer';
import BreathingGuide from '../components/activities/BreathingGuide';
import MeditationGuide from '../components/activities/MeditationGuide';
import ActivityCompletion from '../components/activities/ActivityCompletion';
import Instructions from '../components/Instructions';
import { activities } from '../data/activities';

const Activity = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingProgress, setBreathingProgress] = useState(0);
  
  // Use refs to avoid state updates during render
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  const activity = activities.find(a => a.type === type);

  React.useEffect(() => {
    if (!activity) {
      navigate('/activities');
    }
  }, [activity, navigate]);

  const handleTick = useCallback((timeLeft: number) => {
    if (!activity) return;
    
    if (activity.type === 'breathing') {
      const totalCycleDuration = 19; // 4 + 7 + 8 seconds
      const currentTime = parseInt(activity.duration) * 60 - timeLeft;
      const cycleProgress = (currentTime % totalCycleDuration) / totalCycleDuration * 100;
      
      setBreathingProgress(cycleProgress);

      if (currentTime % totalCycleDuration <= 4) {
        setBreathingPhase('inhale');
      } else if (currentTime % totalCycleDuration <= 11) {
        setBreathingPhase('hold');
      } else {
        setBreathingPhase('exhale');
      }
    } else {
      const stepDuration = Math.floor(parseInt(activity.duration || '0') * 60 / (activity.instructions.length || 1));
      const currentStepIndex = Math.floor((parseInt(activity.duration || '0') * 60 - timeLeft) / stepDuration);
      
      if (currentStepIndex !== currentStepRef.current && currentStepIndex < (activity.instructions.length || 0)) {
        setCurrentStep(currentStepIndex);
      }
    }
  }, [activity]);

  if (!activity) return null;

  const handleComplete = () => {
    setIsActive(false);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setIsActive(false);
    setIsCompleted(false);
    setCurrentStep(0);
    setBreathingPhase('inhale');
    setBreathingProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 rounded-lg p-3">
              {activity.type === 'breathing' ? <Wind className="h-6 w-6" /> :
               activity.type === 'meditation' ? <Brain className="h-6 w-6" /> :
               activity.type === 'bodyscan' ? <Heart className="h-6 w-6" /> :
               activity.type === 'mindfulness' ? <Sun className="h-6 w-6" /> :
               activity.type === 'visualization' ? <Sparkles className="h-6 w-6" /> :
               activity.type === 'gratitude' ? <Heart className="h-6 w-6" /> :
               activity.type === 'energizing' ? <Coffee className="h-6 w-6" /> :
               <Moon className="h-6 w-6" />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{activity.title}</h1>
              <p className="text-gray-500">{activity.description}</p>
            </div>
          </div>
        </div>

        {!isCompleted ? (
          <>
            <Timer
              duration={parseInt(activity.duration) * 60}
              onTick={handleTick}
              onComplete={handleComplete}
              onStart={() => setIsActive(true)}
              onPause={() => setIsActive(false)}
            />

            <div className="mt-8">
              {activity.type === 'breathing' ? (
                <BreathingGuide
                  phase={breathingPhase}
                  progress={breathingProgress}
                  duration={
                    breathingPhase === 'inhale' ? 4000 :
                    breathingPhase === 'hold' ? 7000 : 8000
                  }
                />
              ) : (
                <MeditationGuide
                  isActive={isActive}
                  currentStep={currentStep}
                  instructions={activity.instructions}
                  ambientSound="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
                />
              )}
            </div>
          </>
        ) : (
          <ActivityCompletion
            duration={parseInt(activity.duration) * 60}
            type={activity.title}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
};

export default Activity;