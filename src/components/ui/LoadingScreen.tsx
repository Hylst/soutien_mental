import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useTheme } from '@/context/ThemeContext';

interface LoadingScreenProps {
  className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ className }) => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center transition-colors duration-200",
      theme === 'dark' 
        ? "bg-gradient-to-br from-gray-900 to-gray-800" 
        : "bg-gradient-to-br from-primary-50 to-secondary-50",
      className
    )}>
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary-600 dark:text-primary-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Chargement en cours...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;