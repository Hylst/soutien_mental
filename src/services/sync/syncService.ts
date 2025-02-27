import { db } from '@/lib/db/schema';
import { supabase } from '@/lib/supabase';

export const syncService = {
  async syncToServer(): Promise<void> {
    if (!navigator.onLine) return;

    const syncQueue = await db.syncQueue.toArray();
    
    for (const item of syncQueue) {
      try {
        const { table, operation, data } = item;
        
        switch (operation) {
          case 'create':
            await supabase.from(table).insert(data);
            break;
          case 'update':
            await supabase.from(table).update(data).eq('id', data.id);
            break;
          case 'delete':
            await supabase.from(table).delete().eq('id', data.id);
            break;
        }
        
        await db.syncQueue.delete(item.id!);
      } catch (error) {
        console.error('Sync error:', error);
      }
    }
  },

  async queueOperation(operation: 'create' | 'update' | 'delete', table: string, data: any): Promise<void> {
    await db.syncQueue.add({
      operation,
      table,
      data,
      timestamp: new Date()
    });

    // Try to sync immediately if online
    if (navigator.onLine) {
      await this.syncToServer();
    }
  }
};

// Set up online/offline listeners
window.addEventListener('online', () => {
  syncService.syncToServer();
});