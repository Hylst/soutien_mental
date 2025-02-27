import { GoogleGenerativeAI } from '@google/generative-ai';
import { openai } from '@/lib/openai';
import { secureStorage } from '@/lib/storage/secureStorage';
import type { AIConfig, AIResponse, AIProvider } from '@/types/ai';
import type { UserProfile } from '@/types/profile';

export class AIService {
  private static instance: AIService;
  private currentProvider: AIProvider = 'openai';
  private geminiAI?: GoogleGenerativeAI;
  private initialized: boolean = false;

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    const config = await secureStorage.getAIConfig();
    if (config) {
      this.currentProvider = config.provider;
      if (config.provider === 'gemini') {
        this.geminiAI = new GoogleGenerativeAI(config.apiKey);
      }
    }
    this.initialized = true;
  }

  async setProvider(provider: AIProvider, apiKey: string): Promise<void> {
    await secureStorage.saveAIConfig({ provider, apiKey });
    this.currentProvider = provider;
    
    if (provider === 'gemini') {
      this.geminiAI = new GoogleGenerativeAI(apiKey);
    }
  }

  async generateResponse(
    message: string,
    type: 'motivation' | 'creativity',
    userProfile?: Partial<UserProfile>
  ): Promise<AIResponse> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      switch (this.currentProvider) {
        case 'openai':
          return this.generateOpenAIResponse(message, type, userProfile);
        case 'gemini':
          return this.generateGeminiResponse(message, type, userProfile);
        case 'deepseek':
          return this.generateDeepseekResponse(message, type, userProfile);
        default:
          throw new Error('Invalid AI provider');
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      return {
        content: "Je suis désolé, une erreur est survenue. Veuillez réessayer.",
        type: 'general'
      };
    }
  }

  private async generateOpenAIResponse(
    message: string,
    type: 'motivation' | 'creativity',
    userProfile?: Partial<UserProfile>
  ): Promise<AIResponse> {
    const context = userProfile ? `Context: User is a ${userProfile.profession} interested in ${userProfile.hobbies?.join(', ')}. ` : '';
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: type === 'motivation' 
            ? `You are a motivational coach specializing in helping creative professionals and freelancers. ${context}Provide encouraging, actionable advice.`
            : `You are a creative coach helping professionals explore new ideas and overcome creative blocks. ${context}Provide innovative suggestions and techniques.`
        },
        { role: "user", content: message }
      ],
      temperature: type === 'motivation' ? 0.7 : 0.9,
      max_tokens: 150
    });

    return {
      content: response.choices[0].message.content || "Je suis désolé, je n'ai pas pu générer une réponse.",
      type
    };
  }

  private async generateGeminiResponse(
    message: string,
    type: 'motivation' | 'creativity',
    userProfile?: Partial<UserProfile>
  ): Promise<AIResponse> {
    if (!this.geminiAI) {
      throw new Error('Gemini AI not initialized');
    }

    const model = this.geminiAI.getGenerativeModel({ model: 'gemini-pro' });
    const context = userProfile ? `Context: User is a ${userProfile.profession} interested in ${userProfile.hobbies?.join(', ')}. ` : '';

    const prompt = type === 'motivation'
      ? `As a motivational coach for creative professionals: ${context}${message}`
      : `As a creative coach helping with ideation: ${context}${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return {
      content: response.text() || "Je suis désolé, je n'ai pas pu générer une réponse.",
      type
    };
  }

  private async generateDeepseekResponse(
    message: string,
    type: 'motivation' | 'creativity',
    userProfile?: Partial<UserProfile>
  ): Promise<AIResponse> {
    // À implémenter quand l'API Deepseek sera disponible
    throw new Error('Deepseek integration not implemented yet');
  }
}

export const aiService = AIService.getInstance();