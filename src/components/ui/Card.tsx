import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false
}) => {
  return (
    <div
      className={cn(
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm p-6 dark:text-white",
        hover && "transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;