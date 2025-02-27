import { db } from '@/lib/db/schema';
import { db as firestore } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const syncService = {
  async syncToServer(): Promise<void> {
    if (!navigator.onLine) return;

    const syncQueue = await db.syncQueue.toArray();
    
    for (const item of syncQueue) {
      try {
        const { table, operation, data } = item;
        
        switch (operation) {
          case 'create':
            await addDoc(collection(firestore, table), data);
            break;
          case 'update':
            await updateDoc(doc(firestore, table, data.id), data);
            break;
          case 'delete':
            await deleteDoc(doc(firestore, table, data.id));
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