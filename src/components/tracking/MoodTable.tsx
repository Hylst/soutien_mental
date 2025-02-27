import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { MoodEntry } from '@/types';
import { Sun, Smile, Meh, Cloud, CloudRain } from 'lucide-react';

interface MoodTableProps {
  moods: MoodEntry[];
}

const moodIcons = {
  'great': <Sun className="h-5 w-5 text-yellow-500" />,
  'good': <Smile className="h-5 w-5 text-green-500" />,
  'neutral': <Meh className="h-5 w-5 text-gray-500" />,
  'bad': <Cloud className="h-5 w-5 text-blue-500" />,
  'terrible': <CloudRain className="h-5 w-5 text-purple-500" />
};

const moodLabels = {
  'great': 'Excellent',
  'good': 'Bien',
  'neutral': 'Neutre',
  'bad': 'Pas bien',
  'terrible': 'Terrible'
};

const MoodTable: React.FC<MoodTableProps> = ({ moods }) => {
  const sortedMoods = [...moods].sort((a, b) => 
    b.timestamp.toDate().getTime() - a.timestamp.toDate().getTime()
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Humeur
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Facteurs
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedMoods.map((mood) => (
            <tr key={mood.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {format(mood.timestamp.toDate(), 'dd MMMM yyyy', { locale: fr })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  {moodIcons[mood.mood]}
                  <span className="text-sm text-gray-900">{moodLabels[mood.mood]}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {mood.triggers?.map((trigger) => (
                    <span
                      key={trigger}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {trigger}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {mood.notes || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoodTable;