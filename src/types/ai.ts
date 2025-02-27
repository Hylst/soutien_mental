export type AIProvider = 'openai' | 'deepseek' | 'gemini';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
}

export interface AIResponse {
  content: string;
  type: 'motivation' | 'creativity' | 'general';
}

export interface AIError {
  message: string;
  code: string;
}