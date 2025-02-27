import { z } from 'zod';

// User validation schemas
export const userSchema = z.object({
  displayName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  profession: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  languages: z.array(z.string()).optional(),
  workStyle: z.array(z.string()).optional(),
  industry: z.string().optional(),
  mbtiType: z.string().optional(),
  hobbies: z.array(z.string()).optional(),
  passions: z.array(z.string()).optional(),
  culturalInterests: z.array(z.string()).optional(),
  sportsActivities: z.array(z.string()).optional(),
  learningInterests: z.array(z.string()).optional(),
  personalGoals: z.array(z.string()).optional()
});

// Mood entry validation
export const moodSchema = z.object({
  userId: z.string().min(1, 'ID utilisateur requis'),
  mood: z.enum(['great', 'good', 'neutral', 'bad', 'terrible'], {
    errorMap: () => ({ message: 'Humeur invalide' })
  }),
  triggers: z.array(z.string()).optional(),
  notes: z.string().max(500, 'Les notes ne peuvent pas dépasser 500 caractères').optional(),
  timestamp: z.date()
});

// Achievement validation
export const achievementSchema = z.object({
  userId: z.string().min(1, 'ID utilisateur requis'),
  title: z.string().min(1, 'Titre requis').max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  category: z.string().min(1, 'Catégorie requise'),
  tags: z.array(z.string()).optional(),
  date: z.date(),
  completed: z.boolean().default(false)
});

// Journal entry validation
export const journalEntrySchema = z.object({
  userId: z.string().min(1, 'ID utilisateur requis'),
  content: z.string().min(1, 'Contenu requis').max(2000, 'Le contenu ne peut pas dépasser 2000 caractères'),
  mood: z.enum(['great', 'good', 'neutral', 'bad', 'terrible'], {
    errorMap: () => ({ message: 'Humeur invalide' })
  }).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  date: z.date()
});

// Validate data with error handling
export const validateData = <T>(schema: z.ZodType<T>, data: unknown): { 
  success: boolean; 
  data?: T; 
  error?: string 
} => {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(e => e.message).join(', ');
      return { success: false, error: errorMessage };
    }
    return { success: false, error: 'Erreur de validation' };
  }
};