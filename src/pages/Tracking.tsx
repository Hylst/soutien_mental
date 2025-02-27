import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { BarChart2, Plus } from 'lucide-react';
import type { MoodEntry } from '@/types';
import type { Achievement, JournalEntry } from '@/types/tracking';
import { ACHIEVEMENT_CATEGORIES, JOURNAL_CATEGORIES } from '@/types/tracking';
import MoodChart from '@/components/tracking/MoodChart';
import MoodTable from '@/components/tracking/MoodTable';
import AchievementTracker from '@/components/tracking/AchievementTracker';
import PositiveJournal from '@/components/tracking/PositiveJournal';
import AddAchievementModal from '@/components/tracking/AddAchievementModal';
import AddJournalEntryModal from '@/components/tracking/AddJournalEntryModal';
import FilterBar from '@/components/tracking/FilterBar';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';

const Tracking = () => {
  const [user] = useAuthState(auth);
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    type: 'achievement' | 'journal';
    id: string;
  }>({ isOpen: false, type: 'achievement', id: '' });

  // Filter states
  const [achievementCategory, setAchievementCategory] = useState('');
  const [journalCategory, setJournalCategory] = useState('');
  const [achievementSort, setAchievementSort] = useState<'asc' | 'desc'>('desc');
  const [journalSort, setJournalSort] = useState<'asc' | 'desc'>('desc');
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // Fetch moods
        const moodsRef = collection(db, 'moods');
        const moodsQuery = query(
          moodsRef,
          where('userId', '==', user.uid),
          where('timestamp', '>=', Timestamp.fromDate(oneMonthAgo)),
          orderBy('timestamp', 'desc')
        );
        const moodsSnapshot = await getDocs(moodsQuery);
        const moodsData = moodsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as MoodEntry[];
        setMoods(moodsData);

        // Fetch achievements
        const achievementsRef = collection(db, 'achievements');
        const achievementsQuery = query(
          achievementsRef,
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        );
        const achievementsSnapshot = await getDocs(achievementsQuery);
        const achievementsData = achievementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Achievement[];
        setAchievements(achievementsData);

        // Fetch journal entries
        const journalRef = collection(db, 'journal_entries');
        const journalQuery = query(
          journalRef,
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        );
        const journalSnapshot = await getDocs(journalQuery);
        const journalData = journalSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JournalEntry[];
        setJournalEntries(journalData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleAddAchievement = async (achievement: { 
    title: string; 
    category: string;
    tags?: string[];
    completed?: boolean;
  }) => {
    if (!user) return;

    try {
      const achievementData = {
        ...achievement,
        userId: user.uid,
        date: new Date(),
      };

      const docRef = await addDoc(collection(db, 'achievements'), achievementData);
      setAchievements(prev => [{ id: docRef.id, ...achievementData }, ...prev]);
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  const handleAddJournalEntry = async (entry: {
    content: string;
    category?: string;
    tags?: string[];
    mood?: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  }) => {
    if (!user) return;

    try {
      const entryData = {
        ...entry,
        userId: user.uid,
        date: new Date(),
      };

      const docRef = await addDoc(collection(db, 'journal_entries'), entryData);
      setJournalEntries(prev => [{ id: docRef.id, ...entryData }, ...prev]);
    } catch (error) {
      console.error('Error adding journal entry:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmation.id) return;

    try {
      const collectionName = deleteConfirmation.type === 'achievement' 
        ? 'achievements' 
        : 'journal_entries';
      
      await deleteDoc(doc(db, collectionName, deleteConfirmation.id));

      if (deleteConfirmation.type === 'achievement') {
        setAchievements(prev => prev.filter(a => a.id !== deleteConfirmation.id));
      } else {
        setJournalEntries(prev => prev.filter(j => j.id !== deleteConfirmation.id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const filteredAchievements = achievements
    .filter(a => !achievementCategory || a.category === achievementCategory)
    .filter(a => !showOnlyCompleted || a.completed)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return achievementSort === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const filteredJournalEntries = journalEntries
    .filter(j => !journalCategory || j.category === journalCategory)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return journalSort === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <Container>
      <PageHeader
        title="Suivi et progression"
        description="Suivez votre évolution et célébrez vos progrès"
        icon={<BarChart2 className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Évolution de votre humeur
              </h2>
            </div>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <MoodChart moods={moods} />
            )}
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Historique détaillé
            </h2>
            <MoodTable moods={moods} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <FilterBar
              categories={ACHIEVEMENT_CATEGORIES}
              selectedCategory={achievementCategory}
              onCategoryChange={setAchievementCategory}
              sortOrder={achievementSort}
              onSortOrderChange={setAchievementSort}
              onlyShowCompleted={showOnlyCompleted}
              onCompletedFilterChange={setShowOnlyCompleted}
            />
            <AchievementTracker
              achievements={filteredAchievements}
              onAddAchievement={() => setIsAchievementModalOpen(true)}
              onDelete={(id) => setDeleteConfirmation({
                isOpen: true,
                type: 'achievement',
                id
              })}
            />
          </Card>

          <Card>
            <FilterBar
              categories={JOURNAL_CATEGORIES}
              selectedCategory={journalCategory}
              onCategoryChange={setJournalCategory}
              sortOrder={journalSort}
              onSortOrderChange={setJournalSort}
            />
            <PositiveJournal
              entries={filteredJournalEntries}
              onAddEntry={() => setIsJournalModalOpen(true)}
              onDelete={(id) => setDeleteConfirmation({
                isOpen: true,
                type: 'journal',
                id
              })}
            />
          </Card>
        </div>
      </div>

      <AddAchievementModal
        isOpen={isAchievementModalOpen}
        onClose={() => setIsAchievementModalOpen(false)}
        onSubmit={handleAddAchievement}
      />

      <AddJournalEntryModal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        onSubmit={handleAddJournalEntry}
      />

      <ConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, type: 'achievement', id: '' })}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        type="danger"
      />
    </Container>
  );
};

export default Tracking;