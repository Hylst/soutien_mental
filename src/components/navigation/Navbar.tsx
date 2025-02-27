import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Brain, BarChart, Heart, Activity, Bot, Sparkles, BookOpen, Info, LogOut, Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import ThemeToggle from '@/components/ui/ThemeToggle';

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const { t, toggleLanguage, currentLanguage } = useTranslation();

  const navItems = [
    { to: '/dashboard', label: t('nav.dashboard'), icon: <BarChart className="h-4 w-4" /> },
    { to: '/tracking', label: t('nav.tracking'), icon: <Heart className="h-4 w-4" /> },
    { to: '/activities', label: t('nav.activities'), icon: <Activity className="h-4 w-4" /> },
    { to: '/ai-coach', label: t('nav.aiCoach'), icon: <Bot className="h-4 w-4" /> },
    { to: '/creative-assistant', label: t('nav.creativeAssistant'), icon: <Sparkles className="h-4 w-4" /> },
    { to: '/resources', label: t('nav.resources'), icon: <BookOpen className="h-4 w-4" /> },
    { to: '/about', label: t('nav.about'), icon: <Info className="h-4 w-4" /> }
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                {t('app.name')}
              </span>
            </Link>

            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.to
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                        : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
              title={t('language.switch')}
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">{currentLanguage === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            {user ? (
              <button
                onClick={() => auth.signOut()}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('auth.signOut')}
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 rounded-md"
              >
                {t('auth.signIn')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;