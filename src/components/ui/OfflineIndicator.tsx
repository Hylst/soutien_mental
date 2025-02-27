import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { useTranslation } from '@/hooks/useTranslation';
import { formatRelativeTime } from '@/utils/dateUtils';
import { useTheme } from '@/context/ThemeContext';

const OfflineIndicator: React.FC = () => {
  const { isOnline, isSyncing, pendingChanges, lastSync, sync } = useOfflineStatus();
  const { t } = useTranslation();
  const { theme } = useTheme();

  if (!pendingChanges && isOnline) return null;

  return (
    <div className={`fixed bottom-4 right-4 ${
      theme === 'dark' 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-800'
      } rounded-lg shadow-lg p-4 max-w-xs transition-colors duration-200`}>
      <div className="flex items-center space-x-2">
        {isOnline ? (
          <Wifi className="h-5 w-5 text-green-500" />
        ) : (
          <WifiOff className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
        )}
        <span className="text-sm font-medium">
          {isOnline ? 'Online' : t('offline.status')}
        </span>
      </div>

      {pendingChanges > 0 && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {t('offline.pendingChanges')}: {pendingChanges}
        </div>
      )}

      {lastSync && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {t('offline.lastSync')} {formatRelativeTime(lastSync)}
        </div>
      )}

      {isOnline && pendingChanges > 0 && (
        <button
          onClick={sync}
          disabled={isSyncing}
          className="mt-2 w-full flex items-center justify-center px-3 py-1.5 text-sm text-white bg-primary-600 dark:bg-primary-700 rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-50 transition-colors"
        >
          {isSyncing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              {t('offline.syncing')}
            </>
          ) : (
            'Sync now'
          )}
        </button>
      )}
    </div>
  );
};

export default OfflineIndicator;