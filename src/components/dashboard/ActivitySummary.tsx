import React from 'react';
import type { Achievement, JournalEntry } from '@/types/tracking';
import Card from '../ui/Card';
import AchievementTracker from '../tracking/AchievementTracker';
import PositiveJournal from '../tracking/PositiveJournal';

interface ActivitySummaryProps {
  achievements: Achievement[];
  journalEntries: JournalEntry[];
  onAddAchievement: () => void;
  onAddJournalEntry: () => void;
}

export const ActivitySummary: React.FC<ActivitySummaryProps> = ({
  achievements,
  journalEntries,
  onAddAchievement,
  onAddJournalEntry
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <AchievementTracker
          achievements={achievements}
          onAddAchievement={onAddAchievement}
        />
      </Card>
      <Card>
        <PositiveJournal
          entries={journalEntries}
          onAddEntry={onAddJournalEntry}
        />
      </Card>
    </div>
  );
};