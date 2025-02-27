import React from 'react';
import Navbar from '../navigation/Navbar';
import Footer from './Footer';
import OfflineIndicator from '../ui/OfflineIndicator';
import { cn } from '@/utils/cn';
import { useTheme } from '@/context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "min-h-screen transition-colors duration-200",
      theme === 'dark' 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" 
        : "bg-gradient-to-br from-primary-50 to-secondary-50 text-gray-900"
    )}>
      <Navbar />
      <main className={cn("container mx-auto px-4 py-8 flex-grow", className)}>
        {children}
      </main>
      <Footer />
      <OfflineIndicator />
    </div>
  );
};

export default Layout;