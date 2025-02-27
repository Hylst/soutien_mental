export interface User {
  uid: string;
  email: string;
  displayName: string;
  age?: number;
  weight?: number;
  height?: number;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  activities?: string[];
  profession?: string;
  goals?: string[];
  workHabits?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  triggers?: string[];
  notes?: string;
  timestamp: Date;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'meditation' | 'breathing' | 'creativity' | 'mindfulness';
  isPremium: boolean;
}

export interface UserProfile {
  displayName: string;
  age?: number;
  weight?: number;
  height?: number;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  activities?: string[];
  profession?: string;
  goals?: string[];
}