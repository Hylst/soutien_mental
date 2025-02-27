import React from 'react';
import { Code } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`${
      theme === 'dark' 
        ? 'bg-gray-900/80 border-gray-800' 
        : 'bg-white/80 border-gray-200'
      } backdrop-blur-sm border-t py-6 mt-12 transition-colors duration-200`}>
      <div className="container mx-auto px-4 flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
        <Code className="h-4 w-4" />
        <p className="text-sm">
          Créé par Geoffroy Streit - © {new Date().getFullYear()} Soutien Mental
        </p>
      </div>
    </footer>
  );
};

export default Footer;