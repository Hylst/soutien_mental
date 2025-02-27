import { useState, useEffect } from 'react';
import { db } from '@/lib/db/schema';
import { syncService } from '@/services/sync';

export const useOfflineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(0);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (online) {
        syncService.syncToServer().catch(console.error);
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    const checkPendingChanges = async () => {
      const changes = await db.syncQueue.count();
      setPendingChanges(changes);
    };

    checkPendingChanges();
    const interval = setInterval(checkPendingChanges, 5000);

    return () => clearInterval(interval);
  }, []);

  const sync = async () => {
    if (!isOnline) return;
    
    setIsSyncing(true);
    try {
      await syncService.syncToServer();
      setLastSync(new Date());
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    isOnline,
    isSyncing,
    pendingChanges,
    lastSync,
    sync
  };
};