import { Achievement, JournalEntry } from '../types/tracking';

const STORAGE_KEYS = {
  ACHIEVEMENTS: 'achievements',
  JOURNAL_ENTRIES: 'journal_entries',
  USER_PROFILE: 'user_profile'
} as const;

export const storageService = {
  // Achievements
  saveAchievement: (achievement: Achievement) => {
    const achievements = storageService.getAchievements();
    achievements.push(achievement);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  },

  getAchievements: (): Achievement[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS) || '[]');
    } catch {
      return [];
    }
  },

  // Journal Entries
  saveJournalEntry: (entry: JournalEntry) => {
    const entries = storageService.getJournalEntries();
    entries.push(entry);
    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
  },

  getJournalEntries: (): JournalEntry[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES) || '[]');
    } catch {
      return [];
    }
  },

  // Global Data Export/Import
  exportAllData: () => {
    const data = {
      achievements: storageService.getAchievements(),
      journalEntries: storageService.getJournalEntries(),
      userProfile: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || '{}')
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `soutien_mental_data_${new Date().toISOString()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  },

  importAllData: async (file: File): Promise<void> => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (data.achievements) {
        localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(data.achievements));
      }
      if (data.journalEntries) {
        localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(data.journalEntries));
      }
      if (data.userProfile) {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data.userProfile));
      }
    } catch (error) {
      throw new Error('Erreur lors de l\'importation des données');
    }
  },

  // Offline Sync
  syncWithServer: async () => {
    // TODO: Implement sync logic when backend is ready
    const localData = {
      achievements: storageService.getAchievements(),
      journalEntries: storageService.getJournalEntries()
    };
    
    // For now, just log the data that would be synced
    console.log('Data to sync:', localData);
  }
};