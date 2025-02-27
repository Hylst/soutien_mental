import CryptoJS from 'crypto-js';
import { get, set } from 'idb-keyval';

export interface AIConfig {
  provider: 'openai' | 'deepseek' | 'gemini';
  apiKey: string;
}

const STORAGE_KEY = 'ai_config';
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-key';

export const aiConfig = {
  async saveConfig(config: AIConfig): Promise<void> {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(config),
      ENCRYPTION_KEY
    ).toString();
    await set(STORAGE_KEY, encrypted);
  },

  async getConfig(): Promise<AIConfig | null> {
    try {
      const encrypted = await get(STORAGE_KEY);
      if (!encrypted) return null;

      const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY).toString(
        CryptoJS.enc.Utf8
      );
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Error getting AI config:', error);
      return null;
    }
  }
};