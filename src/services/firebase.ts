import { 
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
  getFirestore,
  enableIndexedDbPersistence,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { db as localDb } from '@/lib/db/schema';
import { validateData, moodSchema, achievementSchema, journalEntrySchema } from '@/utils/validation';
import type { MoodEntry } from '@/types';
import type { Achievement, JournalEntry } from '@/types/tracking';

// Maximum retry attempts for Firebase operations
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms

// Helper function to implement retry logic
const withRetry = async <T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> => {
  try {
    return await operation();
  } catch (error: any) {
    if (retries <= 0) throw error;
    
    console.warn(`Operation failed, retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`, error);
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return withRetry(operation, retries - 1);
  }
};

// Helper to safely convert Firestore timestamps
const convertTimestamps = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  // Convert Firestore timestamps to JS Date objects
  Object.keys(data).forEach(key => {
    if (data[key] instanceof Timestamp) {
      data[key] = data[key].toDate();
    }
  });
  return { id: doc.id, ...data };
};

export const firestoreService = {
  async ensurePersistenceInitialized() {
    try {
      await enableIndexedDbPersistence(db);
    } catch (err: any) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('Multiple tabs open, persistence enabled in another tab');
      } else if (err.code === 'unimplemented') {
        // The current browser doesn't support persistence
        console.warn('Current browser does not support persistence');
      }
    }
  },

  async getMoodsByUserId(userId: string) {
    if (!userId) throw new Error('User ID is required');

    try {
      // Try local database first
      const localMoods = await localDb.moods.where('userId').equals(userId).toArray();
      if (localMoods.length > 0 && !navigator.onLine) {
        return localMoods;
      }

      // If online, fetch from Firebase
      if (navigator.onLine) {
        return await withRetry(async () => {
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

          const moodsRef = collection(db, 'moods');
          const q = query(
            moodsRef,
            where('userId', '==', userId),
            where('timestamp', '>=', Timestamp.fromDate(oneMonthAgo)),
            orderBy('timestamp', 'desc')
          );

          const querySnapshot = await getDocs(q);
          const moods = querySnapshot.docs.map(convertTimestamps) as MoodEntry[];

          // Update local database
          await localDb.moods.bulkPut(moods);
          return moods;
        });
      }

      return localMoods;
    } catch (error) {
      console.error('Error fetching moods:', error);
      // Return local data as fallback
      return await localDb.moods.where('userId').equals(userId).toArray();
    }
  },

  async addMood(moodData: Omit<MoodEntry, 'id'>) {
    // Validate mood data
    const validation = validateData(moodSchema, moodData);
    if (!validation.success) {
      throw new Error(validation.error);
    }

    try {
      return await withRetry(async () => {
        // Add to Firestore if online
        if (navigator.onLine) {
          const docRef = await addDoc(collection(db, 'moods'), {
            ...moodData,
            timestamp: moodData.timestamp instanceof Date 
              ? Timestamp.fromDate(moodData.timestamp) 
              : moodData.timestamp,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          
          const newMood = {
            id: docRef.id,
            ...moodData
          };
          
          // Also add to local DB
          await localDb.moods.put(newMood);
          return newMood;
        } else {
          // Offline mode: add to local DB only
          const newMood = {
            id: `local_${Date.now()}`,
            ...moodData
          };
          
          await localDb.moods.put(newMood);
          
          // Add to sync queue
          await localDb.syncQueue.add({
            operation: 'create',
            table: 'moods',
            data: moodData,
            timestamp: new Date()
          });
          
          return newMood;
        }
      });
    } catch (error) {
      console.error('Error adding mood:', error);
      throw error;
    }
  },

  async getAchievementsByUserId(userId: string) {
    if (!userId) throw new Error('User ID is required');

    try {
      // Try local database first
      const localAchievements = await localDb.achievements.where('userId').equals(userId).toArray();
      if (localAchievements.length > 0 && !navigator.onLine) {
        return localAchievements;
      }

      // If online, fetch from Firebase with retry logic
      if (navigator.onLine) {
        return await withRetry(async () => {
          const achievementsRef = collection(db, 'achievements');
          const q = query(
            achievementsRef,
            where('userId', '==', userId),
            orderBy('date', 'desc')
          );

          const querySnapshot = await getDocs(q);
          const achievements = querySnapshot.docs.map(convertTimestamps) as Achievement[];

          // Update local database
          await localDb.achievements.bulkPut(achievements);
          return achievements;
        });
      }

      return localAchievements;
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return await localDb.achievements.where('userId').equals(userId).toArray();
    }
  },

  async addAchievement(achievementData: Omit<Achievement, 'id'>) {
    // Validate achievement data
    const validation = validateData(achievementSchema, achievementData);
    if (!validation.success) {
      throw new Error(validation.error);
    }

    try {
      return await withRetry(async () => {
        // Add to Firestore if online
        if (navigator.onLine) {
          const docRef = await addDoc(collection(db, 'achievements'), {
            ...achievementData,
            date: achievementData.date instanceof Date 
              ? Timestamp.fromDate(achievementData.date) 
              : achievementData.date,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          
          const newAchievement = {
            id: docRef.id,
            ...achievementData
          };
          
          // Also add to local DB
          await localDb.achievements.put(newAchievement);
          return newAchievement;
        } else {
          // Offline mode: add to local DB only
          const newAchievement = {
            id: `local_${Date.now()}`,
            ...achievementData
          };
          
          await localDb.achievements.put(newAchievement);
          
          // Add to sync queue
          await localDb.syncQueue.add({
            operation: 'create',
            table: 'achievements',
            data: achievementData,
            timestamp: new Date()
          });
          
          return newAchievement;
        }
      });
    } catch (error) {
      console.error('Error adding achievement:', error);
      throw error;
    }
  },

  async deleteAchievement(id: string) {
    if (!id) throw new Error('Achievement ID is required');

    try {
      return await withRetry(async () => {
        // Delete from Firestore if online
        if (navigator.onLine) {
          await deleteDoc(doc(db, 'achievements', id));
        } else {
          // Add to sync queue for later deletion
          await localDb.syncQueue.add({
            operation: 'delete',
            table: 'achievements',
            data: { id },
            timestamp: new Date()
          });
        }
        
        // Always delete from local DB
        await localDb.achievements.delete(id);
        return true;
      });
    } catch (error) {
      console.error('Error deleting achievement:', error);
      throw error;
    }
  },

  async getJournalEntriesByUserId(userId: string) {
    if (!userId) throw new Error('User ID is required');

    try {
      // Try local database first
      const localEntries = await localDb.journalEntries.where('userId').equals(userId).toArray();
      if (localEntries.length > 0 && !navigator.onLine) {
        return localEntries;
      }

      // If online, fetch from Firebase with retry logic
      if (navigator.onLine) {
        return await withRetry(async () => {
          const journalRef = collection(db, 'journal_entries');
          const q = query(
            journalRef,
            where('userId', '==', userId),
            orderBy('date', 'desc')
          );

          const querySnapshot = await getDocs(q);
          const entries = querySnapshot.docs.map(convertTimestamps) as JournalEntry[];

          // Update local database
          await localDb.journalEntries.bulkPut(entries);
          return entries;
        });
      }

      return localEntries;
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      return localEntries;
    }
  },

  async addJournalEntry(entryData: Omit<JournalEntry, 'id'>) {
    // Validate journal entry data
    const validation = validateData(journalEntrySchema, entryData);
    if (!validation.success) {
      throw new Error(validation.error);
    }

    try {
      return await withRetry(async () => {
        // Add to Firestore if online
        if (navigator.onLine) {
          const docRef = await addDoc(collection(db, 'journal_entries'), {
            ...entryData,
            date: entryData.date instanceof Date 
              ? Timestamp.fromDate(entryData.date) 
              : entryData.date,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          
          const newEntry = {
            id: docRef.id,
            ...entryData
          };
          
          // Also add to local DB
          await localDb.journalEntries.put(newEntry);
          return newEntry;
        } else {
          // Offline mode: add to local DB only
          const newEntry = {
            id: `local_${Date.now()}`,
            ...entryData
          };
          
          await localDb.journalEntries.put(newEntry);
          
          // Add to sync queue
          await localDb.syncQueue.add({
            operation: 'create',
            table: 'journal_entries',
            data: entryData,
            timestamp: new Date()
          });
          
          return newEntry;
        }
      });
    } catch (error) {
      console.error('Error adding journal entry:', error);
      throw error;
    }
  },

  async deleteJournalEntry(id: string) {
    if (!id) throw new Error('Journal entry ID is required');

    try {
      return await withRetry(async () => {
        // Delete from Firestore if online
        if (navigator.onLine) {
          await deleteDoc(doc(db, 'journal_entries', id));
        } else {
          // Add to sync queue for later deletion
          await localDb.syncQueue.add({
            operation: 'delete',
            table: 'journal_entries',
            data: { id },
            timestamp: new Date()
          });
        }
        
        // Always delete from local DB
        await localDb.journalEntries.delete(id);
        return true;
      });
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  }
};