export interface Achievement {
  id: string;
  userId: string;
  title: string;
  category: string;
  tags?: string[];
  date: Date;
  completed: boolean;
}

export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  mood?: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  tags?: string[];
  category?: string;
  date: Date;
}

export const ACHIEVEMENT_CATEGORIES = [
  'Travail',
  'Créativité',
  'Bien-être',
  'Apprentissage',
  'Sport',
  'Social',
  'Personnel'
] as const;

export const JOURNAL_CATEGORIES = [
  'Gratitude',
  'Accomplissement',
  'Relation',
  'Apprentissage',
  'Bien-être',
  'Créativité',
  'Autre'
] as const;

export const COMMON_TAGS = [
  'Important',
  'Objectif atteint',
  'En cours',
  'Inspiration',
  'Motivation',
  'Progrès',
  'Défi relevé'
] as const;