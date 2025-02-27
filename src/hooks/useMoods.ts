import { useState, useEffect } from 'react';
import { firestoreService } from '@/services/firebase';
import type { MoodEntry } from '@/types';

export const useMoods = (userId: string) => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const data = await firestoreService.getMoodsByUserId(userId);
        setMoods(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching moods:', err);
        setError('Unable to load mood data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchMoods();
    }
  }, [userId]);

  const addMood = async (mood: Omit<MoodEntry, 'id' | 'userId' | 'timestamp'>) => {
    try {
      const newMood = await firestoreService.addMood({
        ...mood,
        userId,
        timestamp: new Date()
      });
      setMoods(prev => [newMood, ...prev]);
      return newMood;
    } catch (err) {
      console.error('Error adding mood:', err);
      throw err;
    }
  };

  return {
    moods,
    loading,
    error,
    addMood
  };
};