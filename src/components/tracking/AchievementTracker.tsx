import React from 'react';
import { Trophy, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Achievement {
  id: string;
  title: string;
  date: Date;
  category: string;
}

interface AchievementTrackerProps {
  achievements: Achievement[];
  onAddAchievement: () => void;
}

const AchievementTracker: React.FC<AchievementTrackerProps> = ({
  achievements,
  onAddAchievement
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Réalisations du jour
        </h3>
        <Button
          variant="ghost"
          size="sm"
          icon={<Plus className="h-4 w-4" />}
          onClick={onAddAchievement}
        >
          Ajouter
        </Button>
      </div>

      <div className="space-y-2">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0">
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {achievement.title}
              </p>
              <p className="text-sm text-gray-500">
                {achievement.category}
              </p>
            </div>
          </div>
        ))}

        {achievements.length === 0 && (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">
              Aucune réalisation enregistrée aujourd'hui
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementTracker;