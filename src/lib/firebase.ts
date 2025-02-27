import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  CACHE_SIZE_UNLIMITED,
  enableMultiTabIndexedDbPersistence
} from 'firebase/firestore';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBMJdZZ-6SZ0xgsCQIwhQlGBAVrc-HY3So",
  authDomain: "soutienmental-24cd4.firebaseapp.com",
  projectId: "soutienmental-24cd4",
  storageBucket: "soutienmental-24cd4.appspot.com",
  messagingSenderId: "352328623900",
  appId: "1:352328623900:web:069fe848cf6cadce9ebcd9",
  measurementId: "G-06JYT6KL3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with optimized settings
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  })
});

// Enable multi-tab persistence with better error handling
try {
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    console.warn('Firestore persistence error:', err.code);
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });
} catch (error) {
  console.error('Failed to initialize Firestore persistence:', error);
}

// Initialize Auth with persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('Auth persistence error:', err);
});

// Initialize Analytics only if supported
let analytics = null;
// Check if analytics is supported before initializing
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  } else {
    console.warn('Firebase Analytics is not supported in this environment');
  }
}).catch(err => {
  console.warn('Error checking analytics support:', err);
});

// Password reset function
const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { 
      success: true, 
      message: 'Email de réinitialisation envoyé. Vérifiez votre boîte de réception.' 
    };
  } catch (error: any) {
    console.error('Password reset error:', error);
    let message = 'Une erreur est survenue lors de la réinitialisation du mot de passe.';
    
    if (error.code === 'auth/user-not-found') {
      message = 'Aucun compte associé à cet email.';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Adresse email invalide.';
    } else if (error.code === 'auth/too-many-requests') {
      message = 'Trop de tentatives. Veuillez réessayer plus tard.';
    }
    
    return { success: false, message };
  }
};

export { app, db, auth, analytics, resetPassword };