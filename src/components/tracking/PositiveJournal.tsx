import React from 'react';
import { Sun, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

interface JournalEntry {
  id: string;
  content: string;
  date: Date;
}

interface PositiveJournalProps {
  entries: JournalEntry[];
  onAddEntry: () => void;
}

const PositiveJournal: React.FC<PositiveJournalProps> = ({
  entries,
  onAddEntry
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Moments positifs
        </h3>
        <Button
          variant="ghost"
          size="sm"
          icon={<Plus className="h-4 w-4" />}
          onClick={onAddEntry}
        >
          Ajouter
        </Button>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0 mt-1">
              <Sun className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600">
                {entry.content}
              </p>
            </div>
          </div>
        ))}

        {entries.length === 0 && (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">
              Aucun moment positif enregistré aujourd'hui
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PositiveJournal;