export interface UserProfile {
  // Basic Info
  displayName: string;
  email?: string;
  age?: number;
  country?: string;
  city?: string;
  
  // Professional Info
  profession?: string;
  company?: string;
  industry?: string;
  workStyle?: string[];
  languages?: string[];
  
  // Personality & Interests
  mbtiType?: string;
  hobbies?: string[];
  passions?: string[];
  culturalInterests?: string[];
  
  // Physical Activities
  sportsActivities?: string[];
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  preferredExercises?: string[];
  
  // Goals & Preferences
  personalGoals?: string[];
  learningInterests?: string[];
  
  // System Fields
  createdAt?: Date;
  updatedAt?: Date;
}

export const PROFILE_OPTIONS = {
  languages: [
    'Français', 'English', 'Español', 'Deutsch', 'Italiano', 
    'Português', '中文', '日本語', 'العربية', 'Русский'
  ],
  
  workStyles: [
    'Remote', 'Hybrid', 'Office', 'Freelance', 'Entrepreneur',
    'Digital Nomad', 'Part-time', 'Full-time', 'Flexible', 'Contract'
  ],
  
  industries: [
    'Technology', 'Design', 'Marketing', 'Education', 'Healthcare',
    'Finance', 'Arts', 'Media', 'Science', 'Engineering'
  ],
  
  mbtiTypes: [
    'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ],
  
  hobbies: [
    'Lecture', 'Écriture', 'Photographie', 'Musique', 'Peinture',
    'Jardinage', 'Cuisine', 'Voyage', 'Jeux vidéo', 'Bricolage'
  ],
  
  culturalInterests: [
    'Cinéma', 'Théâtre', 'Musées', 'Concerts', 'Expositions',
    'Festivals', 'Littérature', 'Art contemporain', 'Danse', 'Opera'
  ],
  
  sportsActivities: [
    'Course à pied', 'Yoga', 'Natation', 'Cyclisme', 'Randonnée',
    'Escalade', 'Tennis', 'Danse', 'Arts martiaux', 'Fitness'
  ],
  
  learningInterests: [
    'Langues', 'Technologies', 'Art', 'Science', 'Histoire',
    'Philosophie', 'Psychologie', 'Business', 'Développement personnel', 'Écologie'
  ]
} as const;