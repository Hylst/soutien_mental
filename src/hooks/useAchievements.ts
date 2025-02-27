import { useState, useEffect } from 'react';
import { firestoreService } from '@/services/firebase';
import type { Achievement } from '@/types/tracking';

export const useAchievements = (userId: string) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await firestoreService.getAchievementsByUserId(userId);
        setAchievements(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Unable to load achievements');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAchievements();
    }
  }, [userId]);

  const addAchievement = async (achievement: Omit<Achievement, 'id' | 'userId' | 'date'>) => {
    try {
      const newAchievement = await firestoreService.addAchievement({
        ...achievement,
        userId,
        date: new Date()
      });
      setAchievements(prev => [newAchievement, ...prev]);
      return newAchievement;
    } catch (err) {
      console.error('Error adding achievement:', err);
      throw err;
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      await firestoreService.deleteAchievement(id);
      setAchievements(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting achievement:', err);
      throw err;
    }
  };

  return {
    achievements,
    loading,
    error,
    addAchievement,
    deleteAchievement
  };
};