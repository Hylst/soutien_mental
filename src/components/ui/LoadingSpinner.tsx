import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 8,
  className = "text-primary-600"
}) => {
  return (
    <Loader2 
      className={`w-${size} h-${size} animate-spin ${className}`}
    />
  );
};

export default LoadingSpinner;