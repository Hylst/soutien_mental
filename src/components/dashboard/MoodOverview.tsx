import React from 'react';
import type { MoodEntry } from '@/types';
import MoodChart from '../tracking/MoodChart';
import Card from '../ui/Card';

interface MoodOverviewProps {
  moods: MoodEntry[];
  loading: boolean;
}

export const MoodOverview: React.FC<MoodOverviewProps> = ({ moods, loading }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Évolution de votre humeur
        </h2>
      </div>
      {loading ? (
        <div className="h-[300px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      ) : (
        <MoodChart moods={moods} />
      )}
    </Card>
  );
};