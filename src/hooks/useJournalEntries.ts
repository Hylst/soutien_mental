import { useState, useEffect } from 'react';
import { firestoreService } from '@/services/firebase';
import type { JournalEntry } from '@/types/tracking';

export const useJournalEntries = (userId: string) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await firestoreService.getJournalEntriesByUserId(userId);
        setEntries(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching journal entries:', err);
        setError('Unable to load journal entries');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEntries();
    }
  }, [userId]);

  const addEntry = async (entry: Omit<JournalEntry, 'id' | 'userId' | 'date'>) => {
    try {
      const newEntry = await firestoreService.addJournalEntry({
        ...entry,
        userId,
        date: new Date()
      });
      setEntries(prev => [newEntry, ...prev]);
      return newEntry;
    } catch (err) {
      console.error('Error adding journal entry:', err);
      throw err;
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await firestoreService.deleteJournalEntry(id);
      setEntries(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Error deleting journal entry:', err);
      throw err;
    }
  };

  return {
    entries,
    loading,
    error,
    addEntry,
    deleteEntry
  };
};