import CryptoJS from 'crypto-js';
import { get, set } from 'idb-keyval';
import type { AIConfig } from '@/types/ai';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-key';

export const secureStorage = {
  async saveEncrypted(key: string, data: any): Promise<void> {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      ENCRYPTION_KEY
    ).toString();
    await set(key, encrypted);
  },

  async getEncrypted<T>(key: string): Promise<T | null> {
    try {
      const encrypted = await get(key);
      if (!encrypted) return null;

      const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY).toString(
        CryptoJS.enc.Utf8
      );
      return JSON.parse(decrypted);
    } catch (error) {
      console.error(`Error getting encrypted data for ${key}:`, error);
      return null;
    }
  },

  async saveAIConfig(config: AIConfig): Promise<void> {
    await this.saveEncrypted('ai_config', config);
  },

  async getAIConfig(): Promise<AIConfig | null> {
    return this.getEncrypted<AIConfig>('ai_config');
  }
};