import { openai } from '@/lib/openai';
import type { UserProfile } from '@/types/profile';

export type AIResponse = {
  content: string;
  type: 'motivation' | 'creativity' | 'general';
};

export const aiService = {
  async generateMotivationalResponse(
    message: string,
    userProfile?: Partial<UserProfile>
  ): Promise<AIResponse> {
    try {
      const context = userProfile ? `Context: User is a ${userProfile.profession} interested in ${userProfile.hobbies?.join(', ')}. ` : '';
      
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a motivational coach specializing in helping creative professionals and freelancers. ${context}Provide encouraging, actionable advice.`
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      return {
        content: response.choices[0].message.content || "Je suis désolé, je n'ai pas pu générer une réponse.",
        type: 'motivation'
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return {
        content: "Je suis désolé, une erreur est survenue. Veuillez réessayer.",
        type: 'general'
      };
    }
  },

  async generateCreativeResponse(
    message: string,
    userProfile?: Partial<UserProfile>
  ): Promise<AIResponse> {
    try {
      const context = userProfile ? `Context: User's interests include ${userProfile.culturalInterests?.join(', ')}. ` : '';
      
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a creative coach helping professionals explore new ideas and overcome creative blocks. ${context}Provide innovative suggestions and techniques.`
          },
          { role: "user", content: message }
        ],
        temperature: 0.9,
        max_tokens: 150
      });

      return {
        content: response.choices[0].message.content || "Je suis désolé, je n'ai pas pu générer une réponse.",
        type: 'creativity'
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return {
        content: "Je suis désolé, une erreur est survenue. Veuillez réessayer.",
        type: 'general'
      };
    }
  }
};