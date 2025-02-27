import Dexie, { Table } from 'dexie';
import type { Achievement, JournalEntry, MoodEntry, UserProfile } from '@/types';

export class AppDatabase extends Dexie {
  achievements!: Table<Achievement>;
  journalEntries!: Table<JournalEntry>;
  moods!: Table<MoodEntry>;
  userProfile!: Table<UserProfile>;
  syncQueue!: Table<{
    id?: number;
    operation: 'create' | 'update' | 'delete';
    table: string;
    data: any;
    timestamp: Date;
  }>;

  constructor() {
    super('SoutienMentalDB');
    this.version(1).stores({
      achievements: '++id, userId, date',
      journalEntries: '++id, userId, date',
      moods: '++id, userId, timestamp',
      userProfile: 'userId',
      syncQueue: '++id, operation, table, timestamp'
    });
  }
}

export const db = new AppDatabase();