import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tracking from './pages/Tracking';
import MoodTracker from './pages/MoodTracker';
import Activities from './pages/Activities';
import Activity from './pages/Activity';
import Resources from './pages/Resources';
import AICoach from './pages/AICoach';
import CreativeAssistant from './pages/CreativeAssistant';
import Profile from './pages/Profile';
import About from './pages/About';

// Components
import Layout from './components/layout/Layout';
import LoadingScreen from './components/ui/LoadingScreen';

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  // Handle Firebase initialization errors
  useEffect(() => {
    if (error) {
      console.error('Firebase authentication error:', error);
    }
  }, [error]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
        <Route path="/tracking" element={user ? <Tracking /> : <Login />} />
        <Route path="/mood-tracker" element={user ? <MoodTracker /> : <Login />} />
        <Route path="/activities" element={user ? <Activities /> : <Login />} />
        <Route path="/activity/:type" element={user ? <Activity /> : <Login />} />
        <Route path="/resources" element={user ? <Resources /> : <Login />} />
        <Route path="/ai-coach" element={user ? <AICoach /> : <Login />} />
        <Route path="/creative-assistant" element={user ? <CreativeAssistant /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
};

export default App;