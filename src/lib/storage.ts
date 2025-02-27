import { MoodEntry, User } from '../types';

// Fallback storage using localStorage
export const storage = {
  moods: {
    add: (mood: Omit<MoodEntry, 'id'>): MoodEntry => {
      const moods = storage.moods.getAll();
      const newMood = {
        ...mood,
        id: `mood_${Date.now()}`
      };
      localStorage.setItem('moods', JSON.stringify([...moods, newMood]));
      return newMood;
    },
    getAll: (): MoodEntry[] => {
      try {
        return JSON.parse(localStorage.getItem('moods') || '[]');
      } catch {
        return [];
      }
    },
    getWeekly: (userId: string): MoodEntry[] => {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      
      return storage.moods.getAll()
        .filter(mood => 
          mood.userId === userId && 
          new Date(mood.timestamp) >= lastWeek
        )
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
  },
  user: {
    get: (): Partial<User> | null => {
      try {
        return JSON.parse(localStorage.getItem('user') || 'null');
      } catch {
        return null;
      }
    },
    update: (userData: Partial<User>) => {
      const currentUser = storage.user.get() || {};
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    }
  }
};