import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { MoodEntry } from '@/types';
import type { Achievement, JournalEntry } from '@/types/tracking';
import type { UserProfile } from '@/types/profile';
import { MoodOverview } from '@/components/dashboard/MoodOverview';
import { ActivitySummary } from '@/components/dashboard/ActivitySummary';
import AddAchievementModal from '@/components/tracking/AddAchievementModal';
import AddJournalEntryModal from '@/components/tracking/AddJournalEntryModal';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardError from '@/components/dashboard/DashboardError';
import Container from '@/components/ui/Container';
import { useMoods } from '@/hooks/useMoods';
import { useAchievements } from '@/hooks/useAchievements';
import { useJournalEntries } from '@/hooks/useJournalEntries';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { moods, loading: moodsLoading } = useMoods(user?.uid || '');
  const { achievements, addAchievement } = useAchievements(user?.uid || '');
  const { entries: journalEntries, addEntry: addJournalEntry } = useJournalEntries(user?.uid || '');

  // Modal states
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Impossible de charger votre profil');
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <Container>
      <DashboardHeader userProfile={userProfile} userEmail={user?.email} />

      {error && <DashboardError message={error} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MoodOverview moods={moods} loading={moodsLoading} />
        </div>

        <div>
          <ActivitySummary
            achievements={achievements}
            journalEntries={journalEntries}
            onAddAchievement={() => setIsAchievementModalOpen(true)}
            onAddJournalEntry={() => setIsJournalModalOpen(true)}
          />
        </div>
      </div>

      <AddAchievementModal
        isOpen={isAchievementModalOpen}
        onClose={() => setIsAchievementModalOpen(false)}
        onSubmit={addAchievement}
      />

      <AddJournalEntryModal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        onSubmit={addJournalEntry}
      />
    </Container>
  );
};

export default Dashboard;