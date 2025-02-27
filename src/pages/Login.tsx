import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn, signUp, resetPassword, error: authError, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authError) {
      setError(authError);
      setLoading(false);
    }
  }, [authError]);

  useEffect(() => {
    setLoading(authLoading);
  }, [authLoading]);

  const validateForm = () => {
    setError(null);
    
    if (!email.trim()) {
      setError('L\'email est requis');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format d\'email invalide');
      return false;
    }
    
    if (!isForgotPassword) {
      if (!password) {
        setError('Le mot de passe est requis');
        return false;
      }
      
      if (!isLogin && password.length < 8) {
        setError('Le mot de passe doit contenir au moins 8 caractères');
        return false;
      }
      
      if (!isLogin && !displayName.trim()) {
        setError('Le nom d\'utilisateur est requis');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isForgotPassword) {
        const result = await resetPassword(email);
        if (result.success) {
          setSuccessMessage(result.message);
        } else {
          setError(result.message);
        }
        setLoading(false);
        return;
      }
      
      if (isLogin) {
        await signIn(email, password);
        navigate('/dashboard');
      } else {
        await signUp(email, password, displayName);
        navigate('/dashboard');
      }
    } catch (err) {
      // Error is already handled by the useAuth hook
      setLoading(false);
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-8">
          <div className="flex justify-center mb-8">
            <Brain className="h-12 w-12 text-primary-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {isForgotPassword 
              ? 'Réinitialiser le mot de passe' 
              : isLogin 
                ? 'Connexion' 
                : 'Créer un compte'}
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded bg-green-50 text-green-600 text-sm">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="••••••••"
                    minLength={8}
                  />
                </div>
              </div>
            )}

            {!isLogin && !isForgotPassword && (
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                  Nom d'utilisateur
                </label>
                <div className="mt-1">
                  <input
                    id="displayName"
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Votre nom d'utilisateur"
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              loading={loading}
            >
              {isForgotPassword 
                ? 'Envoyer le lien de réinitialisation' 
                : isLogin 
                  ? 'Se connecter' 
                  : 'Créer un compte'}
            </Button>
          </form>

          <div className="mt-6 flex flex-col space-y-2">
            {isForgotPassword ? (
              <button
                onClick={toggleForgotPassword}
                className="flex items-center justify-center text-sm text-primary-600 hover:text-primary-700"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour à la connexion
              </button>
            ) : (
              <>
                {isLogin && (
                  <button
                    onClick={toggleForgotPassword}
                    className="text-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    Mot de passe oublié ?
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                  }}
                  className="text-center text-sm text-primary-600 hover:text-primary-700"
                >
                  {isLogin ? 'Créer un nouveau compte' : 'Déjà un compte ? Se connecter'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;