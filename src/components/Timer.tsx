import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  duration: number;
  onTick?: (timeLeft: number) => void;
  onComplete?: () => void;
  onStart?: () => void;
  onPause?: () => void;
}

const Timer: React.FC<TimerProps> = ({ 
  duration, 
  onTick, 
  onComplete, 
  onStart, 
  onPause 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const tickCallbackRef = useRef(onTick);

  // Update the ref when the callback changes
  useEffect(() => {
    tickCallbackRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => {
          const newTime = time - 1;
          if (newTime <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          // Use the ref to avoid the React warning
          if (tickCallbackRef.current) {
            tickCallbackRef.current(newTime);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, onComplete, timeLeft]);

  const toggleTimer = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (newState) {
      onStart?.();
    } else {
      onPause?.();
    }
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsActive(false);
    setTimeLeft(duration);
    onPause?.();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-primary-600 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-center">
        <div className="text-5xl font-bold text-gray-900 mb-6 font-mono">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            <span>{isActive ? 'Pause' : 'Démarrer'}</span>
          </button>
          <button
            onClick={resetTimer}
            className="flex items-center space-x-2 px-8 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Recommencer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;