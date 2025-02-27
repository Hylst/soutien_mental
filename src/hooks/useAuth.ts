import { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { z } from 'zod';

// Validation schemas
const emailSchema = z.string().email('Email invalide');
const passwordSchema = z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères');

// Error handling helper
const getAuthErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/user-not-found':
      return 'Aucun compte associé à cet email.';
    case 'auth/wrong-password':
      return 'Mot de passe incorrect.';
    case 'auth/email-already-in-use':
      return 'Cet email est déjà utilisé par un autre compte.';
    case 'auth/weak-password':
      return 'Le mot de passe est trop faible.';
    case 'auth/invalid-email':
      return 'Adresse email invalide.';
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Veuillez réessayer plus tard.';
    case 'auth/network-request-failed':
      return 'Problème de connexion réseau. Vérifiez votre connexion internet.';
    default:
      return 'Une erreur est survenue. Veuillez réessayer.';
  }
};

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    try {
      emailSchema.parse(email);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  };

  const validatePassword = (password: string): boolean => {
    try {
      passwordSchema.parse(password);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  };

  const createUserDocument = async (userId: string, email: string, displayName?: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email,
          displayName: displayName || email.split('@')[0],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate inputs
      if (!validateEmail(email) || !validatePassword(password)) {
        setLoading(false);
        return null;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile if displayName is provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      await createUserDocument(userCredential.user.uid, email, displayName);
      return userCredential.user;
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate inputs
      if (!validateEmail(email)) {
        setLoading(false);
        return null;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await createUserDocument(userCredential.user.uid, email);
      return userCredential.user;
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate email
      if (!validateEmail(email)) {
        setLoading(false);
        return { success: false, message: 'Email invalide' };
      }

      await sendPasswordResetEmail(auth, email);
      return { 
        success: true, 
        message: 'Email de réinitialisation envoyé. Vérifiez votre boîte de réception.' 
      };
    } catch (err: any) {
      const errorMessage = getAuthErrorMessage(err.code);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      return true;
    } catch (err) {
      console.error('Sign out error:', err);
      return false;
    }
  };

  return {
    error,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  };
};